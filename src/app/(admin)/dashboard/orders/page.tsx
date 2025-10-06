// src/app/(admin)/dashboard/orders/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { 
  ShoppingCartIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

interface OrderData {
  id: string;
  serviceType: string;
  description: string | null;
  status: string;
  orderDate: string;
  userId: string;
  adminNotes?: string | null;
  adminResponseDate?: string | null;
  emailSent?: boolean;
  emailSentAt?: string | null;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
}

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData | null;
  action: 'accept' | 'reject' | 'update' | null;
  onSubmit: (orderId: string, status: string, adminNotes: string, action: string) => void;
  loading: boolean;
}

function ActionModal({ isOpen, onClose, order, action, onSubmit, loading }: ActionModalProps) {
  const [notes, setNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Completed');

  useEffect(() => {
    if (isOpen) {
      setNotes('');
      setSelectedStatus('Completed');
    }
  }, [isOpen]);

  if (!isOpen || !order || !action) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes.trim()) {
      let newStatus;
      if (action === 'accept') {
        newStatus = 'Processing';
      } else if (action === 'reject') {
        newStatus = 'Cancelled';
      } else if (action === 'update') {
        newStatus = selectedStatus;
      } else {
        newStatus = 'Processing';
      }
      onSubmit(order.id, newStatus, notes.trim(), action);
    }
  };

  const getModalTitle = () => {
    switch (action) {
      case 'accept': return 'Accept Order';
      case 'reject': return 'Reject Order';
      case 'update': return 'Update Order Status';
      default: return 'Update Order';
    }
  };

  const getNotesLabel = () => {
    switch (action) {
      case 'accept': return 'Acceptance Notes';
      case 'reject': return 'Rejection Reason';
      case 'update': return 'Update Notes';
      default: return 'Notes';
    }
  };

  const getNotesPlaceholder = () => {
    switch (action) {
      case 'accept': return "Add notes about how you'll proceed with this order...";
      case 'reject': return "Please provide a reason for rejecting this order...";
      case 'update': return "Add notes about the status update and any important information...";
      default: return "Add notes...";
    }
  };

  const getButtonText = () => {
    switch (action) {
      case 'accept': return 'Accept Order';
      case 'reject': return 'Reject Order';
      case 'update': return 'Update Status';
      default: return 'Update';
    }
  };

  const getButtonColor = () => {
    switch (action) {
      case 'accept': return 'bg-green-600 hover:bg-green-700 text-white';
      case 'reject': return 'bg-red-600 hover:bg-red-700 text-white';
      case 'update': return 'bg-blue-600 hover:bg-blue-700 text-white';
      default: return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {getModalTitle()}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-slate-300 text-sm mb-2">
            Order: <span className="text-white font-medium">{order.serviceType}</span>
          </p>
          <p className="text-slate-300 text-sm mb-2">
            Customer: <span className="text-white font-medium">{order.user?.name || order.user?.email}</span>
          </p>
          {order.description && (
            <p className="text-slate-300 text-sm">
              Description: <span className="text-white">"{order.description}"</span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Status selection for update action */}
          {action === 'update' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                New Status *
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                required
              >
                <option value="Processing" className="bg-slate-700">Processing</option>
                <option value="Completed" className="bg-slate-700">Completed</option>
                <option value="Cancelled" className="bg-slate-700">Cancelled</option>
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {getNotesLabel()} *
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={getNotesPlaceholder()}
              className="w-full h-24 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !notes.trim()}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 ${getButtonColor()}`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : action === 'accept' ? (
                <>
                  <CheckIcon className="h-4 w-4" />
                  <span>{getButtonText()}</span>
                </>
              ) : action === 'reject' ? (
                <>
                  <XMarkIcon className="h-4 w-4" />
                  <span>{getButtonText()}</span>
                </>
              ) : (
                <>
                  <ArrowPathIcon className="h-4 w-4" />
                  <span>{getButtonText()}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updateMessage, setUpdateMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Pending' | 'Processing' | 'Completed' | 'Cancelled'>('ALL')
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null)
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null)
  const [selectedAction, setSelectedAction] = useState<'accept' | 'reject' | 'update' | null>(null)

  const allowedStatuses = ["Pending", "Processing", "Completed", "Cancelled"];

  // Redirect logic
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router]);

  // Fetch all orders
  const fetchOrders = async () => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/orders", { method: "GET" });
        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        setError("Network error fetching orders.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [session, status]);

  // Handle status change
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingOrder(orderId);
    setUpdateMessage(null);
    try {
      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateMessage(`Order status updated to ${newStatus} successfully.`);
        fetchOrders();
      } else {
        setError(data.message || "Failed to update order status.");
      }
    } catch (err) {
      setError("Network error updating order status.");
      console.error("Error updating order status:", err);
    } finally {
      setUpdatingOrder(null);
    }
  };

  // Handle accept/reject with notes
  const handleActionWithNotes = async (orderId: string, status: string, adminNotes: string, action: string) => {
    setUpdatingOrder(orderId);
    setUpdateMessage(null);
    setModalOpen(false);
    
    try {
      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderId, 
          status, 
          adminNotes, 
          action 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        let successMessage = '';
        if (action === 'accept') {
          successMessage = 'Order accepted successfully! Email notification sent to client.';
        } else if (action === 'reject') {
          successMessage = 'Order rejected successfully! Email notification sent to client.';
        } else if (action === 'update') {
          successMessage = `Order status updated to ${status} successfully! Email notification sent to client.`;
        } else {
          successMessage = 'Order updated successfully!';
        }
        setUpdateMessage(successMessage);
        fetchOrders();
      } else {
        setError(data.message || `Failed to ${action} order.`);
      }
    } catch (err) {
      setError(`Network error ${action}ing order.`);
      console.error(`Error ${action}ing order:`, err);
    } finally {
      setUpdatingOrder(null);
    }
  };

  // Open action modal
  const openActionModal = (order: OrderData, action: 'accept' | 'reject' | 'update') => {
    setSelectedOrder(order);
    setSelectedAction(action);
    setModalOpen(true);
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === "Pending").length;
  const processingOrders = orders.filter(order => order.status === "Processing").length;
  const completedOrders = orders.filter(order => order.status === "Completed").length;
  const cancelledOrders = orders.filter(order => order.status === "Cancelled").length;

  // Get status icon and colors
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Pending':
        return { icon: ClockIcon, color: 'yellow', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30', textColor: 'text-yellow-400' };
      case 'Processing':
        return { icon: ArrowPathIcon, color: 'blue', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30', textColor: 'text-blue-400' };
      case 'Completed':
        return { icon: CheckCircleIcon, color: 'green', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30', textColor: 'text-green-400' };
      case 'Cancelled':
        return { icon: XCircleIcon, color: 'red', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30', textColor: 'text-red-400' };
      default:
        return { icon: ClockIcon, color: 'gray', bgColor: 'bg-gray-500/20', borderColor: 'border-gray-500/30', textColor: 'text-gray-400' };
    }
  };

  // Display loading/redirect states
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading orders...</p>
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
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
            <p className="text-slate-300">Manage and track all customer orders</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <ShoppingCartIcon className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-white mt-1">{totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingCartIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-white mt-1">{pendingOrders}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Processing</p>
              <p className="text-2xl font-bold text-white mt-1">{processingOrders}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <ArrowPathIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-white mt-1">{completedOrders}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Cancelled</p>
              <p className="text-2xl font-bold text-white mt-1">{cancelledOrders}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <XCircleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders by service, description, or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'Pending' | 'Processing' | 'Completed' | 'Cancelled')}
              className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-white">All Orders ({filteredOrders.length})</h2>
          <p className="text-slate-400 text-sm mt-1">Manage order status and track progress</p>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {updateMessage && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-400 text-center">{updateMessage}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-slate-400">Loading orders...</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCartIcon className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No orders found</h3>
              <p className="text-slate-400">
                {searchQuery || statusFilter !== 'ALL' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'No orders have been placed yet.'
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <div key={order.id} className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                          <ShoppingCartIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{order.serviceType}</h3>
                          {order.description && (
                            <p className="text-slate-400 text-sm mt-1">
                              "{order.description.substring(0, 60)}..."
                            </p>
                          )}
                          <div className="flex items-center space-x-4 mt-2">
                            <p className="text-slate-500 text-xs">
                              by {order.user?.name || order.user?.email || 'Unknown User'}
                            </p>
                            <p className="text-slate-500 text-xs">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                            {order.adminResponseDate && (
                              <p className="text-slate-500 text-xs">
                                Responded: {new Date(order.adminResponseDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {order.adminNotes && (
                            <div className="mt-2 p-2 bg-slate-700/30 rounded-lg">
                              <div className="flex items-center space-x-1 mb-1">
                                <ChatBubbleLeftRightIcon className="h-3 w-3 text-slate-400" />
                                <span className="text-xs text-slate-400">Admin Notes:</span>
                              </div>
                              <p className="text-xs text-slate-300">{order.adminNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.borderColor} ${statusInfo.textColor}`}>
                          <StatusIcon className="h-3 w-3 inline mr-1" />
                          {order.status}
                        </span>
                        
                        {/* Action buttons for pending orders */}
                        {order.status === 'Pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openActionModal(order, 'accept')}
                              disabled={updatingOrder === order.id}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-1"
                            >
                              <CheckIcon className="h-3 w-3" />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() => openActionModal(order, 'reject')}
                              disabled={updatingOrder === order.id}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-1"
                            >
                              <XMarkIcon className="h-3 w-3" />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}
                        
                        {/* Update Status button for processing orders */}
                        {order.status === 'Processing' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openActionModal(order, 'update')}
                              disabled={updatingOrder === order.id}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-1"
                            >
                              <ArrowPathIcon className="h-3 w-3" />
                              <span>Update Status</span>
                            </button>
                          </div>
                        )}
                        
                        {/* Status dropdown for completed/cancelled orders */}
                        {(order.status === 'Completed' || order.status === 'Cancelled') && (
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            disabled={updatingOrder === order.id}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200
                              ${statusInfo.bgColor} ${statusInfo.borderColor} ${statusInfo.textColor}
                              ${updatingOrder === order.id ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                            `}
                          >
                            {allowedStatuses.map(status => (
                              <option key={status} value={status} className="bg-slate-700 text-white">
                                {status}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      <ActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        order={selectedOrder}
        action={selectedAction}
        onSubmit={handleActionWithNotes}
        loading={updatingOrder === selectedOrder?.id}
      />
    </div>
  );
}