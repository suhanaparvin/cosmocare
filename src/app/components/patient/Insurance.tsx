import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Shield, CheckCircle, TrendingUp, Users, Home } from 'lucide-react';

const insurancePlans = [
  {
    id: 1,
    name: 'Cosmo Health Basic',
    price: '₹5,000/yr',
    coverage: '₹5 Lakhs',
    features: [
      'Hospitalization',
      'Pre & Post hospitalization',
      'Daycare procedures',
      'Ambulance charges',
      'Room rent: Standard'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Cosmo Family Floater',
    price: '₹12,000/yr',
    coverage: '₹15 Lakhs',
    features: [
      'Family of 4',
      'Maternity coverage',
      'New born baby cover',
      'No claim bonus',
      'Room rent: Premium'
    ],
    popular: true
  },
  {
    id: 3,
    name: 'Senior Citizen Care',
    price: '₹18,000/yr',
    coverage: '₹25 Lakhs',
    features: [
      'Pre-existing conditions',
      'No medical tests',
      'Critical illness cover',
      'Home healthcare',
      'International treatment'
    ],
    popular: false
  }
];

export function Insurance() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white border-0 shadow-xl overflow-hidden">
        <div className="p-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
            <Shield className="w-full h-full" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield className="w-9 h-9" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">CosmoCare Shield</h2>
                <p className="text-lg opacity-90">Comprehensive health insurance with cashless claims</p>
              </div>
            </div>

            <p className="text-lg mb-6 opacity-95">
              Cashless claims at 500+ hospitals in Kolkata. Get covered today!
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Building2 className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold mb-1">500+</div>
                <div className="text-sm opacity-90">Network Hospitals</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold mb-1">50K+</div>
                <div className="text-sm opacity-90">Policyholders</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold mb-1">98%</div>
                <div className="text-sm opacity-90">Claim Settlement</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Insurance Plans */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Choose Your Plan</h3>
          <Button variant="outline">Compare Plans</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insurancePlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'border-2 border-blue-500 shadow-xl'
                  : 'border-2 border-slate-200 hover:border-blue-300'
              } ${plan.popular ? 'ring-2 ring-blue-400' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>

                <h4 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h4>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{plan.price}</div>
                  <div className="text-sm text-slate-600">Coverage up to {plan.coverage}</div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full h-11 rounded-lg ${
                    selectedPlan === plan.id
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-slate-800 hover:bg-slate-900'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Why Choose CosmoCare Shield?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Cashless Treatment</h4>
              <p className="text-sm text-slate-600">Get treated without paying upfront at network hospitals</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">No Claim Bonus</h4>
              <p className="text-sm text-slate-600">Get 10% increase in sum insured every claim-free year</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Lifetime Renewability</h4>
              <p className="text-sm text-slate-600">Continue your coverage for life, no age limit</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Home Healthcare</h4>
              <p className="text-sm text-slate-600">Get medical care at home for certain conditions</p>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA */}
      {selectedPlan && (
        <Card className="p-6 bg-blue-50 border-2 border-blue-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Ready to get covered?</h3>
              <p className="text-slate-600">
                You've selected <span className="font-bold">{insurancePlans.find(p => p.id === selectedPlan)?.name}</span>
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

function Building2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
