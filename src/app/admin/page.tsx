import { ShoppingBag, Package, Users, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Mock data for the dashboard
const stats = [
  {
    name: 'Today\'s Orders',
    value: '24',
    change: '+12%',
    changeType: 'increase' as const,
    icon: ShoppingBag,
  },
  {
    name: 'Pending Orders',
    value: '8',
    change: '-2',
    changeType: 'decrease' as const,
    icon: AlertCircle,
  },
  {
    name: 'Total Revenue',
    value: formatPrice(45231.89),
    change: '+20.1%',
    changeType: 'increase' as const,
    icon: DollarSign,
  },
  {
    name: 'Out of Stock',
    value: '3',
    change: '+1',
    changeType: 'increase' as const,
    icon: Package,
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    date: '2024-01-15',
    total: 89.99,
    status: 'pending',
    items: 2,
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    date: '2024-01-15',
    total: 156.99,
    status: 'processing',
    items: 3,
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    date: '2024-01-14',
    total: 45.99,
    status: 'shipped',
    items: 1,
  },
  {
    id: 'ORD-004',
    customer: 'Alice Brown',
    email: 'alice@example.com',
    date: '2024-01-14',
    total: 234.99,
    status: 'delivered',
    items: 5,
  },
  {
    id: 'ORD-005',
    customer: 'Charlie Wilson',
    email: 'charlie@example.com',
    date: '2024-01-13',
    total: 67.99,
    status: 'pending',
    items: 2,
  },
];

const lowStockProducts = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    sku: 'TSH-001',
    stock: 5,
    category: 'Men',
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    sku: 'JEAN-002',
    stock: 3,
    category: 'Men',
  },
  {
    id: '3',
    name: 'Summer Floral Dress',
    sku: 'DRESS-003',
    stock: 2,
    category: 'Women',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back! Here\'s an overview of your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden rounded-lg border border-gray-200"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-medium ${
                            stat.changeType === 'increase'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
            <p className="mt-1 text-sm text-gray-600">
              Latest orders from your customers
            </p>
          </div>
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div>
                          <div className="text-gray-900">{order.id}</div>
                          <div className="text-gray-500">{order.date}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'processing'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'shipped'
                              ? 'bg-purple-100 text-purple-800'
                              : order.status === 'delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="text-sm font-medium text-black hover:text-gray-800">
              View all orders →
            </button>
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Low Stock Products</h3>
            <p className="mt-1 text-sm text-gray-600">
              Products that need to be restocked soon
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.sku} • {product.category}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.stock <= 3
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {product.stock} left
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="text-sm font-medium text-black hover:text-gray-800">
              View all products →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Package className="h-5 w-5 mr-2 text-gray-600" />
              Add New Product
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-5 w-5 mr-2 text-gray-600" />
              Manage Customers
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <TrendingUp className="h-5 w-5 mr-2 text-gray-600" />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}