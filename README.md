# Hệ Thống Báo Giá & Bóc Tách Khối Lượng Tự Động
### Quảng Cáo & In Đình Cương (Hải Phòng)

> **Website chính thức:** [https://dichvu.shop](https://dichvu.shop)  
> **Hotline hỗ trợ:** 0934 066 099  
> **Địa chỉ:** Ngã 3 Quán Ngái, xã Tân Kỳ, TP. Hải Phòng

---

## 📖 Giới thiệu dự án

**Hệ thống Báo Giá & Bóc Tách Khối Lượng Tự Động** là ứng dụng web chuyên dụng dành cho xưởng **Quảng Cáo & In Đình Cương**, giúp tự động hóa toàn bộ quy trình tính toán, lên báo giá, quản lý đơn hàng và xuất bản in báo giá khổ chuẩn A4 cho khách hàng.

Ứng dụng giúp tiết kiệm thời gian báo giá, tính toán chính xác kích thước, mét vuông (m²), phụ phí và chiết khấu, đồng thời hỗ trợ xuất nhanh ra file Word hoặc in ấn PDF chuyên nghiệp.

---

## ✨ Tính năng nổi bật

### 1. Danh mục 41 hạng mục niêm yết chuẩn xưởng
- Tích hợp sẵn **41 hạng mục thi công quảng cáo** phổ biến:
  - **Biển hiệu tấm lớn:** Biển Alu chữ nổi, Biển bạt Hiflex khung sắt, Biển hộp đèn mica hút nổi, Hộp đèn bạt 3M/không gân.
  - **Chữ nổi cao cấp:** Chữ mica uốn nổi chân formex, Chữ inox vàng gương/trắng gương, Chữ nhôm hàn quốc có gờ/không gờ.
  - **Đèn LED quảng cáo:** Biển LED ruồi cắm mặt, LED ma trận đơn sắc/full màu P10, LED hắt chân chữ, Module LED thanh 3 bóng.
  - **In ấn kỹ thuật số:** In bạt hiflex chất lượng cao, In decal PP ngoài trời cán bóng/cán mờ, In decal sữa, Decal mờ dán kính văn phòng, Standee chân chữ X/cuốn nhôm.
  - **Thi công & tháo dỡ:** Tháo dỡ biển cũ, lắp đặt giàn giáo tầng cao, bảo trì sửa chữa thay nguồn LED.

### 2. Tính toán khối lượng và chi phí tự động
- Tự động quy đổi kích thước thực tế (Ngang × Cao tính bằng cm) thành diện tích **mét vuông (m²)**.
- Hỗ trợ tính theo: **Diện tích (m²)**, **Số bóng LED**, hoặc **Trọn gói / Bộ**.
- Tùy chỉnh hệ số 1 mặt hoặc 2 mặt thi công.
- Tự động tính phụ phí thi công, tiền nhân công, lắp đặt giàn giáo và thuế giá trị gia tăng **VAT (0%, 8%, 10%)**.
- Tự động tính tỷ lệ **Tạm ứng đặt cọc 50%** và **Số tiền còn lại sau nghiệm thu**.

### 3. Tự động sinh mã báo giá & quản lý đơn hàng
- Tự động sinh mã đơn thông minh theo tháng: `Số: T[Tháng]-[Số thứ tự]` (Ví dụ: `Số: T9-0001`, `Số: T9-0002`).
- Lưu trữ cục bộ (**LocalStorage**) giúp giữ an toàn danh sách báo giá mà không sợ mất dữ liệu khi mất mạng hoặc tắt trình duyệt.
- Tích hợp 3 mẫu báo giá nhanh (Presets):
  - *Cửa hàng thông dụng*
  - *Biển Alu LED cao cấp*
  - *Decal văn phòng*

### 4. Bản in A4 thời gian thực & Xuất file chuyên nghiệp
- **Live Preview A4:** Xem trực tiếp bản báo giá chuẩn khổ giấy A4 Portrait (210 × 297 mm) ngay trong quá trình nhập liệu.
- **Xuất file Word (`.doc`):** Xuất bảng báo giá ra tệp Word giữ nguyên định dạng bảng biểu, tiêu đề, chân trang và màu sắc thương hiệu.
- **In ấn / Xuất PDF trực tiếp:** Hỗ trợ lệnh in chuẩn trình duyệt, tự động căn chỉnh lề in không bị cắt xén nội dung.
- **Tích hợp mã QR VietinBank:** Mã QR thanh toán chuyển khoản hiển thị tự động trên góc thanh toán của báo giá.

### 5. Tương thích đa thiết bị & Chế độ Sáng / Tối
- Giao diện được tối ưu chuẩn Responsive: Hiển thị mượt mà trên cả **Điện thoại di động (Mobile)**, **Máy tính bảng (Tablet)** và **Máy tính (Desktop)**.
- Hỗ trợ chuyển đổi chế độ **Giao diện Sáng (Light Mode)** và **Giao diện Tối (Dark Mode)**.

---

## 🛠 Công nghệ sử dụng (Tech Stack)

| Thành phần | Công nghệ / Thư viện |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Giao diện** | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/) |
| **Bộ Icon** | [Lucide React](https://lucide.dev/) |
| **Xử lý tệp & nén** | JSZip |
| **Quản lý tiến trình VPS** | [PM2](https://pm2.keymetrics.io/) |
| **Web Server & SSL** | Nginx Reverse Proxy trên nền tảng aaPanel |
| **Môi trường Server** | Node.js v24 LTS (Linux VPS) |

---

## 📂 Cấu trúc thư mục dự án

```text
dichvu.shop/
├── public/                 # Tài nguyên tĩnh, favicon, logo
├── src/
│   ├── app/                # Next.js App Router (layout.tsx, page.tsx, globals.css)
│   ├── components/         # Các thành phần giao diện
│   │   ├── Header.tsx           # Thanh điều hướng, nút xuất file, đổi theme
│   │   ├── CustomerForm.tsx     # Form nhập thông tin khách hàng & công trình
│   │   ├── ItemCard.tsx         # Thẻ nhập kích thước & bóc tách từng hạng mục
│   │   ├── SummarySettings.tsx  # Cài đặt phụ phí lắp đặt & thuế VAT
│   │   ├── QuoteSheet.tsx       # Mẫu báo giá hiển thị chuẩn A4 & in ấn
│   │   ├── SavedQuotesModal.tsx # Cửa sổ quản lý danh sách báo giá đã lưu
│   │   └── QuotationApp.tsx     # Component trung tâm kết nối logic & giao diện
│   ├── constants/          # Danh mục giá & dữ liệu tĩnh
│   │   ├── pricing.ts           # Bảng giá 41 hạng mục và thông tin công ty
│   │   └── qrCode.ts            # Dữ liệu mã QR ngân hàng VietinBank
│   ├── types/              # Khai báo TypeScript types (CustomerInfo, QuoteItem...)
│   └── utils/              # Các hàm tiện ích
│       ├── exportWord.ts        # Xuất bảng báo giá sang tài liệu Word (.doc)
│       ├── format.ts            # Định dạng tiền tệ VNĐ, ngày tháng, sinh mã số
│       └── quoteStorage.ts      # Đọc/ghi đơn hàng vào LocalStorage
├── ecosystem.config.cjs    # Cấu hình khởi chạy và quản lý tiến trình PM2
├── next.config.ts          # Cấu hình Next.js
└── package.json            # Danh sách gói thư viện và script thực thi
```

---

## 🚀 Hướng dẫn phát triển & Vận hành

### 1. Chạy ở môi trường nội bộ (Development)
```bash
# Cài đặt dependencies
npm install

# Khởi chạy máy chủ phát triển
npm run dev
```
Truy cập: `http://localhost:3000`

### 2. Đóng gói cho môi trường Production
```bash
# Biên dịch và tối ưu mã nguồn
npm run build

# Chạy thử bản production
npm run start
```

### 3. Quản lý ứng dụng trên VPS bằng PM2
```bash
# Khởi động dịch vụ
pm2 start ecosystem.config.cjs

# Xem log hoạt động theo thời gian thực
pm2 logs dichvu-shop

# Khởi động lại dịch vụ sau khi sửa code
pm2 restart dichvu-shop

# Lưu trạng thái tự khởi động khi khởi động lại VPS
pm2 save
```

### 4. Cập nhật mã nguồn từ GitHub
```bash
cd /www/wwwroot/dichvu.shop
git pull origin main
npm install
npm run build
pm2 restart dichvu-shop
```

---

## 📞 Liên hệ kỹ thuật & Bản quyền

- **Chủ sở hữu:** Nguyễn Đình Cương (Quảng Cáo & In Đình Cương)
- **Email/Hotline:** 0934 066 099
- **Repository:** [https://github.com/Chipvn88/BAO-GIA](https://github.com/Chipvn88/BAO-GIA)
- **Triển khai tại:** [https://dichvu.shop](https://dichvu.shop)
