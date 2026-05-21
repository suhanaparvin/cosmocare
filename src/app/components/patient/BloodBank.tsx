import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Droplet, MapPin, Phone, AlertCircle, Calendar } from 'lucide-react';

const mockBloodBanks = [
  {
    id: 1,
    name: 'Apollo Gleneagles',
    bloodGroup: 'A+',
    units: 12,
    distance: '2.5 km away',
    location: 'Salt Lake, Kolkata'
  },
  {
    id: 2,
    name: 'SSKM Hospital',
    bloodGroup: 'O+',
    units: 8,
    distance: '4.1 km away',
    location: 'Bhowanipore, Kolkata'
  },
  {
    id: 3,
    name: 'AMRI Hospital',
    bloodGroup: 'B+',
    units: 5,
    distance: '3.2 km away',
    location: 'Dhakuria, Kolkata'
  },
  {
    id: 4,
    name: 'Fortis Hospital',
    bloodGroup: 'AB-',
    units: 7,
    distance: '5.8 km away',
    location: 'Anandapur, Kolkata'
  }
];

const mockLiveRequests = [
  {
    id: 1,
    bloodGroup: 'B-',
    urgency: 'Urgent',
    hospital: 'Medica Superspecialty',
    time: '5 mins ago'
  },
  {
    id: 2,
    bloodGroup: 'O-',
    urgency: 'Critical',
    hospital: 'RN Tagore Hospital',
    time: '12 mins ago'
  },
  {
    id: 3,
    bloodGroup: 'AB+',
    urgency: 'Normal',
    hospital: 'Belle Vue Clinic',
    time: '28 mins ago'
  }
];

export function BloodBank() {
  const [showFindBlood, setShowFindBlood] = useState(false);
  const [showRegisterDonor, setShowRegisterDonor] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  return (
    <div className="space-y-6">
      {/* Emergency Blood Request Card */}
      <Card className="border-2 border-red-200 bg-red-50 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-red-600 mb-2 flex items-center gap-2">
                <AlertCircle className="w-7 h-7" />
                Emergency Blood Request
              </h2>
              <p className="text-slate-700 mb-4">
                Quickly find donors or blood units nearby.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowFindBlood(!showFindBlood)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Find Blood
                </Button>
                <Button
                  onClick={() => setShowRegisterDonor(!showRegisterDonor)}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100 rounded-lg"
                >
                  Register as Donor
                </Button>
              </div>
            </div>

            {/* Donate Blood Card */}
            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 w-80 shadow-xl">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Droplet className="w-9 h-9 fill-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Donate Blood</h3>
              <p className="text-center text-sm opacity-90 mb-4">
                Your donation can save up to 3 lives. Check eligibility and schedule a donation.
              </p>
              <Button className="w-full bg-white text-red-600 hover:bg-slate-100 h-11 rounded-lg font-semibold">
                Schedule Donation
              </Button>
            </Card>
          </div>

          {/* Find Blood Form */}
          {showFindBlood && (
            <div className="mt-6 pt-6 border-t border-red-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={selectedBloodGroup} onValueChange={setSelectedBloodGroup}>
                  <SelectTrigger className="h-12 bg-white">
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Your location" className="h-12 bg-white" />
                <Button className="h-12 bg-red-600 hover:bg-red-700">
                  Search Blood Banks
                </Button>
              </div>
            </div>
          )}

          {/* Register as Donor Form */}
          {showRegisterDonor && (
            <div className="mt-6 pt-6 border-t border-red-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Full Name" className="h-12 bg-white" />
                <Select>
                  <SelectTrigger className="h-12 bg-white">
                    <SelectValue placeholder="Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Phone Number" className="h-12 bg-white" />
                <Input placeholder="Location" className="h-12 bg-white" />
              </div>
              <Button className="mt-4 bg-red-600 hover:bg-red-700 h-11 px-8">
                Register Now
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Nearby Blood Banks */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Nearby Blood Banks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockBloodBanks.map((bank) => (
            <Card key={bank.id} className="border-2 border-slate-200 hover:border-red-300 transition">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-sm text-slate-600 uppercase font-semibold">BLOOD GROUP</div>
                      <div className="text-sm text-slate-600 uppercase font-semibold">UNITS</div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl font-bold text-red-600">{bank.bloodGroup}</div>
                      <div className="text-3xl font-bold text-slate-800">{bank.units}</div>
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1">{bank.name}</h4>
                    <div className="text-sm text-slate-600">{bank.distance}</div>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 h-11 rounded-lg">
                  Request
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Requests */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Live Requests</h3>
        <div className="space-y-3">
          {mockLiveRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg hover:border-red-300 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-red-600">{request.bloodGroup}</span>
                    <Badge
                      className={
                        request.urgency === 'Critical'
                          ? 'bg-red-100 text-red-700'
                          : request.urgency === 'Urgent'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {request.urgency}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600">{request.hospital}</div>
                  <div className="text-xs text-slate-500">{request.time}</div>
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Respond
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Donation Info */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Donation Guidelines</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>You must be 18-65 years old and weigh at least 50 kg</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Wait 3 months between donations (whole blood)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Eat iron-rich foods and stay hydrated before donating</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Avoid alcohol 24 hours before and heavy exercise after donation</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
