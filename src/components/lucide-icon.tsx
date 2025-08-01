
'use client';

import * as icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// Create a mapping of icon names to components
export const iconMap = {
  Shirt: icons.Shirt,
  Watch: icons.Watch,
  ToyBrick: icons.ToyBrick,
  Utensils: icons.Utensils,
  Headset: icons.Headset,
  Smartphone: icons.Smartphone,
  Dices: icons.Dices,
  Computer: icons.Computer,
  Armchair: icons.Armchair,
  Baby: icons.Baby,
  Package: icons.Package,
  Heart: icons.Heart,
  ShoppingCart: icons.ShoppingCart,
  Search: icons.Search,
  User: icons.User,
  Menu: icons.Menu,
  X: icons.X,
  Plus: icons.Plus,
  Minus: icons.Minus,
  Trash2: icons.Trash2,
  ChevronDown: icons.ChevronDown,
  ChevronUp: icons.ChevronUp,
  ChevronLeft: icons.ChevronLeft,
  ChevronRight: icons.ChevronRight,
  Star: icons.Star,
  Rocket: icons.Rocket,
  RefreshCw: icons.RefreshCw,
  ShieldCheck: icons.ShieldCheck,
  MessageSquare: icons.MessageSquare,
};

export const iconList = Object.keys(iconMap) as (keyof typeof iconMap)[];

interface LucideIconProps extends LucideProps {
  name: keyof typeof iconMap;
}

const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Return a default icon or null if the name is not valid
    return <icons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};

export default LucideIcon;
