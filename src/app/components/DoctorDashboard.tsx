import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { User } from '@/app/App';
import { Stethoscope, Calendar, Video, Clock, IndianRupee, LogOut, Bell, User as UserIcon } from 'lucide-react';

interface DoctorDashboardProps {
  user: User;
  onLogout: () => void;
}

const mockAppointments = [
  {
    id: 1,
    patientName: 'Anushka Saha',
    age: 28,
    time: '10:00 AM',
    type: 'video',
    reason: 'Fever and headache',
    status: 'upcoming'
  },
  {
    id: 2,
    patientName: 'Rajesh Kumar',
    age: 45,
    time: '11:30 AM',
    type: 'in-person',
    reason: 'Routine checkup',
    status: 'upcoming'
  },
  {
    id: 3,
    patientName: 'Priya Sharma',
    age: 32,
    time: '2:00 PM',
    type: 'video',
    reason: 'Skin allergy consultation',
    status: 'upcoming'
  }
];

export function DoctorDashboard({ user, onLogout }: DoctorDashboardProps) {
  const [consultationFee, setConsultationFee] = useState(800);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm opacity-90">Doctor Dashboard</div>
              <div className="font-semibold">{user.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full"></span>
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
            <div className="text-sm text-slate-600 mb-1">Today's Appointments</div>
            <div className="text-3xl font-bold text-blue-600">12</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Today's Earnings</div>
            <div className="text-3xl font-bold text-green-600">₹9,600</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Rating</div>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-yellow-600">4.9</div>
              <span className="text-yellow-400">★</span>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Total Patients</div>
            <div className="text-3xl font-bold text-purple-600">1,248</div>
          </Card>
        </div>

        {/* Profile Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Dr. {user.name}</h2>
              <p className="text-sm opacity-90 mb-3">Cardiologist • 15 years experience</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  MBBS, MD (Cardiology)
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  ✓ Premium Member
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-sm opacity-90 mb-1">Consultation Fee</div>
              <div className="text-2xl font-bold">₹{consultationFee}</div>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/10 mt-2 text-xs"
              >
                Edit Fee
              </Button>
            </div>
          </div>
        </Card>

        {/* Today's Appointments */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Today's Appointments</h3>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>

          {mockAppointments.map((appointment) => (
            <Card key={appointment.id} className="p-5 border-2 hover:border-blue-300 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-lg text-slate-800">{appointment.patientName}</h4>
                      <Badge variant="outline" className="text-xs">
                        {appointment.age} years
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                      {appointment.type === 'video' ? (
                        <Badge className="bg-green-100 text-green-700">
                          <Video className="w-3 h-3 mr-1" />
                          Video Consult
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-700">
                          In-Person
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-slate-600">
                      Reason: <span className="font-medium">{appointment.reason}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">₹{consultationFee}</div>
                </div>
              </div>

              <div className="flex gap-3">
                {appointment.type === 'video' ? (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 h-11 rounded-lg">
                    <Video className="w-5 h-5 mr-2" />
                    Start Video Call
                  </Button>
                ) : (
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 h-11 rounded-lg">
                    Check In Patient
                  </Button>
                )}
                <Button variant="outline" className="flex-1 h-11 rounded-lg border-2">
                  View History
                </Button>
                <Button variant="outline" className="h-11 rounded-lg border-2">
                  Reschedule
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Analytics */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">This Month's Analytics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-slate-600 mb-1">Total Appointments</div>
              <div className="text-2xl font-bold text-purple-600">284</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Revenue</div>
              <div className="text-2xl font-bold text-green-600">₹2,27,200</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">New Patients</div>
              <div className="text-2xl font-bold text-blue-600">47</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Avg. Rating</div>
              <div className="text-2xl font-bold text-yellow-600">4.9 ★</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
