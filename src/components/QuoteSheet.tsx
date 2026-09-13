'use client';

import React from 'react';
import { CustomerInfo, CalculatedItem, QuoteSummary } from '@/types/quote';
import { formatVND } from '@/utils/format';
import { COMPANY_INFO } from '@/constants/pricing';
import { QR_CODE_DATA_URL } from '@/constants/qrCode';

interface QuoteSheetProps {
  customer: CustomerInfo;
  items: CalculatedItem[];
  summary: QuoteSummary;
}

export const QuoteSheet: React.FC<QuoteSheetProps> = ({ customer, items, summary }) => {
  return (
    <div
      id="quoteSheet"
      className="sheet bg-white print:!bg-white print:!text-black p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200/90 print:!border-none print:!shadow-none print:!p-0 print:!m-0 print:!rounded-none flex flex-col justify-between min-h-[860px] print:!min-h-0 text-slate-800"
    >
      <div>
        {/* Header Công ty & Tiêu đề Báo giá */}
        <div className="text-center border-b border-slate-300 pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-red-600 tracking-wide uppercase">
            {COMPANY_INFO.name}
          </h2>
          <p className="text-[13px] font-bold uppercase text-slate-800 mt-1">
            {COMPANY_INFO.address}
          </p>
          <p className="text-[13px] font-bold text-slate-800">
            HOTLINE: {COMPANY_INFO.hotline}
          </p>

          <div className="mt-4 pt-2">
            <h3 className="text-2xl sm:text-3xl font-black text-[#6600CC] tracking-wider uppercase">
              BẢNG BÁO GIÁ
            </h3>
            <p className="text-[13pt] font-bold text-slate-700 mt-1">
              {customer.quoteCode || 'Số: T9-0001'}
            </p>
          </div>
        </div>

        {/* Thông tin Khách hàng & Công trình */}
        <div className="grid grid-cols-2 py-3 border-b border-slate-300 text-slate-900 text-[13pt] font-bold gap-2">
          <div>
            <p>
              Khách hàng: <span className="font-bold text-slate-900">{customer.name || '...........................................'}</span>
            </p>
            <p className="mt-1">
              Điện thoại: <span className="font-bold text-slate-900">{customer.phone || '...........................................'}</span>
            </p>
          </div>
          <div className="text-right">
            <p>
              Ngày lập: <span className="font-bold text-slate-900">{customer.date}</span>
            </p>
            <p className="mt-1">
              Địa chỉ: <span className="font-bold text-slate-900">{customer.address || 'TP. Hải Phòng'}</span>
            </p>
          </div>
        </div>

        {/* Bảng chi tiết hạng mục */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-[12pt] border border-slate-400 border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a] text-white font-bold">
                <th className="p-2 border border-slate-400 text-center w-10">STT</th>
                <th className="p-2 border border-slate-400 text-left">HẠNG MỤC / QUY CÁCH</th>
                <th className="p-2 border border-slate-400 text-center w-14">SL</th>
                <th className="p-2 border border-slate-400 text-right w-24">KL</th>
                <th className="p-2 border border-slate-400 text-right w-28">ĐƠN GIÁ</th>
                <th className="p-2 border border-slate-400 text-right w-32">THÀNH TIỀN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-2 border border-slate-400 text-center font-bold">
                    {item.stt}
                  </td>
                  <td className="p-2 border border-slate-400">
                    <div className="font-black text-slate-900 text-[13pt] leading-snug">
                      {item.name}
                    </div>
                    <div className="font-arial-12-bold text-slate-700 mt-0.5 leading-snug">
                      {item.spec}
                    </div>
                  </td>
                  <td className="p-2 border border-slate-400 text-center font-bold">
                    {item.qty}
                  </td>
                  <td className="p-2 border border-slate-400 text-right font-bold">
                    {item.kl}
                  </td>
                  <td className="p-2 border border-slate-400 text-right">
                    {formatVND(item.unitPrice)}
                  </td>
                  <td className="p-2 border border-slate-400 text-right font-black text-slate-900">
                    {formatVND(item.totalPrice)}
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                    Chưa có hạng mục nào được chọn. Vui lòng thêm hạng mục ở bảng bên trái.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Thông tin thanh toán & Tổng kết tài chính */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mt-4 text-[12pt] gap-4 pt-1">
          {/* Mã QR thanh toán chuyển khoản */}
          <div className="qr-container flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-xl border border-slate-300 bg-slate-50/60 print:bg-white print:border-slate-400 max-w-md">
            <img
              src={QR_CODE_DATA_URL}
              alt="Mã QR Chuyển khoản VietinBank"
              className="w-40 sm:w-44 h-auto object-contain rounded-xl border border-slate-200 print:border-slate-300 shadow-sm"
              style={{ width: '170px', height: 'auto' }}
            />
            <div className="text-left space-y-1">
              <p className="text-[13pt] font-black text-slate-900 leading-tight uppercase">
                NGUYEN DINH CUONG
              </p>
              <p className="text-[12pt] font-bold text-slate-800 leading-tight">
                Ngân Hàng VietinBank
              </p>
            </div>
          </div>

          {/* Bảng tổng kết tài chính */}
          <div className="w-80 space-y-1.5 text-right shrink-0">
            <div className="flex justify-between text-slate-700">
              <span>Cộng tiền hạng mục:</span>
              <span className="font-bold text-slate-900">{formatVND(summary.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Chi phí phụ / Lắp:</span>
              <span className="font-bold text-slate-900">{formatVND(summary.extraFee)}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Thuế VAT ({summary.vatRate > 0 ? `${summary.vatRate * 100}%` : '0%'}):</span>
              <span className="font-bold text-slate-900">
                {summary.vatRate > 0 ? formatVND(summary.vatAmount) : 'Chưa tính'}
              </span>
            </div>
            <div className="flex justify-between border-t-2 border-slate-800 pt-2 font-black text-[14pt] text-[#1e3a8a]">
              <span>TỔNG THANH TOÁN:</span>
              <span>{formatVND(summary.grandTotal)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold border-t border-dashed border-slate-300 pt-1.5">
              <span>Tạm ứng (Cọc 50%):</span>
              <span>{formatVND(summary.deposit)}</span>
            </div>
            <div className="flex justify-between text-slate-700 font-bold">
              <span>Còn lại sau nghiệm thu:</span>
              <span>{formatVND(summary.remain)}</span>
            </div>
          </div>
        </div>

        {/* Điều kiện thực hiện */}
        <div className="mt-6 space-y-1 border-t border-slate-200 pt-3">
          <p className="font-bold text-slate-900 text-[13pt] uppercase">
            ĐIỀU KIỆN THỰC HIỆN
          </p>
          <div className="font-arial-narrow-12 text-slate-800 space-y-1">
            <p>
              • Phạm vi, vật liệu, bảo hành và hiệu lực: Cần xác nhận trước khi chốt báo giá.
            </p>
            <p>
              • Dự kiến lắp đặt: Theo lịch hai bên thống nhất và xác nhận.
            </p>
            <p>
              • Gia công sau khi duyệt báo giá, thiết kế, vật liệu và nhận cọc 50%. Phát sinh ngoài phạm vi cần xác nhận riêng.
            </p>
          </div>
        </div>
      </div>

      {/* Phần chữ ký khách hàng & đơn vị */}
      <div className="grid grid-cols-2 text-center mt-10 pt-4 border-t border-slate-200">
        <div>
          <p className="font-bold uppercase text-slate-900 text-[13pt]">
            XÁC NHẬN CỦA KHÁCH HÀNG
          </p>
          <p className="font-arial-narrow-12 text-slate-700 mt-0.5">
            (Ký, ghi rõ họ tên)
          </p>
          <div className="h-24"></div>
        </div>
        <div>
          <p className="font-bold uppercase text-slate-900 text-[13pt]">
            ĐƠN VỊ BÁO GIÁ
          </p>
          <p className="font-arial-narrow-12 text-slate-700 mt-0.5">
            (Ký, ghi rõ họ tên & đóng dấu)
          </p>
          <div className="h-24"></div>
        </div>
      </div>
    </div>
  );
};
