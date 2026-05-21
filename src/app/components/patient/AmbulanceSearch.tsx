import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  Ambulance,
  MapPin,
  Phone,
  Clock,
  IndianRupee,
  Navigation,
} from "lucide-react";

interface AmbulanceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  vehicleType: string;
  vehicleRegistration: string;
  fare?: number;
  registeredAt: string;
  verified: boolean;
  status: string;
}

const mockAmbulances = [
  {
    id: "mock-1",
    driver: "Rajesh Kumar",
    vehicle: "Tata Ambulance - WB 01 AB 1234",
    distance: "2.3 km",
    eta: "8 mins",
    fare: "₹450",
    rating: 4.8,
    phone: "+91 98300 12345",
  },
  {
    id: "mock-2",
    driver: "Suresh Sharma",
    vehicle: "Force Ambulance - WB 02 CD 5678",
    distance: "3.1 km",
    eta: "12 mins",
    fare: "₹550",
    rating: 4.9,
    phone: "+91 98301 67890",
  },
  {
    id: "mock-3",
    driver: "Amit Das",
    vehicle: "Mahindra Ambulance - WB 03 EF 9012",
    distance: "4.5 km",
    eta: "15 mins",
    fare: "₹650",
    rating: 4.7,
    phone: "+91 98302 11223",
  },
];

export function AmbulanceSearch() {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [realProviders, setRealProviders] = useState<AmbulanceProvider[]>([]);

  // Fetch real ambulance providers on component mount
  useEffect(() => {
    const fetchAmbulanceProviders = async () => {
      try {
        const response = await fetch(
          "/supabase/functions/v1/make-server-9f89ce1e/providers/ambulance",
        );
        if (response.ok) {
          const data = await response.json();
          setRealProviders(data.providers || []);
        }
      } catch (error) {
        console.error("Failed to fetch ambulance providers:", error);
      }
    };

    fetchAmbulanceProviders();
  }, []);

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      // Combine real providers with mock data if no real providers exist
      const displayResults =
        realProviders.length > 0
          ? realProviders.map((provider) => ({
              id: provider.id,
              driver: provider.name,
              vehicle: `${provider.vehicleType} - ${provider.vehicleRegistration}`,
              distance: "Distance not available", // Would need location data
              eta: "ETA not available", // Would need location calculation
              fare: `₹${provider.fare || 450}`,
              rating: 4.8, // Default rating for new providers
              phone: provider.phone,
            }))
          : mockAmbulances;

      setResults(displayResults);
      setSearching(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-500 to-rose-600 text-white border-0 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Ambulance className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Emergency Ambulance</h2>
            <p className="text-sm opacity-90">Available 24/7 in Kolkata</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 text-white/90 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Pickup Location</span>
          </div>
          <Input
            placeholder="Enter your location or use GPS"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-12 rounded-lg"
          />
        </div>

        <Button
          onClick={handleSearch}
          disabled={searching || !pickupLocation}
          className="w-full bg-white text-red-600 hover:bg-slate-100 h-12 rounded-xl font-semibold shadow-lg"
        >
          {searching ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              Searching for ambulances...
            </div>
          ) : (
            <>
              <Navigation className="w-5 h-5 mr-2" />
              Find Nearest Ambulance
            </>
          )}
        </Button>

        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Quick Response</span>
          </div>
          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>Verified Drivers</span>
          </div>
        </div>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">
            Available Ambulances Near You
          </h3>

          {results.map((ambulance) => (
            <Card
              key={ambulance.id}
              className="p-5 hover:shadow-lg transition border-2 hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Ambulance className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-800">
                      {ambulance.driver}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {ambulance.vehicle}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(ambulance.rating)
                                ? "text-yellow-400"
                                : "text-slate-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-slate-600 ml-1">
                        {ambulance.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {ambulance.fare}
                  </div>
                  <div className="text-xs text-slate-500">Estimated</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Distance</span>
                  </div>
                  <div className="font-semibold text-slate-800">
                    {ambulance.distance}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">ETA</span>
                  </div>
                  <div className="font-semibold text-slate-800">
                    {ambulance.eta}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg">
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-lg border-2"
                  onClick={() => window.open(`tel:${ambulance.phone}`)}
                >
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {results.length === 0 && !searching && (
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ambulance className="w-10 h-10 text-slate-400" />
          </div>
          <p className="text-slate-600">
            Enter your location to find nearby ambulances
          </p>
        </Card>
      )}
    </div>
  );
}
