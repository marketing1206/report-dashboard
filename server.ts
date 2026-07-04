import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import {
  INITIAL_MARKETING_DATA,
  DEFAULT_COMMENTS_LIVOTEC,
  DEFAULT_COMMENTS_KAROFI,
} from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Server-side database configuration
const DB_PATH = path.join(process.cwd(), "server-data", "db.json");

interface DBStructure {
  marketingData: any;
  comments: any;
  users: any;
}

const FALLBACK_TIMELINES = [
  { id: "week4", label: "Tuần 4 (19/06 - 25/06/2026)", isPRWeek: false, date: "2026-06-25", startDate: "2026-06-19", endDate: "2026-06-26", week: "19/06-25/06/2026" },
  { id: "week3", label: "Tuần 3 (12/06 - 18/06/2026)", isPRWeek: true, date: "2026-06-18", startDate: "2026-06-12", endDate: "2026-06-18", week: "12/06-18/06/2026" },
  { id: "week2", label: "Tuần 2 (05/06 - 11/06/2026)", isPRWeek: false, date: "2026-06-11", startDate: "2026-06-05", endDate: "2026-06-11", week: "05/06-11/06/2026" },
];

const DEFAULT_USERS_SERVER = [
  { username: "ntkdung1206@gmail.com", password: "123", name: "Dũng Nguyễn", role: "Admin" },
  { username: "admin", password: "123", name: "Quản trị hệ thống", role: "Admin" },
  { username: "editor1", password: "123", name: "Nguyễn Biên Tập", role: "Editor" },
  { username: "viewer1", password: "123", name: "Lê Người Xem", role: "Viewer" }
];

const normalizeWeek = (w: string | undefined): string => {
  if (!w) return "";
  return w.toLowerCase().replace(/\s+/g, "").trim();
};

const buildDefaultCommentsByWeekServer = () => {
  const result: Record<string, any> = {};
  FALLBACK_TIMELINES.forEach((t) => {
    result[normalizeWeek(t.week)] = {
      Livotec: JSON.parse(JSON.stringify(DEFAULT_COMMENTS_LIVOTEC)),
      Karofi: JSON.parse(JSON.stringify(DEFAULT_COMMENTS_KAROFI)),
    };
  });
  return result;
};

function initializeDB(): DBStructure {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const dbData: DBStructure = {
    marketingData: INITIAL_MARKETING_DATA,
    comments: buildDefaultCommentsByWeekServer(),
    users: DEFAULT_USERS_SERVER,
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), "utf-8");
  return dbData;
}

function loadDatabase(): DBStructure {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return initializeDB();
    }
    const content = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error loading database, reinitializing:", error);
    return initializeDB();
  }
}

function saveDatabase(data: DBStructure) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving database:", error);
  }
}

function mergeMarketingData(existingData: any, incomingData: any): any {
  if (!incomingData || typeof incomingData !== "object") return existingData;

  const result = {
    digital_marketing: [...(existingData.digital_marketing || [])],
    kol_koc: [...(existingData.kol_koc || [])],
    btl_trade: [...(existingData.btl_trade || [])],
    monthly_ooh_pr: [...(existingData.monthly_ooh_pr || [])],
  };

  // Find all weeks present in incoming data
  const incomingWeeks = new Set<string>();
  
  const addWeeksFromList = (list: any[]) => {
    if (!Array.isArray(list)) return;
    for (const item of list) {
      if (item && item.week) {
        incomingWeeks.add(item.week.trim());
      }
    }
  };

  addWeeksFromList(incomingData.digital_marketing);
  addWeeksFromList(incomingData.kol_koc);
  addWeeksFromList(incomingData.btl_trade);
  addWeeksFromList(incomingData.monthly_ooh_pr);

  if (incomingWeeks.size === 0) {
    return existingData;
  }

  const keys = ["digital_marketing", "kol_koc", "btl_trade", "monthly_ooh_pr"] as const;

  for (const key of keys) {
    const incomingList = incomingData[key];
    if (Array.isArray(incomingList)) {
      // Filter out existing rows that belong to any of the incoming weeks
      result[key] = result[key].filter((row: any) => {
        return !row.week || !incomingWeeks.has(row.week.trim());
      });

      // Append all new incoming rows for these weeks
      result[key].push(...incomingList);
    }
  }

  return result;
}

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API Client initialized successfully.");
  } else {
    console.warn("GEMINI_API_KEY is not configured or uses placeholder value.");
  }
} catch (error) {
  console.warn("Failed to initialize Gemini API Client:", error);
}

// API: Fetch file from Google Drive via direct link
app.post("/api/fetch-drive", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Vui lòng cung cấp link Google Drive" });
    }

    // Regular expressions to extract file ID from Google Drive link
    const regId1 = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const regId2 = /[?&]id=([a-zA-Z0-9_-]+)/;
    const regId3 = /\/folders\/([a-zA-Z0-9_-]+)/; // Folders are not direct files, let the user know
    
    let fileId = "";
    const match1 = url.match(regId1);
    const match2 = url.match(regId2);
    
    if (match1 && match1[1]) {
      fileId = match1[1];
    } else if (match2 && match2[1]) {
      fileId = match2[1];
    } else {
      // Direct string can be treated as ID
      fileId = url.trim();
    }

    if (url.includes("/folders/")) {
      return res.status(400).json({ error: "Đường dẫn bạn cung cấp là Thư mục (Folder). Vui lòng cung cấp link của một tệp tin (File) JSON cụ thể ở chế độ công khai." });
    }

    if (!fileId || fileId.length < 10) {
      return res.status(400).json({ error: "Không tìm thấy ID tệp Google Drive hợp lệ từ đường dẫn." });
    }

    // Google Drive direct export download link
    const downloadUrl = `https://docs.google.com/uc?export=download&id=${fileId}`;
    console.log(`Attempting to fetch Google Drive file ID: ${fileId} from ${downloadUrl}`);

    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Google Drive trả về mã lỗi: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();

    // Verify if downloaded content is actually HTML (often Google login or permission screen)
    if (text.includes("<!DOCTYPE html>") || text.includes("<html") || text.includes("google.com/accounts/Login")) {
      return res.status(401).json({
        error: "Không thể tải trực tuyến. Tệp Google Drive phải được chia sẻ ở chế độ 'Bất kỳ ai có đường link đều có thể xem' (Anyone with link can view). Vui lòng kiểm tra lại quyền chia sẻ trên Google Drive hoặc copy-paste thủ công."
      });
    }

    try {
      const jsonData = JSON.parse(text);
      // Automatically save and merge into database
      const db = loadDatabase();
      const merged = mergeMarketingData(db.marketingData, jsonData);
      db.marketingData = merged;
      saveDatabase(db);

      return res.json({ success: true, data: merged });
    } catch (parseError) {
      console.warn("Failed to parse fetched content as JSON. Head:", text.substring(0, 200));
      return res.status(422).json({
        error: "Tải tệp thành công nhưng nội dung tệp không phải định dạng JSON hợp lệ. Vui lòng kiểm tra lại cấu trúc file.",
        preview: text.substring(0, 200)
      });
    }

  } catch (error: any) {
    console.warn("Fetch Drive error:", error);
    return res.status(500).json({ error: `Lỗi kết nối tệp: ${error.message || error}` });
  }
});

// API: Fetch JSON from public online share links (CORS-safe proxy)
app.post("/api/fetch-json", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Vui lòng cung cấp link JSON trực tuyến." });
    }

    console.log(`Attempting to fetch remote JSON URL: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Mã lỗi HTTP: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    try {
      const jsonData = JSON.parse(text);
      // Automatically save and merge into database
      const db = loadDatabase();
      const merged = mergeMarketingData(db.marketingData, jsonData);
      db.marketingData = merged;
      saveDatabase(db);

      return res.json({ success: true, data: merged });
    } catch (parseError) {
      console.warn("Failed to parse fetched remote content as JSON.");
      return res.status(422).json({
        error: "Tải tệp thành công nhưng nội dung tệp không phải định dạng JSON hợp lệ. Vui lòng kiểm tra lại cấu trúc file.",
        preview: text.substring(0, 200)
      });
    }
  } catch (error: any) {
    console.warn("Fetch Remote JSON error:", error);
    return res.status(500).json({ error: `Lỗi kết nối tệp JSON trực tuyến: ${error.message || error}` });
  }
});

// GET /api/marketing-data
app.get("/api/marketing-data", (req, res) => {
  try {
    const db = loadDatabase();
    return res.json({ success: true, data: db.marketingData });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to load marketing data" });
  }
});

// POST /api/marketing-data
app.post("/api/marketing-data", (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "No data provided" });
    }
    const db = loadDatabase();
    const merged = mergeMarketingData(db.marketingData, data);
    db.marketingData = merged;
    saveDatabase(db);
    return res.json({ success: true, data: db.marketingData });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to update marketing data" });
  }
});

// POST /api/marketing-data-overwrite
app.post("/api/marketing-data-overwrite", (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "No data provided" });
    }
    const db = loadDatabase();
    db.marketingData = data;
    saveDatabase(db);
    return res.json({ success: true, data: db.marketingData });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to overwrite marketing data" });
  }
});

// GET /api/comments
app.get("/api/comments", (req, res) => {
  try {
    const db = loadDatabase();
    return res.json({ success: true, data: db.comments });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to load comments" });
  }
});

// POST /api/comments
app.post("/api/comments", (req, res) => {
  try {
    const { comments } = req.body;
    if (!comments) {
      return res.status(400).json({ error: "No comments provided" });
    }
    const db = loadDatabase();
    db.comments = comments;
    saveDatabase(db);
    return res.json({ success: true, data: db.comments });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to update comments" });
  }
});

// GET /api/users
app.get("/api/users", (req, res) => {
  try {
    const db = loadDatabase();
    return res.json({ success: true, data: db.users });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to load users" });
  }
});

// POST /api/users
app.post("/api/users", (req, res) => {
  try {
    const { users } = req.body;
    if (!users) {
      return res.status(400).json({ error: "No users provided" });
    }
    const db = loadDatabase();
    db.users = users;
    saveDatabase(db);
    return res.json({ success: true, data: db.users });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to update users" });
  }
});

// POST /api/reset-data
app.post("/api/reset-data", (req, res) => {
  try {
    const db = initializeDB();
    return res.json({ success: true, marketingData: db.marketingData, comments: db.comments, users: db.users });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to reset database" });
  }
});

// API: Call Gemini to analyze marketing report
app.post("/api/analyze", async (req, res) => {
  try {
    const { data, brand, week } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Không có dữ liệu đầu vào để phân tích." });
    }

    if (!ai) {
      return res.status(503).json({
        error: "Gemini API chưa được định cấu hình. Bạn hãy cấu hình GEMINI_API_KEY trong phần Secrets, hoặc sử dụng các bản biên tập thủ công cực kỳ chi tiết có sẵn.",
      });
    }

    const brandName = brand || "Livotec";
    const dataString = typeof data === "string" ? data : JSON.stringify(data, null, 2);

    const prompt = `Bạn là một Chuyên gia Phân tích Dữ liệu Marketing (Marketing Data Analyst) chuyên nghiệp.
Hãy đọc và phân tích chuyên sâu báo cáo chiến dịch của tuần "${week || 'được chọn'}" thuộc thương hiệu "${brandName}" dựa trên dữ liệu JSON được cung cấp dưới đây. Hãy đảm bảo mọi phân tích và con số chỉ xoay quanh tuần "${week || 'được chọn'}" này và không bị lẫn sang các tuần khác.

Dưới đây là dữ liệu báo cáo chiến dịch:
${dataString}

YÊU CẦU:
Hãy xuất ra nhận định phân tích bằng tiếng Việt theo cấu trúc JSON định dạng chính xác sau đây. Các nhận xét cần chuyên sâu, kết hợp các con số thực tế có trong dữ liệu (ví dụ: số bài viết, chi phí đã tiêu, impressions, reach, CPM, organic traffic...) và đưa ra phân tích sắc bén, lời khuyên thực tế nhất.

Cấu trúc JSON phản hồi bắt buộc phải đúng 100% mẫu dưới đây, không chứa bất kỳ văn bản nào khác ngoài JSON (không bọc trong dấu markdown \`\`\`json):
{
  "executiveSummary": {
    "evaluation": "Nhận xét tổng quan cực kỳ chi tiết, đánh giá khách quan về thực trạng triển khai trong tuần (những điểm sáng và hạn chế cụ thể của thương hiệu ${brandName}). Sử dụng số liệu chứng minh từ các mảng SEO, Ads, Content, SOV.",
    "proposals": "Các đề xuất cụ thể, hành động thiết thực cho tuần kế tiếp để tối ưu hóa hiệu quả (đưa ra ít nhất 3 đề xuất ngắn gọn, trực diện)."
  },
  "categoryAnalysis": {
    "sov": "Nhận xét phân tích ngắn gọn, súc tích kèm số liệu về thị phần thảo luận (Share of Voice) của thương hiệu ${brandName} so với các đối thủ cạnh tranh như Karofi, Kangaroo, Sunhouse, Hòa Phát...",
    "kol_koc": "Nhận xét về việc triển khai KOL/KOC trong tuần của ${brandName}. Đối chiếu KPI toàn chiến dịch, tích lũy chiến dịch và số thực hiện tuần này.",
    "tvc": "Nhận xét ngắn gọn về tiến độ sản xuất và phát hành Clip TVC trong tuần. Nêu rõ ngành hàng nào đạt/không đạt KPI và tiến độ tích lũy.",
    "paid_ads": "Phân tích hiệu quả Paid Ads trong tuần (về Amount spent, Impressions, Reach, CPM, Frequency), đánh giá mức độ phủ thương hiệu và tối ưu chi phí.",
    "seo": "Phân tích hiệu quả SEO Website & SEO Content trong tuần (Traffic Organic, Impressions Organic, số lượng bài viết). So sánh thực tế đạt được so với mục tiêu đề ra.",
    "btl_trade": "Đánh giá chi tiết hoạt động BTL & Trade Marketing của thương hiệu ${brandName} (biển bảng POSM, quầy kệ, kiểm soát hình ảnh điểm bán, sự kiện activation/workshop). So sánh kế hoạch tháng 6, lũy kế đạt được và đối chiếu tăng trưởng so với thực tế thực hiện tháng 5.",
    "pr": "Nhận xét phân tích ngắn gọn về mảng PR - báo chí (số lượng bài báo xuất bản, lượt đọc views so với kế hoạch mục tiêu).",
    "ooh": "Nhận xét phân tích ngắn gọn về mảng Quảng cáo ngoài trời OOH (địa điểm LCD, số lượng màn hình LED, mức độ phủ so với mục tiêu kế hoạch)."
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    try {
      const parsed = JSON.parse(text.trim());
      return res.json({ success: true, analysis: parsed });
    } catch (e) {
      console.warn("Gemini raw text parse failure:", text);
      // Fallback: search for first { and last } in case it wrapped in markdown
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      if (start >= 0 && end > start) {
        try {
          const parsedFixed = JSON.parse(text.substring(start, end + 1));
          return res.json({ success: true, analysis: parsedFixed });
        } catch (innerErr) {
          throw new Error("Không thể phân tích phản hồi JSON từ AI.");
        }
      }
      throw new Error("Phản hồi của AI không đúng định dạng JSON.");
    }

  } catch (error: any) {
    console.warn("Gemini API error:", error);
    return res.status(500).json({ error: error.message || "Lỗi xử lý phân tích AI" });
  }
});

// Start server
async function startServer() {
  // Vite dev server integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
