import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { User } from '@/app/App';
import { Pill, Package, TrendingUp, LogOut, Bell, AlertCircle } from 'lucide-react';

interface DispensaryDashboardProps {
  user: User;
  onLogout: () => void;
}

const mockOrders = [
  {
    id: 1,
    orderId: '#ORD-1234',
    customerName: 'Anushka Saha',
    items: 3,
    amount: '₹450',
    status: 'pending',
    time: '5 mins ago'
  },
  {
    id: 2,
    orderId: '#ORD-1235',
    customerName: 'Rajesh Kumar',
    items: 2,
    amount: '₹320',
    status: 'preparing',
    time: '12 mins ago'
  },
  {
    id: 3,
    orderId: '#ORD-1236',
    customerName: 'Priya Sharma',
    items: 5,
    amount: '₹890',
    status: 'ready',
    time: '18 mins ago'
  }
];

const lowStockItems = [
  { name: 'Paracetamol 500mg', stock: 12, reorderLevel: 50 },
  { name: 'Amoxicillin 250mg', stock: 8, reorderLevel: 30 },
  { name: 'Cough Syrup', stock: 5, reorderLevel: 20 }
];

export function DispensaryDashboard({ user, onLogout }: DispensaryDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm opacity-90">Dispensary Dashboard</div>
              <div className="font-semibold">{user.name || 'MediPlus Pharmacy'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Today's Orders</div>
            <div className="text-3xl font-bold text-orange-600">48</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Today's Revenue</div>
            <div className="text-3xl font-bold text-green-600">₹12,840</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Pending Orders</div>
            <div className="text-3xl font-bold text-blue-600">6</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Total Items</div>
            <div className="text-3xl font-bold text-purple-600">2,450</div>
          </Card>
        </div>

        {/* Low Stock Alert */}
        <Card className="p-5 bg-red-50 border-2 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-slate-800">Low Stock Alert</h3>
            <Badge className="bg-red-600">{lowStockItems.length} items</Badge>
          </div>

          <div className="space-y-2">
            {lowStockItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">{item.name}</div>
                  <div className="text-sm text-slate-600">
                    Current: <span className="text-red-600 font-bold">{item.stock}</span> | 
                    Reorder at: {item.reorderLevel}
                  </div>
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Reorder
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Current Orders */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">Current Orders</h3>

          {mockOrders.map((order) => (
            <Card key={order.id} className="p-5 border-2 hover:border-orange-300 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg text-slate-800">{order.orderId}</h4>
                    <Badge
                      className={
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : order.status === 'preparing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600 mb-1">Customer: {order.customerName}</div>
                  <div className="text-sm text-slate-600">
                    {order.items} items • {order.time}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{order.amount}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700 h-11 rounded-lg">
                  {order.status === 'pending' ? 'Accept Order' : 
                   order.status === 'preparing' ? 'Mark Ready' : 
                   'Complete Order'}
                </Button>
                <Button variant="outline" className="flex-1 h-11 rounded-lg border-2">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Inventory Overview */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Inventory Categories</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Prescription</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">842</div>
              <div className="text-sm text-slate-600">items in stock</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-slate-700">OTC Medicines</span>
              </div>
              <div className="text-3xl font-bold text-green-600">1,248</div>
              <div className="text-sm text-slate-600">items in stock</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-slate-700">Supplements</span>
              </div>
              <div className="text-3xl font-bold text-purple-600">324</div>
              <div className="text-sm text-slate-600">items in stock</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-pink-600" />
                <span className="text-sm font-semibold text-slate-700">Baby Care</span>
              </div>
              <div className="text-3xl font-bold text-pink-600">186</div>
              <div className="text-sm text-slate-600">items in stock</div>
            </Card>
          </div>
        </Card>

        {/* Analytics */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-slate-800">This Month's Performance</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-slate-600 mb-1">Total Orders</div>
              <div className="text-2xl font-bold text-orange-600">1,284</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Revenue</div>
              <div className="text-2xl font-bold text-green-600">₹3,42,840</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Avg. Order Value</div>
              <div className="text-2xl font-bold text-blue-600">₹267</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Customer Rating</div>
              <div className="text-2xl font-bold text-yellow-600">4.7 ★</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
