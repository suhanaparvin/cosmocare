import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import {
  Stethoscope,
  Pill,
  MapPin,
  Clock,
  Phone,
  Search,
  Video,
  Calendar,
  Truck,
} from "lucide-react";

interface DoctorProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  medicalDegree: string;
  specialization: string;
  experience: string;
  consultationFee: number;
  registeredAt: string;
  verified: boolean;
  status: string;
}

interface DispensaryProvider {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  address: string;
  operatingHours: string;
  deliveryTime?: string;
  deliveryFee?: number;
  has24x7?: boolean;
  registeredAt: string;
  verified: boolean;
  status: string;
}

const mockDoctors = [
  {
    id: "mock-1",
    type: "doctor",
    name: "Dr. Anindita Sen",
    specialization: "Cardiologist",
    experience: "15 years",
    location: "Park Street, Kolkata",
    distance: "2.1 km",
    fee: "₹800",
    rating: 4.9,
    nextSlot: "Today 4:00 PM",
    videoConsult: true,
    phone: "+91 98300 11111",
  },
  {
    id: "mock-2",
    type: "doctor",
    name: "Dr. Rahul Chatterjee",
    specialization: "Pediatrician",
    experience: "12 years",
    location: "Salt Lake, Kolkata",
    distance: "3.5 km",
    fee: "₹600",
    rating: 4.8,
    nextSlot: "Tomorrow 10:00 AM",
    videoConsult: true,
    phone: "+91 98300 22222",
  },
  {
    id: "mock-3",
    type: "dispensary",
    name: "MediPlus Pharmacy",
    location: "Gariahat, Kolkata",
    distance: "1.8 km",
    rating: 4.7,
    deliveryTime: "30 mins",
    deliveryFee: "₹40",
    has24x7: true,
    phone: "+91 98300 33333",
  },
  {
    id: 4,
    type: "dispensary",
    name: "Apollo Pharmacy",
    location: "EM Bypass, Kolkata",
    distance: "4.2 km",
    rating: 4.6,
    deliveryTime: "45 mins",
    deliveryFee: "₹50",
    has24x7: true,
    phone: "+91 98300 44444",
  },
];

export function DoctorsAndDispensaries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "doctor" | "dispensary">("all");
  const [realDoctors, setRealDoctors] = useState<DoctorProvider[]>([]);
  const [realDispensaries, setRealDispensaries] = useState<
    DispensaryProvider[]
  >([]);

  // Fetch real providers on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // Fetch doctors
        const doctorResponse = await fetch(
          "/supabase/functions/v1/make-server-9f89ce1e/providers/doctor",
        );
        if (doctorResponse.ok) {
          const doctorData = await doctorResponse.json();
          setRealDoctors(doctorData.providers || []);
        }

        // Fetch dispensaries
        const dispensaryResponse = await fetch(
          "/supabase/functions/v1/make-server-9f89ce1e/providers/dispensary",
        );
        if (dispensaryResponse.ok) {
          const dispensaryData = await dispensaryResponse.json();
          setRealDispensaries(dispensaryData.providers || []);
        }
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      }
    };

    fetchProviders();
  }, []);

  // Combine real providers with mock data
  const allProviders = [
    // Real doctors
    ...realDoctors.map((doctor) => ({
      id: doctor.id,
      type: "doctor" as const,
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      location: "Location not available", // Would need address field
      distance: "Distance not available", // Would need location data
      fee: `₹${doctor.consultationFee}`,
      rating: 4.8, // Default rating for new providers
      nextSlot: "Next available slot", // Would need scheduling data
      videoConsult: true, // Default to true for new providers
      phone: doctor.phone,
    })),
    // Real dispensaries
    ...realDispensaries.map((dispensary) => ({
      id: dispensary.id,
      type: "dispensary" as const,
      name: dispensary.businessName,
      location: dispensary.address,
      distance: "Distance not available", // Would need location data
      rating: 4.7, // Default rating for new providers
      deliveryTime: dispensary.deliveryTime || "30 mins",
      deliveryFee: `₹${dispensary.deliveryFee || 40}`,
      has24x7: dispensary.has24x7 || true,
      phone: dispensary.phone,
    })),
    // Mock data as fallback
    ...mockDoctors,
  ];

  const filteredResults = allProviders.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search doctors, pharmacies, or medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl border-slate-300"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="flex-1 rounded-lg"
          >
            All
          </Button>
          <Button
            variant={filter === "doctor" ? "default" : "outline"}
            onClick={() => setFilter("doctor")}
            className="flex-1 rounded-lg"
          >
            <Stethoscope className="w-4 h-4 mr-2" />
            Doctors
          </Button>
          <Button
            variant={filter === "dispensary" ? "default" : "outline"}
            onClick={() => setFilter("dispensary")}
            className="flex-1 rounded-lg"
          >
            <Pill className="w-4 h-4 mr-2" />
            Pharmacies
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredResults.map((item) => (
          <Card
            key={item.id}
            className="p-5 hover:shadow-lg transition border-2 hover:border-blue-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 ${item.type === "doctor" ? "bg-blue-100" : "bg-orange-100"} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  {item.type === "doctor" ? (
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Pill className="w-6 h-6 text-orange-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg text-slate-800">
                      {item.name}
                    </h4>
                    {item.type === "doctor" &&
                      "videoConsult" in item &&
                      item.videoConsult && (
                        <Badge className="bg-green-100 text-green-700">
                          <Video className="w-3 h-3 mr-1" />
                          Video
                        </Badge>
                      )}
                  </div>
                  {item.type === "doctor" && "specialization" in item && (
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      {item.specialization} • {item.experience}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                    <span className="text-blue-600">• {item.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.floor(item.rating)
                              ? "text-yellow-400"
                              : "text-slate-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-slate-600 ml-1">
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>
              {item.type === "doctor" && "fee" in item && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {item.fee}
                  </div>
                  <div className="text-xs text-slate-500">Consultation</div>
                </div>
              )}
            </div>

            {item.type === "doctor" && "nextSlot" in item && (
              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span className="text-slate-600">Next Available:</span>
                  <span className="font-semibold text-green-600">
                    {item.nextSlot}
                  </span>
                </div>
              </div>
            )}

            {item.type === "dispensary" && "deliveryTime" in item && (
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-600">Delivery:</span>
                    <span className="font-semibold">{item.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-600">Fee:</span>
                    <span className="font-semibold">{item.deliveryFee}</span>
                  </div>
                </div>
                {"has24x7" in item && item.has24x7 && (
                  <Badge className="bg-blue-100 text-blue-700">Open 24/7</Badge>
                )}
              </div>
            )}

            <div className="flex gap-3">
              {item.type === "doctor" ? (
                <>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                  {"videoConsult" in item && item.videoConsult && (
                    <Button
                      variant="outline"
                      className="flex-1 h-11 rounded-lg border-2"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Video Consult
                    </Button>
                  )}
                </>
              ) : (
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-11 rounded-lg">
                  <Pill className="w-4 h-4 mr-2" />
                  Order Medicines
                </Button>
              )}
              <Button
                variant="outline"
                className="h-11 rounded-lg border-2"
                onClick={() => window.open(`tel:${item.phone}`)}
              >
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
