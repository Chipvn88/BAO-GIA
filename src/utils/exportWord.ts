export function exportWordDoc(elementId: string, customerName: string = 'DinhCuong'): boolean {
  if (typeof window === 'undefined') return false;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return false;
  }

  const content = element.innerHTML;
  const preHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Báo giá Đình Cương</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 12pt; margin: 20mm; }
        .font-arial-13-bold { font-family: Arial, sans-serif !important; font-size: 13pt !important; font-weight: bold !important; line-height: 1.5 !important; }
        .font-arial-12-bold { font-family: Arial, sans-serif !important; font-size: 12pt !important; font-weight: bold !important; line-height: 1.4 !important; }
        .font-arial-narrow-12 { font-family: "Arial Narrow", Arial, sans-serif !important; font-size: 12pt !important; line-height: 1.4 !important; }
        table { border-collapse: collapse; width: 100%; margin-top: 10px; margin-bottom: 10px; }
        th, td { border: 1px solid #475569; padding: 8px 10px; }
        th { background-color: #1e3a8a; color: #ffffff; font-weight: bold; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        .font-black { font-weight: 900; }
        .text-\[13pt\] { font-size: 13pt !important; }
        .text-slate-900 { color: #0f172a; }
        .text-slate-800 { color: #1e293b; }
        .text-slate-700 { color: #334155; }
        .text-red-600 { color: #dc2626; }
        .text-blue-900 { color: #1e3a8a; }
        .text-emerald-700 { color: #047857; }
        .uppercase { text-transform: uppercase; }
        .border-b { border-bottom: 1px solid #cbd5e1; }
        .qr-container { border: 1px solid #94a3b8; padding: 10px; background: #f8fafc; margin-top: 10px; border-radius: 8px; }
        .qr-container img { width: 170px; height: auto; vertical-align: middle; }
      </style>
    </head>
    <body>
  `;
  const postHtml = "</body></html>";

  const blob = new Blob(['\ufeff' + preHtml + content + postHtml], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = (customerName || 'DinhCuong').trim().replace(/[\s/\\?%*:|"<>]+/g, '_');
  a.download = `Bao_Gia_${safeName}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}
