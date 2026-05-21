import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { User } from '@/app/App';
import { Microscope, FileText, Clock, TrendingUp, LogOut, Bell, Upload, Download } from 'lucide-react';

interface PathologicalCentreDashboardProps {
  user: User;
  onLogout: () => void;
}

const mockTestBookings = [
  {
    id: 1,
    bookingId: '#TEST-1234',
    patientName: 'Anushka Saha',
    testType: 'Complete Blood Count (CBC)',
    sampleCollected: true,
    status: 'processing',
    turnaround: '24 hours',
    time: '10:30 AM'
  },
  {
    id: 2,
    bookingId: '#TEST-1235',
    patientName: 'Rajesh Kumar',
    testType: 'Thyroid Function Test',
    sampleCollected: true,
    status: 'completed',
    turnaround: '48 hours',
    time: '11:00 AM'
  },
  {
    id: 3,
    bookingId: '#TEST-1236',
    patientName: 'Priya Sharma',
    testType: 'Lipid Profile',
    sampleCollected: false,
    status: 'scheduled',
    turnaround: '24 hours',
    time: '2:00 PM'
  }
];

const testCategories = [
  { name: 'Blood Tests', count: 342, color: 'text-red-600', bg: 'bg-red-50' },
  { name: 'Imaging', count: 128, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Pathology', count: 89, color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Microbiology', count: 64, color: 'text-green-600', bg: 'bg-green-50' }
];

export function PathologicalCentreDashboard({ user, onLogout }: PathologicalCentreDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm opacity-90">Pathological Centre</div>
              <div className="font-semibold">{user.name || 'HealthCare Diagnostics'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
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
            <div className="text-sm text-slate-600 mb-1">Today's Tests</div>
            <div className="text-3xl font-bold text-cyan-600">34</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Pending Reports</div>
            <div className="text-3xl font-bold text-orange-600">12</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Today's Revenue</div>
            <div className="text-3xl font-bold text-green-600">₹28,450</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Rating</div>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-yellow-600">4.8</div>
              <span className="text-yellow-400">★</span>
            </div>
          </Card>
        </div>

        {/* Test Categories */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Test Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {testCategories.map((category, index) => (
              <Card key={index} className={`p-4 ${category.bg} border-2`}>
                <div className="text-sm font-semibold text-slate-700 mb-2">{category.name}</div>
                <div className={`text-3xl font-bold ${category.color}`}>{category.count}</div>
                <div className="text-sm text-slate-600">tests this month</div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Test Bookings Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Today's Test Queue</h3>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>

          {mockTestBookings.map((booking) => (
            <Card key={booking.id} className="p-5 border-2 hover:border-cyan-300 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg text-slate-800">{booking.bookingId}</h4>
                    <Badge
                      className={
                        booking.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : booking.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600 mb-1">Patient: {booking.patientName}</div>
                  <div className="text-sm font-medium text-slate-800 mb-2">{booking.testType}</div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div>Turnaround: {booking.turnaround}</div>
                    <Badge variant={booking.sampleCollected ? 'default' : 'outline'}>
                      {booking.sampleCollected ? 'Sample Collected' : 'Awaiting Collection'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">₹850</div>
                  <div className="text-xs text-slate-500">Test Fee</div>
                </div>
              </div>

              <div className="flex gap-3">
                {booking.status === 'scheduled' && (
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 h-11 rounded-lg">
                    Collect Sample
                  </Button>
                )}
                {booking.status === 'processing' && (
                  <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 h-11 rounded-lg">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Report
                  </Button>
                )}
                {booking.status === 'completed' && (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 h-11 rounded-lg">
                    <Download className="w-5 h-5 mr-2" />
                    Download Report
                  </Button>
                )}
                <Button variant="outline" className="flex-1 h-11 rounded-lg border-2">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Home Collection Requests */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Home Collection Requests</h3>
          <div className="space-y-3">
            {[
              { name: 'Amit Das', location: 'Salt Lake Sector V', time: '3:00 PM', tests: 'CBC, Blood Sugar' },
              { name: 'Meera Gupta', location: 'Park Street', time: '4:30 PM', tests: 'Thyroid Panel' }
            ].map((request, index) => (
              <Card key={index} className="p-4 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{request.name}</div>
                    <div className="text-sm text-slate-600">{request.location} • {request.time}</div>
                    <div className="text-xs text-slate-500 mt-1">{request.tests}</div>
                  </div>
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                    Assign Technician
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Analytics */}
        <Card className="p-6 bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            <h3 className="text-lg font-bold text-slate-800">This Month's Performance</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-slate-600 mb-1">Total Tests</div>
              <div className="text-2xl font-bold text-cyan-600">623</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Revenue</div>
              <div className="text-2xl font-bold text-green-600">₹5,28,450</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Avg. Turnaround</div>
              <div className="text-2xl font-bold text-blue-600">28h</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Customer Rating</div>
              <div className="text-2xl font-bold text-yellow-600">4.8 ★</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
