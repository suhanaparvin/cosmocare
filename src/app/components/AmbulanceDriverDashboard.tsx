import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { Badge } from '@/app/components/ui/badge';
import { User } from '@/app/App';
import { Ambulance, MapPin, Clock, IndianRupee, LogOut, Bell, Navigation, Phone } from 'lucide-react';

interface AmbulanceDriverDashboardProps {
  user: User;
  onLogout: () => void;
}

const mockRequests = [
  {
    id: 1,
    patientName: 'Anushka Saha',
    pickup: 'Salt Lake Sector V, Gate 1',
    destination: 'AMRI Hospital, Salt Lake',
    distance: '4.2 km',
    fare: '₹450',
    status: 'pending',
    time: '2 mins ago'
  },
  {
    id: 2,
    patientName: 'Rajesh Kumar',
    pickup: 'Park Street, Forum Mall',
    destination: 'Apollo Hospital, EM Bypass',
    distance: '6.8 km',
    fare: '₹680',
    status: 'pending',
    time: '5 mins ago'
  }
];

export function AmbulanceDriverDashboard({ user, onLogout }: AmbulanceDriverDashboardProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeRide, setActiveRide] = useState<typeof mockRequests[0] | null>(null);

  const handleAcceptRequest = (request: typeof mockRequests[0]) => {
    setActiveRide(request);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Ambulance className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm opacity-90">Ambulance Driver</div>
              <div className="font-semibold">{user.name}</div>
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
        {/* Availability Toggle */}
        <Card className="p-6 bg-gradient-to-br from-red-500 to-rose-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Availability Status</h2>
              <p className="text-sm opacity-90">
                {isAvailable ? 'You are currently accepting ride requests' : 'You are offline'}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-green-500"
              />
              <div className="text-sm font-semibold mt-2 text-center">
                {isAvailable ? 'ONLINE' : 'OFFLINE'}
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Today's Rides</div>
            <div className="text-3xl font-bold text-blue-600">8</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Today's Earnings</div>
            <div className="text-3xl font-bold text-green-600">₹3,240</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Rating</div>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-yellow-600">4.8</div>
              <span className="text-yellow-400">★</span>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-slate-600 mb-1">Total Rides</div>
            <div className="text-3xl font-bold text-purple-600">342</div>
          </Card>
        </div>

        {/* Active Ride */}
        {activeRide && (
          <Card className="p-6 border-2 border-green-500 bg-green-50">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-600">ACTIVE RIDE</Badge>
              <span className="text-sm text-slate-600">In Progress</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-600 mb-1">Patient</div>
                <div className="text-xl font-bold text-slate-800">{activeRide.patientName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Navigation className="w-4 h-4" />
                    Pickup
                  </div>
                  <div className="font-semibold text-slate-800">{activeRide.pickup}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    Destination
                  </div>
                  <div className="font-semibold text-slate-800">{activeRide.destination}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 h-12">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Patient
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 h-12">
                  <Navigation className="w-5 h-5 mr-2" />
                  Navigate
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 border-2"
                  onClick={() => setActiveRide(null)}
                >
                  Complete Ride
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Request Queue */}
        {!activeRide && isAvailable && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800">Incoming Requests</h3>

            {mockRequests.map((request) => (
              <Card key={request.id} className="p-5 border-2 hover:border-red-300 transition">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-lg text-slate-800">{request.patientName}</h4>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        New Request
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600">{request.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">{request.fare}</div>
                    <div className="text-xs text-slate-500">{request.distance}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Navigation className="w-4 h-4" />
                      <span className="text-xs">Pickup</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{request.pickup}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs">Destination</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{request.destination}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleAcceptRequest(request)}
                    className="flex-1 bg-green-600 hover:bg-green-700 h-11 rounded-lg"
                  >
                    Accept Request
                  </Button>
                  <Button variant="outline" className="flex-1 h-11 rounded-lg border-2">
                    Decline
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!isAvailable && (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ambulance className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">You're Offline</h3>
            <p className="text-slate-600 mb-4">
              Turn on availability to start receiving ride requests
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
