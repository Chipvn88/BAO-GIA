import { SavedQuote, CustomerInfo, QuoteItem } from '@/types/quote';
import { generateQuoteCode, getMonthFromDate } from './format';

const STORAGE_KEY = 'dinhcuong_saved_quotes_v1';

export function getSavedQuotes(): SavedQuote[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedQuote[];
  } catch (error) {
    console.error('Lỗi khi đọc danh sách đơn hàng đã lưu:', error);
    return [];
  }
}

/**
 * Tính số thứ tự đơn hàng tiếp theo (A) cho một tháng cụ thể:
 * - Lọc tất cả đơn hàng đã lưu trong tháng đó (chưa bị xóa)
 * - Lấy số thứ tự lớn nhất maxA
 * - Số tiếp theo sẽ là maxA + 1 (hoặc 1 nếu chưa có đơn nào hoặc các đơn đã bị xóa hết)
 */
export function getNextOrderNumber(month: number): number {
  const quotes = getSavedQuotes();
  const quotesInMonth = quotes.filter((q) => q.month === month);

  if (quotesInMonth.length === 0) {
    return 1;
  }

  const maxOrder = Math.max(...quotesInMonth.map((q) => q.orderNumber || 0));
  return maxOrder + 1;
}

/**
 * Lưu đơn hàng vào Website (localStorage)
 */
export function saveQuoteToStorage(params: {
  quoteCode?: string;
  customer: CustomerInfo;
  items: QuoteItem[];
  extraFee: number;
  vatRate: number;
  grandTotal: number;
}): { savedQuote: SavedQuote; nextCode: string } {
  const quotes = getSavedQuotes();
  const month = getMonthFromDate(params.customer.date);

  // Tính số thứ tự A cho đơn hàng này
  let orderNumber = getNextOrderNumber(month);

  // Nếu người dùng đã có mã hợp lệ dạng "Số: T9-000A", ta có thể trích xuất
  let finalCode = params.quoteCode?.trim();
  if (!finalCode || !finalCode.startsWith('Số: T')) {
    finalCode = generateQuoteCode(month, orderNumber);
  } else {
    // Trích xuất số orderNumber từ finalCode nếu có
    const match = finalCode.match(/T\d+-(\d+)/);
    if (match && match[1]) {
      const parsedNum = parseInt(match[1], 10);
      if (!isNaN(parsedNum)) {
        orderNumber = parsedNum;
      }
    }
  }

  const newQuote: SavedQuote = {
    id: 'quote-' + Date.now(),
    quoteCode: finalCode,
    month,
    orderNumber,
    customer: {
      ...params.customer,
      quoteCode: finalCode,
    },
    items: params.items,
    extraFee: params.extraFee,
    vatRate: params.vatRate,
    grandTotal: params.grandTotal,
    createdAt: new Date().toISOString(),
  };

  const updatedQuotes = [newQuote, ...quotes];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes));
  }

  // Tính mã số tiếp theo cho đơn hàng mới
  const nextOrderNumber = getNextOrderNumber(month);
  const nextCode = generateQuoteCode(month, nextOrderNumber);

  return { savedQuote: newQuote, nextCode };
}

/**
 * Xóa một đơn hàng đã lưu:
 * Sau khi xóa, số A tiếp theo sẽ tự động lùi về liền sau số lớn nhất còn lại trong tháng
 */
export function deleteQuoteFromStorage(id: string): { updatedQuotes: SavedQuote[]; nextOrderNumbers: Record<number, number> } {
  const quotes = getSavedQuotes();
  const updatedQuotes = quotes.filter((q) => q.id !== id);

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes));
  }

  // Tính toán lại số thứ tự tiếp theo cho cả 12 tháng
  const nextOrderNumbers: Record<number, number> = {};
  for (let m = 1; m <= 12; m++) {
    const inMonth = updatedQuotes.filter((q) => q.month === m);
    if (inMonth.length === 0) {
      nextOrderNumbers[m] = 1;
    } else {
      nextOrderNumbers[m] = Math.max(...inMonth.map((q) => q.orderNumber || 0)) + 1;
    }
  }

  return { updatedQuotes, nextOrderNumbers };
}
