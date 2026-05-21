import { UserRole } from "@/app/App";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
  User,
  Ambulance,
  Stethoscope,
  Building2,
  Pill,
  Microscope,
  ArrowLeft,
  Crown,
  Shield,
} from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
  onBack: () => void;
}

const roles = [
  {
    id: "patient" as UserRole,
    name: "Patient",
    icon: User,
    description: "Access healthcare services",
    isPremium: false,
    fee: "Free",
    color: "green",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "ambulance" as UserRole,
    name: "Ambulance Driver",
    icon: Ambulance,
    description: "Provide emergency transport",
    isPremium: true,
    fee: "₹50/Drive",
    color: "red",
    gradient: "from-red-500 to-rose-600",
  },
  {
    id: "doctor" as UserRole,
    name: "Doctor",
    icon: Stethoscope,
    description: "Offer medical consultations",
    isPremium: true,
    fee: "₹99/Patient",
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "hospital" as UserRole,
    name: "Hospital",
    icon: Building2,
    description: "Manage facility & services",
    isPremium: true,
    fee: "₹499/month",
    color: "purple",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    id: "dispensary" as UserRole,
    name: "Dispensary / Pharmacy",
    icon: Pill,
    description: "Sell medicines & supplies",
    isPremium: true,
    fee: "₹20/Order",
    color: "orange",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: "pathological" as UserRole,
    name: "Pathological Centre",
    icon: Microscope,
    description: "Diagnostic & lab testing",
    isPremium: true,
    fee: "₹99/Test",
    color: "cyan",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    id: "insurance" as UserRole,
    name: "Insurance Provider",
    icon: Shield,
    description: "Health insurance services",
    isPremium: true,
    fee: "₹399/month",
    color: "blue",
    gradient: "from-blue-600 to-blue-700",
  },
];

export function RoleSelection({
  onRoleSelect,
  onBack,
}: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 py-8">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Button>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Join Cosmocare
          </h1>
          <p className="text-lg text-slate-600">
            Select your role to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300"
                onClick={() => onRoleSelect(role.id)}
              >
                {role.isPremium && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </div>
                )}

                <div className="p-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {role.name}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4">
                    {role.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span
                      className={`font-bold ${role.isPremium ? "text-blue-600" : "text-green-600"}`}
                    >
                      {role.fee}
                    </span>
                    <Button
                      size="sm"
                      className={`bg-gradient-to-r ${role.gradient} hover:opacity-90 text-white`}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Crown className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">
                About Premium Membership
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Premium roles get exclusive benefits including
                priority visibility in patient searches,
                detailed analytics dashboard, secure payment
                processing, and dedicated support.
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Featured listing in searches</li>
                <li>✓ Advanced analytics & insights</li>
                <li>✓ Priority customer support</li>
                <li>✓ Secure payment gateway integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}