import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { Activity, Moon, TrendingUp, Target, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const weeklySteps = [
  { day: 'Mon', steps: 8500 },
  { day: 'Tue', steps: 12000 },
  { day: 'Wed', steps: 6500 },
  { day: 'Thu', steps: 10200 },
  { day: 'Fri', steps: 9800 },
  { day: 'Sat', steps: 15000 },
  { day: 'Sun', steps: 11500 }
];

const weeklySleep = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 6.5 },
  { day: 'Wed', hours: 8.0 },
  { day: 'Thu', hours: 7.0 },
  { day: 'Fri', hours: 6.0 },
  { day: 'Sat', hours: 8.5 },
  { day: 'Sun', hours: 7.5 }
];

export function FitnessTracker() {
  const [activeView, setActiveView] = useState<'steps' | 'sleep'>('steps');
  
  const todaySteps = 8756;
  const stepGoal = 10000;
  const stepProgress = (todaySteps / stepGoal) * 100;
  
  const todaySleep = 7.2;
  const sleepGoal = 8;
  const sleepProgress = (todaySleep / sleepGoal) * 100;

  const avgWeeklySteps = Math.round(weeklySteps.reduce((sum, day) => sum + day.steps, 0) / 7);
  const avgWeeklySleep = (weeklySleep.reduce((sum, day) => sum + day.hours, 0) / 7).toFixed(1);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white border-0 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Fitness Tracker</h2>
            <p className="text-sm opacity-90">Monitor your daily activity & sleep</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setActiveView('steps')}
            className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 transition ${
              activeView === 'steps' ? 'ring-2 ring-white' : ''
            }`}
          >
            <Activity className="w-6 h-6 mb-2" />
            <div className="text-sm opacity-90">Steps Today</div>
            <div className="text-2xl font-bold">{todaySteps.toLocaleString()}</div>
          </button>

          <button
            onClick={() => setActiveView('sleep')}
            className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 transition ${
              activeView === 'sleep' ? 'ring-2 ring-white' : ''
            }`}
          >
            <Moon className="w-6 h-6 mb-2" />
            <div className="text-sm opacity-90">Sleep Last Night</div>
            <div className="text-2xl font-bold">{todaySleep}h</div>
          </button>
        </div>
      </Card>

      {activeView === 'steps' && (
        <div className="space-y-6">
          {/* Steps Progress */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Today's Progress</h3>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                <span className="text-sm text-slate-600">Goal: {stepGoal.toLocaleString()}</span>
              </div>
            </div>

            <div className="relative">
              <div className="w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#10b981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - stepProgress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-green-600">
                    {Math.round(stepProgress)}%
                  </div>
                  <div className="text-sm text-slate-600">of goal</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {todaySteps.toLocaleString()}
                </div>
                <div className="text-slate-600">
                  {(stepGoal - todaySteps).toLocaleString()} steps to go
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(todaySteps * 0.0004).toFixed(1)}
                </div>
                <div className="text-xs text-slate-600">km walked</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(todaySteps * 0.04)}
                </div>
                <div className="text-xs text-slate-600">calories burned</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(todaySteps * 0.015)}
                </div>
                <div className="text-xs text-slate-600">active minutes</div>
              </div>
            </div>
          </Card>

          {/* Weekly Steps Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Weekly Activity</h3>
              <div className="text-sm text-slate-600">
                Avg: <span className="font-bold text-green-600">{avgWeeklySteps.toLocaleString()}</span> steps/day
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklySteps}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="steps" radius={[8, 8, 0, 0]}>
                  {weeklySteps.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.steps >= stepGoal ? '#10b981' : '#3b82f6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Achievements */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-slate-800">Achievements</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-3xl mb-1">🏃</div>
                <div className="text-xs text-slate-600">10K Steps</div>
                <div className="text-xs font-bold text-green-600">3 times</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-3xl mb-1">🔥</div>
                <div className="text-xs text-slate-600">7 Day Streak</div>
                <div className="text-xs font-bold text-orange-600">Active</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-3xl mb-1">⭐</div>
                <div className="text-xs text-slate-600">This Week</div>
                <div className="text-xs font-bold text-blue-600">Goal Met</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-3xl mb-1">🎯</div>
                <div className="text-xs text-slate-600">Total Steps</div>
                <div className="text-xs font-bold text-purple-600">250K+</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeView === 'sleep' && (
        <div className="space-y-6">
          {/* Sleep Progress */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Last Night's Sleep</h3>
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-slate-600">Goal: {sleepGoal}h</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {todaySleep}h
              </div>
              <Progress value={sleepProgress} className="h-3 mb-2" />
              <div className="text-sm text-slate-600">
                {sleepProgress >= 100 ? 'Great job! You met your goal 🎉' : `${(sleepGoal - todaySleep).toFixed(1)}h to reach your goal`}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-sm text-slate-600 mb-1">Sleep Quality</div>
                <div className="text-2xl font-bold text-blue-600">Good</div>
                <div className="text-xs text-slate-500 mt-1">85/100</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-sm text-slate-600 mb-1">Deep Sleep</div>
                <div className="text-2xl font-bold text-purple-600">2.5h</div>
                <div className="text-xs text-slate-500 mt-1">35% of total</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-sm text-slate-600 mb-1">REM Sleep</div>
                <div className="text-2xl font-bold text-green-600">1.8h</div>
                <div className="text-xs text-slate-500 mt-1">25% of total</div>
              </div>
            </div>
          </Card>

          {/* Weekly Sleep Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Weekly Sleep Pattern</h3>
              <div className="text-sm text-slate-600">
                Avg: <span className="font-bold text-blue-600">{avgWeeklySleep}h</span> per night
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklySleep}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {weeklySleep.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.hours >= sleepGoal ? '#10b981' : entry.hours >= 7 ? '#3b82f6' : '#ef4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Sleep Tips */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-800">Sleep Improvement Tips</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Maintain a consistent sleep schedule - go to bed and wake up at the same time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Avoid screens 1 hour before bedtime - blue light affects melatonin production</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Keep your bedroom cool (60-67°F / 15-19°C) for optimal sleep</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Limit caffeine after 2 PM and avoid heavy meals 3 hours before bed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Try relaxation techniques like deep breathing or meditation</span>
              </li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
