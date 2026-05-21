import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { HelpCircle, MessageCircle, Phone, BookOpen, Send } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book an ambulance?',
    answer: 'Go to the Ambulance tab, enter your location, and tap "Find Nearest Ambulance". You\'ll see available ambulances with their ETA and estimated fare. Select one and tap "Book Now".'
  },
  {
    question: 'How can I find a doctor?',
    answer: 'Navigate to the "Doctors & Dispensaries" tab, search by specialization or location, and you can book in-person or video consultations directly.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! We use end-to-end encryption for all your medical data. Your information is never shared without your explicit consent.'
  },
  {
    question: 'How do I donate blood?',
    answer: 'Go to the Blood Donation section and tap "Register to Donate". Fill in your details including blood group and location to join our donor network.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI, credit/debit cards, net banking, and digital wallets. All payments are processed through secure payment gateways.'
  }
];

export function HelpFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-30"
      >
        <HelpCircle className="w-7 h-7" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              Quick Support
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="faq" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">
                <BookOpen className="w-4 h-4 mr-2" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="chat">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="emergency">
                <Phone className="w-4 h-4 mr-2" />
                Emergency
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="flex-1 overflow-y-auto mt-4 space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">{faq.question}</h4>
                  <p className="text-sm text-slate-600">{faq.answer}</p>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="chat" className="flex-1 flex flex-col mt-4">
              <div className="flex-1 overflow-y-auto bg-slate-50 rounded-lg p-4 mb-4">
                <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                  <p className="text-sm text-slate-700">
                    👋 Hi! I'm here to help you. What can I assist you with today?
                  </p>
                  <span className="text-xs text-slate-500 mt-1 block">Support Bot • Just now</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="flex-1 mt-4 space-y-4">
              <Card className="p-4 bg-red-50 border-red-200">
                <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Emergency Helplines
                </h4>
                <div className="space-y-3">
                  <Button
                    onClick={() => window.open('tel:112')}
                    className="w-full bg-red-600 hover:bg-red-700 h-12 justify-start"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-bold">National Emergency</div>
                      <div className="text-xs opacity-90">112</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => window.open('tel:102')}
                    variant="outline"
                    className="w-full h-12 justify-start border-red-200"
                  >
                    <Phone className="w-5 h-5 mr-3 text-red-600" />
                    <div className="text-left">
                      <div className="font-bold">Ambulance Service</div>
                      <div className="text-xs text-slate-600">102</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => window.open('tel:+913323434177')}
                    variant="outline"
                    className="w-full h-12 justify-start border-red-200"
                  >
                    <Phone className="w-5 h-5 mr-3 text-red-600" />
                    <div className="text-left">
                      <div className="font-bold">Kolkata Police</div>
                      <div className="text-xs text-slate-600">+91 33 2343 4177</div>
                    </div>
                  </Button>
                </div>
              </Card>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3">Mental Health Support</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>AASRA Helpline</span>
                    <a href="tel:+919830041010" className="text-blue-600 font-semibold">
                      +91 98300 41010
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span>Vandrevala Foundation</span>
                    <a href="tel:18602662345" className="text-blue-600 font-semibold">
                      1860 266 2345
                    </a>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
