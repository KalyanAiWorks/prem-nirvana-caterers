import React, { useState, useEffect, useRef } from 'react'

const IMG = 'https://foodtalescatering.com'

const SPECIALTIES = [
  { img: `${IMG}/master/product_image/1187926847`, name: 'Mughlai' },
  { img: `${IMG}/master/product_image/34909803`, name: 'North Indian' },
  { img: `${IMG}/master/product_image/1138596389`, name: 'Rajasthani' },
  { img: `${IMG}/master/product_image/1459643235`, name: 'Bengali' },
  { img: `${IMG}/master/product_image/595092653`, name: 'Chinese' },
  { img: `${IMG}/master/product_image/1910345335`, name: 'Hyderabadi Cusine' },
  { img: `${IMG}/master/product_image/462986164`, name: 'South Indian' },
  { img: `${IMG}/master/product_image/1595772219`, name: 'Kashmiri Cusine' },
  { img: `${IMG}/master/product_image/2139408069`, name: 'Japanese Cusine' },
  { img: `${IMG}/master/product_image/1102885815`, name: 'Thai Cusine' },
  { img: `${IMG}/master/product_image/756558837`, name: 'Indonesian Cusine' },
  { img: `${IMG}/master/product_image/632865725`, name: 'Mongolian Cusine' },
  { img: `${IMG}/master/product_image/2123223626`, name: 'French Cusine' },
  { img: `${IMG}/master/product_image/949429842`, name: 'Greek Cusine' },
  { img: `${IMG}/master/product_image/139693929`, name: 'Spanish Cusine' },
]

const OFFERS = [
  { img: `${IMG}/master/subcategory_images/1278409709`, name: 'Cocktails' },
  { img: `${IMG}/master/subcategory_images/1864238701`, name: 'Cusine' },
  { img: `${IMG}/master/subcategory_images/1051123633`, name: 'Live stations' },
]

const MENU_CATEGORIES = [
  {
    name: 'Salads',
    items: ['Green Salad','Sprouts Salad','Corn Salad','Chana Salad','Russian Salad','Macaroni Salad','Fruit Salad','Veg Mayonnaise'],
  },
  {
    name: 'Drinks & Juices',
    items: ['Soft Drinks','Fruit Punch','Grape Juice','Watermelon Juice','Muskmelon Juice','Pineapple Juice','Sugarcane Juice','Mango Juice','Guava Juice','Seasonal Juice','Black Currant','Orange Juice','Buttermilk','Sweet Lassi','Salt Lassi','Rasna','Badam Milk'],
  },
  {
    name: 'Sweets',
    items: ['Bobbatlu','Purnam Boorelu','Badusha','Gulab Jamun','Kala Jamun','Laddu','Mysore Pak','Ravva Kesari','Rasmalai','Kashmiri Rabdi','Basundhi','Double Ka Meetha','Carrot Halwa','Kaddu Ka Kheer'],
  },
  {
    name: 'Tiffins',
    items: ['Idly','Vada','Upma','Tomato Bath','Onion Dosa','Masala Dosa','Set Dosa','Mysore Bajji','Puri','Methi Puri','Uttapam','Pesarattu','Batura','Tea','Coffee','Milk'],
  },
  {
    name: 'Rotis',
    items: ['Chapathi','Pulka','Butter Naan','Kulcha Naan','Rumali Roti','Palak Rumali Roti','Lachha Parota','Parota','Masala Puri','Methi Puri','Plain Naan','Garlic Naan'],
  },
  {
    name: 'Veg Starters',
    items: ['Paneer 65','Baby Corn 65','Veg Manchuria','Paneer Tikka','Veg Spring Roll','Veg Shanghai Roll','Gold Coin','Veg Bullet','Cut Mirchi','Mirchi Bajji','Masala Wada','Corn Cheese Balls','Mushroom 65','Paneer Chutput','Gobi 65','Veg Crispy','Hara Bhara Kabab','Cheese Corn Roll','Veg Fingers','Crispy Corn','Paneer Popcorn','Baby Corn Manchuria','Mushroom Pepper Fry','Veg Kebab'],
  },
  {
    name: 'Veg Currys',
    items: ['Paneer Butter Masala','Paneer Tikka Masala','Shahi Paneer','Kadai Paneer','Palak Paneer','Methi Chaman','Paneer Kolhapuri','Veg Kadai','Veg Kolhapuri','Veg Chatpata','Veg Jaipuri','Navratan Korma','Veg Makhanwala','Malai Kofta','Dum Aloo','Aloo Gobi','Gutthi Vankaya','Bagara Baingan','Tomato Curry','Kaju Drumsticks','Kaju Paneer','Mushroom Masala','Mushroom Kadai','Baby Corn Masala','Baby Corn Kadai','Mirchi Masala','Rajma Masala','Aloo Vankaya Tomato','Capsicum Masala','Chole Masala'],
  },
  {
    name: 'Rice Items',
    items: ['Plain Rice','Bagara Rice','Jeera Rice','Ghee Rice','Coconut Rice','Lemon Rice','Tomato Rice','Curds Rice','Pudina Rice','Vangi Bath','Pulihora','Bisibele Bath','Veg Fried Rice','Veg Schezwan Rice'],
  },
  {
    name: 'Veg Biryanis',
    items: ['Veg Biryani','Veg Dum Biryani','Veg Hyderabadi Biryani','Paneer Biryani','Mushroom Biryani','Kaju Biryani','Baby Corn Biryani'],
  },
  {
    name: 'Dal Items',
    items: ['Dal Fry','Dal Tadka','Dal Makhani','Tomato Dal','Palak Dal','Dosakaya Dal','Gongura Dal','Mango Dal','Gangabayala Pappu','Muddha Pappu','Palakura Pappu','Beerakaya Pappu','Sorakaya Pappu','Chukkakura Pappu','Menthi Kura Pappu','Rajma'],
  },
  {
    name: 'Fry Currys',
    items: ['Aloo Fry Curry','Aloo Pepper Fry','Beans Fry Curry','Beetroot Fry Curry','Gobi Fry Curry','Mushroom Fry','Baby Corn Fry Curry','Brinjal Fry Curry','Bendakaya Fry Curry','Aratikaya Fry','Dondakaya Fry','Chikkudukaya Fry','Cabbage Beans Carrot Coconut Mix Poriyal'],
  },
  {
    name: 'Deep Fry / Dry',
    items: ['Bendi Fry','Dondakaya Fry','Cabbage Fry','Gobi 65','Veg Crispy','Chips'],
  },
  {
    name: 'Chutneys',
    items: ['Tomato Chutney','Beerakaya Chutney','Dosakaya Mukkala Pachadi','Dosakaya Roti Chutney','Pudina Chutney','Dondakaya Chutney','Allam Chutney','Kobbari Pachadi','Palli Chutney','Gongura Chutney','Vankaya Chutney'],
  },
  {
    name: 'Pickles',
    items: ['Avakaya (Mango Pickle)','Gongura Pickle','Tomato Pickle','Lemon Pickle','Usiri Pickle (Amla)','Mixed Veg Pickle','Chintakaya Pickle','Vankaya Pickle','Dondakaya Pickle','Dosa Avakaya','Small Onion Pickle (Ullipaya)'],
  },
  {
    name: 'Papad & Fryums',
    items: ['Papad','Fryums','Masala Papad','Gummadi Vadiyalu','Vadiyalu','Challa Mirchi'],
  },
  {
    name: 'Sambars & Rasams',
    items: ['Sambar','Drumstick Sambar','Mixed Veg Sambar','Dappalam Sambar','Tomato Rasam','Pepper Rasam','Jeera Rasam','Mukkala Pulusu','Chintha Pulusu','Ulava Charu','Pachi Pulusu','Majjiga Pulusu'],
  },
  {
    name: 'Raithas & Curd',
    items: ['Plain Curd','Curd with Onion','Plain Raitha','Onion Raitha','Boondi Raitha','Cucumber Raitha','Tomato Raitha','Mint Raitha'],
  },
  {
    name: 'Desserts',
    items: ['Kulfi','Pudding','Apricot Delight','Chocobar','Ice Cream Cone','Custard Fruits','Cut Fruit Salad'],
  },
  {
    name: 'Ice Cream Flavors',
    items: ['Vanilla','Strawberry','Butterscotch','Chocolate','Pista (Pistha)','Dry Fruits','Black Currant','Jamoon (Jamun)','Sitaphal (Custard Apple)'],
  },
  {
    name: 'Snacks',
    items: ['Onion Samosa','Corn Samosa','Aloo Bonda','Biscuits','Bajjis','Veg Cutlet','Veg Puff','Aloo Puff','Onion Pakoda','Mirchi Bajji','Punugulu','Garelu'],
  },
  {
    name: 'Fruits',
    items: ['Apple','Banana','Papaya','Pineapple','Watermelon','Muskmelon','Grapes','Pomegranate','Orange','Guava','Sweet Lime (Mosambi)','Chickoo (Sapota)','Sweet Tamarind','Dates','Dragon Fruit','Kiwi','Black Currant','Sitaphal (Custard Apple)'],
  },
  {
    name: 'Chaat Items',
    items: ['Pani Puri','Masala Puri','Bhel Puri','Sev Puri','Dahi Puri','Aloo Chaat','Papdi Chaat','Samosa Chaat','Ragda Pattice','Corn Chaat','Fruit Chaat'],
  },
  {
    name: 'Live Counters',
    items: ['Dosa Counter','Uttapam Counter','Chaat Counter','Pav Bhaji Counter','Pasta Counter','Chinese Stir Fry','Noodle Counter','Manchurian Counter','Soup Counter','Tawa Veg Counter','Tandoori Veg Counter','Paneer Tikka Counter','Jalebi Counter','Malpua Counter','Kebab Counter','Mocktail Counter','Fresh Juice Counter','Ice Cream Counter','Kulfi Counter','Chocolate Fountain','Live Sandwich Counter'],
  },
  {
    name: 'Delhi Chat Items',
    items: ['Panipuri','Dahi Puri','Sev Puri','Bhel Puri','Aloo Chaat','Papdi Chaat','Ragda Pattice','Dahi Vada','Dahi Papdi','Chole Kulche','Raj Kachori','Pav Bhaji','Cutlet','Samosa Chaat','Tikki Chaat'],
  },
  {
    name: 'Non-Veg Starters',
    items: ['Chicken Soup','Boiled Fried Eggs','Pepper Eggs','Roasted Eggs','Egg Spicy Omlet'],
  },
  {
    name: 'Chicken Snacks',
    items: ['Chicken Fry','Chicken 65','Chicken Tikka','Chicken Chilli','Chicken Pepper','Chicken Kabab','Chicken Majestic','Chicken Tandoori','Chicken Manchurian','Chicken Tandgi Kabab','Chicken Roast','Chicken Crispy','Chicken Pakoda'],
  },
  {
    name: 'Fish Snacks',
    items: ['Fish Fry','Fish Pittu','Fish Appolo','Fish Finger','Fish Pepper','Fish Kabab','Fish Masala Wada','Fish Solid Fry'],
  },
  {
    name: 'Mutton Snacks',
    items: ['Mutton Fry','Mutton Sheek Kabab','Mutton Pattar Ka Gosh','Mutton Kabab','Mutton Keema Balls','Mutton Masala Wada','Mutton Tangdi Kabab','Mutton 65','Mutton Pepper','Mutton Roast','Mutton Kheema Mutti'],
  },
  {
    name: 'Non-Veg Special',
    items: ['Prawns Fry','Prawns Roast','Prawns 65','Prawns Pepper','Prawns Ginger','Gongura Prawns','Crabs Fry','Crabs Roast','Gongura Crabs','Boti Fry','Talakaya Curry','Paya Shorba','Bheja Fry'],
  },
  {
    name: 'Non-Veg Curries',
    items: ['Egg Curry','Egg Miryam','Fish Curry','Fish Pulusu','Chicken Curry','Chicken Dumka','Chicken Ginger','Chicken Gongura','Chicken Achari','Chicken Kumra','Mutton Curry','Mutton Kurma','Mutton Alu Kurma','Mutton Muragh','Mutton Butter Masala'],
  },
  {
    name: 'Non-Veg Biryanis',
    items: ['Egg Dum Biryani','Fish Dum Biryani','Prawns Dum Biryani','Crabs Dum Biryani','Chicken Dum Biryani','Mutton Dum Biryani','Hundi Dum Biryani','Hyderabadi Moghalai Biryani'],
  },
]

const MENU_IMAGE_POOL = [
  IMG + "/master/product_image/1187926847",
  IMG + "/master/product_image/34909803",
  IMG + "/master/product_image/1138596389",
  IMG + "/master/product_image/1459643235",
  IMG + "/master/product_image/1910345335",
  IMG + "/master/product_image/462986164",
  IMG + "/master/product_image/1595772219",
  IMG + "/master/product_image/595092653",
  IMG + "/master/product_image/2139408069",
  IMG + "/master/product_image/1102885815",
  IMG + "/master/product_image/756558837",
  IMG + "/master/product_image/632865725",
  IMG + "/master/product_image/1620351848",
  IMG + "/master/product_image/1977706061",
  IMG + "/master/product_image/1376751742",
  IMG + "/master/product_image/1759158828",
]

const CATEGORY_IMAGES = {
  "Salads": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  "Drinks & Juices": "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&h=300&fit=crop",
  "Sweets": "https://images.unsplash.com/photo-1548848221-0c2e497ed557?w=400&h=300&fit=crop",
  "Tiffins": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop",
  "Rotis": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
  "Veg Starters": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
  "Veg Currys": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
  "Rice Items": "https://images.unsplash.com/photo-1596097635121-14b63a7e0c69?w=400&h=300&fit=crop",
  "Veg Biryanis": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
  "Dal Items": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
  "Fry Currys": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
  "Deep Fry / Dry": "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&h=300&fit=crop",
  "Chutneys": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
  "Pickles": "https://images.unsplash.com/photo-1589621316382-008455b857cd?w=400&h=300&fit=crop",
  "Papad & Fryums": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
  "Sambars & Rasams": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
  "Raithas & Curd": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
  "Desserts": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
  "Ice Cream Flavors": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop",
  "Snacks": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
  "Fruits": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
  "Chaat Items": "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&h=300&fit=crop",
  "Live Counters": "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
  "Delhi Chat Items": "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&h=300&fit=crop",
  "Non-Veg Starters": "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop",
  "Chicken Snacks": "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
  "Fish Snacks": "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop",
  "Mutton Snacks": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",
  "Non-Veg Special": "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400&h=300&fit=crop",
  "Non-Veg Curries": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
  "Non-Veg Biryanis": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
  "Menu Cards": "",
}

const STATS = [
  { stop: 650, label: 'HAPPY CLIENTS' },
  { stop: 782, label: 'SPECIAL DISHES' },
  { stop: 35, label: 'EXPERT CHEFS' },
  { stop: 10, label: 'AWARDS WON' },
]

const TABS = [
  {
    id: 'story',
    btn: 'OUR STORY',
    sub: 'Our Story-Prem Nirvana Caterers',
    h: 'Culture Blended Elegance',
    img: `${IMG}/images/resource/wedd.jpg`,
    body: [
      'Where Hyderabadi Nizami heritage meets modern celebration -- that\'s Prem Nirvana. Born in a city legendary for its food, we carry forward culinary traditions with a contemporary twist.',
      'Every event reflects Hyderabad\'s grandeur -- slow-cooked dum biryani, elegant live counters, five-star presentation. Our 35+ expert chefs transform your venue into a culinary destination, every single time.',
    ],
    imageRight: false,
  },
  {
    id: 'why',
    btn: 'WHY PREM NIRVANA ?',
    sub: 'Why Prem Nirvana Caterers ?',
    h: 'Elevating Your Experience',
    img: `${IMG}/images/aboutfood.jpg`,
    list: [
      'Delectable multi-cuisine gourmet dishes to choose from our catering',
      'Luxurious Retreat that caters to couples, families and corporates',
      'Over 12 years collective experience in the catering industry by our team',
      'A committed team of food professionals dedicated to food quality & flavour.',
      'An onsite coordinator at every staffed function.',
      'A server staff team that can effectively handle large and small events.',
      'New healthy meal plan choices- updated weekly',
      'We know Italian and Continental local food favourites & unique beverages to popular trends and outdoor catering.',
      'Commitment to innovation: each year, our team attends catering seminars and conferences to stay up to date with new trends, recipes and techniques.',
    ],
    imageRight: true,
  },
  {
    id: 'quality',
    btn: 'QUALITY & FOOD',
    sub: 'Food & Quality-Prem Nirvana Caterers',
    h: 'Our Promise to You',
    img: `${IMG}/images/speacial6.jpg`,
    list: [
      'The huge volume of meals catered daily allows us to source the best ingredients at the best prices; we guarantee quality at the best prices.',
      'We sanitize our kitchen as per government policy.',
      'We work with the best specialists in the field of catering services.',
      'We believe in taste, quality and choice of paramount.',
      'Competitive pricing',
      'Customisable menu.',
      'Professional setups',
      'Time saving',
    ],
    imageRight: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Ravi Kumar',
    img: `${IMG}/master/subcategory_images/1781583232`,
    text: "I want to extend my heartfelt thanks to Gopi and his entire team at Prem Nirvana for the exceptional service and unforgettable food at all my recent functions. The food was absolutely delicious at every event -- each dish was flavorful, fresh, and prepared to perfection. Not only was the food top-notch, but the service was impeccable. It's rare to find a caterer who excels in every aspect, but Shiv and Prem Nirvana have consistently exceeded my expectations every time.",
  },
  {
    name: 'Shreya Singh',
    img: `${IMG}/master/subcategory_images/70986021`,
    text: 'Gopi and his team were absolutely amazing! We had a two-day event with both lunch and dinner, and everything was flawless. The service, food quality, taste, and presentation were all excellent. They delivered 100% without a single miss! Their professionalism and warmth truly stood out. Highly recommend them without any second thoughts!',
  },
  {
    name: 'Vanshaj Kaul',
    img: `${IMG}/master/subcategory_images/1455053813`,
    text: "I went to Gopi through a reference who had a good experience using his catering service and my choice of going with Prem Nirvana for my brother's wedding was bang on. Absolutely professional staff. Each dish felt like it was curated individually and wasn't mass produced for a wedding. My caterer for all future events is fixed now. Would highly recommend.",
  },
  {
    name: 'Sohan Patel',
    img: `${IMG}/master/subcategory_images/2015540917`,
    text: "We couldn't have asked for a better catering partner for our wedding. From the very beginning, their communication was clear, transparent, and professional. Presentation – 10/10, Taste – 10/10, Cleanliness – 10/10, Service – 10/10. They are now our default caterers for any of our functions in Hyderabad. Highly, highly recommended.",
  },
  {
    name: 'Miss Roma',
    img: `${IMG}/master/subcategory_images/7031287`,
    text: 'I had an outstanding experience with Prem Nirvana catering services during my wedding. Mr. Gopi and his team went above and beyond to ensure a seamless and delightful dining experience for our guests. The professionalism and attention to detail added an extra layer of sophistication to our special day.',
  },
]

const GALLERY_IMAGES = [
  { src: IMG + "/master/subcategory_images/1012166793", alt: "Wedding catering setup" },
  { src: IMG + "/master/subcategory_images/1018969833", alt: "Hyderabadi biryani event spread" },
  { src: IMG + "/master/subcategory_images/1026993349", alt: "Buffet catering counter" },
  { src: IMG + "/master/subcategory_images/1066234387", alt: "Birthday party food" },
  { src: IMG + "/master/subcategory_images/1076944860", alt: "Corporate lunch catering" },
  { src: IMG + "/master/subcategory_images/1129141904", alt: "Indian dessert counter" },
  { src: IMG + "/master/subcategory_images/1191836512", alt: "Live food counter" },
  { src: IMG + "/master/subcategory_images/1246943263", alt: "Family function catering" },
  { src: IMG + "/master/subcategory_images/1260944183", alt: "Tandoor event counter" },
]

const INSTAGRAM_IMAGES = [
  { src: IMG + "/master/product_image/1910345335", alt: "Hyderabadi biryani" },
  { src: IMG + "/master/product_image/1459643235", alt: "Indian sweets" },
  { src: IMG + "/master/product_image/462986164", alt: "Dosa counter" },
  { src: IMG + "/master/product_image/34909803", alt: "Paneer curry" },
  { src: IMG + "/master/subcategory_images/1278409709", alt: "Chaat plate" },
  { src: IMG + "/master/product_image/1187926847", alt: "Tandoori chicken" },
]

const NAV = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#offer'],
  ['Events', '#events'],
  ['Menu', null],
  ['Booking', '#forms'],
  ['Contact', '#forms'],
]

/* ---------- helpers ---------- */

function useCountUp(target, run, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setVal(Math.floor(p * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, duration])
  return val
}

function SectionTitle({ sub, title, centered, light }) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <div className={`subtitle mb-3 ${centered ? 'sep inline-block' : ''}`}>{sub}</div>
      <h2 className={`text-4xl md:text-5xl lg:text-[60px] leading-tight ${light ? 'text-white' : 'text-white'}`}>
        {title}
      </h2>
    </div>
  )
}

function StatBlock({ stat, run }) {
  const v = useCountUp(stat.stop, run)
  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-serif text-gold leading-none">
        {v}
        <span className="text-gold">+</span>
      </div>
      <div className="mt-3 text-white text-lg uppercase tracking-widest leading-tight">
        {stat.label}
      </div>
    </div>
  )
}

function FloatingChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Namaste! I'm your Prem Nirvana Caterers assistant. Ask me about our menu, services, or events!",
    },
  ])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  const systemPrompt = `Keep responses SHORT — maximum 2-3 sentences. Be friendly but concise. Don't give long paragraphs. If listing menu items, use a compact list. Only elaborate if the user specifically asks for more details.

You are the AI assistant for Prem Nirvana Caterers, Hyderabad. Phone: +91 99497 53542. Services: weddings, corporate events, birthdays, destination weddings. Pure veg AND non-veg available. 35+ chefs, 12+ years experience.

PRICING: Always say "Please contact us on WhatsApp or call +91 99497 53542 for pricing."
BOOKING: Share phone +91 99497 53542.

FULL MENU:
${MENU_CATEGORIES.map(cat => `${cat.name}: ${cat.items.join(', ')}`).join('\n')}`

  const sendMessage = async (event) => {
    event.preventDefault()
    const raw = input.trim().slice(0, 500)
    // Strip any HTML/script tags to prevent prompt injection via markup
    const text = raw.replace(/<[^>]*>/g, '').trim()
    if (!text || loading) return

    const nextMessages = [...messages, { role: "user", content: text }]
    setMessages(nextMessages)
    setInput("")
    setLoading(true)

    const apiKey = import.meta.env.VITE_GROQ_API_KEY

    if (!apiKey) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "The chatbot needs VITE_GROQ_API_KEY configured. Please contact us directly on WhatsApp or call +91 99497 53542.",
        },
      ])
      setLoading(false)
      return
    }

    // Build history: drop leading assistant turns (Groq requires conversation to start with user)
    let history = nextMessages.slice(-6)
    while (history.length > 0 && history[0].role === "assistant") {
      history = history.slice(1)
    }
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ]

    const callGroq = async () => {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 250,
          messages: apiMessages,
        }),
      })
      if (!response.ok) {
        const errText = await response.text()
        console.error("[Groq] HTTP", response.status, errText)
        throw new Error(`${response.status}: ${errText}`)
      }
      return response.json()
    }

    try {
      let data
      try {
        data = await callGroq()
      } catch (firstErr) {
        await new Promise(r => setTimeout(r, 1000))
        data = await callGroq()
      }
      const content =
        data.choices?.[0]?.message?.content ||
        "Please contact us on WhatsApp or call +91 99497 53542 for assistance."
      setMessages([...nextMessages, { role: "assistant", content }])
    } catch (error) {
      console.error("[Groq] Error after retry:", error)
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "I couldn't connect right now. Please call or WhatsApp +91 99497 53542 for immediate help.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── Chatbot popup ── */}
      {open && (
        <div className="chatbot-popup">
          {/* Header */}
          <div className="chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/logo.png" alt="Prem Nirvana" style={{ height: '32px', width: 'auto' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.05em' }}>PREM NIRVANA AI</div>
                <div style={{ fontSize: '11px', color: '#444', fontFamily: '"DM Sans", sans-serif' }}>Ask about menus, pricing & events</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
              className="chatbot-close-btn"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={message.role + index}
                className={`chatbot-bubble ${message.role === 'user' ? 'chatbot-bubble-user' : 'chatbot-bubble-bot'}`}
              >
                {message.content}
              </div>
            ))}
            {loading && (
              <div className="chatbot-bubble chatbot-bubble-bot">
                <span className="chatbot-dots">
                  <span>●</span><span>●</span><span>●</span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chatbot-input-area" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about catering..."
              maxLength={500}
              className="chatbot-input"
            />
            <button type="submit" disabled={loading} className="chatbot-send-btn" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* ── Styles ── */}
      <style>{`
        /* === Popup container === */
        .chatbot-popup {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          flex-direction: column;
          background: #1a1a1a;
          animation: chatbot-open 0.22s ease both;
        }
        @media (min-width: 640px) {
          .chatbot-popup {
            inset: auto;
            bottom: 80px;
            right: 20px;
            width: 400px;
            height: 560px;
            border-radius: 16px;
            box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(228,197,144,0.15);
            overflow: hidden;
          }
        }
        @keyframes chatbot-open {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        /* === Header === */
        .chatbot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          flex-shrink: 0;
          background: linear-gradient(135deg, #e4c590 0%, #d4a574 100%);
        }
        .chatbot-close-btn {
          width: 36px;
          height: 36px;
          min-width: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.15);
          border: none;
          border-radius: 50%;
          font-size: 15px;
          color: #1a1a1a;
          cursor: pointer;
          font-weight: 700;
          line-height: 1;
          transition: background 0.15s;
        }
        .chatbot-close-btn:hover { background: rgba(0,0,0,0.28); }

        /* === Messages === */
        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #141414;
          -webkit-overflow-scrolling: touch;
        }
        .chatbot-bubble {
          max-width: 82%;
          padding: 10px 14px;
          font-size: 15px;
          line-height: 1.55;
          font-family: "DM Sans", sans-serif;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .chatbot-bubble-bot {
          align-self: flex-start;
          background: #2c2c2c;
          color: #efefef;
          border-radius: 4px 16px 16px 16px;
        }
        .chatbot-bubble-user {
          align-self: flex-end;
          background: #e4c590;
          color: #1a1a1a;
          font-weight: 600;
          border-radius: 16px 4px 16px 16px;
        }

        /* === Loading dots === */
        .chatbot-dots {
          display: inline-flex;
          gap: 5px;
          align-items: center;
          padding: 2px 0;
        }
        .chatbot-dots span {
          font-size: 9px;
          animation: dot-bounce 1.2s ease-in-out infinite;
          opacity: 0.4;
        }
        .chatbot-dots span:nth-child(2) { animation-delay: 0.2s; }
        .chatbot-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%           { transform: scale(1);   opacity: 1;   }
        }

        /* === Input area === */
        .chatbot-input-area {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: #1a1a1a;
          border-top: 1px solid #2e2e2e;
          flex-shrink: 0;
        }
        .chatbot-input {
          flex: 1;
          min-height: 44px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 2px solid #e4c590;
          background: #0d0d0d;
          color: #fff;
          font-size: 15px;
          font-family: "DM Sans", sans-serif;
          outline: none;
          min-width: 0;
          transition: border-color 0.15s;
        }
        .chatbot-input::placeholder { color: #555; }
        .chatbot-input:focus { border-color: #d4a574; }
        .chatbot-send-btn {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e4c590;
          color: #1a1a1a;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .chatbot-send-btn:hover:not(:disabled) { background: #d4a574; }
        .chatbot-send-btn:active:not(:disabled) { transform: scale(0.94); }
        .chatbot-send-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        /* === Floating button === */
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        .chat-bounce {
          animation: bounce 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* ── Floating button ── */}
      <div className="fixed bottom-5 right-2 sm:right-5 z-[60]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="chat-bounce flex h-[55px] w-[55px] items-center justify-center rounded-full bg-[#e4c590] text-white shadow-2xl transition-transform hover:scale-110 cursor-pointer"
          aria-label="Open AI chatbot"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
    </>
  )
}

/* ---------- menu modal ---------- */

const INPUT_STYLE = {
  width: '100%', padding: '10px 14px',
  border: '1.5px solid #e4c590', borderRadius: '6px',
  fontSize: '14px', color: '#1a1a1a', background: '#fff',
  fontFamily: '"DM Sans", sans-serif', outline: 'none',
}
const LABEL_STYLE = {
  display: 'block', fontSize: '13px', fontWeight: 600,
  color: '#333', marginBottom: '6px', fontFamily: '"DM Sans", sans-serif',
}

function buildWhatsAppMessage(selectedItems, form) {
  const itemsWithNumbers = []
  let globalIndex = 0

  MENU_CATEGORIES.forEach((cat) => {
    cat.items.forEach((item, index) => {
      globalIndex = globalIndex + 1
      if (selectedItems.has(item)) {
        itemsWithNumbers.push({
          category: cat.name,
          name: item,
          number: globalIndex,
        })
      }
    })
  })

  const itemLines = itemsWithNumbers
    .map((item) => `${item.number} - ${item.name}`)
    .join('\n')

  const dateFmt = form.date
    ? new Date(form.date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : 'Not specified'

  const eventTypeText = form.eventType || 'Not specified'
  const header = `🍽️ *Catering Enquiry for ${eventTypeText} -- Prem Nirvana Caterers*`

  return [
    header,
    ``,
    `📋 *Event Details*`,
    `👤 Client Name: ${form.name}`,
    `📞 Client Number: ${form.phone}`,
    form.venue   ? `🏛️ Venue: ${form.venue}`               : null,
    form.guests  ? `👥 Guests: ${form.guests} pax`          : null,
    `📅 Event Date: ${dateFmt}`,
    `🎉 Event Type: ${eventTypeText}`,
    ``,
    `🍽️ *Selected Items (${selectedItems.size} items)*`,
    itemLines,
  ].filter((l) => l !== null).join('\n')
}

function MenuModal({ open, onClose, activeMenu, setActiveMenu }) {
  const [selected, setSelected] = useState(new Set())
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', venue: '', guests: '', date: '', eventType: '' })

  const activeMenuCategory = MENU_CATEGORIES.find((c) => c.name === activeMenu) || MENU_CATEGORIES[0]

  // ESC: close form first, then modal
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (showForm) setShowForm(false)
      else onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, showForm])

  if (!open) return null

  const toggleItem = (name) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  const handleSend = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      alert('Please enter your name and phone number.')
      return
    }
    const msg = buildWhatsAppMessage(selected, form)
    window.open(`https://wa.me/917780797066?text=${encodeURIComponent(msg)}`, '_blank')
    setShowForm(false)
  }

  const field = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  return (
    <div className="fixed inset-0 flex flex-col" style={{ zIndex: 3000, height: '100vh', minHeight: '100vh', background: 'rgba(14,13,11,0.98)', animation: 'menuFadeIn 0.3s ease both' }}>

      {/* ── Header ── */}
      <div className="menu-modal-pad shrink-0 border-b border-white/10 flex items-center gap-3 sm:gap-5" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
        {/* left: logo — hidden on small phones */}
        <div className="hidden sm:flex flex-1 items-center">
          <img src="/logo.png" alt="Prem Nirvana Caterers" className="nav-logo-image" style={{ display: 'block' }} />
        </div>
        {/* centre: title */}
        <div className="flex-1 sm:flex-none text-center" style={{ flexShrink: 0 }}>
          <div className="subtitle mb-1" style={{ fontSize: 'clamp(10px, 2.5vw, 16px)', letterSpacing: '2px' }}>Prem Nirvana Caterers</div>
          <h2 style={{ fontFamily: '"Forum", serif', color: '#e4c590', fontSize: 'clamp(20px, 5vw, 38px)', fontWeight: 400, lineHeight: 1.2, margin: 0 }}>
            Our Full Menu
          </h2>
        </div>
        {/* right: close button */}
        <div className="flex flex-1 items-center justify-end">
          <button
            type="button" onClick={onClose} aria-label="Close menu"
            className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px]"
            style={{ color: '#e4c590', fontSize: '26px', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 300, opacity: 0.8, transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8' }}
          >✕</button>
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div className="menu-modal-pad menu-tabs-row shrink-0 flex overflow-x-auto border-b border-white/10" style={{ paddingTop: 0, paddingBottom: 0 }}>
        {MENU_CATEGORIES.map((cat) => {
          const active = activeMenu === cat.name
          return (
            <button
              key={cat.name} type="button" onClick={() => setActiveMenu(cat.name)}
              style={{ flexShrink: 0, padding: '16px 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif', background: 'none', border: 'none', borderBottom: active ? '2px solid #e4c590' : '2px solid transparent', color: active ? '#e4c590' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s', whiteSpace: 'nowrap', marginBottom: '-1px' }}
            >{cat.name}</button>
          )
        })}
        {/* Menu Cards special tab */}
        <button
          type="button" onClick={() => setActiveMenu('__menu_cards__')}
          style={{ flexShrink: 0, padding: '16px 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif', background: 'none', border: 'none', borderBottom: activeMenu === '__menu_cards__' ? '2px solid #e4c590' : '2px solid transparent', color: activeMenu === '__menu_cards__' ? '#e4c590' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s', whiteSpace: 'nowrap', marginBottom: '-1px' }}
        >Menu Cards</button>
      </div>

      {/* ── Content area: food grid or menu cards download ── */}
      <div
        className="menu-modal-pad menu-modal-scroll flex-1 overflow-y-auto"
        style={{ paddingTop: '24px', paddingBottom: 0 }}
      >
        {activeMenu === '__menu_cards__' ? (
          /* ── Menu Cards download grid ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <a
                key={n}
                href={`/images/client/menu-card-${n}.jpg`}
                download={`menu-card-${n}.jpg`}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'block', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e4c590' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                <img
                  src={`/images/client/menu-card-${n}.jpg`}
                  alt={`Menu Card ${n}`}
                  style={{ width: '100%', height: '320px', objectFit: 'contain', display: 'block', background: '#111' }}
                />
              </a>
            ))}
          </div>
        ) : (
          /* ── Regular food grid ── */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {activeMenuCategory.items.map((dishName, index) => {
              const checked = selected.has(dishName)
              return (
                <div
                  key={dishName}
                  className="menu-card"
                  onClick={() => toggleItem(dishName)}
                  style={{ cursor: 'pointer', borderRadius: '12px', border: checked ? '3px solid #e4c590' : '1px solid rgba(255,255,255,0.1)', background: checked ? 'rgba(228,197,144,0.07)' : 'rgba(255,255,255,0.02)', transition: 'border 0.2s, background 0.2s', overflow: 'hidden' }}
                >
                  {/* image + overlays */}
                  <div className="menu-card-wrap" style={{ position: 'relative', borderRadius: '10px 10px 0 0' }}>
                    <img
                      src={CATEGORY_IMAGES[activeMenu] || MENU_IMAGE_POOL[index % MENU_IMAGE_POOL.length]}
                      alt={dishName}
                      className="menu-card-img"
                      style={{ height: '165px', borderRadius: '10px 10px 0 0' }}
                      loading="lazy"
                    />
                    {/* gold checkmark -- top-left, visible only when selected */}
                    {checked && (
                      <div style={{ position: 'absolute', top: '10px', left: '10px', width: '26px', height: '26px', borderRadius: '50%', background: '#e4c590', color: '#0e0d0b', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
                        ✓
                      </div>
                    )}
                  </div>
                  {/* name */}
                  <div style={{ padding: '12px 14px 14px' }}>
                    <h3 style={{ fontFamily: '"Forum", serif', color: checked ? '#e4c590' : 'rgba(255,255,255,0.88)', fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.3, margin: 0, transition: 'color 0.2s' }}>
                      {dishName}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Sticky WhatsApp bar ── */}
      {selected.size > 0 && (
        <div className="menu-modal-pad menu-sticky-bar shrink-0" style={{ position: 'sticky', bottom: 0, zIndex: 10, background: '#e4c590', paddingTop: '12px', paddingBottom: '12px' }}>
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color: '#0e0d0b', fontSize: '14px' }}>
            {selected.size} item{selected.size !== 1 ? 's' : ''} selected
          </span>
          <button
            type="button" onClick={() => setShowForm(true)}
            style={{ background: '#0e0d0b', color: '#e4c590', border: 'none', padding: '13px 20px', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '4px', minHeight: '44px' }}
          >
            📲 Send via WhatsApp ({selected.size} items)
          </button>
        </div>
      )}

      {/* ── Event Details popup ── */}
      {showForm && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}
        >
          <div style={{ background: '#ffffff', borderRadius: '14px', padding: '36px 32px 32px', width: '100%', maxWidth: '480px', maxHeight: '92vh', overflowY: 'auto', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <h3 style={{ fontFamily: '"Forum", serif', fontSize: '1.55rem', color: '#1a1a1a', marginBottom: '4px' }}>📋 Event Details</h3>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#777', marginBottom: '24px' }}>
              Fill in your details -- we'll send your order directly to our team.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={LABEL_STYLE}>👤 Client Name *</label>
                <input style={INPUT_STYLE} type="text" placeholder="Your full name" value={form.name} onChange={(e) => field('name', e.target.value)} />
              </div>
              <div>
                <label style={LABEL_STYLE}>📞 Client Number *</label>
                <input style={INPUT_STYLE} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => field('phone', e.target.value)} />
              </div>
              <div>
                <label style={LABEL_STYLE}>🏛 Venue</label>
                <input style={INPUT_STYLE} type="text" placeholder="Event venue or location" value={form.venue} onChange={(e) => field('venue', e.target.value)} />
              </div>
              <div>
                <label style={LABEL_STYLE}>👥 Number of Guests (Pax)</label>
                <input style={INPUT_STYLE} type="number" placeholder="e.g. 100" min="1" value={form.guests} onChange={(e) => field('guests', e.target.value)} />
              </div>
              <div>
                <label style={LABEL_STYLE}>📅 Event Date</label>
                <input style={{ ...INPUT_STYLE, colorScheme: 'light' }} type="date" value={form.date} onChange={(e) => field('date', e.target.value)} />
              </div>
              <div>
                <label style={LABEL_STYLE}>🎉 Event Type</label>
                <select style={INPUT_STYLE} value={form.eventType} onChange={(e) => field('eventType', e.target.value)}>
                  <option value="">Select event type</option>
                  <option>Wedding</option>
                  <option>Birthday Party</option>
                  <option>Corporate Event</option>
                  <option>Family Function</option>
                  <option>Festival</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <button
                type="button" onClick={() => setShowForm(false)}
                style={{ flex: 1, padding: '13px', border: '1.5px solid #e4c590', background: 'transparent', color: '#555', borderRadius: '6px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >Cancel</button>
              <button
                type="button" onClick={handleSend}
                style={{ flex: 2, padding: '13px', background: '#e4c590', color: '#0e0d0b', border: 'none', borderRadius: '6px', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}
              >Send via WhatsApp 📲</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- admin ---------- */

function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [previewImage, setPreviewImage] = useState(null)
  const [previewItem, setPreviewItem] = useState(null)
  const [editingName, setEditingName] = useState(null)
  const [editingValue, setEditingValue] = useState('')
  const [customNames, setCustomNames] = useState({})

  const API_URL = `http://${window.location.hostname}:3001`

  const handleAuth = () => {
    if (password === 'premnirvana2025') {
      setAuthenticated(true)
      setPassword('')
    } else {
      alert('Incorrect password')
      setPassword('')
    }
  }

  const allItems = MENU_CATEGORIES.flatMap((cat, catIdx) =>
    cat.items.map((item, itemIdx) => {
      let globalIndex = 0
      for (let i = 0; i < catIdx; i++) {
        globalIndex += MENU_CATEGORIES[i].items.length
      }
      return {
        number: globalIndex + itemIdx + 1,
        name: item,
        category: cat.name,
      }
    })
  )

  const handleImageSelect = (itemNumber, file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target.result)
      setPreviewItem(itemNumber)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async (itemNumber) => {
    if (!previewImage || previewItem !== itemNumber) {
      alert('Please select an image first')
      return
    }

    setUploadProgress({ ...uploadProgress, [itemNumber]: 'uploading' })

    try {
      const blob = await fetch(previewImage).then((r) => r.blob())
      const formData = new FormData()
      formData.append('image', blob, `${itemNumber}.jpg`)
      formData.append('itemNumber', itemNumber)

      const response = await fetch(`${API_URL}/api/upload-menu-image`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setUploadProgress({ ...uploadProgress, [itemNumber]: 'success' })
        setPreviewImage(null)
        setPreviewItem(null)
        setTimeout(() => {
          setUploadProgress({ ...uploadProgress, [itemNumber]: null })
        }, 2000)
      } else {
        setUploadProgress({ ...uploadProgress, [itemNumber]: 'error' })
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadProgress({ ...uploadProgress, [itemNumber]: 'error' })
    }
  }

  const handleEditName = (itemNumber, currentName) => {
    setEditingName(itemNumber)
    setEditingValue(customNames[itemNumber] || currentName)
  }

  const handleSaveName = async (itemNumber) => {
    if (!editingValue.trim()) {
      alert('Name cannot be empty')
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/update-name`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemNumber, name: editingValue }),
      })

      if (response.ok) {
        setCustomNames({ ...customNames, [itemNumber]: editingValue })
        setEditingName(null)
      } else {
        alert('Failed to save name')
      }
    } catch (error) {
      console.error('Error saving name:', error)
      alert('Error saving name: ' + error.message)
    }
  }

  const getDisplayName = (itemNumber, defaultName) => {
    return customNames[itemNumber] || defaultName
  }

  const copyAdminLink = () => {
    const url = `${window.location.origin}/admin`
    navigator.clipboard.writeText(url)
    alert('Admin link copied to clipboard!')
  }

  if (!authenticated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0e0d0b]">
        <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#e4c590] shadow-2xl max-w-md w-full mx-4">
          <h1 className="text-3xl text-[#e4c590] mb-6 font-bold">Admin Panel</h1>
          <p className="text-gray-400 mb-6">Enter password to access menu management</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            placeholder="Enter password"
            className="w-full bg-[#0a0a0a] border-2 border-[#e4c590] rounded px-4 py-2 text-white mb-4 focus:outline-none focus:border-[#d4a574]"
            autoFocus
          />
          <button
            onClick={handleAuth}
            className="w-full bg-[#e4c590] text-[#0e0d0b] py-2 rounded font-bold hover:bg-[#d4a574] transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0e0d0b] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#e4c590]">Menu Item Management</h1>
          <button
            onClick={copyAdminLink}
            className="bg-[#e4c590] text-[#0e0d0b] px-4 py-2 rounded font-bold hover:bg-[#d4a574] transition-colors"
          >
            📋 Copy Admin Link
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allItems.map((item) => (
            <div
              key={item.number}
              className="bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden hover:border-[#e4c590] transition-colors"
            >
              <div className="aspect-square overflow-hidden bg-[#0a0a0a] relative">
                <img
                  src={previewItem === item.number && previewImage ? previewImage : `/menu-images/${item.number}.jpg?t=${Date.now()}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `${IMG}/master/product_image/1187926847`
                  }}
                />
                {uploadProgress[item.number] === 'uploading' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-sm">Uploading...</div>
                  </div>
                )}
                {uploadProgress[item.number] === 'success' && (
                  <div className="absolute inset-0 bg-green-500/50 flex items-center justify-center">
                    <div className="text-white font-bold">✓ Uploaded</div>
                  </div>
                )}
                {uploadProgress[item.number] === 'error' && (
                  <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                    <div className="text-white text-sm">Error</div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="text-[#e4c590] font-bold text-lg mb-1">#{item.number}</div>

                {editingName === item.number ? (
                  <div className="mb-3 flex gap-2">
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="flex-1 bg-[#0a0a0a] border border-[#e4c590] rounded px-2 py-1 text-white text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveName(item.number)}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm font-bold"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditingName(null)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-white">{getDisplayName(item.number, item.name)}</h3>
                    <button
                      onClick={() => handleEditName(item.number, item.name)}
                      className="text-[#e4c590] hover:text-[#d4a574] text-xs ml-2"
                      title="Edit name"
                    >
                      ✏️
                    </button>
                  </div>
                )}

                <p className="text-gray-400 text-sm mb-4">{item.category}</p>

                <div className="space-y-2">
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageSelect(item.number, e.target.files?.[0])}
                      className="hidden"
                    />
                    <span className="block bg-[#333] hover:bg-[#444] text-white py-2 px-3 rounded text-center cursor-pointer text-sm transition-colors">
                      📸 Select Image
                    </span>
                  </label>

                  {previewItem === item.number && (
                    <button
                      onClick={() => handleUpload(item.number)}
                      disabled={uploadProgress[item.number] === 'uploading'}
                      className="w-full bg-[#e4c590] text-[#0e0d0b] py-2 px-3 rounded font-bold hover:bg-[#d4a574] transition-colors disabled:opacity-50 text-sm"
                    >
                      ✓ Upload
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- main ---------- */

export default function App() {
  const [activeTab, setActiveTab] = useState('story')
  const [activeMenu, setActiveMenu] = useState(MENU_CATEGORIES[0].name)
  const [menuOpen, setMenuOpen] = useState(false)
  const [testi, setTesti] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [statsRun, setStatsRun] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [activeLabelIndex, setActiveLabelIndex] = useState(null)
  const [showBackTop, setShowBackTop] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const statsRef = useRef(null)
  const specialtiesRef = useRef(null)

  // Listen for route changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // sticky header
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      setShowBackTop(window.scrollY > 500)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // trigger stat counters when in view
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsRun(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const tab = TABS.find((t) => t.id === activeTab)


  // reveal sections as they enter the viewport
  useEffect(() => {
    const elements = document.querySelectorAll('section, footer')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 }
    )

    elements.forEach((el) => {
      el.classList.add('reveal-section')
      obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  // auto-slide testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTesti((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // auto-slide specialties carousel every 2.5 seconds, loops back to start
  useEffect(() => {
    const el = specialtiesRef.current
    if (!el) return
    const interval = setInterval(() => {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 260, behavior: 'smooth' })
      }
    }, 2500)
    const pause = () => clearInterval(interval)
    el.addEventListener('mouseenter', pause)
    el.addEventListener('touchstart', pause, { passive: true })
    return () => {
      clearInterval(interval)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('touchstart', pause)
    }
  }, [])

  // Simple routing for /admin page
  const isAdminPath = currentPath.includes('/admin') || window.location.pathname.includes('/admin')

  if (isAdminPath) {
    return <AdminPage />
  }

  return (
    <div className="bg-ink text-white font-sans">
      {/* ===== Header ===== */}
      <header
        className="fixed top-0 inset-x-0 transition-all duration-500"
        style={{
          zIndex: 1000,
          paddingTop: '20px',
          paddingBottom: '20px',
          background: scrolled
            ? 'transparent'
            : 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
        }}
      >
        <div className="max-w-container mx-auto px-5 flex items-center justify-between">
          <a href="#home" className="nav-logo-link shrink-0 leading-none" aria-label="Prem Nirvana Caterers home">
            <img
              src="/logo.png"
              alt="Prem Nirvana Caterers"
              className="nav-logo-image object-contain"
              style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map(([label, href]) =>
              href ? (
                <a key={label} href={href} className="text-base font-semibold uppercase tracking-widest text-white/85 hover:text-gold transition-colors">
                  {label}
                </a>
              ) : (
                <button key={label} type="button" onClick={() => setMenuOpen(true)} className="nav-menu-btn text-base font-semibold uppercase tracking-widest text-white/85 hover:text-gold transition-colors" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {label}
                </button>
              )
            )}
          </nav>

          <button onClick={() => document.getElementById('forms').scrollIntoView({behavior:'smooth'})} className="hidden md:inline-block bg-none border-none cursor-pointer p-0">
            <span className="theme-btn">Book Now</span>
          </button>

          <button
            className="lg:hidden text-gold text-3xl flex items-center justify-center w-11 h-11"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-ink-deep border-t border-white/10 px-5 py-3 flex flex-col">
            {NAV.map(([label, href]) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm uppercase tracking-wider text-white/85 hover:text-gold border-b border-white/5 min-h-[44px] flex items-center"
                >
                  {label}
                </a>
              ) : (
                <button
                  key={label}
                  type="button"
                  onClick={() => { setMobileOpen(false); setMenuOpen(true) }}
                  className="text-left py-3 text-sm uppercase tracking-wider text-white/85 hover:text-gold border-b border-white/5 min-h-[44px] flex items-center"
                >
                  {label}
                </button>
              )
            )}
            <button
              onClick={() => { setMobileOpen(false); document.getElementById('forms').scrollIntoView({behavior:'smooth'}) }}
              className="mt-4 mb-2 theme-btn text-center w-full"
            >
              Book Now
            </button>
          </div>
        )}
      </header>

      {/* ===== Hero ===== */}
      <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/hero-video.mp4"
        />
        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3), rgba(14,13,11,0.35) 0%, rgba(14,13,11,0.72) 50%, rgba(14,13,11,0.88) 100%)' }} />
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-container mx-auto px-5 w-full flex justify-center">
            <div className="max-w-3xl text-center">
              <div className="text-gold tracking-widest text-sm uppercase animate-fade-in-up">
                PREM NIRVANA CATERERS
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4 animate-fade-in-up">
                From Our Kitchen to Your Celebration
              </h1>
              <p className="text-white/80 text-base md:text-lg text-center mb-8 animate-fade-in-up">
                Experience the warmth of homestyle cooking at every event.
              </p>
              <button className="theme-btn animate-fade-in-up" onClick={() => setMenuOpen(true)}>View Our Menu</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Every Dish Tells Our Story ===== */}
      <section id="about" className="relative py-16 md:py-24 bg-ink overflow-hidden">
        <div className="max-w-container mx-auto px-5 grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="relative">
            <img
              src={`${IMG}/images/resource/restaurant-11.jpg`}
              alt="Prem Nirvana Caterers"
              className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] object-cover"
            />
          </div>
          <div>
            <SectionTitle sub="Prem Nirvana Caterers" title="Every Dish Tells Our Story" />
            <div className="mt-6 space-y-4 text-muted leading-relaxed text-[15px]">
              <p>
                Prem Nirvana Caterers is one of the most loved and sought-after catering companies based out of
                Hyderabad. We offer end-to-end catering services for all kinds of Social and Corporate Events. Our
                philosophy is to produce great work at reasonable prices. We work only for one thing -- our clients'
                happiness.
              </p>
              <p>
                It feels more like a family. We understand that you are trusting us on probably one of the most
                important days of your life, and therefore, we take this personally. We work on your event as if it
                were our own family event.
              </p>
              <p>
                Our Services include end-to-end catering -- crockery, cutlery, servers, table layout etc -- for all kinds
                of weddings, pre-wedding events, cocktails, destination weddings, and corporate events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Best Specialties ===== */}
      <section id="specialties" className="py-16 md:py-24 bg-ink-deep">
        <div className="max-w-container mx-auto px-5">
          {/* Header row: centered title, arrows pinned to right */}
          <div className="relative flex items-center justify-center mb-10">
            <div className="text-center">
              <SectionTitle sub="Our Best Cusine" title="Best Specialties" centered />
            </div>
            <div className="absolute right-0 flex gap-2">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => specialtiesRef.current?.scrollBy({ left: -260, behavior: 'smooth' })}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-gold text-gold text-2xl leading-none hover:bg-gold hover:text-ink-deep transition-colors"
              >‹</button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => specialtiesRef.current?.scrollBy({ left: 260, behavior: 'smooth' })}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-gold text-gold text-2xl leading-none hover:bg-gold hover:text-ink-deep transition-colors"
              >›</button>
            </div>
          </div>

          {/* Carousel track — native scroll + snap on both mobile and desktop */}
          <div
            ref={specialtiesRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {SPECIALTIES.map((s) => (
              <div key={s.name} className="snap-start shrink-0 w-[45vw] sm:w-[200px] md:w-[230px] group">
                <div className="overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-[180px] sm:h-[240px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h4 className="mt-3 text-base md:text-xl text-center text-white group-hover:text-gold transition-colors">
                  {s.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== We Offer Top Notch ===== */}
      <section id="offer" className="relative py-16 md:py-24 bg-ink">
        <div className="max-w-container mx-auto px-5">
          <SectionTitle sub="Flavors for royalty" title="We Offer Top Notch" centered />
          <p className="mt-5 text-center text-muted max-w-2xl mx-auto text-sm md:text-base">
            Our menu is crafted with passion and precision, showcasing a diverse array of dishes prepared with the
            finest ingredients sourced locally and globally.
          </p>
          <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-5 md:gap-7">
            {OFFERS.map((o) => {
              const categoryMap = {
                'Cocktails': 'Drinks & Juices',
                'Cusine': 'Veg Currys',
                'Live stations': 'Live Counters',
              }
              const targetCategory = categoryMap[o.name] || MENU_CATEGORIES[0].name
              return (
                <div key={o.name} className="relative group overflow-hidden">
                  <img
                    src={o.img}
                    alt={o.name}
                    className="w-full h-[240px] sm:h-[300px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-center">
                    <h3 className="text-3xl text-white mb-2">{o.name}</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenu(targetCategory)
                        setMenuOpen(true)
                      }}
                      className="subtitle border-b border-gold pb-1 cursor-pointer hover:text-gold transition-colors bg-none border-none p-0"
                      style={{ background: 'none', border: 'none', padding: 0 }}
                    >
                      view menu
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ===== Menu section moved to fullscreen modal (MenuModal component) ===== */}

      {/* ===== Video + Stats ===== */}
      <section
        ref={statsRef}
        className="relative py-16 md:py-28 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${IMG}/images/background/slider3.jpg)` }}
      >
        <div className="absolute inset-0 bg-ink-deep/85" />
        <div className="relative z-10 max-w-container mx-auto px-5">
          <div className="flex justify-center mb-12 md:mb-20">
            <a
              href={`${IMG}/images/video.mp4`}
              target="_blank"
              rel="noreferrer"
              className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-gold text-ink-deep text-2xl md:text-3xl ripple-ring"
              aria-label="Watch video"
            >
              ▶
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {STATS.map((s) => (
              <StatBlock key={s.label} stat={s} run={statsRun} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tabbed Section ===== */}
      <section id="tabs" className="py-16 md:py-24 bg-ink">
        <div className="max-w-container mx-auto px-5">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 md:px-7 py-3.5 text-[11px] md:text-[13px] font-bold uppercase tracking-widest border transition-all min-h-[44px] ${
                  activeTab === t.id
                    ? 'bg-gold text-ink-deep border-gold'
                    : 'bg-transparent text-white/70 border-white/20 hover:border-gold hover:text-gold'
                }`}
              >
                {t.btn}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className={tab.imageRight ? 'lg:order-2' : ''}>
              <img
                src={tab.img}
                alt={tab.h}
                className="w-full h-[220px] sm:h-[320px] md:h-[380px] lg:h-[460px] object-cover"
                loading="lazy"
              />
            </div>
            <div className={tab.imageRight ? 'lg:order-1' : ''}>
              <SectionTitle sub={tab.sub} title={tab.h} />
              {tab.body && (
                <div className="mt-6 space-y-4 text-muted leading-relaxed text-[15px]">
                  {tab.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {tab.list && (
                <ul className="mt-6 space-y-3">
                  {tab.list.map((li, i) => (
                    <li key={i} className="flex gap-3 text-muted text-[15px]">
                      <span className="text-gold mt-1 shrink-0">◆</span>
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section
        className="relative py-16 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG}/images/resource/bg-1.jpg)` }}
      >
        <div className="absolute inset-0 bg-ink-deep/90" />
        <div className="relative z-10 max-w-container mx-auto px-5">
          <SectionTitle sub="testimonials" title="What People Are Saying" centered />

          <div className="mt-10 md:mt-14 max-w-3xl mx-auto text-center">
            <img
              src={`${IMG}/images/icons/quotes-1.png`}
              alt="quote"
              className="h-10 md:h-12 mx-auto mb-6 opacity-90"
            />
            <div className="flex justify-center gap-1 text-gold mb-6 text-lg">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
            <p className="text-white/85 text-base md:text-lg leading-relaxed min-h-[120px] md:min-h-[180px]">
              {TESTIMONIALS[testi].text}
            </p>
            <div className="mt-8 flex flex-col items-center">
              <img
                src={TESTIMONIALS[testi].img}
                alt={TESTIMONIALS[testi].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gold mb-3"
              />
              <div className="text-xl md:text-2xl text-gold">{TESTIMONIALS[testi].name}</div>
            </div>

            <div className="mt-8 flex justify-center gap-1">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTesti(i)}
                  className={`p-3 -m-1 flex items-center justify-center`}
                  aria-label={`Testimonial ${i + 1}`}
                >
                  <span className={`block rounded-full transition-all ${i === testi ? 'w-8 h-2.5 bg-gold' : 'w-2.5 h-2.5 bg-white/30'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ===== Event Gallery ===== */}
      <section id="events" className="py-16 md:py-24 bg-ink-deep">
        <div className="max-w-container mx-auto px-5">
          <SectionTitle sub="Event Gallery" title="Celebrations We Cater" centered />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 auto-rows-[140px] md:auto-rows-[180px] gap-3 md:gap-4">
            {GALLERY_IMAGES.map((image, index) => {
              const labels = [
                'Wedding Catering',
                'Buffet Catering Counter',
                'Corporate Event Catering',
                'Birthday Party Food',
                'Live Food Counters',
                'Indian Dessert Counter',
                'Cocktail & Bar Service',
                'Fashion Event Catering',
                'Live Music & Dining',
              ]
              const label = labels[index] || ''
              const labelActive = activeLabelIndex === index
              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => {
                    // Desktop: open immediately. Mobile: first tap shows label, second tap opens lightbox.
                    if (window.matchMedia('(hover: none)').matches) {
                      if (activeLabelIndex === index) {
                        setActiveLabelIndex(null)
                        setSelectedGallery(index)
                      } else {
                        setActiveLabelIndex(index)
                      }
                    } else {
                      setSelectedGallery(index)
                    }
                  }}
                  className={['group relative overflow-hidden rounded-lg border border-white/10', index % 4 === 0 ? 'md:row-span-2' : ''].join(' ')}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-transparent/10 transition-colors group-hover:bg-transparent/30" />
                  {/* Gradient + label: always visible on mobile when tapped, hover-only on desktop */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${labelActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  <div className={`absolute bottom-0 inset-x-0 p-3 md:p-4 text-gold font-bold text-xs md:text-sm transition-opacity duration-300 ${labelActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {label}
                    {labelActive && <span className="block text-white/60 text-[10px] font-normal mt-0.5">Tap again to open</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== Reserve / Contact Form ===== */}
      <section
        id="forms"
        className="relative py-16 md:py-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG}/images/background/raj.jpg)` }}
      >
        <div className="absolute inset-0 bg-ink-deep/90" />
        <div className="relative z-10 max-w-container mx-auto px-5">
          <div className="grid lg:grid-cols-3 gap-0 shadow-2xl">
            {/* form */}
            <div className="lg:col-span-2 bg-ink-deep/80 p-6 sm:p-10 md:p-14 border border-white/10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-2 leading-tight">WHAT ARE YOU WAITING FOR ?</h2>
              <p className="text-muted mb-8">
                Booking request{' '}
                <a href="tel:+917780797066" className="text-gold">
                  +91 7780797066
                </a>{' '}
                or fill out the order form
              </p>
              <form className="grid md:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
                <input className="ftinput" type="text" placeholder="Your Name" required />
                <input className="ftinput" type="text" placeholder="Phone Number" required />
                <select className="ftinput" defaultValue="" required>
                  <option value="" disabled>Event Type</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                  <option>House Party</option>
                  <option>Other</option>
                </select>
                <input className="ftinput" type="date" required />
                <input className="ftinput" type="text" placeholder="No of Person" required />
                <div className="hidden md:block" />
                <textarea className="ftinput md:col-span-2" rows="4" placeholder="Message" required />
                <div className="md:col-span-2">
                  <button type="submit" className="theme-btn w-full sm:w-auto">Enquiry Now</button>
                </div>
              </form>
            </div>

            {/* info card */}
            <div
              className="relative p-10 flex flex-col justify-center bg-cover bg-center border border-white/10"
              style={{ backgroundImage: `url(${IMG}/images/background/kundan.jpg)` }}
            >
              <div className="absolute inset-0 bg-transparent/70" />
              <div className="relative z-10 text-center">
                <div className="subtitle mb-2">We Are</div>
                <h5 className="text-3xl text-white mb-6">Premium Hyderabadi Catering</h5>
                <img src="/logo.png" alt="Prem Nirvana Caterers" className="mx-auto mb-6 h-24 md:h-36 w-auto object-contain" />
                <p className="text-white/85 leading-relaxed mb-6">
                  Call: +91 7780797066
                  <br />
                  gopinath@premnirvanacaterers.com
                </p>
                <a href="tel:+917780797066" className="theme-btn theme-btn-outline">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== Instagram ===== */}
      <section id="instagram" className="py-12 md:py-20 bg-ink">
        <div className="max-w-container mx-auto px-5">
          <SectionTitle sub="Instagram" title="Follow Us on Instagram" centered />
          <div className="mt-8 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
            {INSTAGRAM_IMAGES.map((image) => (
              <a
                key={image.src}
                href="https://www.instagram.com/premnirvanaevents"
                target="_blank"
                rel="noreferrer"
                className="group aspect-square overflow-hidden rounded-lg border border-white/10"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer
        className="relative pt-12 md:pt-20 pb-8 bg-cover bg-bottom"
        style={{ backgroundImage: `url(${IMG}/images/background/bg-14.png)` }}
      >
        <div className="absolute inset-0 bg-ink-deep/95" />
        <div className="relative z-10 max-w-container mx-auto px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-10 md:pb-14 border-b border-gold/30">
            <div>
              <img src="/logo.png" alt="Prem Nirvana Caterers" className="h-24 md:h-36 w-auto object-contain" />
            </div>

            <div>
              <h3 style={{ fontSize: '20px' }} className="text-gold mb-5 font-semibold">Important Links</h3>
              <ul style={{ lineHeight: '2' }} className="space-y-3 text-muted">
                {[['Home', '#home'], ['Menus', '#menu'], ['About us', '#about'], ['Our Gallery', '#events'], ['Contact', '#forms']].map(([l, href]) => (
                  <li key={l}>
                    <a href={href} style={{ fontSize: '16px' }} className="hover:text-gold transition-colors duration-200">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '18px' }} className="text-gold mb-5 font-semibold">Social Links</h3>
              <div className="flex gap-[15px]">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/chinna.nenavath"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-[50px] h-[50px] flex items-center justify-center rounded-full border-2 border-gold hover:bg-gold transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6 text-white group-hover:text-ink-deep transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/premnirvanaevents"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-[50px] h-[50px] flex items-center justify-center rounded-full border-2 border-gold hover:bg-gold transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 text-white group-hover:text-ink-deep transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.798.272-1.475.646-2.145 1.317-.67.67-1.045 1.347-1.317 2.145-.267.788-.468 1.658-.528 2.936C.008 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.528 2.936.272.798.646 1.475 1.317 2.145.67.67 1.347 1.045 2.145 1.317.788.267 1.658.468 2.936.528C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.936-.528.798-.272 1.475-.646 2.145-1.317.67-.67 1.045-1.347 1.317-2.145.267-.788.468-1.658.528-2.936.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.528-2.936-.272-.798-.646-1.475-1.317-2.145-.67-.67-1.347-1.045-2.145-1.317-.788-.267-1.658-.468-2.936-.528C15.667.008 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.17.054 1.805.244 2.227.408.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.17-.244 1.805-.408 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.17-.054-1.805-.244-2.227-.408-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.17.244-1.805.408-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07z"/>
                    <circle cx="12" cy="12" r="3.5"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-[50px] h-[50px] flex items-center justify-center rounded-full border-2 border-gold hover:bg-gold transition-all duration-200"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6 text-white group-hover:text-ink-deep transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/917780797066"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-[50px] h-[50px] flex items-center justify-center rounded-full border-2 border-gold hover:bg-gold transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <svg className="w-6 h-6 text-white group-hover:text-ink-deep transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a8.06 8.06 0 0 0-8.052 8.057c0 1.585.411 3.127 1.196 4.488L2.905 22.87l4.867-1.275a8.055 8.055 0 0 0 3.872.981h.005c4.442 0 8.054-3.582 8.054-8.057 0-2.142-.831-4.155-2.344-5.671-1.513-1.514-3.521-2.351-5.655-2.351"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '18px' }} className="text-gold mb-5 font-semibold">Contact Information</h3>
              <ul className="space-y-4 text-muted text-sm">
                <li className="leading-relaxed">
                  <a href="https://www.google.com/maps/place/PREM+NIRVANA+CATERERS/@17.335448,78.530705,16z/data=!4m6!3m5!1s0x3bcba390dfb4b941:0xcaf953f6764fbb03!8m2!3d17.3354483!4d78.5307051!16s%2Fg%2F11rkm_b2lx?hl=en&entry=ttu" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors duration-200">
                    📍 Beside Mega City School,<br/>
                    <span className="ml-6">Old Gayatri Nagar, Srinivasa Gayatri Nagar,</span><br/>
                    <span className="ml-6">Kharmanghat, Hyderabad - 500079</span>
                  </a>
                  <br/>
                  <a href="https://www.google.com/maps/place/PREM+NIRVANA+CATERERS/@17.335448,78.530705,16z/data=!4m6!3m5!1s0x3bcba390dfb4b941:0xcaf953f6764fbb03!8m2!3d17.3354483!4d78.5307051!16s%2Fg%2F11rkm_b2lx?hl=en&entry=ttu" target="_blank" rel="noreferrer" className="text-gold underline hover:text-white transition-colors duration-200 text-xs inline-block mt-2">
                    📍 View on Google Maps
                  </a>
                </li>
                <li>
                  <a href="mailto:gopinath@premnirvanacaterers.com" className="hover:text-gold transition-colors duration-200 flex items-center gap-2">
                    📧 <span>gopinath@premnirvanacaterers.com</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    📞 <div className="flex gap-2">
                      <a href="tel:+917780797066" className="hover:text-gold transition-colors duration-200">7780797066</a>
                      <span>/</span>
                      <a href="tel:+919949753542" className="hover:text-gold transition-colors duration-200">9949753542</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>


          <div className="pt-10">
            <a href="https://www.google.com/maps/place/PREM+NIRVANA+CATERERS/@17.335448,78.530705,16z/data=!4m6!3m5!1s0x3bcba390dfb4b941:0xcaf953f6764fbb03!8m2!3d17.3354483!4d78.5307051!16s%2Fg%2F11rkm_b2lx?hl=en&entry=ttu" target="_blank" rel="noreferrer" className="block hover:opacity-90 transition-opacity">
              <iframe
                title="Prem Nirvana Caterers Hyderabad location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5!2d78.5307051!3d17.3354483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba390dfb4b941%3A0xcaf953f6764fbb03!2sPREM%20NIRVANA%20CATERERS!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="h-72 w-full rounded-lg border border-white/10 pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </div>

          <div className="border-t border-gold/30 pt-8 text-center text-muted text-xs">
            © 2025 Prem Nirvana Caterers. All rights reserved.
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/919949753542?text=Hi!%20I'm%20interested%20in%20Prem%20Nirvana%20Caterers%20services.%20Can%20you%20share%20more%20details?"
        target="_blank"
        rel="noreferrer"
        className="contact-float whatsapp-float fixed bottom-[88px] left-5 z-[60] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 fill-current">
          <path d="M16.04 3.2c-7.02 0-12.72 5.66-12.72 12.64 0 2.23.59 4.41 1.7 6.34L3.2 28.8l6.82-1.79a12.83 12.83 0 0 0 6.02 1.52c7.02 0 12.72-5.66 12.72-12.64S23.06 3.2 16.04 3.2Zm0 22.98c-1.86 0-3.68-.5-5.27-1.44l-.38-.23-4.05 1.06 1.08-3.92-.25-.4a10.22 10.22 0 0 1-1.56-5.41c0-5.68 4.68-10.3 10.43-10.3 5.74 0 10.42 4.62 10.42 10.3s-4.68 10.34-10.42 10.34Zm5.72-7.73c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.82 1.02-1.01 1.23-.18.21-.37.23-.68.08-.31-.16-1.32-.48-2.51-1.54a9.38 9.38 0 0 1-1.73-2.14c-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.7-.98-2.33-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.22 3.38 5.38 4.74.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.36Z" />
        </svg>
      </a>

      <a
        href="tel:+919949753542"
        className="contact-float call-float fixed bottom-5 left-5 z-[60] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#1d74d8] text-white shadow-2xl transition-transform hover:scale-105"
        aria-label="Call Prem Nirvana Caterers"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.68-.37 1.04-.25 1.14.38 2.37.59 3.61.59.57 0 1 .43 1 1V20c0 .57-.43 1-1 1C10.61 21 3 13.39 3 4c0-.57.43-1 1-1h3.5c.57 0 1 .43 1 1 0 1.24.21 2.47.59 3.61.11.36.03.74-.25 1.04l-2.22 2.14Z" />
        </svg>
      </a>

      <FloatingChatbot />

      {showBackTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-40 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-ink-deep text-xl text-gold shadow-2xl transition-transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      {selectedGallery !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-transparent/85 p-5"
          onClick={() => setSelectedGallery(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 text-4xl text-white"
            onClick={() => setSelectedGallery(null)}
            aria-label="Close gallery image"
          >
            ×
          </button>
          <img
            src={GALLERY_IMAGES[selectedGallery].src}
            alt={GALLERY_IMAGES[selectedGallery].alt}
            className="max-h-[86vh] max-w-[92vw] rounded-lg object-contain"
          />
        </div>
      )}

      <MenuModal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
    </div>
  )
}
