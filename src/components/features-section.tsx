import { Rocket, RefreshCw, ShieldCheck, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: <Rocket size={40} className="text-primary" />,
    title: 'Free Shipping',
    description: 'For all orders over $200',
  },
  {
    icon: <RefreshCw size={40} className="text-primary" />,
    title: '1 & 1 Returns',
    description: 'Cancellation after 1 day',
  },
  {
    icon: <ShieldCheck size={40} className="text-primary" />,
    title: '100% Secure Payments',
    description: 'Guarantee secure payments',
  },
  {
    icon: <MessageSquare size={40} className="text-primary" />,
    title: '24/7 Dedicated Support',
    description: 'Anywhere & anytime',
  },
];

export default function FeaturesSection() {
  return (
    <div className="bg-secondary/50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div>{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
