import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Textarea } from "@/app/components/ui/textarea";
import { User as UserType, UserRole } from "@/app/App";
import {
  Ambulance,
  Stethoscope,
  Building2,
  Pill,
  Microscope,
  Shield,
  Crown,
  Check,
  CreditCard,
  Smartphone,
} from "lucide-react";

interface PremiumRegistrationProps {
  role: UserRole;
  onComplete: (user: UserType) => void;
}

const roleConfig = {
  ambulance: {
    name: "Ambulance Driver",
    icon: Ambulance,
    fee: 99,
    gradient: "from-red-500 to-rose-600",
    fields: ["License Number", "Vehicle Type", "Vehicle Registration"],
  },
  doctor: {
    name: "Doctor",
    icon: Stethoscope,
    fee: 199,
    gradient: "from-blue-500 to-indigo-600",
    fields: [
      "Medical Degree",
      "Specialization",
      "Years of Experience",
      "Consultation Fee (₹)",
    ],
  },
  hospital: {
    name: "Hospital",
    icon: Building2,
    fee: 499,
    gradient: "from-purple-500 to-violet-600",
    fields: ["Hospital Name", "Address", "Number of Beds", "Emergency Contact"],
  },
  dispensary: {
    name: "Dispensary",
    icon: Pill,
    fee: 149,
    gradient: "from-orange-500 to-amber-600",
    fields: ["Business Name", "License Number", "Address", "Operating Hours"],
  },
  pathological: {
    name: "Pathological Centre",
    icon: Microscope,
    fee: 299,
    gradient: "from-cyan-500 to-teal-600",
    fields: ["Lab Name", "Accreditation", "Address", "Available Tests"],
  },
  insurance: {
    name: "Insurance Provider",
    icon: Shield,
    fee: 399,
    gradient: "from-teal-500 to-cyan-600",
    fields: [
      "Company Name",
      "License Number",
      "Coverage Types",
      "Contact Person",
    ],
  },
};

export function PremiumRegistration({
  role,
  onComplete,
}: PremiumRegistrationProps) {
  const [step, setStep] = useState<"form" | "premium" | "payment" | "success">(
    "form",
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");

  if (!role || role === "patient") return null;

  const config = roleConfig[role];
  const Icon = config.icon;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("premium");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare provider data based on role
      const providerData: any = {
        role,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      // Add role-specific fields
      if (role === "ambulance") {
        providerData.licenseNumber = formData.field1;
        providerData.vehicleType = formData.field2;
        providerData.vehicleRegistration = formData.field3;
        providerData.fare = 450; // Default fare
      } else if (role === "doctor") {
        providerData.medicalDegree = formData.field1;
        providerData.specialization = formData.field2;
        providerData.experience = formData.field3;
        providerData.consultationFee = parseInt(formData.field4) || 800;
      } else if (role === "hospital") {
        providerData.hospitalName = formData.name;
        providerData.address = formData.field2;
        providerData.beds = parseInt(formData.field3) || 20;
        providerData.emergencyContact = formData.field4;
        providerData.bloodStock = ["A+", "B+", "O+", "AB+"]; // Default blood stock
        providerData.insurance = ["HDFC Ergo", "Star Health"]; // Default insurance
      } else if (role === "dispensary") {
        providerData.businessName = formData.name;
        providerData.licenseNumber = formData.field2;
        providerData.address = formData.field3;
        providerData.operatingHours = formData.field4;
        providerData.deliveryTime = "30 mins";
        providerData.deliveryFee = 40;
        providerData.has24x7 = true;
      } else if (role === "pathological") {
        providerData.labName = formData.name;
        providerData.accreditation = formData.field2;
        providerData.address = formData.field3;
        providerData.availableTests = formData.field4
          .split(",")
          .map((test: string) => test.trim());
        providerData.turnaround = "24 hours";
        providerData.homeCollection = true;
      } else if (role === "insurance") {
        providerData.companyName = formData.name;
        providerData.licenseNumber = formData.field2;
        providerData.coverageTypes = formData.field3
          .split(",")
          .map((type: string) => type.trim());
        providerData.contactPerson = formData.field4;
        providerData.plans = [
          "Basic Health",
          "Family Floater",
          "Senior Citizen Care",
        ]; // Default plans
      }

      // Call backend API to register provider
      const response = await fetch(
        "/supabase/functions/v1/make-server-9f89ce1e/providers/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(providerData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to register provider");
      }

      const result = await response.json();
      console.log("Provider registered:", result);

      setStep("success");
      setTimeout(() => {
        onComplete({
          ...formData,
          role,
          id: result.provider.id,
        });
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      // For now, still proceed to success even if API fails
      setStep("success");
      setTimeout(() => {
        onComplete({
          ...formData,
          role,
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        {step === "form" && (
          <>
            <div className="text-center mb-8">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${config.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                {config.name} Registration
              </h1>
              <p className="text-slate-600">
                Fill in your details to join Cosmocare
              </p>
            </div>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-2">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-slate-700 font-semibold"
                  >
                    Full Name / Business Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-2 h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-slate-700 font-semibold"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-2 h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="phone"
                    className="text-slate-700 font-semibold"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-2 h-12 rounded-xl"
                    required
                  />
                </div>

                {config.fields.map((field, index) => (
                  <div key={index}>
                    <Label
                      htmlFor={`field${index + 1}`}
                      className="text-slate-700 font-semibold"
                    >
                      {field} *
                    </Label>
                    {field.includes("Address") || field.includes("Tests") ? (
                      <Textarea
                        id={`field${index + 1}`}
                        placeholder={`Enter ${field.toLowerCase()}`}
                        value={
                          formData[`field${index + 1}` as keyof typeof formData]
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`field${index + 1}`]: e.target.value,
                          })
                        }
                        className="mt-2 rounded-xl"
                        required
                      />
                    ) : (
                      <Input
                        id={`field${index + 1}`}
                        type="text"
                        placeholder={`Enter ${field.toLowerCase()}`}
                        value={
                          formData[`field${index + 1}` as keyof typeof formData]
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`field${index + 1}`]: e.target.value,
                          })
                        }
                        className="mt-2 h-12 rounded-xl"
                        required
                      />
                    )}
                  </div>
                ))}

                <Button
                  type="submit"
                  className={`w-full h-12 bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white rounded-xl font-semibold text-lg shadow-lg`}
                >
                  Continue to Premium Membership
                </Button>
              </form>
            </Card>
          </>
        )}

        {step === "premium" && (
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Premium Membership</h2>
              </div>

              <div className="text-4xl font-bold mb-6">
                ₹{config.fee}
                <span className="text-lg font-normal">/month</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>Featured listing in patient searches</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>Advanced analytics & insights dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>Secure payment gateway integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>Priority customer support (24/7)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>Verified badge on your profile</span>
                </div>
              </div>

              <Button
                onClick={() => setStep("payment")}
                className="w-full h-12 bg-white text-blue-600 hover:bg-slate-100 rounded-xl font-semibold text-lg"
              >
                Pay Now
              </Button>
            </Card>

            <Button
              variant="outline"
              onClick={() => setStep("form")}
              className="w-full"
            >
              Back to Form
            </Button>
          </div>
        )}

        {step === "payment" && (
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Complete Payment
            </h2>

            <div className="bg-slate-100 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Premium Membership</span>
                <span className="font-semibold">₹{config.fee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">GST (18%)</span>
                <span className="font-semibold">
                  ₹{Math.round(config.fee * 0.18)}
                </span>
              </div>
              <div className="border-t border-slate-300 mt-3 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">
                    ₹{Math.round(config.fee * 1.18)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <Button
                type="button"
                variant={paymentMethod === "upi" ? "default" : "outline"}
                onClick={() => setPaymentMethod("upi")}
                className="flex-1 h-12"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                UPI
              </Button>
              <Button
                type="button"
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="flex-1 h-12"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Card
              </Button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {paymentMethod === "upi" ? (
                <div>
                  <Label htmlFor="upi" className="text-slate-700 font-semibold">
                    UPI ID
                  </Label>
                  <Input
                    id="upi"
                    type="text"
                    placeholder="yourname@upi"
                    className="mt-2 h-12 rounded-xl"
                    required
                  />
                </div>
              ) : (
                <>
                  <div>
                    <Label
                      htmlFor="cardNumber"
                      className="text-slate-700 font-semibold"
                    >
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="mt-2 h-12 rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="expiry"
                        className="text-slate-700 font-semibold"
                      >
                        Expiry
                      </Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="mt-2 h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="cvv"
                        className="text-slate-700 font-semibold"
                      >
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="mt-2 h-12 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <Button
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white rounded-xl font-semibold text-lg shadow-lg mt-6`}
              >
                Pay ₹{Math.round(config.fee * 1.18)}
              </Button>
            </form>
          </Card>
        )}

        <Dialog open={step === "success"}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                Payment Successful!
              </DialogTitle>
            </DialogHeader>
            <div className="text-center text-slate-600">
              <p>Your premium membership is now active.</p>
              <p className="text-sm mt-2">Redirecting to dashboard...</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
