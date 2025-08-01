
import type { Product, HeroSlide, SideBanner, GoogleFormSettings, HomepageSection, CategoryItem, AdBannerData, AboutPageContent, BlogPost, ContactPageContent } from './types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Leather Wallet',
    description: 'A timeless leather wallet with a sleek design. Made from genuine full-grain leather, it features multiple card slots, a clear ID window, and a spacious bill compartment. Perfect for everyday use.',
    price: 75.00,
    image: 'https://placehold.co/600x400.png',
    category: 'Gadgets',
  },
  {
    id: '2',
    name: 'Minimalist Wrist Watch',
    description: 'This elegant watch features a clean, minimalist face with a stainless steel case and a comfortable leather strap. Its Japanese quartz movement ensures accurate timekeeping. Water-resistant and built to last.',
    price: 120.00,
    image: 'https://placehold.co/600x400.png',
    category: 'Watches',
  },
  {
    id: '3',
    name: 'Canvas Travel Backpack',
    description: 'A durable and stylish backpack for your adventures. Made from heavy-duty waxed canvas, it has a large main compartment, a padded laptop sleeve, and multiple pockets for organization. Ideal for travel or daily commutes.',
    price: 95.00,
    image: 'https://placehold.co/600x400.png',
    category: 'Clothes',
  },
  {
    id: '4',
    name: 'Gourmet Coffee Beans',
    description: 'Experience the rich aroma and flavor of our single-origin Arabica coffee beans. Sourced from the highlands of Colombia, these beans are medium-roasted to perfection, offering notes of chocolate and citrus.',
    price: 22.50,
    image: 'https://placehold.co/600x400.png',
    category: 'Kitchen',
  },
  {
    id: '5',
    name: 'Wireless Bluetooth Earbuds',
    description: 'Enjoy crystal-clear audio with these true wireless earbuds. They offer up to 8 hours of playtime, a compact charging case, and intuitive touch controls. Ergonomically designed for a secure and comfortable fit.',
    price: 89.99,
    image: 'https://placehold.co/600x400.png',
    category: 'Headsets',
  },
  {
    id: '6',
    name: 'Artisan Scented Candle',
    description: 'Create a relaxing atmosphere with our hand-poured soy wax candle. Infused with natural essential oils, this candle provides a clean, long-lasting burn with a soothing lavender and vanilla scent.',
    price: 25.00,
    image: 'https://placehold.co/600x400.png',
    category: 'Furniture',
  },
];

export const initialHeroSlides: HeroSlide[] = [
  {
    id: '1',
    supertitle: '30% SALE OFF',
    title: 'True Wireless Noise Cancelling Headphone',
    image: 'https://placehold.co/400x400.png',
    imageHint: 'blue headphones',
    href: '/shop',
  },
  {
    id: '2',
    supertitle: 'NEW ARRIVAL',
    title: 'Next-Gen VR Gaming Headset',
    image: 'https://placehold.co/400x400.png',
    imageHint: 'vr headset',
    href: '/shop',
  },
  {
    id: '3',
    supertitle: 'LIMITED TIME OFFER',
    title: '4K Ultra HD Smart Television',
    image: 'https://placehold.co/400x400.png',
    imageHint: 'smart tv',
    href: '/shop',
  },
];

export const initialSideBanners: SideBanner[] = [
    {
      id: '1',
      title: 'iPhone 14 Pro Max',
      price: 999,
      originalPrice: 1200,
      image: 'https://placehold.co/150x150.png',
      imageHint: 'purple iphone',
      href: '/shop',
    },
    {
      id: '2',
      title: 'Wireless Headphone',
      price: 599,
      originalPrice: 799,
      image: 'https://placehold.co/150x150.png',
      imageHint: 'blue headphones',
      href: '/shop',
    }
]

export const initialGoogleFormSettings: GoogleFormSettings = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfHOgLkPp_5MAN9RTqNr5Me540jpNX-Bz5DpUIYnHbUH-MPQw/formResponse',
  entryName: 'entry.671218297',
  entryEmail: 'entry.371021705',
  entryMobile: 'entry.1804864243',
  entryAddress: 'entry.212628672',
  entryDistrict: 'entry.1897428057',
  entryTotal: 'entry.1219446309',
  entryCart: 'entry.1200052568',
};

export const initialHomepageSections: HomepageSection[] = [
  {
    id: '1',
    title: 'Best Sellers',
    category: 'all',
    limit: 5,
    enabled: true,
  },
  {
    id: '2',
    title: 'Featured Gadgets',
    category: 'Gadgets',
    limit: 5,
    enabled: true,
  },
    {
    id: '3',
    title: 'Latest in Fashion',
    category: 'Clothes',
    limit: 5,
    enabled: true,
  },
];

export const initialCategories: CategoryItem[] = [
    { id: '1', name: 'Clothes', icon: 'Shirt' },
    { id: '2', name: 'Watches', icon: 'Watch' },
    { id: '3', name: 'Toys', icon: 'ToyBrick' },
    { id: '4', name: 'Kitchen', icon: 'Utensils' },
    { id: '5', name: 'Headsets', icon: 'Headset' },
    { id: '6', name: 'Gadgets', icon: 'Smartphone' },
    { id: '7', name: 'Gaming', icon: 'Dices' },
    { id: '8', name: 'Computer', icon: 'Computer' },
    { id: '9', name: 'Furniture', icon: 'Armchair' },
    { id: '10', name: 'Baby', icon: 'Baby' },
];

export const initialAdBanners: AdBannerData = {
  largeBanner: {
    supertitle: 'UP TO 30% OFF',
    title: 'Apple iPhone 14 Pro',
    subtitle: 'Now available on monthly installments.',
    buttonText: 'Shop Now',
    href: '/shop',
    image: 'https://placehold.co/300x300.png',
    imageHint: 'iphone hand'
  },
  smallBanners: [
    {
      title: 'Workout At Home',
      subtitle: 'Flexible VSSL treadmil',
      buttonText: 'Shop Now',
      href: '/shop',
      image: 'https://placehold.co/150x150.png',
      imageHint: 'treadmill'
    },
    {
      title: 'Up to 40% off',
      subtitle: 'Apple Watch Ultra',
      buttonText: 'Shop Now',
      href: '/shop',
      image: 'https://placehold.co/150x150.png',
      imageHint: 'smart watch'
    }
  ]
};

export const initialAboutPageContent: AboutPageContent = {
  title: 'About ShopSwift',
  description: 'Welcome to ShopSwift, your one-stop shop for the latest and greatest products. We are passionate about providing high-quality items and an exceptional shopping experience. Our mission is to bring you a curated selection of goods that combine style, functionality, and value. We believe in the power of great products to enhance your life, and we work tirelessly to source items that we know you\'ll love. Thank you for choosing ShopSwift. We\'re excited to be a part of your journey.',
  imageUrl: 'https://placehold.co/1200x600.png',
  imageHint: 'modern office',
};

const blogContent1 = `The world of e-commerce is in a constant state of flux, driven by technological advancements and shifting consumer behaviors. Staying ahead of the curve is crucial for any online business. Here are some of the key trends to watch: **1. AI-Powered Personalization:** Artificial intelligence is no longer a buzzword; it's a critical tool for creating tailored shopping experiences. From personalized product recommendations to dynamic pricing, AI helps businesses connect with customers on a deeper level. **2. The Rise of Social Commerce:** Social media platforms are transforming into powerful sales channels. Features like in-app checkout and shoppable posts make it easier than ever for consumers to discover and purchase products directly from their feeds. **3. Sustainability and Ethical Practices:** Modern consumers are increasingly conscious of their environmental and social impact. Brands that prioritize sustainability, ethical sourcing, and transparent practices are gaining a significant competitive edge. **4. Augmented Reality (AR) Try-Ons:** AR technology is bridging the gap between online and in-store shopping. It allows customers to visualize products in their own space or even "try on" clothes and accessories virtually, leading to higher conversion rates and fewer returns. **5. Voice Commerce:** The growing popularity of smart speakers is paving the way for voice-activated shopping. Optimizing your store for voice search and creating a seamless voice-based purchasing process will be key for future success. Embracing these trends will not only enhance the customer experience but also drive growth and ensure your business remains relevant in the ever-evolving digital marketplace.`;
const blogContent2 = `Navigating the sea of modern gadgets can be a daunting task. With new devices launching constantly, how do you choose the one that's right for you? This guide will help you make an informed decision. **1. Identify Your Primary Need:** Before you get dazzled by features, ask yourself: what is the main problem this gadget will solve? Are you looking for a device for productivity, entertainment, fitness, or something else? A clear purpose will narrow down your options significantly. **2. Set a Realistic Budget:** Gadgets come in all price ranges. Determine how much you're willing to spend and stick to it. Remember to account for potential accessories like cases, chargers, or software subscriptions. **3. Research and Read Reviews:** Don't just rely on the manufacturer's description. Look for in-depth reviews from reputable tech websites and real users. Pay attention to both the pros and cons to get a balanced view. Consider aspects like performance, battery life, build quality, and ease of use. **4. Consider the Ecosystem:** If you're already invested in a particular ecosystem (like Apple, Google, or Samsung), a new gadget that integrates seamlessly with your existing devices can offer a much smoother experience. **5. Future-Proofing:** While you don't need the absolute latest model, consider a device that will remain relevant and supported with updates for a reasonable amount of time. Look at the processor, RAM, and software update policy. By following these steps, you can cut through the marketing hype and find a gadget that truly enhances your life.`;
const blogContent3 = `As remote work becomes a permanent fixture for many, creating a home office that is both functional and inspiring is essential for productivity and well-being. Here's how to design a space you'll love to work in. **1. Location, Location, Location:** If possible, choose a dedicated room with a door to minimize distractions. If space is limited, find a quiet corner in a low-traffic area. Good natural light is a huge plus, so setting up near a window is ideal. **2. Invest in Ergonomics:** Your health comes first. An ergonomic chair that provides proper lumbar support is a non-negotiable investment. Position your monitor at eye level to avoid neck strain, and ensure your keyboard and mouse allow for a neutral wrist posture. An adjustable standing desk can also be a great addition. **3. Keep it Organized and Clutter-Free:** A tidy workspace promotes a tidy mind. Use shelves, drawers, and cable organizers to keep clutter at bay. A "one-touch" rule can be effective: deal with papers and items immediately instead of letting them pile up. **4. Personalize Your Space:** While it should be professional, your home office should also reflect your personality. Add plants, artwork, or photos that make you feel happy and motivated. Choose a color scheme that you find calming or energizing. **5. Define Your Boundaries:** When your office is at home, it's easy for work to bleed into your personal life. Establish clear working hours and "close the door" at the end of the day. This mental separation is crucial for maintaining a healthy work-life balance. A well-designed home office is more than just a place to work; it's a sanctuary that can boost your creativity, focus, and overall job satisfaction.`;

export const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'the-future-of-ecommerce',
    title: 'The Future of E-commerce: Trends to Watch',
    excerpt: 'E-commerce is constantly evolving. In this post, we explore the key trends that are shaping the future of online shopping, from AI-powered personalization to sustainable practices.',
    content: blogContent1,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'ecommerce chart',
    date: 'October 26, 2023',
  },
  {
    id: '2',
    slug: 'a-guide-to-choosing-the-perfect-gadget',
    title: 'A Guide to Choosing the Perfect Gadget',
    excerpt: 'Feeling overwhelmed by the choices? Our comprehensive guide will walk you through the essential factors to consider when picking your next gadget, ensuring you find the perfect fit for your needs.',
    content: blogContent2,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'gadgets on desk',
    date: 'October 22, 2023',
  },
  {
    id: '3',
    slug: 'how-to-create-a-stylish-and-functional-home-office',
    title: 'How to Create a Stylish and Functional Home Office',
    excerpt: 'With remote work on the rise, a well-designed home office is more important than ever. Discover our top tips for creating a space that is both productive and inspiring.',
    content: blogContent3,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'home office design',
    date: 'October 18, 2023',
  },
];

export const initialContactPageContent: ContactPageContent = {
  title: 'Contact Us',
  description: 'We\'d love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.',
  address: '123 Main St, Anytown, USA',
  email: 'support@shopswift.com',
  phone: '(+965) 7492-3477',
  whatsappNumber: '+96574923477',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.332539539423!2d-122.0842496846959!3d37.422065979825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba024255f5f5%3A0x1634b3e4f71ce5f0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1687882209489!5m2!1sen!2sus',
};
