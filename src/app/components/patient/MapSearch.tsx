import { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  Search,
  MapPin,
  List,
  Map as MapIcon,
  Navigation,
  Building2,
  Droplet,
  Ambulance,
  Microscope,
  Stethoscope,
  Pill,
  Phone,
  Star,
  Locate,
  Clock,
  Car,
  Footprints,
  TrendingUp,
  Filter,
  CheckCircle2,
  Shield,
  MessageSquare,
  Route,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Textarea } from '@/app/components/ui/textarea';
import { toast } from 'sonner';

type ServiceType = 'hospital' | 'blood-bank' | 'ambulance' | 'pathology' | 'doctor' | 'pharmacy';
type SortBy = 'distance' | 'rating' | 'availability';
type TravelMode = 'driving' | 'walking';

interface Service {
  id: number;
  name: string;
  type: ServiceType;
  address: string;
  distance: number; // in km
  lat: number;
  lng: number;
  rating: number;
  phone: string;
  available: boolean;
  specialties?: string[];
  openNow: boolean;
  reviews: number;
  services: string[];
  drivingTime?: number; // in minutes
  walkingTime?: number; // in minutes
}

interface UserLocation {
  lat: number;
  lng: number;
  detected: boolean;
}

const mockServices: Service[] = [
  {
    id: 1,
    name: 'AMRI Hospitals Salt Lake',
    type: 'hospital',
    address: 'JC-16 & 17, Sector III, Salt Lake',
    distance: 2.3,
    lat: 22.5726,
    lng: 88.3639,
    rating: 4.7,
    phone: '+91 33 6606 3800',
    available: true,
    openNow: true,
    reviews: 342,
    services: ['Emergency', 'ICU', 'Cardiology'],
    drivingTime: 8,
    walkingTime: 28
  },
  {
    id: 2,
    name: 'Apollo Gleneagles Hospitals',
    type: 'hospital',
    address: '58, Canal Circular Road, Kolkata',
    distance: 4.1,
    lat: 22.5435,
    lng: 88.3735,
    rating: 4.8,
    phone: '+91 33 2320 3040',
    available: true,
    openNow: true,
    reviews: 521,
    services: ['Emergency', 'Cardiology', 'Neurology'],
    drivingTime: 15,
    walkingTime: 52
  },
  {
    id: 3,
    name: 'Fortis Hospital',
    type: 'hospital',
    address: '730, Anandapur, EM Bypass Road',
    distance: 5.2,
    lat: 22.5126,
    lng: 88.3890,
    rating: 4.6,
    phone: '+91 33 6628 4444',
    available: true,
    openNow: true,
    reviews: 418,
    services: ['Emergency', 'Orthopedics', 'ICU'],
    drivingTime: 18,
    walkingTime: 64
  },
  {
    id: 4,
    name: 'Red Cross Blood Bank',
    type: 'blood-bank',
    address: '37, Red Cross Place, Kolkata',
    distance: 3.5,
    lat: 22.5548,
    lng: 88.3503,
    rating: 4.5,
    phone: '+91 33 2237 8582',
    available: true,
    openNow: true,
    reviews: 189,
    services: ['Blood Donation', 'Emergency Blood'],
    drivingTime: 12,
    walkingTime: 42
  },
  {
    id: 5,
    name: 'Rotary Blood Bank',
    type: 'blood-bank',
    address: '8/1, Thakur Pukur Road',
    distance: 4.8,
    lat: 22.5334,
    lng: 88.3612,
    rating: 4.4,
    phone: '+91 33 2357 1211',
    available: false,
    openNow: false,
    reviews: 143,
    services: ['Blood Donation', 'Blood Testing'],
    drivingTime: 17,
    walkingTime: 58
  },
  {
    id: 6,
    name: 'Ziqitza Health Care (ZHL)',
    type: 'ambulance',
    address: 'Salt Lake Sector V',
    distance: 1.8,
    lat: 22.5726,
    lng: 88.4200,
    rating: 4.6,
    phone: '1298',
    available: true,
    openNow: true,
    reviews: 287,
    services: ['Emergency Transport', 'ICU Ambulance'],
    drivingTime: 6,
    walkingTime: 22
  },
  {
    id: 7,
    name: 'CATS Ambulance Service',
    type: 'ambulance',
    address: 'Park Street Area',
    distance: 3.2,
    lat: 22.5548,
    lng: 88.3503,
    rating: 4.7,
    phone: '+91 98300 57344',
    available: true,
    openNow: true,
    reviews: 312,
    services: ['Emergency Transport', 'Air Ambulance'],
    drivingTime: 11,
    walkingTime: 38
  },
  {
    id: 8,
    name: 'Thyrocare Technologies',
    type: 'pathology',
    address: 'Elgin Road, Kolkata',
    distance: 2.9,
    lat: 22.5496,
    lng: 88.3536,
    rating: 4.5,
    phone: '+91 33 4601 1600',
    available: true,
    openNow: true,
    reviews: 234,
    services: ['Blood Test', 'X-Ray', 'MRI'],
    drivingTime: 10,
    walkingTime: 35
  },
  {
    id: 9,
    name: 'Dr. Lal PathLabs',
    type: 'pathology',
    address: 'Ballygunge Circular Road',
    distance: 3.7,
    lat: 22.5355,
    lng: 88.3605,
    rating: 4.6,
    phone: '+91 33 2440 3330',
    available: true,
    openNow: true,
    reviews: 298,
    services: ['Diagnostic Tests', 'Home Collection'],
    drivingTime: 13,
    walkingTime: 45
  },
  {
    id: 10,
    name: 'SRL Diagnostics',
    type: 'pathology',
    address: 'Shakespeare Sarani',
    distance: 4.0,
    lat: 22.5495,
    lng: 88.3550,
    rating: 4.4,
    phone: '+91 33 4040 7575',
    available: false,
    openNow: false,
    reviews: 176,
    services: ['Pathology', 'Radiology'],
    drivingTime: 14,
    walkingTime: 48
  },
  {
    id: 11,
    name: 'Dr. Arindam Chakraborty',
    type: 'doctor',
    address: 'Park Street Clinic, Kolkata',
    distance: 2.5,
    lat: 22.5548,
    lng: 88.3550,
    rating: 4.8,
    phone: '+91 98300 12345',
    specialties: ['Cardiology', 'Internal Medicine'],
    openNow: true,
    available: true,
    reviews: 218,
    services: ['Consultation', 'ECG', 'Health Checkup'],
    drivingTime: 9,
    walkingTime: 30
  },
  {
    id: 12,
    name: 'Dr. Priya Sen',
    type: 'doctor',
    address: 'Salt Lake Clinic, Sector V',
    distance: 1.5,
    lat: 22.5735,
    lng: 88.4300,
    rating: 4.7,
    phone: '+91 98300 23456',
    specialties: ['Pediatrics'],
    openNow: true,
    available: true,
    reviews: 195,
    services: ['Pediatric Care', 'Vaccination'],
    drivingTime: 5,
    walkingTime: 18
  },
  {
    id: 13,
    name: 'Dr. Rajesh Kumar',
    type: 'doctor',
    address: 'Ballygunge Medical Centre',
    distance: 3.8,
    lat: 22.5355,
    lng: 88.3615,
    rating: 4.6,
    phone: '+91 98300 34567',
    specialties: ['Orthopedics', 'Sports Medicine'],
    openNow: false,
    available: false,
    reviews: 167,
    services: ['Orthopedic Surgery', 'Physiotherapy'],
    drivingTime: 13,
    walkingTime: 46
  },
  {
    id: 14,
    name: 'Apollo Pharmacy',
    type: 'pharmacy',
    address: 'Salt Lake Stadium Road',
    distance: 1.2,
    lat: 22.5626,
    lng: 88.3689,
    rating: 4.5,
    phone: '+91 33 2357 8888',
    available: true,
    openNow: true,
    reviews: 453,
    services: ['Medicines', 'Home Delivery'],
    drivingTime: 4,
    walkingTime: 15
  },
  {
    id: 15,
    name: 'MedPlus Pharmacy',
    type: 'pharmacy',
    address: 'Park Street, Kolkata',
    distance: 2.7,
    lat: 22.5548,
    lng: 88.3528,
    rating: 4.4,
    phone: '+91 33 2229 7777',
    available: true,
    openNow: true,
    reviews: 389,
    services: ['Medicines', 'Health Products'],
    drivingTime: 9,
    walkingTime: 32
  },
  {
    id: 16,
    name: 'Fortis Pharmacy',
    type: 'pharmacy',
    address: 'EM Bypass, Anandapur',
    distance: 5.3,
    lat: 22.5126,
    lng: 88.3895,
    rating: 4.6,
    phone: '+91 33 6628 5555',
    available: true,
    openNow: false,
    reviews: 267,
    services: ['Medicines', '24/7 Service'],
    drivingTime: 19,
    walkingTime: 66
  }
];

const serviceConfig = {
  hospital: {
    icon: Building2,
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    label: 'Hospitals',
    markerColor: '#9333ea'
  },
  'blood-bank': {
    icon: Droplet,
    color: 'bg-red-500',
    textColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Blood Banks',
    markerColor: '#ef4444'
  },
  ambulance: {
    icon: Ambulance,
    color: 'bg-orange-500',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    label: 'Ambulances',
    markerColor: '#f97316'
  },
  pathology: {
    icon: Microscope,
    color: 'bg-cyan-500',
    textColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    label: 'Pathology Labs',
    markerColor: '#06b6d4'
  },
  doctor: {
    icon: Stethoscope,
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    label: 'Doctors',
    markerColor: '#3b82f6'
  },
  pharmacy: {
    icon: Pill,
    color: 'bg-green-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Pharmacies',
    markerColor: '#10b981'
  }
};

export function MapSearch() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ServiceType | 'all'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>('distance');
  const [travelMode, setTravelMode] = useState<TravelMode>('driving');
  const [showRoute, setShowRoute] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 22.5726,
    lng: 88.3639,
    detected: false
  });
  const [ratingService, setRatingService] = useState<Service | null>(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [panelCollapsed, setPanelCollapsed] = useState(false);

  // Detect user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            detected: true
          });
          toast.success('Location detected successfully!');
        },
        () => {
          // Use default Kolkata location if detection fails
          toast.info('Using default location: Kolkata');
        }
      );
    }
  }, []);

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || service.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return a.distance - b.distance;
      case 'rating':
        return b.rating - a.rating;
      case 'availability':
        return (b.available ? 1 : 0) - (a.available ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleDirections = (service: Service) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${service.lat},${service.lng}`;
    window.open(url, '_blank');
  };

  const handleViewOnMap = (service: Service) => {
    setSelectedService(service);
    setViewMode('map');
    setShowRoute(true);
  };

  const handleSubmitRating = () => {
    if (!ratingService) return;
    if (ratingValue === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    toast.success('Rating submitted successfully!', {
      description: 'Thank you for your feedback'
    });
    setRatingService(null);
    setRatingValue(0);
    setReviewText('');
  };

  const ServiceCard = ({ service }: { service: Service }) => {
    const config = serviceConfig[service.type];
    const IconComponent = config.icon;
    const travelTime = travelMode === 'driving' ? service.drivingTime : service.walkingTime;

    return (
      <Card className={`p-4 hover:shadow-xl transition-all duration-300 border-2 ${config.borderColor} ${selectedService?.id === service.id ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}>
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 ${config.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
            <IconComponent className={`w-7 h-7 ${config.textColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-bold text-lg text-slate-800">{service.name}</h4>
              <Badge 
                variant={service.available ? 'default' : 'secondary'} 
                className={`shrink-0 text-xs ${service.available ? 'bg-green-500' : 'bg-gray-400'}`}
              >
                {service.available ? 'Available' : 'Busy'}
              </Badge>
            </div>
            
            {/* Rating with verified badge */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-slate-800">{service.rating}</span>
              </div>
              <span className="text-sm text-slate-600">
                (Based on {service.reviews} reviews)
              </span>
              <Badge variant="outline" className="text-[10px] bg-blue-50 border-blue-200 text-blue-700">
                <Shield className="w-3 h-3 mr-1" />
                Verified by Cosmocare Users
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">{service.address}</span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-sm">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-blue-600">{service.distance} km</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {travelMode === 'driving' ? (
                  <Car className="w-4 h-4 text-slate-600" />
                ) : (
                  <Footprints className="w-4 h-4 text-slate-600" />
                )}
                <span className="font-semibold text-slate-700">{travelTime} min</span>
              </div>
              {service.openNow && (
                <Badge className="bg-green-100 text-green-700 text-xs">
                  Open Now
                </Badge>
              )}
            </div>

            {/* Services offered */}
            <div className="flex flex-wrap gap-1 mb-3">
              {service.services.map((svc) => (
                <Badge key={svc} variant="outline" className="text-xs">
                  {svc}
                </Badge>
              ))}
            </div>

            {service.specialties && service.specialties.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {service.specialties.map((specialty) => (
                  <Badge key={specialty} className={`${config.bgColor} ${config.textColor} text-xs border-0`}>
                    {specialty}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-lg shadow-md"
                onClick={() => handleDirections(service)}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button
                variant="outline"
                className="h-10 px-3 rounded-lg border-2"
                onClick={() => handleViewOnMap(service)}
              >
                <Route className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="h-10 px-3 rounded-lg border-2"
                onClick={() => window.open(`tel:${service.phone}`)}
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Dialog open={ratingService === service} onOpenChange={(open) => !open && setRatingService(null)}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 px-3 rounded-lg border-2"
                    onClick={() => setRatingService(service)}
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Rate {service.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRatingValue(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-10 h-10 ${
                              star <= ratingValue
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Review (Optional)</label>
                      <Textarea
                        placeholder="Share your experience..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button
                      onClick={handleSubmitRating}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Rating
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const MapMarker = ({ service, onClick }: { service: Service; onClick: () => void }) => {
    const config = serviceConfig[service.type];
    const IconComponent = config.icon;
    const isSelected = selectedService?.id === service.id;
    
    return (
      <button
        onClick={onClick}
        className={`absolute transform -translate-x-1/2 -translate-y-full ${
          isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-10'
        } transition-all duration-300 ${config.color} rounded-full p-3 shadow-xl border-3 border-white cursor-pointer ${
          isSelected ? 'ring-4 ring-blue-500 animate-pulse' : ''
        }`}
        style={{
          left: `${((service.lng - 88.3) / 0.15) * 100}%`,
          top: `${((22.6 - service.lat) / 0.12) * 100}%`,
        }}
        title={service.name}
      >
        <IconComponent className="w-5 h-5 text-white" />
        {isSelected && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-semibold text-slate-800">
            {service.name}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Collapsible Search Header */}
      <Card className="p-4 sticky top-0 z-[1000] shadow-xl bg-white border-2 relative">
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setPanelCollapsed(!panelCollapsed)}
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-[1001] w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label={panelCollapsed ? "Expand panel" : "Collapse panel"}
        >
          {panelCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>

        <div className={`space-y-3 transition-all duration-500 overflow-hidden ${panelCollapsed ? 'max-h-0 opacity-0' : 'max-h-[800px] opacity-100'}`}>
          {/* Location Status */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Locate className={`w-5 h-5 ${userLocation.detected ? 'text-green-600' : 'text-slate-400'}`} />
              <div>
                <p className="text-xs text-slate-600">Current Location</p>
                <p className="text-sm font-bold text-slate-800">
                  {userLocation.detected ? 'Location Detected' : 'Kolkata, India'}
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search hospitals, doctors, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl border-slate-300"
            />
          </div>

          {/* View Toggle & Sort */}
          <div className="flex gap-2">
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg flex-1">
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                onClick={() => setViewMode('map')}
                className="flex-1 rounded-lg h-9"
                size="sm"
              >
                <MapIcon className="w-4 h-4 mr-1" />
                Map
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                className="flex-1 rounded-lg h-9"
                size="sm"
              >
                <List className="w-4 h-4 mr-1" />
                List
              </Button>
            </div>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
              <SelectTrigger className="w-[140px] h-11 rounded-lg">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Distance
                  </div>
                </SelectItem>
                <SelectItem value="rating">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Rating
                  </div>
                </SelectItem>
                <SelectItem value="availability">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Availability
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filters */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={selectedType === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedType('all')}
              className="rounded-lg text-xs h-10"
            >
              All Services
            </Button>
            {Object.entries(serviceConfig).map(([type, config]) => {
              const IconComponent = config.icon;
              return (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  onClick={() => setSelectedType(type as ServiceType)}
                  className="rounded-lg text-xs h-10"
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {config.label.split(' ')[0]}
                </Button>
              );
            })}
          </div>

          {/* Travel Mode Toggle */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
            <Button
              variant={travelMode === 'driving' ? 'default' : 'ghost'}
              onClick={() => setTravelMode('driving')}
              className="flex-1 rounded-lg h-9"
              size="sm"
            >
              <Car className="w-4 h-4 mr-2" />
              Driving
            </Button>
            <Button
              variant={travelMode === 'walking' ? 'default' : 'ghost'}
              onClick={() => setTravelMode('walking')}
              className="flex-1 rounded-lg h-9"
              size="sm"
            >
              <Footprints className="w-4 h-4 mr-2" />
              Walking
            </Button>
          </div>
        </div>

        {/* Collapsed State Summary - Only shown when collapsed */}
        {panelCollapsed && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Locate className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-bold text-slate-800">Map Search</p>
                <p className="text-xs text-slate-600">{sortedServices.length} services found</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {selectedType === 'all' ? 'All' : serviceConfig[selectedType as ServiceType]?.label} • {sortBy}
            </Badge>
          </div>
        )}
      </Card>

      {/* Results Count - Hide when panel collapsed in map view */}
      {!(viewMode === 'map' && panelCollapsed) && (
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-slate-600">
            Found <span className="font-bold text-blue-600">{sortedServices.length}</span> services nearby
          </p>
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            Sorted by {sortBy}
          </Badge>
        </div>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="space-y-4">
          {/* Interactive Map - Expand height when panel is collapsed */}
          <Card className="overflow-hidden border-2 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className={`relative w-full transition-all duration-500 ${panelCollapsed ? 'h-[calc(100vh-180px)]' : 'h-[600px]'}`}>
              {/* Map Background */}
              <div className="absolute inset-0 bg-white">
                <div className="w-full h-full relative">
                  {/* Enhanced street grid pattern */}
                  <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3b82f6" strokeWidth="1"/>
                      </pattern>
                      <pattern id="smallgrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#smallgrid)" />
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  
                  {/* Area labels with enhanced styling */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[20%] left-[30%] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-slate-600 text-xs font-bold shadow-md">
                      Park Street
                    </div>
                    <div className="absolute top-[35%] left-[60%] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-slate-600 text-xs font-bold shadow-md">
                      Salt Lake
                    </div>
                    <div className="absolute top-[55%] left-[45%] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-slate-600 text-xs font-bold shadow-md">
                      Ballygunge
                    </div>
                    <div className="absolute top-[70%] left-[65%] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-slate-600 text-xs font-bold shadow-md">
                      EM Bypass
                    </div>
                  </div>

                  {/* User Location Marker */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-40"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse">
                        <Locate className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>

                  {/* Route line (if service selected) */}
                  {selectedService && showRoute && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>
                      </defs>
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`${((selectedService.lng - 88.3) / 0.15) * 100}%`}
                        y2={`${((22.6 - selectedService.lat) / 0.12) * 100}%`}
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeDasharray="10,5"
                        markerEnd="url(#arrowhead)"
                        className="animate-pulse"
                      />
                    </svg>
                  )}
                  
                  {/* Service Markers */}
                  {sortedServices.map((service) => (
                    <MapMarker
                      key={service.id}
                      service={service}
                      onClick={() => {
                        setSelectedService(service);
                        setShowRoute(true);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Enhanced Legend */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-slate-200">
                <p className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Service Types
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(serviceConfig).map(([type, config]) => {
                    const IconComponent = config.icon;
                    const count = sortedServices.filter(s => s.type === type).length;
                    return (
                      <div key={type} className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${config.color} rounded-full flex items-center justify-center shadow-md`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-600 block">{config.label.split(' ')[0]}</span>
                          <span className="text-xs font-bold text-slate-800">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location info overlay */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-2xl border-2 border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Locate className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-600 block">You are here</span>
                    <span className="text-sm font-bold text-slate-800">Kolkata, India</span>
                  </div>
                </div>
              </div>

              {/* Travel mode indicator */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-2xl border-2 border-slate-200">
                <div className="flex items-center gap-2">
                  {travelMode === 'driving' ? (
                    <Car className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Footprints className="w-5 h-5 text-blue-600" />
                  )}
                  <span className="text-sm font-bold text-slate-800 capitalize">{travelMode} Mode</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Selected Service Details */}
          {selectedService && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Route className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-bold text-slate-800">Selected Service Details</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedService(null);
                    setShowRoute(false);
                  }}
                  className="h-8"
                >
                  Clear Selection
                </Button>
              </div>
              
              {/* Distance and time info card */}
              <Card className="p-4 mb-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-slate-600 mb-1">Distance</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedService.distance} km</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600 mb-1">
                      {travelMode === 'driving' ? 'Driving Time' : 'Walking Time'}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {travelMode === 'driving' ? selectedService.drivingTime : selectedService.walkingTime} min
                    </p>
                  </div>
                </div>
              </Card>

              <ServiceCard service={selectedService} />
            </div>
          )}

          {/* All Services List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800">All Nearby Services</p>
              <Badge variant="outline" className="text-xs">
                {sortedServices.length} results
              </Badge>
            </div>
            {sortedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {sortedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          {sortedServices.length === 0 && (
            <Card className="p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-2">No services found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}