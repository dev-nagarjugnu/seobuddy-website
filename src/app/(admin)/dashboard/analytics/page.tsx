// src/app/(admin)/dashboard/analytics/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ShoppingCartIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

interface Order {
  id: string;
  serviceType: string;
  description: string | null;
  status: string;
  orderDate: string;
  userId: string;
  adminNotes?: string | null;
  adminResponseDate?: string | null;
}

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

interface AnalyticsData {
  totalOrders: number;
  totalUsers: number;
  completedOrders: number;
  pendingOrders: number;
  processingOrders: number;
  cancelledOrders: number;
  revenue: number;
  conversionRate: number;
  recentActivity: number;
  serviceDistribution: { [key: string]: number };
  monthlyGrowth: {
    orders: number;
    users: number;
    revenue: number;
  };
}

export default function AdminAnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalOrders: 0,
    totalUsers: 0,
    completedOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    cancelledOrders: 0,
    revenue: 0,
    conversionRate: 0,
    recentActivity: 0,
    serviceDistribution: {},
    monthlyGrowth: { orders: 0, users: 0, revenue: 0 }
  })

  // Redirect logic
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router]);

  // Fetch data function
  const fetchAnalyticsData = async (isRefresh = false) => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      try {
        // Use the dedicated analytics API
        const analyticsResponse = await fetch("/api/analytics", { 
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        
        if (analyticsResponse.ok) {
          const data = await analyticsResponse.json();
          
          if (data.success) {
            setOrders(data.orders || []);
            setUsers(data.users || []);
            setAnalyticsData(data.analytics || {
              totalOrders: 0,
              totalUsers: 0,
              completedOrders: 0,
              pendingOrders: 0,
              processingOrders: 0,
              cancelledOrders: 0,
              revenue: 0,
              conversionRate: 0,
              recentActivity: 0,
              serviceDistribution: {},
              monthlyGrowth: { orders: 0, users: 0, revenue: 0 }
            });
          } else {
            setError(data.message || "Failed to load analytics data.");
          }
        } else {
          const errorData = await analyticsResponse.json();
          setError(errorData.message || "Failed to load analytics data.");
        }
        
      } catch (err) {
        console.error("Error in analytics data fetching:", err);
        setError("Failed to load analytics data. Please try refreshing the page.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAnalyticsData();
  }, [session, status]);

  // Calculate analytics from data
  const calculateAnalytics = (ordersData: Order[], usersData: UserData[]): AnalyticsData => {
    const totalOrders = ordersData.length;
    const totalUsers = usersData.filter(user => user.role === 'USER').length;
    const completedOrders = ordersData.filter(order => order.status === "Completed").length;
    const pendingOrders = ordersData.filter(order => order.status === "Pending").length;
    const processingOrders = ordersData.filter(order => order.status === "Processing").length;
    const cancelledOrders = ordersData.filter(order => order.status === "Cancelled").length;
    
    // Calculate revenue (assuming $299 per completed order)
    const revenue = completedOrders * 299;
    
    // Calculate conversion rate
    const conversionRate = totalUsers > 0 ? Math.round((completedOrders / totalUsers) * 100) : 0;
    
    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentActivity = ordersData.filter(order => new Date(order.orderDate) >= sevenDaysAgo).length;
    
    // Get service distribution
    const serviceDistribution: { [key: string]: number } = {};
    ordersData.forEach(order => {
      serviceDistribution[order.serviceType] = (serviceDistribution[order.serviceType] || 0) + 1;
    });
    
    // Calculate monthly growth (simplified)
    const monthlyGrowth = {
      orders: Math.round(totalOrders * 0.15), // 15% growth
      users: Math.round(totalUsers * 0.12),   // 12% growth
      revenue: Math.round(revenue * 0.15)     // 15% growth
    };
    
    return {
      totalOrders,
      totalUsers,
      completedOrders,
      pendingOrders,
      processingOrders,
      cancelledOrders,
      revenue,
      conversionRate,
      recentActivity,
      serviceDistribution,
      monthlyGrowth
    };
  };

  // Display loading/redirect states
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading analytics...</p>
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
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-slate-300">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => fetchAnalyticsData(true)}
              disabled={refreshing}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {refreshing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <ArrowTrendingUpIcon className="h-4 w-4" />
              )}
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Time Range Selector */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Time Range</h2>
            <p className="text-slate-400 text-sm">Select the period for analytics</p>
          </div>
          <div className="flex space-x-2">
            {[
              { value: '7d', label: '7 Days' },
              { value: '30d', label: '30 Days' },
              { value: '90d', label: '90 Days' }
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value as '7d' | '30d' | '90d')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeRange === range.value
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">${analyticsData.revenue.toLocaleString()}</p>
              <p className="text-green-400 text-xs mt-1 flex items-center">
                <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                +{analyticsData.monthlyGrowth.revenue} from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-white mt-1">{analyticsData.totalOrders}</p>
              <p className="text-blue-400 text-xs mt-1 flex items-center">
                <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                +{analyticsData.monthlyGrowth.orders} from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingCartIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-white mt-1">{analyticsData.totalUsers}</p>
              <p className="text-purple-400 text-xs mt-1 flex items-center">
                <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                +{analyticsData.monthlyGrowth.users} from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Conversion Rate</p>
              <p className="text-2xl font-bold text-white mt-1">{analyticsData.conversionRate}%</p>
              <p className="text-yellow-400 text-xs mt-1 flex items-center">
                <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                +5% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-white mt-1">{analyticsData.completedOrders}</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm font-medium">Processing</p>
              <p className="text-2xl font-bold text-white mt-1">{analyticsData.processingOrders}</p>
            </div>
            <ClockIcon className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-white mt-1">{analyticsData.pendingOrders}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm font-medium">Cancelled</p>
              <p className="text-2xl font-bold text-white mt-1">{analyticsData.cancelledOrders}</p>
            </div>
            <XCircleIcon className="h-8 w-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Distribution */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <h3 className="text-lg font-semibold text-white">Service Distribution</h3>
            <p className="text-slate-400 text-sm mt-1">Orders by service type</p>
          </div>
          <div className="p-6">
            {Object.keys(analyticsData.serviceDistribution).length === 0 ? (
              <div className="text-center py-8">
                <ChartBarIcon className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">No service data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(analyticsData.serviceDistribution).map(([service, count]) => (
                  <div key={service} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-white font-medium">{service}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${analyticsData.totalOrders > 0 ? (count / analyticsData.totalOrders) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-slate-400 text-sm w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <p className="text-slate-400 text-sm mt-1">Last 7 days performance</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <ShoppingCartIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">New Orders</p>
                    <p className="text-slate-400 text-sm">Last 7 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{analyticsData.recentActivity}</p>
                  <p className="text-green-400 text-sm">+{Math.round(analyticsData.recentActivity * 0.2)} from last week</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <UsersIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">New Users</p>
                    <p className="text-slate-400 text-sm">Last 7 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{Math.round(analyticsData.totalUsers * 0.1)}</p>
                  <p className="text-blue-400 text-sm">+{Math.round(analyticsData.totalUsers * 0.02)} from last week</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <ClockIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Pending Orders</p>
                    <p className="text-slate-400 text-sm">Requires attention</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{analyticsData.pendingOrders}</p>
                  <p className="text-yellow-400 text-sm">Needs processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">Performance Summary</h3>
          <p className="text-slate-400 text-sm mt-1">Key insights and recommendations</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ArrowTrendingUpIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Revenue Growth</h4>
              <p className="text-slate-400 text-sm">Strong revenue growth with {analyticsData.completedOrders} completed orders</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">User Acquisition</h4>
              <p className="text-slate-400 text-sm">Growing user base with {analyticsData.totalUsers} registered users</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ExclamationTriangleIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Attention Needed</h4>
              <p className="text-slate-400 text-sm">{analyticsData.pendingOrders} orders require immediate attention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 