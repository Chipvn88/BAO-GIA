'use client';

import React from 'react';
import { DollarSign, Percent } from 'lucide-react';

interface SummarySettingsProps {
  extraFee: number;
  vatRate: number;
  onChangeExtraFee: (fee: number) => void;
  onChangeVatRate: (rate: number) => void;
}

export const SummarySettings: React.FC<SummarySettingsProps> = ({
  extraFee,
  vatRate,
  onChangeExtraFee,
  onChangeVatRate,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          03. Chi phí phụ & Thuế VAT
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        <div>
          <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Chi phí phụ / Thi công lắp đặt (đ)
          </label>
          <input
            type="number"
            step="50000"
            min="0"
            value={extraFee}
            onChange={(e) => onChangeExtraFee(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-slate-50/50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-750"
          />
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Phí vận chuyển, nhân công lắp cao, giàn giáo...</p>
        </div>

        <div>
          <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Thuế giá trị gia tăng (VAT)
          </label>
          <select
            value={vatRate}
            onChange={(e) => onChangeVatRate(parseFloat(e.target.value) || 0)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-slate-50/50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-750"
          >
            <option value="0" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">Không tính thuế (0%)</option>
            <option value="0.08" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">Thuế VAT 8%</option>
            <option value="0.10" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">Thuế VAT 10%</option>
          </select>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Tự động cộng vào tổng thanh toán</p>
        </div>
      </div>
    </div>
  );
};
