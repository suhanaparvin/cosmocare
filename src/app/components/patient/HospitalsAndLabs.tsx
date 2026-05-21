import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import {
  Building2,
  MapPin,
  Bed,
  Droplet,
  Microscope,
  Clock,
  Phone,
  Search,
} from "lucide-react";

interface HospitalProvider {
  id: string;
  hospitalName: string;
  address: string;
  beds: number;
  emergencyContact: string;
  bloodStock?: string[];
  insurance?: string[];
  registeredAt: string;
  verified: boolean;
  status: string;
}

interface LabProvider {
  id: string;
  labName: string;
  accreditation: string;
  address: string;
  availableTests: string[];
  turnaround?: string;
  homeCollection?: boolean;
  registeredAt: string;
  verified: boolean;
  status: string;
}

const mockHospitals = [
  {
    id: "mock-1",
    name: "AMRI Hospitals",
    type: "hospital",
    location: "Salt Lake, Kolkata",
    distance: "3.2 km",
    beds: 32,
    bloodStock: ["A+", "B+", "O+", "AB+"],
    insurance: ["HDFC Ergo", "Star Health"],
    rating: 4.7,
    phone: "+91 33 6606 3800",
  },
  {
    id: "mock-2",
    name: "Apollo Gleneagles",
    type: "hospital",
    location: "EM Bypass, Kolkata",
    distance: "5.1 km",
    beds: 18,
    bloodStock: ["A+", "O+", "AB-"],
    insurance: ["ICICI Lombard", "Max Bupa"],
    rating: 4.8,
    phone: "+91 33 2320 3040",
  },
  {
    id: "mock-3",
    name: "HealthCare Diagnostics",
    type: "lab",
    location: "Park Street, Kolkata",
    distance: "2.8 km",
    tests: ["CBC", "Thyroid", "Lipid Profile", "Blood Sugar"],
    turnaround: "24 hours",
    homeCollection: true,
    rating: 4.6,
    phone: "+91 33 2229 1234",
  },
  {
    id: "mock-4",
    name: "PathLab Centre",
    type: "lab",
    location: "Ballygunge, Kolkata",
    distance: "4.3 km",
    tests: ["X-Ray", "ECG", "Ultrasound", "MRI"],
    turnaround: "48 hours",
    homeCollection: true,
    rating: 4.5,
    phone: "+91 33 2440 5678",
  },
];

export function HospitalsAndLabs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "hospital" | "lab">("all");
  const [realHospitals, setRealHospitals] = useState<HospitalProvider[]>([]);
  const [realLabs, setRealLabs] = useState<LabProvider[]>([]);

  // Fetch real providers on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // Fetch hospitals
        const hospitalResponse = await fetch(
          "/supabase/functions/v1/make-server-9f89ce1e/providers/hospital",
        );
        if (hospitalResponse.ok) {
          const hospitalData = await hospitalResponse.json();
          setRealHospitals(hospitalData.providers || []);
        }

        // Fetch pathological labs
        const labResponse = await fetch(
          "/supabase/functions/v1/make-server-9f89ce1e/providers/pathological",
        );
        if (labResponse.ok) {
          const labData = await labResponse.json();
          setRealLabs(labData.providers || []);
        }
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      }
    };

    fetchProviders();
  }, []);

  // Combine real providers with mock data
  const allProviders = [
    // Real hospitals
    ...realHospitals.map((hospital) => ({
      id: hospital.id,
      name: hospital.hospitalName,
      type: "hospital" as const,
      location: hospital.address,
      distance: "Distance not available", // Would need location data
      beds: hospital.beds,
      bloodStock: hospital.bloodStock || ["A+", "B+", "O+", "AB+"],
      insurance: hospital.insurance || ["HDFC Ergo", "Star Health"],
      rating: 4.7, // Default rating for new providers
      phone: hospital.emergencyContact || "Contact not available",
    })),
    // Real labs
    ...realLabs.map((lab) => ({
      id: lab.id,
      name: lab.labName,
      type: "lab" as const,
      location: lab.address,
      distance: "Distance not available", // Would need location data
      tests: lab.availableTests,
      turnaround: lab.turnaround || "24 hours",
      homeCollection: lab.homeCollection || true,
      rating: 4.6, // Default rating for new providers
      phone: "Contact not available", // Would need phone field
    })),
    // Mock data as fallback
    ...mockHospitals,
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
            placeholder="Search hospitals, labs, or location..."
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
            variant={filter === "hospital" ? "default" : "outline"}
            onClick={() => setFilter("hospital")}
            className="flex-1 rounded-lg"
          >
            <Building2 className="w-4 h-4 mr-2" />
            Hospitals
          </Button>
          <Button
            variant={filter === "lab" ? "default" : "outline"}
            onClick={() => setFilter("lab")}
            className="flex-1 rounded-lg"
          >
            <Microscope className="w-4 h-4 mr-2" />
            Labs
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredResults.map((item) => (
          <Card
            key={item.id}
            className="p-5 hover:shadow-lg transition border-2 hover:border-purple-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 ${item.type === "hospital" ? "bg-purple-100" : "bg-cyan-100"} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  {item.type === "hospital" ? (
                    <Building2 className="w-6 h-6 text-purple-600" />
                  ) : (
                    <Microscope className="w-6 h-6 text-cyan-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg text-slate-800">
                      {item.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {item.type === "hospital" ? "Hospital" : "Lab"}
                    </Badge>
                  </div>
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
            </div>

            {item.type === "hospital" && "beds" in item && (
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Bed className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-600">Available Beds:</span>
                    <span className="font-semibold text-green-600">
                      {item.beds}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <Droplet className="w-4 h-4" />
                    <span>Blood Stock:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.bloodStock.map((blood) => (
                      <Badge
                        key={blood}
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200"
                      >
                        {blood}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-600 mb-2">
                    Insurance Accepted:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.insurance.map((ins) => (
                      <Badge
                        key={ins}
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {ins}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {item.type === "lab" && "tests" in item && (
              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-sm text-slate-600 mb-2">
                    Available Tests:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tests.map((test) => (
                      <Badge
                        key={test}
                        variant="outline"
                        className="bg-cyan-50 text-cyan-700 border-cyan-200"
                      >
                        {test}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-600">Turnaround:</span>
                    <span className="font-semibold">{item.turnaround}</span>
                  </div>
                  {item.homeCollection && (
                    <Badge className="bg-green-100 text-green-700">
                      Home Collection Available
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg">
                View Details
              </Button>
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
