export interface DigitalMarketingRow {
  week: string;
  phân_loại_thời_gian: string;
  brand: string;
  nhóm_báo_cáo: string;
  hạng_mục: string;
  ngành_hàng: string;
  kênh_channel: string;
  chỉ_số_metric: string;
  mục_tiêu_target: number | null;
  thực_tế_actual: number | null;
  target_tháng: number | null;
  tích_lũy_tháng: number | null;
}

export interface KolKocRow {
  week: string;
    hạng_mục: string;
  ngành_hàng: string;
  kênh_channel: string;
  chỉ_số_metric: string;
  kpi_toàn_chiến_dịch: number | null;
  thực_tế_trong_tuần: number | null;
  tích_lũy_chiến_dịch: number | null;
}

export interface BtlTradeRow {
  week: string;
  brand: string;
  hạng_mục_lớn: string;
  chi_tiết_hạng_mục: string;
  phân_loại: string | null;
  tần_suất: string;
  đơn_vị_tính: string;
  thực_hiện_tháng_5: number | null;
  kế_hoạch_tháng_6: number | null;
  tích_lũy_tháng: number | null;
}

export interface MonthlyOohPrRow {
  week: string;
  tháng_báo_cáo: string;
  hạng_mục: string;
  brand: string;
  ngành_hàng: string;
  kênh_channel: string;
  chỉ_số_metric: string;
  mục_tiêu_target: number | null;
  thực_tế_actual: number | null;
}

export interface MarketingReportData {
  digital_marketing: DigitalMarketingRow[];
  kol_koc: KolKocRow[];
  btl_trade: BtlTradeRow[];
  monthly_ooh_pr: MonthlyOohPrRow[];
}

export interface CategoryComments {
  sov: string;
  kol_koc: string;
  content?: string;
  tvc: string;
  paid_ads: string;
  paid_ads_monthly?: string;
  seo: string;
  seo_monthly?: string;
  btl_trade: string;
  btl_trade_monthly?: string;
  pr?: string;
  ooh?: string;
  tvc_digital?: string;
}

export interface BrandComments {
  evaluation: string;
  proposals: string;
  categories: CategoryComments;
}

export const INITIAL_MARKETING_DATA: MarketingReportData = {
  "digital_marketing": [
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": null,
      "thực_tế_actual": null,
      "target_tháng": 110000000,
      "tích_lũy_tháng": 72170246
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": null,
      "thực_tế_actual": null,
      "target_tháng": 7333333,
      "tích_lũy_tháng": 5427273
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": null,
      "thực_tế_actual": null,
      "target_tháng": 2095238,
      "tích_lũy_tháng": 2383099
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": null,
      "thực_tế_actual": null,
      "target_tháng": 15,
      "tích_lũy_tháng": 13.298
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": null,
      "thực_tế_actual": null,
      "target_tháng": 3.5,
      "tích_lũy_tháng": 2.28
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "tiktok (koc/kol)",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 74000000,
      "thực_tế_actual": 65079010,
      "target_tháng": 150000000,
      "tích_lũy_tháng": 65079010
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "tiktok (koc/kol)",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 5285714,
      "thực_tế_actual": 7799785,
      "target_tháng": 10714286,
      "tích_lũy_tháng": 7799785
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "tiktok (koc/kol)",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 2114286,
      "thực_tế_actual": 3251131,
      "target_tháng": 3061225,
      "tích_lũy_tháng": 3251131
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "tiktok (koc/kol)",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 14,
      "thực_tế_actual": 8.344,
      "target_tháng": 14,
      "tích_lũy_tháng": 8.344
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "tiktok (koc/kol)",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 2.5,
      "thực_tế_actual": 2.4,
      "target_tháng": 3.5,
      "tích_lũy_tháng": 2.4
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 25000000,
      "thực_tế_actual": 24981308,
      "target_tháng": 90000000,
      "tích_lũy_tháng": 64576492
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 1250000,
      "thực_tế_actual": 1771559,
      "target_tháng": 4500000,
      "tích_lũy_tháng": 4555773
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 625000,
      "thực_tế_actual": 984199,
      "target_tháng": 2250000,
      "tích_lũy_tháng": 2847358
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 20,
      "thực_tế_actual": 14.1,
      "target_tháng": 20,
      "tích_lũy_tháng": 14.2
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 1.8,
      "target_tháng": 2,
      "tích_lũy_tháng": 1.6
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 47000000,
      "thực_tế_actual": 46889687,
      "target_tháng": 220000000,
      "tích_lũy_tháng": 177479983
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 3916667,
      "thực_tế_actual": 4267063,
      "target_tháng": 18333333,
      "tích_lũy_tháng": 16147371
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 1958333,
      "thực_tế_actual": 2530774,
      "target_tháng": 6111111,
      "tích_lũy_tháng": 6248194
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 12,
      "thực_tế_actual": 10.99,
      "target_tháng": 12,
      "tích_lũy_tháng": 11
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 1.7,
      "target_tháng": 3,
      "tích_lũy_tháng": 2.6
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 120000000,
      "thực_tế_actual": 116870149,
      "target_tháng": 505000000,
      "tích_lũy_tháng": 390701037
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 12000000,
      "thực_tế_actual": 12723001,
      "target_tháng": 42083333,
      "tích_lũy_tháng": 41893833
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 4000000,
      "thực_tế_actual": 4642626,
      "target_tháng": 84166669,
      "tích_lũy_tháng": 8629140
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 10,
      "thực_tế_actual": 9.19,
      "target_tháng": 12,
      "tích_lũy_tháng": 9.3
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 3,
      "thực_tế_actual": 2.7,
      "target_tháng": 5,
      "tích_lũy_tháng": 4.9
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 20000000,
      "thực_tế_actual": 19099722,
      "target_tháng": 90000000,
      "tích_lũy_tháng": 70519653
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 1333333,
      "thực_tế_actual": 1337057,
      "target_tháng": 6923077,
      "tích_lũy_tháng": 5972230
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 666667,
      "thực_tế_actual": 774701,
      "target_tháng": 2307692,
      "tích_lũy_tháng": 2176247
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 15,
      "thực_tế_actual": 14.3,
      "target_tháng": 13,
      "tích_lũy_tháng": 11.8
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 1.7,
      "target_tháng": 3,
      "tích_lũy_tháng": 2.7
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 85000000,
      "thực_tế_actual": 82109829,
      "target_tháng": 350000000,
      "tích_lũy_tháng": 277584787
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 6538461,
      "thực_tế_actual": 6971565,
      "target_tháng": 26923077,
      "tích_lũy_tháng": 24159025
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 2972028,
      "thực_tế_actual": 3393440,
      "target_tháng": 6730769,
      "tích_lũy_tháng": 6471386
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 13,
      "thực_tế_actual": 11.8,
      "target_tháng": 13,
      "tích_lũy_tháng": 11.5
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 2.2,
      "thực_tế_actual": 2.1,
      "target_tháng": 4,
      "tích_lũy_tháng": 3.7
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 48000000,
      "thực_tế_actual": 47528858,
      "target_tháng": 185000000,
      "tích_lũy_tháng": 150426798
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 34285716,
      "thực_tế_actual": 3535324,
      "target_tháng": 14230769,
      "tích_lũy_tháng": 12608048
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 1714285,
      "thực_tế_actual": 1932859,
      "target_tháng": 4743590,
      "tích_lũy_tháng": 4352332
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 14,
      "thực_tế_actual": 13.4,
      "target_tháng": 13,
      "tích_lũy_tháng": 11.9
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 1.8,
      "target_tháng": 3,
      "tích_lũy_tháng": 2.9
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 95000000,
      "thực_tế_actual": 95171325,
      "target_tháng": 470000000,
      "tích_lũy_tháng": 370883857
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 6785714,
      "thực_tế_actual": 7450291,
      "target_tháng": 36153846,
      "tích_lũy_tháng": 30187692
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 3392857,
      "thực_tế_actual": 3813651,
      "target_tháng": 9038461,
      "tích_lũy_tháng": 8288765
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 14,
      "thực_tế_actual": 12.8,
      "target_tháng": 13,
      "tích_lũy_tháng": 12.3
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "tiktok",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 2,
      "target_tháng": 4,
      "tích_lũy_tháng": 3.6
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 20000000,
      "thực_tế_actual": 19905107,
      "target_tháng": 90000000,
      "tích_lũy_tháng": 71448844
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 1333333,
      "thực_tế_actual": 1361407,
      "target_tháng": 4500000,
      "tích_lũy_tháng": 4980569
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 666667,
      "thực_tế_actual": 716530,
      "target_tháng": 1800000,
      "tích_lũy_tháng": 2165465
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 15,
      "thực_tế_actual": 14.6,
      "target_tháng": 20,
      "tích_lũy_tháng": 14.3
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "youtube",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 1.9,
      "target_tháng": 2.5,
      "tích_lũy_tháng": 2.3
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "mtd (tháng đến nay)",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "seo website",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "website",
      "chỉ_số_metric": "traffic organic",
      "mục_tiêu_target": 4860,
      "thực_tế_actual": 3246,
      "target_tháng": 15000,
      "tích_lũy_tháng": 10814
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "seo website",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "website",
      "chỉ_số_metric": "impressions organic",
      "mục_tiêu_target": 158000,
      "thực_tế_actual": 148962,
      "target_tháng": 525000,
      "tích_lũy_tháng": 459648
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "clip tvc",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "tvc 60s, 30s, 15s,...",
      "chỉ_số_metric": "số lượng video",
      "mục_tiêu_target": 0,
      "thực_tế_actual": 0,
      "target_tháng": null,
      "tích_lũy_tháng": 2
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "clip tvc",
      "ngành_hàng": "ngành 2",
      "kênh_channel": "tvc 60s, 30s, 15s,...",
      "chỉ_số_metric": "số lượng video",
      "mục_tiêu_target": 0,
      "thực_tế_actual": 0,
      "target_tháng": null,
      "tích_lũy_tháng": 1
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "clip tvc",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "tvc 60s, 30s, 15s,...",
      "chỉ_số_metric": "số lượng video",
      "mục_tiêu_target": 1,
      "thực_tế_actual": 1,
      "target_tháng": null,
      "tích_lũy_tháng": 1
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "social media",
      "ngành_hàng": "all ngành",
      "kênh_channel": "facebook (always on, new product lauching, reup)",
      "chỉ_số_metric": "số lượng bài viết (single post, album post, motion, video, reels...)",
      "mục_tiêu_target": 4,
      "thực_tế_actual": 5,
      "target_tháng": null,
      "tích_lũy_tháng": 7
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "social media",
      "ngành_hàng": "all ngành",
      "kênh_channel": "instagram",
      "chỉ_số_metric": "số lượng bài viết",
      "mục_tiêu_target": 3,
      "thực_tế_actual": 3,
      "target_tháng": null,
      "tích_lũy_tháng": 11
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "seo content",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "website",
      "chỉ_số_metric": "số lượng bài viết",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 2,
      "target_tháng": null,
      "tích_lũy_tháng": 8
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "seo content",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "website",
      "chỉ_số_metric": "số lượng bài viết",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 2,
      "target_tháng": null,
      "tích_lũy_tháng": 8
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "product page",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "website",
      "chỉ_số_metric": "số lượng trang sản phẩm",
      "mục_tiêu_target": 0,
      "thực_tế_actual": 0,
      "target_tháng": null,
      "tích_lũy_tháng": 8
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "product page",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "website",
      "chỉ_số_metric": "số lượng trang sản phẩm",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 2,
      "target_tháng": null,
      "tích_lũy_tháng": 5
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "livotec",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "video giới thiệu sản phẩm",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "youtube & website",
      "chỉ_số_metric": "số lượng video",
      "mục_tiêu_target": 0,
      "thực_tế_actual": 0,
      "target_tháng": null,
      "tích_lũy_tháng": 2
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "brand",
      "hạng_mục": "social listening",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "karofi",
      "chỉ_số_metric": "sov (thị phần thảo luận theo brand)",
      "mục_tiêu_target": null,
      "thực_tế_actual": 0.359,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "brand",
      "hạng_mục": "social listening",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "kang",
      "chỉ_số_metric": "sov (thị phần thảo luận theo brand)",
      "mục_tiêu_target": null,
      "thực_tế_actual": 0.409,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "brand",
      "hạng_mục": "social listening",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "livotec",
      "chỉ_số_metric": "sov (thị phần thảo luận theo brand)",
      "mục_tiêu_target": null,
      "thực_tế_actual": 0.028,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "brand",
      "hạng_mục": "social listening",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "sunhouse",
      "chỉ_số_metric": "sov (thị phần thảo luận theo brand)",
      "mục_tiêu_target": null,
      "thực_tế_actual": 0.144,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "brand",
      "hạng_mục": "social listening",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "hòa phát",
      "chỉ_số_metric": "sov (thị phần thảo luận theo brand)",
      "mục_tiêu_target": null,
      "thực_tế_actual": 0.031,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "brand",
      "hạng_mục": "social listening",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "khác",
      "chỉ_số_metric": "sov (thị phần thảo luận theo brand)",
      "mục_tiêu_target": null,
      "thực_tế_actual": 0.028999999999999915,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "amount spent (vnđ)",
      "mục_tiêu_target": 78000000,
      "thực_tế_actual": 75065269,
      "target_tháng": 271329254,
      "tích_lũy_tháng": 390000000
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "impressions",
      "mục_tiêu_target": 7800000,
      "thực_tế_actual": 8091316,
      "target_tháng": 28400558,
      "tích_lũy_tháng": 38235294
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "reach",
      "mục_tiêu_target": 3250000,
      "thực_tế_actual": 3576289,
      "target_tháng": 7546305,
      "tích_lũy_tháng": 9558824
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "cpm",
      "mục_tiêu_target": 10,
      "thực_tế_actual": 9.277263303027592,
      "target_tháng": 9.553659262610262,
      "tích_lũy_tháng": 10.2
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "paid ads",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook",
      "chỉ_số_metric": "frequency",
      "mục_tiêu_target": 2.4,
      "thực_tế_actual": 2.262489412908185,
      "target_tháng": 3.7635051856504607,
      "tích_lũy_tháng": 4
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "seo website",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "website",
      "chỉ_số_metric": "traffic organic",
      "mục_tiêu_target": 18000,
      "thực_tế_actual": 18852,
      "target_tháng": 65917,
      "tích_lũy_tháng": 80000
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "digital",
      "hạng_mục": "seo website",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "website",
      "chỉ_số_metric": "impressions organic",
      "mục_tiêu_target": 500000,
      "thực_tế_actual": 548338,
      "target_tháng": 2034577,
      "tích_lũy_tháng": 2500000
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "social media",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "facebook (always on, new product lauching, reup)",
      "chỉ_số_metric": "số lượng bài viết (single post, album post, motion, video, reels...)",
      "mục_tiêu_target": 4,
      "thực_tế_actual": 4,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "seo content",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "website",
      "chỉ_số_metric": "số lượng bài viết",
      "mục_tiêu_target": 1,
      "thực_tế_actual": 1,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "product page",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "website",
      "chỉ_số_metric": "số lượng trang sản phẩm",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 2,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "video giới thiệu sản phẩm",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "youtube & website",
      "chỉ_số_metric": "số lượng video",
      "mục_tiêu_target": 3,
      "thực_tế_actual": 3,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "ooh/led",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "sản xuất ấn phẩm",
      "chỉ_số_metric": "số lượng video/ảnh",
      "mục_tiêu_target": 6,
      "thực_tế_actual": 6,
      "target_tháng": null,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "phân_loại_thời_gian": "weekly",
      "brand": "karofi",
      "nhóm_báo_cáo": "content",
      "hạng_mục": "khác",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "chỉnh sửa content mang tính tuyệt đối nhất/duy nhất/...",
      "chỉ_số_metric": "số lượng bài edited",
      "mục_tiêu_target": 12,
      "thực_tế_actual": 12,
      "target_tháng": null,
      "tích_lũy_tháng": null
    }
  ],
  "kol_koc": [
    {
      "week": "19/06-25/06/2026",
      "hạng_mục": "koc/kol",
      "ngành_hàng": "ngành 1 (lọc nước)",
      "kênh_channel": "koc",
      "chỉ_số_metric": "quantity",
      "kpi_toàn_chiến_dịch": 10,
      "thực_tế_trong_tuần": 0,
      "tích_lũy_chiến_dịch": 0
    },
    {
      "week": "19/06-25/06/2026",
      "hạng_mục": "koc/kol",
      "ngành_hàng": "ngành 2 (bếp từ+hút mùi)",
      "kênh_channel": "koc",
      "chỉ_số_metric": "quantity",
      "kpi_toàn_chiến_dịch": 3,
      "thực_tế_trong_tuần": 0,
      "tích_lũy_chiến_dịch": 0
    },
    {
      "week": "19/06-25/06/2026",
      "hạng_mục": "koc/kol",
      "ngành_hàng": "ngành 2 (nồi cơm điện)",
      "kênh_channel": "koc",
      "chỉ_số_metric": "quantity",
      "kpi_toàn_chiến_dịch": 3,
      "thực_tế_trong_tuần": 0,
      "tích_lũy_chiến_dịch": 1
    },
    {
      "week": "19/06-25/06/2026",
      "hạng_mục": "koc/kol",
      "ngành_hàng": "ngành 3 (quạt cây)",
      "kênh_channel": "koc",
      "chỉ_số_metric": "quantity",
      "kpi_toàn_chiến_dịch": 4,
      "thực_tế_trong_tuần": 0,
      "tích_lũy_chiến_dịch": 1
    },
    {
      "week": "19/06-25/06/2026",
      "hạng_mục": "koc/kol",
      "ngành_hàng": "ngành 3 (điều hòa)",
      "kênh_channel": "koc",
      "chỉ_số_metric": "quantity",
      "kpi_toàn_chiến_dịch": 10,
      "thực_tế_trong_tuần": 0,
      "tích_lũy_chiến_dịch": 1
    },
    {
      "week": "19/06-25/06/2026",
      "hạng_mục": "koc/kol",
      "ngành_hàng": "ngành 3 (điều hòa)",
      "kênh_channel": "kol",
      "chỉ_số_metric": "quantity",
      "kpi_toàn_chiến_dịch": 1,
      "thực_tế_trong_tuần": 0,
      "tích_lũy_chiến_dịch": 1
    }
  ],
  "btl_trade": [
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "biển bảng",
      "phân_loại": "gt",
      "tần_suất": "tháng",
      "đơn_vị_tính": "cái",
      "thực_hiện_tháng_5": 3,
      "kế_hoạch_tháng_6": 39,
      "tích_lũy_tháng": 36
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "quầy kệ",
      "phân_loại": "gt",
      "tần_suất": "tháng",
      "đơn_vị_tính": "cái",
      "thực_hiện_tháng_5": 7,
      "kế_hoạch_tháng_6": 47,
      "tích_lũy_tháng": 34
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "posm mặt tiền",
      "phân_loại": "rối hơi",
      "tần_suất": "tháng",
      "đơn_vị_tính": "cái",
      "thực_hiện_tháng_5": 138,
      "kế_hoạch_tháng_6": 279,
      "tích_lũy_tháng": 178
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "posm mặt tiền",
      "phân_loại": "ô/dù",
      "tần_suất": "tháng",
      "đơn_vị_tính": "cái",
      "thực_hiện_tháng_5": 0,
      "kế_hoạch_tháng_6": 306,
      "tích_lũy_tháng": 195
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "mock up",
      "phân_loại": "điều hòa mt",
      "tần_suất": "theo dự án",
      "đơn_vị_tính": "cái",
      "thực_hiện_tháng_5": 239,
      "kế_hoạch_tháng_6": 492,
      "tích_lũy_tháng": 492
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "mock up",
      "phân_loại": "điều hòa gt",
      "tần_suất": "theo dự án",
      "đơn_vị_tính": "cái",
      "thực_hiện_tháng_5": 320,
      "kế_hoạch_tháng_6": 1025,
      "tích_lũy_tháng": 997
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "tài liệu bán hàng (catalog, brochure...)",
      "phân_loại": null,
      "tần_suất": "theo dự án",
      "đơn_vị_tính": "bộ",
      "thực_hiện_tháng_5": 0,
      "kế_hoạch_tháng_6": 200,
      "tích_lũy_tháng": 200
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "event",
      "chi_tiết_hạng_mục": "activation",
      "phân_loại": null,
      "tần_suất": "theo dự án",
      "đơn_vị_tính": "số sự kiện",
      "thực_hiện_tháng_5": 0,
      "kế_hoạch_tháng_6": 0,
      "tích_lũy_tháng": 2
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "kiểm soát ha điểm bán",
      "chi_tiết_hạng_mục": "chấm điểm hình ảnh",
      "phân_loại": "mt",
      "tần_suất": "tháng",
      "đơn_vị_tính": "điểm bán",
      "thực_hiện_tháng_5": 4,
      "kế_hoạch_tháng_6": 4,
      "tích_lũy_tháng": null
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "livotec",
      "hạng_mục_lớn": "nghiên cứu thị trường",
      "chi_tiết_hạng_mục": "dự án nghiên cứu",
      "phân_loại": null,
      "tần_suất": "theo dự án",
      "đơn_vị_tính": "số dự án",
      "thực_hiện_tháng_5": null,
      "kế_hoạch_tháng_6": null,
      "tích_lũy_tháng": 4
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "biển bảng",
      "phân_loại": "gt",
      "tần_suất": "tháng",
      "đơn_vị_tính": "cái",
      "thực_hiện_tháng_5": 40,
      "kế_hoạch_tháng_6": 135,
      "tích_lũy_tháng": 92
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "quầy kệ",
      "phân_loại": "gt",
      "tần_suất": "tháng",
      "đơn_vị_tính": "cái",
      "thực_hiện_tháng_5": 45,
      "kế_hoạch_tháng_6": 102,
      "tích_lũy_tháng": 90
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "posm",
      "chi_tiết_hạng_mục": "posm mặt tiền",
      "phân_loại": "rối hơi",
      "tần_suất": "tháng",
      "đơn_vị_tính": "cái",
      "thực_hiện_tháng_5": 146,
      "kế_hoạch_tháng_6": 1033,
      "tích_lũy_tháng": 446
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "event",
      "chi_tiết_hạng_mục": "activation",
      "phân_loại": "mt/gt",
      "tần_suất": "theo dự án",
      "đơn_vị_tính": "số sự kiện",
      "thực_hiện_tháng_5": null,
      "kế_hoạch_tháng_6": 2,
      "tích_lũy_tháng": 1
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "event",
      "chi_tiết_hạng_mục": "workshop",
      "phân_loại": "lọc tổng",
      "tần_suất": "theo dự án",
      "đơn_vị_tính": "số sự kiện",
      "thực_hiện_tháng_5": null,
      "kế_hoạch_tháng_6": 1,
      "tích_lũy_tháng": 1
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "kiểm soát ha điểm bán",
      "chi_tiết_hạng_mục": "kiểm tra thực tế",
      "phân_loại": "mt",
      "tần_suất": "tháng",
      "đơn_vị_tính": "điểm bán",
      "thực_hiện_tháng_5": 98,
      "kế_hoạch_tháng_6": 99,
      "tích_lũy_tháng": 89
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "kiểm soát ha điểm bán",
      "chi_tiết_hạng_mục": "kiểm tra thực tế",
      "phân_loại": "gt",
      "tần_suất": "tháng",
      "đơn_vị_tính": "điểm bán",
      "thực_hiện_tháng_5": 40,
      "kế_hoạch_tháng_6": 97,
      "tích_lũy_tháng": 81
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "kiểm soát ha điểm bán",
      "chi_tiết_hạng_mục": "chấm điểm hình ảnh",
      "phân_loại": "mt",
      "tần_suất": "tháng",
      "đơn_vị_tính": "điểm bán",
      "thực_hiện_tháng_5": 357,
      "kế_hoạch_tháng_6": 425,
      "tích_lũy_tháng": 326
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "kiểm soát ha điểm bán",
      "chi_tiết_hạng_mục": "chấm điểm hình ảnh",
      "phân_loại": "gt",
      "tần_suất": "tháng",
      "đơn_vị_tính": "điểm bán",
      "thực_hiện_tháng_5": 2028,
      "kế_hoạch_tháng_6": 4347,
      "tích_lũy_tháng": 2612
    },
    {
      "week": "19/06-25/06/2026",
      "brand": "karofi",
      "hạng_mục_lớn": "nghiên cứu thị trường",
      "chi_tiết_hạng_mục": "dự án nghiên cứu",
      "phân_loại": "theo yêu cầu",
      "tần_suất": "theo dự án",
      "đơn_vị_tính": "số dự án",
      "thực_hiện_tháng_5": null,
      "kế_hoạch_tháng_6": 1,
      "tích_lũy_tháng": 1
    }
  ],
  "monthly_ooh_pr": [
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "livotec",
      "ngành_hàng": "ngành 1 & ngành 3",
      "kênh_channel": "lcd building",
      "chỉ_số_metric": "location",
      "mục_tiêu_target": 2676,
      "thực_tế_actual": 2856
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "livotec",
      "ngành_hàng": "ngành 1 & ngành 3",
      "kênh_channel": "lcd building",
      "chỉ_số_metric": "screen",
      "mục_tiêu_target": 10150,
      "thực_tế_actual": 10794
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "livotec",
      "ngành_hàng": "ngành 1 & ngành 3",
      "kênh_channel": "led cities",
      "chỉ_số_metric": "location",
      "mục_tiêu_target": 12,
      "thực_tế_actual": 12
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "livotec",
      "ngành_hàng": "ngành 1 & ngành 3",
      "kênh_channel": "led airport",
      "chỉ_số_metric": "location",
      "mục_tiêu_target": 7,
      "thực_tế_actual": 7
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "pr - báo chí",
      "brand": "livotec",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "báo chí",
      "chỉ_số_metric": "quantity",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 2
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "pr - báo chí",
      "brand": "livotec",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "báo chí",
      "chỉ_số_metric": "views",
      "mục_tiêu_target": 20000,
      "thực_tế_actual": 20858
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "pr - báo chí",
      "brand": "livotec",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "báo chí",
      "chỉ_số_metric": "quantity",
      "mục_tiêu_target": 2,
      "thực_tế_actual": 2
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "pr - báo chí",
      "brand": "livotec",
      "ngành_hàng": "ngành 3",
      "kênh_channel": "báo chí",
      "chỉ_số_metric": "views",
      "mục_tiêu_target": 10000,
      "thực_tế_actual": 12099
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "pr - báo chí",
      "brand": "livotec",
      "ngành_hàng": "all (branding)",
      "kênh_channel": "báo chí",
      "chỉ_số_metric": "quantity",
      "mục_tiêu_target": 1,
      "thực_tế_actual": 1
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "pr - báo chí",
      "brand": "karofi",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "báo chí",
      "chỉ_số_metric": "quantity",
      "mục_tiêu_target": 1,
      "thực_tế_actual": 1
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "pr - báo chí",
      "brand": "karofi",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "báo chí",
      "chỉ_số_metric": "views",
      "mục_tiêu_target": 20000,
      "thực_tế_actual": 21948
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "karofi",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "lcd building",
      "chỉ_số_metric": "location",
      "mục_tiêu_target": 3100,
      "thực_tế_actual": 3280
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "karofi",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "lcd building",
      "chỉ_số_metric": "screen",
      "mục_tiêu_target": 10150,
      "thực_tế_actual": 10794
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "karofi",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "led cities",
      "chỉ_số_metric": "location",
      "mục_tiêu_target": 26,
      "thực_tế_actual": 26
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "karofi",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "led cities",
      "chỉ_số_metric": "screen",
      "mục_tiêu_target": 26,
      "thực_tế_actual": 26
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "karofi",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "led airport",
      "chỉ_số_metric": "location",
      "mục_tiêu_target": 18,
      "thực_tế_actual": 18
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "karofi",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "led airport",
      "chỉ_số_metric": "screen",
      "mục_tiêu_target": 245,
      "thực_tế_actual": 245
    },
    {
      "week": "12/06-18/06/2026",
      "tháng_báo_cáo": "2026-05-01",
      "hạng_mục": "ooh",
      "brand": "karofi",
      "ngành_hàng": "ngành 1",
      "kênh_channel": "pano",
      "chỉ_số_metric": "location",
      "mục_tiêu_target": 31,
      "thực_tế_actual": 31
    }
  ]
};

export const DEFAULT_COMMENTS_LIVOTEC: BrandComments = {
  evaluation: "Chiến dịch tuần này của Livotec ghi nhận kết quả khả quan ở mảng SEO Website (đạt 3.246 traffic organic, tiệm cận mục tiêu) và Social Media (vượt KPI số lượng bài viết với 5 bài viết thực tế). Các kênh Paid Ads hoạt động ổn định, trong đó TikTok KOC/KOL mang lại tỷ lệ reach cao vượt trội (3.251.131 Reach thực tế so với KPI là 2.114.285). Tuy nhiên, chỉ số Share of Voice (SOV) của Livotec trên thị trường thảo luận chung còn khá khiêm tốn (chỉ đạt 2,8%), bị lấn át lớn bởi Karofi và Kangaroo.",
  proposals: "1. **Đẩy mạnh Social Listening**: Xây dựng các nội dung mang tính thảo luận tự nhiên (organic discussion) trên các hội nhóm đồ gia dụng để cải thiện chỉ số SOV thương hiệu.\n2. **Tối ưu chi phí TikTok Paid Ads**: Mặc dù hiệu quả reach của TikTok KOC tốt, CPM thực tế đang ở mức rất thấp ($8.344) so với target ($14), đây là cơ hội tốt để duy trì ngân sách phân bổ cho TikTok.\n3. **Thúc đẩy SEO Content**: Tăng tốc sản xuất bài viết chuẩn SEO cho Website để bù đắp lượng traffic organic còn thiếu so với kế hoạch tháng.",
  categories: {
    sov: "Thị phần thảo luận (SOV) của Livotec hiện tại chỉ đạt 2.8%, đứng thứ 5 trong nhóm các thương hiệu được đo lường. Karofi (35.9%) và Kangaroo (40.9%) tiếp tục chiếm lĩnh phần lớn thảo luận thị trường. Cần triển khai các mini-game hoặc chủ đề thảo luận cộng đồng để kích hoạt lượng tương tác tự nhiên lớn hơn.",
    kol_koc: "Hoạt động hợp tác KOC/KOL tuần này đạt tiến độ tốt ở mảng tích lũy chiến dịch (đặc biệt Ngành 1 đạt tích lũy 4/10 KOC, Ngành 3 đạt 3/4 KOC). Mặc dù số thực tế triển khai trong tuần này là 0 do đang ở giai đoạn chuẩn bị content nghiệm thu, tiến độ lũy kế vẫn bám sát tiến trình chiến dịch.",
    content: "Sản lượng ấn phẩm TVC đang bám sát tiến độ dự án. Ngành 3 đã phát hành thành công 1 video TVC mới trong tuần đúng kế hoạch. Lũy kế tháng cho thấy Ngành 1 tích lũy 2 TVC và Ngành 2 tích lũy 1 TVC, tạo nguồn tư liệu phong phú cho quảng cáo Paid Ads.",
    tvc: "Chiến dịch TVC (Digital GRPs) tại các thành phố lớn (Hồ Chí Minh, Hà Nội, Cần Thơ) đạt 100% mục tiêu GRPs đề ra trong tuần với chỉ số GRPS đạt 1.0 cho mỗi khu vực, đảm bảo tần suất phát sóng và độ phủ sóng rộng khắp cho thương hiệu.",
    paid_ads: "Chi tiêu quảng cáo Paid Ads tuần này đạt hiệu quả tối ưu. Tổng CPM trên các kênh dao động ở mức lý tưởng (Facebook Ngành 1 CPM thực tế 10.99đ so với target 12đ, TikTok CPM 9.19đ so với target 10đ). Lượng Reach thực tế vượt KPI đáng kể trên các kênh TikTok, hỗ trợ tích cực cho việc tăng nhận diện thương hiệu.",
    paid_ads_monthly: "Lũy kế tháng của Paid Ads Livotec ghi nhận tổng chi tiêu bám sát ngân sách phân bổ, mang lại hàng triệu hiển thị hiệu quả với CPM tối ưu.",
    seo: "Website SEO duy trì phong độ ổn định với Impressions đạt 148.962 (bằng 94% mục tiêu tuần). Lượng Traffic Organic đạt 3.246 lượt. Để đạt kế hoạch 15.000 Traffic của tháng, cần tăng cường đi link nội bộ và cập nhật thêm các bài viết chia sẻ mẹo vặt gia đình.",
    seo_monthly: "Lũy kế tháng của SEO Website Livotec cho thấy sự tăng trưởng tốt về Traffic Organic tích lũy hướng tới mục tiêu tháng.",
    btl_trade: "Hoạt động POSM đạt tỷ lệ tích lũy tốt. Đặc biệt hạng mục Mock up Điều hòa GT đạt tích lũy 997/1025 cái (hoàn thành 97% kế hoạch tháng 6). So với tháng 5, hầu hết các hạng mục biển bảng và quầy kệ đều ghi nhận mức tăng trưởng vượt bậc (Ví dụ: Biển bảng tháng 6 tích lũy 36 so với 3 của tháng 5).",
    btl_trade_monthly: "Lũy kế mảng POSM & Trade Marketing của Livotec ghi nhận kết quả tích cực tại hàng ngàn điểm bán lẻ khắp cả nước.",
    pr: "Mảng PR - báo chí đạt chỉ tiêu 2 bài viết (Ngành 1 đạt 1 bài, Ngành 3 đạt 1 bài), mang về tổng cộng hơn 32.000 lượt xem thực tế, hoàn thành tốt vai trò định vị thương hiệu.",
    ooh: "Mảng OOH ngoài trời triểnkai mạnh mẽ tại Hà Nội và TP.HCM với 2.856 địa điểm LCD và 10.794 màn hình phủ rộng. Kênh LED thành phố và sân bay hoạt động đúng tần suất, đạt 100% mục tiêu phủ rộng hình ảnh.",
    tvc_digital: "Chiến dịch TVC (Digital GRPs) tại các thành phố lớn (Hồ Chí Minh, Hà Nội, Cần Thơ) đạt 100% mục tiêu GRPs đề ra trong tuần với chỉ số GRPS đạt 1.0 cho mỗi khu vực, đảm bảo tần suất phát sóng và độ phủ sóng rộng khắp cho thương hiệu."
  }
};

export const DEFAULT_COMMENTS_KAROFI: BrandComments = {
  evaluation: "Karofi khẳng định vị thế dẫn đầu với chỉ số Share of Voice (SOV) đạt 35,9%, chỉ xếp sau Kangaroo (40,9%). Kết quả SEO Website cực kỳ ấn tượng, vượt mọi chỉ tiêu tuần (Traffic Organic đạt 18.852, vượt 5% kế hoạch; Impressions đạt 548.338, vượt 10% kế hoạch). Paid Ads trên Facebook cũng hoạt động rất tốt khi lượng Reach đạt 3.576.289, vượt xa KPI tuần (3.250.000) nhờ tối ưu hóa CPM ở mức 9,28đ (thấp hơn target 10đ).",
  proposals: "1. **Tập trung giữ vững SOV**: Tăng cường các chiến dịch tương tác tự nhiên chất lượng cao để rút ngắn khoảng cách với Kangaroo.\n2. **Duy trì ngân sách Facebook Ads**: Facebook Ads đang hoạt động hiệu quả cao với CPM rẻ và Frequency ổn định (2.26). Cần nhân bản các nhóm quảng cáo thành công này.\n3. **Tối ưu hóa hình ảnh điểm bán**: Đẩy nhanh tiến độ chấm điểm hình ảnh điểm bán truyền thống (GT) để đạt mục tiêu kế hoạch tháng 6.",
  categories: {
    sov: "Karofi chiếm 35.9% thị phần thảo luận toàn ngành, giữ vị thế thương hiệu top-of-mind cùng Kangaroo. Khoảng cách với đối thủ bám đuổi Sunhouse (14.4%) khá an toàn. Thảo luận tập trung vào chất lượng lọc nước tinh khiết và dịch vụ bảo hành chuyên nghiệp.",
    kol_koc: "Hoạt động KOL/KOC của Karofi đang được tích hợp sâu trong các bài viết truyền thông. Cần thúc đẩy thêm các bài đánh giá trải nghiệm thực tế từ các KOC gia đình để tăng tính thuyết phục cho người tiêu dùng.",
    content: "Các ấn phẩm nội dung số, bao gồm video giới thiệu sản phẩm (3 video mới trong tuần) và sản xuất ấn phẩm OOH/LED (6 ấn phẩm mới) được thực hiện đầy đủ 100% KPI tuần, hỗ trợ đắc lực cho các chiến dịch quảng cáo hiển thị.",
    tvc: "Chưa triển khai chiến dịch TVC GRPs diện rộng trong tuần này, thảo luận tập trung vào các kênh trực tuyến khác.",
    paid_ads: "Kênh quảng cáo Paid Ads ghi nhận kết quả rất tốt. Chi tiêu đạt 75.065.269 VNĐ, mang về hơn 8 triệu impressions và 3.5 triệu reach. CPM duy trì ở mức tối ưu 9.28 VNĐ (mục tiêu là 10 VNĐ). Tần suất quảng cáo (Frequency) đạt 2.26 lần, đảm bảo độ phủ sâu rộng không bị lặp quá nhiều.",
    paid_ads_monthly: "Lũy kế mảng Paid Ads của Karofi trong tháng đạt hiệu quả hiển thị vượt trội trên kênh Facebook với tần suất hiển thị lý tưởng, giữ vững độ phủ thương hiệu rộng rãi.",
    seo: "SEO Website bùng nổ mạnh mẽ trong tuần này. Cả hai chỉ số quan trọng là Traffic Organic (18.852) và Impressions Organic (548.338) đều vượt kế hoạch tuần (lần lượt đạt 104.7% và 109.6%). Điều này chứng tỏ chất lượng từ khóa và nội dung Always-On đang hoạt động xuất sắc.",
    seo_monthly: "Lũy kế SEO Website tháng này của Karofi cực kỳ bùng nổ, vượt chỉ tiêu đề ra nhờ lượng tìm kiếm tự nhiên tăng mạnh xung quanh sản phẩm chủ lực.",
    btl_trade: "Công tác kiểm soát hình ảnh điểm bán được triển khai trên diện rộng. Chấm điểm hình ảnh GT đạt tích lũy 2.612 điểm bán. Activation và Workshop lọc tổng cũng đã ghi nhận sự kiện đầu tiên thành công trong tháng 6.",
    btl_trade_monthly: "Mảng POSM & Trade Marketing lũy kế đạt kết quả ấn tượng, khẳng định độ bao phủ trưng bày đồng bộ tại hàng ngàn điểm bán lẻ.",
    pr: "PR - báo chí ghi nhận 1 bài viết chuyên sâu về Ngành 1, mang lại lượng view tự nhiên đạt 21.948 lượt xem, vượt 9.7% so với kế hoạch đề ra.",
    ooh: "Mảng OOH triển khai rộng khắp với 3.280 địa điểm LCD và 10.794 màn hình LED. Kênh LED city (26 điểm) và LED sân bay (18 điểm) hoàn thành kế hoạch hiển thị, mang lại ấn tượng thị giác cực kỳ mạnh mẽ.",
    tvc_digital: "Chưa triển khai chiến dịch TVC GRPs diện rộng trong tuần này, thảo luận tập trung vào các kênh trực tuyến khác."
  }
};
