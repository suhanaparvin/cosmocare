import { User } from '@/app/App';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { 
  Shield, 
  LogOut, 
  Users, 
  TrendingUp, 
  FileText, 
  CheckCircle,
  XCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface InsuranceDashboardProps {
  user: User;
  onLogout: () => void;
}

const mockClaims = [
  {
    id: 'CLM001',
    patientName: 'Rajesh Kumar',
    hospital: 'AMRI Hospital',
    date: '2026-01-14',
    amount: '₹45,000',
    status: 'pending',
    type: 'Hospitalization'
  },
  {
    id: 'CLM002',
    patientName: 'Priya Sharma',
    hospital: 'Apollo Gleneagles',
    date: '2026-01-12',
    amount: '₹12,500',
    status: 'approved',
    type: 'Surgery'
  },
  {
    id: 'CLM003',
    patientName: 'Amit Das',
    hospital: 'Fortis Hospital',
    date: '2026-01-10',
    amount: '₹8,000',
    status: 'rejected',
    type: 'Lab Tests'
  }
];

export function InsuranceDashboard({ user, onLogout }: InsuranceDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm opacity-90">Insurance Provider Dashboard</div>
              <div className="font-semibold">Welcome, {user.name}</div>
            </div>
          </div>
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

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold mb-1">2,450</div>
            <div className="text-sm opacity-90">Active Policies</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold mb-1">156</div>
            <div className="text-sm opacity-90">Approved Claims</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold mb-1">24</div>
            <div className="text-sm opacity-90">Pending Claims</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold mb-1">₹45L</div>
            <div className="text-sm opacity-90">Monthly Premium</div>
          </Card>
        </div>

        {/* Recent Claims */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Recent Claims</h2>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {mockClaims.map((claim) => (
              <div
                key={claim.id}
                className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-slate-800">{claim.patientName}</h3>
                      <Badge
                        className={
                          claim.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : claim.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {claim.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {claim.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {claim.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600">
                      {claim.hospital} • {claim.type}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{claim.amount}</div>
                    <div className="text-xs text-slate-500">{claim.id}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="text-sm text-slate-600">
                    Filed on: {new Date(claim.date).toLocaleDateString('en-IN')}
                  </div>
                  <div className="flex gap-2">
                    {claim.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                          Reject
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
