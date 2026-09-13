'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CustomerInfo, QuoteItem, CalculatedItem, QuoteSummary, SavedQuote } from '@/types/quote';
import { CATALOG, getCatalogItem } from '@/constants/pricing';
import { formatCurrentDate, generateQuoteCode, getMonthFromDate, formatVND } from '@/utils/format';
import { getSavedQuotes, saveQuoteToStorage, deleteQuoteFromStorage, getNextOrderNumber } from '@/utils/quoteStorage';
import { Header } from '@/components/Header';
import { CustomerForm } from '@/components/CustomerForm';
import { ItemCard } from '@/components/ItemCard';
import { SummarySettings } from '@/components/SummarySettings';
import { QuoteSheet } from '@/components/QuoteSheet';
import { SavedQuotesModal } from '@/components/SavedQuotesModal';
import { PlusCircle, Eye, Edit3, ShieldCheck, Printer, FileText, CheckCircle2, Save } from 'lucide-react';
import { exportWordDoc } from '@/utils/exportWord';

export default function QuotationApp() {
  // Theme state: light or dark
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Customer state
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: 'TP. Hải Phòng',
    quoteCode: 'Số: T9-0001',
    date: '10/09/2026',
  });

  // Saved quotes state & modal
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);

  // Items state (đơn vị kích thước tính theo cm)
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: 'item-1',
      type: 'dan_chu_noi_l1',
      w: 300,
      h: 100,
      faces: 1,
      qty: 1,
      note: 'Chữ mica nổi chân viền formex',
    },
  ]);

  // Extra fees & VAT
  const [extraFee, setExtraFee] = useState<number>(0);
  const [vatRate, setVatRate] = useState<number>(0);

  // Mobile tab state
  const [activeMobileTab, setActiveMobileTab] = useState<'editor' | 'preview'>('editor');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Initialize theme, date, and saved quotes on mount
  useEffect(() => {
    const loaded = getSavedQuotes();
    setSavedQuotes(loaded);

    const now = new Date();
    const dateStr = formatCurrentDate(now);
    const m = getMonthFromDate(dateStr);
    const nextOrder = getNextOrderNumber(m);
    const initialCode = generateQuoteCode(m, nextOrder);

    setCustomer((prev) => ({
      ...prev,
      date: dateStr,
      quoteCode: initialCode,
    }));

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('dc_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Xử lý tự động chuyển về nền trắng sáng khi bấm In/Tải PDF để bản in không bao giờ bị đen nền
  useEffect(() => {
    const handleBeforePrint = () => {
      document.documentElement.classList.remove('dark');
    };
    const handleAfterPrint = () => {
      const currentTheme = localStorage.getItem('dc_theme') || theme;
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [theme]);

  // Toggle Dark/Light Theme
  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('dc_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      showToast('Đã bật chế độ Màn hình Tối');
    } else {
      document.documentElement.classList.remove('dark');
      showToast('Đã chuyển sang chế độ Màn hình Sáng');
    }
  };

  // Update customer field & tự động cập nhật mã báo giá nếu đổi ngày sang tháng khác
  const handleCustomerChange = (field: keyof CustomerInfo, value: string) => {
    setCustomer((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'date') {
        const m = getMonthFromDate(value);
        const nextOrder = getNextOrderNumber(m);
        updated.quoteCode = generateQuoteCode(m, nextOrder);
      }
      return updated;
    });
  };

  // Làm mới lại số hiệu theo quy chuẩn ngày tháng và danh sách đơn đã lưu
  const handleRefreshQuoteCode = () => {
    const m = getMonthFromDate(customer.date);
    const nextOrder = getNextOrderNumber(m);
    const newCode = generateQuoteCode(m, nextOrder);
    setCustomer((prev) => ({
      ...prev,
      quoteCode: newCode,
    }));
    showToast(`Đã làm mới số hiệu: ${newCode}`);
  };

  // Lưu đơn hàng vào hệ thống
  const handleSaveQuote = () => {
    const { savedQuote, nextCode } = saveQuoteToStorage({
      quoteCode: customer.quoteCode,
      customer,
      items,
      extraFee,
      vatRate,
      grandTotal: summary.grandTotal,
    });

    const updated = getSavedQuotes();
    setSavedQuotes(updated);
    showToast(`Đã lưu đơn hàng "${savedQuote.quoteCode}" thành công!`);

    // Cập nhật số hiệu tiếp theo
    setCustomer((prev) => ({
      ...prev,
      quoteCode: nextCode,
    }));
  };

  // Xóa đơn hàng đã lưu (mã số A tiếp theo sẽ tự động lùi về)
  const handleDeleteQuote = (id: string, code: string) => {
    if (confirm(`Bạn có chắc muốn xóa đơn hàng "${code}"? Sau khi xóa, số hiệu tiếp theo sẽ tự động lùi về số liền sau đơn đã ghi gần nhất.`)) {
      deleteQuoteFromStorage(id);
      const updated = getSavedQuotes();
      setSavedQuotes(updated);

      const m = getMonthFromDate(customer.date);
      const nextOrder = getNextOrderNumber(m);
      const newNextCode = generateQuoteCode(m, nextOrder);

      setCustomer((prev) => ({
        ...prev,
        quoteCode: newNextCode,
      }));
      showToast(`Đã xóa đơn ${code}. Mã đơn tiếp theo là: ${newNextCode}`);
    }
  };

  // Nạp lại đơn hàng đã lưu
  const handleLoadQuote = (saved: SavedQuote) => {
    setCustomer(saved.customer);
    setItems(saved.items);
    setExtraFee(saved.extraFee);
    setVatRate(saved.vatRate);
    showToast(`Đã nạp lại đơn hàng: ${saved.quoteCode}`);
  };

  // Add new item
  const handleAddItem = () => {
    const newItem: QuoteItem = {
      id: 'item-' + Date.now(),
      type: 'bien_bat_l1',
      w: 300,
      h: 120,
      faces: 1,
      qty: 1,
    };
    setItems((prev) => [...prev, newItem]);
    showToast('Đã thêm hạng mục mới');
  };

  // Duplicate existing item
  const handleDuplicateItem = (itemToDup: QuoteItem) => {
    const newItem: QuoteItem = {
      ...itemToDup,
      id: 'item-' + Date.now(),
    };
    setItems((prev) => [...prev, newItem]);
    showToast('Đã nhân bản hạng mục');
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
    showToast('Đã xóa hạng mục');
  };

  // Update item field
  const handleUpdateItem = (id: string, field: keyof QuoteItem, value: string | number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  // Reset form / Tạo đơn mới
  const handleReset = () => {
    if (confirm('Bạn có chắc muốn làm mới toàn bộ bảng báo giá để tạo đơn mới?')) {
      const now = new Date();
      const dateStr = formatCurrentDate(now);
      const m = getMonthFromDate(dateStr);
      const nextOrder = getNextOrderNumber(m);
      const nextCode = generateQuoteCode(m, nextOrder);

      setCustomer({
        name: '',
        phone: '',
        address: 'TP. Hải Phòng',
        quoteCode: nextCode,
        date: dateStr,
      });
      setItems([
        {
          id: 'item-1',
          type: 'bien_bat_l1',
          w: 300,
          h: 120,
          faces: 1,
          qty: 1,
        },
      ]);
      setExtraFee(0);
      setVatRate(0);
      showToast(`Đã tạo đơn mới với mã: ${nextCode}`);
    }
  };

  // Load Presets
  const handleLoadPreset = (presetType: 'shop' | 'alu_led' | 'decal') => {
    if (presetType === 'shop') {
      setCustomer((prev) => ({
        ...prev,
        name: 'Cửa hàng Tạp Hóa & Tiện Ích',
        phone: '0988 123 456',
        address: 'Đường Lạch Tray, Ngô Quyền, Hải Phòng',
      }));
      setItems([
        { id: 'p1', type: 'bien_bat_ghi_l1', w: 450, h: 150, faces: 1, qty: 1, note: 'Khung sắt mạ kẽm V3 dày 1.2 ly' },
        { id: 'p2', type: 'vay_co_den', w: 60, h: 80, faces: 2, qty: 1, note: 'Biển vẫy LED tròn 60cm 2 mặt' },
        { id: 'p3', type: 'dan_chu_noi_l2', w: 100, h: 100, faces: 1, qty: 1, note: 'Dán chữ kính cửa ra vào' },
      ]);
      setExtraFee(150000);
      setVatRate(0);
      showToast('Đã tải mẫu: Cửa hàng bán lẻ');
    } else if (presetType === 'alu_led') {
      setCustomer((prev) => ({
        ...prev,
        name: 'Công Ty Cổ Phần Công Nghệ Minh Phát',
        phone: '0904 888 999',
        address: 'Khu Đô Thị Vinhomes Marina, Cầu Rào 2, Hải Phòng',
      }));
      setItems([
        { id: 'p1', type: 'alu_led', w: 600, h: 180, faces: 1, qty: 1, note: 'Mặt alu ngoài trời Alcorest 0.10, chữ mica nổi cắm LED sáng mặt' },
        { id: 'p2', type: 'hut_noi_80', w: 80, h: 80, faces: 2, qty: 1, note: 'Biển hút nổi mica vuông 80x80cm' },
        { id: 'p3', type: 'thao_lap_l2', w: 100, h: 100, faces: 1, qty: 1, note: 'Tháo dỡ biển cũ và lắp biển mới tầng 2' },
      ]);
      setExtraFee(300000);
      setVatRate(0.08);
      showToast('Đã tải mẫu: Biển Alu LED cao cấp');
    } else if (presetType === 'decal') {
      setCustomer((prev) => ({
        ...prev,
        name: 'Phòng Khám Nha Khoa Quốc Tế',
        phone: '0936 777 666',
        address: 'Đường Tô Hiệu, Lê Chân, Hải Phòng',
      }));
      setItems([
        { id: 'p1', type: 'decal_bong_tc', w: 320, h: 210, faces: 1, qty: 1, note: 'In decal PP ngoài trời cán bóng chống nước' },
        { id: 'p2', type: 'decal_mo_tc', w: 500, h: 120, faces: 1, qty: 1, note: 'Decal mờ dán kính văn phòng cắt line chỉ' },
      ]);
      setExtraFee(100000);
      setVatRate(0);
      showToast('Đã tải mẫu: Decal văn phòng');
    }
  };

  // Calculate items and totals
  const { calculatedItems, summary } = useMemo(() => {
    let subtotal = 0;

    const calcItems: CalculatedItem[] = items.map((item, idx) => {
      const cat = getCatalogItem(item.type);
      let kl = '';
      let lineTotal = 0;
      let spec = '';

      if (cat.kind === 'led') {
        lineTotal = (item.qty || 1) * cat.price;
        kl = `${item.qty || 1} bóng`;
        spec = 'Bóng LED ruồi cắm mặt';
      } else if (cat.kind === 'fixed') {
        lineTotal = (item.qty || 1) * cat.price;
        kl = `${item.qty || 1} ${cat.unit}`;
        spec = 'Gói dịch vụ / Biển hoàn thiện';
      } else {
        const area = ((item.w || 0) / 100) * ((item.h || 0) / 100) * (item.faces || 1) * (item.qty || 1);
        lineTotal = area * cat.price;
        kl = `${area.toFixed(2)} m²`;
        const wM = Number(((item.w || 0) / 100).toFixed(2));
        const hM = Number(((item.h || 0) / 100).toFixed(2));
        spec = `${wM} × ${hM} m (${item.faces || 1} mặt)`;
      }

      if (item.note && item.note.trim()) {
        spec += ` — ${item.note.trim()}`;
      }

      subtotal += lineTotal;

      return {
        stt: idx + 1,
        id: item.id,
        name: cat.name,
        spec,
        unit: cat.unit,
        qty: item.qty || 1,
        kl,
        unitPrice: cat.price,
        totalPrice: lineTotal,
      };
    });

    const ex = Number(extraFee) || 0;
    const vatAmount = (subtotal + ex) * (vatRate || 0);
    const grandTotal = subtotal + ex + vatAmount;
    const deposit = grandTotal * 0.5;
    const remain = grandTotal - deposit;

    const summaryResult: QuoteSummary = {
      subtotal,
      extraFee: ex,
      vatRate,
      vatAmount,
      grandTotal,
      deposit,
      remain,
    };

    return {
      calculatedItems: calcItems,
      summary: summaryResult,
    };
  }, [items, extraFee, vatRate]);

  return (
    <div className="min-h-screen bg-slate-100/90 dark:bg-[#070b14] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200" suppressHydrationWarning>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm border border-slate-700/50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Quản lý đơn hàng đã lưu */}
      <SavedQuotesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedQuotes={savedQuotes}
        onLoadQuote={handleLoadQuote}
        onDeleteQuote={handleDeleteQuote}
      />

      {/* Top Navigation & Actions Bar */}
      <Header
        customerName={customer.name}
        theme={theme}
        savedCount={savedQuotes.length}
        onToggleTheme={handleToggleTheme}
        onReset={handleReset}
        onLoadPreset={handleLoadPreset}
        onSaveQuote={handleSaveQuote}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-center gap-2 sticky top-[61px] z-40 no-print transition-colors">
        <button
          onClick={() => setActiveMobileTab('editor')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            activeMobileTab === 'editor'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          1. Nhập liệu ({items.length} mục)
        </button>
        <button
          onClick={() => setActiveMobileTab('preview')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            activeMobileTab === 'preview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          2. Xem bản A4 ({formatVND(summary.grandTotal)})
        </button>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        {/* Left Column: Form & Bóc tách hạng mục */}
        <section
          className={`lg:col-span-5 space-y-4 no-print ${
            activeMobileTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Customer Info Form */}
          <CustomerForm
            customer={customer}
            onChange={handleCustomerChange}
            onRefreshCode={handleRefreshQuoteCode}
          />

          {/* Items Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                02. Bóc tách hạng mục công trình
              </h2>
              <span className="text-xs bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                {items.length} hạng mục
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  totalItems={items.length}
                  onUpdate={handleUpdateItem}
                  onRemove={handleRemoveItem}
                  onDuplicate={handleDuplicateItem}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddItem}
              className="w-full py-3.5 border-2 border-dashed border-emerald-500/80 dark:border-emerald-600/60 bg-emerald-50/70 dark:bg-emerald-950/30 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 active:scale-[0.99] text-emerald-800 dark:text-emerald-300 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Thêm hạng mục thi công</span>
            </button>
          </div>

          {/* Phụ phí & VAT */}
          <SummarySettings
            extraFee={extraFee}
            vatRate={vatRate}
            onChangeExtraFee={setExtraFee}
            onChangeVatRate={setVatRate}
          />

          {/* Quick Summary Floating Alert */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 dark:from-slate-900 dark:to-blue-950 text-white p-4 rounded-2xl shadow-lg border border-transparent dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-200 dark:text-blue-300 uppercase font-medium">Tổng tiền dự kiến</span>
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded">
                  {customer.quoteCode}
                </span>
              </div>
              <p className="text-xl font-black text-amber-300 mt-0.5">{formatVND(summary.grandTotal)}</p>
              <p className="text-[11px] text-blue-300 dark:text-slate-300">Cọc 50%: {formatVND(summary.deposit)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveQuote}
                className="bg-amber-500 hover:bg-amber-400 text-blue-950 p-2.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow transition cursor-pointer"
                title="Lưu đơn này vào danh sách"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Lưu đơn</span>
              </button>
              <button
                onClick={() => exportWordDoc('quoteSheet', customer.name || 'DinhCuong')}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 shadow transition cursor-pointer"
                title="Lưu file Word"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Tải Word</span>
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') window.print();
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 shadow transition cursor-pointer"
                title="In hoặc tải PDF"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">In PDF</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Live A4 Document Preview */}
        <section
          className={`lg:col-span-7 print-sheet-section ${
            activeMobileTab === 'preview' ? 'block' : 'hidden lg:block'
          } print:!block print:!w-full print:!max-w-full print:!m-0 print:!p-0`}
        >
          <div className="sticky top-20 space-y-3 print:!static print:!space-y-0 print:!p-0 print:!m-0">
            <div className="no-print flex items-center justify-between px-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Bản xem trước A4 (Thời gian thực)</span>
                <span className="font-mono font-bold text-blue-700 dark:text-blue-400 ml-1">
                  [{customer.quoteCode}]
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">Khổ chuẩn A4 Portrait (210 × 297 mm)</span>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') window.print();
                  }}
                  className="text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> In ngay
                </button>
              </div>
            </div>

            {/* The printable A4 Sheet */}
            <QuoteSheet
              customer={customer}
              items={calculatedItems}
              summary={summary}
            />

            <div className="no-print text-center text-xs text-slate-400 dark:text-slate-500 py-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>Định dạng tuân thủ quy chuẩn văn bản của Quảng Cáo & In Đình Cương (Hải Phòng)</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
