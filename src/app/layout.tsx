import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Báo Giá & Bóc Tách Khối Lượng | Quảng Cáo & In Đình Cương",
  description: "Hệ thống bóc tách tự động và lập báo giá theo 41 hạng mục niêm yết của Quảng Cáo & In Đình Cương (Hải Phòng). Hỗ trợ xuất Word và PDF chuẩn A4.",
  keywords: "báo giá quảng cáo, bóc tách khối lượng, in bạt, biển alu, led ruồi, đình cương hải phòng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <Script
          id="anti-bis"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // 1. Chặn extension chèn bis_skin_checked vào element
                  var origSet = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, val) {
                    if (name === 'bis_skin_checked') return;
                    return origSet.apply(this, arguments);
                  };

                  // 2. Bỏ qua thông báo lỗi hydration do extension gây ra trên console dev
                  var origConsoleError = console.error;
                  console.error = function() {
                    var fullMsg = Array.prototype.slice.call(arguments).join(' ');
                    if (fullMsg.indexOf('bis_skin_checked') !== -1) {
                      return;
                    }
                    return origConsoleError.apply(console, arguments);
                  };
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-100 text-slate-900 antialiased selection:bg-blue-600 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
