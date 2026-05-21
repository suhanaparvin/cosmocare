import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Pill, Search, ShoppingCart, Truck, Plus, Minus, X } from 'lucide-react';

interface Medicine {
  id: number;
  name: string;
  brand: string;
  price: number;
  type: string;
  inStock: boolean;
}

const mockMedicines: Medicine[] = [
  {
    id: 1,
    name: 'Paracetamol 650mg',
    brand: 'Dolo',
    price: 30,
    type: 'Tablet',
    inStock: true
  },
  {
    id: 2,
    name: 'Amoxicillin 500mg',
    brand: 'Moxikind',
    price: 120,
    type: 'Capsule',
    inStock: true
  },
  {
    id: 3,
    name: 'Insulin Glargine',
    brand: 'Lantus',
    price: 1200,
    type: 'Injection',
    inStock: true
  },
  {
    id: 4,
    name: 'Atorvastatin 10mg',
    brand: 'Atorva',
    price: 85,
    type: 'Tablet',
    inStock: true
  },
  {
    id: 5,
    name: 'Azithromycin 500mg',
    brand: 'Azee',
    price: 95,
    type: 'Tablet',
    inStock: true
  },
  {
    id: 6,
    name: 'Cetirizine 10mg',
    brand: 'Cetzine',
    price: 22,
    type: 'Tablet',
    inStock: true
  }
];

export function EPharmacy() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ medicine: Medicine; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (medicine: Medicine) => {
    const existingItem = cart.find(item => item.medicine.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.medicine.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { medicine, quantity: 1 }]);
    }
  };

  const updateQuantity = (medicineId: number, delta: number) => {
    setCart(cart.map(item =>
      item.medicine.id === medicineId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (medicineId: number) => {
    setCart(cart.filter(item => item.medicine.id !== medicineId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.medicine.price * item.quantity), 0);
  };

  const filteredMedicines = mockMedicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-teal-500 via-emerald-500 to-green-600 text-white border-0 shadow-xl overflow-hidden">
        <div className="p-8 relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Pill className="w-9 h-9" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">e-Pharmacy</h2>
                <p className="text-lg opacity-90">Medicines delivered in 30 minutes</p>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search for medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white text-slate-800 border-0 rounded-xl text-lg"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-sm opacity-90">Delivery</div>
                  <div className="text-xl font-bold">30 mins</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-sm opacity-90">Delivery Fee</div>
                  <div className="text-xl font-bold">₹40</div>
                </div>
              </div>
              <Button
                onClick={() => setShowCart(true)}
                className="bg-white text-emerald-600 hover:bg-slate-100 h-12 px-6 rounded-xl font-semibold relative"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMedicines.map((medicine) => (
          <Card key={medicine.id} className="p-5 hover:shadow-lg transition border-2 hover:border-emerald-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-slate-100 text-slate-700 text-xs">
                    {medicine.type}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    In Stock
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{medicine.name}</h3>
                <p className="text-sm text-slate-600">Brand: {medicine.brand}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">₹{medicine.price}</div>
              </div>
            </div>
            <Button
              onClick={() => addToCart(medicine)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 h-11 rounded-lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Shopping Cart</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCart(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.medicine.id}
                        className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800">{item.medicine.name}</h4>
                          <p className="text-sm text-slate-600">{item.medicine.brand}</p>
                          <p className="text-sm text-emerald-600 font-semibold">
                            ₹{item.medicine.price} × {item.quantity} = ₹{item.medicine.price * item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.medicine.id, -1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.medicine.id, 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.medicine.id)}
                            className="text-red-600 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{getTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Fee</span>
                      <span className="font-semibold">₹40</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-slate-800 pt-2 border-t">
                      <span>Total</span>
                      <span className="text-emerald-600">₹{getTotalAmount() + 40}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl font-semibold mt-6">
                    <Truck className="w-5 h-5 mr-2" />
                    Place Order
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
