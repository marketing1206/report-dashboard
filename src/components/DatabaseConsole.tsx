import React, { useState, useMemo } from "react";
import {
  Database,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

interface DatabaseConsoleProps {
  marketingData: any;
  onSave: (newData: any) => Promise<void>;
  triggerNotification: (type: "success" | "error", message: string) => void;
  timelines: { week: string; label: string }[];
}

export function DatabaseConsole({
  marketingData,
  onSave,
  triggerNotification,
  timelines,
}: DatabaseConsoleProps) {
  const [activeCollection, setActiveCollection] = useState<
    "digital_marketing" | "kol_koc" | "btl_trade" | "monthly_ooh_pr"
  >("digital_marketing");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("all");
  const [selectedWeekFilter, setSelectedWeekFilter] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Edit / Add Row Form state
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // null means adding new
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Get current active collection list from marketingData
  const currentList = useMemo(() => {
    return marketingData[activeCollection] || [];
  }, [marketingData, activeCollection]);

  // Handle Tab Switch
  const handleCollectionChange = (collection: any) => {
    setActiveCollection(collection);
    setSearchQuery("");
    setSelectedBrandFilter("all");
    setSelectedWeekFilter("all");
    setCurrentPage(1);
    setShowForm(false);
    setEditingIndex(null);
  };

  // Filtered List
  const filteredList = useMemo(() => {
    return currentList.filter((row: any, originalIndex: number) => {
      // Store the original index on each row for reference when editing/deleting
      row._originalIndex = originalIndex;

      // Brand check (normalize brand property since it might be lowercase or vary)
      const rowBrand = (row.brand || "").toLowerCase().trim();
      if (selectedBrandFilter !== "all") {
        if (rowBrand !== selectedBrandFilter.toLowerCase().trim()) return false;
      }

      // Week check
      const rowWeek = (row.week || "").toLowerCase().trim();
      if (selectedWeekFilter !== "all") {
        if (rowWeek !== selectedWeekFilter.toLowerCase().trim()) return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const brandMatch = (row.brand || "").toLowerCase().includes(query);
        const weekMatch = (row.week || "").toLowerCase().includes(query);
        const groupMatch = (row.nhóm_báo_cáo || "").toLowerCase().includes(query);
        const categoryMatch = (row.hạng_mục || row.hạng_mục_lớn || "").toLowerCase().includes(query);
        const detailMatch = (row.chi_tiết_hạng_mục || "").toLowerCase().includes(query);
        const channelMatch = (row.kênh_channel || "").toLowerCase().includes(query);
        const metricMatch = (row.chỉ_số_metric || "").toLowerCase().includes(query);

        if (
          !brandMatch &&
          !weekMatch &&
          !groupMatch &&
          !categoryMatch &&
          !detailMatch &&
          !channelMatch &&
          !metricMatch
        ) {
          return false;
        }
      }

      return true;
    });
  }, [currentList, searchQuery, selectedBrandFilter, selectedWeekFilter]);

  // Paginated List
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(start, start + itemsPerPage);
  }, [filteredList, currentPage]);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;

  // Init Form Fields depending on collection type
  const initForm = (rowToEdit?: any, index: number | null = null) => {
    const defaultWeek = timelines[0]?.week || "";
    
    let defaultForm: Record<string, any> = {};
    if (activeCollection === "digital_marketing") {
      defaultForm = {
        week: defaultWeek,
        phân_loại_thời_gian: "Weekly",
        brand: "livotec",
        nhóm_báo_cáo: "digital",
        hạng_mục: "",
        ngành_hàng: "all",
        kênh_channel: "",
        chỉ_số_metric: "",
        mục_tiêu_target: null,
        thực_tế_actual: null,
        target_tháng: null,
        tích_lũy_tháng: null,
      };
    } else if (activeCollection === "kol_koc") {
      defaultForm = {
        week: defaultWeek,
        brand: "livotec",
        hạng_mục: "",
        ngành_hàng: "all",
        kênh_channel: "",
        chỉ_số_metric: "",
        kpi_toàn_chiến_dịch: null,
        thực_tế_trong_tuần: null,
        tích_lũy_chiến_dịch: null,
      };
    } else if (activeCollection === "btl_trade") {
      defaultForm = {
        week: defaultWeek,
        brand: "livotec",
        hạng_mục_lớn: "",
        chi_tiết_hạng_mục: "",
        phân_loại: "",
        tần_suất: "Hàng tuần",
        đơn_vị_tính: "",
        thực_hiện_tháng_5: null,
        kế_hoạch_tháng_6: null,
        tích_lũy_tháng: null,
      };
    } else if (activeCollection === "monthly_ooh_pr") {
      defaultForm = {
        week: defaultWeek,
        tháng_báo_cáo: "Tháng 6",
        hạng_mục: "PR - báo chí",
        brand: "livotec",
        ngành_hàng: "all",
        kênh_channel: "",
        chỉ_số_metric: "",
        mục_tiêu_target: null,
        thực_tế_actual: null,
      };
    }

    if (rowToEdit) {
      // Load row content
      const safeRow = { ...rowToEdit };
      delete safeRow._originalIndex;
      setFormData(safeRow);
      setEditingIndex(index);
    } else {
      setFormData(defaultForm);
      setEditingIndex(null);
    }
    setShowForm(true);
  };

  // Form Field Change
  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value === "" ? null : value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const clonedMarketingData = JSON.parse(JSON.stringify(marketingData));
      const collectionList = clonedMarketingData[activeCollection] || [];

      // Cast number fields properly
      const formattedForm = { ...formData };
      const numberKeys = [
        "mục_tiêu_target",
        "thực_tế_actual",
        "target_tháng",
        "tích_lũy_tháng",
        "kpi_toàn_chiến_dịch",
        "thực_tế_trong_tuần",
        "tích_lũy_chiến_dịch",
        "thực_hiện_tháng_5",
        "kế_hoạch_tháng_6",
      ];
      for (const nk of numberKeys) {
        if (formattedForm[nk] !== undefined && formattedForm[nk] !== null) {
          formattedForm[nk] = formattedForm[nk] === "" ? null : Number(formattedForm[nk]);
        }
      }

      if (editingIndex !== null) {
        // Edit Mode
        collectionList[editingIndex] = formattedForm;
        triggerNotification("success", `Đã cập nhật dòng số ${editingIndex + 1} thành công.`);
      } else {
        // Add Mode
        collectionList.push(formattedForm);
        triggerNotification("success", `Đã thêm dòng mới vào bảng ${activeCollection} thành công.`);
      }

      clonedMarketingData[activeCollection] = collectionList;

      // Save to parent and database
      await onSave(clonedMarketingData);
      setShowForm(false);
      setEditingIndex(null);
    } catch (err: any) {
      triggerNotification("error", `Không thể lưu thay đổi: ${err.message || err}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Row
  const handleDeleteRow = async (originalIndex: number) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa dòng dữ liệu số ${originalIndex + 1} này không? Hành động này sẽ cập nhật cơ sở dữ liệu.`
      )
    ) {
      try {
        const clonedMarketingData = JSON.parse(JSON.stringify(marketingData));
        const collectionList = clonedMarketingData[activeCollection] || [];

        // Remove element
        collectionList.splice(originalIndex, 1);
        clonedMarketingData[activeCollection] = collectionList;

        await onSave(clonedMarketingData);
        triggerNotification("success", `Đã xóa dòng số ${originalIndex + 1} thành công.`);

        // Adjust pagination if list shrinks
        const newTotalPages = Math.ceil((filteredList.length - 1) / itemsPerPage) || 1;
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        }
      } catch (err: any) {
        triggerNotification("error", `Không thể xóa dòng: ${err.message || err}`);
      }
    }
  };

  return (
    <div className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-900 text-white shadow-md">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              QUẢN TRỊ CƠ SỞ DỮ LIỆU TRỰC TIẾP
              <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-black text-indigo-700 uppercase">
                Admin Privilege
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Chỉnh sửa, thêm mới, xóa bỏ trực tiếp từng bản ghi trong cơ sở dữ liệu lưu trữ
            </p>
          </div>
        </div>

        <button
          onClick={() => initForm()}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-bold text-white shadow-md transition shrink-0"
        >
          <Plus className="h-4 w-4" />
          Thêm bản ghi mới
        </button>
      </div>

      {/* Collection Tab Selector */}
      <div className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1 border border-slate-200/40">
        <button
          onClick={() => handleCollectionChange("digital_marketing")}
          className={`flex-1 min-w-[120px] rounded-lg py-2 px-3 text-xs font-bold text-center transition-all ${
            activeCollection === "digital_marketing"
              ? "bg-white text-slate-950 shadow-sm border border-slate-200/50"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          Digital Marketing ({marketingData.digital_marketing?.length || 0})
        </button>
        <button
          onClick={() => handleCollectionChange("kol_koc")}
          className={`flex-1 min-w-[120px] rounded-lg py-2 px-3 text-xs font-bold text-center transition-all ${
            activeCollection === "kol_koc"
              ? "bg-white text-slate-950 shadow-sm border border-slate-200/50"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          KOL / KOC ({marketingData.kol_koc?.length || 0})
        </button>
        <button
          onClick={() => handleCollectionChange("btl_trade")}
          className={`flex-1 min-w-[120px] rounded-lg py-2 px-3 text-xs font-bold text-center transition-all ${
            activeCollection === "btl_trade"
              ? "bg-white text-slate-950 shadow-sm border border-slate-200/50"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          BTL & Trade ({marketingData.btl_trade?.length || 0})
        </button>
        <button
          onClick={() => handleCollectionChange("monthly_ooh_pr")}
          className={`flex-1 min-w-[120px] rounded-lg py-2 px-3 text-xs font-bold text-center transition-all ${
            activeCollection === "monthly_ooh_pr"
              ? "bg-white text-slate-950 shadow-sm border border-slate-200/50"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          OOH & PR ({marketingData.monthly_ooh_pr?.length || 0})
        </button>
      </div>

      {/* Filters Area */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 bg-slate-50 p-4 rounded-xl border border-slate-200/50">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm theo hạng mục, kênh, chỉ số..."
            className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 shadow-inner focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Brand Filter */}
        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedBrandFilter}
            onChange={(e) => {
              setSelectedBrandFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">Tất cả thương hiệu</option>
            <option value="livotec">Livotec</option>
            <option value="karofi">Karofi</option>
          </select>
        </div>

        {/* Week Filter */}
        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedWeekFilter}
            onChange={(e) => {
              setSelectedWeekFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">Tất cả tuần</option>
            {timelines.map((t) => (
              <option key={t.week} value={t.week}>
                {t.week}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor / Form Overlay/Panel */}
      {showForm && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
            <span className="text-sm font-extrabold text-indigo-900 flex items-center gap-2">
              <Database className="h-4 w-4" />
              {editingIndex !== null ? `📝 CHỈNH SỬA DÒNG #${editingIndex + 1}` : "➕ THÊM BẢN GHI CƠ SỞ DỮ LIỆU MỚI"}
            </span>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingIndex(null);
              }}
              className="rounded bg-slate-200 p-1 text-slate-500 hover:bg-slate-300 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* Fields generated dynamically based on active collection fields */}
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Tuần báo cáo</label>
                <select
                  value={formData.week || ""}
                  onChange={(e) => handleFieldChange("week", e.target.value)}
                  className="w-full rounded border border-slate-300 bg-white px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                >
                  {timelines.map((t) => (
                    <option key={t.week} value={t.week}>
                      {t.week}
                    </option>
                  ))}
                </select>
              </div>

              {formData.brand !== undefined && (
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Thương hiệu (brand)</label>
                  <select
                    value={formData.brand || ""}
                    onChange={(e) => handleFieldChange("brand", e.target.value)}
                    className="w-full rounded border border-slate-300 bg-white px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="livotec">livotec</option>
                    <option value="karofi">karofi</option>
                  </select>
                </div>
              )}

              {/* Digital Marketing fields */}
              {activeCollection === "digital_marketing" && (
                <>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Phân loại thời gian</label>
                    <select
                      value={formData.phân_loại_thời_gian || ""}
                      onChange={(e) => handleFieldChange("phân_loại_thời_gian", e.target.value)}
                      className="w-full rounded border border-slate-300 bg-white px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="mtd (tháng đến nay)">mtd (tháng đến nay)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Nhóm báo cáo</label>
                    <select
                      value={formData.nhóm_báo_cáo || ""}
                      onChange={(e) => handleFieldChange("nhóm_báo_cáo", e.target.value)}
                      className="w-full rounded border border-slate-300 bg-white px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="digital">digital</option>
                      <option value="Content">Content</option>
                      <option value="seo">seo</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Hạng mục</label>
                    <input
                      type="text"
                      required
                      value={formData.hạng_mục || ""}
                      onChange={(e) => handleFieldChange("hạng_mục", e.target.value)}
                      placeholder="VD: paid ads, SEO Website..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Ngành hàng</label>
                    <input
                      type="text"
                      required
                      value={formData.ngành_hàng || ""}
                      onChange={(e) => handleFieldChange("ngành_hàng", e.target.value)}
                      placeholder="VD: all (branding), lọc nước..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Kênh (channel)</label>
                    <input
                      type="text"
                      required
                      value={formData.kênh_channel || ""}
                      onChange={(e) => handleFieldChange("kênh_channel", e.target.value)}
                      placeholder="VD: facebook, youtube, website..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Chỉ số đo lường (metric)</label>
                    <input
                      type="text"
                      required
                      value={formData.chỉ_số_metric || ""}
                      onChange={(e) => handleFieldChange("chỉ_số_metric", e.target.value)}
                      placeholder="VD: reach, impressions, clicks..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Mục tiêu tuần (KPI)</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.mục_tiêu_target ?? ""}
                      onChange={(e) => handleFieldChange("mục_tiêu_target", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Thực tế tuần</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.thực_tế_actual ?? ""}
                      onChange={(e) => handleFieldChange("thực_tế_actual", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Mục tiêu tháng (target)</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.target_tháng ?? ""}
                      onChange={(e) => handleFieldChange("target_tháng", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Lũy kế thực tế tháng</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.tích_lũy_tháng ?? ""}
                      onChange={(e) => handleFieldChange("tích_lũy_tháng", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* KOL / KOC fields */}
              {activeCollection === "kol_koc" && (
                <>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Hạng mục</label>
                    <input
                      type="text"
                      required
                      value={formData.hạng_mục || ""}
                      onChange={(e) => handleFieldChange("hạng_mục", e.target.value)}
                      placeholder="VD: Review máy lọc nước..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Ngành hàng</label>
                    <input
                      type="text"
                      required
                      value={formData.ngành_hàng || ""}
                      onChange={(e) => handleFieldChange("ngành_hàng", e.target.value)}
                      placeholder="VD: máy lọc nước, đồ gia dụng..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Kênh (channel)</label>
                    <input
                      type="text"
                      required
                      value={formData.kênh_channel || ""}
                      onChange={(e) => handleFieldChange("kênh_channel", e.target.value)}
                      placeholder="VD: facebook, youtube, tiktok..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Chỉ số đo lường (metric)</label>
                    <input
                      type="text"
                      required
                      value={formData.chỉ_số_metric || ""}
                      onChange={(e) => handleFieldChange("chỉ_số_metric", e.target.value)}
                      placeholder="VD: video views, posts, engagement..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">KPI Toàn chiến dịch</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.kpi_toàn_chiến_dịch ?? ""}
                      onChange={(e) => handleFieldChange("kpi_toàn_chiến_dịch", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Thực hiện trong tuần</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.thực_tế_trong_tuần ?? ""}
                      onChange={(e) => handleFieldChange("thực_tế_trong_tuần", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Tích lũy thực hiện chiến dịch</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.tích_lũy_chiến_dịch ?? ""}
                      onChange={(e) => handleFieldChange("tích_lũy_chiến_dịch", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* BTL & Trade fields */}
              {activeCollection === "btl_trade" && (
                <>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Hạng mục lớn</label>
                    <input
                      type="text"
                      required
                      value={formData.hạng_mục_lớn || ""}
                      onChange={(e) => handleFieldChange("hạng_mục_lớn", e.target.value)}
                      placeholder="VD: POSM, Điểm bán, Activation..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Chi tiết hạng mục</label>
                    <input
                      type="text"
                      required
                      value={formData.chi_tiết_hạng_mục || ""}
                      onChange={(e) => handleFieldChange("chi_tiết_hạng_mục", e.target.value)}
                      placeholder="VD: biển bảng ngoài trời, thay quầy kệ..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Phân loại (nếu có)</label>
                    <input
                      type="text"
                      value={formData.phân_loại || ""}
                      onChange={(e) => handleFieldChange("phân_loại", e.target.value)}
                      placeholder="VD: Đại lý loại A, khu vực miền Bắc..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Tần suất</label>
                    <input
                      type="text"
                      required
                      value={formData.tần_suất || ""}
                      onChange={(e) => handleFieldChange("tần_suất", e.target.value)}
                      placeholder="VD: Hàng tuần, Hàng tháng, 1 lần..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Đơn vị tính</label>
                    <input
                      type="text"
                      required
                      value={formData.đơn_vị_tính || ""}
                      onChange={(e) => handleFieldChange("đơn_vị_tính", e.target.value)}
                      placeholder="VD: Cửa hàng, Lượt xem, Tấm bạt..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Thực hiện Tháng 5</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.thực_hiện_tháng_5 ?? ""}
                      onChange={(e) => handleFieldChange("thực_hiện_tháng_5", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Kế hoạch Tháng 6</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.kế_hoạch_tháng_6 ?? ""}
                      onChange={(e) => handleFieldChange("kế_hoạch_tháng_6", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Tích lũy Tháng 6</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.tích_lũy_tháng ?? ""}
                      onChange={(e) => handleFieldChange("tích_lũy_tháng", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* OOH & PR fields */}
              {activeCollection === "monthly_ooh_pr" && (
                <>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Tháng báo cáo</label>
                    <input
                      type="text"
                      required
                      value={formData.tháng_báo_cáo || ""}
                      onChange={(e) => handleFieldChange("tháng_báo_cáo", e.target.value)}
                      placeholder="VD: Tháng 6"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Hạng mục</label>
                    <select
                      value={formData.hạng_mục || ""}
                      onChange={(e) => handleFieldChange("hạng_mục", e.target.value)}
                      className="w-full rounded border border-slate-300 bg-white px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="PR - báo chí">PR - báo chí</option>
                      <option value="OOH">OOH</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Ngành hàng</label>
                    <input
                      type="text"
                      required
                      value={formData.ngành_hàng || ""}
                      onChange={(e) => handleFieldChange("ngành_hàng", e.target.value)}
                      placeholder="VD: lọc nước, máy lọc nước nóng lạnh..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Kênh (channel)</label>
                    <input
                      type="text"
                      required
                      value={formData.kênh_channel || ""}
                      onChange={(e) => handleFieldChange("kênh_channel", e.target.value)}
                      placeholder="VD: Dân Trí, LED Cities, LCD Building..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Chỉ số đo lường (metric)</label>
                    <input
                      type="text"
                      required
                      value={formData.chỉ_số_metric || ""}
                      onChange={(e) => handleFieldChange("chỉ_số_metric", e.target.value)}
                      placeholder="VD: Views, Quantity, Location..."
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Mục tiêu Target</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.mục_tiêu_target ?? ""}
                      onChange={(e) => handleFieldChange("mục_tiêu_target", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Thực tế đạt</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.thực_tế_actual ?? ""}
                      onChange={(e) => handleFieldChange("thực_tế_actual", e.target.value)}
                      placeholder="Số lượng hoặc bỏ trống"
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-indigo-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-xs font-bold text-white shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Lưu dữ liệu bản ghi
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Database Records Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider">
            Bản ghi dữ liệu ({filteredList.length} dòng khớp lọc)
          </span>
          <span className="text-slate-500 font-medium">
            Trang {currentPage} / {totalPages}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                {activeCollection === "digital_marketing" && (
                  <tr>
                    <th className="px-4 py-3 min-w-[100px]">Tuần / Brand</th>
                    <th className="px-4 py-3">Hạng mục & Nhóm</th>
                    <th className="px-4 py-3">Kênh & Ngành</th>
                    <th className="px-4 py-3">Chỉ số</th>
                    <th className="px-4 py-3 text-right">Mục tiêu / Thực tế Tuần</th>
                    <th className="px-4 py-3 text-right">Mục tiêu / Lũy kế Tháng</th>
                    <th className="px-4 py-3 text-right min-w-[120px]">Thao tác</th>
                  </tr>
                )}
                {activeCollection === "kol_koc" && (
                  <tr>
                    <th className="px-4 py-3 min-w-[100px]">Tuần / Brand</th>
                    <th className="px-4 py-3">Hạng mục</th>
                    <th className="px-4 py-3">Kênh & Ngành</th>
                    <th className="px-4 py-3">Chỉ số</th>
                    <th className="px-4 py-3 text-right">KPI toàn bộ / Thực tế tuần</th>
                    <th className="px-4 py-3 text-right">Lũy kế chiến dịch</th>
                    <th className="px-4 py-3 text-right min-w-[120px]">Thao tác</th>
                  </tr>
                )}
                {activeCollection === "btl_trade" && (
                  <tr>
                    <th className="px-4 py-3 min-w-[100px]">Tuần / Brand</th>
                    <th className="px-4 py-3">Hạng mục lớn & Chi tiết</th>
                    <th className="px-4 py-3">Tần suất / Đơn vị</th>
                    <th className="px-4 py-3 text-right">T5 Thực tế</th>
                    <th className="px-4 py-3 text-right">Kế hoạch / Lũy kế T6</th>
                    <th className="px-4 py-3 text-right min-w-[120px]">Thao tác</th>
                  </tr>
                )}
                {activeCollection === "monthly_ooh_pr" && (
                  <tr>
                    <th className="px-4 py-3 min-w-[100px]">Tuần / Brand</th>
                    <th className="px-4 py-3">Tháng / Hạng mục</th>
                    <th className="px-4 py-3">Kênh & Ngành hàng</th>
                    <th className="px-4 py-3">Chỉ số</th>
                    <th className="px-4 py-3 text-right">KPI Mục tiêu / Thực tế đạt</th>
                    <th className="px-4 py-3 text-right min-w-[120px]">Thao tác</th>
                  </tr>
                )}
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-slate-400 font-medium"
                    >
                      Không tìm thấy dòng dữ liệu nào khớp điều kiện lọc.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((row: any) => {
                    const originalIdx = row._originalIndex;
                    return (
                      <tr
                        key={originalIdx}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        {/* Digital Marketing columns */}
                        {activeCollection === "digital_marketing" && (
                          <>
                            <td className="px-4 py-3">
                              <span className="font-mono text-[10px] block leading-normal">{row.week}</span>
                              <span className="inline-block rounded bg-indigo-50 px-1 py-0.5 text-[9px] font-black text-indigo-700 uppercase leading-none">
                                {row.brand}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-900">
                              <span className="block">{row.hạng_mục}</span>
                              <span className="text-[10px] text-slate-400 font-mono block leading-none uppercase">
                                {row.nhóm_báo_cáo} ({row.phân_loại_thời_gian})
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="block text-slate-800">{row.kênh_channel}</span>
                              <span className="text-[10px] text-slate-400 block">{row.ngành_hàng}</span>
                            </td>
                            <td className="px-4 py-3 font-mono font-medium text-slate-600">
                              {row.chỉ_số_metric}
                            </td>
                            <td className="px-4 py-3 text-right font-mono">
                              <span className="text-slate-400 block text-[10px]">T: {row.mục_tiêu_target?.toLocaleString() ?? "—"}</span>
                              <span className="text-emerald-600 font-bold">A: {row.thực_tế_actual?.toLocaleString() ?? "—"}</span>
                            </td>
                            <td className="px-4 py-3 text-right font-mono">
                              <span className="text-slate-400 block text-[10px]">T: {row.target_tháng?.toLocaleString() ?? "—"}</span>
                              <span className="text-indigo-600 font-bold">A: {row.tích_lũy_tháng?.toLocaleString() ?? "—"}</span>
                            </td>
                          </>
                        )}

                        {/* KOL/KOC columns */}
                        {activeCollection === "kol_koc" && (
                          <>
                            <td className="px-4 py-3">
                              <span className="font-mono text-[10px] block leading-normal">{row.week}</span>
                              <span className="inline-block rounded bg-indigo-50 px-1 py-0.5 text-[9px] font-black text-indigo-700 uppercase leading-none">
                                {row.brand || "livotec"}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-900">
                              {row.hạng_mục}
                            </td>
                            <td className="px-4 py-3">
                              <span className="block text-slate-800">{row.kênh_channel}</span>
                              <span className="text-[10px] text-slate-400 block">{row.ngành_hàng}</span>
                            </td>
                            <td className="px-4 py-3 font-mono font-medium text-slate-600">
                              {row.chỉ_số_metric}
                            </td>
                            <td className="px-4 py-3 text-right font-mono">
                              <span className="text-slate-400 block text-[10px]">C: {row.kpi_toàn_chiến_dịch?.toLocaleString() ?? "—"}</span>
                              <span className="text-emerald-600 font-bold">W: {row.thực_tế_trong_tuần?.toLocaleString() ?? "—"}</span>
                            </td>
                            <td className="px-4 py-3 text-right font-mono font-bold text-indigo-600">
                              {row.tích_lũy_chiến_dịch?.toLocaleString() ?? "—"}
                            </td>
                          </>
                        )}

                        {/* BTL Trade columns */}
                        {activeCollection === "btl_trade" && (
                          <>
                            <td className="px-4 py-3">
                              <span className="font-mono text-[10px] block leading-normal">{row.week}</span>
                              <span className="inline-block rounded bg-indigo-50 px-1 py-0.5 text-[9px] font-black text-indigo-700 uppercase leading-none">
                                {row.brand || "livotec"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-semibold text-slate-900 block">{row.hạng_mục_lớn}</span>
                              <span className="text-slate-500 block">{row.chi_tiết_hạng_mục}</span>
                              {row.phân_loại && (
                                <span className="text-[9px] text-slate-400 font-mono block leading-none">
                                  {row.phân_loại}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span className="block">{row.tần_suất}</span>
                              <span className="text-[10px] text-slate-400 font-mono block">/ {row.đơn_vị_tính}</span>
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-slate-600">
                              {row.thực_hiện_tháng_5?.toLocaleString() ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-right font-mono">
                              <span className="text-slate-400 block text-[10px]">KH: {row.kế_hoạch_tháng_6?.toLocaleString() ?? "—"}</span>
                              <span className="text-emerald-600 font-bold">Lũy kế: {row.tích_lũy_tháng?.toLocaleString() ?? "—"}</span>
                            </td>
                          </>
                        )}

                        {/* OOH & PR columns */}
                        {activeCollection === "monthly_ooh_pr" && (
                          <>
                            <td className="px-4 py-3">
                              <span className="font-mono text-[10px] block leading-normal">{row.week}</span>
                              <span className="inline-block rounded bg-indigo-50 px-1 py-0.5 text-[9px] font-black text-indigo-700 uppercase leading-none">
                                {row.brand || "livotec"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-semibold text-slate-900 block">{row.hạng_mục}</span>
                              <span className="text-[10px] text-slate-400 font-mono block uppercase">
                                {row.tháng_báo_cáo}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="block text-slate-800">{row.kênh_channel}</span>
                              <span className="text-[10px] text-slate-400 block">{row.ngành_hàng}</span>
                            </td>
                            <td className="px-4 py-3 font-mono text-slate-600">
                              {row.chỉ_số_metric}
                            </td>
                            <td className="px-4 py-3 text-right font-mono">
                              <span className="text-slate-400 block text-[10px]">T: {row.mục_tiêu_target?.toLocaleString() ?? "—"}</span>
                              <span className="text-indigo-600 font-bold">A: {row.thực_tế_actual?.toLocaleString() ?? "—"}</span>
                            </td>
                          </>
                        )}

                        {/* Control buttons */}
                        <td className="px-4 py-3 text-right font-sans font-semibold space-x-2">
                          <button
                            onClick={() => initForm(row, originalIdx)}
                            className="text-indigo-600 hover:text-indigo-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="h-3 w-3" />
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteRow(originalIdx)}
                            className="text-rose-600 hover:text-rose-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-3">
            <span className="text-xs text-slate-500 font-medium">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredList.length)} trên tổng số{" "}
              {filteredList.length} kết quả
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
                className="rounded border border-slate-300 p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 transition cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-xs text-slate-800 font-extrabold px-3">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
                className="rounded border border-slate-300 p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 transition cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
