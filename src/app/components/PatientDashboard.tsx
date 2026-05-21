import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { User } from '@/app/App';
import { 
  Heart, 
  LogOut, 
  Home, 
  Ambulance, 
  Building2, 
  Stethoscope,
  Leaf,
  UserCircle,
  HelpCircle,
  Bell,
  Droplet,
  Pill,
  Shield,
  MapPin
} from 'lucide-react';
import { AmbulanceSearch } from '@/app/components/patient/AmbulanceSearch';
import { HospitalsAndLabs } from '@/app/components/patient/HospitalsAndLabs';
import { DoctorsAndDispensaries } from '@/app/components/patient/DoctorsAndDispensaries';
import { WellnessHub } from '@/app/components/patient/WellnessHub';
import { BloodDonation } from '@/app/components/patient/BloodDonation';
import { HelpFAB } from '@/app/components/shared/HelpFAB';
import { BloodBank } from '@/app/components/patient/BloodBank';
import { EPharmacy } from '@/app/components/patient/EPharmacy';
import { Profile } from '@/app/components/patient/Profile';
import { Insurance } from '@/app/components/patient/Insurance';
import { EmergencyButton } from '@/app/components/patient/EmergencyButton';
import { MapSearch } from '@/app/components/patient/MapSearch';

interface PatientDashboardProps {
  user: User;
  onLogout: () => void;
}

export function PatientDashboard({ user, onLogout }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [bottomNav, setBottomNav] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Fixed Header with higher z-index */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sticky top-0 z-[9999] shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">Patient Dashboard</span>
              <span className="text-white/60">•</span>
              <span className="text-sm opacity-90">Welcome, {user.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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

      {/* Main Content with proper spacing below header */}
      <div className="max-w-7xl mx-auto p-4 pt-6">
        {bottomNav === 'home' && (
          <div className="space-y-6">
            {/* Emergency Card */}
            <Card className="bg-gradient-to-br from-red-500 via-pink-500 to-rose-600 text-white border-0 shadow-xl overflow-hidden">
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Ambulance className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Emergency Service</div>
                      <div className="text-2xl font-bold">Need Help Now?</div>
                    </div>
                  </div>
                  <p className="mb-6 opacity-90">
                    Find the nearest ambulance in Kolkata instantly
                  </p>
                  <Button
                    onClick={() => setBottomNav('ambulance')}
                    className="bg-white text-red-600 hover:bg-slate-100 h-12 px-8 rounded-xl font-semibold shadow-lg"
                  >
                    Find Ambulance Now
                  </Button>
                </div>
              </div>
            </Card>

            {/* Map Search Feature Card */}
            <Card className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white border-0 shadow-xl overflow-hidden">
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Location-Based Search</div>
                      <div className="text-2xl font-bold">Find Nearby Services</div>
                    </div>
                  </div>
                  <p className="mb-6 opacity-90">
                    View all healthcare facilities on an interactive map
                  </p>
                  <Button
                    onClick={() => setBottomNav('map')}
                    className="bg-white text-blue-600 hover:bg-slate-100 h-12 px-8 rounded-xl font-semibold shadow-lg"
                  >
                    Open Map Search
                  </Button>
                </div>
              </div>
            </Card>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white shadow-md h-auto p-1 rounded-2xl">
                <TabsTrigger value="hospitals" className="rounded-xl py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Hospitals & Labs
                </TabsTrigger>
                <TabsTrigger value="doctors" className="rounded-xl py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Doctors
                </TabsTrigger>
                <TabsTrigger value="pharmacy" className="rounded-xl py-3 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  e-Pharmacy
                </TabsTrigger>
                <TabsTrigger value="blood" className="rounded-xl py-3 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Blood Bank
                </TabsTrigger>
                <TabsTrigger value="insurance" className="rounded-xl py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Insurance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hospitals" className="mt-6">
                <HospitalsAndLabs />
              </TabsContent>

              <TabsContent value="doctors" className="mt-6">
                <DoctorsAndDispensaries />
              </TabsContent>

              <TabsContent value="pharmacy" className="mt-6">
                <EPharmacy />
              </TabsContent>

              <TabsContent value="blood" className="mt-6">
                <BloodBank />
              </TabsContent>

              <TabsContent value="insurance" className="mt-6">
                <Insurance />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {bottomNav === 'ambulance' && <AmbulanceSearch />}
        {bottomNav === 'hospitals' && <HospitalsAndLabs />}
        {bottomNav === 'doctors' && <DoctorsAndDispensaries />}
        {bottomNav === 'map' && <MapSearch />}
        {bottomNav === 'wellness' && <WellnessHub />}
        {bottomNav === 'profile' && (
          <Profile userName={user.name} userEmail={user.email} />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-20">
        <div className="max-w-7xl mx-auto px-2 py-2">
          <div className="grid grid-cols-6 gap-1">
            <button
              onClick={() => setBottomNav('home')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition ${
                bottomNav === 'home' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>

            <button
              onClick={() => setBottomNav('map')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition ${
                bottomNav === 'map' ? 'bg-cyan-50 text-cyan-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-xs font-medium">Map</span>
            </button>

            <button
              onClick={() => setBottomNav('ambulance')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition ${
                bottomNav === 'ambulance' ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Ambulance className="w-6 h-6" />
              <span className="text-xs font-medium">Ambulance</span>
            </button>

            <button
              onClick={() => setBottomNav('doctors')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition ${
                bottomNav === 'doctors' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Stethoscope className="w-6 h-6" />
              <span className="text-xs font-medium">Doctors</span>
            </button>

            <button
              onClick={() => setBottomNav('wellness')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition ${
                bottomNav === 'wellness' ? 'bg-green-50 text-green-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Leaf className="w-6 h-6" />
              <span className="text-xs font-medium">Wellness</span>
            </button>

            <button
              onClick={() => setBottomNav('profile')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition ${
                bottomNav === 'profile' ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <UserCircle className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Help FAB */}
      <HelpFAB />
      
      {/* Emergency Button */}
      <EmergencyButton />
    </div>
  );
}