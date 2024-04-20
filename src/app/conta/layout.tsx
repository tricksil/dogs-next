import ContaHeader from '@/components/conta/conta-header';
import React from 'react';

export default async function ContaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <ContaHeader />
      {children}
    </div>
  );
}
