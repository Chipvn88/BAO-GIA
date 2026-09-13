export function formatVND(value: number): string {
  if (isNaN(value) || value === null || value === undefined) {
    return '0 đ';
  }
  return new Intl.NumberFormat('vi-VN').format(Math.round(value)) + ' đ';
}

export function formatCurrentDate(date: Date = new Date()): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getMonthFromDate(dateStr?: string): number {
  if (!dateStr) return new Date().getMonth() + 1;
  const parts = dateStr.trim().split('/');
  if (parts.length >= 2) {
    const m = parseInt(parts[1], 10);
    if (!isNaN(m) && m >= 1 && m <= 12) return m;
  }
  return new Date().getMonth() + 1;
}

/**
 * Tạo mã số hiệu báo giá theo đúng quy chuẩn:
 * "Số: T{tháng}-{000A}"
 * Ví dụ: "Số: T9-0001", "Số: T9-0002"
 */
export function generateQuoteCode(month: number, orderNumber: number = 1): string {
  const formattedNumber = String(orderNumber).padStart(4, '0');
  return `Số: T${month}-${formattedNumber}`;
}
