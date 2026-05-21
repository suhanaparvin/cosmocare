import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { 
  AlertCircle, 
  X, 
  Ambulance, 
  Building2, 
  Droplet, 
  Phone,
  MapPin,
  Navigation
} from 'lucide-react';

const nearbyEmergencyServices = {
  hospitals: [
    {
      id: 1,
      name: 'AMRI Hospital',
      distance: '1.2 km',
      emergency: true,
      phone: '033 6606 3800',
      address: 'Dhakuria, Kolkata'
    },
    {
      id: 2,
      name: 'Apollo Gleneagles',
      distance: '2.5 km',
      emergency: true,
      phone: '033 2320 3040',
      address: 'Salt Lake, Kolkata'
    }
  ],
  ambulances: [
    {
      id: 1,
      name: 'MedExpress Ambulance',
      type: 'Advanced Life Support',
      eta: '5 mins',
      phone: '98300 12345',
      distance: '800m away'
    },
    {
      id: 2,
      name: 'City Emergency Service',
      type: 'Basic Life Support',
      eta: '8 mins',
      phone: '98300 67890',
      distance: '1.5 km away'
    }
  ],
  bloodBanks: [
    {
      id: 1,
      name: 'SSKM Blood Bank',
      distance: '2.1 km',
      phone: '033 2244 1122',
      availability: 'Open 24/7'
    },
    {
      id: 2,
      name: 'Red Cross Blood Bank',
      distance: '3.4 km',
      phone: '033 2287 1122',
      availability: 'Open 24/7'
    }
  ]
};

const emergencyContacts = [
  { service: 'Police', number: '100', icon: '🚓' },
  { service: 'Fire Brigade', number: '101', icon: '🚒' },
  { service: 'Ambulance (Govt)', number: '102', icon: '🚑' },
  { service: 'Disaster Helpline', number: '108', icon: '🆘' }
];

export function EmergencyButton() {
  const [showEmergency, setShowEmergency] = useState(false);

  return (
    <>
      {/* Emergency Floating Button */}
      <button
        onClick={() => setShowEmergency(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center animate-pulse"
      >
        <AlertCircle className="w-8 h-8" />
      </button>

      {/* Emergency Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-600 text-white p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Emergency Services</h2>
                    <p className="text-sm opacity-90">Nearby help available 24/7</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmergency(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Emergency Hotlines */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Emergency Hotlines</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {emergencyContacts.map((contact) => (
                    <button
                      key={contact.number}
                      onClick={() => window.open(`tel:${contact.number}`)}
                      className="p-4 border-2 border-red-200 rounded-xl hover:bg-red-50 hover:border-red-400 transition text-center"
                    >
                      <div className="text-3xl mb-2">{contact.icon}</div>
                      <div className="font-bold text-slate-800 text-sm mb-1">{contact.service}</div>
                      <div className="text-2xl font-bold text-red-600">{contact.number}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nearby Hospitals */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  Nearby Hospitals with Emergency
                </h3>
                <div className="space-y-3">
                  {nearbyEmergencyServices.hospitals.map((hospital) => (
                    <Card key={hospital.id} className="p-4 border-2 hover:border-blue-400 transition">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{hospital.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <MapPin className="w-3 h-3" />
                              <span>{hospital.address}</span>
                              <span className="text-blue-600">• {hospital.distance}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-700">
                          Emergency 24/7
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => window.open(`tel:${hospital.phone.replace(/\s/g, '')}`)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 h-10"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call: {hospital.phone}
                        </Button>
                        <Button variant="outline" className="h-10">
                          <Navigation className="w-4 h-4 mr-2" />
                          Navigate
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Nearby Ambulances */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Ambulance className="w-6 h-6 text-red-600" />
                  Available Ambulances
                </h3>
                <div className="space-y-3">
                  {nearbyEmergencyServices.ambulances.map((ambulance) => (
                    <Card key={ambulance.id} className="p-4 border-2 hover:border-red-400 transition">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Ambulance className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{ambulance.name}</h4>
                            <p className="text-sm text-slate-600">{ambulance.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-700 mb-1">
                            ETA: {ambulance.eta}
                          </Badge>
                          <p className="text-xs text-slate-600">{ambulance.distance}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => window.open(`tel:${ambulance.phone}`)}
                        className="w-full bg-red-600 hover:bg-red-700 h-10"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now: {ambulance.phone}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Nearby Blood Banks */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Droplet className="w-6 h-6 text-red-600" />
                  Emergency Blood Banks
                </h3>
                <div className="space-y-3">
                  {nearbyEmergencyServices.bloodBanks.map((bank) => (
                    <Card key={bank.id} className="p-4 border-2 hover:border-red-400 transition">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Droplet className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{bank.name}</h4>
                            <p className="text-sm text-slate-600">{bank.distance} • {bank.availability}</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => window.open(`tel:${bank.phone.replace(/\s/g, '')}`)}
                        className="w-full bg-red-600 hover:bg-red-700 h-10"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call: {bank.phone}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
