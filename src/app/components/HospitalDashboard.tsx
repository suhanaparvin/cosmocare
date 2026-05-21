import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { User } from '@/app/App';
import { Building2, Bed, Droplet, Users, LogOut, Bell, Plus, Edit } from 'lucide-react';

interface HospitalDashboardProps {
  user: User;
  onLogout: () => void;
}

export function HospitalDashboard({ user, onLogout }: HospitalDashboardProps) {
  const [beds, setBeds] = useState({
    total: 120,
    available: 32,
    icu: 8,
    general: 24
  });

  const [bloodStock, setBloodStock] = useState({
    'A+': 12,
    'A-': 3,
    'B+': 8,
    'B-': 2,
    'O+': 15,
    'O-': 4,
    'AB+': 6,
    'AB-': 1
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm opacity-90">Hospital Dashboard</div>
              <div className="font-semibold">{user.name || 'AMRI Hospitals'}</div>
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
            <div className="text-sm text-slate-600 mb-1">Total Beds</div>
            <div className="text-3xl font-bold text-purple-600">{beds.total}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Available Beds</div>
            <div className="text-3xl font-bold text-green-600">{beds.available}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">On-Duty Doctors</div>
            <div className="text-3xl font-bold text-blue-600">28</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Today's Admissions</div>
            <div className="text-3xl font-bold text-orange-600">15</div>
          </Card>
        </div>

        {/* Bed Availability */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Bed Availability</h3>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Update
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Bed className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-sm font-semibold text-slate-700">General Ward</div>
              </div>
              <div className="text-3xl font-bold text-green-600">{beds.general}</div>
              <div className="text-sm text-slate-600">Available Now</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Bed className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-sm font-semibold text-slate-700">ICU</div>
              </div>
              <div className="text-3xl font-bold text-red-600">{beds.icu}</div>
              <div className="text-sm text-slate-600">Available Now</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bed className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm font-semibold text-slate-700">Private Room</div>
              </div>
              <div className="text-3xl font-bold text-blue-600">8</div>
              <div className="text-sm text-slate-600">Available Now</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Bed className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-sm font-semibold text-slate-700">Emergency</div>
              </div>
              <div className="text-3xl font-bold text-purple-600">12</div>
              <div className="text-sm text-slate-600">Available Now</div>
            </Card>
          </div>
        </Card>

        {/* Blood Stock */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Blood Stock Management</h3>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Update Stock
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {Object.entries(bloodStock).map(([group, units]) => (
              <Card
                key={group}
                className={`p-4 text-center border-2 ${
                  units > 10
                    ? 'bg-green-50 border-green-200'
                    : units > 5
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Droplet className={`w-5 h-5 ${units > 10 ? 'text-green-600' : units > 5 ? 'text-yellow-600' : 'text-red-600'}`} />
                </div>
                <div className="text-xl font-bold text-slate-800">{group}</div>
                <div className="text-2xl font-bold text-slate-800 my-1">{units}</div>
                <div className="text-xs text-slate-600">units</div>
                <Badge
                  className={`mt-2 text-xs ${
                    units > 10
                      ? 'bg-green-100 text-green-700'
                      : units > 5
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {units > 10 ? 'Good' : units > 5 ? 'Low' : 'Critical'}
                </Badge>
              </Card>
            ))}
          </div>
        </Card>

        {/* On-Duty Doctors */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">On-Duty Doctors Today</h3>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Doctor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Dr. Anindita Sen', dept: 'Cardiology', shift: '9 AM - 5 PM' },
              { name: 'Dr. Rahul Chatterjee', dept: 'Pediatrics', shift: '10 AM - 6 PM' },
              { name: 'Dr. Meera Gupta', dept: 'Emergency', shift: '8 PM - 8 AM' },
              { name: 'Dr. Amit Das', dept: 'Surgery', shift: '7 AM - 3 PM' },
              { name: 'Dr. Priya Sharma', dept: 'Dermatology', shift: '11 AM - 7 PM' },
              { name: 'Dr. Suresh Kumar', dept: 'Orthopedics', shift: '8 AM - 4 PM' }
            ].map((doctor, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800">{doctor.name}</div>
                    <div className="text-sm text-slate-600">{doctor.dept}</div>
                    <div className="text-xs text-slate-500">{doctor.shift}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Analytics */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">This Month's Analytics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-slate-600 mb-1">Total Patients</div>
              <div className="text-2xl font-bold text-purple-600">1,284</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Surgeries</div>
              <div className="text-2xl font-bold text-blue-600">142</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Emergency Cases</div>
              <div className="text-2xl font-bold text-red-600">89</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Occupancy Rate</div>
              <div className="text-2xl font-bold text-green-600">73%</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
