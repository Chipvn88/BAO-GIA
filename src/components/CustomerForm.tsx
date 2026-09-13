'use client';

import React from 'react';
import { CustomerInfo } from '@/types/quote';
import { User, Phone, MapPin, Calendar, Hash, RefreshCw } from 'lucide-react';

interface CustomerFormProps {
  customer: CustomerInfo;
  onChange: (field: keyof CustomerInfo, value: string) => void;
  onRefreshCode?: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onChange, onRefreshCode }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          01. Thông tin khách hàng & Công trình
        </h2>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Bắt buộc</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
        <div>
          <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Tên khách hàng / Đơn vị
          </label>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Ví dụ: Anh Tuấn - Cửa Hàng Điện Máy"
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-slate-50/50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800"
          />
        </div>

        <div>
          <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Số điện thoại liên hệ
          </label>
          <input
            type="text"
            value={customer.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="Ví dụ: 0912 345 678"
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-slate-50/50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Địa chỉ thi công / lắp đặt
          </label>
          <input
            type="text"
            value={customer.address}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="Ví dụ: Số 125 Đường Trần Nguyên Hãn, Lê Chân, Hải Phòng"
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-slate-50/50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800"
          />
        </div>

        <div>
          <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Ngày lập báo giá
          </label>
          <input
            type="text"
            value={customer.date}
            onChange={(e) => onChange('date', e.target.value)}
            placeholder="DD/MM/YYYY"
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-slate-50/50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800"
          />
        </div>

        <div>
          <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Số hiệu báo giá
            </span>
            <span className="text-[10px] font-mono font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/50 dark:border-blue-900/50">
              Cố định: Số: T-000A
            </span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={customer.quoteCode}
              onChange={(e) => {
                let val = e.target.value;
                if (!val.startsWith('Số: ')) {
                  const cleaned = val.replace(/^Số:?\s*/i, '');
                  val = 'Số: ' + cleaned;
                }
                onChange('quoteCode', val);
              }}
              placeholder="Số: T9-0001"
              className="w-full border border-slate-200 dark:border-slate-700 rounded-xl pl-3 pr-9 py-2 text-sm font-bold font-mono text-blue-900 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-slate-50/50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800"
            />
            {onRefreshCode && (
              <button
                type="button"
                onClick={onRefreshCode}
                title="Lấy lại số chuẩn tự động theo tháng và đơn đã lưu"
                className="absolute right-2 p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 rounded-lg transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
