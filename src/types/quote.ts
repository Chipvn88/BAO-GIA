export type ItemKind = 'area' | 'led' | 'fixed';

export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  kind: ItemKind;
  description?: string;
}

export interface QuoteItem {
  id: string;
  type: string;
  w: number;
  h: number;
  faces: number;
  qty: number;
  note?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  quoteCode: string;
  date: string;
}

export interface CalculatedItem {
  stt: number;
  id: string;
  name: string;
  spec: string;
  unit: string;
  qty: number;
  kl: string;
  unitPrice: number;
  totalPrice: number;
}

export interface QuoteSummary {
  subtotal: number;
  extraFee: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
  deposit: number;
  remain: number;
}

export interface SavedQuote {
  id: string;
  quoteCode: string;
  month: number;
  orderNumber: number;
  customer: CustomerInfo;
  items: QuoteItem[];
  extraFee: number;
  vatRate: number;
  grandTotal: number;
  createdAt: string;
}
