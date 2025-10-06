// src/app/(admin)/dashboard/page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { 
  UsersIcon, 
  ShoppingCartIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

interface Order {
  id: string;
  serviceType: string;
  description: string | null;
  status: string;
  orderDate: string;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
}

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<UserData[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [usersLoading, setUsersLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Protection & Redirect Logic
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session?.user?.role === "ADMIN") {
        // Fetch orders
        setOrdersLoading(true)
        try {
          const ordersResponse = await fetch("/api/orders", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
          const ordersData = await ordersResponse.json()
          if (ordersResponse.ok) {
            setOrders(ordersData.orders)
          } else {
            setError(ordersData.message || "Failed to fetch orders.")
          }
        } catch (err) {
          setError("Network error fetching orders.")
          console.error("Error fetching orders:", err)
        } finally {
          setOrdersLoading(false)
        }

        // Fetch users
        setUsersLoading(true)
        try {
          const usersResponse = await fetch("/api/users", { method: "GET" });
          const usersData = await usersResponse.json();
          if (usersResponse.ok) {
            setUsers(usersData.users);
          } else {
            console.error("Failed to fetch users:", usersData.message);
          }
        } catch (err) {
          console.error("Error fetching users:", err);
        } finally {
          setUsersLoading(false)
        }
      }
    }
    fetchData()
  }, [session, status]);

  // Calculate metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === "Pending").length;
  const completedOrders = orders.filter(order => order.status === "Completed").length;
  const totalUsers = users.length;
  const recentOrders = orders.slice(0, 5); // Show last 5 orders

  // Display loading/redirect states
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-white text-lg">Access Denied. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {session?.user?.name || session?.user?.email?.split('@')[0] || 'Admin'}!
            </h1>
            <p className="text-slate-300">Here's what's happening with your SEOBuddy platform today.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <ChartBarIcon className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-white mt-1">{totalOrders}</p>
              <p className="text-green-400 text-xs mt-1 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingCartIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Pending Orders</p>
              <p className="text-2xl font-bold text-white mt-1">{pendingOrders}</p>
              <p className="text-yellow-400 text-xs mt-1 flex items-center">
                <ClockIcon className="h-3 w-3 mr-1" />
                Requires attention
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Completed Orders</p>
              <p className="text-2xl font-bold text-white mt-1">{completedOrders}</p>
              <p className="text-green-400 text-xs mt-1 flex items-center">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                {totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0}% success rate
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-white mt-1">{totalUsers}</p>
              <p className="text-blue-400 text-xs mt-1 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                +5% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
          <p className="text-slate-400 text-sm mt-1">Latest customer orders and their status</p>
        </div>
        
        <div className="p-6">
          {ordersLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-slate-400">Loading orders...</span>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCartIcon className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No orders found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <ShoppingCartIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{order.serviceType}</p>
                      {order.description && (
                        <p className="text-sm text-slate-400 mt-1">
                          "{order.description.substring(0, 50)}..."
                        </p>
                      )}
                      <p className="text-xs text-slate-500 mt-1">
                        by {order.user?.name || order.user?.email || 'Unknown User'} • {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${order.status === "Pending" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                        order.status === "Processing" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                        order.status === "Completed" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                        "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {orders.length > 5 && (
            <div className="mt-6 text-center">
              <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                View all {orders.length} orders →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 text-left group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Manage Orders</h3>
              <p className="text-slate-400 text-sm mt-1">Update order status</p>
            </div>
            <ArrowUpIcon className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 text-left group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">User Management</h3>
              <p className="text-slate-400 text-sm mt-1">View and manage users</p>
            </div>
            <ArrowUpIcon className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button className="bg-gradient-to-r from-green-600/20 to-green-700/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 text-left group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Analytics</h3>
              <p className="text-slate-400 text-sm mt-1">View detailed reports</p>
            </div>
            <ArrowUpIcon className="h-5 w-5 text-green-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  )
}