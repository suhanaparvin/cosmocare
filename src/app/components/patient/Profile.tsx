import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { 
  User, 
  FileText, 
  Upload, 
  Heart, 
  Activity,
  Pill,
  AlertCircle,
  Calendar,
  Download,
  Shield,
  MessageCircle
} from 'lucide-react';

interface ProfileProps {
  userName: string;
  userEmail: string;
}

const mockMedicalHistory = [
  {
    id: 1,
    type: 'Lab Report',
    title: 'Blood Test Report',
    hospital: 'Apollo Labs',
    date: '2026-01-12',
    category: 'Laboratory'
  },
  {
    id: 2,
    type: 'Prescription',
    title: 'Prescription - Viral Fever',
    hospital: 'Dr. Arindam Roy',
    date: '2025-12-15',
    category: 'Prescription'
  },
  {
    id: 3,
    type: 'Surgery Report',
    title: 'Appendectomy Report',
    hospital: 'AMRI Hospital',
    date: '2025-08-20',
    category: 'Surgery'
  }
];

const mockPastConditions = [
  { condition: 'Asthma', diagnosedYear: '2015', status: 'Managed' },
  { condition: 'Type 2 Diabetes', diagnosedYear: '2020', status: 'Active' },
  { condition: 'Hypertension', diagnosedYear: '2018', status: 'Controlled' }
];

const mockAllergies = ['Penicillin', 'Peanuts', 'Shellfish'];
const mockCurrentMedications = [
  { name: 'Metformin 500mg', dosage: 'Twice daily', since: '2020' },
  { name: 'Lisinopril 10mg', dosage: 'Once daily', since: '2018' }
];

export function Profile({ userName, userEmail }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'history' | 'insurance'>('personal');
  const [showHistoryAssistant, setShowHistoryAssistant] = useState(false);
  const [chatQuery, setChatQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-1">{userName}</h2>
              <p className="opacity-90">{userEmail}</p>
              <div className="flex gap-2 mt-3">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                  Patient ID: PT2026001
                </Badge>
                <Badge className="bg-green-500 text-white border-0">
                  <Heart className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-white rounded-xl p-2 shadow-md">
        <Button
          variant={activeTab === 'personal' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('personal')}
          className="flex-1 rounded-lg"
        >
          <User className="w-4 h-4 mr-2" />
          Personal Details
        </Button>
        <Button
          variant={activeTab === 'history' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('history')}
          className="flex-1 rounded-lg"
        >
          <FileText className="w-4 h-4 mr-2" />
          Medical History
        </Button>
        <Button
          variant={activeTab === 'insurance' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('insurance')}
          className="flex-1 rounded-lg"
        >
          <Shield className="w-4 h-4 mr-2" />
          Insurance
        </Button>
      </div>

      {/* Personal Details Tab */}
      {activeTab === 'personal' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600 mb-1 block">Full Name</label>
                <Input defaultValue={userName} className="h-11" />
              </div>
              <div>
                <label className="text-sm text-slate-600 mb-1 block">Email</label>
                <Input defaultValue={userEmail} className="h-11" />
              </div>
              <div>
                <label className="text-sm text-slate-600 mb-1 block">Phone Number</label>
                <Input defaultValue="+91 98300 12345" className="h-11" />
              </div>
              <div>
                <label className="text-sm text-slate-600 mb-1 block">Date of Birth</label>
                <Input type="date" defaultValue="1990-05-15" className="h-11" />
              </div>
              <div>
                <label className="text-sm text-slate-600 mb-1 block">Blood Group</label>
                <Input defaultValue="A+" className="h-11" />
              </div>
              <div>
                <label className="text-sm text-slate-600 mb-1 block">Gender</label>
                <Input defaultValue="Female" className="h-11" />
              </div>
            </div>
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </Card>

          {/* Emergency Contact */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600 mb-1 block">Contact Name</label>
                <Input defaultValue="Ramesh Saha" className="h-11" />
              </div>
              <div>
                <label className="text-sm text-slate-600 mb-1 block">Relationship</label>
                <Input defaultValue="Father" className="h-11" />
              </div>
              <div>
                <label className="text-sm text-slate-600 mb-1 block">Phone Number</label>
                <Input defaultValue="+91 98300 99999" className="h-11" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Medical History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Upload Medical Records */}
          <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Upload Medical Records</h3>
              <p className="text-slate-600 mb-4">
                Drag & drop X-rays, prescriptions, or reports here. We'll digitize them instantly.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </Card>

          {/* History Assistant */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-xl">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">History Assistant</h3>
                      <p className="text-sm opacity-90">AI-powered medical history insights</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <p className="text-sm mb-2 opacity-90">Example queries:</p>
                    <ul className="text-sm space-y-1">
                      <li>"When was my last tetanus shot?"</li>
                      <li>"Show me my cholesterol trends."</li>
                      <li>"What medications was I on in 2023?"</li>
                    </ul>
                  </div>
                  {showHistoryAssistant && (
                    <div className="space-y-3">
                      <div className="bg-white/90 rounded-lg p-3 text-slate-800">
                        <p className="text-sm">Scanning your 12 uploaded documents...</p>
                      </div>
                      <Input
                        placeholder="Ask a question about your medical history..."
                        value={chatQuery}
                        onChange={(e) => setChatQuery(e.target.value)}
                        className="bg-white/90 text-slate-800 border-0 h-12"
                      />
                    </div>
                  )}
                  <Button
                    onClick={() => setShowHistoryAssistant(!showHistoryAssistant)}
                    className="bg-white text-blue-600 hover:bg-slate-100 mt-3"
                  >
                    {showHistoryAssistant ? 'Close Assistant' : 'Ask Question'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent History */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Recent History</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {mockMedicalHistory.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{record.title}</h4>
                      <p className="text-sm text-slate-600">{record.type} • {record.hospital}</p>
                      <p className="text-xs text-slate-500">{new Date(record.date).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Past Conditions */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              Past Medical Conditions
            </h3>
            <div className="space-y-3">
              {mockPastConditions.map((condition, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                >
                  <div>
                    <h4 className="font-bold text-slate-800">{condition.condition}</h4>
                    <p className="text-sm text-slate-600">Diagnosed: {condition.diagnosedYear}</p>
                  </div>
                  <Badge
                    className={
                      condition.status === 'Active'
                        ? 'bg-red-100 text-red-700'
                        : condition.status === 'Managed'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }
                  >
                    {condition.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Allergies */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Allergies
            </h3>
            <div className="flex flex-wrap gap-2">
              {mockAllergies.map((allergy, index) => (
                <Badge key={index} className="bg-orange-100 text-orange-700 px-4 py-2 text-sm">
                  {allergy}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Current Medications */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-500" />
              Current Medications
            </h3>
            <div className="space-y-3">
              {mockCurrentMedications.map((med, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                >
                  <div>
                    <h4 className="font-bold text-slate-800">{med.name}</h4>
                    <p className="text-sm text-slate-600">{med.dosage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Since {med.since}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Insurance Tab */}
      {activeTab === 'insurance' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Insurance Coverage</h3>
              <Button variant="outline">
                Update Insurance
              </Button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-800">Cosmo Family Floater</h4>
                  <p className="text-slate-600">Policy No: COS202600123</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-slate-600">Coverage</div>
                  <div className="text-xl font-bold text-blue-600">₹15 Lakhs</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Valid Until</div>
                  <div className="text-xl font-bold text-slate-800">Dec 31, 2026</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-700">
                  <span className="text-green-600 mr-2">✓</span>
                  Cashless claims at 500+ hospitals
                </div>
                <div className="flex items-center text-sm text-slate-700">
                  <span className="text-green-600 mr-2">✓</span>
                  Family of 4 covered
                </div>
                <div className="flex items-center text-sm text-slate-700">
                  <span className="text-green-600 mr-2">✓</span>
                  No claim bonus: 20%
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Claim History</h3>
            <div className="space-y-3">
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800">Hospitalization - Appendectomy</h4>
                  <Badge className="bg-green-100 text-green-700">Approved</Badge>
                </div>
                <p className="text-sm text-slate-600 mb-1">AMRI Hospital • Aug 20, 2025</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Claim Amount:</span>
                  <span className="text-lg font-bold text-blue-600">₹2,45,000</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
