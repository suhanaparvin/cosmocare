import { useState, useRef, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Send, Smile, Frown, Meh, AlertTriangle, Phone, UserCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const moodEmojis = [
  { icon: Smile, label: 'Happy', color: 'text-green-500' },
  { icon: Meh, label: 'Okay', color: 'text-yellow-500' },
  { icon: Frown, label: 'Sad', color: 'text-blue-500' }
];

const crisisKeywords = ['suicide', 'kill myself', 'end life', 'no reason to live', 'want to die', 'harm myself'];

const responses = {
  greeting: "Hi! I'm here to support your mental wellness. How are you feeling today?",
  happy: "That's wonderful to hear! 🌟 What's making you feel good today?",
  sad: "I'm sorry you're feeling down. Remember, it's okay to feel this way. Would you like to try a breathing exercise or talk about what's bothering you?",
  breathing: "Let's do a simple breathing exercise:\n\n1. Breathe in slowly for 4 counts\n2. Hold for 4 counts\n3. Breathe out for 4 counts\n4. Repeat 5 times\n\nTake your time, I'm here with you. 🌸",
  affirmation: "Here's an affirmation for you:\n\n'I am strong, capable, and worthy of love and respect. My feelings are valid, and I give myself permission to feel them.'\n\n💙",
  mindfulness: "Try this mindfulness exercise:\n\nName 5 things you can see\n4 things you can touch\n3 things you can hear\n2 things you can smell\n1 thing you can taste\n\nThis helps ground you in the present moment. 🧘‍♀️",
  default: "I'm here to listen. Would you like to:\n• Try a breathing exercise\n• Hear an affirmation\n• Practice mindfulness\n• Connect with a professional"
};

export function MentalHealthChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: responses.greeting,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkForCrisisKeywords = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return crisisKeywords.some(keyword => lowerText.includes(keyword));
  };

  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('breathing') || lowerText.includes('breathe')) {
      return responses.breathing;
    }
    if (lowerText.includes('affirmation') || lowerText.includes('positive')) {
      return responses.affirmation;
    }
    if (lowerText.includes('mindfulness') || lowerText.includes('exercise')) {
      return responses.mindfulness;
    }
    if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('good')) {
      return responses.happy;
    }
    if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('anxious')) {
      return responses.sad;
    }
    
    return responses.default;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Check for crisis keywords
    if (checkForCrisisKeywords(inputText)) {
      setShowCrisisModal(true);
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText('');
  };

  const handleMoodSelect = (mood: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: `I'm feeling ${mood.toLowerCase()}`,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: mood === 'Happy' ? responses.happy : responses.sad,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div>
      <Card className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 text-white border-0 shadow-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <UserCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Mental Health Companion</h2>
            <p className="text-sm opacity-90">Your safe space to express yourself</p>
          </div>
        </div>
        <p className="text-sm opacity-90">
          I'm here to listen and support you. Share your feelings, practice mindfulness, or just chat. 💜
        </p>
      </Card>

      <Card className="h-[500px] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Mood Selection */}
        {messages.length === 1 && (
          <div className="p-4 border-t bg-slate-50">
            <p className="text-sm text-slate-600 mb-3 text-center">How are you feeling?</p>
            <div className="flex justify-center gap-4">
              {moodEmojis.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.label}
                    onClick={() => handleMoodSelect(mood.label)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white transition"
                  >
                    <Icon className={`w-8 h-8 ${mood.color}`} />
                    <span className="text-xs font-medium text-slate-700">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 h-12 rounded-xl"
            />
            <Button
              onClick={handleSendMessage}
              className="h-12 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Crisis Modal */}
      <Dialog open={showCrisisModal} onOpenChange={setShowCrisisModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              Immediate Support Available
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-700">
              We're here for you. Please reach out to a professional who can provide immediate support:
            </p>

            <Card className="p-4 bg-red-50 border-red-200">
              <div className="font-bold text-red-900 mb-2">Emergency Helplines (Kolkata)</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>National Emergency: <strong>112</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>AASRA Helpline: <strong>+91 98300 41010</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>Vandrevala Foundation: <strong>1860 2662 345</strong></span>
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => window.open('tel:112')}
                className="w-full bg-red-600 hover:bg-red-700 h-12"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency 112
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCrisisModal(false)}
                className="w-full h-12"
              >
                I'm Okay, Continue Chatting
              </Button>
            </div>

            <p className="text-xs text-slate-600 text-center">
              You're not alone. Professional help is available 24/7.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
