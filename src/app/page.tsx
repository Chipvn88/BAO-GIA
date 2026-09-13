'use client';

import dynamic from 'next/dynamic';

const QuotationApp = dynamic(() => import('@/components/QuotationApp'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-800"></div>
        <p className="text-sm text-slate-600 font-medium">
          Đang tải Hệ thống Báo Giá Quảng Cáo & In Đình Cương...
        </p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  return <QuotationApp />;
}
