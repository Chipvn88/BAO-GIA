import { CatalogItem } from '@/types/quote';

export const CATALOG: Record<string, CatalogItem> = {
  in_bat: { id: "in_bat", name: "IN BAT ( THƯỜNG )", price: 65000, unit: "m²", kind: "area" },
  in_bat_ghi: { id: "in_bat_ghi", name: "IN BAT ( ĐẾ GHI )", price: 85000, unit: "m²", kind: "area" },
  in_decal: { id: "in_decal", name: "IN DECAL  ( THƯỜNG )", price: 85000, unit: "m²", kind: "area" },
  in_decal_bong: { id: "in_decal_bong", name: "IN DECAL  ( CÁN BÓNG )", price: 120000, unit: "m²", kind: "area" },
  decal_bong_tc: { id: "decal_bong_tc", name: "IN DECAL  ( CÁN BÓNG + THI CÔNG )", price: 200000, unit: "m²", kind: "area" },
  decal_mo_tc: { id: "decal_mo_tc", name: "DECAL MỜ  ( CẮT+ THI CÔNG )", price: 200000, unit: "m²", kind: "area" },
  bien_bat_l1: { id: "bien_bat_l1", name: "BIỂN BẠT THƯỜNG ( LOẠI 1 )", price: 200000, unit: "m²", kind: "area" },
  bien_bat_l2: { id: "bien_bat_l2", name: "BIỂN BẠT THƯỜNG ( LOẠI 2 )", price: 230000, unit: "m²", kind: "area" },
  bien_bat_l3: { id: "bien_bat_l3", name: "BIỂN BẠT THƯỜNG ( LOẠI 3 )", price: 260000, unit: "m²", kind: "area" },
  bien_bat_ghi_l1: { id: "bien_bat_ghi_l1", name: "BIỂN BẠT ĐẾ GHI ( LOẠI 1 )", price: 300000, unit: "m²", kind: "area" },
  bien_bat_ghi_l2: { id: "bien_bat_ghi_l2", name: "BIỂN BẠT ĐẾ GHI ( LOẠI 2 )", price: 350000, unit: "m²", kind: "area" },
  bien_ton: { id: "bien_ton", name: "BIỂN ĐẾ TÔN CÁN DECAL", price: 485000, unit: "m²", kind: "area" },
  bien_alu_decal: { id: "bien_alu_decal", name: "BIỂN ALU CÁN DECAL", price: 650000, unit: "m²", kind: "area" },
  alu_noi_l1: { id: "alu_noi_l1", name: "BIỂN ALU CHỮ NỔI KHÔNG ĐÈN ( LOẠI 1 )", price: 900000, unit: "m²", kind: "area" },
  alu_noi_l2: { id: "alu_noi_l2", name: "BIỂN ALU CHỮ NỔI KHÔNG ĐÈN ( LOẠI 2 )", price: 1100000, unit: "m²", kind: "area" },
  alu_noi_l3: { id: "alu_noi_l3", name: "BIỂN ALU CHỮ NỔI KHÔNG ĐÈN ( LOẠI 3 )", price: 1400000, unit: "m²", kind: "area" },
  alu_led: { id: "alu_led", name: "BIỂN ALU NỔI CÓ LED TRONG CHỮ", price: 2000000, unit: "m²", kind: "area" },
  led_ruoi: { id: "led_ruoi", name: "BIỂN LED RUỒI", price: 3000, unit: "bóng", kind: "led" },
  hut_noi_60: { id: "hut_noi_60", name: "BIỂN HÚT NỔI ( LOẠI 60 x 60 )", price: 1200000, unit: "m²", kind: "area" },
  hut_noi_80: { id: "hut_noi_80", name: "BIỂN HÚT NỔI ( LOẠI 80 x 80 )", price: 2200000, unit: "m²", kind: "area" },
  vay_ko_den: { id: "vay_ko_den", name: "BIỂN VẪY ( KHÔNG ĐÈN )", price: 450000, unit: "cái", kind: "fixed" },
  vay_co_den: { id: "vay_co_den", name: "BIỂN VẪY  ( CÓ ĐÈN )", price: 850000, unit: "cái", kind: "fixed" },
  cang_bat_ko_lap: { id: "cang_bat_ko_lap", name: "CĂNG BẠT ( CÓ KHUNG SẴN KHÔNG LẮP ĐẶT )", price: 160000, unit: "m²", kind: "area" },
  cang_bat_co_lap: { id: "cang_bat_co_lap", name: "CĂNG BẠT ( CÓ KHUNG SẴN CÓ LẮP ĐẶT )", price: 190000, unit: "m²", kind: "area" },
  dan_chu_noi_l1: { id: "dan_chu_noi_l1", name: "CẮT VÀ DÁN CHỮ NỔI (LOẠI 1)", price: 1200000, unit: "bộ", kind: "fixed" },
  dan_chu_noi_l2: { id: "dan_chu_noi_l2", name: "CẮT VÀ DÁN CHỮ NỔI (LOẠI 2)", price: 1500000, unit: "bộ", kind: "fixed" },
  dan_chu_noi_l3: { id: "dan_chu_noi_l3", name: "CẮT VÀ DÁN CHỮ NỔI (LOẠI 3)", price: 2000000, unit: "bộ", kind: "fixed" },
  dan_chu_noi_l4: { id: "dan_chu_noi_l4", name: "CẮT VÀ DÁN CHỮ NỔI (LOẠI 4)", price: 2500000, unit: "bộ", kind: "fixed" },
  dan_chu_noi_l5: { id: "dan_chu_noi_l5", name: "CẮT VÀ DÁN CHỮ NỔI (LOẠI 5)", price: 3000000, unit: "bộ", kind: "fixed" },
  thao_l1: { id: "thao_l1", name: "THÁO BIỂN ( LOẠI 1)", price: 1200000, unit: "lần", kind: "fixed" },
  thao_lap_l1: { id: "thao_lap_l1", name: "THÁO VÀ LẮP BIỂN ( LOẠI 1)", price: 1200000, unit: "lần", kind: "fixed" },
  thao_lap_l2: { id: "thao_lap_l2", name: "THÁO VÀ LẮP BIỂN ( LOẠI2)", price: 1500000, unit: "lần", kind: "fixed" },
  thao_lap_l3: { id: "thao_lap_l3", name: "THÁO VÀ LẮP BIỂN ( LOẠI 3)", price: 2000000, unit: "lần", kind: "fixed" },
  thao_lap_l4: { id: "thao_lap_l4", name: "THÁO VÀ LẮP BIỂN ( LOẠI 4)", price: 2500000, unit: "lần", kind: "fixed" },
  thao_lap_l5: { id: "thao_lap_l5", name: "THÁO VÀ LẮP BIỂN ( LOẠI 5)", price: 3000000, unit: "lần", kind: "fixed" },
  led_p10_1m_in: { id: "led_p10_1m_in", name: "LED P10 - 1 MÀU ( TRONG NHÀ )", price: 8000000, unit: "m²", kind: "area" },
  led_p10_3m_out: { id: "led_p10_3m_out", name: "LED P10 - 3 MÀU ( NGOÀI TRỜI )", price: 9000000, unit: "m²", kind: "area" },
  led_p10_full_out: { id: "led_p10_full_out", name: "LED P10 - FULL MÀU ( NGOÀI TRỜI )", price: 10000000, unit: "m²", kind: "area" },
  led_p5_full_out: { id: "led_p5_full_out", name: "LED P5 - FULL MÀU ( NGOÀI TRỜI )", price: 12500000, unit: "m²", kind: "area" },
  led_p3_full_out: { id: "led_p3_full_out", name: "LED P3 - FULL MÀU ( NGOÀI TRỜI )", price: 15500000, unit: "m²", kind: "area" },
  led_p25_full_out: { id: "led_p25_full_out", name: "LED P2,5 - FULL MÀU ( NGOÀI TRỜI )", price: 19000000, unit: "m²", kind: "area" },
};

// Bản đồ tương thích ngược cho các đơn hàng cũ đã lưu
export const LEGACY_KEY_MAP: Record<string, string> = {
  bien_bat: 'bien_bat_l1',
  bien_bat_ghi: 'bien_bat_ghi_l1',
  dan_chu_12: 'dan_chu_noi_l1',
  dan_chu_15: 'dan_chu_noi_l2',
  dan_chu_20: 'dan_chu_noi_l3',
  dan_chu_25: 'dan_chu_noi_l4',
  dan_chu_30: 'dan_chu_noi_l5',
  dan_chu_35: 'dan_chu_noi_l5',
  dan_chu_45: 'dan_chu_noi_l5',
};

export const getCatalogItem = (type: string): CatalogItem => {
  return CATALOG[type] || (LEGACY_KEY_MAP[type] && CATALOG[LEGACY_KEY_MAP[type]]) || CATALOG.bien_bat_l1 || Object.values(CATALOG)[0];
};

export const CATALOG_LIST: CatalogItem[] = Object.values(CATALOG);

export const COMPANY_INFO = {
  name: "QUẢNG CÁO & IN ĐÌNH CƯƠNG",
  address: "Ngã 3 Quán Ngái, xã Tân Kỳ, TP. Hải Phòng",
  hotline: "0934 066 099",
  subtitle: "Hệ thống bóc tách tự động — 41 Hạng mục niêm yết",
};
