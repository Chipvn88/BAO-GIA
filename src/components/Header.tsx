'use client';

import React from 'react';
import { FileText, Printer, Sparkles, RefreshCw, Sun, Moon, Save, FolderArchive } from 'lucide-react';
import { exportWordDoc } from '@/utils/exportWord';

interface HeaderProps {
  customerName: string;
  theme: 'light' | 'dark';
  savedCount: number;
  onToggleTheme: () => void;
  onReset: () => void;
  onLoadPreset: (presetType: 'shop' | 'alu_led' | 'decal') => void;
  onSaveQuote: () => void;
  onOpenSavedModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  customerName,
  theme,
  savedCount,
  onToggleTheme,
  onReset,
  onLoadPreset,
  onSaveQuote,
  onOpenSavedModal,
}) => {
  const handleExportWord = () => {
    exportWordDoc('quoteSheet', customerName || 'DinhCuong');
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <header className="bg-[#1e3a8a] dark:bg-[#0f1d42] text-white shadow-lg relative lg:sticky lg:top-0 z-50 no-print border-b border-blue-900/50 dark:border-blue-950 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-wrap justify-between items-center gap-2.5 sm:gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600/60 dark:bg-blue-700/50 border border-blue-400/40 flex items-center justify-center text-lg sm:text-xl font-black text-amber-300 shadow-inner shrink-0">
            ĐC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm sm:text-base md:text-lg tracking-wide uppercase">
                QUẢNG CÁO & IN ĐÌNH CƯƠNG
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-blue-950 rounded-full">
                41 Hạng Mục Niêm Yết
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-blue-200 dark:text-blue-300/80">
              Hệ thống bóc tách tự động · Ngã 3 Quán Ngái, xã Tân Kỳ, TP. Hải Phòng · 0934 066 099
            </p>
          </div>
        </div>

        {/* Action Buttons & Theme Switch */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Buttons */}
          <div className="hidden xl:flex items-center gap-1 bg-blue-900/60 dark:bg-slate-900/70 p-1 rounded-lg border border-blue-700/50 dark:border-slate-800 text-xs">
            <span className="text-blue-300 px-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Mẫu:
            </span>
            <button
              onClick={() => onLoadPreset('shop')}
              className="px-2 py-1 rounded bg-blue-800 hover:bg-blue-700 text-blue-100 transition cursor-pointer"
              title="Cửa hàng thông dụng"
            >
              Cửa hàng
            </button>
            <button
              onClick={() => onLoadPreset('alu_led')}
              className="px-2 py-1 rounded bg-blue-800 hover:bg-blue-700 text-blue-100 transition cursor-pointer"
              title="Biển Alu Chữ Nổi + LED"
            >
              Biển Alu LED
            </button>
            <button
              onClick={() => onLoadPreset('decal')}
              className="px-2 py-1 rounded bg-blue-800 hover:bg-blue-700 text-blue-100 transition cursor-pointer"
              title="In Decal cán bóng"
            >
              Decal
            </button>
          </div>

          {/* Công tắc Bật/Tắt Giao diện Tối/Sáng */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-400/30 dark:border-slate-700 bg-blue-900/60 dark:bg-slate-800/90 hover:bg-blue-800 dark:hover:bg-slate-700 transition cursor-pointer shadow-sm text-xs font-semibold"
            title={theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
            aria-label="Chuyển đổi giao diện Tối/Sáng"
          >
            {theme === 'dark' ? (
              <>
                <Moon className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="text-slate-200">Giao diện: <b>Tối</b></span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="text-blue-100">Giao diện: <b>Sáng</b></span>
              </>
            )}
            {/* Pill Toggle Switch Indicator */}
            <span
              className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors ${
                theme === 'dark' ? 'bg-indigo-600 justify-end' : 'bg-slate-300/40 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform"></span>
            </span>
          </button>

          {/* Nút Đơn đã lưu (modal) */}
          <button
            type="button"
            onClick={onOpenSavedModal}
            className="px-3 py-1.5 bg-blue-900/80 dark:bg-slate-800 hover:bg-blue-800 dark:hover:bg-slate-700 text-blue-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-blue-700/50 dark:border-slate-700 transition cursor-pointer shadow-sm"
            title="Xem danh sách các đơn hàng đã lưu trên website"
          >
            <FolderArchive className="w-3.5 h-3.5 text-amber-300" />
            <span>Đơn đã lưu</span>
            <span className="ml-0.5 px-1.5 py-0.2 bg-amber-400 text-blue-950 rounded-full font-bold text-[10px]">
              {savedCount}
            </span>
          </button>

          {/* Nút Lưu đơn hàng */}
          <button
            type="button"
            onClick={onSaveQuote}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-blue-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer border border-amber-300/50"
            title="Lưu đơn hàng này vào Website và sinh mã tự động cho đơn tiếp theo"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Lưu đơn này</span>
          </button>

          {/* Làm mới */}
          <button
            onClick={onReset}
            className="px-2.5 py-2 bg-blue-900/80 dark:bg-slate-800 hover:bg-blue-800 dark:hover:bg-slate-700 text-blue-200 rounded-xl text-xs font-medium flex items-center gap-1 border border-blue-700/40 dark:border-slate-700 transition cursor-pointer"
            title="Làm mới form nhập liệu"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>

          {/* Export Word */}
          <button
            onClick={handleExportWord}
            className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl shadow-sm text-xs md:text-sm flex items-center gap-1.5 transition border border-blue-400/30 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-100" />
            <span><span className="hidden sm:inline">Mục 1: </span>Lưu & Tải Word</span>
          </button>

          {/* Print / PDF */}
          <button
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl shadow-sm text-xs md:text-sm flex items-center gap-1.5 transition border border-emerald-400/30 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-100" />
            <span><span className="hidden sm:inline">Mục 2: </span>Tải PDF / In</span>
          </button>
        </div>
      </div>
    </header>
  );
};
