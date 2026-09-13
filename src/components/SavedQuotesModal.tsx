'use client';

import React from 'react';
import { SavedQuote } from '@/types/quote';
import { formatVND } from '@/utils/format';
import { X, Trash2, FolderOpen, Calendar, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';

interface SavedQuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedQuotes: SavedQuote[];
  onLoadQuote: (quote: SavedQuote) => void;
  onDeleteQuote: (id: string, quoteCode: string) => void;
}

export const SavedQuotesModal: React.FC<SavedQuotesModalProps> = ({
  isOpen,
  onClose,
  savedQuotes,
  onLoadQuote,
  onDeleteQuote,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              Danh sách đơn hàng đã lưu trên Website ({savedQuotes.length} đơn)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Mã số được đánh tự động theo tháng và số thứ tự A (ví dụ: Số: T9-0001)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body list */}
        <div className="p-6 overflow-y-auto space-y-3 flex-grow divide-y divide-slate-100 dark:divide-slate-800">
          {savedQuotes.length === 0 ? (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500 space-y-2">
              <AlertCircle className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium">Chưa có đơn hàng nào được lưu trên Website.</p>
              <p className="text-xs">
                Sau khi soạn báo giá, bạn hãy bấm nút <b>"Lưu đơn này"</b> để lưu và cấp mã tự động.
              </p>
            </div>
          ) : (
            savedQuotes.map((q) => (
              <div
                key={q.id}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-850 p-3 rounded-xl transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-200/60 dark:border-blue-800/60">
                      {q.quoteCode}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {q.customer.name || '(Chưa nhập tên khách hàng)'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {q.customer.date}
                    </span>
                    {q.customer.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> {q.customer.phone}
                      </span>
                    )}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Tổng tiền: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{formatVND(q.grandTotal)}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({q.items?.length || 0} hạng mục)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      onLoadQuote(q);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                    title="Nạp lại đơn hàng này vào form để chỉnh sửa hoặc in"
                  >
                    <FolderOpen className="w-3.5 h-3.5" /> Mở lại đơn
                  </button>
                  <button
                    onClick={() => onDeleteQuote(q.id, q.quoteCode)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
                    title="Xóa đơn hàng này khỏi bộ nhớ (số hiệu sau sẽ được tự động lùi lại)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>* Khi xóa đơn hàng, mã đơn tiếp theo sẽ tự động lùi về số liền sau đơn còn lại gần nhất.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl font-medium transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
