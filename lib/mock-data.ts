import { CategorySeed, ProductSeed } from "@/lib/types";

export const categories: CategorySeed[] = [
  {
    name: "Desk & Work",
    slug: "desk-work",
    description: "Thoughtful tools for focused, comfortable workdays.",
    image: "desk"
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Carry less, move well, and stay ready wherever you land.",
    image: "travel"
  },
  {
    name: "Home",
    slug: "home",
    description: "Quiet upgrades for rooms that work harder and feel better.",
    image: "home"
  },
  {
    name: "Wellness",
    slug: "wellness",
    description: "Everyday essentials for resets, recovery, and routines.",
    image: "wellness"
  },
  {
    name: "Tech",
    slug: "tech",
    description: "Useful technology designed to disappear into your day.",
    image: "tech"
  }
];

export const products: ProductSeed[] = [
  {
    id: "p-aurora-bottle",
    name: "Aurora Insulated Bottle",
    slug: "aurora-insulated-bottle",
    sku: "NTH-BTL-001",
    description: "A 20 oz stainless-steel bottle with a leakproof cap and a soft-touch finish. Keeps cold drinks chilled for 24 hours and hot drinks warm for 12.",
    price: 3800,
    compareAt: 4400,
    inventory: 48,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    categorySlug: "wellness",
    images: ["bottle"],
    attributes: { Capacity: "20 oz", Material: "18/8 stainless steel", Care: "Hand wash recommended" }
  },
  {
    id: "p-orbit-lamp",
    name: "Orbit Desk Lamp",
    slug: "orbit-desk-lamp",
    sku: "NTH-LMP-017",
    description: "An adjustable LED desk lamp with a warm-to-cool color range, focused task mode, and a soft ambient night setting.",
    price: 8900,
    inventory: 21,
    rating: 4.8,
    reviewCount: 76,
    featured: true,
    categorySlug: "desk-work",
    images: ["lamp"],
    attributes: { Light: "400–900 lumens", Power: "USB-C", Warranty: "2 years" }
  },
  {
    id: "p-arc-tote",
    name: "Arc Daily Tote",
    slug: "arc-daily-tote",
    sku: "NTH-BAG-012",
    description: "A structured, weather-resistant daily tote with a padded 16-inch laptop sleeve, bottle pocket, and magnetic top closure.",
    price: 7600,
    inventory: 34,
    rating: 4.7,
    reviewCount: 59,
    featured: true,
    categorySlug: "travel",
    images: ["tote"],
    attributes: { Volume: "18 L", Material: "Recycled nylon", Laptop: "Up to 16 inches" }
  },
  {
    id: "p-moss-throw",
    name: "Moss Woven Throw",
    slug: "moss-woven-throw",
    sku: "NTH-HOM-008",
    description: "A textured, midweight cotton throw woven for sofa naps, slow mornings, and cool evenings.",
    price: 6800,
    inventory: 17,
    rating: 4.9,
    reviewCount: 44,
    featured: true,
    categorySlug: "home",
    images: ["throw"],
    attributes: { Size: "50 × 70 in", Material: "100% cotton", Origin: "Responsibly woven" }
  },
  {
    id: "p-pulse-dock",
    name: "Pulse Charging Dock",
    slug: "pulse-charging-dock",
    sku: "NTH-TEC-021",
    description: "A weighted charging dock that keeps your phone visible, stable, and ready. Supports MagSafe-compatible phones and Qi charging.",
    price: 5900,
    inventory: 39,
    rating: 4.6,
    reviewCount: 91,
    featured: true,
    categorySlug: "tech",
    images: ["dock"],
    attributes: { Output: "15W wireless", Cable: "USB-C included", Compatibility: "Qi devices" }
  },
  {
    id: "p-canvas-organizer",
    name: "Canvas Cable Organizer",
    slug: "canvas-cable-organizer",
    sku: "NTH-DSK-031",
    description: "A compact roll-up organizer with elastic loops, two zip pockets, and a clean profile for cables and compact accessories.",
    price: 2800,
    inventory: 80,
    rating: 4.6,
    reviewCount: 102,
    categorySlug: "desk-work",
    images: ["organizer"],
    attributes: { Pockets: "2 zip pockets", Material: "Waxed canvas", Closure: "Magnetic" }
  },
  {
    id: "p-roam-pouch",
    name: "Roam Essentials Pouch",
    slug: "roam-essentials-pouch",
    sku: "NTH-BAG-024",
    description: "A slim organizer for passport, cables, chargers, and small daily items, built from durable recycled woven fabric.",
    price: 3200,
    inventory: 61,
    rating: 4.5,
    reviewCount: 37,
    categorySlug: "travel",
    images: ["pouch"],
    attributes: { Size: "9 × 5 in", Material: "Recycled woven fabric", Closure: "YKK zipper" }
  },
  {
    id: "p-tide-towel",
    name: "Tide Quick-Dry Towel",
    slug: "tide-quick-dry-towel",
    sku: "NTH-WEL-013",
    description: "A generously sized quick-dry towel with an antimicrobial weave and a compact travel loop.",
    price: 3500,
    inventory: 64,
    rating: 4.7,
    reviewCount: 63,
    categorySlug: "wellness",
    images: ["towel"],
    attributes: { Size: "30 × 60 in", Material: "Microfiber", "Dry time": "Fast drying" }
  },
  {
    id: "p-form-notebook",
    name: "Form Grid Notebook",
    slug: "form-grid-notebook",
    sku: "NTH-DSK-010",
    description: "A lay-flat notebook with subtle dot-grid pages, a durable linen cover, and a back pocket for loose notes.",
    price: 1800,
    inventory: 105,
    rating: 4.8,
    reviewCount: 149,
    categorySlug: "desk-work",
    images: ["notebook"],
    attributes: { Pages: "192", Paper: "100 gsm", Format: "A5" }
  },
  {
    id: "p-hearth-candle",
    name: "Hearth Cedar Candle",
    slug: "hearth-cedar-candle",
    sku: "NTH-HOM-018",
    description: "A clean-burning soy candle with cedar, smoked vanilla, and a warm mineral base. Designed for an unhurried evening.",
    price: 3000,
    inventory: 29,
    rating: 4.7,
    reviewCount: 82,
    categorySlug: "home",
    images: ["candle"],
    attributes: { "Burn time": "45 hours", Wax: "Soy blend", Scent: "Cedar & vanilla" }
  },
  {
    id: "p-summit-shell",
    name: "Summit Packable Shell",
    slug: "summit-packable-shell",
    sku: "NTH-TRV-007",
    description: "A lightweight, rain-ready shell that folds into its own pocket. Built for changing forecasts and carry-on bags.",
    price: 12400,
    inventory: 14,
    rating: 4.8,
    reviewCount: 31,
    categorySlug: "travel",
    images: ["shell"],
    attributes: { Fabric: "Water-resistant nylon", Fit: "Unisex", "Pack size": "8 × 5 in" }
  },
  {
    id: "p-nest-tray",
    name: "Nest Entry Tray",
    slug: "nest-entry-tray",
    sku: "NTH-HOM-004",
    description: "A compact catchall tray for keys, headphones, and everyday carry. Soft cork base protects surfaces.",
    price: 2400,
    inventory: 46,
    rating: 4.5,
    reviewCount: 27,
    categorySlug: "home",
    images: ["tray"],
    attributes: { Size: "10 × 7 in", Material: "Powder-coated steel", Base: "Cork" }
  },
  {
    id: "p-echo-speaker",
    name: "Echo Mini Speaker",
    slug: "echo-mini-speaker",
    sku: "NTH-TEC-009",
    description: "A pocket-sized Bluetooth speaker with clear voice calls, 12-hour playback, and a water-resistant body.",
    price: 7200,
    inventory: 22,
    rating: 4.6,
    reviewCount: 66,
    categorySlug: "tech",
    images: ["speaker"],
    attributes: { Battery: "12 hours", Rating: "IPX6", Connection: "Bluetooth 5.3" }
  },
  {
    id: "p-air-stand",
    name: "Air Laptop Stand",
    slug: "air-laptop-stand",
    sku: "NTH-TEC-030",
    description: "A fold-flat aluminum stand that raises your screen to a more comfortable angle without taking over your desk.",
    price: 4600,
    inventory: 53,
    rating: 4.8,
    reviewCount: 112,
    categorySlug: "tech",
    images: ["stand"],
    attributes: { Fit: "11–16 inch laptops", Material: "Aluminum", Weight: "260 g" }
  },
  {
    id: "p-mirror-balm",
    name: "Mirror Recovery Balm",
    slug: "mirror-recovery-balm",
    sku: "NTH-WEL-026",
    description: "A botanical recovery balm for hands and dry areas, with a crisp herbal scent and non-greasy finish.",
    price: 2200,
    inventory: 74,
    rating: 4.7,
    reviewCount: 51,
    categorySlug: "wellness",
    images: ["balm"],
    attributes: { Size: "60 ml", Formula: "Plant-based", Scent: "Herbal" }
  },
  {
    id: "p-field-mug",
    name: "Field Stoneware Mug",
    slug: "field-stoneware-mug",
    sku: "NTH-HOM-029",
    description: "A handmade-look stoneware mug with a comfortable thumb rest and satin glaze. Microwave and dishwasher safe.",
    price: 2600,
    inventory: 58,
    rating: 4.9,
    reviewCount: 98,
    categorySlug: "home",
    images: ["mug"],
    attributes: { Capacity: "14 oz", Material: "Stoneware", Care: "Dishwasher safe" }
  },
  {
    id: "p-kinetic-mouse",
    name: "Kinetic Quiet Mouse",
    slug: "kinetic-quiet-mouse",
    sku: "NTH-DSK-042",
    description: "An ergonomic wireless mouse with silent switches, precise scrolling, and two-device pairing.",
    price: 5400,
    inventory: 41,
    rating: 4.7,
    reviewCount: 87,
    categorySlug: "desk-work",
    images: ["mouse"],
    attributes: { Battery: "3 months", Connection: "Bluetooth + USB", Hand: "Right-handed" }
  },
  {
    id: "p-drift-mask",
    name: "Drift Sleep Mask",
    slug: "drift-sleep-mask",
    sku: "NTH-WEL-038",
    description: "A contoured sleep mask that blocks light without pressing on your eyes. Finished in breathable recycled satin.",
    price: 2100,
    inventory: 67,
    rating: 4.5,
    reviewCount: 33,
    categorySlug: "wellness",
    images: ["mask"],
    attributes: { Fill: "Memory foam", Shell: "Recycled satin", Fit: "Adjustable" }
  },
  {
    id: "p-cove-case",
    name: "Cove Carry-On Case",
    slug: "cove-carry-on-case",
    sku: "NTH-TRV-041",
    description: "A smooth-rolling hard-shell carry-on with a compression panel, laptop compartment, and a discreet tracking slot.",
    price: 19800,
    inventory: 9,
    rating: 4.8,
    reviewCount: 25,
    categorySlug: "travel",
    images: ["case"],
    attributes: { Capacity: "38 L", Shell: "Polycarbonate", Warranty: "5 years" }
  },
  {
    id: "p-slate-clock",
    name: "Slate Focus Clock",
    slug: "slate-focus-clock",
    sku: "NTH-DSK-052",
    description: "A quiet digital clock with a focused Pomodoro timer, gentle chime, and minimal bedside-friendly display.",
    price: 4900,
    inventory: 36,
    rating: 4.6,
    reviewCount: 42,
    categorySlug: "desk-work",
    images: ["clock"],
    attributes: { Modes: "Clock + timer", Power: "USB-C", Display: "Dimmable LED" }
  }
];

export const adminMetrics = [
  { label: "Revenue (30 days)", value: "$24,680", change: "+12.4%" },
  { label: "Orders awaiting action", value: "18", change: "6 urgent" },
  { label: "Open support cases", value: "12", change: "3 need reply" },
  { label: "Low-stock products", value: "5", change: "Reorder soon" }
];

export const mockOrders = [
  { id: "ord-10428", number: "NTH-10428", customer: "Avery Daniels", email: "avery@example.com", total: 11900, status: "PROCESSING", paymentStatus: "PAID", createdAt: "2026-07-02T09:18:00.000Z", items: 2, destination: "Portland, OR" },
  { id: "ord-10427", number: "NTH-10427", customer: "Mia Roberts", email: "mia@example.com", total: 7600, status: "SHIPPED", paymentStatus: "PAID", createdAt: "2026-07-02T08:46:00.000Z", items: 1, destination: "Austin, TX" },
  { id: "ord-10426", number: "NTH-10426", customer: "Noah Patel", email: "noah@example.com", total: 14500, status: "PAID", paymentStatus: "PAID", createdAt: "2026-07-01T16:04:00.000Z", items: 3, destination: "Brooklyn, NY" },
  { id: "ord-10425", number: "NTH-10425", customer: "Jordan Williams", email: "jordan@example.com", total: 3800, status: "DELIVERED", paymentStatus: "PAID", createdAt: "2026-07-01T14:21:00.000Z", items: 1, destination: "Denver, CO" },
  { id: "ord-10424", number: "NTH-10424", customer: "Elena Torres", email: "elena@example.com", total: 8900, status: "PENDING", paymentStatus: "PENDING", createdAt: "2026-07-01T12:43:00.000Z", items: 1, destination: "Chicago, IL" },
  { id: "ord-10423", number: "NTH-10423", customer: "Sam Morgan", email: "sam@example.com", total: 22200, status: "REFUNDED", paymentStatus: "REFUNDED", createdAt: "2026-06-30T18:31:00.000Z", items: 2, destination: "Seattle, WA" }
];

export const mockTickets = [
  { id: "t-908", number: "CS-908", customer: "Avery Daniels", email: "avery@example.com", subject: "Order NTH-10428 arrived with a damaged bottle", category: "Return or refund", priority: "HIGH", status: "OPEN", createdAt: "2026-07-02T10:01:00.000Z", orderNumber: "NTH-10428" },
  { id: "t-907", number: "CS-907", customer: "Mia Roberts", email: "mia@example.com", subject: "Where can I find tracking for my order?", category: "Shipping", priority: "NORMAL", status: "IN_PROGRESS", createdAt: "2026-07-02T09:11:00.000Z", orderNumber: "NTH-10427" },
  { id: "t-906", number: "CS-906", customer: "Elena Torres", email: "elena@example.com", subject: "Can I update my delivery address?", category: "Order change", priority: "NORMAL", status: "WAITING_ON_CUSTOMER", createdAt: "2026-07-01T13:18:00.000Z", orderNumber: "NTH-10424" },
  { id: "t-905", number: "CS-905", customer: "Noah Patel", email: "noah@example.com", subject: "Product care question", category: "Product question", priority: "LOW", status: "RESOLVED", createdAt: "2026-07-01T11:37:00.000Z", orderNumber: "NTH-10426" }
];

export const mockCustomers = [
  { name: "Avery Daniels", email: "avery@example.com", orders: 4, total: "$412.00", since: "Mar 2026", status: "Returning" },
  { name: "Mia Roberts", email: "mia@example.com", orders: 2, total: "$138.00", since: "Apr 2026", status: "Returning" },
  { name: "Noah Patel", email: "noah@example.com", orders: 1, total: "$145.00", since: "Jul 2026", status: "New" },
  { name: "Elena Torres", email: "elena@example.com", orders: 3, total: "$269.00", since: "Jan 2026", status: "Returning" },
  { name: "Jordan Williams", email: "jordan@example.com", orders: 6, total: "$516.00", since: "Dec 2025", status: "VIP" }
];
