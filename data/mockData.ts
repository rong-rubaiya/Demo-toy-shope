import { Product, Review, FAQItem, Subscription } from "@/types";

export const categories = [
  { id: "pvc", name: "PVC Toys", slug: "pvc-toys", icon: "ToyBrick", desc: "Highly detailed and durable plastic toys for collectors and retail." },
  { id: "vinyl", name: "Vinyl Toys", slug: "vinyl-toys", icon: "Shapes", desc: "Trendy soft vinyl art toys, designer figures, and pop-culture collectibles." },
  { id: "action", name: "Action Figures", slug: "action-figures", icon: "Swords", desc: "Fully articulated figures with custom accessories and premium joints." },
  { id: "plush", name: "Plush Toys", slug: "plush-toys", icon: "HeartHandshake", desc: "Super soft, organic cotton stuffed animals and branded mascots." },
  { id: "educational", name: "Educational Toys", slug: "educational-toys", icon: "GraduationCap", desc: "STEM-learning kits, puzzles, and sensory toys for early development." },
  { id: "blindbox", name: "Blind Box Toys", slug: "blind-box-toys", icon: "Gift", desc: "Surprise collectible mini-figures in customized packaging." },
  { id: "anime", name: "Anime Figures", slug: "anime-figures", icon: "UserCircle2", desc: "Authentic, high-fidelity replicas of popular animation characters." },
  { id: "oem-odm", name: "OEM & ODM", slug: "oem-odm-toys", icon: "Settings2", desc: "Fully customized designs built from raw sketches or 3D blueprints." }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "AeroStrike Mech Action Figure",
    slug: "aerostrike-mech-action-figure",
    category: "action-figures",
    moq: 1000,
    priceRange: "$2.50 - $4.80",
    material: "Eco-friendly ABS & PVC",
    ageGroup: "8+ Years",
    description: "The AeroStrike Mech features 28 points of articulation, exchangeable weapon modules, and an electroplated metallic finish. Perfect for retail lines and collector boxes.",
    images: [
      "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      size: "18cm height (7 inches)",
      weight: "180g",
      certifications: "EN71, ASTM F963, CE, CPSIA",
      oem_odm: "Custom coloring & logo imprint available",
      port: "Shenzhen Port"
    },
    packaging: "Window Display Box with custom blister tray",
    productionTime: "30-45 Days after sample approval",
    isBestSeller: true,
    isTrending: false,
    isNewArrival: true,
    customizationOptions: ["Custom Paint Scheme", "Logo Stamp", "Custom Accessory Pack"],
    stock: 15000
  },
  {
    id: "p2",
    name: "CyberPunk Designer Vinyl Art Toy",
    slug: "cyberpunk-designer-vinyl-art-toy",
    category: "vinyl-toys",
    moq: 500,
    priceRange: "$6.00 - $12.00",
    material: "Premium Rotocast Vinyl",
    ageGroup: "15+ Years",
    description: "Designed in collaboration with international art studios. Features vibrant neon graffiti decals, matte finish coatings, and individual designer certificate card packaging.",
    images: [
      "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      size: "20cm height (8 inches)",
      weight: "320g",
      certifications: "CE, REACH, ASTM",
      oem_odm: "Exclusive licensing & custom mold adjustments",
      port: "Shenzhen Port"
    },
    packaging: "Premium Matte Rigid Box with silk lining",
    productionTime: "45-60 Days due to detailed hand painting",
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    customizationOptions: ["UV Glow Effects", "Individually Numbered Feet", "Premium Presentation Stand"],
    stock: 8000
  },
  {
    id: "p3",
    name: "Lumina Fantasy Blind Box Series",
    slug: "lumina-fantasy-blind-box-series",
    category: "blind-box-toys",
    moq: 2000,
    priceRange: "$1.80 - $2.90",
    material: "Non-toxic ATBC-PVC & ABS",
    ageGroup: "6+ Years",
    description: "A collection of 8 standard fantasy creatures and 1 hidden chase figure. Includes collectable cards with foil hot-stamping. Ideal for blind box retail displays.",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      size: "8cm height (3.1 inches)",
      weight: "45g per unit",
      certifications: "EN71, ASTM, CCC, ISO9001",
      oem_odm: "Blind packaging custom design & character creation",
      port: "Shenzhen Port"
    },
    packaging: "Sealed foil bag inside blind box; 12 boxes per Counter Display Unit (CDU)",
    productionTime: "35-40 Days",
    isBestSeller: true,
    isTrending: true,
    isNewArrival: false,
    customizationOptions: ["Custom Card Decks", "Scented Plastic", "Flocked/Fuzzy Finish"],
    stock: 50000
  },
  {
    id: "p4",
    name: "HuggyForest Organic Plush Bear",
    slug: "huggyforest-organic-plush-bear",
    category: "plush-toys",
    moq: 1200,
    priceRange: "$3.10 - $5.50",
    material: "100% Organic Cotton with Recycled PET filling",
    ageGroup: "0+ Months (Infant Safe)",
    description: "Super soft teddy bear made of organic fibers and hypoallergenic materials. Machine washable with double-reinforced safety seams. Custom brand tags included.",
    images: [
      "https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      size: "25cm seating height",
      weight: "150g",
      certifications: "GOTS, OEKO-TEX Standard 100, CE, ASTM",
      oem_odm: "Custom embroidery & clothing options",
      port: "Guangzhou Port"
    },
    packaging: "Biodegradable polybag or custom craft hangtag",
    productionTime: "25-30 Days",
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    customizationOptions: ["Custom Embroidered Logo", "Removable Clothes/Outfits", "Voicebox Recording Chip"],
    stock: 12000
  },
  {
    id: "p5",
    name: "RoboCoder Coding STEM Kit",
    slug: "robocoder-coding-stem-kit",
    category: "educational-toys",
    moq: 800,
    priceRange: "$8.50 - $14.50",
    material: "Durable ABS & Electronic components",
    ageGroup: "8-12 Years",
    description: "An interactive smart robot that teaches basic logic, loops, and obstacles routing. Controlled via companion Bluetooth app or on-device custom code cards.",
    images: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      size: "15cm x 15cm x 12cm",
      weight: "480g",
      certifications: "FCC, CE-RED, RoHS, EN62115",
      oem_odm: "Local language manual translation & branded box",
      port: "Shenzhen Port"
    },
    packaging: "Premium Educational Gift Box with handles",
    productionTime: "40-50 Days due to component testing",
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    customizationOptions: ["Custom App Branding", "Translated Voice Tracks", "Color Variants"],
    stock: 4500
  },
  {
    id: "p6",
    name: "Classic Wooden Block Castle",
    slug: "classic-wooden-block-castle",
    category: "educational-toys",
    moq: 1000,
    priceRange: "$4.00 - $7.50",
    material: "Sustainably harvested Beechwood",
    ageGroup: "3+ Years",
    description: "50 pieces of solid beechwood building blocks colored with water-based non-toxic paint. Encourages shape recognition and architectural coordination.",
    images: [
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      size: "Bucket size: 22cm diameter x 25cm",
      weight: "1.2kg (Set)",
      certifications: "FSC, EN71, ASTM F963, ISO8124",
      oem_odm: "Laser engraved logos & custom block shapes",
      port: "Guangzhou Port"
    },
    packaging: "Re-usable cardboard bucket with shape sorter lid",
    productionTime: "30 Days",
    isBestSeller: false,
    isTrending: false,
    isNewArrival: false,
    customizationOptions: ["Laser Engraving", "Custom Color Palette", "Cotton Drawstring Storage Bag"],
    stock: 18000
  },
  {
    id: "p7",
    name: "Anime Guardian Swordmaster Figure",
    slug: "anime-guardian-swordmaster-figure",
    category: "anime-figures",
    moq: 500,
    priceRange: "$10.00 - $18.50",
    material: "High-grade PVC & ABS",
    ageGroup: "14+ Years",
    description: "Highly detailed 1/8 scale anime action statue capturing an iconic battle pose. Hand-painted shadows, translucent effects on energy slashes, and a themed custom stand.",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      size: "24cm height (1/8 Scale)",
      weight: "450g",
      certifications: "CE, RoHS, EN71",
      oem_odm: "3D prototype refinement & exclusive licenses",
      port: "Shenzhen Port"
    },
    packaging: "Full-color window carton box with magnetic flap closure",
    productionTime: "50-60 Days",
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    customizationOptions: ["Alternative Costume Colors", "Metallic/Chrome Details", "Sound Module Stand"],
    stock: 3000
  },
  {
    id: "p8",
    name: "Miniature Die-Cast Retro Roadster",
    slug: "miniature-die-cast-retro-roadster",
    category: "pvc-toys",
    moq: 3000,
    priceRange: "$0.95 - $1.80",
    material: "Zinc Alloy Diecast & ABS",
    ageGroup: "3+ Years",
    description: "Retro 1:64 scale classic roadster model. Electroplated paint, rubber tires, and smooth friction pull-back gears. Perfect for giveaways, impulse purchasing displays.",
    images: [
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      size: "7.5cm length (1:64 Scale)",
      weight: "35g",
      certifications: "CE, EN71, ASTM",
      oem_odm: "Custom paint logo & brand decals",
      port: "Shenzhen Port"
    },
    packaging: "Individual blister card pack or retro paper matchboxes",
    productionTime: "25-30 Days",
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    customizationOptions: ["Custom Livery/Decals", "Chrome Rims", "Exhibition Acrylic Case"],
    stock: 45000
  }
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Samantha Vance",
    role: "Global Procurement Director",
    company: "ToyGalaxy Inc.",
    rating: 5,
    comment: "Ens Toys has been our manufacturing partner for over 5 years. Their PVC molding capabilities are second to none, and they consistently maintain outstanding QC rates below 0.1%. Highly recommended for B2B global sourcing.",
    country: "United States",
    countryFlag: "🇺🇸",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: "r2",
    name: "Hiroshi Takahashi",
    role: "Product Development Lead",
    company: "NeoManga Japan",
    rating: 5,
    comment: "The precision in their anime figurines and rotocast vinyl molding is phenomenal. Their communication in English was flawless, and the 3D prototyping phase saved us weeks in design cycles.",
    country: "Japan",
    countryFlag: "🇯🇵",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: "r3",
    name: "Jean-Pierre Laurent",
    role: "Brand Director",
    company: "PetitMonde Toys EU",
    rating: 5,
    comment: "Ens Toys assisted us in auditing and certifying our organic cotton plush line to meet rigid EU EN71/REACH standards. Their eco-friendly packaging options fit our brand message perfectly.",
    country: "France",
    countryFlag: "🇫🇷",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: "r4",
    name: "Alastair Sterling",
    role: "Founder",
    company: "IndieArt Collectibles",
    rating: 5,
    comment: "For limited edition designer art toys, their small batch vinyl molding options (MOQ 500) were exactly what our studio needed. The paint finishes and box quality are truly retail-ready.",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60"
  }
];

export const faqs: FAQItem[] = [
  {
    id: "f1",
    question: "What is your standard MOQ (Minimum Order Quantity) for toys?",
    answer: "Our MOQs vary by product category and mold requirements: Custom vinyl toys generally require 500 units; injection-molded PVC or ABS figures require 1,000-2,000 units; plush toys require 1,200 units. Some existing mold products can be ordered starting from smaller quantities.",
    category: "MOQ"
  },
  {
    id: "f2",
    question: "Do you offer full OEM / ODM customization services?",
    answer: "Yes! We specialize in both OEM (Original Equipment Manufacturer) where you provide 3D models or sketches, and ODM (Original Design Manufacturer) where our design team crafts custom concepts based on your product specs, market target, and budget.",
    category: "OEM & ODM"
  },
  {
    id: "f3",
    question: "What safety testing and international certifications do you carry?",
    answer: "Our factory is ISO 9001 certified. All toys manufactured are tested by third-party labs (SGS, TUV, BV) and fully comply with global safety rules: EN71 (Europe), ASTM F963 (USA), CE, CPSIA, RoHS, and CCC (China).",
    category: "Quality & Customization"
  },
  {
    id: "f4",
    question: "What is the typical timeline for prototyping and mass production?",
    answer: "Usually, the custom design timeline is: 3D prototyping (7-10 days), physical sample output (10-15 days), mold fabrication (25-30 days), and mass assembly (30-45 days). In total, expect 60 to 90 days from blueprint to shipping dock.",
    category: "Shipping"
  },
  {
    id: "f5",
    question: "Which shipping ports do you ship from and what are the terms?",
    answer: "Our primary shipping port is Shenzhen Port (Yantian or Shekou), located close to our Huizhou factory, and Guangzhou Port. We primarily quote FOB (Free on Board), but can arrange CIF, EXW, DDP, or air freight forwarding depending on customer instructions.",
    category: "Shipping"
  },
  {
    id: "f6",
    question: "How do you handle custom logos and custom retail packaging?",
    answer: "We support screen printing, pad printing, water-transfer decals, and heat-stamps on toys. For packaging, we offer full customization on window boxes, blister card packs, paper tubes, display standees, and custom foil sealing.",
    category: "Quality & Customization"
  }
];

export const exportCountries = [
  {
    id: "us",
    name: "United States & Canada",
    coords: { x: 22, y: 35 },
    share: "35%",
    volume: "8.5M+ Units/Year",
    categories: "PVC Figures, Action Toys, Collectible Blind Boxes",
    shipping: "18-22 Days (Ocean FCL)",
    status: "Primary Market"
  },
  {
    id: "eu",
    name: "European Union (Germany, France, UK)",
    coords: { x: 48, y: 30 },
    share: "28%",
    volume: "6.2M+ Units/Year",
    categories: "Eco Organic Plush, Educational STEM Toys, Wooden Blocks",
    shipping: "25-32 Days (Ocean) / 12 Days (Railway)",
    status: "High Growth Market"
  },
  {
    id: "jp",
    name: "Japan & South Korea",
    coords: { x: 84, y: 38 },
    share: "18%",
    volume: "4.0M+ Units/Year",
    categories: "Rotocast Vinyl Designer Art Toys, Anime Statues",
    shipping: "4-7 Days (Ocean Fast-Track)",
    status: "Premium Quality Market"
  },
  {
    id: "sea",
    name: "Southeast Asia (Vietnam, Philippines, Bangladesh)",
    coords: { x: 76, y: 52 },
    share: "12%",
    volume: "3.2M+ Units/Year",
    categories: "Diecast Cars, Promotional PVC Toys, Custom Mascot Plush",
    shipping: "3-8 Days (Coastal Shipping)",
    status: "Active Distribution Hub"
  },
  {
    id: "au",
    name: "Australia & New Zealand",
    coords: { x: 88, y: 78 },
    share: "7%",
    volume: "1.8M+ Units/Year",
    categories: "Preschool Sensory Blocks, Soft Stuffed Mascots",
    shipping: "12-16 Days (Ocean)",
    status: "Steady B2B Accounts"
  }
];

export const chatBotKeywords: Record<string, string> = {
  moq: "Our standard MOQs are: 500 units for Vinyl Art Toys, 1,000 units for PVC figures, 1,200 units for Plushies, and 1,000 for Educational STEM kits. Smaller trial orders can be approved for existing molding stocks. Would you like to check specific products?",
  shipping: "We ship FOB Shenzhen or Guangzhou Port. Average ocean transit is: 18-22 days to North America, 25-32 days to Western Europe, 4-7 days to Japan. Air shipping or express courier takes 3-7 business days for urgent samples.",
  oem: "We offer comprehensive OEM (Original Equipment Manufacturer) services! You supply the 3D drawings (.STP, .OBJ, .STL) or simple sketches, and we handle engineering, mold tool tooling, injection/rotocasting, paint detailing, assembly, and safety approvals.",
  odm: "Need design support? Our ODM services include creative 3D sculpting from references, product packaging creation, and target-cost engineering. Let's build your next toy brand line from scratch!",
  delivery: "Lead times are: 3D prototyping (7-10 days), physical tooling mold-making (25-30 days), and mass manufacturing (30-45 days). Overall time to delivery is approx 60-90 days, excluding ocean freight.",
  catalog: "You can download our 2026 Toy Catalog directly by clicking the 'Download Catalog' link on any product page, or request the full PDF archive via the Inquiry Basket form. I can send a custom link to your sales email as well!",
  pricing: "Pricing is highly customized based on order size, paint details, material weight, and packaging. Typical FOB costs range from $0.90 to $4.00 for PVC figurines and $5.00 to $18.00 for premium collector scale models. Submit an inquiry to get our pricing sheet within 24 hours.",
  certificates: "Our manufacturing facility holds ICTI Ethical Toy Program (IETP), ISO 9001:2015, and BSCI certifications. Our products are fully certified for safety under EN71, ASTM F963, CE, CPSIA, REACH, and California Prop 65."
};

export const boxDesigns = [
  { id: "b1", name: "Natural Eco-Kraft Box", color: "bg-amber-100 border-amber-300", image: "/box-eco.jpg", price: 1.50 },
  { id: "b2", name: "Festive Joy (Sparkle Red)", color: "bg-red-100 border-red-300", image: "/box-festive.jpg", price: 2.20 },
  { id: "b3", name: "Premium Onyx Matte (Sleek Black)", color: "bg-zinc-800 border-zinc-900 text-white", image: "/box-onyx.jpg", price: 2.50 },
  { id: "b4", name: "Pastel Dreams (Soft Pink & Blue)", color: "bg-pink-50 border-pink-200", image: "/box-pastel.jpg", price: 2.00 }
];

export const giftExtras = [
  { id: "e1", name: "Organic Dark Chocolate Bar", price: 2.50, type: "Chocolate" },
  { id: "e2", name: "Cute Holographic Sticker Pack", price: 1.20, type: "Sticker" },
  { id: "e3", name: "Custom Engraved Metal Keyring", price: 3.00, type: "Keychain" },
  { id: "e4", name: "Deluxe Silk Bow Wrapping", price: 1.80, type: "Gift Wrap" }
];

export const subscriptionPlans: Subscription[] = [
  {
    id: "sub_1",
    type: "Monthly Toy Box",
    status: "Inactive",
    price: 29.99,
    startDate: "N/A",
    nextDelivery: "N/A"
  },
  {
    id: "sub_2",
    type: "Quarterly Box",
    status: "Inactive",
    price: 79.99,
    startDate: "N/A",
    nextDelivery: "N/A"
  },
  {
    id: "sub_3",
    type: "Collector Box",
    status: "Inactive",
    price: 149.99,
    startDate: "N/A",
    nextDelivery: "N/A"
  }
];
