// src/app/(user)/dashboard/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react" // Added signOut
import { useRouter } from "next/navigation"

interface Order {
  id: string;
  serviceType: string;
  description: string | null;
  status: string;
  orderDate: string;
}

export default function UserDashboardPage() { // Reverted name to UserDashboardPage for simplicity
  const { data: session, status } = useSession()
  const router = useRouter()

  const [serviceType, setServiceType] = useState("")
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("") // For success message after booking
  const [error, setError] = useState<string | null>(null) // For error messages
  const [userOrders, setUserOrders] = useState<Order[]>([]) // To display user's own orders
  const [ordersLoading, setOrdersLoading] = useState(true)

  // State for password change form
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");


  // --- Protection & Redirect Logic ---
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // Redirect if not logged in
    }
  }, [status, router]);


  // --- Fetch User's Own Orders ---
  const fetchUserOrders = async () => {
    if (status === "authenticated" && session?.user?.id) {
      setOrdersLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/orders", { method: "GET" });
        const data = await response.json();
        if (response.ok) {
          setUserOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch your orders.");
        }
      } catch (err) {
        setError("Network error fetching your orders.");
        console.error("Error fetching user orders:", err);
      } finally {
        setOrdersLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [session, status]);


  // --- Handle Booking New Service (POST to /api/orders) ---
  const handleBookService = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!serviceType) {
      setError("Please select a service type.");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceType, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to book service.");
      } else {
        setMessage("Service booked successfully! We'll be in touch soon.");
        setServiceType("");
        setDescription("");
        fetchUserOrders(); // Re-fetch orders to update the list
      }
    } catch (err) {
      setError("Network error or server unavailable.");
      console.error("Service booking error:", err);
    }
  };

  // --- Handle Change Password ---
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (!newPassword.trim()) {
      setPasswordError("Password cannot be empty.");
      return;
    }
    if (newPassword.length < 6) {
        setPasswordError("Password must be at least 6 characters long.");
        return;
    }

    try {
      const response = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordMessage(data.message || "Password updated successfully!");
        setNewPassword("");
      } else {
        setPasswordError(data.message || "Failed to update password.");
      }
    } catch (err) {
      setPasswordError("Network error or server unavailable.");
      console.error("Password change error:", err);
    }
  };


  // Display loading/redirect states for the page
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading dashboard...</div>;
  }
  if (status === "unauthenticated") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Redirecting to sign-in...</div>;
  }

  // Main content for authenticated users (non-admin)
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl">
        {/* Page Header Section */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
            <h1 className="text-4xl font-bold text-blue-400">Your Client Dashboard</h1>
            {/* Logout Button (Moved here for convenience on this single page) */}
            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
                Log Out
            </button>
        </div>

        <p className="text-lg text-center mb-12 text-gray-200">
          Welcome back, <span className="font-semibold text-green-400">{session?.user?.name || session?.user?.email}</span>! Here's your personalized space.
        </p>

        {/* Section for Booking a New Service */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-green-400">Book a New SEO Service</h2>
          <form onSubmit={handleBookService} className="space-y-6">
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-300 mb-2">
                Select Service Type:
              </label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Choose a Service --</option>
                <option value="Technical SEO">Technical SEO</option>
                <option value="On-Page SEO">On-Page SEO</option>
                <option value="Off-Page SEO">Off-Page SEO (Link Building)</option>
                <option value="Local SEO">Local SEO</option>
                <option value="SEO Consulting">SEO Consulting</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Describe Your Needs (Optional):
              </label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                placeholder="E.g., I need a full site audit for a new e-commerce store focusing on tech gadgets."
              ></textarea>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {message && <p className="text-green-500 text-sm text-center">{message}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Book Service Now
            </button>
          </form>
        </div>

        {/* Section for "Your Booked Orders" */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-orange-400">Your Booked Orders</h2>
          {ordersLoading ? (
            <p className="text-gray-400 text-center">Loading your orders...</p>
          ) : userOrders.length === 0 ? (
            <p className="text-gray-400 text-center">You have no booked orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg">
                <thead>
                  <tr className="text-gray-300 border-b border-gray-700">
                    <th className="py-3 px-4 text-left text-sm font-semibold">Service Type</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Description</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                      <td className="py-3 px-4 text-sm text-gray-200">{order.serviceType}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{order.description?.substring(0, 50) || 'N/A'}...</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${order.status === "Pending" ? "bg-yellow-500 text-yellow-900" :
                            order.status === "Completed" ? "bg-green-500 text-green-900" :
                            "bg-blue-500 text-blue-900"
                          }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">{new Date(order.orderDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Change Password Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-red-400">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                New Password:
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                minLength={6}
              />
            </div>
            {passwordError && <p className="text-red-500 text-sm text-center">{passwordError}</p>}
            {passwordMessage && <p className="text-green-500 text-sm text-center">{passwordMessage}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}