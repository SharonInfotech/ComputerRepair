import React, { useState } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Search,
  Truck,
  Sparkles,
  Tag
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'RAM' | 'SSD' | 'Hard Disk' | 'Accessories' | 'CCTV & Networking';
  price: number;
  originalPrice: number;
  specs: string;
  warranty: string;
  inStock: boolean;
  imageIcon: string;
  bestSeller?: boolean;
}

const STORE_PRODUCTS: ProductItem[] = [
  {
    id: 'ssd-512',
    name: 'Crucial / Kingston 512GB NVMe M.2 SSD',
    category: 'SSD',
    price: 2850,
    originalPrice: 3800,
    specs: '3500 MB/s Read Speed • PCIe Gen3x4 • 5 Year Warranty',
    warranty: '5 Years Official Warranty',
    inStock: true,
    imageIcon: '⚡',
    bestSeller: true
  },
  {
    id: 'ssd-1tb',
    name: 'Samsung 980 1TB NVMe M.2 SSD',
    category: 'SSD',
    price: 5400,
    originalPrice: 6900,
    specs: '3500 MB/s High Performance Gaming SSD',
    warranty: '5 Years Official Warranty',
    inStock: true,
    imageIcon: '🔥',
    bestSeller: true
  },
  {
    id: 'ram-ddr4-8gb',
    name: 'Crucial 8GB DDR4 3200MHz Laptop RAM',
    category: 'RAM',
    price: 1650,
    originalPrice: 2200,
    specs: 'SODIMM 3200MHz • Instant Multitasking Speed Boost',
    warranty: '3 Years Warranty',
    inStock: true,
    imageIcon: '💾',
    bestSeller: true
  },
  {
    id: 'ram-ddr4-16gb',
    name: 'Corsair Vengeance 16GB DDR4 Laptop RAM',
    category: 'RAM',
    price: 3100,
    originalPrice: 4200,
    specs: '3200MHz High Speed Dual Rank Module',
    warranty: '3 Years Warranty',
    inStock: true,
    imageIcon: '⚡'
  },
  {
    id: 'hdd-1tb-ext',
    name: 'Seagate Expansion 1TB External Hard Drive',
    category: 'Hard Disk',
    price: 3950,
    originalPrice: 4800,
    specs: 'USB 3.0 Portable External Storage Drive',
    warranty: '3 Years Rescue Warranty',
    inStock: true,
    imageIcon: '📦'
  },
  {
    id: 'pendrive-64gb',
    name: 'SanDisk Ultra Flair 64GB USB 3.0 Pen Drive',
    category: 'Accessories',
    price: 490,
    originalPrice: 750,
    specs: 'Metal Body • 150MB/s High Speed Transfer',
    warranty: '5 Years Warranty',
    inStock: true,
    imageIcon: '🔌'
  },
  {
    id: 'mouse-wireless',
    name: 'Logitech B170 Wireless Optical Mouse',
    category: 'Accessories',
    price: 640,
    originalPrice: 895,
    specs: '2.4GHz Wireless • 12 Month Battery Life • Smooth Tracking',
    warranty: '1 Year Warranty',
    inStock: true,
    imageIcon: '🖱️',
    bestSeller: true
  },
  {
    id: 'keyboard-mouse-combo',
    name: 'Dell KM3322W Wireless Keyboard & Mouse Combo',
    category: 'Accessories',
    price: 1290,
    originalPrice: 1899,
    specs: 'Full Size Quiet Keys • Anti-Spill Design',
    warranty: '3 Years Replacement Warranty',
    inStock: true,
    imageIcon: '⌨️'
  },
  {
    id: 'cctv-camera-2mp',
    name: 'Hikvision 2MP HD 1080P Bullet Night Vision Camera',
    category: 'CCTV & Networking',
    price: 1450,
    originalPrice: 2100,
    specs: '20m IR Distance • Weatherproof IP67 Metal Housing',
    warranty: '2 Years Warranty',
    inStock: true,
    imageIcon: '📹'
  },
  {
    id: 'router-dualband',
    name: 'TP-Link Archer C6 AC1200 Dual Band Wi-Fi Router',
    category: 'CCTV & Networking',
    price: 2150,
    originalPrice: 2999,
    specs: '4 External Antennas • Gigabit Ports • MU-MIMO Technology',
    warranty: '3 Years Warranty',
    inStock: true,
    imageIcon: '📡'
  },
  {
    id: 'thermal-paste',
    name: 'Arctic MX-4 High Performance Thermal Paste (4g)',
    category: 'Accessories',
    price: 480,
    originalPrice: 700,
    specs: 'Non-Conductive • Lowers CPU/GPU Temp by 10-15°C',
    warranty: 'Original Product',
    inStock: true,
    imageIcon: '🧪'
  }
];

export const ShopStoreSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [cartOpen, setCartOpen] = useState(false);

  const categories = ['All', 'RAM', 'SSD', 'Hard Disk', 'Accessories', 'CCTV & Networking'];

  const filteredProducts = STORE_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const totalCartItems: number = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);

  const calculateTotal = (): number => {
    return Object.entries(cart).reduce((sum: number, [id, qty]) => {
      const product = STORE_PRODUCTS.find((p) => p.id === id);
      const itemQty = Number(qty) || 0;
      return sum + (product ? product.price * itemQty : 0);
    }, 0);
  };

  const handleWhatsAppCheckout = () => {
    const itemsList = Object.entries(cart)
      .map(([id, qty]) => {
        const prod = STORE_PRODUCTS.find((p) => p.id === id);
        const itemQty = Number(qty) || 0;
        return prod ? `• ${prod.name} x ${itemQty} = ₹${prod.price * itemQty}` : '';
      })
      .filter(Boolean)
      .join('\n');

    const totalAmt = calculateTotal();
    const textMessage = `Hi Sharon Infotech Nagpur, I would like to order the following computer hardware accessories:\n\n${itemsList}\n\n*Total Amount: ₹${totalAmt}*\nPlease confirm availability and doorstep delivery in Nagpur. Phone: 7249430043`;

    const encoded = encodeURIComponent(textMessage);
    window.open(`https://wa.me/917249430043?text=${encoded}`, '_blank');
  };

  return (
    <section id="shop-store" className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-950/90 px-3.5 py-1 rounded-full border border-amber-500/30">
              Sharon Infotech Hardware Store Nagpur
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mt-3">
              Buy Original RAM, SSD, Hard Drives & Accessories
            </h2>
            <p className="mt-1 text-slate-400 text-xs sm:text-sm">
              Same-day doorstep delivery or instant store pickup in Nagpur with GST invoice & manufacturer warranty.
            </p>
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-xl flex items-center gap-2 shrink-0 border border-amber-300"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Shopping Cart ({totalCartItems})</span>
            {totalCartItems > 0 && (
              <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                ₹{calculateTotal()}
              </span>
            )}
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SSD, RAM, Mouse, Pen Drive..."
              className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const qtyInCart = cart[product.id] || 0;

            return (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition relative"
              >
                {product.bestSeller && (
                  <div className="absolute top-3 right-3 bg-amber-500/20 text-amber-300 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Best Seller
                  </div>
                )}

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow-inner">
                    {product.imageIcon}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-black text-white mt-1 leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {product.specs}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{product.warranty}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-white">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-slate-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </div>

                  {qtyInCart === 0 ? (
                    <button
                      onClick={() => addToCart(product.id)}
                      className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition shadow-md flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl p-1">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-300"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-amber-300 px-1">
                        {qtyInCart}
                      </span>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-300"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Shopping Cart Drawer Modal / Floating Summary */}
        {cartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-5 animate-fade-in my-auto max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-black text-white">Your Sharon Infotech Cart</h3>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {totalCartItems === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs space-y-2">
                  <p>Your shopping cart is currently empty.</p>
                  <p className="text-[11px] text-slate-500">Browse SSDs, RAM, and accessories above to add items.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {Object.entries(cart).map(([id, qty]) => {
                      const prod = STORE_PRODUCTS.find((p) => p.id === id);
                      if (!prod) return null;
                      const itemQty = Number(qty) || 0;

                      return (
                        <div key={id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                          <div>
                            <p className="font-bold text-white leading-snug">{prod.name}</p>
                            <p className="text-slate-400 text-[10px]">₹{prod.price} x {itemQty}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-amber-300">₹{prod.price * itemQty}</span>
                            <button
                              onClick={() => removeFromCart(id)}
                              className="p-1 text-slate-500 hover:text-rose-400"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-300">
                      <span>Subtotal:</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-400">
                      <span>Nagpur Doorstep Delivery:</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                      <span>Total Payable:</span>
                      <span className="text-amber-400">₹{calculateTotal()}</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-xl flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Order via WhatsApp (Instant Confirmation)
                    </button>

                    <a
                      href="tel:7249430043"
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2 border border-slate-700"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      Call Store to Order: 7249430043
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
