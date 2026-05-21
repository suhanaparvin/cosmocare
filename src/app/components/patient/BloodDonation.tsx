import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Heart, Search, MapPin, Phone, Droplet, UserPlus } from 'lucide-react';

const mockDonors = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    bloodGroup: 'O+',
    location: 'Salt Lake, Kolkata',
    distance: '2.3 km',
    lastDonation: '4 months ago',
    available: true,
    phone: '+91 98300 12345'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    bloodGroup: 'A+',
    location: 'Park Street, Kolkata',
    distance: '3.5 km',
    lastDonation: '5 months ago',
    available: true,
    phone: '+91 98300 67890'
  },
  {
    id: 3,
    name: 'Amit Das',
    bloodGroup: 'B+',
    location: 'Ballygunge, Kolkata',
    distance: '4.2 km',
    lastDonation: '6 months ago',
    available: true,
    phone: '+91 98300 11223'
  }
];

const mockBloodBanks = [
  {
    id: 1,
    name: 'AMRI Hospital Blood Bank',
    location: 'Salt Lake, Kolkata',
    distance: '3.2 km',
    stock: {
      'A+': 12,
      'A-': 3,
      'B+': 8,
      'B-': 2,
      'O+': 15,
      'O-': 4,
      'AB+': 6,
      'AB-': 1
    },
    phone: '+91 33 6606 3800'
  },
  {
    id: 2,
    name: 'Apollo Blood Centre',
    location: 'EM Bypass, Kolkata',
    distance: '5.1 km',
    stock: {
      'A+': 10,
      'A-': 2,
      'B+': 12,
      'B-': 3,
      'O+': 18,
      'O-': 5,
      'AB+': 4,
      'AB-': 2
    },
    phone: '+91 33 2320 3040'
  }
];

export function BloodDonation() {
  const [searchType, setSearchType] = useState<'donor' | 'bloodbank'>('donor');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 text-white border-0 shadow-xl overflow-hidden">
        <div className="p-8 relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-10 -translate-x-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Heart className="w-9 h-9 fill-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">Blood Donation</h2>
                <p className="text-lg opacity-90">Find Blood or Donate in 3 Taps</p>
              </div>
            </div>

            <p className="text-lg mb-8 opacity-95">
              Every donation can save up to 3 lives. Be a hero in someone's emergency.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setSearchType('donor')}
                className="bg-white text-red-600 hover:bg-slate-100 h-12 px-8 rounded-xl font-semibold shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Donor
              </Button>
              <Button
                onClick={() => setSearchType('bloodbank')}
                className="bg-white text-red-600 hover:bg-slate-100 h-12 px-8 rounded-xl font-semibold shadow-lg"
              >
                <Droplet className="w-5 h-5 mr-2" />
                Find Blood Bank
              </Button>
              <Button
                onClick={() => setShowRegistration(true)}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-12 px-8 rounded-xl font-semibold backdrop-blur-sm"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Register to Donate
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">2,450+</div>
                <div className="text-sm opacity-90">Active Donors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">850+</div>
                <div className="text-sm opacity-90">Lives Saved</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm opacity-90">Availability</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Registration Form */}
      {showRegistration && (
        <Card className="p-6 border-2 border-red-200 bg-red-50">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Register as Blood Donor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          <div className="flex gap-3">
            <Button className="flex-1 bg-red-600 hover:bg-red-700 h-11">
              Register Now
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowRegistration(false)}
              className="flex-1 h-11"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Search Section */}
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Select value={selectedBloodGroup} onValueChange={setSelectedBloodGroup}>
            <SelectTrigger className="w-48 h-12">
              <SelectValue placeholder="Select Blood Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+ (A Positive)</SelectItem>
              <SelectItem value="A-">A- (A Negative)</SelectItem>
              <SelectItem value="B+">B+ (B Positive)</SelectItem>
              <SelectItem value="B-">B- (B Negative)</SelectItem>
              <SelectItem value="AB+">AB+ (AB Positive)</SelectItem>
              <SelectItem value="AB-">AB- (AB Negative)</SelectItem>
              <SelectItem value="O+">O+ (O Positive)</SelectItem>
              <SelectItem value="O-">O- (O Negative)</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Enter your location..."
            className="flex-1 h-12"
          />
          <Button className="h-12 px-8 bg-red-600 hover:bg-red-700">
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant={searchType === 'donor' ? 'default' : 'outline'}
            onClick={() => setSearchType('donor')}
            className="flex-1 rounded-lg"
          >
            Individual Donors
          </Button>
          <Button
            variant={searchType === 'bloodbank' ? 'default' : 'outline'}
            onClick={() => setSearchType('bloodbank')}
            className="flex-1 rounded-lg"
          >
            Blood Banks
          </Button>
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {searchType === 'donor' ? (
          <>
            <h3 className="text-xl font-bold text-slate-800">Available Donors Near You</h3>
            {mockDonors.map((donor) => (
              <Card key={donor.id} className="p-5 hover:shadow-lg transition border-2 hover:border-red-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <Droplet className="w-6 h-6 text-red-600 mx-auto mb-0.5" />
                        <div className="text-xs font-bold text-red-600">{donor.bloodGroup}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-1">{donor.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{donor.location}</span>
                        <span className="text-blue-600">• {donor.distance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700">
                          Available
                        </Badge>
                        <span className="text-sm text-slate-600">
                          Last donated: {donor.lastDonation}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-600">{donor.bloodGroup}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white h-11 rounded-lg"
                    onClick={() => window.open(`tel:${donor.phone}`)}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Donor
                  </Button>
                  <Button variant="outline" className="h-11 rounded-lg border-2">
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-slate-800">Blood Banks Near You</h3>
            {mockBloodBanks.map((bank) => (
              <Card key={bank.id} className="p-5 hover:shadow-lg transition border-2 hover:border-red-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Droplet className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-1">{bank.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span>{bank.location}</span>
                        <span className="text-blue-600">• {bank.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-semibold text-slate-700 mb-3">Blood Stock Availability:</div>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(bank.stock).map(([group, units]) => (
                      <div
                        key={group}
                        className={`rounded-lg p-3 text-center border-2 ${
                          units > 10
                            ? 'bg-green-50 border-green-200'
                            : units > 5
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="font-bold text-lg">{group}</div>
                        <div className="text-sm text-slate-600">{units} units</div>
                        <div
                          className={`text-xs font-semibold mt-1 ${
                            units > 10
                              ? 'text-green-600'
                              : units > 5
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {units > 10 ? 'In Stock' : units > 5 ? 'Low Stock' : 'Very Low'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white h-11 rounded-lg"
                    onClick={() => window.open(`tel:${bank.phone}`)}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Blood Bank
                  </Button>
                  <Button variant="outline" className="flex-1 h-11 rounded-lg border-2">
                    Get Directions
                  </Button>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Info Card */}
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
