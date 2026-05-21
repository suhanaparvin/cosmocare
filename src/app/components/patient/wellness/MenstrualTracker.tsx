import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Calendar } from '@/app/components/ui/calendar';
import { Badge } from '@/app/components/ui/badge';
import { Calendar as CalendarIcon, TrendingUp, Heart, Droplet, Activity } from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';

const symptoms = [
  { id: 'cramps', label: 'Cramps', icon: '😣' },
  { id: 'bloating', label: 'Bloating', icon: '🎈' },
  { id: 'fatigue', label: 'Fatigue', icon: '😴' },
  { id: 'mood', label: 'Mood Swings', icon: '🎭' },
  { id: 'headache', label: 'Headache', icon: '🤕' }
];

const flowIntensity = [
  { id: 'light', label: 'Light', color: 'bg-pink-200' },
  { id: 'medium', label: 'Medium', color: 'bg-pink-400' },
  { id: 'heavy', label: 'Heavy', color: 'bg-pink-600' }
];

export function MenstrualTracker() {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date>(new Date(2026, 0, 1)); // Jan 1, 2026
  const [cycleLength] = useState(28);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<string>('medium');

  const nextPeriodDate = addDays(lastPeriodDate, cycleLength);
  const ovulationDate = addDays(lastPeriodDate, 14);
  const daysUntilNextPeriod = differenceInDays(nextPeriodDate, new Date());
  const daysUntilOvulation = differenceInDays(ovulationDate, new Date());

  const getCurrentPhase = () => {
    const dayInCycle = differenceInDays(new Date(), lastPeriodDate) % cycleLength;
    
    if (dayInCycle <= 5) {
      return { name: 'Menstrual', color: 'text-red-600', bg: 'bg-red-50' };
    } else if (dayInCycle <= 13) {
      return { name: 'Follicular', color: 'text-purple-600', bg: 'bg-purple-50' };
    } else if (dayInCycle <= 16) {
      return { name: 'Ovulation', color: 'text-green-600', bg: 'bg-green-50' };
    } else {
      return { name: 'Luteal', color: 'text-blue-600', bg: 'bg-blue-50' };
    }
  };

  const phase = getCurrentPhase();

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white border-0 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <CalendarIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Menstrual Cycle Tracker</h2>
            <p className="text-sm opacity-90">Track your cycle & symptoms</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-sm opacity-90 mb-1">Next Period</div>
            <div className="text-xl font-bold">{daysUntilNextPeriod} days</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-sm opacity-90 mb-1">Ovulation</div>
            <div className="text-xl font-bold">{daysUntilOvulation > 0 ? `${daysUntilOvulation} days` : 'Now'}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-sm opacity-90 mb-1">Cycle Length</div>
            <div className="text-xl font-bold">{cycleLength} days</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Calendar View</h3>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={lastPeriodDate}
              onSelect={(date) => date && setLastPeriodDate(date)}
              className="rounded-md border"
            />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Period Days</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Ovulation Window</span>
            </div>
          </div>
        </Card>

        {/* Current Phase */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Current Phase</h3>
          
          <div className={`${phase.bg} rounded-2xl p-6 mb-6`}>
            <div className={`text-2xl font-bold ${phase.color} mb-2`}>
              {phase.name} Phase
            </div>
            <p className="text-sm text-slate-700">
              {phase.name === 'Menstrual' && 'Your period is here. Rest and stay hydrated.'}
              {phase.name === 'Follicular' && 'Energy levels rising. Great time for new activities!'}
              {phase.name === 'Ovulation' && 'Peak fertility window. High energy and mood.'}
              {phase.name === 'Luteal' && 'Prepare for your period. Focus on self-care.'}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="font-semibold text-slate-800">Wellness Tips</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Stay hydrated - drink 8 glasses of water</li>
                <li>✓ Eat iron-rich foods like spinach & lentils</li>
                <li>✓ Light exercise can reduce cramps</li>
                <li>✓ Get 7-8 hours of quality sleep</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-slate-800">Exercise Recommendation</span>
              </div>
              <p className="text-sm text-slate-600">
                {phase.name === 'Menstrual' && 'Gentle yoga, walking, stretching'}
                {phase.name === 'Follicular' && 'High-intensity workouts, strength training'}
                {phase.name === 'Ovulation' && 'Peak performance - any intense exercise'}
                {phase.name === 'Luteal' && 'Moderate cardio, pilates, swimming'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Symptom Logger */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Today's Symptoms</h3>
        
        <div className="space-y-6">
          <div>
            <div className="text-sm font-semibold text-slate-700 mb-3">
              How are you feeling?
            </div>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`px-4 py-2 rounded-xl border-2 transition ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-slate-200 bg-white hover:border-pink-200'
                  }`}
                >
                  <span className="mr-2">{symptom.icon}</span>
                  <span className="text-sm font-medium">{symptom.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Droplet className="w-4 h-4" />
              Flow Intensity
            </div>
            <div className="flex gap-3">
              {flowIntensity.map((flow) => (
                <button
                  key={flow.id}
                  onClick={() => setSelectedFlow(flow.id)}
                  className={`flex-1 py-3 rounded-xl border-2 transition ${
                    selectedFlow === flow.id
                      ? 'border-pink-500 shadow-md'
                      : 'border-slate-200 hover:border-pink-200'
                  }`}
                >
                  <div className={`w-8 h-8 ${flow.color} rounded-full mx-auto mb-2`}></div>
                  <div className="text-sm font-medium">{flow.label}</div>
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl">
            Save Today's Log
          </Button>
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-slate-800">Cycle Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-slate-600 mb-1">Average Cycle</div>
            <div className="text-2xl font-bold text-purple-600">28 days</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Period Duration</div>
            <div className="text-2xl font-bold text-pink-600">5 days</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Regularity</div>
            <Badge className="bg-green-100 text-green-700 text-lg px-3 py-1">Regular</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
