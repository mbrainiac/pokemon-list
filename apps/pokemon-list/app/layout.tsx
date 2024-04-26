import React from 'react';
import './global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white mx-auto p-16">{children}</body>
    </html>
  );
}
