import type { Metadata } from 'next';
import React from 'react';
import 'katex/dist/katex.min.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'K-12 Physics Educational Web App',
  description: 'Ứng dụng học tập môn Vật lý từ Lớp 1 đến Lớp 12 cho Phụ huynh và Học sinh',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
