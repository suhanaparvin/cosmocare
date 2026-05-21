import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Brain, Calendar, Activity } from 'lucide-react';
import { MentalHealthChatbot } from '@/app/components/patient/wellness/MentalHealthChatbot';
import { MenstrualTracker } from '@/app/components/patient/wellness/MenstrualTracker';
import { FitnessTracker } from '@/app/components/patient/wellness/FitnessTracker';

export function WellnessHub() {
  const [activeSection, setActiveSection] = useState<'mental' | 'menstrual' | 'fitness'>('mental');

  const sections = [
    {
      id: 'mental' as const,
      name: 'Mental Health',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Chat with our AI wellness companion'
    },
    {
      id: 'menstrual' as const,
      name: 'Cycle Tracker',
      icon: Calendar,
      gradient: 'from-pink-500 to-rose-500',
      description: 'Track your menstrual health'
    },
    {
      id: 'fitness' as const,
      name: 'Fitness Tracker',
      icon: Activity,
      gradient: 'from-green-500 to-emerald-500',
      description: 'Monitor steps & sleep'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-5 cursor-pointer transition-all duration-300 ${
                activeSection === section.id
                  ? 'border-2 border-blue-500 shadow-lg'
                  : 'hover:shadow-md hover:border-slate-300 border-2 border-transparent'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${section.gradient} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-1">
                {section.name}
              </h3>
              <p className="text-sm text-slate-600">
                {section.description}
              </p>
            </Card>
          );
        })}
      </div>

      <div>
        {activeSection === 'mental' && <MentalHealthChatbot />}
        {activeSection === 'menstrual' && <MenstrualTracker />}
        {activeSection === 'fitness' && <FitnessTracker />}
      </div>
    </div>
  );
}
