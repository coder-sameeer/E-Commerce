import { redirect } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, you would check authentication here
  // const isAuthenticated = checkAuth();
  // if (!isAuthenticated) {
  //   redirect('/admin/login');
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}