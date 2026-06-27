export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  moq: number;
  priceRange: string; // e.g. "$1.50 - $3.00"
  material: string;
  ageGroup: string;
  description: string;
  images: string[];
  specs: {
    size: string;
    weight: string;
    certifications: string;
    oem_odm: string;
    port: string;
  };
  packaging: string;
  productionTime: string;
  isBestSeller: boolean;
  isTrending: boolean;
  isNewArrival: boolean;
  customizationOptions: string[];
  stock: number;
}

export interface InquiryItem {
  product: Product;
  quantity: number;
  customLogo: boolean;
  logoImage?: string;
  notes?: string;
}

export interface GiftBoxOrder {
  id: string;
  boxDesign: string;
  toyId: string;
  toyName: string;
  extras: string[]; // e.g. ["Chocolate", "Stickers"]
  message: {
    title: string;
    body: string;
  };
  giftWrap: string;
  recipientName: string;
  recipientAddress: string;
  deliveryDate: string;
  isSurprise: boolean;
  status: 'Pending' | 'Shipped' | 'Processing';
  date: string;
  price: number;
}

export interface Subscription {
  id: string;
  type: 'Monthly Toy Box' | 'Quarterly Box' | 'Collector Box';
  status: 'Active' | 'Inactive';
  price: number;
  startDate: string;
  nextDelivery: string;
}

export interface User {
  email: string;
  name: string;
  rewardPoints: number;
  company?: string;
  phone?: string;
}

export interface Inquiry {
  id: string;
  email: string;
  date: string;
  items: InquiryItem[];
  status: 'Pending' | 'Under Review' | 'Quoted' | 'Shipped';
  totalQuantity: number;
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  country: string;
  countryFlag: string;
  avatar: string;
  logoUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'MOQ' | 'Shipping' | 'OEM & ODM' | 'Quality & Customization';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
