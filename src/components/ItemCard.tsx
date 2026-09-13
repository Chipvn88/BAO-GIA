'use client';

import React from 'react';
import { QuoteItem } from '@/types/quote';
import { CATALOG_LIST, getCatalogItem } from '@/constants/pricing';
import { formatVND } from '@/utils/format';
import { Trash2, Copy, Ruler, Layers, Hash, Info } from 'lucide-react';

// Bảng màu sắc nhận diện riêng biệt cho từng hạng mục công trình
export const ITEM_COLOR_THEMES = [
  {
    name: 'blue',
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    border: 'border-l-4 border-l-blue-500',
  },
  {
    name: 'emerald',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    border: 'border-l-4 border-l-emerald-500',
  },
  {
    name: 'purple',
    text: 'text-purple-600 dark:text-purple-400',
    badge: 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
    border: 'border-l-4 border-l-purple-500',
  },
  {
    name: 'amber',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    border: 'border-l-4 border-l-amber-500',
  },
  {
    name: 'rose',
    text: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    border: 'border-l-4 border-l-rose-500',
  },
  {
    name: 'cyan',
    text: 'text-cyan-600 dark:text-cyan-400',
    badge: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800',
    border: 'border-l-4 border-l-cyan-500',
  },
  {
    name: 'indigo',
    text: 'text-indigo-600 dark:text-indigo-400',
    badge: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800',
    border: 'border-l-4 border-l-indigo-500',
  },
  {
    name: 'fuchsia',
    text: 'text-fuchsia-600 dark:text-fuchsia-400',
    badge: 'bg-fuchsia-100 dark:bg-fuchsia-950/80 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800',
    border: 'border-l-4 border-l-fuchsia-500',
  },
  {
    name: 'orange',
    text: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800',
    border: 'border-l-4 border-l-orange-500',
  },
  {
    name: 'teal',
    text: 'text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800',
    border: 'border-l-4 border-l-teal-500',
  },
  {
    name: 'red',
    text: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800',
    border: 'border-l-4 border-l-red-500',
  },
  {
    name: 'violet',
    text: 'text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800',
    border: 'border-l-4 border-l-violet-500',
  },
];

interface ItemCardProps {
  item: QuoteItem;
  index: number;
  totalItems: number;
  onUpdate: (id: string, field: keyof QuoteItem, value: string | number) => void;
  onRemove: (id: string) => void;
  onDuplicate: (item: QuoteItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  index,
  totalItems,
  onUpdate,
  onRemove,
  onDuplicate,
}) => {
  const cat = getCatalogItem(item.type);
  const theme = ITEM_COLOR_THEMES[index % ITEM_COLOR_THEMES.length];

  // Calculate live formula & total
  let formulaText = '';
  let lineTotal = 0;

  if (cat.kind === 'led') {
    lineTotal = item.qty * cat.price;
    formulaText = `${item.qty} bóng × ${formatVND(cat.price)}`;
  } else if (cat.kind === 'fixed') {
    lineTotal = item.qty * cat.price;
    formulaText = `${item.qty} ${cat.unit} × ${formatVND(cat.price)}`;
  } else {
    const area = ((item.w || 0) / 100) * ((item.h || 0) / 100) * (item.faces || 1) * (item.qty || 1);
    lineTotal = area * cat.price;
    formulaText = `${area.toFixed(2)} m² × ${formatVND(cat.price)}`;
  }

  return (
    <div className={`bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 ${theme.border} shadow-sm space-y-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group`}>
      {/* Top row: STT & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-lg ${theme.badge} text-xs font-black flex items-center justify-center shadow-xs`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-xs md:text-sm font-extrabold uppercase tracking-wide ${theme.text}`}>
            HẠNG MỤC {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
            {cat.kind === 'area' ? 'Tính theo m²' : cat.kind === 'led' ? 'Theo số bóng' : 'Trọn gói'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onDuplicate(item)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
            title="Nhân bản hạng mục này"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {totalItems > 1 && (
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
              title="Xóa hạng mục này"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Select Category */}
      <div>
        <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
          Loại biển quảng cáo / dịch vụ (41 hạng mục)
        </label>
        <select
          value={item.type}
          onChange={(e) => onUpdate(item.id, 'type', e.target.value)}
          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-750 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
        >
          {CATALOG_LIST.map((c, idx) => (
            <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
              {idx + 1}. {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic input fields */}
      {cat.kind === 'area' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium flex items-center gap-1">
              <Ruler className="w-3 h-3 text-slate-400" /> Ngang (Cm)
            </label>
            <input
              type="number"
              step="1"
              min="1"
              placeholder="300"
              value={item.w || ''}
              onChange={(e) => onUpdate(item.id, 'w', parseFloat(e.target.value) || 0)}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium flex items-center gap-1">
              <Ruler className="w-3 h-3 text-slate-400 rotate-90" /> Cao (Cm)
            </label>
            <input
              type="number"
              step="1"
              min="1"
              placeholder="120"
              value={item.h || ''}
              onChange={(e) => onUpdate(item.id, 'h', parseFloat(e.target.value) || 0)}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-400" /> Số mặt
            </label>
            <input
              type="number"
              min="1"
              value={item.faces}
              onChange={(e) => onUpdate(item.id, 'faces', parseInt(e.target.value) || 1)}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium flex items-center gap-1">
              <Hash className="w-3 h-3 text-slate-400" /> Số lượng
            </label>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => onUpdate(item.id, 'qty', parseInt(e.target.value) || 1)}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
            />
          </div>
        </div>
      )}

      {cat.kind === 'led' && (
        <div className="text-xs">
          <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium flex items-center gap-1">
            <Hash className="w-3 h-3 text-slate-400" /> Số lượng bóng LED ruồi
          </label>
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => onUpdate(item.id, 'qty', parseInt(e.target.value) || 1)}
            placeholder="Nhập số bóng (ví dụ: 1000)"
            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
          />
        </div>
      )}

      {cat.kind === 'fixed' && (
        <div className="text-xs">
          <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium flex items-center gap-1">
            <Hash className="w-3 h-3 text-slate-400" /> Số lượng ({cat.unit})
          </label>
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => onUpdate(item.id, 'qty', parseInt(e.target.value) || 1)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
          />
        </div>
      )}

      {/* Quy cách phụ / Ghi chú */}
      <div className="text-xs">
        <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium flex items-center gap-1">
          <Info className="w-3 h-3 text-slate-400" /> Quy cách phụ / Ghi chú chi tiết (nếu có)
        </label>
        <input
          type="text"
          value={item.note || ''}
          onChange={(e) => onUpdate(item.id, 'note', e.target.value)}
          placeholder="Ví dụ: Khung sắt mạ kẽm V3, viền nhôm V, bảo hành 12 tháng"
          className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Bottom Formula & Line Total */}
      <div className="flex justify-between items-center text-xs pt-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 -mx-4 md:-mx-5 -mb-4 md:-mb-5 px-4 md:px-5 py-2.5 rounded-b-2xl">
        <span className="text-slate-500 dark:text-slate-400 font-medium">
          Công thức: <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{formulaText}</span>
        </span>
        <div className="text-right">
          <span className="text-[11px] text-slate-400 mr-1.5">Thành tiền:</span>
          <span className="font-bold text-slate-900 dark:text-white text-sm">{formatVND(lineTotal)}</span>
        </div>
      </div>
    </div>
  );
};
