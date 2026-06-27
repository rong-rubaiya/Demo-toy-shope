"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/components/AppContext";
import { Product, Inquiry } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Bar,
  Doughnut,
  Pie
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";
import {
  ShieldAlert,
  Boxes,
  ShoppingBag,
  TrendingUp,
  Award,
  Users,
  Settings,
  LogOut,
  SlidersHorizontal,
  Search,
  Plus,
  Trash2,
  Edit2,
  CalendarCheck,
  Cpu,
  Mail,
  CheckCircle,
  HelpCircle,
  Package,
  Gift
} from "lucide-react";
import Image from "next/image";

// Register Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function AdminDashboardPage() {
  const {
    productsList,
    addProduct,
    updateProduct,
    deleteProduct,
    allInquiries,
    updateInquiryStatus,
    allMessages,
    giftOrders,
    subscriptions
  } = useApp();

  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [mounted, setMounted] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);

  // CRUD Dialog states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProductToEdit, setSelectedProductToEdit] = useState<Product | null>(null);

  // CRUD Search/Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const {
    register: registerAdd,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm
  } = useForm<Omit<Product, "id" | "slug" | "specs">>({
    defaultValues: {
      name: "",
      category: "pvc-toys",
      moq: 1000,
      priceRange: "$1.50 - $3.00",
      material: "PVC",
      ageGroup: "3+ Years",
      description: "",
      images: ["https://images.unsplash.com/photo-1608889175123-8ec330b86f84?q=80&w=800"],
      packaging: "Custom Window Box",
      productionTime: "30 Days",
      isBestSeller: false,
      isTrending: false,
      isNewArrival: true,
      stock: 10000
    }
  });

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    setValue: setEditFormValue,
    reset: resetEditForm
  } = useForm<Product>();

  // Check auth
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("ens_admin_logged") === "true";
      if (!logged) {
        router.push("/admin/login");
      } else {
        setAdminLogged(true);
      }
    }
  }, [router]);

  if (!mounted || !adminLogged) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-dark flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Verifying Admin Credentials...</p>
        </div>
      </div>
    );
  }

  // Sidebar Menu Items
  const menuItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: ShieldAlert },
    { id: "products", label: "Inventory (CRUD)", icon: Boxes },
    { id: "inquiries", label: "Client RFQs", icon: ShoppingBag },
    { id: "gifts", label: "Gift Box Orders", icon: Gift },
    { id: "analytics", label: "Sales Analytics", icon: TrendingUp },
    { id: "messages", label: "Contact Messages", icon: Mail },
    { id: "ai", label: "AI Insights", icon: Cpu }
  ];

  // Inventory Filtering
  const filteredProducts = productsList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Chart 1: Monthly Inquiry RFQ volumes
  const monthlyInquiryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "RFQ Submissions",
        data: [12, 19, 15, 25, 32, 28, allInquiries.length + 15],
        backgroundColor: "#FF6B00",
        borderRadius: 6
      }
    ]
  };

  // Chart 2: Product categories popularity
  const categoryPopularityData = {
    labels: ["PVC", "Vinyl", "Action Figures", "Plush", "Educational", "Blind Box"],
    datasets: [
      {
        data: [35, 25, 20, 15, 10, 8],
        backgroundColor: [
          "#FF6B00",
          "#38BDF8",
          "#111827",
          "#F59E0B",
          "#10B981",
          "#8B5CF6"
        ],
        borderWidth: 1
      }
    ]
  };

  // Chart 3: Top Export countries
  const exportCountriesData = {
    labels: ["United States", "European Union", "Japan", "Southeast Asia", "Australia"],
    datasets: [
      {
        data: [35, 28, 18, 12, 7],
        backgroundColor: ["#FF6B00", "#38BDF8", "#F59E0B", "#10B981", "#8B5CF6"],
        borderWidth: 1
      }
    ]
  };

  // CRUD Handlers
  const handleAddNewProductSubmit = (data: any) => {
    const newId = "p" + (productsList.length + 1);
    const newSlug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newProduct: Product = {
      ...data,
      id: newId,
      slug: newSlug,
      specs: {
        size: "Custom",
        weight: "Custom",
        certifications: "CE, EN71, ASTM",
        oem_odm: "Available",
        port: "Shenzhen Port"
      }
    };
    addProduct(newProduct);
    resetAddForm();
    setShowAddModal(false);
    alert("New custom toy configuration registered successfully in inventory!");
  };

  const handleEditClick = (p: Product) => {
    setSelectedProductToEdit(p);
    resetEditForm(p);
    setShowEditModal(true);
  };

  const handleUpdateProductSubmit = (data: Product) => {
    updateProduct(data);
    setShowEditModal(false);
    setSelectedProductToEdit(null);
    alert("Toy specifications updated successfully in local storage database!");
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this product from active catalog listings?")) {
      deleteProduct(id);
    }
  };

  // AI Insights generator list
  const aiInsights = [
    { id: "ai1", desc: "PVC Toys raw pellet cost dropped by 4%. Sourcing margin increases by +1.5%." },
    { id: "ai2", desc: `Action Figure category inventory levels are stable. ${productsList.filter(p => p.stock < 5000).length} items are running low on stock.` },
    { id: "ai3", desc: "Collector Box subscriptions increased by 18%. Increase rotocast vinyl assembly allocations." },
    { id: "ai4", desc: "Custom Pantone Printing was requested in 70% of RFQ inquiries. Ensure screen painting mask availability." }
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-zinc-50 dark:bg-dark/20 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Sidebar Navigation */}
          <div className="lg:col-span-3 bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 shadow-xs space-y-6">
            <div className="flex items-center gap-3.5 pb-5 border-b border-zinc-100 dark:border-zinc-900">
              <div className="w-11 h-11 rounded-full bg-orange-100 dark:bg-orange-950/20 text-primary border border-orange-200 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left leading-tight">
                <h3 className="font-poppins font-bold text-sm text-zinc-900 dark:text-white leading-none">Admin Panel</h3>
                <span className="text-[9px] text-zinc-400 font-extrabold uppercase mt-1">Sourcing & Inventory Manager</span>
              </div>
            </div>

            <nav className="space-y-1 text-xs font-semibold text-zinc-650 dark:text-zinc-400">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition ${
                      isActive
                        ? "bg-primary/10 text-primary font-bold border-l-4 border-primary rounded-l-none"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-905"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  localStorage.removeItem("ens_admin_logged");
                  router.push("/");
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-red-650 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-left rounded-xl transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Admin Content Area */}
          <div className="lg:col-span-9 bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 shadow-xs min-h-[500px]">
            {/* TAB: DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-poppins font-black text-zinc-900 dark:text-white uppercase tracking-wider">Corporate Overview Dashboard</h2>
                  <p className="text-[10px] text-zinc-500 font-semibold mt-1">Real-time summaries aggregated across local storage arrays.</p>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 p-4 rounded-xl shadow-xs">
                    <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-wider">Sourcing Catalog</span>
                    <span className="text-lg font-poppins font-black text-zinc-900 dark:text-white mt-1 block">{productsList.length} items</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 p-4 rounded-xl shadow-xs">
                    <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-wider">Customer RFQs</span>
                    <span className="text-lg font-poppins font-black text-zinc-900 dark:text-white mt-1 block">{allInquiries.length} cases</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 p-4 rounded-xl shadow-xs">
                    <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-wider">Gift Orders</span>
                    <span className="text-lg font-poppins font-black text-zinc-900 dark:text-white mt-1 block">{giftOrders.length} bundles</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 p-4 rounded-xl shadow-xs">
                    <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-wider">Active Subs</span>
                    <span className="text-lg font-poppins font-black text-zinc-900 dark:text-white mt-1 block">
                      {subscriptions.filter(s => s.status === "Active").length} plans
                    </span>
                  </div>
                </div>

                {/* Recent Inquiries List */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-poppins font-black text-sm text-zinc-900 dark:text-white uppercase tracking-wider border-b pb-2">Pending Client RFQs</h3>
                  {allInquiries.length === 0 ? (
                    <p className="text-xs text-zinc-400 text-center py-6">No client inquires logged in this session yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {allInquiries.map((inq) => (
                        <div key={inq.id} className="p-4 rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-semibold">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-zinc-950 dark:text-white">{inq.id}</span>
                              <span className="text-[10px] text-zinc-400">({inq.email})</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 mt-1">Requested Qty: {inq.totalQuantity} units | Date: {inq.date}</p>
                          </div>
                          
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as Inquiry["status"])}
                            className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark text-xs rounded-xl focus:outline-hidden"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Approved">Approved</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: PRODUCTS CRUDS */}
            {activeTab === "products" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-2">
                  <div>
                    <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white uppercase tracking-wider leading-none">Catalog Inventory Manager</h2>
                    <p className="text-[10px] text-zinc-500 font-semibold mt-1">Insert, adjust, or remove toy offerings synced dynamically in search arrays.</p>
                  </div>
                  
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1 px-4 py-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer select-none"
                  >
                    <Plus className="w-4.5 h-4.5" />
                    <span>Insert Product</span>
                  </button>
                </div>

                {/* Search / Filters block */}
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search active listings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-xl text-xs bg-zinc-50/50 focus:outline-hidden"
                    />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3.5 py-2 border rounded-xl text-xs bg-zinc-50/50 focus:outline-hidden font-semibold text-zinc-650"
                  >
                    <option value="all">All Types</option>
                    <option value="pvc-toys">PVC Toys</option>
                    <option value="vinyl-toys">Vinyl Toys</option>
                    <option value="action-figures">Action Figures</option>
                    <option value="plush-toys">Plush Toys</option>
                    <option value="educational-toys">STEM / Educational</option>
                  </select>
                </div>

                {/* Table list */}
                <div className="overflow-x-auto border border-zinc-150/60 dark:border-zinc-850 rounded-2xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-150/60 dark:border-zinc-850 text-[10px] font-bold text-zinc-450 uppercase tracking-wider">
                        <th className="px-4 py-3">Toy Details</th>
                        <th className="px-4 py-3">FOB Cost / MOQ</th>
                        <th className="px-4 py-3">Raw Material</th>
                        <th className="px-4 py-3">Stock Units</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-150/60 dark:divide-zinc-850 text-zinc-650 dark:text-zinc-300 font-semibold">
                      {filteredProducts.map((p) => {
                        const isLowStock = p.stock < 5000;
                        return (
                          <tr key={p.id}>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border shrink-0 bg-white">
                                  <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                                </div>
                                <div className="text-left">
                                  <span className="block font-bold text-zinc-950 dark:text-white leading-tight">{p.name}</span>
                                  <span className="block text-[8px] text-zinc-400 uppercase tracking-wider mt-0.5">{p.category}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="block text-primary font-bold">{p.priceRange}</span>
                              <span className="block text-[9px] text-zinc-400 font-medium">MOQ: {p.moq} units</span>
                            </td>
                            <td className="px-4 py-3">{p.material}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                                isLowStock ? "bg-red-50 text-red-500 border border-red-100" : "bg-emerald-50 text-emerald-500 border border-emerald-100"
                              }`}>
                                {p.stock} units
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleEditClick(p)}
                                  className="p-1.5 rounded-lg border text-zinc-500 hover:border-primary hover:text-primary transition cursor-pointer"
                                  title="Edit toy specifications"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(p.id)}
                                  className="p-1.5 rounded-lg border text-zinc-500 hover:border-red-500 hover:text-red-500 transition cursor-pointer"
                                  title="Delete toy listing"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: CLIENT RFQS */}
            {activeTab === "inquiries" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">All Customer Sourcing RFQs</h2>
                {allInquiries.length === 0 ? (
                  <p className="text-xs text-zinc-400 text-center py-6">No inquiry cases have been submitted yet.</p>
                ) : (
                  <div className="space-y-4">
                    {allInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-5 rounded-2xl border border-zinc-150/60 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-4 text-xs font-semibold"
                      >
                        <div className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-poppins font-black text-sm text-zinc-950 dark:text-white">{inq.id}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border ${
                              inq.status === "Pending" ? "bg-amber-100 border-amber-200 text-amber-600" : "bg-emerald-100 border-emerald-200 text-emerald-600"
                            }`}>{inq.status}</span>
                          </div>
                          <span className="text-[10px] text-zinc-450 font-semibold">Date: {inq.date}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[8px] text-zinc-400 uppercase tracking-wider mb-0.5">Sourcing Contact</span>
                            <p className="text-zinc-900 dark:text-white font-bold">{inq.email}</p>
                            <p className="text-[10px] text-zinc-400 mt-1 font-bold">Items Details:</p>
                            <ul className="space-y-1 mt-1 text-[10px]">
                              {inq.items.map(it => (
                                <li key={it.product.id} className="font-bold">• {it.product.name} (x{it.quantity} units, MOQ: {it.product.moq})</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded-lg border">
                            <span className="block text-[8px] text-zinc-400 uppercase tracking-wider mb-1 font-bold">RFQ Specifications Notes</span>
                            <p className="text-[11px] leading-relaxed text-zinc-650 dark:text-zinc-400 font-medium italic">
                              "{inq.notes || "No custom logo or packaging parameters specified by buyer."}"
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: GIFT ORDERS */}
            {activeTab === "gifts" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">Gift Box assembly schedules</h2>
                {giftOrders.length === 0 ? (
                  <p className="text-xs text-zinc-450 text-center py-6">No custom gift boxes compiled yet.</p>
                ) : (
                  <div className="space-y-4">
                    {giftOrders.map((gft) => (
                      <div
                        key={gft.id}
                        className="p-5 rounded-2xl border border-zinc-150/60 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-4 text-xs font-semibold"
                      >
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-poppins font-black text-sm text-zinc-950 dark:text-white">{gft.id}</span>
                          <span className="text-[10px] text-zinc-400 font-bold">Est Price: ${gft.price.toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 leading-relaxed font-semibold">
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-white">Box: {gft.boxDesign}</p>
                            <p className="font-bold text-zinc-900 dark:text-white">Toy: {gft.toyName}</p>
                            <p className="font-bold text-zinc-900 dark:text-white">Extras: {gft.extras.join(", ")}</p>
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-white">Recipient: {gft.recipientName}</p>
                            <p className="font-bold text-zinc-900 dark:text-white">Address: {gft.recipientAddress}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SALES ANALYTICS */}
            {activeTab === "analytics" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">Sourcing Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Chart 1: Monthly inquiries */}
                  <div className="p-4 border rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 shadow-xs flex flex-col justify-between">
                    <h3 className="text-xs font-bold text-zinc-450 uppercase mb-4 text-center">Monthly Inquiry Submissions</h3>
                    <Bar data={monthlyInquiryData} />
                  </div>

                  {/* Chart 2: Categories Share */}
                  <div className="p-4 border rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 shadow-xs flex flex-col justify-between">
                    <h3 className="text-xs font-bold text-zinc-450 uppercase mb-4 text-center">Top Sourced Product Categories (%)</h3>
                    <div className="aspect-square max-w-[200px] mx-auto">
                      <Doughnut data={categoryPopularityData} />
                    </div>
                  </div>

                  {/* Chart 3: Export Share countries */}
                  <div className="p-4 border rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 shadow-xs flex flex-col justify-between md:col-span-2 max-w-md mx-auto w-full">
                    <h3 className="text-xs font-bold text-zinc-455 uppercase mb-4 text-center">Export Market Distribution (%)</h3>
                    <div className="aspect-square max-w-[200px] mx-auto">
                      <Pie data={exportCountriesData} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CONTACT MESSAGES */}
            {activeTab === "messages" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">Client Contact Inquiries</h2>
                {allMessages.length === 0 ? (
                  <p className="text-xs text-zinc-450 text-center py-6">No contacts/messages logged in this session.</p>
                ) : (
                  <div className="space-y-4">
                    {allMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-5 rounded-2xl border border-zinc-150/60 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-2 text-xs font-semibold"
                      >
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-poppins font-black text-sm text-zinc-950 dark:text-white">{msg.name}</span>
                          <span className="text-[10px] text-zinc-400 font-bold">{msg.date}</span>
                        </div>
                        <p className="text-zinc-500 font-medium">Business Contact: <strong className="text-zinc-850 dark:text-zinc-200">{msg.email}</strong></p>
                        <div className="bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded-lg border">
                          <p className="italic text-zinc-650 dark:text-zinc-400 leading-relaxed font-semibold">"{msg.message}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: AI INSIGHTS */}
            {activeTab === "ai" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">AI Sourcing Trends Insights</h2>
                <div className="grid grid-cols-1 gap-4">
                  {aiInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className="p-4 rounded-xl border border-orange-100 bg-orange-50/50 dark:bg-orange-955/20 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-start gap-3.5 shadow-xs"
                    >
                      <Cpu className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-zinc-950 dark:text-white mb-0.5">Sourcing System Analytica</h4>
                        <p className="text-zinc-500 text-[11px] leading-relaxed">{insight.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* CRUD Modal: Add Product */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-950 max-w-lg w-full rounded-3xl overflow-hidden p-6 sm:p-8 border border-zinc-200 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-450 hover:bg-zinc-100 hover:text-zinc-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-poppins font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-wider">Register Custom Sourcing Toy</h3>

            <form onSubmit={handleAddSubmit(handleAddNewProductSubmit)} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Toy Name</label>
                  <input
                    type="text"
                    required
                    {...registerAdd("name", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Category Type</label>
                  <select
                    {...registerAdd("category")}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  >
                    <option value="pvc-toys">PVC Toys</option>
                    <option value="vinyl-toys">Vinyl Toys</option>
                    <option value="action-figures">Action Figures</option>
                    <option value="plush-toys">Plush Toys</option>
                    <option value="educational-toys">STEM / Educational</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Target FOB Pricing</label>
                  <input
                    type="text"
                    required
                    {...registerAdd("priceRange", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Production MOQ</label>
                  <input
                    type="number"
                    required
                    {...registerAdd("moq", { required: true, valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Raw Material</label>
                  <input
                    type="text"
                    required
                    {...registerAdd("material", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    required
                    {...registerAdd("stock", { required: true, valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-zinc-400 uppercase mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  {...registerAdd("description", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl mt-4 shadow-md transition"
              >
                Register & Publish to Catalog
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CRUD Modal: Edit Product */}
      {showEditModal && selectedProductToEdit && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-950 max-w-lg w-full rounded-3xl overflow-hidden p-6 sm:p-8 border border-zinc-200 shadow-2xl relative">
            <button
              onClick={() => {
                setShowEditModal(false);
                setSelectedProductToEdit(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-450 hover:bg-zinc-100 hover:text-zinc-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-poppins font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-wider">Adjust Toy specifications</h3>

            <form onSubmit={handleEditSubmit(handleUpdateProductSubmit)} className="space-y-4 text-xs font-semibold">
              <input type="hidden" {...registerEdit("id")} />
              <input type="hidden" {...registerEdit("slug")} />
              <input type="hidden" {...registerEdit("images")} />
              <input type="hidden" {...registerEdit("specs.size")} />
              <input type="hidden" {...registerEdit("specs.weight")} />
              <input type="hidden" {...registerEdit("specs.certifications")} />
              <input type="hidden" {...registerEdit("specs.oem_odm")} />
              <input type="hidden" {...registerEdit("specs.port")} />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Toy Name</label>
                  <input
                    type="text"
                    required
                    {...registerEdit("name", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Category Type</label>
                  <select
                    {...registerEdit("category")}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  >
                    <option value="pvc-toys">PVC Toys</option>
                    <option value="vinyl-toys">Vinyl Toys</option>
                    <option value="action-figures">Action Figures</option>
                    <option value="plush-toys">Plush Toys</option>
                    <option value="educational-toys">STEM / Educational</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Target FOB Pricing</label>
                  <input
                    type="text"
                    required
                    {...registerEdit("priceRange", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Production MOQ</label>
                  <input
                    type="number"
                    required
                    {...registerEdit("moq", { required: true, valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Raw Material</label>
                  <input
                    type="text"
                    required
                    {...registerEdit("material", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase mb-1">Adjust Stock Units</label>
                  <input
                    type="number"
                    required
                    {...registerEdit("stock", { required: true, valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-zinc-400 uppercase mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  {...registerEdit("description", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-dark focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl mt-4 shadow-md transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
const X = ({ className, ...props }: any) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={className} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>;
