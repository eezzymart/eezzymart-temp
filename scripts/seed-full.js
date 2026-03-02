/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://mdshahreerirfan_db_user:wR9PclMjZlSDPN6e@ac-1yzrc9j-shard-00-00.yxn3crb.mongodb.net:27017,ac-1yzrc9j-shard-00-01.yxn3crb.mongodb.net:27017,ac-1yzrc9j-shard-00-02.yxn3crb.mongodb.net:27017/eezzymart?authSource=admin&replicaSet=atlas-z3uwz2-shard-0&ssl=true";

const CategorySchema = new mongoose.Schema({
  name: String, slug: String, description: String, image: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  isActive: { type: Boolean, default: true }, order: { type: Number, default: 0 },
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name: String, slug: String, description: String, shortDescription: String,
  price: Number, comparePrice: Number, sku: String, stock: Number,
  images: [String], category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  tags: [String], isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false }, isActive: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 }, numReviews: { type: Number, default: 0 },
}, { timestamps: true });

const SliderSchema = new mongoose.Schema({
  title: String, subtitle: String, image: String, link: String,
  buttonText: String, isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
const Slider = mongoose.models.Slider || mongoose.model("Slider", SliderSchema);

const categories = [
  { name: "Grocery & Food", slug: "grocery-food", description: "Fresh groceries and food items", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop", order: 1 },
  { name: "Fresh Produce", slug: "fresh-produce", description: "Fresh fruits and vegetables", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop", order: 2 },
  { name: "Electronics", slug: "electronics", description: "Latest electronics and gadgets", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop", order: 3 },
  { name: "Fashion", slug: "fashion", description: "Trendy fashion and clothing", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop", order: 4 },
  { name: "Home & Living", slug: "home-living", description: "Home decor and furniture", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", order: 5 },
  { name: "Health & Beauty", slug: "health-beauty", description: "Health and beauty products", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop", order: 6 },
  { name: "Baby & Kids", slug: "baby-kids", description: "Baby and kids products", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop", order: 7 },
  { name: "Sports & Fitness", slug: "sports-fitness", description: "Sports equipment and fitness gear", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop", order: 8 },
  { name: "Books & Stationery", slug: "books-stationery", description: "Books and stationery items", image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=400&fit=crop", order: 9 },
  { name: "Mobile & Accessories", slug: "mobile-accessories", description: "Mobile phones and accessories", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", order: 10 },
];

const productTemplates = {
  "grocery-food": [
    { name: "Premium Basmati Rice 5kg", price: 850, compare: 1100, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop", desc: "Long grain aromatic basmati rice, perfect for biriyani and pulao" },
    { name: "Extra Virgin Olive Oil 1L", price: 1200, compare: 1500, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop", desc: "Cold pressed extra virgin olive oil imported from Italy" },
    { name: "Organic Honey 500g", price: 650, compare: 800, img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&h=500&fit=crop", desc: "Pure organic honey sourced from Sundarbans" },
    { name: "Mixed Dry Fruits Pack 1kg", price: 1800, compare: 2200, img: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=500&h=500&fit=crop", desc: "Premium assorted dry fruits including almonds, cashews, and raisins" },
    { name: "Whole Wheat Flour 2kg", price: 180, compare: 220, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=500&fit=crop", desc: "100% whole wheat atta for healthy rotis and bread" },
    { name: "Green Tea Collection Box", price: 450, compare: 600, img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&h=500&fit=crop", desc: "Premium green tea variety pack with 50 tea bags" },
    { name: "Premium Dark Chocolate Bar", price: 350, compare: 450, img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&h=500&fit=crop", desc: "72% cocoa dark chocolate imported from Belgium" },
    { name: "Aromatic Spice Set 12-Pack", price: 580, compare: 750, img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop", desc: "Complete spice set with cumin, turmeric, chili and more" },
    { name: "Pasta Collection Italian", price: 420, compare: 550, img: "https://images.unsplash.com/photo-1551462147-37885acc36f1?w=500&h=500&fit=crop", desc: "Authentic Italian pasta variety pack - spaghetti, penne, fusilli" },
    { name: "Coffee Beans Premium Blend", price: 780, compare: 950, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop", desc: "Freshly roasted arabica coffee beans blend" },
    { name: "Coconut Oil Virgin 500ml", price: 320, compare: 400, img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&h=500&fit=crop", desc: "Cold pressed virgin coconut oil for cooking and beauty" },
    { name: "Peanut Butter Crunchy 500g", price: 380, compare: 480, img: "https://images.unsplash.com/photo-1612998615470-d7e016e5c7f8?w=500&h=500&fit=crop", desc: "All natural crunchy peanut butter with no added sugar" },
    { name: "Instant Noodles Pack of 10", price: 250, compare: 300, img: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&h=500&fit=crop", desc: "Quick cooking instant noodles assorted flavors" },
    { name: "Chia Seeds Organic 500g", price: 550, compare: 700, img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&h=500&fit=crop", desc: "Organic chia seeds rich in omega-3 fatty acids" },
    { name: "Oats Rolled Premium 1kg", price: 280, compare: 350, img: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=500&h=500&fit=crop", desc: "Premium rolled oats for a healthy breakfast" },
    { name: "Mixed Nuts Trail Mix 500g", price: 680, compare: 850, img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&h=500&fit=crop", desc: "Energy boosting trail mix with nuts, seeds and dried fruits" },
    { name: "Apple Cider Vinegar 500ml", price: 420, compare: 550, img: "https://images.unsplash.com/photo-1608631560125-4e13a4063bc0?w=500&h=500&fit=crop", desc: "Raw organic apple cider vinegar with mother" },
    { name: "Granola Cereal Crunchy 400g", price: 350, compare: 450, img: "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=500&h=500&fit=crop", desc: "Crunchy granola with oats, honey and almonds" },
    { name: "Sriracha Hot Sauce 500ml", price: 280, compare: 350, img: "https://images.unsplash.com/photo-1587024325262-4937c5cfe1bc?w=500&h=500&fit=crop", desc: "Original sriracha hot chili sauce" },
    { name: "Quinoa Organic White 500g", price: 620, compare: 780, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop", desc: "Organic white quinoa superfood grain" },
  ],
  "fresh-produce": [
    { name: "Fresh Organic Bananas 1dz", price: 120, compare: 150, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=500&fit=crop", desc: "Farm fresh organic bananas" },
    { name: "Red Apples Premium 1kg", price: 380, compare: 450, img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop", desc: "Crisp and juicy premium red apples" },
    { name: "Fresh Strawberries 500g", price: 450, compare: 580, img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&h=500&fit=crop", desc: "Sweet and fresh strawberries" },
    { name: "Organic Spinach Bundle", price: 80, compare: 100, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=500&fit=crop", desc: "Fresh organic spinach leaves" },
    { name: "Mixed Bell Peppers 500g", price: 220, compare: 280, img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&h=500&fit=crop", desc: "Colorful mix of red, yellow and green bell peppers" },
    { name: "Cherry Tomatoes Pack", price: 180, compare: 220, img: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=500&h=500&fit=crop", desc: "Sweet cherry tomatoes vine ripened" },
    { name: "Fresh Avocados 3-Pack", price: 350, compare: 450, img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&h=500&fit=crop", desc: "Creamy ripe avocados perfect for guacamole" },
    { name: "Organic Broccoli Head", price: 120, compare: 150, img: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&h=500&fit=crop", desc: "Fresh organic broccoli florets" },
    { name: "Fresh Mangoes 1kg", price: 280, compare: 350, img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop", desc: "Sweet Alphonso mangoes from premium farms" },
    { name: "Mixed Salad Greens 200g", price: 150, compare: 200, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop", desc: "Pre-washed mixed salad greens ready to eat" },
    { name: "Fresh Ginger Root 250g", price: 60, compare: 80, img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&h=500&fit=crop", desc: "Aromatic fresh ginger root" },
    { name: "Organic Carrots 1kg", price: 90, compare: 120, img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop", desc: "Crunchy organic carrots farm fresh" },
    { name: "Fresh Blueberries 250g", price: 420, compare: 550, img: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&h=500&fit=crop", desc: "Antioxidant-rich fresh blueberries" },
    { name: "Green Grapes 500g", price: 280, compare: 350, img: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&h=500&fit=crop", desc: "Seedless green grapes sweet and crisp" },
    { name: "Fresh Mushrooms 250g", price: 180, compare: 220, img: "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=500&h=500&fit=crop", desc: "Fresh button mushrooms" },
    { name: "Organic Lemons 6-Pack", price: 120, compare: 150, img: "https://images.unsplash.com/photo-1582087463261-986e1e1d6e4e?w=500&h=500&fit=crop", desc: "Juicy organic lemons" },
    { name: "Sweet Potatoes 1kg", price: 100, compare: 130, img: "https://images.unsplash.com/photo-1596097635121-14b63b7f0c62?w=500&h=500&fit=crop", desc: "Nutritious sweet potatoes" },
    { name: "Fresh Herbs Mix Pack", price: 150, compare: 200, img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&h=500&fit=crop", desc: "Fresh basil, coriander and mint mix" },
    { name: "Dragon Fruit 2-Pack", price: 380, compare: 480, img: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=500&h=500&fit=crop", desc: "Exotic dragon fruit rich in vitamins" },
    { name: "Fresh Pomegranate 1kg", price: 320, compare: 400, img: "https://images.unsplash.com/photo-1541344999736-4f6bf0094dab?w=500&h=500&fit=crop", desc: "Ruby red pomegranates packed with antioxidants" },
  ],
  "electronics": [
    { name: "Wireless Bluetooth Earbuds Pro", price: 3500, compare: 5000, img: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&h=500&fit=crop", desc: "Active noise cancelling bluetooth earbuds with 30hr battery" },
    { name: "Smart Watch Fitness Tracker", price: 4200, compare: 6000, img: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500&h=500&fit=crop", desc: "Heart rate monitor, GPS, water resistant smart watch" },
    { name: "Portable Bluetooth Speaker", price: 2800, compare: 3500, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop", desc: "Waterproof portable speaker with 20hr battery life" },
    { name: "USB-C Fast Charging Hub", price: 1500, compare: 2200, img: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=500&h=500&fit=crop", desc: "7-in-1 USB-C hub with HDMI, USB 3.0 and PD charging" },
    { name: "Mechanical Gaming Keyboard", price: 5500, compare: 7000, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&h=500&fit=crop", desc: "RGB mechanical keyboard with Cherry MX switches" },
    { name: "Wireless Gaming Mouse", price: 2200, compare: 3000, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop", desc: "16000 DPI wireless gaming mouse with RGB lighting" },
    { name: "4K Webcam HD Camera", price: 3200, compare: 4500, img: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&h=500&fit=crop", desc: "4K ultra HD webcam with auto-focus and noise-canceling mic" },
    { name: "Power Bank 20000mAh", price: 1800, compare: 2500, img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop", desc: "Fast charging power bank with dual USB-C ports" },
    { name: "Noise Cancelling Headphones", price: 6500, compare: 8500, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop", desc: "Over-ear ANC headphones with 40hr battery" },
    { name: "Laptop Stand Adjustable", price: 1200, compare: 1800, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop", desc: "Ergonomic aluminum laptop stand with height adjustment" },
    { name: "Wireless Charging Pad 15W", price: 800, compare: 1200, img: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=500&h=500&fit=crop", desc: "Qi wireless fast charging pad compatible with all devices" },
    { name: "Smart LED Desk Lamp", price: 1500, compare: 2000, img: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500&h=500&fit=crop", desc: "Touch control LED lamp with USB charging port" },
    { name: "Mini Projector HD 1080p", price: 8500, compare: 12000, img: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=500&h=500&fit=crop", desc: "Portable HD projector with WiFi and screen mirroring" },
    { name: "External SSD 1TB USB 3.2", price: 7500, compare: 9000, img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop", desc: "Ultra-fast portable SSD with 1050MB/s read speed" },
    { name: "Streaming Microphone USB", price: 2800, compare: 3800, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&h=500&fit=crop", desc: "Condenser USB microphone for streaming and podcasting" },
    { name: "Digital Drawing Tablet", price: 4500, compare: 6000, img: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop", desc: "Pressure sensitive drawing tablet with stylus pen" },
    { name: "Smart Plug WiFi 4-Pack", price: 1600, compare: 2200, img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=500&fit=crop", desc: "Voice controlled smart plugs compatible with Alexa" },
    { name: "Ring Light 12-inch LED", price: 1400, compare: 1800, img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop", desc: "Adjustable ring light with tripod stand and phone holder" },
    { name: "Bluetooth Car Adapter", price: 650, compare: 900, img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=500&fit=crop", desc: "Bluetooth 5.0 car adapter with hands-free calling" },
    { name: "Action Camera 4K Waterproof", price: 5800, compare: 7500, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop", desc: "Waterproof 4K action camera with image stabilization" },
  ],
  "fashion": [
    { name: "Classic White Cotton Shirt", price: 1200, compare: 1800, img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop", desc: "Premium 100% cotton classic fit white shirt" },
    { name: "Denim Jacket Vintage Blue", price: 2800, compare: 3800, img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&h=500&fit=crop", desc: "Vintage wash denim jacket with classic fit" },
    { name: "Running Shoes Ultralight", price: 3500, compare: 4800, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop", desc: "Ultralight running shoes with responsive cushioning" },
    { name: "Leather Crossbody Bag", price: 2200, compare: 3000, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop", desc: "Genuine leather crossbody bag with adjustable strap" },
    { name: "Aviator Sunglasses UV400", price: 850, compare: 1200, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop", desc: "Classic aviator sunglasses with UV400 protection" },
    { name: "Slim Fit Chino Pants", price: 1500, compare: 2200, img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop", desc: "Comfortable slim fit chino pants in khaki" },
    { name: "Casual Linen Blazer", price: 3200, compare: 4500, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=500&fit=crop", desc: "Lightweight linen blazer for smart casual look" },
    { name: "Minimalist Leather Watch", price: 4500, compare: 6000, img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop", desc: "Elegant minimalist watch with genuine leather strap" },
    { name: "Cotton Polo T-Shirt", price: 850, compare: 1200, img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&h=500&fit=crop", desc: "Premium pique cotton polo shirt" },
    { name: "Canvas Sneakers Classic", price: 1800, compare: 2500, img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop", desc: "Classic canvas sneakers in white" },
    { name: "Silk Scarf Designer Print", price: 1200, compare: 1800, img: "https://images.unsplash.com/photo-1601924921557-45e8e0e78e68?w=500&h=500&fit=crop", desc: "Luxury silk scarf with designer pattern" },
    { name: "Jogger Pants Comfortable", price: 1100, compare: 1500, img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&h=500&fit=crop", desc: "Comfortable cotton jogger pants" },
    { name: "Fedora Hat Wool Blend", price: 950, compare: 1300, img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop", desc: "Classic wool blend fedora hat" },
    { name: "Leather Belt Premium", price: 680, compare: 950, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop", desc: "Genuine leather belt with brushed metal buckle" },
    { name: "Crew Neck Sweater Wool", price: 2200, compare: 3000, img: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a64?w=500&h=500&fit=crop", desc: "Cozy merino wool crew neck sweater" },
    { name: "Backpack Urban Daily", price: 1800, compare: 2500, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop", desc: "Water-resistant urban backpack with laptop compartment" },
    { name: "Athletic Shorts Quick Dry", price: 750, compare: 1000, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop", desc: "Quick-dry athletic shorts with zip pockets" },
    { name: "Ankle Boots Suede", price: 3500, compare: 4800, img: "https://images.unsplash.com/photo-1542840843-3349799cded6?w=500&h=500&fit=crop", desc: "Classic suede ankle boots" },
    { name: "Printed Summer Dress", price: 1400, compare: 2000, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop", desc: "Floral printed summer dress in cotton" },
    { name: "Tote Bag Canvas Large", price: 950, compare: 1300, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&h=500&fit=crop", desc: "Large canvas tote bag for everyday use" },
  ],
  "home-living": [
    { name: "Scented Candle Set 3-Pack", price: 850, compare: 1200, img: "https://images.unsplash.com/photo-1602607753934-46a00e779a2c?w=500&h=500&fit=crop", desc: "Luxury scented candles lavender, vanilla and rose" },
    { name: "Throw Pillow Velvet 2-Pack", price: 1200, compare: 1600, img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop", desc: "Soft velvet throw pillows for sofa" },
    { name: "Wall Art Canvas Abstract", price: 1800, compare: 2500, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&h=500&fit=crop", desc: "Modern abstract canvas wall art 24x36 inch" },
    { name: "Indoor Plant Pot Ceramic", price: 650, compare: 900, img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop", desc: "Minimalist ceramic plant pot with drainage hole" },
    { name: "Bamboo Kitchen Organizer", price: 980, compare: 1300, img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop", desc: "Eco-friendly bamboo kitchen utensil organizer" },
    { name: "Cotton Bed Sheet Set Queen", price: 2200, compare: 3000, img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=500&fit=crop", desc: "400 thread count Egyptian cotton bed sheets" },
    { name: "Turkish Bath Towel Set", price: 1500, compare: 2000, img: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=500&h=500&fit=crop", desc: "Premium Turkish cotton bath towels set of 4" },
    { name: "Floating Wall Shelf Set", price: 1100, compare: 1500, img: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=500&h=500&fit=crop", desc: "Rustic wood floating shelves set of 3" },
    { name: "Diffuser Essential Oil Set", price: 1400, compare: 1800, img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop", desc: "Ultrasonic oil diffuser with 6 essential oils" },
    { name: "Woven Storage Basket Set", price: 780, compare: 1100, img: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=500&h=500&fit=crop", desc: "Natural woven storage baskets set of 3" },
    { name: "Ceramic Dinner Plate Set", price: 1600, compare: 2200, img: "https://images.unsplash.com/photo-1603199506016-5ba0f4e9b86d?w=500&h=500&fit=crop", desc: "Elegant ceramic dinner plates set of 6" },
    { name: "LED String Lights 10m", price: 450, compare: 650, img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&h=500&fit=crop", desc: "Warm white LED fairy string lights" },
    { name: "Door Mat Welcome Home", price: 380, compare: 500, img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=500&fit=crop", desc: "Durable coir doormat with anti-slip backing" },
    { name: "Kitchen Knife Set 5-Piece", price: 2500, compare: 3500, img: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&h=500&fit=crop", desc: "Professional stainless steel knife set with block" },
    { name: "Coffee Mug Set Ceramic 4", price: 680, compare: 900, img: "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=500&h=500&fit=crop", desc: "Handcrafted ceramic coffee mugs set of 4" },
    { name: "Cushion Cover Set Boho 4", price: 550, compare: 750, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop", desc: "Bohemian style cushion covers set of 4" },
    { name: "Glass Water Carafe 1.5L", price: 480, compare: 650, img: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=500&h=500&fit=crop", desc: "Elegant glass water carafe with lid" },
    { name: "Wooden Coaster Set 6-Pack", price: 350, compare: 480, img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=500&fit=crop", desc: "Natural wood coasters with holder" },
    { name: "Vacuum Insulated Flask 1L", price: 850, compare: 1200, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop", desc: "Double wall vacuum insulated stainless steel flask" },
    { name: "Photo Frame Set Collage", price: 920, compare: 1300, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&h=500&fit=crop", desc: "Gallery wall photo frame set of 8" },
  ],
  "health-beauty": [
    { name: "Vitamin C Serum 30ml", price: 850, compare: 1200, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop", desc: "Anti-aging vitamin C serum with hyaluronic acid" },
    { name: "Organic Face Moisturizer", price: 680, compare: 950, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop", desc: "Natural organic moisturizer for all skin types" },
    { name: "Hair Oil Argan Premium", price: 550, compare: 750, img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&h=500&fit=crop", desc: "100% pure argan oil for hair and skin" },
    { name: "Sunscreen SPF 50+ 100ml", price: 480, compare: 650, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop", desc: "Broad spectrum SPF 50+ sunscreen lightweight" },
    { name: "Tea Tree Face Wash 150ml", price: 380, compare: 500, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop", desc: "Deep cleansing tea tree face wash" },
    { name: "Sheet Mask Pack 10-Count", price: 420, compare: 580, img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop", desc: "Korean sheet mask variety pack" },
    { name: "Lip Balm Set Natural 4-Pack", price: 280, compare: 380, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop", desc: "Natural organic lip balm set assorted flavors" },
    { name: "Dead Sea Bath Salts 500g", price: 450, compare: 600, img: "https://images.unsplash.com/photo-1600428853876-fb180de8ffdd?w=500&h=500&fit=crop", desc: "Mineral rich Dead Sea bath salts relaxing blend" },
    { name: "Charcoal Face Mask 100g", price: 350, compare: 480, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop", desc: "Activated charcoal deep pore cleansing mask" },
    { name: "Essential Oil Set 6-Pack", price: 720, compare: 980, img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop", desc: "Aromatherapy essential oils lavender, peppermint, eucalyptus" },
    { name: "Retinol Night Cream 50ml", price: 780, compare: 1100, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop", desc: "Anti-wrinkle retinol night cream" },
    { name: "Coconut Body Butter 200g", price: 420, compare: 580, img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&h=500&fit=crop", desc: "Rich coconut body butter for deep moisturizing" },
    { name: "Bamboo Toothbrush 4-Pack", price: 250, compare: 350, img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&h=500&fit=crop", desc: "Eco-friendly bamboo toothbrush biodegradable" },
    { name: "Aloe Vera Gel Pure 300ml", price: 280, compare: 380, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop", desc: "99% pure aloe vera soothing gel" },
    { name: "Rose Water Toner 200ml", price: 320, compare: 450, img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop", desc: "Natural rose water facial toner" },
    { name: "Hair Mask Keratin 250ml", price: 480, compare: 650, img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&h=500&fit=crop", desc: "Keratin protein hair repair mask" },
    { name: "Makeup Brush Set 12-Piece", price: 680, compare: 950, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop", desc: "Professional makeup brush set with case" },
    { name: "Micellar Water 400ml", price: 350, compare: 480, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop", desc: "Gentle micellar cleansing water all skin types" },
    { name: "Eye Cream Anti-Dark Circle", price: 550, compare: 750, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop", desc: "Under eye cream for dark circles and puffiness" },
    { name: "Natural Deodorant Stick", price: 280, compare: 380, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop", desc: "Aluminum-free natural deodorant" },
  ],
  "baby-kids": [
    { name: "Organic Baby Onesie Set 3", price: 1200, compare: 1600, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "Soft organic cotton baby onesies" },
    { name: "Educational Building Blocks", price: 850, compare: 1200, img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop", desc: "Colorful wooden building blocks 100-piece set" },
    { name: "Baby Blanket Muslin Soft", price: 680, compare: 900, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "Ultra-soft muslin baby blanket breathable" },
    { name: "Kids Water Bottle 500ml", price: 380, compare: 500, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop", desc: "BPA-free kids water bottle with straw" },
    { name: "Baby Diaper Bag Backpack", price: 2200, compare: 3000, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "Spacious diaper bag with changing pad" },
    { name: "Art Supplies Kit for Kids", price: 650, compare: 850, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop", desc: "Complete art kit with crayons, markers & colors" },
    { name: "Baby Shampoo Gentle 300ml", price: 280, compare: 380, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "Tear-free gentle baby shampoo" },
    { name: "Kids Puzzle Set 4-in-1", price: 480, compare: 650, img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop", desc: "Educational puzzle set for ages 3-8" },
    { name: "Baby Sippy Cup Leak-Proof", price: 250, compare: 350, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "Leak-proof sippy cup for toddlers" },
    { name: "Kids Backpack School Bag", price: 1100, compare: 1500, img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop", desc: "Lightweight school backpack for kids" },
    { name: "Stuffed Animal Teddy Bear", price: 580, compare: 780, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "Soft and cuddly teddy bear 18 inch" },
    { name: "Baby Food Maker Steamer", price: 2800, compare: 3800, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "4-in-1 baby food maker steam, blend, reheat" },
    { name: "Kids Rain Boots Colorful", price: 650, compare: 900, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "Waterproof fun printed rain boots" },
    { name: "Baby Teething Toy Set", price: 350, compare: 480, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "BPA-free silicone teething toys set of 4" },
    { name: "Kids Drawing Tablet LCD", price: 780, compare: 1100, img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop", desc: "LCD drawing tablet for kids 10-inch" },
    { name: "Baby Lotion Gentle 300ml", price: 320, compare: 420, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "Hypoallergenic baby body lotion" },
    { name: "Kids Lunch Box Insulated", price: 550, compare: 750, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop", desc: "Insulated lunch box with compartments" },
    { name: "Baby Monitor Camera WiFi", price: 3500, compare: 4800, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "HD WiFi baby monitor with night vision" },
    { name: "Kids Bicycle Helmet", price: 680, compare: 900, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop", desc: "Lightweight adjustable kids bike helmet" },
    { name: "Play-Doh Set 12 Colors", price: 420, compare: 580, img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop", desc: "Non-toxic play dough 12 color set" },
  ],
  "sports-fitness": [
    { name: "Yoga Mat Premium 6mm", price: 1200, compare: 1800, img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop", desc: "Non-slip premium yoga mat with carrying strap" },
    { name: "Resistance Band Set 5-Lvl", price: 680, compare: 950, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "5-level resistance bands set with handles" },
    { name: "Dumbbell Set 10kg Pair", price: 2200, compare: 3000, img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=500&fit=crop", desc: "Neoprene coated dumbbells 5kg pair" },
    { name: "Jump Rope Speed Wire", price: 350, compare: 500, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Adjustable speed jump rope for cardio" },
    { name: "Running Armband Phone", price: 450, compare: 650, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Sweat-proof running armband for smartphones" },
    { name: "Foam Roller Muscle Relief", price: 780, compare: 1100, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "High density foam roller for recovery" },
    { name: "Gym Water Bottle 1L", price: 480, compare: 650, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop", desc: "Motivational time marker water bottle" },
    { name: "Protein Shaker Bottle", price: 350, compare: 480, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop", desc: "Leak-proof protein shaker with mixer ball" },
    { name: "Push-Up Board System", price: 1200, compare: 1600, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Color-coded push-up board training system" },
    { name: "Ab Roller Wheel Kit", price: 680, compare: 950, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Ab wheel roller with knee pad for core workout" },
    { name: "Sports Gym Bag Duffel", price: 1500, compare: 2200, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop", desc: "Large capacity gym duffel bag with shoe compartment" },
    { name: "Wrist Wraps Support Pair", price: 280, compare: 400, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Heavy duty wrist wraps for weight lifting" },
    { name: "Fitness Gloves Leather", price: 450, compare: 650, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Breathable leather gym gloves with wrist support" },
    { name: "Ankle Weights Set 2kg", price: 550, compare: 750, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Adjustable ankle weights set 1kg each" },
    { name: "Badminton Racket Set", price: 1800, compare: 2500, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Badminton racket set with 3 shuttlecocks" },
    { name: "Hand Grip Strengthener", price: 250, compare: 350, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Adjustable hand grip strengthener 10-60kg" },
    { name: "Sports Headband Sweat", price: 180, compare: 280, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Moisture-wicking sports headband 3-pack" },
    { name: "Cricket Ball Leather", price: 380, compare: 500, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Premium leather cricket ball tournament grade" },
    { name: "Football Size 5 Pro", price: 1200, compare: 1600, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Professional match quality football" },
    { name: "Swimming Goggles Anti-Fog", price: 450, compare: 650, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop", desc: "Anti-fog UV protection swimming goggles" },
  ],
  "books-stationery": [
    { name: "Leather Journal Notebook", price: 580, compare: 780, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop", desc: "Handcrafted leather bound journal 200 pages" },
    { name: "Fountain Pen Premium Set", price: 1200, compare: 1800, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Elegant fountain pen with ink cartridges" },
    { name: "Watercolor Paint Set 24", price: 680, compare: 950, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop", desc: "Artist grade watercolor set 24 colors with brush" },
    { name: "Desk Organizer Wooden", price: 850, compare: 1200, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Multi-compartment wooden desk organizer" },
    { name: "Planner 2026 Premium", price: 450, compare: 600, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop", desc: "Weekly planner 2026 with goals and habit tracker" },
    { name: "Colored Pencils 48 Set", price: 550, compare: 750, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop", desc: "Professional colored pencils artist set" },
    { name: "Sticky Notes Neon 12-Pack", price: 180, compare: 280, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Bright neon colored sticky notes assorted sizes" },
    { name: "Book Light LED Clip-On", price: 350, compare: 480, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Rechargeable LED book light warm white" },
    { name: "Calligraphy Pen Set 12", price: 480, compare: 680, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Brush calligraphy pen set 12 colors" },
    { name: "Bookmark Set Metal 6-Pack", price: 250, compare: 350, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Unique metal bookmark set with tassels" },
    { name: "Sketchbook A4 150gsm", price: 380, compare: 500, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop", desc: "Heavyweight sketchbook A4 100 sheets" },
    { name: "Washi Tape Set 20 Rolls", price: 420, compare: 580, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Decorative washi tape set pastel colors" },
    { name: "Mechanical Pencil Set Pro", price: 380, compare: 520, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Professional mechanical pencil set 0.3/0.5/0.7mm" },
    { name: "Reading Glasses Blue Light", price: 450, compare: 650, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Blue light blocking reading glasses computer use" },
    { name: "Letter Writing Set Premium", price: 550, compare: 750, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Elegant letter writing stationery set with envelopes" },
    { name: "Pencil Case Canvas Large", price: 280, compare: 380, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Large capacity canvas pencil case zipper" },
    { name: "Globe World Map Desk 12in", price: 1200, compare: 1800, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Interactive world globe with LED light" },
    { name: "Stapler Desktop Heavy Duty", price: 350, compare: 480, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Heavy duty desktop stapler 100 sheet capacity" },
    { name: "Highlighter Set Pastel 8", price: 220, compare: 300, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Pastel color highlighter set 8 colors" },
    { name: "Whiteboard Magnetic 60x90", price: 1800, compare: 2500, img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop", desc: "Magnetic dry erase whiteboard with markers" },
  ],
  "mobile-accessories": [
    { name: "Phone Case Clear Hybrid", price: 280, compare: 400, img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop", desc: "Crystal clear hybrid phone case shockproof" },
    { name: "Fast Charger 65W GaN", price: 1200, compare: 1800, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "GaN 65W fast charger USB-C PD compatible" },
    { name: "Screen Protector 2-Pack", price: 250, compare: 380, img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop", desc: "Tempered glass screen protector 9H hardness" },
    { name: "Car Phone Mount Magnetic", price: 450, compare: 650, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "Strong magnetic car phone mount dashboard" },
    { name: "USB-C Cable Braided 2m", price: 350, compare: 500, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "Braided nylon USB-C fast charging cable" },
    { name: "Pop Socket Phone Grip", price: 180, compare: 280, img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop", desc: "Collapsible phone grip and stand" },
    { name: "Wireless Car Charger Mount", price: 1500, compare: 2200, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "15W wireless charging car mount auto-clamping" },
    { name: "Phone Tripod Mini Flexible", price: 550, compare: 750, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "Flexible mini tripod with phone holder" },
    { name: "Portable Fan USB Phone", price: 280, compare: 400, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "Mini portable fan USB-C for phone" },
    { name: "Memory Card 128GB Class 10", price: 650, compare: 900, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "128GB microSD card UHS-I speed class 10" },
    { name: "Cable Organizer Set", price: 220, compare: 320, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "Silicone cable organizer clips set of 6" },
    { name: "Phone Stand Adjustable", price: 380, compare: 550, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "Adjustable phone stand foldable aluminum" },
    { name: "SIM Card Tool Kit", price: 120, compare: 200, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "SIM card eject tool and adapter kit" },
    { name: "Phone Cleaning Kit Set", price: 280, compare: 400, img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop", desc: "Screen cleaning kit with microfiber cloth" },
    { name: "Multi-Port Charger Station", price: 1800, compare: 2500, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "6-port USB charging station desktop" },
    { name: "Phone Camera Lens Kit 3in1", price: 850, compare: 1200, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "Wide angle, macro and fisheye phone lens kit" },
    { name: "Waterproof Phone Pouch", price: 250, compare: 380, img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop", desc: "IPX8 waterproof phone pouch universal" },
    { name: "Laptop Phone Stand 2in1", price: 950, compare: 1300, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "Laptop and phone dual stand aluminum" },
    { name: "Stylus Pen Universal", price: 380, compare: 520, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "Universal stylus pen for touchscreen devices" },
    { name: "Earphone Jack Adapter", price: 180, compare: 280, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop", desc: "USB-C to 3.5mm audio adapter" },
  ],
};

const sliders = [
  {
    title: "Fresh Groceries\nDelivered Daily",
    subtitle: "Shop Grocery & Food",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=900&fit=crop",
    link: "/shop?category=grocery-food",
    buttonText: "Shop Groceries",
    order: 1,
  },
  {
    title: "Farm Fresh\nProduce & Fruits",
    subtitle: "Fresh Produce Collection",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&h=900&fit=crop",
    link: "/shop?category=fresh-produce",
    buttonText: "Shop Fresh",
    order: 2,
  },
  {
    title: "Latest Electronics\n& Gadgets",
    subtitle: "Tech Deals Up to 50% Off",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&h=900&fit=crop",
    link: "/shop?category=electronics",
    buttonText: "Explore Tech",
    order: 3,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear existing data
  await Category.deleteMany({});
  await Product.deleteMany({});
  await Slider.deleteMany({});
  console.log("Cleared existing data");

  // Insert categories
  const insertedCategories = await Category.insertMany(categories);
  console.log(`Inserted ${insertedCategories.length} categories`);

  // Create category slug-to-id map
  const catMap = {};
  for (const cat of insertedCategories) {
    catMap[cat.slug] = cat._id;
  }

  // Insert products
  let totalProducts = 0;
  for (const [slug, products] of Object.entries(productTemplates)) {
    const catId = catMap[slug];
    if (!catId) continue;

    const productDocs = products.map((p, i) => ({
      name: p.name,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      description: p.desc,
      shortDescription: p.desc.substring(0, 80),
      price: p.price,
      comparePrice: p.compare,
      sku: `${slug.toUpperCase().slice(0, 3)}-${String(i + 1).padStart(3, "0")}`,
      stock: Math.floor(Math.random() * 80) + 20,
      images: [p.img],
      category: catId,
      tags: [slug.replace("-", " ")],
      isFeatured: i < 4,
      isNewArrival: i >= products.length - 5,
      isActive: true,
      ratings: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      numReviews: Math.floor(Math.random() * 150) + 5,
    }));

    await Product.insertMany(productDocs);
    totalProducts += productDocs.length;
    console.log(`Inserted ${productDocs.length} products for ${slug}`);
  }
  console.log(`Total products inserted: ${totalProducts}`);

  // Insert sliders
  await Slider.insertMany(sliders);
  console.log(`Inserted ${sliders.length} sliders`);

  await mongoose.disconnect();
  console.log("Done! Database seeded successfully.");
}

seed().catch(console.error);
