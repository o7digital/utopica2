import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Cache Management',
  description: 'Administrative interface for cache management and monitoring',
  robots: 'noindex, nofollow', // Prevent indexing of admin pages
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}