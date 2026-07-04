import React, { useState, useEffect } from "react";
import { DatabaseConsole } from "./components/DatabaseConsole";
import {
  INITIAL_MARKETING_DATA,
  DEFAULT_COMMENTS_LIVOTEC,
  DEFAULT_COMMENTS_KAROFI,
  MarketingReportData,
  BrandComments,
} from "./data";
import {
  TrendingUp,
  Award,
  Users,
  Video,
  Target,
  BarChart3,
  Globe,
  Settings2,
  FileSpreadsheet,
  FileJson,
  Upload,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calendar,
  Layers,
  Percent,
  CheckSquare,
  FileText,
  DollarSign,
  Briefcase,
  Eye,
  UserCheck,
  Store,
  Shield,
  Lock,
  UserPlus,
  Trash2,
  Edit3,
  LogOut,
  UserMinus,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

// Default user metadata
const USER_EMAIL = "ntkdung1206@gmail.com";

const normalizeWeek = (w: string | undefined): string => {
  if (!w) return "";
  return w.toLowerCase().replace(/\s+/g, "").trim();
};

const normalizeRowKeys = (row: any): any => {
  if (!row || typeof row !== "object") return row;
  const result: any = {};
  for (const key of Object.keys(row)) {
    let normalizedKey = key.trim().toLowerCase();
    
    // Map alternate forms of Vietnamese/English keys with spaces or parentheses to canonical underscore keys
    if (normalizedKey === "phân loại thời gian" || normalizedKey === "phân_loại_thời_gian") {
      normalizedKey = "phân_loại_thời_gian";
    } else if (normalizedKey === "nhóm báo cáo" || normalizedKey === "nhóm_báo_cáo") {
      normalizedKey = "nhóm_báo_cáo";
    } else if (normalizedKey === "hạng mục" || normalizedKey === "hạng_mục") {
      normalizedKey = "hạng_mục";
    } else if (normalizedKey === "ngành hàng" || normalizedKey === "ngành_hàng" || normalizedKey === "ngành_háo") {
      normalizedKey = "ngành_hàng";
    } else if (normalizedKey === "kênh (channel)" || normalizedKey === "kênh_channel" || normalizedKey === "kênh channel" || normalizedKey === "kênh ( channel )") {
      normalizedKey = "kênh_channel";
    } else if (normalizedKey === "chỉ số (metric)" || normalizedKey === "chỉ_số_metric" || normalizedKey === "chỉ số metric" || normalizedKey === "chỉ số ( metric )") {
      normalizedKey = "chỉ_số_metric";
    } else if (normalizedKey === "mục tiêu (target)" || normalizedKey === "mục_tiêu_target" || normalizedKey === "mục tiêu target" || normalizedKey === "mục tiêu ( target )") {
      normalizedKey = "mục_tiêu_target";
    } else if (normalizedKey === "thực tế (actual)" || normalizedKey === "thực_tế_actual" || normalizedKey === "thực tế thực" || normalizedKey === "thực tế_actual") {
      normalizedKey = "thực_tế_actual";
    } else if (normalizedKey === "target tháng" || normalizedKey === "target_tháng") {
      normalizedKey = "target_tháng";
    } else if (normalizedKey === "tích lũy tháng" || normalizedKey === "tích_lũy_tháng") {
      normalizedKey = "tích_lũy_tháng";
    } else if (normalizedKey === "kpi toàn chiến dịch" || normalizedKey === "kpi_toàn_chiến_dịch") {
      normalizedKey = "kpi_toàn_chiến_dịch";
    } else if (normalizedKey === "thực tế trong tuần" || normalizedKey === "thực_tế_trong_tuần") {
      normalizedKey = "thực_tế_trong_tuần";
    } else if (normalizedKey === "tổng tích lũy" || normalizedKey === "tích lũy chiến dịch" || normalizedKey === "tích_lũy_chiến_dịch" || normalizedKey === "tổng tích lũy chiến dịch") {
      normalizedKey = "tích_lũy_chiến_dịch";
    } else if (normalizedKey === "hạng mục lớn" || normalizedKey === "hạng_mục_lớn") {
      normalizedKey = "hạng_mục_lớn";
    } else if (normalizedKey === "chi tiết hạng mục" || normalizedKey === "chi_tiết_hạng_mục") {
      normalizedKey = "chi_tiết_hạng_mục";
    } else if (normalizedKey === "phân loại" || normalizedKey === "phân_loại") {
      normalizedKey = "phân_loại";
    } else if (normalizedKey === "tần suất" || normalizedKey === "tần_suất") {
      normalizedKey = "tần_suất";
    } else if (normalizedKey === "đơn vị tính" || normalizedKey === "đơn_vị_tính") {
      normalizedKey = "đơn_vị_tính";
    } else if (normalizedKey === "thực hiện tháng 5" || normalizedKey === "thực_hiện_tháng_5") {
      normalizedKey = "thực_hiện_tháng_5";
    } else if (normalizedKey === "kế hoạch tháng 6" || normalizedKey === "kế_hoạch_tháng_6") {
      normalizedKey = "kế_hoạch_tháng_6";
    } else if (normalizedKey === "tháng báo cáo" || normalizedKey === "tháng_báo_cáo") {
      normalizedKey = "tháng_báo_cáo";
    }

    let val = row[key];

    // Safely parse string numbers to actual float/int values
    if (typeof val === "string") {
      const trimmedVal = val.trim();
      if (trimmedVal === "" || trimmedVal === "—" || trimmedVal === "null" || trimmedVal === "undefined") {
        val = null;
      } else {
        const cleanVal = trimmedVal.replace(/,/g, "");
        const parsedNum = Number(cleanVal);
        if (!isNaN(parsedNum) && cleanVal !== "") {
          val = parsedNum;
        }
      }
    }

    // Standardize string values of categories/brands/frequencies to match strict UI exact matching filters
    if (normalizedKey === "nhóm_báo_cáo") {
      const bVal = String(val).trim().toLowerCase();
      if (bVal === "digital") val = "Digital";
      else if (bVal === "content") val = "Content";
      else if (bVal === "brand") val = "Brand";
    } else if (normalizedKey === "hạng_mục") {
      const cVal = String(val).trim().toLowerCase();
      if (cVal === "paid ads") val = "Paid Ads";
      else if (cVal === "seo website") val = "SEO Website";
      else if (cVal === "social listening") val = "Social Listening";
      else if (cVal === "pr - báo chí" || cVal === "pr") val = "PR - báo chí";
      else if (cVal === "ooh") val = "OOH";
      else if (cVal === "seo content") val = "SEO Content";
      else if (cVal === "product page") val = "Product Page";
      else if (cVal === "clip tvc") val = "Clip TVC";
      else if (cVal === "social media") val = "Social Media";
      else if (cVal === "video giới thiệu sản phẩm") val = "Video giới thiệu sản phẩm";
      else if (cVal === "tvc") val = "TVC";
      else if (cVal === "e-com") val = "E-com";
      else if (cVal === "ooh/led") val = "OOH/LED";
    } else if (normalizedKey === "hạng_mục_lớn") {
      const dVal = String(val).trim().toLowerCase();
      if (dVal === "posm") val = "POSM";
      else if (dVal === "event") val = "Event";
      else if (dVal === "kiểm soát ha điểm bán") val = "Kiểm soát HA điểm bán";
      else if (dVal === "nghiên cứu thị trường") val = "Nghiên cứu thị trường";
    } else if (normalizedKey === "phân_loại_thời_gian") {
      const eVal = String(val).trim().toLowerCase();
      if (eVal === "weekly") val = "Weekly";
      else if (eVal === "mtd (tháng đến nay)" || eVal === "mtd") val = "MTD (Tháng đến nay)";
    } else if (normalizedKey === "brand") {
      const fVal = String(val).trim().toLowerCase();
      if (fVal === "livotec") val = "Livotec";
      else if (fVal === "karofi") val = "Karofi";
    } else if (normalizedKey === "chỉ_số_metric") {
      const metricValLower = String(val).trim().toLowerCase();
      if (metricValLower === "amount spent (vnđ)" || metricValLower === "amount spent (vnd)" || metricValLower === "amount_spent_vnd" || metricValLower === "spent") {
        val = "Amount spent (VNĐ)";
      } else if (metricValLower === "impressions") {
        val = "Impressions";
      } else if (metricValLower === "reach") {
        val = "Reach";
      } else if (metricValLower === "cpm") {
        val = "CPM";
      } else if (metricValLower === "frequency") {
        val = "Frequency";
      } else if (metricValLower === "traffic organic" || metricValLower === "traffic_organic") {
        val = "Traffic Organic";
      } else if (metricValLower === "impressions organic" || metricValLower === "impressions_organic") {
        val = "Impressions Organic";
      } else if (metricValLower === "quantity") {
        val = "Quantity";
      } else if (metricValLower === "views") {
        val = "Views";
      } else if (metricValLower === "sov (thị phần thảo luận theo brand)" || metricValLower === "sov") {
        val = "SOV (Thị phần thảo luận theo brand)";
      } else if (metricValLower === "location") {
        val = "location";
      } else if (metricValLower === "screen") {
        val = "screen";
      } else if (metricValLower === "số lượng video") {
        val = "Số lượng video";
      } else if (metricValLower.includes("số lượng bài viết") && metricValLower.includes("single")) {
        val = "Số lượng bài viết\n(single post, album post, motion, video, reels...)";
      } else if (metricValLower === "số lượng bài viết") {
        val = "Số lượng bài viết";
      } else if (metricValLower === "số lượng trang sản phẩm") {
        val = "Số lượng trang sản phẩm";
      } else if (metricValLower === "grps") {
        val = "GRPs";
      } else if (metricValLower === "số lượng video/ảnh") {
        val = "Số lượng video/ảnh";
      } else if (metricValLower === "số lượng bài edited") {
        val = "Số lượng bài edited";
      }
    } else if (normalizedKey === "kênh_channel") {
      let channelVal = String(val).trim();
      const channelValLowerStr = channelVal.toLowerCase().replace(/\s+/g, "").trim();
      if (channelValLowerStr.includes("facebook") && channelValLowerStr.includes("always") && channelValLowerStr.includes("reup")) {
        val = "Facebook (always on, new product lauching, reup)";
      }
    }

    result[normalizedKey] = val;
  }

  // Ensure mandatory fields are present
  const defaults: Record<string, any> = {
    mục_tiêu_target: null,
    thực_tế_actual: null,
    target_tháng: null,
    tích_lũy_tháng: null,
    kpi_toàn_chiến_dịch: null,
    thực_tế_trong_tuần: null,
    tích_lũy_chiến_dịch: null,
    thực_hiện_tháng_5: null,
    kế_hoạch_tháng_6: null
  };
  for (const defKey of Object.keys(defaults)) {
    if (result[defKey] === undefined) {
      result[defKey] = defaults[defKey];
    }
  }

  return result;
};

export const normalizeMarketingData = (raw: any): MarketingReportData => {
  if (!raw || typeof raw !== "object") return INITIAL_MARKETING_DATA;
  return {
    digital_marketing: (Array.isArray(raw.digital_marketing) ? raw.digital_marketing : []).map(normalizeRowKeys),
    kol_koc: (Array.isArray(raw.kol_koc) ? raw.kol_koc : []).map(normalizeRowKeys),
    btl_trade: (Array.isArray(raw.btl_trade) ? raw.btl_trade : []).map(normalizeRowKeys),
    monthly_ooh_pr: (Array.isArray(raw.monthly_ooh_pr) ? raw.monthly_ooh_pr : []).map(normalizeRowKeys),
  };
};

const FALLBACK_TIMELINES = [
  { id: "week4", label: "Tuần 4 (19/06 - 25/06/2026)", isPRWeek: false, date: "2026-06-25", startDate: "2026-06-19", endDate: "2026-06-26", week: "19/06-25/06/2026" },
  { id: "week3", label: "Tuần 3 (12/06 - 18/06/2026)", isPRWeek: true, date: "2026-06-18", startDate: "2026-06-12", endDate: "2026-06-18", week: "12/06-18/06/2026" },
  { id: "week2", label: "Tuần 2 (05/06 - 11/06/2026)", isPRWeek: false, date: "2026-06-11", startDate: "2026-06-05", endDate: "2026-06-11", week: "05/06-11/06/2026" },
];

export interface UserAccount {
  username: string;
  password: string;
  name: string;
  role: "Admin" | "Editor" | "Viewer";
}

const DEFAULT_USERS: UserAccount[] = [
  { username: "ntkdung1206@gmail.com", password: "123", name: "Dũng Nguyễn", role: "Admin" },
  { username: "admin", password: "123", name: "Quản trị hệ thống", role: "Admin" },
  { username: "editor1", password: "123", name: "Nguyễn Biên Tập", role: "Editor" },
  { username: "viewer1", password: "123", name: "Lê Người Xem", role: "Viewer" }
];

const buildDefaultCommentsByWeek = (data: MarketingReportData) => {
  const result: Record<string, { Livotec: BrandComments; Karofi: BrandComments }> = {};
  FALLBACK_TIMELINES.forEach((t) => {
    result[normalizeWeek(t.week)] = {
      Livotec: getDynamicDefaultComments("Livotec", t.week, data),
      Karofi: getDynamicDefaultComments("Karofi", t.week, data),
    };
  });
  return result;
};

export const getDynamicDefaultComments = (brand: "Livotec" | "Karofi", weekStr: string, data: MarketingReportData): BrandComments => {
  const normWeek = normalizeWeek(weekStr);
  const is2026_06_19 = normWeek === normalizeWeek("19/06-25/06/2026");

  // Keep original high-quality comments for the reference week
  if (is2026_06_19) {
    return brand === "Livotec" ? DEFAULT_COMMENTS_LIVOTEC : DEFAULT_COMMENTS_KAROFI;
  }

  const digitalMarketingList = data?.digital_marketing || [];
  const btlTradeList = data?.btl_trade || [];
  const kolKocList = data?.kol_koc || [];
  const monthlyOohPrList = data?.monthly_ooh_pr || [];

  const isInWeek = (w: string | undefined) => {
    if (!w) return false;
    const nw = normalizeWeek(w);
    return nw === normWeek || nw.includes(normWeek) || normWeek.includes(nw);
  };

  const brandDigital = digitalMarketingList.filter(
    (row) => row.brand && row.brand.toLowerCase().trim() === brand.toLowerCase().trim() && isInWeek(row.week)
  );
  const brandBtl = btlTradeList.filter(
    (row) => row.brand && row.brand.toLowerCase().trim() === brand.toLowerCase().trim() && isInWeek(row.week)
  );
  const brandOohPr = monthlyOohPrList.filter(
    (row) => row.brand && row.brand.toLowerCase().trim() === brand.toLowerCase().trim() && isInWeek(row.week)
  );

  // SOV
  const sovRows = digitalMarketingList.filter(
    (row) => row.hạng_mục === "Social Listening" && isInWeek(row.week)
  );
  const activeBrandSov = sovRows.find(
    (row) => row.kênh_channel && row.kênh_channel.toLowerCase() === brand.toLowerCase()
  );
  const sovPercentage = activeBrandSov ? (activeBrandSov.thực_tế_actual || 0) * 100 : 0;

  // Content
  const contentRows = brandDigital.filter((row) => row.nhóm_báo_cáo === "Content");
  const weeklyContentSum = contentRows.reduce((sum, row) => sum + (row.thực_tế_actual || 0), 0);

  // SEO
  const seoTrafficRow = brandDigital.find(
    (row) => row.hạng_mục === "SEO Website" && row.chỉ_số_metric === "Traffic Organic"
  );
  const seoTrafficWeeklyActual = seoTrafficRow ? seoTrafficRow.thực_tế_actual || 0 : 0;
  const seoTrafficWeeklyTarget = seoTrafficRow ? seoTrafficRow.mục_tiêu_target || 0 : 0;

  const seoImpressionsRow = brandDigital.find(
    (row) => row.hạng_mục === "SEO Website" && row.chỉ_số_metric === "Impressions Organic"
  );
  const seoImpressionsWeeklyActual = seoImpressionsRow ? seoImpressionsRow.thực_tế_actual || 0 : 0;

  // KOL/KOC
  const brandKolKoc = kolKocList.filter((row) => {
    const hasBrand = "brand" in row && typeof (row as any).brand === "string" && (row as any).brand.trim();
    const isBrandMatch = hasBrand
      ? (row as any).brand.toLowerCase().trim() === brand.toLowerCase().trim()
      : brand.toLowerCase() === "livotec";
    return isBrandMatch && isInWeek(row.week);
  });
  const totalKolKocKpi = brandKolKoc.reduce((sum, r) => sum + (r.kpi_toàn_chiến_dịch || 0), 0);
  const totalKolKocTichLuy = brandKolKoc.reduce((sum, r) => sum + (r.tích_lũy_chiến_dịch || 0), 0);
  const totalKolKocTrongTuan = brandKolKoc.reduce((sum, r) => sum + (r.thực_tế_trong_tuần || 0), 0);

  // Paid Ads
  const adsSpentRows = brandDigital.filter(
    (row) => row.hạng_mục === "Paid Ads" && row.chỉ_số_metric === "Amount spent (VNĐ)"
  );
  const adsImpressionRows = brandDigital.filter(
    (row) => row.hạng_mục === "Paid Ads" && row.chỉ_số_metric === "Impressions"
  );
  const adsReachRows = brandDigital.filter(
    (row) => row.hạng_mục === "Paid Ads" && row.chỉ_số_metric === "Reach"
  );
  const adsFreqRows = brandDigital.filter(
    (row) => row.hạng_mục === "Paid Ads" && row.chỉ_số_metric === "Frequency"
  );

  const weeklyAdsSpent = adsSpentRows.reduce((sum, r) => sum + (r.thực_tế_actual || 0), 0);
  const weeklyAdsImpressions = adsImpressionRows.reduce((sum, r) => sum + (r.thực_tế_actual || 0), 0);
  const weeklyAdsReach = adsReachRows.reduce((sum, r) => sum + (r.thực_tế_actual || 0), 0);
  const avgAdsFrequency = adsFreqRows.length > 0 ? adsFreqRows.reduce((sum, r) => sum + (r.thực_tế_actual || 0), 0) / adsFreqRows.length : 0;

  // PR
  const prQuantitySum = brandOohPr
    .filter((row) => row.hạng_mục === "PR - báo chí" && row.chỉ_số_metric === "Quantity")
    .reduce((sum, row) => sum + (row.thực_tế_actual || 0), 0);

  // Retail/BTL
  const retailRows = brandBtl.filter((row) => row.hạng_mục_lớn === "POSM");
  const totalRetailTichLuy = retailRows.reduce((sum, row) => sum + (row.tích_lũy_tháng || 0), 0);

  // TVC data
  const hasTvcData = brandDigital.some(row => (row.hạng_mục || "").toLowerCase() === "tvc");

  if (brand === "Livotec") {
    const evaluation = `Báo cáo tuần ${weekStr} của Livotec ghi nhận hoạt động tích cực ở mảng SEO Website (đạt ${seoTrafficWeeklyActual.toLocaleString()} traffic organic thực tế so với mục tiêu ${seoTrafficWeeklyTarget.toLocaleString()}) và mảng Content sản xuất được ${weeklyContentSum} ấn phẩm. Chỉ số thảo luận Share of Voice đạt ${sovPercentage.toFixed(1)}%. Mảng quảng cáo Paid Ads tuần này tiêu hết ${(weeklyAdsSpent / 1000000).toFixed(1)}M VNĐ với ${weeklyAdsImpressions.toLocaleString()} Impressions và ${weeklyAdsReach.toLocaleString()} Reach.`;
    
    const proposals = `1. **Tối ưu hóa các mảng quảng cáo Paid Ads**: Tập trung ngân sách vào các nhóm quảng cáo có CPM thấp và Reach cao trong tuần.\n2. **Tăng cường SEO Content**: Sản xuất thêm bài viết chất lượng cao để cải thiện traffic organic và impressions Website.\n3. **Cải thiện Share of Voice (SOV)**: Tạo các chủ đề tương tác tự nhiên trên social media để thúc đẩy thảo luận thương hiệu.`;

    return {
      evaluation,
      proposals,
      categories: {
        sov: `Chỉ số Share of Voice (SOV) của Livotec tuần này đạt ${sovPercentage.toFixed(1)}% thị phần thảo luận toàn ngành. Cần tích cực đẩy mạnh các nội dung kích thích tương tác tự nhiên trên các hội nhóm.`,
        kol_koc: `Trong tuần ghi nhận ${totalKolKocTrongTuan} KOL/KOC hoạt động thực tế, lũy kế đạt ${totalKolKocTichLuy}/${totalKolKocKpi} KOL/KOC của chiến dịch.`,
        content: `Mảng Content và Sáng tạo hoàn thành ${weeklyContentSum} bài viết/video trong tuần báo cáo, đóng góp nội dung phong phú cho fanpage và website.`,
        tvc: hasTvcData ? `Chiến dịch TVC của Livotec ghi nhận các hoạt động quảng bá GRPs ổn định tại các thành phố lớn.` : `Chưa ghi nhận chiến dịch TVC GRPs diện rộng được triển khai trong tuần này.`,
        paid_ads: `Chi tiêu quảng cáo đạt ${(weeklyAdsSpent / 1000000).toFixed(1)}M VNĐ, mang về ${weeklyAdsImpressions.toLocaleString()} lượt hiển thị và ${weeklyAdsReach.toLocaleString()} lượt tiếp cận độc giả với tần suất trung bình ${avgAdsFrequency.toFixed(2)}x.`,
        paid_ads_monthly: `Lũy kế tháng của Paid Ads Livotec ghi nhận kết quả khả quan, tổng chi tiêu bám sát ngân sách phân bổ, mang lại hiệu quả hiển thị cao với CPM tối ưu.`,
        seo: `SEO Website thu về ${seoTrafficWeeklyActual.toLocaleString()} Traffic Organic thực tế (mục tiêu tuần là ${seoTrafficWeeklyTarget.toLocaleString()}) với tổng số ${seoImpressionsWeeklyActual.toLocaleString()} Impressions.`,
        seo_monthly: `Lũy kế tháng của SEO Website Livotec ghi nhận sự tăng trưởng ổn định về Traffic Organic tích lũy hướng tới mục tiêu đề ra cho tháng.`,
        btl_trade: `Mảng POSM & Trade Marketing lũy kế đạt ${totalRetailTichLuy.toLocaleString()} vật dụng trưng bày tại các điểm bán.`,
        btl_trade_monthly: `Lũy kế mảng POSM & Trade Marketing của Livotec ghi nhận kết quả tích cực, hoàn thành phần lớn kế hoạch tháng 6 tại các điểm bán GT lẻ.`,
        pr: `Hoạt động PR báo chí tuần này xuất bản được ${prQuantitySum} bài viết chất lượng hỗ trợ thương hiệu.`,
        ooh: `Mảng OOH ngoài trời và LCD duy trì tần suất phát sóng tốt tại các địa điểm trọng yếu Hà Nội và TP.HCM.`,
        tvc_digital: hasTvcData ? `Chiến dịch TVC của Livotec ghi nhận các hoạt động quảng bá GRPs ổn định tại các thành phố lớn.` : `Chưa ghi nhận chiến dịch TVC GRPs diện rộng được triển khai trong tuần này.`,
      }
    };
  } else {
    const evaluation = `Tuần ${weekStr} ghi nhận vị thế mạnh mẽ của Karofi với Share of Voice đạt ${sovPercentage.toFixed(1)}% thị phần thảo luận. SEO Website đạt ${seoTrafficWeeklyActual.toLocaleString()} Traffic Organic thực tế so với mục tiêu ${seoTrafficWeeklyTarget.toLocaleString()}. Hoạt động Paid Ads tiêu hết ${(weeklyAdsSpent / 1000000).toFixed(1)}M VNĐ, phủ rộng ${weeklyAdsReach.toLocaleString()} Reach và đạt ${weeklyAdsImpressions.toLocaleString()} Impressions.`;
    
    const proposals = `1. **Duy trì hiệu quả SEO Website**: Tiếp tục cập nhật các từ khóa Always-On chất lượng cao để giữ đà tăng trưởng.\n2. **Tối ưu tần suất hiển thị Paid Ads**: Đảm bảo tần suất hiển thị quảng cáo ở mức tối ưu (${avgAdsFrequency.toFixed(2)}x) để tăng độ phủ rộng rãi.\n3. **Đẩy nhanh tiến độ Trade Marketing**: Tăng cường kiểm soát hình ảnh điểm bán và hoàn thành kế hoạch POSM tháng.`;

    return {
      evaluation,
      proposals,
      categories: {
        sov: `Karofi giữ vững phong độ với Share of Voice đạt ${sovPercentage.toFixed(1)}% thị phần thảo luận, khẳng định sức mạnh truyền thông hàng đầu thị trường.`,
        kol_koc: `Hoạt động KOL/KOC trong tuần đạt ${totalKolKocTrongTuan} lượt thực hiện trực tiếp, lũy kế chiến dịch đạt ${totalKolKocTichLuy}/${totalKolKocKpi} KOL/KOC.`,
        content: `Đội ngũ sản xuất nội dung đạt ${weeklyContentSum} ấn phẩm/bài viết mới trong tuần, hỗ trợ tối đa cho các hoạt động Paid Ads.`,
        tvc: hasTvcData ? `Chiến dịch TVC GRPs của Karofi đạt mục tiêu hiển thị tại các thị trường trọng điểm.` : `Chưa ghi nhận chiến dịch TVC GRPs diện rộng được triển khai trong tuần này.`,
        paid_ads: `Kênh Paid Ads tiêu thụ ${(weeklyAdsSpent / 1000000).toFixed(1)}M VNĐ ngân sách quảng cáo, đem lại ${weeklyAdsImpressions.toLocaleString()} hiển thị, tiếp cận ${weeklyAdsReach.toLocaleString()} người dùng độc lập.`,
        paid_ads_monthly: `Lũy kế mảng Paid Ads của Karofi trong tháng đạt hiệu quả hiển thị vượt trội trên các kênh, giữ vững độ phủ và tiếp cận thương hiệu rộng rãi.`,
        seo: `Website SEO đạt ${seoTrafficWeeklyActual.toLocaleString()} Organic Traffic thực tế (mục tiêu ${seoTrafficWeeklyTarget.toLocaleString()}) và ${seoImpressionsWeeklyActual.toLocaleString()} Impressions cực kỳ ấn tượng.`,
        seo_monthly: `Lũy kế SEO Website tháng này của Karofi ghi nhận sự bùng nổ mạnh mẽ, vượt chỉ tiêu đề ra nhờ lượng truy cập tự nhiên tăng mạnh liên tục.`,
        btl_trade: `Các điểm bán lẻ ghi nhận sự hiện diện mạnh mẽ với các thiết bị POSM đạt tích lũy ${totalRetailTichLuy.toLocaleString()} vật dụng trưng bày.`,
        btl_trade_monthly: `Mảng POSM & Trade Marketing lũy kế đạt kết quả ấn tượng, khẳng định độ bao phủ trưng bày rộng rãi và đồng bộ.`,
        pr: `Ghi nhận ${prQuantitySum} bài PR báo chí chất lượng được phát hành trong tuần giúp lan tỏa uy tín thương hiệu.`,
        ooh: `Mảng OOH triển khai rộng khắp với 3.280 địa điểm LCD và 10.794 màn hình LED. Kênh LED city (26 điểm) và LED sân bay (18 điểm) hoàn thành kế hoạch hiển thị, mang lại ấn tượng thị giác cực kỳ mạnh mẽ.`,
        tvc_digital: hasTvcData ? `Chiến dịch TVC GRPs của Karofi đạt mục tiêu hiển thị tại các thị trường trọng điểm.` : `Chưa ghi nhận chiến dịch TVC GRPs diện rộng được triển khai trong tuần này.`,
      }
    };
  }
};

export default function App() {
  // Authentication & Users State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem("marketing_current_user");
    return saved ? JSON.parse(saved) : null;
  });
  
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem("marketing_users_list");
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  // Login form inputs
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // User Manager states (Add/Edit User Form)
  const [managerUsername, setManagerUsername] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerRole, setManagerRole] = useState<"Admin" | "Editor" | "Viewer">("Viewer");
  const [editingUsername, setEditingUsername] = useState<string | null>(null);

  // Navigation & Brand States
  const [activeTab, setActiveTab] = useState<"dashboard" | "control-panel">("dashboard");
  const [selectedBrand, setSelectedBrand] = useState<"Livotec" | "Karofi">("Livotec");
  const [selectedTimeline, setSelectedTimeline] = useState(FALLBACK_TIMELINES[0]);

  // Core Data States
  const [marketingData, setMarketingData] = useState<MarketingReportData>(() => {
    const saved = localStorage.getItem("marketing_report_raw_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return normalizeMarketingData(parsed);
      } catch (e) {
        console.error("Error reading saved raw data on init", e);
      }
    }
    return normalizeMarketingData(INITIAL_MARKETING_DATA);
  });

  // Dynamically derive timelines from marketingData
  const timelines = React.useMemo(() => {
    const weeksSet = new Set<string>();
    
    // Add default timelines as starting values
    FALLBACK_TIMELINES.forEach(t => weeksSet.add(t.week));

    const checkAndAdd = (list: any[]) => {
      if (!Array.isArray(list)) return;
      for (const row of list) {
        if (row && typeof row === "object") {
          const w = row.week;
          if (w && typeof w === "string") {
            const trimmed = w.trim();
            if (trimmed) {
              weeksSet.add(trimmed);
            }
          }
        }
      }
    };

    checkAndAdd(marketingData?.digital_marketing);
    checkAndAdd(marketingData?.kol_koc);
    checkAndAdd(marketingData?.btl_trade);
    checkAndAdd(marketingData?.monthly_ooh_pr);

    const sortedWeeks = Array.from(weeksSet).sort((a, b) => {
      const parseWeekDate = (w: string) => {
        try {
          const parts = w.split("-");
          const endPart = parts[1] || parts[0];
          const dateParts = endPart.split("/");
          const day = parseInt(dateParts[0], 10) || 1;
          const month = parseInt(dateParts[1], 10) || 1;
          const year = parseInt(dateParts[2], 10) || 2026;
          return new Date(year, month - 1, day).getTime();
        } catch {
          return 0;
        }
      };
      return parseWeekDate(b) - parseWeekDate(a);
    });

    return sortedWeeks.map((weekStr, index) => {
      const fallback = FALLBACK_TIMELINES.find(t => t.week === weekStr);
      if (fallback) return fallback;

      // Create a nice human label for dynamically added weeks
      let label = `Tuần (${weekStr})`;
      const parts = weekStr.split("-");
      if (parts.length === 2) {
        const start = parts[0];
        const endWithYear = parts[1];
        const endParts = endWithYear.split("/");
        if (endParts.length === 3) {
          label = `Tuần (${start} - ${endParts[0]}/${endParts[1]}/${endParts[2]})`;
        }
      }

      return {
        id: `dynamic-week-${index}`,
        label,
        isPRWeek: false,
        date: weekStr.split("-")[1]?.split("/").reverse().join("-") || "2026-06-25",
        startDate: weekStr.split("-")[0]?.split("/").reverse().join("-") || "2026-06-19",
        endDate: weekStr.split("-")[1]?.split("/").reverse().join("-") || "2026-06-25",
        week: weekStr
      };
    });
  }, [marketingData]);

  // Track if we have performed initial auto-selection of the newest week from database on start
  const hasAutoSelectedNewest = React.useRef(false);

  // Auto-select the newest week in the database once the timeline list is loaded/updated
  useEffect(() => {
    if (timelines.length > 0 && !hasAutoSelectedNewest.current) {
      // Find the absolute newest week (timelines[0] is already sorted newest-first)
      const newest = timelines[0];
      setSelectedTimeline(newest);
      hasAutoSelectedNewest.current = true;
    }
  }, [timelines]);

  // Synchronize selectedTimeline with available timelines if the current one is not valid
  const activeTimeline = React.useMemo(() => {
    const found = timelines.find(t => normalizeWeek(t.week) === normalizeWeek(selectedTimeline?.week));
    return found || timelines[0] || FALLBACK_TIMELINES[0];
  }, [timelines, selectedTimeline]);

  const [publishedComments, setPublishedComments] = useState<Record<string, { Livotec: BrandComments; Karofi: BrandComments }>>(() => {
    const initData = (() => {
      const savedData = localStorage.getItem("marketing_report_raw_data");
      if (savedData) {
        try {
          return normalizeMarketingData(JSON.parse(savedData));
        } catch (e) {}
      }
      return normalizeMarketingData(INITIAL_MARKETING_DATA);
    })();

    const saved = localStorage.getItem("marketing_published_comments");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const keys = Object.keys(parsed);
        if (keys.includes("Livotec") || keys.includes("Karofi")) {
          const migrated = buildDefaultCommentsByWeek(initData);
          migrated[normalizeWeek("19/06-25/06/2026")] = parsed as any;
          return migrated;
        }
        
        // Normalize all keys
        const normalizedParsed: Record<string, any> = {};
        for (const k of keys) {
          normalizedParsed[normalizeWeek(k)] = parsed[k];
        }
        return normalizedParsed;
      } catch (e) {
        console.error("Error reading saved published comments", e);
      }
    }
    return buildDefaultCommentsByWeek(initData);
  });

  // Control Panel Draft Comments States (allows editing before publishing)
  const [draftComments, setDraftComments] = useState<Record<string, { Livotec: BrandComments; Karofi: BrandComments }>>(() => {
    const initData = (() => {
      const savedData = localStorage.getItem("marketing_report_raw_data");
      if (savedData) {
        try {
          return normalizeMarketingData(JSON.parse(savedData));
        } catch (e) {}
      }
      return normalizeMarketingData(INITIAL_MARKETING_DATA);
    })();

    const saved = localStorage.getItem("marketing_published_comments");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const keys = Object.keys(parsed);
        if (keys.includes("Livotec") || keys.includes("Karofi")) {
          const migrated = buildDefaultCommentsByWeek(initData);
          migrated[normalizeWeek("19/06-25/06/2026")] = parsed as any;
          return migrated;
        }
        
        // Normalize all keys
        const normalizedParsed: Record<string, any> = {};
        for (const k of keys) {
          normalizedParsed[normalizeWeek(k)] = parsed[k];
        }
        return normalizedParsed;
      } catch (e) {
        console.error("Error reading saved published comments for draft", e);
      }
    }
    return buildDefaultCommentsByWeek(initData);
  });

  // UI / Interactive States
  const [categoryTimeViews, setCategoryTimeViews] = useState<{ [key: string]: "week" | "month" }>({
    paidAds: "week",
    seo: "week",
  });
  
  // Category tab state in Box 3
  const [activeCategoryTab, setActiveCategoryTab] = useState<"all" | "sov" | "kol" | "content" | "tvc" | "ads" | "seo" | "btl" | "pr" | "ooh">("all");

  // State for filtering Paid Ads by industry
  const [selectedAdsIndustry, setSelectedAdsIndustry] = useState<string>("Tất cả");

  // Reset Paid Ads industry filter when selected brand changes
  useEffect(() => {
    setSelectedAdsIndustry("Tất cả");
  }, [selectedBrand]);

  // Auto-switch to the first tab with data if the current tab doesn't have data for the selected brand
  useEffect(() => {
    const rawDigital = marketingData?.digital_marketing || [];
    const rawBtl = marketingData?.btl_trade || [];
    const rawKol = marketingData?.kol_koc || [];
    const rawOohPr = marketingData?.monthly_ooh_pr || [];

    const digital = rawDigital.filter(
      (row) => row.brand && row.brand.toLowerCase() === selectedBrand.toLowerCase()
    );
    const btl = rawBtl.filter(
      (row) => row.brand && row.brand.toLowerCase() === selectedBrand.toLowerCase()
    );
    const kol = rawKol.filter((row) => {
      if ("brand" in row && (row as any).brand) {
        return (row as any).brand.toLowerCase() === selectedBrand.toLowerCase();
      }
      return selectedBrand.toLowerCase() === "livotec";
    });
    const oohPr = rawOohPr.filter(
      (row) => row.brand && row.brand.toLowerCase() === selectedBrand.toLowerCase()
    );

    const activeBrandSov = rawDigital.filter(
      (row) => row.hạng_mục === "Social Listening"
    ).find(
      (row) => row.kênh_channel && row.kênh_channel.toLowerCase() === selectedBrand.toLowerCase()
    );

    const hasSov = activeBrandSov ? (activeBrandSov.thực_tế_actual || 0) > 0 : false;
    const hasKol = kol.length > 0;
    const hasContent = digital.some((row) => row.nhóm_báo_cáo === "Content");
    const hasTvc = digital.some((row) => row.hạng_mục === "TVC");
    const hasAds = digital.some((row) => row.hạng_mục === "Paid Ads");
    const hasSeo = digital.some((row) => row.hạng_mục === "SEO Website" || row.hạng_mục === "SEO Content" || row.hạng_mục === "Product Page");
    const hasBtl = btl.length > 0;
    const hasPr = oohPr.some((row) => row.hạng_mục === "PR - báo chí");
    const hasOoh = oohPr.some((row) => row.hạng_mục === "OOH");

    const tabsStatus = {
      sov: hasSov,
      kol: hasKol,
      content: hasContent,
      tvc: hasTvc,
      ads: hasAds,
      seo: hasSeo,
      btl: hasBtl,
      pr: hasPr,
      ooh: hasOoh
    };

    if (activeCategoryTab !== "all" && !tabsStatus[activeCategoryTab as keyof typeof tabsStatus]) {
      const firstAvailable = (Object.keys(tabsStatus) as Array<keyof typeof tabsStatus>).find(k => tabsStatus[k]);
      if (firstAvailable) {
        setActiveCategoryTab("all");
      }
    }
  }, [selectedBrand, marketingData, activeCategoryTab]);

  // Control Panel Import states
  const [driveUrl, setDriveUrl] = useState("");
  const [pastedJson, setPastedJson] = useState(() => {
    const saved = localStorage.getItem("marketing_report_raw_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          return JSON.stringify(parsed, null, 2);
        }
      } catch (e) {
        console.error("Error reading saved raw data for pastedJson", e);
      }
    }
    return JSON.stringify(INITIAL_MARKETING_DATA, null, 2);
  });
  const [isDriveLoading, setIsDriveLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);

  // Online JSON Sync & Auto Update States
  const [syncUrl, setSyncUrl] = useState<string>(() => {
    return localStorage.getItem("marketing_sync_url") || "";
  });
  const [syncMode, setSyncMode] = useState<"manual" | "auto">(() => {
    return (localStorage.getItem("marketing_sync_mode") as "manual" | "auto") || "manual";
  });
  const [syncInterval, setSyncInterval] = useState<number>(() => {
    const saved = localStorage.getItem("marketing_sync_interval");
    return saved ? parseInt(saved, 10) : 60000; // default 1 minute (60,000 ms)
  });
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => {
    return localStorage.getItem("marketing_last_sync_time") || null;
  });
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error" | "syncing">("idle");
  const [isSyncing, setIsSyncing] = useState(false);

  // Core handler to sync remote JSON data
  const handleRemoteJsonSync = async (urlToSync?: string) => {
    const targetUrl = urlToSync !== undefined ? urlToSync : syncUrl;
    if (!targetUrl || !targetUrl.trim()) {
      return;
    }

    setIsSyncing(true);
    setSyncStatus("syncing");
    try {
      const response = await fetch("/api/fetch-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl.trim() }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        const parsed = result.data;
        const safeData = normalizeMarketingData(parsed);

        setMarketingData(safeData);
        setPastedJson(JSON.stringify(safeData, null, 2));
        localStorage.setItem("marketing_report_raw_data", JSON.stringify(safeData));
        
        const nowStr = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setLastSyncTime(nowStr);
        setSyncStatus("success");
        localStorage.setItem("marketing_last_sync_time", nowStr);
        
        triggerNotification("success", `Đồng bộ dữ liệu trực tuyến tự động thành công lúc ${nowStr}!`);
      } else {
        throw new Error(result.error || "Không thể tải dữ liệu JSON từ liên kết.");
      }
    } catch (err: any) {
      setSyncStatus("error");
      triggerNotification("error", `Lỗi đồng bộ JSON: ${err.message || err}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Persist sync settings
  useEffect(() => {
    localStorage.setItem("marketing_sync_url", syncUrl);
  }, [syncUrl]);

  useEffect(() => {
    localStorage.setItem("marketing_sync_mode", syncMode);
  }, [syncMode]);

  useEffect(() => {
    localStorage.setItem("marketing_sync_interval", syncInterval.toString());
  }, [syncInterval]);

  // Auto sync runner effect
  useEffect(() => {
    if (syncMode === "auto" && syncUrl.trim()) {
      handleRemoteJsonSync(syncUrl);
    }

    if (syncMode !== "auto" || !syncUrl.trim()) {
      return;
    }

    const intervalId = setInterval(() => {
      console.log("Auto-syncing data from:", syncUrl);
      handleRemoteJsonSync(syncUrl);
    }, syncInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [syncMode, syncUrl, syncInterval]);

  // Load initial data from server database on mount
  useEffect(() => {
    const fetchDB = async () => {
      try {
        // Fetch Marketing Data
        const mRes = await fetch("/api/marketing-data");
        const mData = await mRes.json();
        if (mRes.ok && mData.success) {
          const safeData = normalizeMarketingData(mData.data);
          setMarketingData(safeData);
          setPastedJson(JSON.stringify(safeData, null, 2));
          localStorage.setItem("marketing_report_raw_data", JSON.stringify(safeData));
        }

        // Fetch Comments
        const cRes = await fetch("/api/comments");
        const cData = await cRes.json();
        if (cRes.ok && cData.success) {
          setPublishedComments(cData.data);
          setDraftComments(JSON.parse(JSON.stringify(cData.data)));
          localStorage.setItem("marketing_published_comments", JSON.stringify(cData.data));
        }

        // Fetch Users
        const uRes = await fetch("/api/users");
        const uData = await uRes.json();
        if (uRes.ok && uData.success) {
          setUsers(uData.data);
          localStorage.setItem("marketing_users_list", JSON.stringify(uData.data));
        }
      } catch (err) {
        console.warn("Failed to fetch initial data from backend database, using local storage fallbacks:", err);
      }
    };
    fetchDB();
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Persist users to database and localStorage
  useEffect(() => {
    localStorage.setItem("marketing_users_list", JSON.stringify(users));
    
    // Skip sync if it's the initial default list before loading finishes
    if (users.length === DEFAULT_USERS.length && JSON.stringify(users) === JSON.stringify(DEFAULT_USERS)) {
      return;
    }

    const syncUsers = async () => {
      try {
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ users }),
        });
      } catch (err) {
        console.warn("Failed to sync users with backend DB:", err);
      }
    };
    syncUsers();
  }, [users]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginUsername.trim() || !loginPassword) {
      setLoginError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    const foundUser = users.find(
      (u) => u.username.toLowerCase() === loginUsername.trim().toLowerCase() && u.password === loginPassword
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem("marketing_current_user", JSON.stringify(foundUser));
      triggerNotification("success", `Chào mừng ${foundUser.name} (${foundUser.role}) quay lại hệ thống!`);
      if (foundUser.role === "Viewer") {
        setActiveTab("dashboard");
      }
    } else {
      setLoginError("Tên đăng nhập hoặc mật khẩu không chính xác.");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("marketing_current_user");
    setLoginUsername("");
    setLoginPassword("");
    triggerNotification("success", "Đã đăng xuất khỏi hệ thống.");
  };

  // User management handlers
  const handleAddOrEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managerUsername.trim() || !managerName.trim() || (!editingUsername && !managerPassword)) {
      triggerNotification("error", "Vui lòng điền đầy đủ các thông tin người dùng.");
      return;
    }

    if (editingUsername) {
      // Editing mode
      setUsers(
        users.map((u) =>
          u.username.toLowerCase() === editingUsername.toLowerCase()
            ? { ...u, name: managerName.trim(), password: managerPassword ? managerPassword : u.password, role: managerRole }
            : u
        )
      );

      if (currentUser && currentUser.username.toLowerCase() === editingUsername.toLowerCase()) {
        const updatedSelf = { ...currentUser, name: managerName.trim(), password: managerPassword ? managerPassword : currentUser.password, role: managerRole };
        setCurrentUser(updatedSelf);
        localStorage.setItem("marketing_current_user", JSON.stringify(updatedSelf));
      }

      triggerNotification("success", `Đã cập nhật thông tin người dùng ${managerUsername} thành công!`);
      setEditingUsername(null);
    } else {
      // Adding mode
      const exists = users.some((u) => u.username.toLowerCase() === managerUsername.trim().toLowerCase());
      if (exists) {
        triggerNotification("error", "Tên đăng nhập đã tồn tại trong hệ thống.");
        return;
      }

      const newUser: UserAccount = {
        username: managerUsername.trim().toLowerCase(),
        password: managerPassword,
        name: managerName.trim(),
        role: managerRole,
      };

      setUsers([...users, newUser]);
      triggerNotification("success", `Đã thêm thành viên mới: ${managerName} (${managerRole})!`);
    }

    setManagerUsername("");
    setManagerPassword("");
    setManagerName("");
    setManagerRole("Viewer");
  };

  const handleStartEditUser = (u: UserAccount) => {
    setEditingUsername(u.username);
    setManagerUsername(u.username);
    setManagerPassword(""); // Do not pre-populate or show password for security
    setManagerName(u.name);
    setManagerRole(u.role);
  };

  const handleDeleteUser = (usernameToDelete: string) => {
    if (currentUser && currentUser.username.toLowerCase() === usernameToDelete.toLowerCase()) {
      triggerNotification("error", "Bạn không thể tự xóa chính mình khi đang đăng nhập.");
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${usernameToDelete} khỏi hệ thống?`)) {
      setUsers(users.filter((u) => u.username.toLowerCase() !== usernameToDelete.toLowerCase()));
      triggerNotification("success", `Đã xóa tài khoản ${usernameToDelete} thành công.`);

      if (editingUsername && editingUsername.toLowerCase() === usernameToDelete.toLowerCase()) {
        setEditingUsername(null);
        setManagerUsername("");
        setManagerPassword("");
        setManagerName("");
        setManagerRole("Viewer");
      }
    }
  };

  // Google Drive connection
  const handleDriveImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveUrl.trim()) return;

    setIsDriveLoading(true);
    try {
      const response = await fetch("/api/fetch-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: driveUrl }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        const parsed = result.data;
        const safeData = normalizeMarketingData(parsed);
        setMarketingData(safeData);
        setPastedJson(JSON.stringify(safeData, null, 2));
        localStorage.setItem("marketing_report_raw_data", JSON.stringify(safeData));
        triggerNotification("success", "Đã kết nối và đồng bộ dữ liệu từ Google Drive thành công!");
      } else {
        throw new Error(result.error || "Không thể tải dữ liệu từ Google Drive.");
      }
    } catch (err: any) {
      triggerNotification("error", err.message || "Lỗi kết nối tệp trực tuyến.");
    } finally {
      setIsDriveLoading(false);
    }
  };

  // Paste raw JSON submission
  const handleJsonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(pastedJson);
      const safeData = normalizeMarketingData(parsed);

      // POST to server to merge and save
      const response = await fetch("/api/marketing-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: safeData }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        const mergedData = normalizeMarketingData(result.data);
        setMarketingData(mergedData);
        setPastedJson(JSON.stringify(mergedData, null, 2));
        localStorage.setItem("marketing_report_raw_data", JSON.stringify(mergedData));
        triggerNotification("success", "Cập nhật và đồng bộ dữ liệu tuần mới vào database thành công!");
      } else {
        throw new Error(result.error || "Không thể đồng bộ vào database.");
      }
    } catch (err: any) {
      triggerNotification("error", `Lỗi định dạng JSON hoặc đồng bộ: ${err.message}`);
    }
  };

  // Reset to default initial dataset
  const handleResetData = async () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục toàn bộ dữ liệu báo cáo và nhận định về mặc định ban đầu không?")) {
      try {
        const res = await fetch("/api/reset-data", { method: "POST" });
        const result = await res.json();
        if (res.ok && result.success) {
          const mData = normalizeMarketingData(result.marketingData);
          setMarketingData(mData);
          setPastedJson(JSON.stringify(mData, null, 2));
          
          setPublishedComments(result.comments);
          setDraftComments(JSON.parse(JSON.stringify(result.comments)));
          
          setUsers(result.users);

          localStorage.removeItem("marketing_report_raw_data");
          localStorage.removeItem("marketing_published_comments");
          localStorage.removeItem("marketing_users_list");
          
          setHasUnpublishedChanges(false);
          triggerNotification("success", "Đã khôi phục dữ liệu, nhận định và tài khoản về trạng thái mặc định trên database.");
        } else {
          throw new Error(result.error || "Failed to reset server DB");
        }
      } catch (err: any) {
        console.warn("Failed to reset database on server, falling back to local reset:", err);
        setMarketingData(INITIAL_MARKETING_DATA);
        setPastedJson(JSON.stringify(INITIAL_MARKETING_DATA, null, 2));
        
        const defaultPublished = buildDefaultCommentsByWeek(INITIAL_MARKETING_DATA);
        setPublishedComments(defaultPublished);
        setDraftComments(JSON.parse(JSON.stringify(defaultPublished)));
        
        localStorage.removeItem("marketing_report_raw_data");
        localStorage.removeItem("marketing_published_comments");
        
        setHasUnpublishedChanges(false);
        triggerNotification("success", "Đã khôi phục dữ liệu và nhận định về trạng thái mặc định (Local).");
      }
    }
  };

  // AI suggestions from Gemini API
  const handleAiSuggestions = async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: marketingData, brand: selectedBrand, week: activeTimeline.week }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        const aiAnalysis = result.analysis;
        
        // Update draft for current brand
        const updatedDraft = { ...draftComments };
        const weekKey = normalizeWeek(activeTimeline.week);
        if (!updatedDraft[weekKey]) {
          updatedDraft[weekKey] = {
            Livotec: getDynamicDefaultComments("Livotec", activeTimeline.week, marketingData),
            Karofi: getDynamicDefaultComments("Karofi", activeTimeline.week, marketingData),
          };
        }
        updatedDraft[weekKey][selectedBrand] = {
          evaluation: aiAnalysis.executiveSummary.evaluation,
          proposals: aiAnalysis.executiveSummary.proposals,
          categories: {
            sov: aiAnalysis.categoryAnalysis.sov,
            kol_koc: aiAnalysis.categoryAnalysis.kol_koc,
            content: aiAnalysis.categoryAnalysis.content || "",
            tvc: aiAnalysis.categoryAnalysis.tvc,
            paid_ads: aiAnalysis.categoryAnalysis.paid_ads,
            seo: aiAnalysis.categoryAnalysis.seo,
            btl_trade: aiAnalysis.categoryAnalysis.btl_trade,
            pr: aiAnalysis.categoryAnalysis.pr || "",
            ooh: aiAnalysis.categoryAnalysis.ooh || "",
          }
        };

        setDraftComments(updatedDraft);
        setHasUnpublishedChanges(true);
        triggerNotification("success", `AI đã phân tích dữ liệu thực tế của ${selectedBrand} và điền các gợi ý vào biểu mẫu thành công! Bạn có thể chỉnh sửa thêm trước khi xuất bản.`);
      } else {
        throw new Error(result.error || "Không nhận được phân tích từ AI.");
      }
    } catch (err: any) {
      console.error(err);
      triggerNotification("error", `Lỗi phân tích AI: ${err.message || "Vui lòng kiểm tra cấu hình khóa API trong Secrets."}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Draft changes
  const handleDraftCommentChange = (field: "evaluation" | "proposals", value: string) => {
    const updated = { ...draftComments };
    const weekKey = normalizeWeek(activeTimeline.week);
    if (!updated[weekKey]) {
      updated[weekKey] = {
        Livotec: getDynamicDefaultComments("Livotec", activeTimeline.week, marketingData),
        Karofi: getDynamicDefaultComments("Karofi", activeTimeline.week, marketingData),
      };
    }
    updated[weekKey][selectedBrand][field] = value;
    setDraftComments(updated);
    setHasUnpublishedChanges(true);
  };

  const handleDraftCategoryChange = (catKey: keyof typeof DEFAULT_COMMENTS_LIVOTEC.categories, value: string) => {
    const updated = { ...draftComments };
    const weekKey = normalizeWeek(activeTimeline.week);
    if (!updated[weekKey]) {
      updated[weekKey] = {
        Livotec: getDynamicDefaultComments("Livotec", activeTimeline.week, marketingData),
        Karofi: getDynamicDefaultComments("Karofi", activeTimeline.week, marketingData),
      };
    }
    updated[weekKey][selectedBrand].categories[catKey] = value;
    setDraftComments(updated);
    setHasUnpublishedChanges(true);
  };

  // Publish Draft to live reporting dashboard
  const handlePublish = async () => {
    setPublishedComments(JSON.parse(JSON.stringify(draftComments)));
    localStorage.setItem("marketing_published_comments", JSON.stringify(draftComments));
    setHasUnpublishedChanges(false);
    triggerNotification("success", `Đã xuất bản thành công các nhận định mới của ${selectedBrand} tuần ${activeTimeline.label.split(" ")[1]} lên báo cáo chính thức!`);

    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: draftComments }),
      });
    } catch (err) {
      console.warn("Failed to sync comments with backend DB:", err);
    }
  };

  // ------------------------------------------------------------
  // DYNAMIC DATA PARSING & MATHEMATICAL DERIVATIONS
  // ------------------------------------------------------------
  
  // Helper to check if a record falls within the selected timeline
  const isInSelectedTimeline = (weekValue: string | undefined) => {
    if (!weekValue) return false;
    const normValue = normalizeWeek(weekValue);
    const normTimeline = normalizeWeek(activeTimeline.week);
    if (normValue === normTimeline) return true;
    if (normValue.includes(normTimeline) || normTimeline.includes(normValue)) return true;
    return false;
  };

  // Safe Fallback Lists
  const digitalMarketingList = marketingData?.digital_marketing || [];
  const btlTradeList = marketingData?.btl_trade || [];
  const kolKocList = marketingData?.kol_koc || [];
  const monthlyOohPrList = marketingData?.monthly_ooh_pr || [];

  // 1. Filtered data by active brand and selected timeline
  const brandDigital = digitalMarketingList.filter(
    (row) => row.brand && row.brand.toLowerCase().trim() === selectedBrand.toLowerCase().trim() && isInSelectedTimeline(row.week)
  );
  const brandBtl = btlTradeList.filter(
    (row) => row.brand && row.brand.toLowerCase().trim() === selectedBrand.toLowerCase().trim() && isInSelectedTimeline(row.week)
  );
  const brandOohPr = monthlyOohPrList.filter(
    (row) => row.brand && row.brand.toLowerCase().trim() === selectedBrand.toLowerCase().trim() && isInSelectedTimeline(row.week)
  );

  // 2. Share of Voice calculation (Always show industry snapshot for selected timeline)
  // In our JSON, Livotec & Karofi share of voice are under brand "Karofi" with kênh_channel as brand name
  const sovRows = digitalMarketingList.filter(
    (row) => row.hạng_mục === "Social Listening" && isInSelectedTimeline(row.week)
  );
  
  const sovData = sovRows.map((row) => ({
    name: row.kênh_channel,
    value: (row.thực_tế_actual || 0) * 100,
    formatted: `${((row.thực_tế_actual || 0) * 100).toFixed(1)}%`,
  })).sort((a, b) => b.value - a.value);

  const activeBrandSov = sovRows.find(
    (row) => row.kênh_channel && row.kênh_channel.toLowerCase() === selectedBrand.toLowerCase()
  );
  const sovPercentage = activeBrandSov ? (activeBrandSov.thực_tế_actual || 0) * 100 : 0;

  // 3. Content (số ấn phẩm) Weekly
  const contentRows = brandDigital.filter((row) => row.nhóm_báo_cáo === "Content");
  const weeklyContentSum = contentRows.reduce((sum, row) => sum + (row.thực_tế_actual || 0), 0);

  // Group contentRows by "hạng_mục" for the "Content & Sáng tạo" category chart
  const contentByHạngMụcMap = new Map<string, { name: string; mục_tiêu_target: number; thực_tế_actual: number; tích_lũy_tháng: number }>();
  contentRows.forEach((row) => {
    const key = row.hạng_mục || "Khác";
    if (!contentByHạngMụcMap.has(key)) {
      contentByHạngMụcMap.set(key, {
        name: key,
        mục_tiêu_target: 0,
        thực_tế_actual: 0,
        tích_lũy_tháng: 0,
      });
    }
    const item = contentByHạngMụcMap.get(key)!;
    item.mục_tiêu_target += (row.mục_tiêu_target || 0);
    item.thực_tế_actual += (row.thực_tế_actual || 0);
    item.tích_lũy_tháng += (row.tích_lũy_tháng || 0);
  });
  const contentByHạngMục = Array.from(contentByHạngMụcMap.values());

  // 4. SEO Organic Traffic Weekly & Monthly
  const seoTrafficRow = brandDigital.find(
    (row) => row.hạng_mục === "SEO Website" && row.chỉ_số_metric === "Traffic Organic"
  );
  const seoTrafficWeeklyTarget = seoTrafficRow ? seoTrafficRow.mục_tiêu_target || 0 : 0;
  const seoTrafficWeeklyActual = seoTrafficRow ? seoTrafficRow.thực_tế_actual || 0 : 0;
  const seoTrafficMonthlyTarget = seoTrafficRow ? seoTrafficRow.target_tháng || 0 : 0;
  const seoTrafficMonthlyActual = seoTrafficRow ? seoTrafficRow.tích_lũy_tháng || 0 : 0;

  const seoImpressionsRow = brandDigital.find(
    (row) => row.hạng_mục === "SEO Website" && row.chỉ_số_metric === "Impressions Organic"
  );
  const seoImpressionsWeeklyTarget = seoImpressionsRow ? seoImpressionsRow.mục_tiêu_target || 0 : 0;
  const seoImpressionsWeeklyActual = seoImpressionsRow ? seoImpressionsRow.thực_tế_actual || 0 : 0;
  const seoImpressionsMonthlyTarget = seoImpressionsRow ? seoImpressionsRow.target_tháng || 0 : 0;
  const seoImpressionsMonthlyActual = seoImpressionsRow ? seoImpressionsRow.tích_lũy_tháng || 0 : 0;

  // 5. PR articles quantity (Conditional weekly scorecard / accumulated)
  const prQuantityRow = brandOohPr.find(
    (row) => row.hạng_mục === "PR - báo chí" && row.chỉ_số_metric === "Quantity"
  );
  // Sum of PR quantity for the brand in the month (represented in monthly_ooh_pr)
  const prQuantitySum = brandOohPr
    .filter((row) => row.hạng_mục === "PR - báo chí" && row.chỉ_số_metric === "Quantity")
    .reduce((sum, row) => sum + (row.thực_tế_actual || 0), 0);

  // 5.5. KOL/KOC Calculations (Filtered by Brand & Timeline)
  const brandKolKoc = kolKocList.filter((row) => {
    const hasBrand = "brand" in row && typeof (row as any).brand === "string" && (row as any).brand.trim();
    const isBrandMatch = hasBrand
      ? (row as any).brand.toLowerCase().trim() === selectedBrand.toLowerCase().trim()
      : selectedBrand.toLowerCase() === "livotec"; // fallback default
    return isBrandMatch && isInSelectedTimeline(row.week);
  });

  const totalKolKocKpi = brandKolKoc.reduce((sum, r) => sum + (r.kpi_toàn_chiến_dịch || 0), 0);
  const totalKolKocTichLuy = brandKolKoc.reduce((sum, r) => sum + (r.tích_lũy_chiến_dịch || 0), 0);
  const totalKolKocTrongTuan = brandKolKoc.reduce((sum, r) => sum + (r.thực_tế_trong_tuần || 0), 0);

  // 6. Paid Ads Calculations (Spent, Impressions, Reach, Frequency)
  const adsSpentRows = brandDigital.filter(
    (row) => row.hạng_mục === "Paid Ads" && row.chỉ_số_metric === "Amount spent (VNĐ)"
  );
  const adsImpressionRows = brandDigital.filter(
    (row) => row.hạng_mục === "Paid Ads" && row.chỉ_số_metric === "Impressions"
  );
  const adsReachRows = brandDigital.filter(
    (row) => row.hạng_mục === "Paid Ads" && row.chỉ_số_metric === "Reach"
  );
  const adsFreqRows = brandDigital.filter(
    (row) => row.hạng_mục === "Paid Ads" && row.chỉ_số_metric === "Frequency"
  );

  // Weekly sums (since they represent the active week)
  // If some rows are MTD in database, we only sum non-null actual or check row is weekly
  const weeklyAdsSpent = adsSpentRows
    .filter((r) => r.phân_loại_thời_gian === "Weekly" || r.thực_tế_actual !== null)
    .reduce((sum, r) => sum + (r.thực_tế_actual || 0), 0);
    
  const monthlyAdsSpent = adsSpentRows.reduce((sum, r) => sum + (r.tích_lũy_tháng || 0), 0);
  const monthlyAdsSpentTarget = adsSpentRows.reduce((sum, r) => sum + (r.target_tháng || 0), 0);

  const weeklyAdsImpressions = adsImpressionRows
    .filter((r) => r.phân_loại_thời_gian === "Weekly" || r.thực_tế_actual !== null)
    .reduce((sum, r) => sum + (r.thực_tế_actual || r.tích_lũy_tháng || 0), 0);
    
  const monthlyAdsImpressions = adsImpressionRows.reduce((sum, r) => sum + (r.tích_lũy_tháng || 0), 0);
  const monthlyAdsImpressionsTarget = adsImpressionRows.reduce((sum, r) => sum + (r.target_tháng || 0), 0);

  const weeklyAdsReach = adsReachRows
    .filter((r) => r.phân_loại_thời_gian === "Weekly" || r.thực_tế_actual !== null)
    .reduce((sum, r) => sum + (r.thực_tế_actual || r.tích_lũy_tháng || 0), 0);
    
  const monthlyAdsReach = adsReachRows.reduce((sum, r) => sum + (r.tích_lũy_tháng || 0), 0);
  const monthlyAdsReachTarget = adsReachRows.reduce((sum, r) => sum + (r.target_tháng || 0), 0);

  // Average frequency
  const activeFreqRows = adsFreqRows.filter((r) => r.thực_tế_actual !== null || r.tích_lũy_tháng !== null);
  const avgAdsFrequency = activeFreqRows.length > 0 
    ? activeFreqRows.reduce((sum, r) => sum + (r.thực_tế_actual || r.tích_lũy_tháng || 0), 0) / activeFreqRows.length
    : 0;

  // Tab data presence checking
  const hasSovData = sovPercentage > 0;
  const hasKolData = brandKolKoc.length > 0;
  const hasContentData = contentRows.length > 0;
  const hasTvcData = brandDigital.some((row) => row.hạng_mục === "TVC");
  const hasAdsData = brandDigital.some((row) => row.hạng_mục === "Paid Ads");
  const hasSeoData = brandDigital.some(
    (row) => row.hạng_mục === "SEO Website" || row.hạng_mục === "SEO Content" || row.hạng_mục === "Product Page"
  );
  const hasBtlData = brandBtl.length > 0;
  const hasPrData = brandOohPr.some((row) => row.hạng_mục === "PR - báo chí");
  const hasOohData = brandOohPr.some((row) => row.hạng_mục === "OOH");

  const tabsStatus: { [key: string]: boolean } = {
    sov: hasSovData,
    kol: hasKolData,
    content: hasContentData,
    tvc: hasTvcData,
    ads: hasAdsData,
    seo: hasSeoData,
    btl: hasBtlData,
    pr: hasPrData,
    ooh: hasOohData,
  };

  // Card: Retail POSM & Vật dụng calculations (needed for candidates definition)
  const retailRows = brandBtl.filter((row) => row.hạng_mục_lớn === "POSM");
  const totalRetailTichLuy = retailRows.reduce((sum, row) => sum + (row.tích_lũy_tháng || 0), 0);
  const totalRetailKeHoach = retailRows.reduce((sum, row) => sum + (row.kế_hoạch_tháng_6 || 0), 0);
  const retailCompletionRate = totalRetailKeHoach > 0 ? Math.round((totalRetailTichLuy / totalRetailKeHoach) * 100) : 0;

  // Render scorecard lists dynamically based on rules:
  // Strictly fix 8 slots in priority order: SOV ➔ Content ➔ SEO ➔ Retail ➔ KOL/KOC ➔ PR Ad ➔ Spent ➔ Ad. Impression
  // If any slot lacks data, hide it and pull from backups: Ad. Frequency ➔ Ad.reach to ensure exactly 8 visible cards.
  const candidates: Record<string, {
    id: string;
    title: string;
    value: string;
    targetLabel?: string;
    targetVal?: string;
    percent?: number;
    icon: any;
    color: string;
    bg: string;
    hasData: boolean;
  }> = {
    sov: {
      id: "sov",
      title: "Share Of Voice (SOV)",
      value: `${sovPercentage.toFixed(1)}%`,
      targetLabel: "Thị phần thảo luận",
      targetVal: selectedBrand === "Livotec" ? "Rank #5" : "Rank #2",
      icon: Percent,
      color: "text-indigo-600 border-indigo-100",
      bg: "bg-indigo-50/50",
      hasData: sovPercentage > 0,
    },
    content: {
      id: "content",
      title: "Content (Ấn phẩm)",
      value: `${weeklyContentSum} bài/video`,
      targetLabel: "Kế hoạch tuần",
      targetVal: selectedBrand === "Livotec" ? "14 bài" : "24 bài",
      percent: Math.min(Math.round((weeklyContentSum / (selectedBrand === "Livotec" ? 14 : 24)) * 100), 150),
      icon: Video,
      color: "text-pink-600 border-pink-100",
      bg: "bg-pink-50/50",
      hasData: weeklyContentSum > 0,
    },
    seo: {
      id: "seo",
      title: "SEO Organic Traffic",
      value: seoTrafficWeeklyActual.toLocaleString(),
      targetLabel: `Target: ${seoTrafficWeeklyTarget.toLocaleString()}`,
      percent: Math.round((seoTrafficWeeklyActual / seoTrafficWeeklyTarget) * 100),
      icon: Globe,
      color: "text-emerald-600 border-emerald-100",
      bg: "bg-emerald-50/50",
      hasData: seoTrafficWeeklyActual > 0 || seoTrafficWeeklyTarget > 0,
    },
    retail_posm: {
      id: "retail_posm",
      title: "Retail POSM & Vật dụng",
      value: `${totalRetailTichLuy.toLocaleString()} vật dụng`,
      targetLabel: `Kế hoạch: ${totalRetailKeHoach.toLocaleString()}`,
      percent: retailCompletionRate,
      icon: Store,
      color: "text-cyan-600 border-cyan-100",
      bg: "bg-cyan-50/50",
      hasData: totalRetailTichLuy > 0 || totalRetailKeHoach > 0,
    },
    kol_koc: {
      id: "kol_koc",
      title: "KOL/KOC Đã Đạt",
      value: totalKolKocKpi > 0 ? `${totalKolKocTichLuy}/${totalKolKocKpi} KOC/KOL` : "0 KOC/KOL",
      targetLabel: "Thực hiện trong tuần",
      targetVal: `+${totalKolKocTrongTuan}`,
      percent: totalKolKocKpi > 0 ? Math.round((totalKolKocTichLuy / totalKolKocKpi) * 100) : 0,
      icon: Users,
      color: "text-blue-600 border-blue-100",
      bg: "bg-blue-50/50",
      hasData: totalKolKocKpi > 0 || totalKolKocTichLuy > 0 || totalKolKocTrongTuan > 0,
    },
    pr: {
      id: "pr",
      title: "PR - Bài viết",
      value: `${prQuantitySum} bài báo`,
      targetLabel: `Target: ${selectedBrand === "Livotec" ? "5 bài" : "1 bài"}`,
      percent: Math.round((prQuantitySum / (selectedBrand === "Livotec" ? 5 : 1)) * 100),
      icon: FileText,
      color: "text-purple-600 border-purple-100",
      bg: "bg-purple-50/50",
      hasData: prQuantitySum > 0,
    },
    ads_spent: {
      id: "ads_spent",
      title: "Ads. Amount Spent",
      value: `${(weeklyAdsSpent / 1000000).toFixed(1)}M Đ`,
      targetLabel: "Chi tiêu lũy kế tháng",
      targetVal: `${(monthlyAdsSpent / 1000000).toFixed(0)}M/${(monthlyAdsSpentTarget / 1000000).toFixed(0)}M`,
      percent: Math.round((monthlyAdsSpent / monthlyAdsSpentTarget) * 100),
      icon: DollarSign,
      color: "text-amber-600 border-amber-100",
      bg: "bg-amber-50/50",
      hasData: weeklyAdsSpent > 0 || monthlyAdsSpent > 0,
    },
    ads_impression: {
      id: "ads_impression",
      title: "Ads. Impressions",
      value: weeklyAdsImpressions > 1000000 
        ? `${(weeklyAdsImpressions / 1000000).toFixed(2)}M`
        : weeklyAdsImpressions.toLocaleString(),
      targetLabel: "Lũy kế tháng",
      targetVal: `${(monthlyAdsImpressions / 1000000).toFixed(1)}M`,
      icon: Award,
      color: "text-sky-600 border-sky-100",
      bg: "bg-sky-50/50",
      hasData: weeklyAdsImpressions > 0 || monthlyAdsImpressions > 0,
    },
    ads_frequency: {
      id: "ads_frequency",
      title: "Ads. Frequency",
      value: `${avgAdsFrequency.toFixed(2)}x`,
      targetLabel: "Tần suất lặp trung bình",
      targetVal: `Target ~2.5x`,
      icon: RefreshCw,
      color: "text-orange-600 border-orange-100",
      bg: "bg-orange-50/50",
      hasData: avgAdsFrequency > 0,
    },
    ads_reach: {
      id: "ads_reach",
      title: "Ads. Reach",
      value: weeklyAdsReach > 1000000 
        ? `${(weeklyAdsReach / 1000000).toFixed(2)}M`
        : weeklyAdsReach.toLocaleString(),
      targetLabel: "Lũy kế tháng",
      targetVal: `${(monthlyAdsReach / 1000000).toFixed(1)}M`,
      icon: Users,
      color: "text-blue-600 border-blue-100",
      bg: "bg-blue-50/50",
      hasData: weeklyAdsReach > 0 || monthlyAdsReach > 0,
    },
  };

  const primaryKeys = ["sov", "content", "seo", "retail_posm", "kol_koc", "pr", "ads_spent", "ads_impression"];
  const backupKeys = ["ads_frequency", "ads_reach"];

  const scorecards: {
    id: string;
    title: string;
    value: string;
    targetLabel?: string;
    targetVal?: string;
    percent?: number;
    icon: any;
    color: string;
    bg: string;
  }[] = [];

  // 1. Add primary cards in exact order if they have data
  primaryKeys.forEach((key) => {
    const card = candidates[key];
    if (card && card.hasData) {
      scorecards.push({
        id: card.id,
        title: card.title,
        value: card.value,
        targetLabel: card.targetLabel,
        targetVal: card.targetVal,
        percent: card.percent,
        icon: card.icon,
        color: card.color,
        bg: card.bg,
      });
    }
  });

  // 2. If we have fewer than 8 cards, pull from backups if they have data to fill the gaps
  if (scorecards.length < 8) {
    backupKeys.forEach((key) => {
      const card = candidates[key];
      if (card && card.hasData && scorecards.length < 8) {
        scorecards.push({
          id: card.id,
          title: card.title,
          value: card.value,
          targetLabel: card.targetLabel,
          targetVal: card.targetVal,
          percent: card.percent,
          icon: card.icon,
          color: card.color,
          bg: card.bg,
        });
      }
    });
  }

  // Active brand comments for display in Box 2 and Box 3
  const activeComments = (publishedComments[normalizeWeek(activeTimeline.week)] && publishedComments[normalizeWeek(activeTimeline.week)][selectedBrand])
    || getDynamicDefaultComments(selectedBrand, activeTimeline.week, marketingData);

  // Active draft comments for editing in Control Panel
  const currentDraft = (draftComments[normalizeWeek(activeTimeline.week)] && draftComments[normalizeWeek(activeTimeline.week)][selectedBrand])
    || getDynamicDefaultComments(selectedBrand, activeTimeline.week, marketingData);

  // Helper to render formatting of Proposals in Box 2
  const renderFormattedText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      // Check if it starts with bold (e.g., 1. **Title**: Content or **Title**)
      const boldMatch = line.match(/^\d*\.?\s*\*\*(.*?)\*\*(.*)$/);
      if (boldMatch) {
        return (
          <p key={idx} className="mb-2 leading-relaxed text-gray-700">
            <span className="font-semibold text-gray-900">{boldMatch[1]}</span>
            {boldMatch[2]}
          </p>
        );
      }
      return <p key={idx} className="mb-2 leading-relaxed text-gray-700">{line}</p>;
    });
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 font-sans">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Đăng Nhập Hệ Thống
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Báo cáo hiệu suất Marketing Livotec & Karofi
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginError && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs font-semibold text-rose-700 border border-rose-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-4 rounded-md shadow-sm">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Tên đăng nhập / Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <UserCheck className="h-4 w-4" />
                  </span>
                  <input
                    id="login_username"
                    name="username"
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Nhập email hoặc tên tài khoản..."
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Mật khẩu
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    id="login_password"
                    name="password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Nhập mật khẩu truy cập..."
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                id="login_submit_btn"
                className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-md cursor-pointer"
              >
                Đăng nhập hệ thống
              </button>
            </div>
          </form>


        </div>

        {/* Global Notifications inside login */}
        {notification && (
          <div
            id="global_notification"
            className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-2xl transition-all duration-300 max-w-md ${
              notification.type === "success"
                ? "bg-emerald-900 text-emerald-100 border-l-4 border-emerald-400"
                : "bg-rose-900 text-rose-100 border-l-4 border-rose-400"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div id="app_root" className="min-h-screen bg-slate-50/60 font-sans text-slate-800">
      {/* ------------------------------------------------------------
          HEADER MENU BAR
         ------------------------------------------------------------ */}
      <header id="header_navbar" className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-3 sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Báo Cáo Hiệu Suất Marketing
              </h1>
              <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                Livotec & Karofi • Analytical Hub
              </p>
            </div>
          </div>

          {/* User metadata & timeline info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-600">
              <UserCheck className="h-3.5 w-3.5 text-slate-500" />
              <span className="font-semibold text-slate-950">{currentUser.name}</span>
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                currentUser.role === "Admin" ? "bg-indigo-100 text-indigo-700" :
                currentUser.role === "Editor" ? "bg-emerald-100 text-emerald-700" :
                "bg-amber-100 text-amber-700"
              }`}>
                {currentUser.role}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 shadow-sm transition cursor-pointer"
              title="Đăng xuất khỏi tài khoản"
            >
              <LogOut className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>

            {/* Timeline selector */}
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <select
                id="timeline_select"
                value={activeTimeline.week}
                onChange={(e) => {
                  const found = timelines.find((t) => t.week === e.target.value);
                  if (found) setSelectedTimeline(found);
                }}
                className="bg-transparent pr-2 font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {timelines.map((t) => (
                  <option key={t.id} value={t.week}>
                    {t.week}
                  </option>
                ))}
              </select>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center rounded-lg bg-slate-100 p-1">
              <button
                id="tab_nav_report"
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Báo Cáo</span>
              </button>
              
              {currentUser.role !== "Viewer" && (
                <button
                  id="tab_nav_control"
                  onClick={() => setActiveTab("control-panel")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all relative cursor-pointer ${
                    activeTab === "control-panel"
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  <span>Control Panel</span>
                  {hasUnpublishedChanges && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Floating Global Notifications */}
      {notification && (
        <div
          id="global_notification"
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-2xl transition-all duration-300 max-w-md ${
            notification.type === "success"
              ? "bg-emerald-900 text-emerald-100 border-l-4 border-emerald-400"
              : "bg-rose-900 text-rose-100 border-l-4 border-rose-400"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* ------------------------------------------------------------
          BRAND SELECTION SUB-BAR
         ------------------------------------------------------------ */}
      <div className="border-b border-slate-200 bg-white/60 py-2.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Thương hiệu phân tích:
            </span>
            <div className="flex rounded-lg bg-slate-100/80 p-0.5 border border-slate-200/50">
              <button
                id="brand_btn_livotec"
                onClick={() => setSelectedBrand("Livotec")}
                className={`rounded-md px-4 py-1 text-xs font-bold transition-all ${
                  selectedBrand === "Livotec"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                LIVOTEC
              </button>
              <button
                id="brand_btn_karofi"
                onClick={() => setSelectedBrand("Karofi")}
                className={`rounded-md px-4 py-1 text-xs font-bold transition-all ${
                  selectedBrand === "Karofi"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                KAROFI
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-slate-500 sm:inline">Trạng thái dữ liệu:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Đã kết nối
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------
          MAIN APPLICATION STAGE
         ------------------------------------------------------------ */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {activeTab === "dashboard" ? (
          <div className="space-y-6">
            
            {/* ------------------------------------------------------------
                BOX 1: SCORE CARDS (MAX 8 CARDS)
               ------------------------------------------------------------ */}
            <section id="box1_scorecards" className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Box 1: Scorecards Chỉ Số Chủ Chốt
                </h2>
                {activeTimeline.isPRWeek && (
                  <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200">
                    {activeTimeline.label.split(" ")[0]} {activeTimeline.label.split(" ")[1]}: Có PR báo chí (+1 Card)
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {scorecards.map((card) => {
                  const IconComponent = card.icon;
                  return (
                    <div
                      key={card.id}
                      id={`card_${card.id}`}
                      className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 group`}
                    >
                      {/* Accent Background Highlight */}
                      <div className={`absolute top-0 right-0 h-16 w-16 rounded-full -mr-6 -mt-6 transition-all duration-300 group-hover:scale-110 ${card.bg}`} />
                      
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <span className="text-xs font-medium text-slate-400 uppercase tracking-tight block">
                            {card.title}
                          </span>
                          <span className="font-mono text-xl font-bold text-slate-900 tracking-tight sm:text-2xl block">
                            {card.value}
                          </span>
                        </div>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${card.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] text-slate-500">
                        <span>{card.targetLabel}</span>
                        <span className="font-semibold text-slate-800">{card.targetVal || `${card.percent}% đạt`}</span>
                      </div>

                      {card.percent !== undefined && (
                        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              card.percent >= 100 ? "bg-emerald-500" : card.percent >= 70 ? "bg-amber-500" : "bg-rose-500"
                            }`}
                            style={{ width: `${Math.min(card.percent, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ------------------------------------------------------------
                BOX 2: EXECUTIVE SUMMARY
               ------------------------------------------------------------ */}
            <section id="box2_executive_summary" className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  Box 2: Đánh Giá Tổng Quan (Executive Summary)
                </h2>
                <button
                  onClick={() => {
                    setActiveTab("control-panel");
                    // Scroll to editor
                    setTimeout(() => {
                      document.getElementById("editor_title_section")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-900 underline flex items-center gap-1"
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  Chỉnh sửa nhận định
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Real-time Status Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Award className="h-4 w-4" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Thực Trạng Triển Khai Tuần Này
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 uppercase">
                      Hoạt động tốt
                    </span>
                  </div>
                  <div className="text-sm text-slate-700 leading-relaxed font-sans prose prose-slate">
                    {renderFormattedText(activeComments.evaluation)}
                  </div>
                </div>

                {/* Recommendations Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <Target className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Đề Xuất Tối Ưu Cho Tuần Kế Tiếp
                    </h3>
                  </div>
                  <div className="space-y-1.5 border-l-2 border-amber-300 pl-4 py-1 text-sm text-slate-700 leading-relaxed font-sans">
                    {renderFormattedText(activeComments.proposals)}
                  </div>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------
                BOX 3: CATEGORY ANALYSIS
               ------------------------------------------------------------ */}
            <section id="box3_category_analysis" className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" />
                Box 3: Phân Tích Chi Tiết Từng Hạng Mục Marketing
              </h2>

              {/* Navigation Tabs for Marketing Categories */}
              <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: "all", label: "Tất cả (All)" },
                      { id: "sov", label: "Share Of Voice (SOV)" },
                      { id: "kol", label: "KOL / KOC" },
                      { id: "content", label: "Content & Sáng tạo" },
                      { id: "tvc", label: "Chiến dịch TVC" },
                      { id: "ads", label: "Paid Ads (Quảng Cáo)" },
                      { id: "seo", label: "SEO Website & Content" },
                      { id: "btl", label: "BTL & Trade Marketing" },
                      { id: "pr", label: "PR - Báo chí" },
                      { id: "ooh", label: "Quảng cáo OOH" },
                    ].filter(tab => tab.id === "all" || tabsStatus[tab.id]).map((tab) => (
                      <button
                        key={tab.id}
                        id={`cat_tab_${tab.id}`}
                        onClick={() => setActiveCategoryTab(tab.id as any)}
                        className={`rounded-lg px-3.5 py-2 text-xs font-semibold tracking-tight transition-all ${
                          activeCategoryTab === tab.id
                            ? "bg-slate-900 text-white shadow-md"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Period selection toggle if active tab has monthly accumulation */}
                  {(activeCategoryTab === "ads" || activeCategoryTab === "seo") && (
                    <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                      <button
                        onClick={() => {
                          const key = activeCategoryTab === "ads" ? "paidAds" : "seo";
                          setCategoryTimeViews({ ...categoryTimeViews, [key]: "week" });
                        }}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all ${
                          categoryTimeViews[activeCategoryTab === "ads" ? "paidAds" : "seo"] === "week"
                            ? "bg-white text-slate-950 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Tuần
                      </button>
                      <button
                        onClick={() => {
                          const key = activeCategoryTab === "ads" ? "paidAds" : "seo";
                          setCategoryTimeViews({ ...categoryTimeViews, [key]: "month" });
                        }}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all ${
                          categoryTimeViews[activeCategoryTab === "ads" ? "paidAds" : "seo"] === "month"
                            ? "bg-white text-slate-950 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Tháng (Lũy kế)
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-6">
                   {/* Category Assessment Comment Box */}
                  {activeCategoryTab !== "all" && (() => {
                    let mappedKey = activeCategoryTab === "kol" ? "kol_koc" :
                                      activeCategoryTab === "ads" ? "paid_ads" :
                                      activeCategoryTab === "btl" ? "btl_trade" :
                                      activeCategoryTab;
                    
                    let isMonthlyMode = false;
                    if (activeCategoryTab === "ads" && categoryTimeViews.paidAds === "month") {
                      mappedKey = "paid_ads_monthly";
                      isMonthlyMode = true;
                    } else if (activeCategoryTab === "seo" && categoryTimeViews.seo === "month") {
                      mappedKey = "seo_monthly";
                      isMonthlyMode = true;
                    } else if (activeCategoryTab === "btl") {
                      mappedKey = "btl_trade_monthly";
                      isMonthlyMode = true;
                    }

                    let primaryComment = activeComments.categories[mappedKey as keyof typeof activeComments.categories];
                    // Fallback to weekly comment if monthly comment is empty or not defined
                    if (isMonthlyMode && !primaryComment) {
                      const fallbackKey = activeCategoryTab === "ads" ? "paid_ads" :
                                          activeCategoryTab === "seo" ? "seo" :
                                          activeCategoryTab === "btl" ? "btl_trade" :
                                          mappedKey;
                      primaryComment = activeComments.categories[fallbackKey as keyof typeof activeComments.categories];
                    }

                    return (
                      <div className="space-y-3">
                        {primaryComment ? (
                          <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                              {activeCategoryTab === "tvc" ? (
                                <Video className="h-4 w-4 text-slate-600" />
                              ) : (
                                <FileText className="h-4 w-4 text-slate-600" />
                              )}
                            </div>
                            <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans w-full">
                              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider flex items-center gap-1.5">
                                Đánh giá của nhà phân tích chuyên sâu:
                                {isMonthlyMode ? (
                                  <span className="bg-indigo-50 text-indigo-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-indigo-200">
                                    Lũy Kế Tháng
                                  </span>
                                ) : (
                                  <span className="bg-slate-100 text-slate-600 text-[9px] font-semibold px-1.5 py-0.5 rounded border border-slate-200">
                                    Số Liệu Tuần
                                  </span>
                                )}
                              </span>
                              <p className="whitespace-pre-line">{primaryComment}</p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })()}

                  {/* ------------------------------------------------------------
                      CATEGORY VIEW: 1. SHARE OF VOICE (SOV)
                     ------------------------------------------------------------ */}
                  {activeCategoryTab === "sov" && (
                    <div className="grid gap-6 md:grid-cols-12 items-center">
                      <div className="md:col-span-7 h-80 flex flex-col justify-center bg-white border border-slate-100 rounded-xl p-2 shadow-sm">
                        <span className="text-xs font-bold text-slate-400 block px-4 py-2 uppercase tracking-wide">
                          Thị Phần Thảo Luận Thương Hiệu Tuần {activeTimeline.label.split(" ")[1] || activeTimeline.label}
                        </span>
                        <ResponsiveContainer width="100%" height="85%">
                          <PieChart>
                            <Pie
                              data={sovData}
                              cx="50%"
                              cy="50%"
                              innerRadius={65}
                              outerRadius={95}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {sovData.map((entry, index) => {
                                // Assign distinct colors to major competitors
                                let color = "#94a3b8"; // Gray for other
                                if (entry.name.toLowerCase() === "livotec") color = "#0d9488"; // Teal
                                else if (entry.name.toLowerCase() === "karofi") color = "#2563eb"; // Blue
                                else if (entry.name.toLowerCase() === "kang") color = "#ea580c"; // Orange
                                else if (entry.name.toLowerCase() === "sunhouse") color = "#dc2626"; // Red
                                else if (entry.name.toLowerCase() === "hòa phát") color = "#4f46e5"; // Indigo
                                return <Cell key={`cell-${index}`} fill={color} />;
                              })}
                            </Pie>
                            <Tooltip
                              formatter={(value: any, name: any) => [`${parseFloat(value).toFixed(1)}%`, `Thương hiệu: ${name}`]}
                              contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                            />
                            <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Data table */}
                      <div className="md:col-span-5 space-y-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Bảng Dữ Liệu Thị Phần Thảo Luận (SOV)
                        </span>
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                              <tr>
                                <th className="px-4 py-3">Thương hiệu</th>
                                <th className="px-4 py-3 text-right">Thị phần SOV</th>
                                <th className="px-4 py-3 text-right">Trạng thái</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                              {sovData.map((row) => (
                                <tr
                                  key={row.name}
                                  className={`${
                                    row.name.toLowerCase() === selectedBrand.toLowerCase()
                                      ? "bg-slate-50 font-semibold text-slate-950"
                                      : ""
                                  }`}
                                >
                                  <td className="px-4 py-3 font-sans flex items-center gap-2">
                                    <span
                                      className="h-2.5 w-2.5 rounded-full shrink-0"
                                      style={{
                                        backgroundColor:
                                          row.name.toLowerCase() === "livotec" ? "#0d9488" :
                                          row.name.toLowerCase() === "karofi" ? "#2563eb" :
                                          row.name.toLowerCase() === "kang" ? "#ea580c" :
                                          row.name.toLowerCase() === "sunhouse" ? "#dc2626" :
                                          row.name.toLowerCase() === "hòa phát" ? "#4f46e5" : "#94a3b8"
                                      }}
                                    />
                                    {row.name}
                                  </td>
                                  <td className="px-4 py-3 text-right font-medium">{row.formatted}</td>
                                  <td className="px-4 py-3 text-right font-sans">
                                    {row.name.toLowerCase() === "livotec" && <span className="text-[10px] text-teal-600 font-bold uppercase">Nhãn hàng xem</span>}
                                    {row.name.toLowerCase() === "karofi" && <span className="text-[10px] text-blue-600 font-bold uppercase">Nhãn hàng xem</span>}
                                    {row.name.toLowerCase() !== "livotec" && row.name.toLowerCase() !== "karofi" && <span className="text-[10px] text-slate-400">Đối thủ</span>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------------------
                      CATEGORY VIEW: 2. KOL / KOC
                     ------------------------------------------------------------ */}
                  {activeCategoryTab === "kol" && (
                    <div className="space-y-6">
                      {brandKolKoc.length === 0 ? (
                        <div id="kol_koc_empty_state" className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                          <Users className="h-12 w-12 text-slate-300 mb-3 animate-pulse" />
                          <h4 className="font-bold text-slate-800 text-sm">Không có dữ liệu KOL/KOC</h4>
                          <p className="text-xs text-slate-500 mt-1 max-w-sm">
                            Thương hiệu <strong>{selectedBrand}</strong> không ghi nhận chiến dịch KOL/KOC nào trong kỳ báo cáo này.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="h-80 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                            <span className="text-xs font-bold text-slate-400 block pb-4 uppercase tracking-wide">
                              Biểu Đồ Cột So Sánh Chỉ Số KOC/KOL Toàn Chiến Dịch vs Thực Tế
                            </span>
                            <ResponsiveContainer width="100%" height="85%">
                              <BarChart data={brandKolKoc}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="ngành_hàng" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="kpi_toàn_chiến_dịch" name="KPI Toàn chiến dịch" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="tích_lũy_chiến_dịch" name="Lũy kế thực hiện" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="thực_tế_trong_tuần" name="Thực hiện tuần" fill="#10b981" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Data table */}
                          <div className="space-y-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                              Bảng Dữ Liệu Chiến Dịch KOL/KOC
                            </span>
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                              <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                  <tr>
                                    <th className="px-4 py-3">Hạng mục & Kênh</th>
                                    <th className="px-4 py-3">Ngành hàng</th>
                                    <th className="px-4 py-3 text-right">KPI toàn chiến dịch</th>
                                    <th className="px-4 py-3 text-right">Lũy kế thực hiện</th>
                                    <th className="px-4 py-3 text-right">Thực hiện tuần</th>
                                    <th className="px-4 py-3 text-right">Tỷ lệ hoàn thành</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                  {brandKolKoc.map((row, idx) => {
                                    const rate = row.kpi_toàn_chiến_dịch 
                                      ? Math.round(((row.tích_lũy_chiến_dịch || 0) / row.kpi_toàn_chiến_dịch) * 100)
                                      : 0;
                                    return (
                                      <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-3 font-semibold text-slate-900">{row.hạng_mục} ({row.kênh_channel})</td>
                                        <td className="px-4 py-3">{row.ngành_hàng}</td>
                                        <td className="px-4 py-3 text-right font-mono font-medium">{row.kpi_toàn_chiến_dịch}</td>
                                        <td className="px-4 py-3 text-right font-mono font-medium text-blue-600">{row.tích_lũy_chiến_dịch}</td>
                                        <td className="px-4 py-3 text-right font-mono font-medium text-emerald-600">{row.thực_tế_trong_tuần}</td>
                                        <td className="px-4 py-3 text-right font-mono font-semibold text-slate-900">{rate}%</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                   {/* ------------------------------------------------------------
                       CATEGORY VIEW: 3. CONTENT & SÁNG TẠO
                      ------------------------------------------------------------ */}
                   {activeCategoryTab === "content" && (
                     <div className="space-y-6">
                       <div className="h-80 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                         <span className="text-xs font-bold text-slate-400 block pb-4 uppercase tracking-wide">
                           Biểu Đồ Cột So Sánh KPI, Thực Hiện Tuần và Tích Lũy Tháng Theo Từng Hạng Mục Sáng Tạo
                         </span>
                         <ResponsiveContainer width="100%" height="85%">
                           <BarChart data={contentByHạngMục}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                             <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                             <YAxis />
                             <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                             <Legend />
                             <Bar dataKey="mục_tiêu_target" name="KPI Tuần" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                             <Bar dataKey="thực_tế_actual" name="Thực tế tuần" fill="#10b981" radius={[4, 4, 0, 0]} />
                             <Bar dataKey="tích_lũy_tháng" name="Tích lũy tháng" fill="#6366f1" radius={[4, 4, 0, 0]} />
                           </BarChart>
                         </ResponsiveContainer>
                       </div>
 
                       {/* Data table */}
                       <div className="space-y-2">
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                           Bảng Dữ Liệu Chi Tiết Content & Sáng Tạo
                         </span>
                         <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                           <table className="w-full text-left text-xs">
                             <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                               <tr>
                                 <th className="px-4 py-3">Hạng mục</th>
                                 <th className="px-4 py-3">Kênh & Ngành</th>
                                 <th className="px-4 py-3 text-right">KPI Tuần</th>
                                 <th className="px-4 py-3 text-right">Thực tế Tuần</th>
                                 <th className="px-4 py-3 text-right">Tích lũy Tháng</th>
                               </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-100 text-slate-700">
                               {contentRows.map((row, idx) => (
                                 <tr key={idx} className="hover:bg-slate-50/50">
                                   <td className="px-4 py-3 font-semibold text-slate-900">{row.hạng_mục}</td>
                                   <td className="px-4 py-3 text-[11px] font-sans">
                                     <div className="font-medium text-slate-800">{row.ngành_hàng}</div>
                                     <div className="text-slate-400 font-mono whitespace-pre-line">{row.kênh_channel}</div>
                                   </td>
                                   <td className="px-4 py-3 text-right font-mono font-medium">{row.mục_tiêu_target !== null ? row.mục_tiêu_target : "—"}</td>
                                   <td className="px-4 py-3 text-right font-mono font-medium text-emerald-600">{row.thực_tế_actual !== null ? row.thực_tế_actual : "—"}</td>
                                   <td className="px-4 py-3 text-right font-mono font-medium text-indigo-600">{row.tích_lũy_tháng !== null ? row.tích_lũy_tháng : "—"}</td>
                                 </tr>
                               ))}
                             </tbody>
                           </table>
                         </div>
                       </div>
                     </div>
                   )}

                  {/* ------------------------------------------------------------
                      CATEGORY VIEW: 3b. CHIẾN DỊCH TVC (GRPs)
                     ------------------------------------------------------------ */}
                  {activeCategoryTab === "tvc" && (() => {
                    const tvcRows = brandDigital.filter((row) => row.hạng_mục === "TVC");
                    const tvcChartData = tvcRows.map((row) => ({
                      name: `${row.kênh_channel || ""} (${row.ngành_hàng || ""})`.trim(),
                      "KPI GRPs": row.mục_tiêu_target || 0,
                      "Thực tế đạt": row.thực_tế_actual || 0,
                      "Lũy kế tháng": row.tích_lũy_tháng || 0,
                    }));

                    return (
                      <div className="space-y-6">
                        <div className="h-96 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                          <span className="text-xs font-bold text-slate-400 block pb-4 uppercase tracking-wide">
                            Biểu Đồ Cột Ngang So Sánh GRPs Chiến Dịch TVC (KPI, Thực Tế Tuần và Tích Lũy Tháng)
                          </span>
                          <ResponsiveContainer width="100%" height="85%">
                            <BarChart
                              layout="vertical"
                              data={tvcChartData}
                              margin={{ top: 10, right: 30, left: 100, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                              <XAxis type="number" />
                              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={90} />
                              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                              <Legend />
                              <Bar dataKey="KPI GRPs" name="KPI GRPs" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                              <Bar dataKey="Thực tế đạt" name="Thực tế GRPs" fill="#10b981" radius={[0, 4, 4, 0]} />
                              <Bar dataKey="Lũy kế tháng" name="Lũy kế GRPs" fill="#6366f1" radius={[0, 4, 4, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Data table */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Bảng Dữ Liệu Chỉ Số TVC (Digital GRPs)
                          </span>
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Kênh / Khu vực</th>
                                  <th className="px-4 py-3">Ngành Hàng</th>
                                  <th className="px-4 py-3">Chỉ số</th>
                                  <th className="px-4 py-3 text-right">KPI Tuần</th>
                                  <th className="px-4 py-3 text-right">Thực tế Tuần</th>
                                  <th className="px-4 py-3 text-right">Lũy kế Tháng</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                {tvcRows.map((row, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-semibold text-slate-900 font-sans">{row.kênh_channel}</td>
                                    <td className="px-4 py-3 text-[11px] font-sans font-medium text-slate-800">{row.ngành_hàng}</td>
                                    <td className="px-4 py-3 text-slate-400">{row.chỉ_số_metric || "GRPs"}</td>
                                    <td className="px-4 py-3 text-right font-mono font-medium">{row.mục_tiêu_target !== null ? row.mục_tiêu_target : "—"}</td>
                                    <td className="px-4 py-3 text-right font-mono font-medium text-emerald-600">{row.thực_tế_actual !== null ? row.thực_tế_actual : "—"}</td>
                                    <td className="px-4 py-3 text-right font-mono font-medium text-indigo-600">{row.tích_lũy_tháng !== null ? row.tích_lũy_tháng : "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
 
                   {/* ------------------------------------------------------------
                       CATEGORY VIEW: 4. PAID ADS
                      ------------------------------------------------------------ */}
                   {activeCategoryTab === "ads" && (() => {
                     const adsRows = brandDigital.filter((row) => row.hạng_mục === "Paid Ads");
                     const uniqueAdsIndustries = Array.from(new Set(adsRows.map((row) => row.ngành_hàng).filter(Boolean)));
                     
                     const filteredAdsRows = adsRows.filter((row) => {
                       if (selectedAdsIndustry === "Tất cả") return true;
                       return row.ngành_hàng === selectedAdsIndustry;
                     });
                    
                    return (
                      <div className="space-y-6">
                        {/* Selector/dropdown for industries */}
                        {uniqueAdsIndustries.length > 1 && (
                          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-200/60 shadow-sm">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
                              Lọc theo ngành hàng:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                onClick={() => setSelectedAdsIndustry("Tất cả")}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-tight transition-all ${
                                  selectedAdsIndustry === "Tất cả"
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                              >
                                Tất cả ngành
                              </button>
                              {uniqueAdsIndustries.map((ind) => (
                                <button
                                  key={ind}
                                  onClick={() => setSelectedAdsIndustry(ind)}
                                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-tight transition-all ${
                                    selectedAdsIndustry === ind
                                      ? "bg-slate-900 text-white shadow-md"
                                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                  }`}
                                >
                                  {ind}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="h-80 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between pb-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                              Biểu Đồ Cột Paid Ads {selectedAdsIndustry !== "Tất cả" && `(${selectedAdsIndustry})`}: So Sánh Chỉ Số ({categoryTimeViews.paidAds === "week" ? "Tuần" : "Lũy Kế Tháng"})
                            </span>
                          </div>
                          <ResponsiveContainer width="100%" height="85%">
                            <BarChart
                              data={filteredAdsRows
                                .map((row) => {
                                  const isWeek = categoryTimeViews.paidAds === "week";
                                  let target = isWeek ? row.mục_tiêu_target : row.target_tháng;
                                  let actual = isWeek ? row.thực_tế_actual : row.tích_lũy_tháng;
                                  
                                  if (row.chỉ_số_metric.toUpperCase() === "CPM") {
                                    if (target !== null && target !== undefined) target = target * 1000;
                                    if (actual !== null && actual !== undefined) actual = actual * 1000;
                                  }

                                  return {
                                    name: `${row.kênh_channel} (${row.ngành_hàng}) - ${row.chỉ_số_metric}`,
                                    metric: row.chỉ_số_metric.split(" ")[0],
                                    target: target,
                                    actual: actual,
                                  };
                                })
                                .filter(item => item.metric !== "CPM" && item.metric !== "Frequency" && (item.target !== null || item.actual !== null))
                              }
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                              <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                              <YAxis tickFormatter={(val) => val >= 1000000 ? `${(val/1000000).toFixed(1)}M` : val.toLocaleString()} />
                              <Tooltip 
                                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                                formatter={(value: any, name: any, props: any) => {
                                  const metricName = props.payload?.name || "";
                                  if (metricName.includes("spent") || metricName.includes("Spent") || metricName.includes("VNĐ") || metricName.toUpperCase().includes("CPM")) {
                                    return [`${Number(value).toLocaleString()} Đ`, name];
                                  }
                                  return [Number(value).toLocaleString(), name];
                                }}
                              />
                              <Legend />
                              <Bar dataKey="target" name="KPI Mục tiêu" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="actual" name="Đạt được" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Data table */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Bảng Chi Tiết Quảng Cáo Paid Ads {selectedAdsIndustry !== "Tất cả" && `(${selectedAdsIndustry})`} ({categoryTimeViews.paidAds === "week" ? "Số liệu Tuần" : "Số liệu Lũy kế Tháng"})
                          </span>
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Kênh & Ngành</th>
                                  <th className="px-4 py-3">Chỉ số đo lường</th>
                                  <th className="px-4 py-3 text-right">KPI Mục tiêu</th>
                                  <th className="px-4 py-3 text-right">Kết quả Đạt được</th>
                                  <th className="px-4 py-3 text-right">Tỷ lệ Đạt</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                {filteredAdsRows.map((row, idx) => {
                                  const isWeek = categoryTimeViews.paidAds === "week";
                                  let target = isWeek ? row.mục_tiêu_target : row.target_tháng;
                                  let actual = isWeek ? row.thực_tế_actual : row.tích_lũy_tháng;
                                  
                                  const isCPM = row.chỉ_số_metric.toUpperCase() === "CPM";
                                  const isAmountSpent = row.chỉ_số_metric.includes("spent") || row.chỉ_số_metric.includes("Spent") || row.chỉ_số_metric.includes("VNĐ");

                                  if (isCPM) {
                                    if (target !== null && target !== undefined) target = target * 1000;
                                    if (actual !== null && actual !== undefined) actual = actual * 1000;
                                  }

                                  const rate = target && actual
                                    ? Math.round((actual / target) * 100)
                                    : null;

                                  let formattedTarget = "—";
                                  let formattedActual = "—";

                                  if (target !== null && target !== undefined) {
                                    if (isAmountSpent || isCPM) {
                                      formattedTarget = `${target.toLocaleString()} Đ`;
                                    } else {
                                      formattedTarget = target.toLocaleString();
                                    }
                                  }

                                  if (actual !== null && actual !== undefined) {
                                    if (isAmountSpent || isCPM) {
                                      formattedActual = `${actual.toLocaleString()} Đ`;
                                    } else {
                                      formattedActual = actual.toLocaleString();
                                    }
                                  }

                                  const isCPMAndOptimized = isCPM && actual !== null && target !== null && actual < target;
                                  const isCPMAndNeedsReview = isCPM && actual !== null && target !== null && actual >= target;

                                  return (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                      <td className="px-4 py-3 font-sans font-semibold text-slate-900">{row.kênh_channel} ({row.ngành_hàng})</td>
                                      <td className="px-4 py-3 font-sans text-slate-500">{row.chỉ_số_metric}</td>
                                      <td className="px-4 py-3 text-right font-medium">{formattedTarget}</td>
                                      <td className="px-4 py-3 text-right font-semibold text-blue-600">{formattedActual}</td>
                                      <td className="px-4 py-3 text-right font-sans font-bold">
                                        {isCPM ? (
                                          actual !== null && target !== null ? (
                                            actual < target ? (
                                              <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-200">
                                                Tối ưu
                                              </span>
                                            ) : (
                                              <span className="inline-block bg-rose-50 text-rose-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-rose-200">
                                                Cần xem xét
                                              </span>
                                            )
                                          ) : "—"
                                        ) : rate !== null ? (
                                          <span className={rate >= 100 ? "text-emerald-600" : rate >= 70 ? "text-amber-500" : "text-rose-500"}>
                                            {rate}%
                                          </span>
                                        ) : "—"}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* ------------------------------------------------------------
                      CATEGORY VIEW: 5. SEO WEBSITE & CONTENT
                     ------------------------------------------------------------ */}
                  {activeCategoryTab === "seo" && (
                    <div className="space-y-6">
                      <div className="h-80 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                        <span className="text-xs font-bold text-slate-400 block pb-4 uppercase tracking-wide">
                          Biểu Đồ Cột SEO Website: Impressions & Organic Traffic ({categoryTimeViews.seo === "week" ? "Tuần" : "Lũy Kế Tháng"})
                        </span>
                        <ResponsiveContainer width="100%" height="85%">
                          <BarChart
                            data={brandDigital
                              .filter((row) => row.hạng_mục === "SEO Website")
                              .map((row) => ({
                                name: row.chỉ_số_metric,
                                target: categoryTimeViews.seo === "week" ? row.mục_tiêu_target : row.target_tháng,
                                actual: categoryTimeViews.seo === "week" ? row.thực_tế_actual : row.tích_lũy_tháng,
                              }))
                            }
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val} />
                            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                            <Legend />
                            <Bar dataKey="target" name="Mục tiêu" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="actual" name="Thực tế đạt được" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Content production list */}
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* SEO Metrics Table */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Chỉ Số Lưu Lượng Website (SEO)
                          </span>
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Chỉ số</th>
                                  <th className="px-4 py-3 text-right">KPI Mục tiêu</th>
                                  <th className="px-4 py-3 text-right">Thực tế đạt</th>
                                  <th className="px-4 py-3 text-right">Tỷ lệ</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                {brandDigital
                                  .filter((row) => row.hạng_mục === "SEO Website")
                                  .map((row, idx) => {
                                    const isWeek = categoryTimeViews.seo === "week";
                                    const target = isWeek ? row.mục_tiêu_target : row.target_tháng;
                                    const actual = isWeek ? row.thực_tế_actual : row.tích_lũy_tháng;
                                    const rate = target && actual ? Math.round((actual / target) * 100) : 0;
                                    return (
                                      <tr key={idx}>
                                        <td className="px-4 py-3 font-sans font-semibold text-slate-900">{row.chỉ_số_metric}</td>
                                        <td className="px-4 py-3 text-right font-medium">{target?.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-emerald-600">{actual?.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right font-sans font-bold text-emerald-600">{rate}%</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* SEO Content Production list */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Số Lượng Bài Viết/Nội Dung SEO Đã Xuất Bản
                          </span>
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Ngành hàng</th>
                                  <th className="px-4 py-3 text-right">Mục tiêu tuần</th>
                                  <th className="px-4 py-3 text-right">Đã xuất bản</th>
                                  <th className="px-4 py-3 text-right">Tích lũy tháng</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                {brandDigital
                                  .filter((row) => row.hạng_mục === "SEO Content" || row.hạng_mục === "Product Page")
                                  .map((row, idx) => (
                                    <tr key={idx}>
                                      <td className="px-4 py-3 font-sans font-semibold text-slate-900">
                                        {row.hạng_mục} ({row.ngành_hàng})
                                      </td>
                                      <td className="px-4 py-3 text-right font-medium">{row.mục_tiêu_target || "—"}</td>
                                      <td className="px-4 py-3 text-right font-semibold text-emerald-600">{row.thực_tế_actual !== null ? row.thực_tế_actual : "—"}</td>
                                      <td className="px-4 py-3 text-right font-medium text-indigo-600">{row.tích_lũy_tháng || "—"}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------------------
                      CATEGORY VIEW: 6. BTL & TRADE MARKETING
                      ------------------------------------------------------------ */}
                  {activeCategoryTab === "btl" && (
                    <div className="space-y-8 animate-fade-in">
                      {/* Grid with 4 Charts as requested */}
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Chart 1: POSM */}
                        <div className="h-[450px] bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                          <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                            Biểu Đồ POSM: Thực Hiện, Kế Hoạch & Lũy Kế (Cái)
                          </span>
                          {brandBtl.filter((row) => row.hạng_mục_lớn === "POSM").length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs">
                              Không có dữ liệu POSM
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height="90%">
                              <BarChart
                                layout="vertical"
                                data={brandBtl
                                  .filter((row) => row.hạng_mục_lớn === "POSM")
                                  .map((row) => ({
                                    name: `${row.chi_tiết_hạng_mục}${row.phân_loại ? ` (${row.phân_loại})` : ""}`,
                                    mayActual: row.thực_hiện_tháng_5 || 0,
                                    plan: row.kế_hoạch_tháng_6 || 0,
                                    accumulated: row.tích_lũy_tháng || 0,
                                  }))
                                }
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} width={140} />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="mayActual" name="Thực hiện Tháng 5" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="plan" name="Kế hoạch Tháng 6" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="accumulated" name="Tích lũy tháng" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          )}
                        </div>

                        {/* Chart 2: Event */}
                        <div className="h-[450px] bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                          <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                            Biểu Đồ Event & Activation: Thực Hiện, Kế Hoạch & Lũy Kế
                          </span>
                          {brandBtl.filter((row) => row.hạng_mục_lớn === "Event").length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs">
                              Không có dữ liệu Event
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height="90%">
                              <BarChart
                                layout="vertical"
                                data={brandBtl
                                  .filter((row) => row.hạng_mục_lớn === "Event")
                                  .map((row) => ({
                                    name: `${row.chi_tiết_hạng_mục}${row.phân_loại ? ` (${row.phân_loại})` : ""}`,
                                    mayActual: row.thực_hiện_tháng_5 || 0,
                                    plan: row.kế_hoạch_tháng_6 || 0,
                                    accumulated: row.tích_lũy_tháng || 0,
                                  }))
                                }
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} width={140} />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="mayActual" name="Thực hiện Tháng 5" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="plan" name="Kế hoạch Tháng 6" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="accumulated" name="Tích lũy tháng" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          )}
                        </div>

                        {/* Chart 3: Kiểm soát HA điểm bán */}
                        <div className="h-[450px] bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                          <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                            Biểu Đồ Kiểm Soát Hình Ảnh Điểm Bán
                          </span>
                          {brandBtl.filter((row) => row.hạng_mục_lớn === "Kiểm soát HA điểm bán").length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs">
                              Không có dữ liệu Kiểm soát Hình ảnh điểm bán
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height="90%">
                              <BarChart
                                layout="vertical"
                                data={brandBtl
                                  .filter((row) => row.hạng_mục_lớn === "Kiểm soát HA điểm bán")
                                  .map((row) => ({
                                    name: `${row.chi_tiết_hạng_mục}${row.phân_loại ? ` (${row.phân_loại})` : ""}`,
                                    mayActual: row.thực_hiện_tháng_5 || 0,
                                    plan: row.kế_hoạch_tháng_6 || 0,
                                    accumulated: row.tích_lũy_tháng || 0,
                                  }))
                                }
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} width={140} />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="mayActual" name="Thực hiện Tháng 5" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="plan" name="Kế hoạch Tháng 6" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="accumulated" name="Tích lũy tháng" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          )}
                        </div>

                        {/* Chart 4: Nghiên cứu thị trường */}
                        <div className="h-[450px] bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                          <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                            Biểu Đồ Nghiên Cứu Thị Trường
                          </span>
                          {brandBtl.filter((row) => row.hạng_mục_lớn === "Nghiên cứu thị trường").length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs">
                              Không có dữ liệu Nghiên cứu thị trường
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height="90%">
                              <BarChart
                                layout="vertical"
                                data={brandBtl
                                  .filter((row) => row.hạng_mục_lớn === "Nghiên cứu thị trường")
                                  .map((row) => ({
                                    name: `${row.chi_tiết_hạng_mục}${row.phân_loại ? ` (${row.phân_loại})` : ""}`,
                                    mayActual: row.thực_hiện_tháng_5 || 0,
                                    plan: row.kế_hoạch_tháng_6 || 0,
                                    accumulated: row.tích_lũy_tháng || 0,
                                  }))
                                }
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} width={140} />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="mayActual" name="Thực hiện Tháng 5" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="plan" name="Kế hoạch Tháng 6" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="accumulated" name="Tích lũy tháng" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      {/* Full Data table */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Bảng Dữ Liệu BTL, POSM & Trade Marketing Chi Tiết
                        </span>
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                              <tr>
                                <th className="px-4 py-3">Hạng mục lớn</th>
                                <th className="px-4 py-3">Chi tiết & Phân loại</th>
                                <th className="px-4 py-3">Tần suất / Đơn vị</th>
                                <th className="px-4 py-3 text-right">Thực hiện tháng 5</th>
                                <th className="px-4 py-3 text-right">Kế hoạch tháng 6</th>
                                <th className="px-4 py-3 text-right">Tích lũy tháng 6</th>
                                <th className="px-4 py-3 text-right">Đạt kế hoạch</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                              {brandBtl.map((row, idx) => {
                                const rate = row.kế_hoạch_tháng_6 && row.tích_lũy_tháng
                                  ? Math.round((row.tích_lũy_tháng / row.kế_hoạch_tháng_6) * 100)
                                  : null;
                                return (
                                  <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-semibold text-slate-900">{row.hạng_mục_lớn}</td>
                                    <td className="px-4 py-3 font-sans">
                                      <div className="font-medium text-slate-800">{row.chi_tiết_hạng_mục}</div>
                                      {row.phân_loại && <div className="text-slate-400 text-[10px] font-mono">{row.phân_loại}</div>}
                                    </td>
                                    <td className="px-4 py-3 font-sans text-slate-500">
                                      {row.tần_suất} / <span className="font-mono text-[10px]">{row.đơn_vị_tính}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right font-mono font-medium">{row.thực_hiện_tháng_5?.toLocaleString() ?? "—"}</td>
                                    <td className="px-4 py-3 text-right font-mono font-medium">{row.kế_hoạch_tháng_6?.toLocaleString() ?? "—"}</td>
                                    <td className="px-4 py-3 text-right font-mono font-semibold text-emerald-600">{row.tích_lũy_tháng?.toLocaleString() ?? "—"}</td>
                                    <td className="px-4 py-3 text-right font-mono font-bold">
                                      {rate !== null ? (
                                        <span className={rate >= 100 ? "text-emerald-600" : rate >= 70 ? "text-amber-500" : "text-rose-500"}>
                                          {rate}%
                                        </span>
                                      ) : "—"}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------------------
                      CATEGORY VIEW: 7. PR - BÁO CHÍ
                     ------------------------------------------------------------ */}
                  {activeCategoryTab === "pr" && (
                    <div className="space-y-6 animate-fade-in">
                      {brandOohPr.filter(r => r.hạng_mục === "PR - báo chí").length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                          <FileText className="h-12 w-12 text-slate-300 mb-3" />
                          <h4 className="font-bold text-slate-800 text-sm">Không có dữ liệu PR - báo chí</h4>
                          <p className="text-xs text-slate-500 mt-1">Thương hiệu {selectedBrand} không ghi nhận chiến dịch PR nào trong kỳ báo cáo này.</p>
                        </div>
                      ) : (
                        <>
                          <div className="grid gap-6 md:grid-cols-2">
                            {/* Chart 1: Quantity */}
                            <div className="h-80 bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                              <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                                Số lượng bài viết PR (Bài)
                              </span>
                              <ResponsiveContainer width="100%" height="85%">
                                <BarChart data={brandOohPr.filter(r => r.hạng_mục === "PR - báo chí" && r.chỉ_số_metric === "Quantity")}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                  <XAxis dataKey="ngành_hàng" tick={{ fontSize: 10 }} />
                                  <YAxis />
                                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                  <Legend />
                                  <Bar dataKey="mục_tiêu_target" name="Mục tiêu Target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                  <Bar dataKey="thực_tế_actual" name="Thực tế Đạt" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>

                          {/* Chart 2: Views */}
                          <div className="h-80 bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                            <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                              Số lượng lượt xem bài viết PR (Views)
                            </span>
                            <ResponsiveContainer width="100%" height="85%">
                              <BarChart data={brandOohPr.filter(r => r.hạng_mục === "PR - báo chí" && r.chỉ_số_metric === "Views")}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="ngành_hàng" tick={{ fontSize: 10 }} />
                                <YAxis tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val} />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="mục_tiêu_target" name="Mục tiêu Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="thực_tế_actual" name="Thực tế Đạt" fill="#ec4899" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Bảng Chi Tiết Tin Bài PR & Lượt Xem (Views)
                          </span>
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Hạng mục</th>
                                  <th className="px-4 py-3">Ngành hàng</th>
                                  <th className="px-4 py-3 text-right">Chỉ số đo lường</th>
                                  <th className="px-4 py-3 text-right">Mục tiêu Target</th>
                                  <th className="px-4 py-3 text-right">Thực tế Đạt</th>
                                  <th className="px-4 py-3 text-right">Tỷ lệ Đạt</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                {brandOohPr.filter(r => r.hạng_mục === "PR - báo chí").map((row, idx) => {
                                  const rate = row.mục_tiêu_target && row.thực_tế_actual
                                    ? Math.round((row.thực_tế_actual / row.mục_tiêu_target) * 100)
                                    : 100;
                                  return (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                      <td className="px-4 py-3 font-sans font-semibold text-slate-900">{row.hạng_mục}</td>
                                      <td className="px-4 py-3 font-sans">{row.ngành_hàng}</td>
                                      <td className="px-4 py-3 text-right font-sans">{row.chỉ_số_metric}</td>
                                      <td className="px-4 py-3 text-right font-medium">{row.mục_tiêu_target?.toLocaleString() || "—"}</td>
                                      <td className="px-4 py-3 text-right font-semibold text-purple-600">{row.thực_tế_actual?.toLocaleString() || "—"}</td>
                                      <td className="px-4 py-3 text-right font-sans font-bold text-emerald-600">{rate}%</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* ------------------------------------------------------------
                    CATEGORY VIEW: 8. OOH
                   ------------------------------------------------------------ */}
                {activeCategoryTab === "ooh" && (
                  <div className="space-y-6 animate-fade-in">
                    {brandOohPr.filter(r => r.hạng_mục === "OOH").length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                        <TrendingUp className="h-12 w-12 text-slate-300 mb-3" />
                        <h4 className="font-bold text-slate-800 text-sm">Không có dữ liệu OOH</h4>
                        <p className="text-xs text-slate-500 mt-1">Thương hiệu {selectedBrand} không ghi nhận chiến dịch OOH nào trong kỳ báo cáo này.</p>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-6 md:grid-cols-2">
                          {/* LCD Building Chart */}
                          <div className="h-72 bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                            <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                              LCD Building (Địa điểm & Màn hình)
                            </span>
                            <ResponsiveContainer width="100%" height="85%">
                              <BarChart data={brandOohPr.filter(r => r.hạng_mục === "OOH" && r.kênh_channel === "LCD Building")}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="chỉ_số_metric" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="mục_tiêu_target" name="Mục tiêu Target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="thực_tế_actual" name="Thực tế Đạt" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* LED Cities Chart */}
                          <div className="h-72 bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                            <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                              LED Cities (Địa điểm & Màn hình)
                            </span>
                            <ResponsiveContainer width="100%" height="85%">
                              <BarChart data={brandOohPr.filter(r => r.hạng_mục === "OOH" && r.kênh_channel === "LED Cities")}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="chỉ_số_metric" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="mục_tiêu_target" name="Mục tiêu Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="thực_tế_actual" name="Thực tế Đạt" fill="#10b981" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* LED Airport Chart */}
                          <div className="h-72 bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                            <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                              LED Airport (Địa điểm & Màn hình)
                            </span>
                            <ResponsiveContainer width="100%" height="85%">
                              <BarChart data={brandOohPr.filter(r => r.hạng_mục === "OOH" && r.kênh_channel === "LED Airport")}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="chỉ_số_metric" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="mục_tiêu_target" name="Mục tiêu Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="thực_tế_actual" name="Thực tế Đạt" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Pano Chart */}
                          <div className="h-72 bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                            <span className="text-xs font-bold text-slate-400 block pb-2 uppercase tracking-wide">
                              Pano (Địa điểm)
                            </span>
                            <ResponsiveContainer width="100%" height="85%">
                              <BarChart data={brandOohPr.filter(r => r.hạng_mục === "OOH" && r.kênh_channel === "Pano")}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="chỉ_số_metric" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="mục_tiêu_target" name="Mục tiêu Target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="thực_tế_actual" name="Thực tế Đạt" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Bảng Chi Tiết Quảng Cáo Ngoài Trời (OOH)
                          </span>
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Kênh quảng cáo</th>
                                  <th className="px-4 py-3">Ngành hàng</th>
                                  <th className="px-4 py-3 text-right">Chỉ số đo lường</th>
                                  <th className="px-4 py-3 text-right">Mục tiêu Target</th>
                                  <th className="px-4 py-3 text-right">Thực tế Đạt</th>
                                  <th className="px-4 py-3 text-right">Tỷ lệ Đạt</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                {brandOohPr.filter(r => r.hạng_mục === "OOH").map((row, idx) => {
                                  const rate = row.mục_tiêu_target && row.thực_tế_actual
                                    ? Math.round((row.thực_tế_actual / row.mục_tiêu_target) * 100)
                                    : 100;
                                  return (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                      <td className="px-4 py-3 font-sans font-semibold text-slate-900">{row.kênh_channel}</td>
                                      <td className="px-4 py-3 font-sans">{row.ngành_hàng}</td>
                                      <td className="px-4 py-3 text-right font-sans">{row.chỉ_số_metric}</td>
                                      <td className="px-4 py-3 text-right font-medium">{row.mục_tiêu_target?.toLocaleString() || "—"}</td>
                                      <td className="px-4 py-3 text-right font-semibold text-blue-600">{row.thực_tế_actual?.toLocaleString() || "—"}</td>
                                      <td className="px-4 py-3 text-right font-sans font-bold text-emerald-600">{rate}%</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
                  {/* ------------------------------------------------------------
                      CATEGORY VIEW: ALL (TỔNG HỢP TẤT CẢ CÁC MỤC)
                     ------------------------------------------------------------ */}
                  {activeCategoryTab === "all" && (
                    <div className="space-y-12 divide-y divide-slate-200 animate-fade-in">
                      {/* Section 1: SOV */}
                      {tabsStatus.sov && (
                        <div className="space-y-4 pt-6 first:pt-0">
                          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">1</span>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Share Of Voice (SOV)</h3>
                          </div>
                          {activeComments.categories.sov && (
                            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                                <FileText className="h-4 w-4 text-slate-600" />
                              </div>
                              <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans">
                                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Nhận định chi tiết:</span>
                                <p>{activeComments.categories.sov}</p>
                              </div>
                            </div>
                          )}
                          <div className="grid gap-6 md:grid-cols-12 items-center">
                            <div className="md:col-span-7 h-80 flex flex-col justify-center bg-white border border-slate-100 rounded-xl p-2 shadow-sm">
                              <span className="text-xs font-bold text-slate-400 block px-4 py-2 uppercase tracking-wide">
                                Thị Phần Thảo Luận Thương Hiệu Tuần {activeTimeline.label.split(" ")[1] || activeTimeline.label}
                              </span>
                              <ResponsiveContainer width="100%" height="85%">
                                <PieChart>
                                  <Pie data={sovData} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3} dataKey="value">
                                    {sovData.map((entry, index) => {
                                      let color = "#94a3b8";
                                      if (entry.name.toLowerCase() === "livotec") color = "#0d9488";
                                      else if (entry.name.toLowerCase() === "karofi") color = "#2563eb";
                                      else if (entry.name.toLowerCase() === "kang") color = "#ea580c";
                                      else if (entry.name.toLowerCase() === "sunhouse") color = "#dc2626";
                                      else if (entry.name.toLowerCase() === "hòa phát") color = "#4f46e5";
                                      return <Cell key={`cell-${index}`} fill={color} />;
                                    })}
                                  </Pie>
                                  <Tooltip formatter={(value: any, name: any) => [`${parseFloat(value).toFixed(1)}%`, `Thương hiệu: ${name}`]} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                  <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="md:col-span-5 space-y-3">
                              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                                <table className="w-full text-left text-xs">
                                  <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                    <tr>
                                      <th className="px-4 py-3">Thương hiệu</th>
                                      <th className="px-4 py-3 text-right">Thị phần SOV</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                    {sovData.map((row) => (
                                      <tr key={row.name} className={`${row.name.toLowerCase() === selectedBrand.toLowerCase() ? "bg-slate-50 font-semibold text-slate-950" : ""}`}>
                                        <td className="px-4 py-3 font-sans flex items-center gap-2">
                                          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: row.name.toLowerCase() === "livotec" ? "#0d9488" : row.name.toLowerCase() === "karofi" ? "#2563eb" : row.name.toLowerCase() === "kang" ? "#ea580c" : row.name.toLowerCase() === "sunhouse" ? "#dc2626" : row.name.toLowerCase() === "hòa phát" ? "#4f46e5" : "#94a3b8" }} />
                                          {row.name}
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium">{row.formatted}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Section 2: KOL / KOC */}
                      {tabsStatus.kol && (
                        <div className="space-y-4 pt-6">
                          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">2</span>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">KOL / KOC</h3>
                          </div>
                          {activeComments.categories.kol_koc && (
                            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                                <FileText className="h-4 w-4 text-slate-600" />
                              </div>
                              <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans">
                                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Nhận định chi tiết:</span>
                                <p>{activeComments.categories.kol_koc}</p>
                              </div>
                            </div>
                          )}
                          <div className="h-80 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                            <ResponsiveContainer width="100%" height="85%">
                              <BarChart data={brandKolKoc}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="ngành_hàng" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                <Legend />
                                <Bar dataKey="kpi_toàn_chiến_dịch" name="KPI Toàn chiến dịch" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="tích_lũy_chiến_dịch" name="Lũy kế thực hiện" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="thực_tế_trong_tuần" name="Thực hiện tuần" fill="#10b981" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Hạng mục & Kênh</th>
                                  <th className="px-4 py-3">Ngành hàng</th>
                                  <th className="px-4 py-3 text-right">KPI toàn chiến dịch</th>
                                  <th className="px-4 py-3 text-right">Lũy kế thực hiện</th>
                                  <th className="px-4 py-3 text-right">Thực hiện tuần</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700">
                                {brandKolKoc.map((row, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-semibold text-slate-900">{row.hạng_mục} ({row.kênh_channel})</td>
                                    <td className="px-4 py-3">{row.ngành_hàng}</td>
                                    <td className="px-4 py-3 text-right font-mono font-medium">{row.kpi_toàn_chiến_dịch}</td>
                                    <td className="px-4 py-3 text-right font-mono font-medium text-blue-600">{row.tích_lũy_chiến_dịch}</td>
                                    <td className="px-4 py-3 text-right font-mono font-medium text-emerald-600">{row.thực_tế_trong_tuần}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                       {/* Section 3: Content & Sáng tạo */}
                       {tabsStatus.content && (
                         <div className="space-y-4 pt-6">
                           <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                             <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">3</span>
                             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Content & Sáng tạo</h3>
                           </div>
                           {activeComments.categories.content && (
                             <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                                 <FileText className="h-4 w-4 text-slate-600" />
                               </div>
                               <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans">
                                 <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Nhận định chi tiết:</span>
                                 <p className="whitespace-pre-line">{activeComments.categories.content}</p>
                               </div>
                             </div>
                           )}
                           <div className="h-80 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                             <ResponsiveContainer width="100%" height="85%">
                               <BarChart data={contentByHạngMục}>
                                 <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                 <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                 <YAxis />
                                 <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                 <Legend />
                                 <Bar dataKey="mục_tiêu_target" name="KPI Tuần" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                                 <Bar dataKey="thực_tế_actual" name="Thực tế tuần" fill="#10b981" radius={[4, 4, 0, 0]} />
                                 <Bar dataKey="tích_lũy_tháng" name="Tích lũy tháng" fill="#6366f1" radius={[4, 4, 0, 0]} />
                               </BarChart>
                             </ResponsiveContainer>
                           </div>
                           <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                             <table className="w-full text-left text-xs">
                               <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                 <tr>
                                   <th className="px-4 py-3">Hạng mục</th>
                                   <th className="px-4 py-3">Kênh & Ngành</th>
                                   <th className="px-4 py-3 text-right">KPI Tuần</th>
                                   <th className="px-4 py-3 text-right">Thực tế Tuần</th>
                                   <th className="px-4 py-3 text-right">Tích lũy Tháng</th>
                                 </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-100 text-slate-700">
                                 {contentRows.map((row, idx) => (
                                   <tr key={idx} className="hover:bg-slate-50/50">
                                     <td className="px-4 py-3 font-semibold text-slate-900">{row.hạng_mục}</td>
                                     <td className="px-4 py-3 text-[11px] font-sans">
                                       <div className="font-medium text-slate-800">{row.ngành_hàng}</div>
                                       <div className="text-slate-400 font-mono whitespace-pre-line">{row.kênh_channel}</div>
                                     </td>
                                     <td className="px-4 py-3 text-right font-mono font-medium">{row.mục_tiêu_target !== null ? row.mục_tiêu_target : "—"}</td>
                                     <td className="px-4 py-3 text-right font-mono font-medium text-emerald-600">{row.thực_tế_actual !== null ? row.thực_tế_actual : "—"}</td>
                                     <td className="px-4 py-3 text-right font-mono font-medium text-indigo-600">{row.tích_lũy_tháng !== null ? row.tích_lũy_tháng : "—"}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </table>
                           </div>
                         </div>
                       )}

                       {/* Section 3b: Chiến dịch TVC */}
                       {tabsStatus.tvc && (() => {
                         const tvcRows = brandDigital.filter((row) => row.hạng_mục === "TVC");
                         const tvcChartData = tvcRows.map((row) => ({
                           name: `${row.kênh_channel || ""} (${row.ngành_hàng || ""})`.trim(),
                           "KPI GRPs": row.mục_tiêu_target || 0,
                           "Thực tế đạt": row.thực_tế_actual || 0,
                           "Lũy kế tháng": row.tích_lũy_tháng || 0,
                         }));

                         return (
                           <div className="space-y-4 pt-6">
                             <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">3b</span>
                               <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Chiến dịch TVC (Digital GRPs)</h3>
                             </div>
                             {activeComments.categories.tvc && (
                               <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                                   <Video className="h-4 w-4 text-slate-600" />
                                 </div>
                                 <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans">
                                   <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Nhận định chi tiết:</span>
                                   <p className="whitespace-pre-line">{activeComments.categories.tvc}</p>
                                 </div>
                               </div>
                             )}
                             <div className="h-96 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                               <ResponsiveContainer width="100%" height="85%">
                                 <BarChart
                                   layout="vertical"
                                   data={tvcChartData}
                                   margin={{ top: 10, right: 30, left: 100, bottom: 5 }}
                                 >
                                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                   <XAxis type="number" />
                                   <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={90} />
                                   <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                                   <Legend />
                                   <Bar dataKey="KPI GRPs" name="KPI GRPs" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                                   <Bar dataKey="Thực tế đạt" name="Thực tế GRPs" fill="#10b981" radius={[0, 4, 4, 0]} />
                                   <Bar dataKey="Lũy kế tháng" name="Lũy kế GRPs" fill="#6366f1" radius={[0, 4, 4, 0]} />
                                 </BarChart>
                               </ResponsiveContainer>
                             </div>
                             <div className="overflow-hidden rounded-xl border border-slate-200 bg-white border-slate-200">
                               <table className="w-full text-left text-xs">
                                 <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                   <tr>
                                     <th className="px-4 py-3">Kênh / Khu vực</th>
                                     <th className="px-4 py-3">Ngành Hàng</th>
                                     <th className="px-4 py-3">Chỉ số</th>
                                     <th className="px-4 py-3 text-right">KPI Tuần</th>
                                     <th className="px-4 py-3 text-right">Thực tế Tuần</th>
                                     <th className="px-4 py-3 text-right">Lũy kế Tháng</th>
                                   </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                   {tvcRows.map((row, idx) => (
                                     <tr key={idx} className="hover:bg-slate-50/50">
                                       <td className="px-4 py-3 font-semibold text-slate-900 font-sans">{row.kênh_channel}</td>
                                       <td className="px-4 py-3 text-[11px] font-sans font-medium text-slate-800">{row.ngành_hàng}</td>
                                       <td className="px-4 py-3 text-slate-400">{row.chỉ_số_metric || "GRPs"}</td>
                                       <td className="px-4 py-3 text-right font-mono font-medium">{row.mục_tiêu_target !== null ? row.mục_tiêu_target : "—"}</td>
                                       <td className="px-4 py-3 text-right font-mono font-medium text-emerald-600">{row.thực_tế_actual !== null ? row.thực_tế_actual : "—"}</td>
                                       <td className="px-4 py-3 text-right font-mono font-medium text-indigo-600">{row.tích_lũy_tháng !== null ? row.tích_lũy_tháng : "—"}</td>
                                     </tr>
                                   ))}
                                 </tbody>
                               </table>
                             </div>
                           </div>
                         );
                       })()}

                       {/* Section 4: Paid Ads */}
                       {tabsStatus.ads && (() => {
                         const adsRows = brandDigital.filter((row) => row.hạng_mục === "Paid Ads");
                         return (
                           <div className="space-y-4 pt-6">
                             <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">4</span>
                               <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Paid Ads (Quảng Cáo)</h3>
                             </div>
                             {(() => {
                               const isMonth = categoryTimeViews.paidAds === "month";
                               const comment = isMonth 
                                 ? (activeComments.categories.paid_ads_monthly || activeComments.categories.paid_ads)
                                 : activeComments.categories.paid_ads;
                               if (!comment) return null;
                               return (
                                 <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                                     <FileText className="h-4 w-4 text-slate-600" />
                                   </div>
                                   <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans w-full">
                                     <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider flex items-center gap-1.5">
                                       Nhận định chi tiết Paid Ads:
                                       <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border ${isMonth ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-slate-100 text-slate-600 border-slate-200"}`}>
                                         {isMonth ? "Lũy Kế Tháng" : "Số Liệu Tuần"}
                                       </span>
                                     </span>
                                     <p className="whitespace-pre-line">{comment}</p>
                                   </div>
                                 </div>
                               );
                             })()}
                             <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                               <table className="w-full text-left text-xs">
                                 <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                   <tr>
                                     <th className="px-4 py-3">Kênh & Ngành</th>
                                     <th className="px-4 py-3">Chỉ số đo lường</th>
                                     <th className="px-4 py-3 text-right">KPI</th>
                                     <th className="px-4 py-3 text-right">Thực tế</th>
                                   </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100 text-slate-700">
                                   {adsRows.map((row, idx) => (
                                     <tr key={idx} className="hover:bg-slate-50/50">
                                       <td className="px-4 py-3 font-semibold text-slate-900">
                                         <div className="font-bold text-slate-900">{row.kênh_channel}</div>
                                         <div className="text-slate-400 text-[10px] font-medium">{row.ngành_hàng}</div>
                                       </td>
                                       <td className="px-4 py-3 font-sans text-slate-500">{row.chỉ_số_metric}</td>
                                       <td className="px-4 py-3 text-right font-mono font-medium">
                                         {categoryTimeViews.paidAds === "week"
                                           ? (row.mục_tiêu_target?.toLocaleString() ?? "—")
                                           : (row.target_tháng?.toLocaleString() ?? "—")
                                         }
                                       </td>
                                       <td className="px-4 py-3 text-right font-mono font-semibold text-blue-600">
                                         {categoryTimeViews.paidAds === "week"
                                           ? (row.thực_tế_actual?.toLocaleString() ?? "—")
                                           : (row.tích_lũy_tháng?.toLocaleString() ?? "—")
                                         }
                                       </td>
                                     </tr>
                                   ))}
                                 </tbody>
                               </table>
                             </div>
                           </div>
                         );
                       })()}

                      {/* Section 5: SEO */}
                      {tabsStatus.seo && (() => {
                        const seoRows = brandDigital.filter(
                          (row) => row.hạng_mục === "SEO Website" || row.hạng_mục === "SEO Content" || row.hạng_mục === "Product Page"
                        );
                        return (
                          <div className="space-y-4 pt-6">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">5</span>
                              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">SEO Website & Content</h3>
                            </div>
                            {(() => {
                              const isMonth = categoryTimeViews.seo === "month";
                              const comment = isMonth 
                                ? (activeComments.categories.seo_monthly || activeComments.categories.seo)
                                : activeComments.categories.seo;
                              if (!comment) return null;
                              return (
                                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                                    <FileText className="h-4 w-4 text-slate-600" />
                                  </div>
                                  <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans w-full">
                                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider flex items-center gap-1.5">
                                      Nhận định chi tiết SEO Website:
                                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border ${isMonth ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-slate-100 text-slate-600 border-slate-200"}`}>
                                        {isMonth ? "Lũy Kế Tháng" : "Số Liệu Tuần"}
                                      </span>
                                    </span>
                                    <p className="whitespace-pre-line">{comment}</p>
                                  </div>
                                </div>
                              );
                            })()}
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                              <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                  <tr>
                                    <th className="px-4 py-3">Hạng mục & Chỉ số</th>
                                    <th className="px-4 py-3 text-right">KPI</th>
                                    <th className="px-4 py-3 text-right">Thực tế</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                  {seoRows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                      <td className="px-4 py-3 font-semibold text-slate-900">
                                        <div className="font-bold text-slate-900">{row.hạng_mục}</div>
                                        <div className="text-slate-400 text-[10px] font-sans font-medium">{row.kênh_channel} - {row.chỉ_số_metric}</div>
                                      </td>
                                      <td className="px-4 py-3 text-right font-mono font-medium">
                                        {categoryTimeViews.seo === "week"
                                          ? (row.mục_tiêu_target?.toLocaleString() ?? "—")
                                          : (row.target_tháng?.toLocaleString() ?? "—")
                                        }
                                      </td>
                                      <td className="px-4 py-3 text-right font-mono font-semibold text-emerald-600">
                                        {categoryTimeViews.seo === "week"
                                          ? (row.thực_tế_actual?.toLocaleString() ?? "—")
                                          : (row.tích_lũy_tháng?.toLocaleString() ?? "—")
                                        }
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Section 6: BTL */}
                      {tabsStatus.btl && (
                        <div className="space-y-4 pt-6">
                          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">6</span>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">BTL & Trade Marketing</h3>
                          </div>
                          {(() => {
                            const comment = activeComments.categories.btl_trade_monthly || activeComments.categories.btl_trade;
                            if (!comment) return null;
                            return (
                              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                                  <FileText className="h-4 w-4 text-slate-600" />
                                </div>
                                <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans w-full">
                                  <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider flex items-center gap-1.5">
                                    Nhận định chi tiết BTL & Trade Marketing:
                                    <span className="bg-indigo-50 text-indigo-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-indigo-200">
                                      Lũy Kế Tháng
                                    </span>
                                  </span>
                                  <p className="whitespace-pre-line">{comment}</p>
                                </div>
                              </div>
                            );
                          })()}
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Hạng mục lớn</th>
                                  <th className="px-4 py-3">Chi tiết & Phân loại</th>
                                  <th className="px-4 py-3 text-right">Kế hoạch tháng</th>
                                  <th className="px-4 py-3 text-right">Tích lũy đạt</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700">
                                {brandBtl.map((row, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-semibold text-slate-900">{row.hạng_mục_lớn}</td>
                                    <td className="px-4 py-3">
                                      <div className="font-medium text-slate-800">{row.chi_tiết_hạng_mục}</div>
                                      {row.phân_loại && <div className="text-slate-400 text-[10px] font-mono">{row.phân_loại}</div>}
                                    </td>
                                    <td className="px-4 py-3 text-right font-mono font-medium">{row.kế_hoạch_tháng_6?.toLocaleString() ?? "—"}</td>
                                    <td className="px-4 py-3 text-right font-mono font-semibold text-emerald-600">{row.tích_lũy_tháng?.toLocaleString() ?? "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Section 7: PR */}
                      {tabsStatus.pr && (
                        <div className="space-y-4 pt-6">
                          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">7</span>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">PR - Báo chí</h3>
                          </div>
                          {activeComments.categories.pr && (
                            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                                <FileText className="h-4 w-4 text-slate-600" />
                              </div>
                              <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans">
                                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Nhận định chi tiết:</span>
                                <p>{activeComments.categories.pr}</p>
                              </div>
                            </div>
                          )}
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Ngành hàng</th>
                                  <th className="px-4 py-3">Chỉ số đo lường</th>
                                  <th className="px-4 py-3 text-right">Mục tiêu Target</th>
                                  <th className="px-4 py-3 text-right">Thực tế Đạt</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                {brandOohPr.filter(r => r.hạng_mục === "PR - báo chí").map((row, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-sans font-semibold text-slate-900">{row.ngành_hàng}</td>
                                    <td className="px-4 py-3 font-sans">{row.chỉ_số_metric}</td>
                                    <td className="px-4 py-3 text-right font-medium">{row.mục_tiêu_target?.toLocaleString() || "—"}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-purple-600">{row.thực_tế_actual?.toLocaleString() || "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Section 8: OOH */}
                      {tabsStatus.ooh && (
                        <div className="space-y-4 pt-6">
                          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">8</span>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Quảng cáo OOH</h3>
                          </div>
                          {activeComments.categories.ooh && (
                            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                                <FileText className="h-4 w-4 text-slate-600" />
                              </div>
                              <div className="space-y-1 text-sm text-slate-700 leading-relaxed font-sans">
                                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Nhận định chi tiết:</span>
                                <p>{activeComments.categories.ooh}</p>
                              </div>
                            </div>
                          )}
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3">Kênh quảng cáo</th>
                                  <th className="px-4 py-3">Chỉ số đo lường</th>
                                  <th className="px-4 py-3 text-right">Mục tiêu Target</th>
                                  <th className="px-4 py-3 text-right">Thực tế Đạt</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                                {brandOohPr.filter(r => r.hạng_mục === "OOH").map((row, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-sans font-semibold text-slate-900">{row.kênh_channel}</td>
                                    <td className="px-4 py-3 font-sans">{row.chỉ_số_metric}</td>
                                    <td className="px-4 py-3 text-right font-medium">{row.mục_tiêu_target?.toLocaleString() || "—"}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-blue-600">{row.thực_tế_actual?.toLocaleString() || "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </section>
          </div>
        ) : (
          /* ------------------------------------------------------------
              GIAO DIỆN CONTROL PANEL (BẢNG ĐIỀU KHIỂN RIÊNG BIỆT)
             ------------------------------------------------------------ */
          <div className="space-y-8 animate-fade-in">
            <div id="editor_title_section" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  <Settings2 className="h-6 w-6 text-indigo-600 animate-spin-slow" />
                  Control Panel & Quản Trị Báo Cáo
                </h2>
                <p className="text-sm text-slate-500">
                  Cung cấp nguồn dữ liệu JSON mới và biên tập trực tiếp các bài nhận định tiếp thị trước khi xuất bản báo cáo.
                </p>
              </div>

              {/* Reset to defaults button */}
              <button
                onClick={handleResetData}
                className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition shadow-sm self-start sm:self-auto"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Khôi phục mặc định
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-12 items-start">
              
              {/* LEFT COLUMN: JSON DATA SOURCE MANAGEMENT (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Option 1: Google Drive Import */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Globe className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      1. Kết nối Google Drive trực tuyến
                    </h3>
                  </div>

                  <form onSubmit={handleDriveImport} className="space-y-3">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Lưu trữ file JSON của bạn trên Google Drive, thiết lập chế độ chia sẻ <strong>&quot;Bất kỳ ai có liên kết đều xem được&quot; (Anyone with link)</strong>, sau đó dán link vào đây:
                    </p>
                    <div className="flex gap-2">
                      <input
                        id="drive_url_input"
                        type="text"
                        value={driveUrl}
                        onChange={(e) => setDriveUrl(e.target.value)}
                        placeholder="Dán link chia sẻ hoặc ID tệp Google Drive..."
                        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 shadow-inner focus:border-indigo-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isDriveLoading || !driveUrl.trim()}
                        className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 shadow-sm transition shrink-0"
                      >
                        {isDriveLoading ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}
                        Đồng bộ
                      </button>
                    </div>
                  </form>
                  
                  {/* Public Sample Links */}
                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                    <span className="font-semibold text-slate-800 block">💡 Cách chuẩn bị Link tệp nhanh:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Bấm nút <span className="font-medium text-slate-800">Chia sẻ (Share)</span> trên file JSON ở Drive của bạn.</li>
                      <li>Chọn <span className="font-medium text-slate-800">Bất kỳ ai có đường liên kết (Anyone with link)</span>.</li>
                      <li>Copy liên kết đó dán vào khung trên và bấm <span className="font-medium text-indigo-600">Đồng bộ</span>.</li>
                    </ul>
                  </div>
                </div>

                {/* Option 2: Paste Raw JSON */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <FileJson className="h-4 w-4" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        2. Soạn thảo hoặc Paste JSON thủ công
                      </h3>
                    </div>
                  </div>

                  <form onSubmit={handleJsonSubmit} className="space-y-3">
                    <div className="relative">
                      <textarea
                        id="json_text_editor"
                        rows={12}
                        value={pastedJson}
                        onChange={(e) => setPastedJson(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 p-3 font-mono text-[11px] bg-white text-slate-900 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 scrollbar"
                      />
                      <span className="absolute bottom-2 right-2 rounded bg-slate-100 border border-slate-200 px-2 py-0.5 font-mono text-[9px] text-slate-500">
                        JSON Editor
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Cập nhật dữ liệu cấu trúc
                    </button>
                  </form>
                </div>

                {/* Section 3: Quản Lý Người Dùng & Phân Quyền (Only Admin) */}
                {currentUser.role === "Admin" ? (
                  <div className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <UserPlus className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          Quản lý tài khoản & Phân quyền
                        </h3>
                        <p className="text-[11px] text-slate-500">Thêm, sửa, xóa người dùng hệ thống</p>
                      </div>
                    </div>

                    {/* Add / Edit Form */}
                    <form onSubmit={handleAddOrEditUser} className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                      <span className="text-xs font-bold text-indigo-900 block uppercase tracking-wider">
                        {editingUsername ? "⚡ Cập nhật người dùng" : "➕ Thêm tài khoản mới"}
                      </span>
                      
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Tên hiển thị</label>
                          <input
                            id="manager_name_input"
                            type="text"
                            required
                            value={managerName}
                            onChange={(e) => setManagerName(e.target.value)}
                            placeholder="Ví dụ: Nguyễn Văn A"
                            className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Tên đăng nhập (Email)</label>
                          <input
                            id="manager_username_input"
                            type="text"
                            required
                            disabled={!!editingUsername}
                            value={managerUsername}
                            onChange={(e) => setManagerUsername(e.target.value)}
                            placeholder="Ví dụ: name@gmail.com"
                            className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Mật khẩu</label>
                          <input
                            id="manager_password_input"
                            type="password"
                            required={!editingUsername}
                            value={managerPassword}
                            onChange={(e) => setManagerPassword(e.target.value)}
                            placeholder={editingUsername ? "Để trống nếu giữ nguyên..." : "Nhập mật khẩu..."}
                            className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Vai trò phân quyền</label>
                          <select
                            id="manager_role_select"
                            value={managerRole}
                            onChange={(e) => setManagerRole(e.target.value as any)}
                            className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 bg-white focus:border-indigo-500 focus:outline-none cursor-pointer"
                          >
                            <option value="Viewer">Viewer (Chỉ xem báo cáo)</option>
                            <option value="Editor">Editor (Biên tập dữ liệu)</option>
                            <option value="Admin">Admin (Toàn quyền hệ thống)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          id="btn_submit_manager"
                          className="flex-1 rounded bg-indigo-600 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer"
                        >
                          {editingUsername ? "Lưu thay đổi" : "Tạo tài khoản"}
                        </button>
                        {editingUsername && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingUsername(null);
                              setManagerUsername("");
                              setManagerPassword("");
                              setManagerName("");
                              setManagerRole("Viewer");
                            }}
                            className="rounded bg-slate-300 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-400 transition cursor-pointer"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Users list table */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Danh sách tài khoản ({users.length})
                      </span>
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white max-h-56 overflow-y-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider sticky top-0">
                            <tr>
                              <th className="px-3 py-2 text-[10px]">Tài khoản</th>
                              <th className="px-3 py-2 text-[10px]">Vai trò</th>
                              <th className="px-3 py-2 text-right text-[10px]">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                            {users.map((u) => (
                              <tr key={u.username} className="hover:bg-slate-50 transition-colors">
                                <td className="px-3 py-2">
                                  <span className="font-semibold text-slate-900 block leading-tight">{u.name}</span>
                                </td>
                                <td className="px-3 py-2">
                                  <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-extrabold ${
                                    u.role === "Admin" ? "bg-indigo-100 text-indigo-700" :
                                    u.role === "Editor" ? "bg-emerald-100 text-emerald-700" :
                                    "bg-amber-100 text-amber-700"
                                  }`}>
                                    {u.role}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-right space-x-1.5">
                                  <button
                                    onClick={() => handleStartEditUser(u)}
                                    className="text-indigo-600 hover:text-indigo-900 text-[11px] font-semibold cursor-pointer"
                                    title="Sửa phân quyền"
                                  >
                                    Sửa
                                  </button>
                                  {/* Cannot delete oneself */}
                                  {u.username !== currentUser.username ? (
                                    <button
                                      onClick={() => handleDeleteUser(u.username)}
                                      className="text-rose-600 hover:text-rose-900 text-[11px] font-semibold cursor-pointer"
                                      title="Xóa người dùng"
                                    >
                                      Xóa
                                    </button>
                                  ) : (
                                    <span className="text-slate-300 text-[11px] select-none">Bản thân</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-slate-400" />
                      <h3 className="font-bold text-slate-700 text-sm">
                        Phân quyền & Tài khoản
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Bạn đang đăng nhập với quyền <strong className="text-emerald-600">{currentUser.role}</strong>. Chỉ có tài khoản Quản trị viên (Admin) mới có thể xem danh sách và phân quyền quản trị tài khoản người dùng khác.
                    </p>
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: REVIEWS & SUGGESTIONS WRITER (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Assessment Editor Box */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-base">
                        Biên tập nhận định & Đề xuất tuần này
                      </h3>
                      <p className="text-xs text-slate-500">
                        Đang sửa nhận xét cho nhãn hàng: <strong className="text-indigo-600">{selectedBrand.toUpperCase()}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* AI Suggestion Generator */}
                      <button
                        onClick={handleAiSuggestions}
                        disabled={isAiLoading}
                        className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 shadow-sm transition"
                      >
                        {isAiLoading ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="h-3.5 w-3.5" />
                        )}
                        💡 Gợi ý bởi AI
                      </button>

                      {/* State status badge */}
                      {hasUnpublishedChanges ? (
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600 border border-amber-200 uppercase tracking-wider shrink-0">
                          Bản Nháp (Draft)
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-200 uppercase tracking-wider shrink-0">
                          Đã Xuất Bản (Live)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Executive Summary: Evaluation */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Đánh giá Thực Trạng Triển Khai (Box 2 - Cột 1)
                      </label>
                      <textarea
                        id="edit_eval_textarea"
                        rows={3}
                        value={currentDraft.evaluation}
                        onChange={(e) => handleDraftCommentChange("evaluation", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    {/* Executive Summary: Proposals */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Đề xuất Tối Ưu Tuần Kế Tiếp (Box 2 - Cột 2)
                      </label>
                      <textarea
                        id="edit_prop_textarea"
                        rows={3}
                        value={currentDraft.proposals}
                        onChange={(e) => handleDraftCommentChange("proposals", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    {/* Category Analysis Individual Tab Comments */}
                    <div className="border-t border-slate-100 pt-4 space-y-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Nhận xét chi tiết cho từng danh mục (Box 3)
                      </span>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* SOV */}
                        {tabsStatus.sov && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                              <Percent className="h-3.5 w-3.5 text-indigo-500" />
                              Nhận xét Share of Voice (SOV)
                            </label>
                            <textarea
                              id="edit_sov_textarea"
                              rows={3}
                              value={currentDraft.categories.sov}
                              onChange={(e) => handleDraftCategoryChange("sov", e.target.value)}
                              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                        )}

                        {/* KOL/KOC */}
                        {tabsStatus.kol && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-indigo-500" />
                              Nhận xét KOL / KOC
                            </label>
                            <textarea
                              id="edit_kol_textarea"
                              rows={3}
                              value={currentDraft.categories.kol_koc}
                              onChange={(e) => handleDraftCategoryChange("kol_koc", e.target.value)}
                              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                        )}

                        {/* Content & Sáng tạo */}
                        {tabsStatus.content && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5 text-indigo-500" />
                              Nhận xét Content & Sáng tạo
                            </label>
                            <textarea
                              id="edit_content_textarea"
                              rows={3}
                              value={currentDraft.categories.content || ""}
                              onChange={(e) => handleDraftCategoryChange("content", e.target.value)}
                              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                        )}

                        {/* TVC */}
                        {tabsStatus.tvc && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                              <Video className="h-3.5 w-3.5 text-indigo-500" />
                              Nhận xét Chiến dịch TVC (Digital GRPs)
                            </label>
                            <textarea
                              id="edit_tvc_textarea"
                              rows={3}
                              value={currentDraft.categories.tvc}
                              onChange={(e) => handleDraftCategoryChange("tvc", e.target.value)}
                              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                        )}

                        {/* Paid Ads */}
                        {tabsStatus.ads && (
                          <div className="space-y-4 border border-indigo-100 rounded-lg p-3 bg-indigo-50/20">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <Target className="h-3.5 w-3.5 text-indigo-500" />
                                Nhận xét Paid Ads (Quảng cáo) - Tuần
                              </label>
                              <textarea
                                id="edit_ads_textarea"
                                rows={3}
                                value={currentDraft.categories.paid_ads}
                                onChange={(e) => handleDraftCategoryChange("paid_ads", e.target.value)}
                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <Target className="h-3.5 w-3.5 text-indigo-600" />
                                Nhận xét Paid Ads (Quảng cáo) - Lũy Kế Tháng
                              </label>
                              <textarea
                                id="edit_ads_monthly_textarea"
                                rows={3}
                                value={currentDraft.categories.paid_ads_monthly || ""}
                                onChange={(e) => handleDraftCategoryChange("paid_ads_monthly", e.target.value)}
                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* SEO */}
                        {tabsStatus.seo && (
                          <div className="space-y-4 border border-indigo-100 rounded-lg p-3 bg-indigo-50/20">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <Globe className="h-3.5 w-3.5 text-indigo-500" />
                                Nhận xét SEO Website & Content - Tuần
                              </label>
                              <textarea
                                id="edit_seo_textarea"
                                rows={3}
                                value={currentDraft.categories.seo}
                                onChange={(e) => handleDraftCategoryChange("seo", e.target.value)}
                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <Globe className="h-3.5 w-3.5 text-indigo-600" />
                                Nhận xét SEO Website - Lũy Kế Tháng
                              </label>
                              <textarea
                                id="edit_seo_monthly_textarea"
                                rows={3}
                                value={currentDraft.categories.seo_monthly || ""}
                                onChange={(e) => handleDraftCategoryChange("seo_monthly", e.target.value)}
                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* BTL & Trade */}
                        {tabsStatus.btl && (
                          <div className="space-y-4 border border-indigo-100 rounded-lg p-3 bg-indigo-50/20">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <Briefcase className="h-3.5 w-3.5 text-indigo-500" />
                                Nhận xét BTL & Trade Marketing - Tuần
                              </label>
                              <textarea
                                id="edit_btl_textarea"
                                rows={3}
                                value={currentDraft.categories.btl_trade}
                                onChange={(e) => handleDraftCategoryChange("btl_trade", e.target.value)}
                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <Briefcase className="h-3.5 w-3.5 text-indigo-600" />
                                Nhận xét BTL & Trade - Lũy Kế Tháng
                              </label>
                              <textarea
                                id="edit_btl_monthly_textarea"
                                rows={3}
                                value={currentDraft.categories.btl_trade_monthly || ""}
                                onChange={(e) => handleDraftCategoryChange("btl_trade_monthly", e.target.value)}
                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* PR */}
                        {tabsStatus.pr && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5 text-indigo-500" />
                              Nhận xét PR - Báo chí
                            </label>
                            <textarea
                              id="edit_pr_textarea"
                              rows={3}
                              value={currentDraft.categories.pr || ""}
                              onChange={(e) => handleDraftCategoryChange("pr", e.target.value)}
                              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                        )}

                        {/* OOH */}
                        {tabsStatus.ooh && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                              <Layers className="h-3.5 w-3.5 text-indigo-500" />
                              Nhận xét Quảng cáo OOH
                            </label>
                            <textarea
                              id="edit_ooh_textarea"
                              rows={3}
                              value={currentDraft.categories.ooh || ""}
                              onChange={(e) => handleDraftCategoryChange("ooh", e.target.value)}
                              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-black bg-white shadow-inner focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Draft to Live reporting database */}
                  <div className="border-t border-slate-100 pt-5 flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        // Revert draft changes back to published
                        setDraftComments(JSON.parse(JSON.stringify(publishedComments)));
                        setHasUnpublishedChanges(false);
                        triggerNotification("success", "Đã hủy bỏ toàn bộ các thay đổi nháp.");
                      }}
                      disabled={!hasUnpublishedChanges}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
                    >
                      Hủy bản nháp
                    </button>
                    
                    <button
                      id="publish_btn"
                      onClick={handlePublish}
                      className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-md transition"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Xuất bản báo cáo chính thức
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {currentUser.role === "Admin" && (
              <div className="mt-8">
                <DatabaseConsole
                  marketingData={marketingData}
                  onSave={async (newData) => {
                    setMarketingData(newData);
                    setPastedJson(JSON.stringify(newData, null, 2));
                    try {
                      const res = await fetch("/api/marketing-data-overwrite", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ data: newData }),
                      });
                      if (!res.ok) {
                        const errText = await res.text();
                        throw new Error(errText || "Không thể đồng bộ dữ liệu với máy chủ.");
                      }
                    } catch (err) {
                      console.error("Failed to overwrite database:", err);
                      throw err;
                    }
                  }}
                  triggerNotification={triggerNotification}
                  timelines={timelines}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer credits */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-400 sm:px-6">
          <p>© 2026 Livotec & Karofi Marketing Reporting Console. All rights reserved.</p>
          <p className="mt-1 font-mono">Dữ liệu phân tích tuần • Thiết kế với triết lý tối giản tinh tế</p>
        </div>
      </footer>
    </div>
  );
}
