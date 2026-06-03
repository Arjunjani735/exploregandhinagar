const app = document.querySelector("#app");

const navItems = [
  ["Home", "/"],
  ["Explore", "/explore"],
  ["Services", "/services"],
  ["Add Business or Service", "/add-business"],
  ["Emergency", "/emergency"],
  ["About", "/about"]
];

const adminItems = [
  ["Dashboard", "/admin"],
  ["Listings", "/admin/listings"],
  ["Events", "/admin/events"],
  ["Requests", "/admin/requests"],
  ["Subscriptions", "/admin/subscriptions"],
  ["Payments", "/admin/payments"],
  ["Categories", "/admin/categories"],
  ["Services", "/admin/services"],
  ["Reports", "/admin/reports"],
  ["Settings", "/admin/settings"],
  ["Add Listing", "/admin/add-listing"]
];

const listingTypes = [
  "place",
  "business",
  "service",
  "vendor",
  "emergency",
  "government",
  "hotel",
  "food",
  "healthcare",
  "education"
];

const paymentStatuses = ["unpaid", "payment_pending", "paid", "failed", "expired", "cancelled", "refunded"];
const approvalStatuses = ["pending", "approved", "rejected"];
const subscriptionStatuses = ["active", "expired", "inactive", "cancelled"];

const SECTOR_LOCALITY_OPTIONS = [
  "All Areas",
  "Sector 1",
  "Sector 2",
  "Sector 3",
  "Sector 4",
  "Sector 5",
  "Sector 6",
  "Sector 7",
  "Sector 8",
  "Sector 9",
  "Sector 10",
  "Sector 11",
  "Sector 12",
  "Sector 13",
  "Sector 14",
  "Sector 15",
  "Sector 16",
  "Sector 17",
  "Sector 18",
  "Sector 19",
  "Sector 20",
  "Sector 21",
  "Sector 22",
  "Sector 23",
  "Sector 24",
  "Sector 25",
  "Sector 26",
  "Sector 27",
  "Sector 28",
  "Sector 29",
  "Sector 30",
  "Kudasan",
  "Sargasan",
  "Raysan",
  "Randesan",
  "Infocity",
  "GIFT City",
  "Adalaj",
  "Koba",
  "Pethapur",
  "Chiloda",
  "Vavol"
];
const sectors = SECTOR_LOCALITY_OPTIONS;

const LISTING_PLANS = {
  standard_249: {
    id: "standard_249",
    name: "Standard Listing",
    price: 249,
    description: "Public listing in Explore, category, and locality filters after payment and admin approval.",
    features: [
      "Public listing after admin approval",
      "Appear in Explore search",
      "Appear in category and locality filters",
      "Add contact, address, WhatsApp, image, and Google Maps direction link",
      "Monthly visibility to local users",
      "Admin verification before publishing"
    ]
  },
  featured_499: {
    id: "featured_499",
    name: "Featured Top Placement",
    price: 499,
    description: "Higher visibility and priority placement across relevant public pages after approval.",
    features: [
      "Everything in Standard Listing",
      "Featured placement on relevant pages",
      "Priority display in category and service results",
      "Eligible for homepage Featured and Popular sections",
      "Featured badge on listing card",
      "Admin approval before publishing"
    ]
  }
};

function planById(planId = "standard_249") {
  return LISTING_PLANS[planId] || LISTING_PLANS.standard_249;
}

function localityOptions(selected = "", includeAll = false) {
  const options = includeAll ? SECTOR_LOCALITY_OPTIONS : SECTOR_LOCALITY_OPTIONS.slice(1);
  return options.map((item) => `<option value="${item}" ${selected === item ? "selected" : ""}>${item}</option>`).join("");
}

let serviceGroups = [
  ["Home & Repair Services", ["Electrician", "Plumber", "Carpenter", "AC repair", "Refrigerator repair", "Washing machine repair", "RO/water purifier repair", "Appliance repair", "Pest control", "Painting services", "Civil work", "Home cleaning", "Sofa/carpet cleaning"]],
  ["Personal & Lifestyle Services", ["Salon", "Beauty parlour", "Spa", "Mehndi artist", "Makeup artist", "Tailor", "Laundry", "Dry cleaning"]],
  ["Professional Services", ["CA / accountant", "Lawyer / advocate", "Insurance agent", "Real estate agent", "Property consultant", "Loan consultant", "Tax consultant", "Digital marketing agency", "Web development agency", "Photographer", "Videographer", "Event planner"]],
  ["Health & Care Services", ["Doctor clinic", "Dentist", "Physiotherapist", "Pathology lab", "Home nursing", "Elder care", "Veterinary doctor", "Pet grooming", "Ambulance service"]],
  ["Education & Coaching Services", ["Tuition classes", "Coaching centre", "Computer classes", "Spoken English classes", "Dance classes", "Music classes", "Yoga trainer", "Gym/fitness trainer"]],
  ["Vehicle & Travel Services", ["Car repair", "Bike repair", "Car wash", "Tyre puncture repair", "Driving school", "Taxi service", "Travel agent", "Packers and movers"]],
  ["Business & Daily Utility Services", ["Courier service", "Printing service", "Mobile repair", "Laptop/computer repair", "CCTV installation", "Internet/broadband service", "Security service", "Catering service", "Tiffin service"]]
];

let serviceCategories = serviceGroups.flatMap((group) => group[1]);

let categories = [
  ["tourist-places", "Tourist Places", "Landmarks, museums, gardens, and cultural stops for visitors and locals.", "map"],
  ["government-offices", "Government Offices", "Civic offices, public departments, and administrative destinations.", "building"],
  ["hospitals", "Hospitals", "Hospitals, clinics, diagnostics, and health support across the city.", "heart"],
  ["veterinary-clinics", "Veterinary Clinics", "Pet doctors, animal care, grooming, and emergency care.", "heart"],
  ["restaurants", "Food & Dining", "Restaurants, family dining rooms, quick bites, and local food destinations.", "utensils"],
  ["cafe", "Cafe", "Coffee shops, study corners, dessert bars, and casual meeting spots.", "utensils"],
  ["hotels", "Hotels", "Hotels, guest houses, and short-stay options for Gandhinagar visitors.", "bed"],
  ["street-food", "Street Food / Street Vendors", "Local snacks, stalls, carts, and fast bites around the city.", "utensils"],
  ["shopping", "Shopping", "Markets, shops, malls, boutiques, and daily retail.", "bag"],
  ["education", "Education", "Schools, colleges, coaching, and learning centres.", "book"],
  ["banks-atms", "Banks / ATMs", "Bank branches, ATMs, and financial access points.", "bank"],
  ["transport", "Transport", "Bus stops, taxi points, railway access, and travel services.", "car"],
  ["emergency-services", "Emergency Services", "Police, fire, ambulance, helplines, and urgent support.", "alert"],
  ["parks-gardens", "Parks and Gardens", "Green spaces, walking routes, family parks, and gardens.", "leaf"],
  ["temples", "Religious Places", "Temples, spiritual places, and quiet public worship spaces.", "spark"],
  ["local-services", "Local Services", "Repair, home help, personal services, and professional support.", "tool"],
  ["events", "Events", "City happenings, community activities, and cultural programs.", "calendar"],
  ["other", "Other", "Useful local entries that do not fit a standard category yet.", "dot"]
].map(([slug, name, description, icon]) => ({ id: slug, slug, name, description, icon }));

try {
  categories = JSON.parse(localStorage.getItem("gcg_categories")) || categories;
  serviceGroups = JSON.parse(localStorage.getItem("gcg_service_groups")) || serviceGroups;
  serviceCategories = serviceGroups.flatMap((group) => group[1]);
} catch {}

categories = categories.map((category) => (category.id === "events-activities" ? { ...category, id: "events", slug: "events", name: "Events" } : category));
if (!categories.some((category) => category.id === "events")) {
  categories.push({ id: "events", slug: "events", name: "Events", description: "City happenings, community activities, and cultural programs.", icon: "calendar" });
}

const imagePool = {
  // TODO: Replace placeholder with verified Gandhinagar image asset.
  temple: "https://commons.wikimedia.org/wiki/Special:FilePath/Akshardham%20Gandhinagar.jpg?width=1200",
  city: "/assets/gandhinagar-hero.png",
  park: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
  hospital: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1100&q=80",
  market: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1100&q=80",
  hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=80",
  food: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1100&q=80",
  cafe: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1100&q=80",
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=80",
  service: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1100&q=80",
  salon: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1100&q=80",
  laptop: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80",
  car: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1100&q=80",
  bank: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1100&q=80",
  gift: "https://commons.wikimedia.org/wiki/Special:FilePath/GIFT%20City%20Gandhinagar.jpg?width=1200",
  event: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1100&q=80",
  workshop: "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1100&q=80",
  yoga: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=80"
};

function daysFromNow(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function makeListing(input) {
  const now = new Date().toISOString();
  const selectedPlanId = input.subscription_plan === "featured_499" || (!input.subscription_plan && input.featured) ? "featured_499" : "standard_249";
  const selectedPlan = planById(selectedPlanId);
  const featured = selectedPlanId === "featured_499" ? Boolean(input.featured ?? true) : Boolean(input.featured);
  return {
    id: input.id || crypto.randomUUID(),
    name: input.name,
    slug: input.slug || slugify(input.name),
    listing_type: input.listing_type,
    category_id: input.category_id,
    category_name: categoryName(input.category_id),
    service_category: input.service_category || "",
    description: input.description,
    full_address: input.full_address,
    sector_locality: input.sector_locality,
    city: "Gandhinagar",
    phone: input.phone || "079-4000-0000",
    whatsapp: input.whatsapp || input.phone || "919999999999",
    email: input.email || "",
    website: input.website || "",
    social_media: input.social_media || "",
    opening_hours: input.opening_hours || "9:00 AM - 8:00 PM",
    availability: input.availability || "",
    services_products: input.services_products || "",
    services_offered: input.services_offered || String(input.services_products || input.service_category || "").split(",").map((item) => item.trim()).filter(Boolean),
    service_area: input.service_area || "",
    service_area_covered: input.service_area_covered || input.service_area || "",
    home_visit_available: Boolean(input.home_visit_available),
    emergency_available: Boolean(input.emergency_available),
    price_starts_from: input.price_starts_from || "",
    google_maps_url: input.google_maps_url || "https://maps.google.com/?q=Gandhinagar",
    map_url: input.map_url || input.google_maps_url || "https://maps.google.com/?q=Gandhinagar",
    latitude: input.latitude || "",
    longitude: input.longitude || "",
    images: [input.image || imagePool.city],
    logo: "",
    payment_status: input.payment_status || "paid",
    approval_status: input.approval_status || "approved",
    subscription_status: input.subscription_status || "active",
    subscription_start_date: input.subscription_start_date || daysFromNow(-20),
    subscription_end_date: input.subscription_end_date || daysFromNow(80),
    plan_id: selectedPlan.id,
    plan_name: selectedPlan.name,
    plan_price: selectedPlan.price,
    subscription_plan: selectedPlan.id,
    subscription_plan_name: selectedPlan.name,
    subscription_price: selectedPlan.price,
    subscription_duration_days: 30,
    featured_until: input.featured_until || (selectedPlanId === "featured_499" ? input.subscription_end_date || daysFromNow(80) : ""),
    placement_priority: Number(input.placement_priority || (selectedPlanId === "featured_499" ? 100 : 0)),
    admin_featured_override: Boolean(input.admin_featured_override),
    payment_id: input.payment_id || `PAY-${String(input.id || input.name).replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase()}`,
    payment_date: input.payment_date || (input.payment_status === "paid" ? daysFromNow(-20) : ""),
    payment_note: input.payment_note || "",
    renewal_status: input.renewal_status || "manual",
    featured,
    verified: Boolean(input.verified),
    rating_placeholder: input.rating_placeholder || Number((4.2 + Math.random() * 0.7).toFixed(1)),
    tags: input.tags || [],
    owner_name: input.owner_name || "City Guide Team",
    created_at: input.created_at || now,
    updated_at: input.updated_at || now
  };
}

function seedListings() {
  const services = [
    ["Sector 21 Power Care", "Electrician", "Sector 21", "Fast electrical repair, wiring checks, fan installation, and switchboard service.", imagePool.service, true, false],
    ["Aarav Plumbing Works", "Plumber", "Sector 15", "Leak repairs, bathroom fittings, tank cleaning support, and urgent plumbing visits.", imagePool.service, true, true],
    ["CoolCare AC Repair Kudasan", "AC repair", "Kudasan", "AC servicing, gas refill, installation, and seasonal maintenance for homes and offices.", imagePool.service, true, true],
    ["Sargasan Glow Salon", "Salon", "Sargasan", "Hair styling, grooming, beauty treatments, bridal packages, and home appointment options.", imagePool.salon, false, false],
    ["Infocity Ledger CA Services", "CA / accountant", "Infocity", "Accounting, GST, tax return filing, compliance support, and small-business advisory.", imagePool.office, false, false],
    ["Raysan Fresh Home Cleaning", "Home cleaning", "Raysan", "Deep cleaning, kitchen cleaning, sofa cleaning, and move-in cleaning services.", imagePool.service, true, false],
    ["Sector 26 Motor Garage", "Car repair", "Sector 26", "General car repairs, diagnostics, servicing, brake work, and emergency roadside checks.", imagePool.car, false, true],
    ["Sector 11 Laptop Clinic", "Laptop/computer repair", "Sector 11", "Laptop repairs, SSD upgrades, OS installation, data recovery, and office support.", imagePool.laptop, false, false],
    ["GIFT City Tiffin House", "Tiffin service", "GIFT City", "Daily vegetarian tiffins, office lunch plans, and monthly subscription meals.", imagePool.food, true, false],
    ["Koba Frame Studio", "Photographer", "Koba", "Events, portraits, product shoots, corporate photography, and video coverage.", imagePool.office, false, false],
    ["Vavol Pest Shield", "Pest control", "Vavol", "Termite, cockroach, mosquito, and residential pest control with follow-up visits.", imagePool.service, true, false],
    ["Sector 22 Tailor Studio", "Tailor", "Sector 22", "Alterations, blouse stitching, formal wear fitting, and custom tailoring.", imagePool.salon, false, false]
  ];

  const serviceListings = services.map(([name, service_category, sector_locality, description, image, home, emergency], index) =>
    makeListing({
      id: `svc-${index + 1}`,
      name,
      listing_type: "service",
      category_id: "local-services",
      service_category,
      sector_locality,
      description,
      full_address: `${sector_locality}, Gandhinagar`,
      phone: `079-401${index}22${index}`,
      whatsapp: `91987654${String(index).padStart(3, "0")}`,
      services_products: service_category,
      service_area: `${sector_locality} and nearby sectors`,
      home_visit_available: home,
      emergency_available: emergency,
      price_starts_from: index % 3 === 0 ? "₹299" : "₹499",
      image,
      featured: index < 4,
      verified: index % 2 === 0,
      tags: ["service", service_category, sector_locality]
    })
  );

  const places = [
    ["Akshardham Temple", "place", "temples", "Sector 20", "A major spiritual and cultural landmark known for architecture, gardens, and exhibitions.", imagePool.temple, true, true],
    ["Mahatma Mandir", "place", "tourist-places", "Sector 13", "Convention and cultural venue used for summits, exhibitions, and public events.", imagePool.city, true, true],
    ["Indroda Nature Park", "place", "parks-gardens", "Sector 7", "Expansive nature park with botanical areas, fossils, trails, and family-friendly outdoor time.", imagePool.park, true, true],
    ["Gandhinagar Civil Hospital", "healthcare", "hospitals", "Sector 12", "Public hospital access point for general care, emergency support, and diagnostics.", imagePool.hospital, false, true],
    ["Sector 21 Market", "business", "shopping", "Sector 21", "Busy local market for daily shopping, snacks, clothing, and household needs.", imagePool.market, true, false],
    ["Pathikashram Guest House", "hotel", "hotels", "Sector 11", "Convenient stay option for visitors, officials, and families near city offices.", imagePool.hotel, false, true],
    ["GIFT City Business District", "business", "tourist-places", "GIFT City", "Modern financial and business district with offices, dining, and urban public spaces.", imagePool.gift, true, true],
    ["Infocity IT Park", "business", "shopping", "Infocity", "Technology and office hub with cafes, services, and business support nearby.", imagePool.office, false, true],
    ["Capital Comfort Hotel", "hotel", "hotels", "Kudasan", "Hotel sample with rooms, breakfast, parking, and business traveler conveniences.", imagePool.hotel, true, true],
    ["Sabarmati Family Restaurant", "food", "restaurants", "Sargasan", "Family restaurant sample serving Gujarati, Punjabi, Chinese, and quick lunch options.", imagePool.food, true, true],
    ["Sector 21 Coffee House", "food", "cafe", "Sector 21", "Warm cafe sample for espresso, sandwiches, desserts, and relaxed meetups near the market.", imagePool.cafe, true, true],
    ["Kudasan Brew Corner", "food", "cafe", "Kudasan", "Compact neighbourhood cafe sample with cold coffee, snacks, and evening hangout seating.", imagePool.cafe, false, true],
    ["Sargasan Work Cafe", "food", "cafe", "Sargasan", "Study and work-friendly cafe sample with coffee, Wi-Fi style seating, and light bites.", imagePool.cafe, true, true],
    ["Sector 22 Dabeli Cart", "vendor", "street-food", "Sector 22", "Street food vendor sample for dabeli, sandwiches, tea, and evening snacks.", imagePool.food, false, false],
    ["Collector Office Gandhinagar", "government", "government-offices", "Sector 11", "Government office sample for district administration and public services.", imagePool.office, false, true],
    ["Pethapur Pet Care Clinic", "healthcare", "veterinary-clinics", "Pethapur", "Veterinary clinic sample for pet checkups, vaccination, and basic animal care.", imagePool.hospital, false, true],
    ["Sector 16 National Bank ATM", "business", "banks-atms", "Sector 16", "Bank and ATM sample for cash withdrawal, deposits, and branch assistance.", imagePool.bank, false, true],
    ["Sarita Udyan", "place", "parks-gardens", "Sector 9", "Public garden sample for walks, families, and quiet green time.", imagePool.park, false, true],
    ["Adalaj Stepwell", "place", "tourist-places", "Adalaj", "Historic stepwell destination near Gandhinagar with intricate architecture.", imagePool.temple, true, true],
    ["GH-4 Bus Stop", "place", "transport", "Sector 16", "Transport point sample for local buses, autos, and city connections.", imagePool.city, false, false],
    ["Gandhinagar Fire Emergency", "emergency", "emergency-services", "Sector 17", "Emergency service sample for fire and urgent city support.", imagePool.hospital, false, true],
    ["Sector 11 Police Station", "emergency", "emergency-services", "Sector 11", "Police help point sample for public safety, reporting, and urgent assistance.", imagePool.office, false, true],
    ["108 Ambulance Control Point", "emergency", "emergency-services", "Sector 12", "Ambulance support sample for urgent medical transport and accident response.", imagePool.hospital, false, true],
    ["Civil Blood Bank", "emergency", "emergency-services", "Sector 12", "Blood bank sample for emergency blood availability and hospital coordination.", imagePool.hospital, false, true],
    ["Sector 16 Night Pharmacy", "emergency", "emergency-services", "Sector 16", "24/7 pharmacy sample for urgent medicine access near central sectors.", imagePool.hospital, false, true],
    ["Kudasan Emergency Clinic", "healthcare", "hospitals", "Kudasan", "Emergency medical clinic sample for urgent primary care and first response.", imagePool.hospital, false, true]
  ];

  return [
    ...serviceListings,
    ...places.map(([name, listing_type, category_id, sector_locality, description, image, featured, verified], index) =>
      makeListing({
        id: `place-${index + 1}`,
        name,
        listing_type,
        category_id,
        sector_locality,
        description,
        full_address: `${sector_locality}, Gandhinagar`,
        phone: `079-232${index}10${index}`,
        whatsapp: `91990011${String(index).padStart(3, "0")}`,
        services_products: categoryName(category_id),
        image,
        featured,
        verified,
        emergency_available: listing_type === "emergency" || category_id === "hospitals",
        tags: [categoryName(category_id), sector_locality, listing_type]
      })
    ),
    makeListing({
      id: "pending-demo",
      name: "Pending Demo Caterer",
      listing_type: "service",
      category_id: "local-services",
      service_category: "Catering service",
      sector_locality: "Randesan",
      description: "Submitted catering service waiting for admin approval after payment.",
      full_address: "Randesan, Gandhinagar",
      payment_status: "paid",
      approval_status: "pending",
      subscription_status: "active",
      image: imagePool.food,
      tags: ["pending", "catering"]
    }),
    makeListing({
      id: "unpaid-demo",
      name: "Unpaid Demo Laundry",
      listing_type: "service",
      category_id: "local-services",
      service_category: "Laundry",
      sector_locality: "Koba",
      description: "Laundry service request with payment pending.",
      full_address: "Koba, Gandhinagar",
      payment_status: "payment_pending",
      approval_status: "pending",
      subscription_status: "active",
      image: imagePool.salon,
      tags: ["unpaid", "laundry"]
    })
  ];
}

const defaultReports = [
  {
    id: "report-1",
    listing_id: "place-4",
    user_message: "Phone number should be verified again.",
    reporter_contact: "localuser@example.com",
    status: "new",
    created_at: daysFromNow(-2),
    updated_at: daysFromNow(-2)
  }
];

const eventCategories = ["Cultural", "Food", "Business", "Family", "Education", "Health", "Sports", "Community", "Religious", "Workshop"];

function makeEvent(input) {
  const now = new Date().toISOString();
  return {
    id: input.id || crypto.randomUUID(),
    title: input.title,
    slug: input.slug || slugify(input.title),
    category: input.category,
    description: input.description,
    event_date: input.event_date,
    start_time: input.start_time,
    end_time: input.end_time || "",
    venue_name: input.venue_name,
    full_address: input.full_address,
    sector_locality: input.sector_locality,
    city: "Gandhinagar",
    phone: input.phone || "",
    whatsapp: input.whatsapp || "",
    email: input.email || "",
    website: input.website || "",
    map_url: input.map_url || "https://maps.google.com/?q=Gandhinagar",
    image: input.image || imagePool.event,
    image_alt: input.image_alt || input.title,
    tags: input.tags || [],
    price_label: input.price_label || "Free",
    featured: Boolean(input.featured),
    status: input.status || "published",
    created_at: input.created_at || now,
    updated_at: input.updated_at || now
  };
}

function seedEvents() {
  return [
    makeEvent({ id: "event-1", title: "Weekend Food Festival", category: "Food", description: "A curated evening of local snacks, family food stalls, music, and pop-up vendors.", event_date: daysFromNow(5), start_time: "18:30", end_time: "22:00", venue_name: "Sector 17 Ground", full_address: "Sector 17, Gandhinagar", sector_locality: "Sector 17", image: imagePool.food, price_label: "Free entry", featured: true, tags: ["food", "family"] }),
    makeEvent({ id: "event-2", title: "Cultural Evening at Sector 17", category: "Cultural", description: "Open-air performances, local artists, folk music, and community gathering.", event_date: daysFromNow(7), start_time: "19:00", venue_name: "Town Hall Lawn", full_address: "Sector 17, Gandhinagar", sector_locality: "Sector 17", image: imagePool.event, price_label: "Free", featured: true, tags: ["culture", "music"] }),
    makeEvent({ id: "event-3", title: "Kids Activity Day", category: "Family", description: "Crafts, reading corners, simple games, and safe family-friendly activities.", event_date: daysFromNow(9), start_time: "10:00", end_time: "13:00", venue_name: "Sarita Udyan Activity Zone", full_address: "Sector 9, Gandhinagar", sector_locality: "Sector 9", image: imagePool.park, price_label: "Registration required", featured: false, tags: ["kids", "family"] }),
    makeEvent({ id: "event-4", title: "Heritage Walk", category: "Community", description: "Guided morning walk around heritage spots with local history notes.", event_date: daysFromNow(11), start_time: "07:30", venue_name: "Adalaj Stepwell Entrance", full_address: "Adalaj, Gandhinagar", sector_locality: "Adalaj", image: imagePool.temple, price_label: "Rs 99 onwards", featured: true, tags: ["heritage", "walk"] }),
    makeEvent({ id: "event-5", title: "Local Business Meetup", category: "Business", description: "A small networking session for founders, vendors, agencies, and service providers.", event_date: daysFromNow(13), start_time: "17:30", venue_name: "Infocity Co-work Hall", full_address: "Infocity, Gandhinagar", sector_locality: "Infocity", image: imagePool.office, price_label: "Invite only", featured: false, tags: ["business", "networking"] }),
    makeEvent({ id: "event-6", title: "Garden Yoga Session", category: "Health", description: "A calm morning yoga session in a garden setting for residents and visitors.", event_date: daysFromNow(3), start_time: "06:30", venue_name: "Sector 9 Garden", full_address: "Sector 9, Gandhinagar", sector_locality: "Sector 9", image: imagePool.yoga, price_label: "Free", featured: true, tags: ["health", "yoga"] }),
    makeEvent({ id: "event-7", title: "Startup Networking at GIFT City", category: "Business", description: "Founders, students, and professionals meet for product demos and local startup conversations.", event_date: daysFromNow(16), start_time: "18:00", venue_name: "GIFT City Business Club", full_address: "GIFT City, Gandhinagar", sector_locality: "GIFT City", image: imagePool.gift, price_label: "Registration required", featured: true, tags: ["startup", "gift city"] }),
    makeEvent({ id: "event-8", title: "Health Awareness Camp", category: "Health", description: "Basic screening, doctor talks, and preventive health guidance for residents.", event_date: daysFromNow(18), start_time: "09:00", venue_name: "Civil Hospital Community Hall", full_address: "Sector 12, Gandhinagar", sector_locality: "Sector 12", image: imagePool.hospital, price_label: "Free", featured: false, tags: ["health", "camp"] }),
    makeEvent({ id: "event-9", title: "Book Fair in Sector 21", category: "Education", description: "Publishers, local booksellers, reading corners, and student-friendly book stalls.", event_date: daysFromNow(20), start_time: "11:00", venue_name: "Sector 21 Market Plaza", full_address: "Sector 21, Gandhinagar", sector_locality: "Sector 21", image: imagePool.market, price_label: "Free entry", featured: false, tags: ["books", "education"] }),
    makeEvent({ id: "event-10", title: "Cafe Music Night", category: "Cultural", description: "An intimate acoustic evening with young artists, coffee, and community tables.", event_date: daysFromNow(22), start_time: "20:00", venue_name: "Sector 21 Coffee House", full_address: "Sector 21, Gandhinagar", sector_locality: "Sector 21", image: imagePool.cafe, price_label: "Rs 149 onwards", featured: true, tags: ["cafe", "music"] }),
    makeEvent({ id: "event-draft", title: "Draft Admin Event", category: "Workshop", description: "Draft sample for admin testing. It should not appear publicly until published.", event_date: daysFromNow(25), start_time: "15:00", venue_name: "Admin Preview Hall", full_address: "Sector 11, Gandhinagar", sector_locality: "Sector 11", image: imagePool.workshop, price_label: "TBD", status: "draft", featured: false })
  ];
}

const appState = {
  addBusiness: {
    pendingForm: null,
    paymentPaid: false,
    paymentStatus: "unpaid",
    selectedPlanId: "standard_249",
    step: 1,
    submitted: false,
    error: ""
  },
  adminNotice: "",
  menuOpen: false,
  adminMenuOpen: false,
  featuredStart: 0,
  weather: {
    loading: false,
    temp: 32,
    condition: "Clear sky",
    humidity: 42,
    wind: 9,
    feelsLike: 34,
    updatedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }
};

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function categoryName(id) {
  return categories.find((category) => category.id === id)?.name || "Other";
}

function categoryDescription(id) {
  return categories.find((category) => category.id === id)?.description || "Useful Gandhinagar listings.";
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureSeed() {
  if (localStorage.getItem("gcg_seed_v5") !== "ready") {
    const seeded = seedListings();
    const current = load("gcg_listings", []);
    const currentIds = new Set(current.map((item) => item.id));
    save("gcg_listings", [...current, ...seeded.filter((item) => !currentIds.has(item.id))]);
    if (!localStorage.getItem("gcg_events")) save("gcg_events", seedEvents());
    if (!localStorage.getItem("gcg_reports")) save("gcg_reports", defaultReports);
    if (!localStorage.getItem("gcg_categories")) save("gcg_categories", categories);
    if (!localStorage.getItem("gcg_service_groups")) save("gcg_service_groups", serviceGroups);
    localStorage.setItem("gcg_seed_v5", "ready");
  }
}

function listings() {
  return load("gcg_listings", seedListings()).map(normalizeListingPlan).map(updateSubscriptionStatus);
}

function setListings(next) {
  save("gcg_listings", next.map(updateSubscriptionStatus));
}

function reports() {
  return load("gcg_reports", defaultReports);
}

function setReports(next) {
  save("gcg_reports", next);
}

function events() {
  return load("gcg_events", seedEvents());
}

function setEvents(next) {
  save("gcg_events", next);
}

function publicEvents() {
  return events().filter((event) => event.status === "published");
}

function publicListings() {
  return sortFeaturedFirst(listings().filter(isPublicListing));
}

function normalizeListingPlan(listing) {
  const legacyFeatured = listing.subscription_plan === "featured_499" || (listing.featured && listing.subscription_plan !== "standard_249");
  const planId = listing.subscription_plan === "featured_499" || listing.plan_id === "featured_499" || legacyFeatured ? "featured_499" : "standard_249";
  const plan = planById(planId);
  return {
    ...listing,
    plan_id: plan.id,
    plan_name: plan.name,
    plan_price: plan.price,
    subscription_plan: plan.id,
    subscription_plan_name: plan.name,
    subscription_price: plan.price,
    subscription_duration_days: listing.subscription_duration_days || 30,
    placement_priority: Number(listing.placement_priority || (plan.id === "featured_499" ? 100 : 0)),
    featured_until: listing.featured_until || (plan.id === "featured_499" ? listing.subscription_end_date || "" : ""),
    admin_featured_override: Boolean(listing.admin_featured_override),
    featured: plan.id === "featured_499" ? Boolean(listing.featured ?? legacyFeatured) : Boolean(listing.featured && listing.admin_featured_override)
  };
}

function isPublicListing(listing) {
  const today = new Date().toISOString().slice(0, 10);
  const current = updateSubscriptionStatus(listing);
  return (
    current.payment_status === "paid" &&
    current.approval_status === "approved" &&
    current.subscription_status === "active" &&
    current.subscription_end_date >= today
  );
}

function isSubscriptionActive(listing) {
  const today = new Date().toISOString().slice(0, 10);
  const current = updateSubscriptionStatus(listing);
  return current.subscription_status === "active" && current.subscription_end_date >= today;
}

function isFeaturedListing(listing) {
  const current = updateSubscriptionStatus(normalizeListingPlan(listing));
  return (
    current.featured === true &&
    current.payment_status === "paid" &&
    current.approval_status === "approved" &&
    isSubscriptionActive(current) &&
    (current.subscription_plan === "featured_499" || current.admin_featured_override === true)
  );
}

function sortFeaturedFirst(items) {
  return [...items].sort((a, b) => {
    const featuredDelta = Number(isFeaturedListing(b)) - Number(isFeaturedListing(a));
    if (featuredDelta) return featuredDelta;
    const priorityDelta = Number(b.placement_priority || 0) - Number(a.placement_priority || 0);
    if (priorityDelta) return priorityDelta;
    return String(b.created_at || "").localeCompare(String(a.created_at || ""));
  });
}

function updateSubscriptionStatus(listing) {
  const today = new Date().toISOString().slice(0, 10);
  const next = { ...listing };
  if (["cancelled", "failed", "refunded", "unpaid", "payment_pending"].includes(next.payment_status)) {
    next.subscription_status = next.payment_status === "cancelled" ? "cancelled" : "inactive";
  } else if (next.subscription_end_date && next.subscription_end_date < today) {
    next.subscription_status = "expired";
    if (next.payment_status === "paid") next.payment_status = "expired";
    next.featured = false;
  } else if (next.payment_status === "paid") {
    next.subscription_status = "active";
  }
  return next;
}

function applyPlan(listing, planId) {
  const plan = planById(planId);
  const featuredPlan = plan.id === "featured_499";
  return {
    ...listing,
    plan_id: plan.id,
    plan_name: plan.name,
    plan_price: plan.price,
    subscription_plan: plan.id,
    subscription_plan_name: plan.name,
    subscription_price: plan.price,
    placement_priority: featuredPlan ? Math.max(Number(listing.placement_priority || 0), 100) : 0,
    featured: featuredPlan ? Boolean(listing.featured ?? true) : Boolean(listing.admin_featured_override && listing.featured),
    featured_until: featuredPlan ? listing.subscription_end_date || listing.featured_until || daysFromNow(30) : "",
    updated_at: new Date().toISOString()
  };
}

function markPaymentPaid(listingId) {
  const today = new Date().toISOString().slice(0, 10);
  const end = daysFromNow(30);
  setListings(
    listings().map((listing) =>
      listing.id === listingId
        ? updateSubscriptionStatus(applyPlan({
            ...listing,
            payment_status: "paid",
            subscription_status: "active",
            subscription_start_date: listing.subscription_start_date && listing.subscription_start_date <= today ? listing.subscription_start_date : today,
            subscription_end_date: listing.subscription_end_date && listing.subscription_end_date >= today ? listing.subscription_end_date : end,
            payment_date: today,
            updated_at: new Date().toISOString()
          }, listing.subscription_plan))
        : listing
    )
  );
}

function extendSubscription(listingId, days = 30) {
  const today = new Date().toISOString().slice(0, 10);
  setListings(
    listings().map((listing) => {
      if (listing.id !== listingId) return listing;
      const base = listing.subscription_end_date && listing.subscription_end_date > today ? new Date(listing.subscription_end_date) : new Date();
      base.setDate(base.getDate() + days);
      return updateSubscriptionStatus({
        ...listing,
        payment_status: "paid",
        subscription_status: "active",
        subscription_start_date: listing.subscription_start_date || today,
        subscription_end_date: base.toISOString().slice(0, 10),
        renewal_status: "extended",
        updated_at: new Date().toISOString()
      });
    })
  );
}

function getAdminStats() {
  const today = new Date().toISOString().slice(0, 10);
  const all = listings().map(updateSubscriptionStatus);
  const paid = all.filter((x) => x.payment_status === "paid");
  const standardPaid = paid.filter((x) => x.subscription_plan === "standard_249");
  const featuredPaid = paid.filter((x) => x.subscription_plan === "featured_499");
  return [
    ["Total listings", all.length],
    ["Total services", all.filter((x) => x.listing_type === "service").length],
    ["Approved listings", all.filter((x) => x.approval_status === "approved").length],
    ["Pending approvals", all.filter((x) => x.approval_status === "pending").length],
    ["Paid listings", all.filter((x) => x.payment_status === "paid").length],
    ["Unpaid listings", all.filter((x) => x.payment_status !== "paid").length],
    ["Expired subscriptions", all.filter((x) => x.subscription_status === "expired").length],
    ["Active subscriptions", all.filter((x) => x.subscription_status === "active").length],
    ["Standard plan listings", all.filter((x) => x.subscription_plan === "standard_249").length],
    ["Featured plan listings", all.filter((x) => x.subscription_plan === "featured_499").length],
    ["Featured active listings", all.filter(isFeaturedListing).length],
    ["Standard revenue", `Rs ${standardPaid.length * 249}`],
    ["Featured revenue", `Rs ${featuredPaid.length * 499}`],
    ["Total monthly revenue", `Rs ${standardPaid.length * 249 + featuredPaid.length * 499}`],
    ["Total reports", reports().length],
    ["Total events", events().length],
    ["Published events", events().filter((event) => event.status === "published").length],
    ["Draft events", events().filter((event) => event.status === "draft").length],
    ["Cancelled events", events().filter((event) => event.status === "cancelled").length],
    ["Upcoming events", publicEvents().filter((event) => event.event_date >= today).length],
    ["Featured events", publicEvents().filter((event) => event.featured).length]
  ];
}

function isOpenNow(listing) {
  return listing.opening_hours && !/closed/i.test(listing.opening_hours);
}

function isCurrent(href) {
  const path = window.location.pathname;
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

function link(href, label, className = "") {
  return `<a href="${href}" class="${isCurrent(href) ? "active " : ""}${className}" data-link>${label}</a>`;
}

function icon(name) {
  const paths = {
    search: '<circle cx="11" cy="11" r="7"></circle><path d="m16 16 5 5"></path>',
    map: '<path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"></path><path d="M9 3v15"></path><path d="M15 6v15"></path>',
    building: '<path d="M4 21V5l8-3 8 3v16"></path><path d="M9 21v-7h6v7"></path><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M16 11h.01"></path>',
    heart: '<path d="M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 22l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"></path>',
    bed: '<path d="M3 7v14"></path><path d="M21 12v9"></path><path d="M3 11h18v6H3z"></path><path d="M7 11V7h5v4"></path>',
    utensils: '<path d="M4 3v8"></path><path d="M8 3v8"></path><path d="M4 7h4"></path><path d="M6 11v10"></path><path d="M17 3c2 2 3 5 2 8-1 2-2 3-4 3v7"></path>',
    bag: '<path d="M6 8h12l1 13H5L6 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"></path>',
    bank: '<path d="m3 10 9-7 9 7"></path><path d="M5 10h14v11H5z"></path><path d="M8 14v4M12 14v4M16 14v4"></path>',
    car: '<path d="M5 17h14l-1-5H6l-1 5Z"></path><path d="M7 17v2M17 17v2"></path><path d="M7 12l2-5h6l2 5"></path>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path>',
    alert: '<path d="M12 3 2 21h20L12 3Z"></path><path d="M12 9v5"></path><path d="M12 17h.01"></path>',
    leaf: '<path d="M20 4C12 4 5 9 5 17c0 2 1 3 3 3 8 0 12-8 12-16Z"></path><path d="M5 20c3-6 7-9 15-16"></path>',
    spark: '<path d="M12 2l2.5 7L22 12l-7.5 3L12 22l-2.5-7L2 12l7.5-3L12 2Z"></path>',
    tool: '<path d="M14 7a5 5 0 0 0 7 7L12 23l-5-5 9-9Z"></path><path d="M5 3l4 4"></path>',
    calendar: '<path d="M4 5h16v16H4z"></path><path d="M8 3v4M16 3v4M4 11h16"></path>',
    dot: '<circle cx="12" cy="12" r="6"></circle>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"></path>',
    arrow: '<path d="M5 12h14"></path><path d="m13 5 7 7-7 7"></path>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2"></path><path d="M3 12a9 9 0 0 1 15.5-6.2"></path><path d="M18 3v4h-4"></path><path d="M6 21v-4h4"></path>',
    share: '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.5 10.5 7-4M8.5 13.5l7 4"></path>'
  };
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.dot}</svg>`;
}

function badge(text, tone = "") {
  return `<span class="badge ${tone}">${text}</span>`;
}

function statusBadge(value) {
  const tone = value === "paid" || value === "approved" || value === "active" || value === "resolved" || value === "published" || value === "completed" ? "green" : value === "pending" || value === "payment_pending" || value === "new" || value === "draft" ? "gold" : "red";
  return badge(value.replace(/_/g, " "), tone);
}

function renderHeader() {
  return `
    <header class="topbar">
      <div class="nav">
        <a class="brand" href="/" data-link>
          <span class="brand-mark">${icon("building")}</span>
          <span class="brand-copy">
          <strong>Explore Gandhinagar</strong>
          <span>City guide</span>
          </span>
        </a>
        <nav class="nav-links">${navItems.map(([label, href]) => link(href, label)).join("")}</nav>
        <div class="nav-actions">
          <a class="nav-icon ${isCurrent("/admin") ? "active" : ""}" href="/admin" data-link title="Admin Panel" aria-label="Admin Panel">${icon("shield")}</a>
        </div>
        <button class="menu-button" data-action="toggle-menu" aria-label="Open menu">${icon("dot")}</button>
      </div>
    </header>
    <nav class="mobile-nav ${appState.menuOpen ? "open" : ""}">
      ${navItems.map(([label, href]) => link(href, label)).join("")}
      <a href="/admin" data-link>Admin Dashboard</a>
    </nav>`;
}

function renderFooter() {
  return `
    <footer class="footer reveal">
      <div class="container footer-grid">
        <div>
          <div class="footer-brand"><span class="brand-mark">${icon("building")}</span><h2>Find the city faster.</h2></div>
          <p>Places, services, emergency help, food, hotels, offices, and daily utility support for Gandhinagar.</p>
        </div>
        <div><strong>Explore</strong><p><a href="/" data-link>Home</a><br><a href="/explore" data-link>Explore</a><br><a href="/services" data-link>Services</a><br><a href="/emergency" data-link>Emergency</a></p></div>
        <div><strong>Manage</strong><p><a href="/add-business" data-link>Add Business or Service</a><br><a href="/about" data-link>About</a><br><a href="/admin" data-link>Admin</a></p></div>
        <div><strong>Legal</strong><p><a href="/privacy-policy" data-link>Privacy Policy</a><br><a href="/terms-and-conditions" data-link>Terms & Conditions</a><br><a href="/cookie-policy" data-link>Cookie Policy</a><br><span>hello@example.com</span></p></div>
      </div>
      <div class="container footer-bottom">© 2026 Explore Gandhinagar. Built for local discovery.</div>
    </footer>`;
}

function pageTitle(title, description) {
  return `<section class="route-hero reveal"><div class="container page-title"><h1>${title}</h1><p>${description}</p></div></section>`;
}

function listingImage(src, alt, variant = "card", badges = "") {
  const imageSrc = src || imagePool.city;
  return `
    <div class="listing-media listing-media-${variant}">
      <img src="${imageSrc}" alt="${alt}" loading="lazy" onerror="this.closest('.listing-media').classList.add('image-missing'); this.remove();">
      ${badges ? `<div class="badge-row">${badges}</div>` : ""}
    </div>`;
}

function listingCard(listing) {
  const badges = `${listing.verified ? badge("Verified", "green") : ""}${isFeaturedListing(listing) ? badge("Featured", "gold") : ""}${listing.emergency_available ? badge("Emergency", "red") : ""}`;
  return `
    <article class="listing-card reveal">
      <a class="media-link" href="/listing/${listing.slug}" data-link>
        ${listingImage(listing.images[0], listing.name, "card", badges)}
      </a>
      <div class="listing-body">
        <div class="meta"><span>${listing.category_name}</span><span>${listing.sector_locality}</span></div>
        <h3>${listing.name}</h3>
        <p>${listing.description}</p>
        <div class="badge-row">
          ${listing.service_category ? `<span class="pill">${listing.service_category}</span>` : ""}
          ${listing.home_visit_available ? `<span class="pill">Home visit</span>` : ""}
          ${listing.price_starts_from ? `<span class="pill">${listing.price_starts_from}</span>` : ""}
        </div>
        <div class="card-actions">
          <a class="button" href="tel:${listing.phone}">${icon("phone")}Call</a>
          <a class="ghost-button" href="https://wa.me/${listing.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a class="ghost-button" href="${listing.google_maps_url}" target="_blank" rel="noopener noreferrer">Direction</a>
          <button class="ghost-button" data-action="share" data-title="${listing.name}">${icon("share")}Share</button>
          <a class="text-button" href="/listing/${listing.slug}" data-link>View details ${icon("arrow")}</a>
        </div>
      </div>
    </article>`;
}

function categoryCard(category) {
  const count = category.id === "events" ? publicEvents().length : publicListings().filter((listing) => listing.category_id === category.id).length;
  return `
    <article class="category-card reveal">
      <div>
        <span class="icon-box">${icon(category.icon)}</span>
        <h3>${category.name}</h3>
        <p>${category.description}</p>
      </div>
      <div class="meta"><span>${count} listings</span><a class="text-button" href="/category/${category.slug}" data-link>View category ${icon("arrow")}</a></div>
    </article>`;
}

function compactCategoryCard(category) {
  return `
    <a class="compact-category reveal" href="/explore?category=${category.id}" data-link>
      <span class="icon-box">${icon(category.icon)}</span>
      <strong>${category.name}</strong>
    </a>`;
}

function exploreCategoryCard(category) {
  const active = new URLSearchParams(window.location.search).get("category") === category.id;
  const count = category.id === "events" ? publicEvents().length : publicListings().filter((listing) => listing.category_id === category.id).length;
  return `
    <a class="compact-category explore-category ${active ? "active" : ""} reveal" href="/explore?category=${category.id}" data-link>
      <span class="icon-box">${icon(category.icon)}</span>
      <strong>${category.name}</strong>
      <small>${count} listings</small>
    </a>`;
}

function heroQuickPanel() {
  const quick = [
    ["Tourist Places", "Explore top attractions", "map", "/category/tourist-places"],
    ["Food & Dining", "Cafes, restaurants & more", "utensils", "/category/restaurants"],
    ["Hotels & Stays", "Premium stays in the city", "bed", "/category/hotels"],
    ["Services", "Find what you need", "tool", "/services"]
  ];
  return `
    <aside class="hero-float-panel reveal">
      ${quick
        .map(
          ([title, text, iconName, href]) => `
        <a href="${href}" data-link>
          <span>${icon(iconName)}</span>
          <strong>${title}</strong>
          <small>${text}</small>
        </a>`
        )
        .join("")}
      <a class="mini-link" href="/explore" data-link>View all categories ${icon("arrow")}</a>
    </aside>`;
}

function heroSidePanel() {
  return `<div class="hero-side reveal">${weatherWidgetV2()}${heroQuickPanel()}</div>`;
}

function emergencyPanel() {
  const items = [
    ["112", "Emergency", "phone", "red"],
    ["100", "Police", "shield", "blue"],
    ["108", "Ambulance", "heart", "green"],
    ["101", "Fire", "alert", "gold"]
  ];
  return `
    <article class="emergency-panel reveal">
      <h3>Emergency Quick Access</h3>
      <div class="emergency-grid">
        ${items.map(([num, label, iconName, tone]) => `<a class="${tone}" href="tel:${num}">${icon(iconName)}<strong>${num}</strong><span>${label}</span></a>`).join("")}
      </div>
    </article>`;
}

function refinePanel() {
  return `
    <form class="refine-panel reveal" data-refine-form>
      <h3>${icon("tool")} Refine Your Search</h3>
      <div class="mini-filter-grid">
        <input name="q" placeholder="Search keyword">
        <select name="category"><option value="">All Categories</option>${categories.map((cat) => `<option value="${cat.id}">${cat.name}</option>`).join("")}</select>
        <select name="sector"><option value="">All Areas</option>${localityOptions()}</select>
        <select name="sort"><option value="">Recommended</option><option value="rating">Rating</option><option value="name">Name</option></select>
      </div>
      <button class="button block-button" type="submit">Apply Filters</button>
    </form>`;
}

function featureStrip() {
  const items = [
    ["Curated Experiences", "Handpicked places worth your time", "map"],
    ["Trusted Information", "Accurate and updated details", "tool"],
    ["Local Insights", "Discover like a local", "spark"],
    ["Everything in One Place", "Places, services and more", "bag"]
  ];
  return `<div class="trust-strip reveal">${items.map(([title, text, iconName]) => `<div><span class="icon-box">${icon(iconName)}</span><strong>${title}</strong><small>${text}</small></div>`).join("")}</div>`;
}

function formatEventDate(event) {
  return `${event.event_date} - ${event.start_time}${event.end_time ? `-${event.end_time}` : ""}`;
}

function eventCard(event) {
  return `
    <article class="event-card listing-card reveal">
      <a class="media-link" href="/event/${event.slug}" data-link>
        ${listingImage(event.image, event.image_alt || event.title, "card", `${badge(event.category, "gold")}${event.featured ? badge("Featured", "green") : ""}`)}
      </a>
      <div class="listing-body">
        <div class="meta"><span>${formatEventDate(event)}</span><span>${event.sector_locality}</span></div>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <div class="event-card-details"><strong>${event.price_label}</strong></div>
        <div class="card-actions">
          <a class="button" href="/event/${event.slug}" data-link>View Details</a>
          <button class="ghost-button event-icon-action" type="button" data-action="share" data-title="${event.title}" title="Share" aria-label="Share">${icon("share")}<span class="event-action-label">Share</span></button>
          ${event.map_url ? `<a class="ghost-button event-icon-action" href="${event.map_url}" target="_blank" rel="noopener noreferrer" title="Direction" aria-label="Direction">${icon("map")}<span class="event-action-label">Direction</span></a>` : ""}
        </div>
      </div>
    </article>`;
}

function weatherWidget() {
  const weather = appState.weather;
  // TODO: Connect this weather widget to a live weather API such as OpenWeatherMap or WeatherAPI.
  return `
    <article class="weather-card reveal">
      <div>
        <span class="weather-icon">${icon(weather.condition === "Sunny" ? "spark" : "leaf")}</span>
        <strong>${weather.temp}°C</strong>
        <small>Gandhinagar · ${weather.condition}</small>
      </div>
      <div class="weather-meta">
        <span>Feels ${weather.feelsLike}°C</span>
        <span>Humidity ${weather.humidity}%</span>
        <span>Wind ${weather.wind} km/h</span>
        <span>Updated ${weather.updatedAt}</span>
      </div>
      <button class="weather-refresh ${weather.loading ? "loading" : ""}" data-action="refresh-weather" title="Refresh weather" aria-label="Refresh weather">${icon("refresh")}</button>
    </article>`;
}

function weatherWidgetV2() {
  const weather = appState.weather;
  return `
    <article class="weather-card weather-card-v2 reveal">
      <div class="weather-head">
        <span class="weather-icon">${icon(weather.condition === "Sunny" ? "spark" : "leaf")}</span>
        <div class="weather-location"><strong>Gandhinagar</strong><small>${weather.condition}</small></div>
        <button class="weather-refresh ${weather.loading ? "loading" : ""}" type="button" data-action="refresh-weather" title="Refresh Weather" aria-label="Refresh Weather">${icon("refresh")}</button>
      </div>
      <div class="weather-main">
        <strong>${weather.temp}&deg;C</strong>
        <span>Feels ${weather.feelsLike}&deg;C</span>
      </div>
      <div class="weather-meta">
        <span><strong>Humidity</strong>${weather.humidity}%</span>
        <span><strong>Wind</strong>${weather.wind} km/h</span>
        <span><strong>Updated</strong>${weather.updatedAt}</span>
      </div>
    </article>`;
}

function carouselItems(items, count = 5) {
  if (!items.length) return [];
  return Array.from({ length: Math.min(count, items.length) }, (_, index) => items[(appState.featuredStart + index) % items.length]);
}

function listingRail(title, description, items, ctaHref = "/explore", ctaLabel = "View all") {
  return `
    <section class="section rail-section">
      <div class="container">
        <div class="section-header compact reveal"><div><h2>${title}</h2><p>${description}</p></div><a class="text-button" href="${ctaHref}" data-link>${ctaLabel} ${icon("arrow")}</a></div>
        ${renderListingGrid(items)}
      </div>
    </section>`;
}

function serviceCategoryCard(group) {
  const [name, items] = group;
  return `
    <article class="service-card reveal">
      <div class="listing-body">
        <span class="icon-box">${icon("tool")}</span>
        <h3>${name}</h3>
        <p>${items.slice(0, 5).join(", ")} and more.</p>
        <div class="badge-row service-quick-links">${items.slice(0, 8).map((item) => `<a class="pill" href="/services?service=${encodeURIComponent(item)}" data-link aria-label="Filter services by ${item}">${item}</a>`).join("")}</div>
      </div>
    </article>`;
}

function filterControls({ category = true, service = false, homeEmergency = true, type = false, open = false, verified = false, featured = false, payment = false, approval = false, subscription = false, sort = false, resetPath = window.location.pathname } = {}) {
  const params = new URLSearchParams(window.location.search);
  const option = (value, current, label = value) => `<option value="${value}" ${current === value ? "selected" : ""}>${label}</option>`;
  return `
    <div class="filters reveal">
      <input data-filter="q" placeholder="Search keyword" value="${params.get("q") || ""}">
      ${category ? `<select data-filter="category"><option value="">All categories</option>${categories.map((cat) => option(cat.id, params.get("category"), cat.name)).join("")}</select>` : ""}
      ${service ? `<select data-filter="service_category"><option value="">All service categories</option>${serviceCategories.map((item) => option(item, params.get("service_category"))).join("")}</select>` : ""}
      ${type ? `<select data-filter="listing_type"><option value="">All listing types</option>${listingTypes.map((item) => option(item, params.get("listing_type"))).join("")}</select>` : ""}
      <select data-filter="sector"><option value="">All Areas</option>${localityOptions(params.get("sector") || "")}</select>
      ${open ? `<select data-filter="open"><option value="">Hours</option>${option("true", params.get("open"), "Open now")}</select>` : ""}
      ${verified ? `<select data-filter="verified"><option value="">Verification</option>${option("true", params.get("verified"), "Verified only")}</select>` : ""}
      ${featured ? `<select data-filter="featured"><option value="">Feature status</option>${option("true", params.get("featured"), "Featured only")}</select>` : ""}
      ${service && homeEmergency ? `<select data-filter="home_visit"><option value="">Home visit</option>${option("true", params.get("home_visit"), "Available")}</select><select data-filter="emergency"><option value="">Emergency support</option>${option("true", params.get("emergency"), "Available")}</select>` : ""}
      ${payment ? `<select data-filter="payment_status"><option value="">Payment status</option>${paymentStatuses.map((item) => option(item, params.get("payment_status"))).join("")}</select>` : ""}
      ${approval ? `<select data-filter="approval_status"><option value="">Approval status</option>${approvalStatuses.map((item) => option(item, params.get("approval_status"))).join("")}</select>` : ""}
      ${subscription ? `<select data-filter="subscription_status"><option value="">Subscription status</option>${subscriptionStatuses.map((item) => option(item, params.get("subscription_status"))).join("")}</select>` : ""}
      ${sort ? `<select data-filter="sort"><option value="">Sort: Recommended</option>${option("newest", params.get("sort"), "Newest")}${option("rating", params.get("sort"), "Rating")}${option("name", params.get("sort"), "Name")}</select>` : ""}
      <a class="ghost-button filter-reset" href="${resetPath}" data-link>Reset</a>
    </div>`;
}

function activeFilterChips(resetPath = window.location.pathname) {
  const params = new URLSearchParams(window.location.search);
  const labels = {
    q: "Search",
    category: "Category",
    service: "Service",
    service_category: "Service category",
    sector: "Area",
    sort: "Sort",
    home_visit: "Home visit",
    emergency: "Emergency",
    emergency_type: "Emergency type"
  };
  const values = [];
  params.forEach((value, key) => {
    if (!value || !labels[key]) return;
    const readable = key === "category" ? categoryName(value) : value.replace(/_/g, " ");
    values.push(`<span class="active-filter">${labels[key]}: ${readable}</span>`);
  });
  if (!values.length) return "";
  return `<div class="active-filter-row reveal">${values.join("")}<a href="${resetPath}" data-link>Clear all</a></div>`;
}

function applyFilters(items, extra = {}) {
  const params = new URLSearchParams(window.location.search);
  const q = (params.get("q") || "").toLowerCase().trim();
  return items.filter((listing) => {
    const search = [listing.name, listing.description, listing.category_name, listing.service_category, listing.sector_locality, listing.tags.join(" "), listing.full_address].join(" ").toLowerCase();
    if (q && !search.includes(q)) return false;
    if (params.get("service")) {
      const serviceQuery = params.get("service").toLowerCase();
      const serviceWords = serviceQuery.split(/\s+/).filter(Boolean);
      if (!listing.service_category.toLowerCase().includes(serviceQuery) && !search.includes(serviceQuery) && !serviceWords.every((word) => search.includes(word))) return false;
    }
    if (params.get("category") && listing.category_id !== params.get("category")) return false;
    if (params.get("service_category") && listing.service_category !== params.get("service_category")) return false;
    if (params.get("listing_type") && listing.listing_type !== params.get("listing_type")) return false;
    if (params.get("sector") && listing.sector_locality !== params.get("sector")) return false;
    if (params.get("verified") === "true" && !listing.verified) return false;
    if (params.get("open") === "true" && !isOpenNow(listing)) return false;
    if (params.get("featured") === "true" && !isFeaturedListing(listing)) return false;
    if (params.get("home_visit") === "true" && !listing.home_visit_available) return false;
    if (params.get("emergency") === "true" && !listing.emergency_available) return false;
    if (params.get("payment_status") && listing.payment_status !== params.get("payment_status")) return false;
    if (params.get("approval_status") && listing.approval_status !== params.get("approval_status")) return false;
    if (params.get("subscription_status") && listing.subscription_status !== params.get("subscription_status")) return false;
    if (extra.category && listing.category_id !== extra.category) return false;
    if (extra.servicesOnly && listing.listing_type !== "service" && listing.category_id !== "local-services") return false;
    return true;
  });
}

function renderListingGrid(items, empty = "No listings found. Try another filter or search keyword.") {
  if (!items.length) return `<div class="empty reveal"><h3>${empty}</h3><p class="small-muted">Search returned no result.</p></div>`;
  return `<div class="grid cols-3">${items.map(listingCard).join("")}</div>`;
}

function serviceListingCard(listing) {
  const badges = `${listing.service_category ? badge(listing.service_category, "green") : ""}${isFeaturedListing(listing) ? badge("Featured", "gold") : ""}${listing.price_starts_from ? badge(listing.price_starts_from, "gold") : ""}`;
  return `
    <article class="listing-card service-result-card reveal">
      <a class="media-link" href="/listing/${listing.slug}" data-link>${listingImage(listing.images[0], listing.name, "card", badges)}</a>
      <div class="listing-body">
        <div class="meta"><span>${listing.service_category || "Local service"}</span><span>${listing.sector_locality}</span></div>
        <h3>${listing.name}</h3>
        <p>${listing.description}</p>
        <div class="service-card-details">
          <span><strong>Area</strong>${listing.service_area || listing.service_area_covered || listing.sector_locality}</span>
          <span><strong>Phone</strong>${listing.phone}</span>
        </div>
        <div class="card-actions">
          <a class="button" href="tel:${listing.phone}">${icon("phone")}Call</a>
          <a class="ghost-button" href="https://wa.me/${listing.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a class="ghost-button" href="${listing.google_maps_url}" target="_blank" rel="noopener noreferrer">Direction</a>
          <a class="text-button" href="/listing/${listing.slug}" data-link>View Details ${icon("arrow")}</a>
        </div>
      </div>
    </article>`;
}

function sortListings(items) {
  const sort = new URLSearchParams(window.location.search).get("sort");
  const copy = sortFeaturedFirst(items);
  if (sort === "newest") return copy.sort((a, b) => b.created_at.localeCompare(a.created_at));
  if (sort === "rating") return copy.sort((a, b) => b.rating_placeholder - a.rating_placeholder);
  if (sort === "name") return copy.sort((a, b) => a.name.localeCompare(b.name));
  return copy;
}

function renderHome() {
  const publicItems = publicListings();
  const featuredAll = publicItems.filter(isFeaturedListing);
  const featured = carouselItems(featuredAll, 5);
  const food = sortFeaturedFirst(publicItems.filter((item) => item.listing_type === "food" || item.listing_type === "vendor" || item.service_category === "Tiffin service")).slice(0, 6);
  const popular = sortFeaturedFirst(publicItems.filter((item) => isFeaturedListing(item) || item.verified)).slice(0, 6);
  const homeEvents = [...publicEvents()].sort((a, b) => Number(b.featured) - Number(a.featured) || a.event_date.localeCompare(b.event_date)).slice(0, 8);

  return `
    <main class="page">
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy reveal">
            <span class="hero-kicker">Discover. Experience. Connect.</span>
            <h1>Explore<br>Gandhinagar</h1>
            <p class="muted">Your premium guide to the city's best places, essential services, emergency options, food, stays, offices, vendors, and local experiences.</p>
            <form class="search-card hero-search" data-home-search>
              <label>${icon("search")}<input name="q" placeholder="Search places, services, hotels, restaurants..." autocomplete="off"></label>
              <span class="search-divider"></span>
              <label>${icon("map")}<select name="area"><option>Gandhinagar</option>${localityOptions()}</select></label>
              <button class="button" type="submit">Search</button>
            </form>
            <div class="quick-row">
              <span class="popular-label">Popular:</span>
              ${["Attractions", "Hotels", "Restaurants", "Hospitals", "Government Offices", "Services"].map((term) => `<a class="pill" href="/explore?q=${encodeURIComponent(term)}" data-link>${term}</a>`).join("")}
            </div>
          </div>
          ${heroSidePanel()}
        </div>
      </section>

      <section class="home-dashboard section">
        <div class="container home-dash-grid">
          <div class="home-main">
            <div class="section-header compact reveal"><div><h2>Browse by Category</h2></div><a class="text-button" href="/explore" data-link>View all categories ${icon("arrow")}</a></div>
            <div class="compact-category-grid">${categories.slice(0, 8).map(compactCategoryCard).join("")}</div>
            <div class="section-header compact reveal"><div><h2>Featured Places</h2><p>Handpicked places and experiences in and around the city.</p></div><div class="carousel-actions"><button class="ghost-button icon-only" data-action="carousel-prev" aria-label="Previous featured">${icon("arrow")}</button><button class="ghost-button icon-only next" data-action="carousel-next" aria-label="Next featured">${icon("arrow")}</button><a class="text-button" href="/explore" data-link>View listings ${icon("arrow")}</a></div></div>
            <div class="featured-strip">${featured.slice(0, 5).map(listingCard).join("")}</div>
          </div>
          <aside class="home-side">
            ${refinePanel()}
          </aside>
        </div>
        <div class="container">${featureStrip()}</div>
      </section>

      <section class="section dark home-events-section">
        <div class="container">
          <div class="section-header reveal"><div><h2>Events in Gandhinagar</h2><p>Food festivals, cultural evenings, family activities, heritage walks, meetups, and local gatherings.</p></div><a class="ghost-button" href="/explore?category=events" data-link>Explore events</a></div>
          <div class="event-strip">${homeEvents.map(eventCard).join("")}</div>
        </div>
      </section>

      ${listingRail("Popular in Gandhinagar", "Frequently useful approved listings with local actions ready.", popular, "/explore", "Explore popular")}
      ${listingRail("Food Near You", "Restaurants, snack vendors, tiffins, and quick bites.", food, "/category/restaurants", "Find food")}

      <section class="section">
        <div class="container split">
          <div class="story-panel reveal"></div>
          <div class="form-card reveal cta-card">
            <h2>Grow your local visibility in Gandhinagar</h2>
            <p class="small-muted">Pricing stays inside the Add Business flow. Choose Standard Listing or Featured Top Placement. No separate pricing page is used.</p>
            <div class="plan-hint-row">
              <span><strong>Standard Listing</strong>Rs 249/month</span>
              <span><strong>Featured Top Placement</strong>Rs 499/month</span>
            </div>
            <div class="quick-row"><a class="button" href="/add-business" data-link>Add Business or Service</a><a class="ghost-button" href="/add-business#plans" data-link>View Listing Plans</a></div>
          </div>
        </div>
      </section>
    </main>`;
}

function renderExplore() {
  const params = new URLSearchParams(window.location.search);
  const showingEvents = params.get("category") === "events";
  const items = sortListings(applyFilters(publicListings()));
  const eventItems = publicEvents()
    .filter((event) => {
      const q = (params.get("q") || "").toLowerCase().trim();
      const search = [event.title, event.description, event.category, event.sector_locality, event.venue_name, event.tags.join(" ")].join(" ").toLowerCase();
      if (q && !search.includes(q)) return false;
      if (params.get("sector") && event.sector_locality !== params.get("sector")) return false;
      return true;
    })
    .sort((a, b) => (params.get("sort") === "newest" ? b.created_at.localeCompare(a.created_at) : a.event_date.localeCompare(b.event_date)));

  return `
    <main class="page">
      ${pageTitle("Explore Gandhinagar", "Browse places, food, cafes, hotels, offices, services, emergency help, and events with compact city filters.")}
      <section class="section explore-combined">
        <div class="container">
          <div class="section-header compact reveal"><div><h2>Browse categories</h2><p>Choose a category to filter the discovery grid on this page.</p></div><a class="text-button" href="/explore" data-link>Clear category ${icon("arrow")}</a></div>
          <div class="compact-category-grid explore-category-grid">${categories.map(exploreCategoryCard).join("")}</div>
        </div>
      </section>
      <section class="container">${filterControls({ category: true, sort: true, resetPath: "/explore" })}${activeFilterChips("/explore")}</section>
      <section class="section">
        <div class="container">
          <div class="section-header compact reveal"><div><h2>${showingEvents ? "Event results" : "Listing results"}</h2><p>${showingEvents ? `${eventItems.length} published events match your filters.` : `${items.length} approved public listings match your filters.`}</p></div></div>
          ${showingEvents ? (eventItems.length ? `<div class="grid cols-3">${eventItems.map(eventCard).join("")}</div>` : `<div class="empty reveal"><h3>No events found</h3><p class="small-muted">Try another search or locality.</p></div>`) : renderListingGrid(items, "No listings found")}
        </div>
      </section>
    </main>`;
}

function renderEventsPage() {
  const items = publicEvents().sort((a, b) => a.event_date.localeCompare(b.event_date));
  return `
    <main class="page">
      ${pageTitle("Events in Gandhinagar", "Published cultural, food, family, business, health, workshop, and community events.")}
      <section class="section">
        <div class="container">
          <div class="section-header compact reveal"><div><h2>Upcoming events</h2><p>${items.length} published events are available.</p></div><a class="text-button" href="/explore?category=events" data-link>Filter in Explore ${icon("arrow")}</a></div>
          <div class="grid cols-3">${items.map(eventCard).join("")}</div>
        </div>
      </section>
    </main>`;
}

function renderCategories() {
  return `
    <main class="page">
      ${pageTitle("Categories", "Premium category cards for tourist places, government offices, hospitals, hotels, food, shopping, local services, emergency options, transport, and more.")}
      <section class="section"><div class="container grid cols-4">${categories.map(categoryCard).join("")}</div></section>
    </main>`;
}

function renderCategory(slug) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) return notFound("No category found", "The category route does not exist.");
  const items = applyFilters(publicListings(), { category: category.id });
  return `
    <main class="page">
      ${pageTitle(category.name, category.description)}
      <section class="container">${filterControls({ category: false })}</section>
      <section class="section"><div class="container">${renderListingGrid(items, "No category results found. Try another sector/locality or search term.")}</div></section>
    </main>`;
}

function renderServices() {
  const items = sortListings(applyFilters(publicListings(), { servicesOnly: true }));
  const selectedService = new URLSearchParams(window.location.search).get("service") || "";
  const quickServices = ["Electrician", "Plumber", "AC Repair", "Tiffin Service", "Laptop Repair", "Tailor", "Home Cleaning", "Pest Control", "Car Repair", "Salon", "CA / Accountant", "Photographer"];
  return `
    <main class="page">
      ${pageTitle("Services", "Find local professionals and utility providers with compact filters, quick actions, and clear service cards.")}
      <section class="section service-quick-section">
        <div class="container">
          <div class="section-header compact reveal"><div><h2>Quick service filters</h2><p>Tap a service to filter the listings instantly.</p></div><a class="text-button" href="/services" data-link>Clear service ${icon("arrow")}</a></div>
          <div class="service-chip-grid reveal">
            ${quickServices.map((service) => `<a class="service-chip ${selectedService === service ? "active" : ""}" href="/services?service=${encodeURIComponent(service)}" data-link aria-label="Filter services by ${service}">${service}</a>`).join("")}
          </div>
        </div>
      </section>
      <section class="container">${filterControls({ category: false, service: true, homeEmergency: false, sort: true, resetPath: "/services" })}${activeFilterChips("/services")}</section>
      <section class="section service-directory">
        <div class="container">
          <details class="service-category-drawer reveal">
            <summary>Browse all service categories</summary>
            <div class="service-chip-grid compact">${serviceCategories.map((service) => `<a class="service-chip" href="/services?service_category=${encodeURIComponent(service)}" data-link>${service}</a>`).join("")}</div>
          </details>
          <div class="section-header compact reveal"><div><h2>Available service listings</h2><p>${items.length} approved service results. Every public result is paid, approved, and active.</p></div></div>
          ${items.length ? `<div class="grid cols-3">${items.map(serviceListingCard).join("")}</div>` : `<div class="empty reveal"><h3>No service found.</h3><p class="small-muted">Try another service category or locality.</p></div>`}
        </div>
      </section>
    </main>`;
}

function renderListingDetail(slug) {
  const listing = publicListings().find((item) => item.slug === slug) || listings().find((item) => item.slug === slug);
  if (!listing || !isPublicListing(listing)) return notFound("No listing found", "This listing is not public yet or does not exist.");
  const similar = publicListings().filter((item) => item.id !== listing.id && item.category_id === listing.category_id).slice(0, 3);
  const nearby = publicListings().filter((item) => item.id !== listing.id && item.sector_locality === listing.sector_locality).slice(0, 3);
  return `
    <main class="page">
      <section class="section">
        <div class="container detail-hero">
          <div class="detail-image reveal"><img src="${listing.images[0]}" alt="${listing.name}"></div>
          <article class="listing-detail-card reveal">
            <div class="badge-row">${statusBadge(listing.payment_status)} ${statusBadge(listing.approval_status)} ${listing.verified ? badge("Verified", "green") : ""} ${isFeaturedListing(listing) ? badge("Featured", "gold") : ""}</div>
            <h1 style="font-family:var(--serif);font-size:clamp(42px,6vw,82px);line-height:.92;margin:18px 0">${listing.name}</h1>
            <p>${listing.description}</p>
            <div class="detail-facts">
              ${fact("Listing type", listing.listing_type)}
              ${fact("Category", listing.category_name)}
              ${listing.service_category ? fact("Service category", listing.service_category) : ""}
              ${fact("Sector/locality", listing.sector_locality)}
              ${fact("Full address", listing.full_address)}
              ${fact("Opening hours / availability", `${listing.opening_hours}${listing.availability ? `, ${listing.availability}` : ""}`)}
              ${listing.service_area ? fact("Service area covered", listing.service_area) : ""}
              ${listing.services_products ? fact("Services/products offered", listing.services_products) : ""}
              ${listing.price_starts_from ? fact("Price starts from", listing.price_starts_from) : ""}
            </div>
            <div class="quick-row">
              <a class="button" href="tel:${listing.phone}">${icon("phone")}Call ${listing.phone}</a>
              <a class="ghost-button" href="https://wa.me/${listing.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a class="ghost-button" href="${listing.google_maps_url}" target="_blank" rel="noopener noreferrer">Direction</a>
              <button class="ghost-button" data-action="share" data-title="${listing.name}">${icon("share")}Share</button>
            </div>
          </article>
        </div>
      </section>
      <section class="section">
        <div class="container split">
          <div class="report-card reveal">
            <h2>Report incorrect information</h2>
            <p class="small-muted">Help keep Gandhinagar City Guide accurate.</p>
            <form data-report-form data-listing-id="${listing.id}">
              <div class="form-grid">
                <div class="field span-2"><label>Message</label><textarea name="user_message" rows="4" required placeholder="What needs correction?"></textarea></div>
                <div class="field span-2"><label>Reporter contact optional</label><input name="reporter_contact" placeholder="Phone or email"></div>
              </div>
              <div class="quick-row"><button class="button" type="submit">Submit report</button></div>
            </form>
          </div>
          <div class="form-card reveal">
            <h2>Public visibility rule</h2>
            <p class="small-muted">This detail page is visible because the listing is paid, approved, and active. New submissions wait for admin approval after payment.</p>
            <div class="notice"><strong>External directions</strong><br>Directions open in Google Maps in a new tab. No internal map explorer is used.</div>
            <div class="quick-row"><a class="button" href="${listing.google_maps_url}" target="_blank" rel="noopener noreferrer">Get Directions</a></div>
          </div>
        </div>
      </section>
      ${listingRail("Similar listings", `More from ${listing.category_name}.`, similar, `/category/${listing.category_id}`, "Open category")}
      ${listingRail(`More in ${listing.sector_locality}`, "Listings from the same locality.", nearby, `/explore?sector=${encodeURIComponent(listing.sector_locality)}`, "Explore locality")}
    </main>`;
}

function renderEventDetail(slug) {
  const event = publicEvents().find((item) => item.slug === slug) || events().find((item) => item.slug === slug);
  if (!event || event.status !== "published") return notFound("No event found", "This event is not published or does not exist.");
  const related = publicEvents().filter((item) => item.id !== event.id && item.category === event.category).slice(0, 3);
  return `
    <main class="page">
      <section class="section">
        <div class="container detail-hero">
          <div class="detail-image reveal"><img src="${event.image}" alt="${event.image_alt || event.title}"></div>
          <article class="listing-detail-card reveal">
            <div class="badge-row">${badge(event.category, "gold")} ${event.featured ? badge("Featured", "green") : ""} ${statusBadge(event.status)}</div>
            <h1 style="font-family:var(--serif);font-size:clamp(42px,6vw,82px);line-height:.92;margin:18px 0">${event.title}</h1>
            <p>${event.description}</p>
            <div class="detail-facts">
              ${fact("Date and time", formatEventDate(event))}
              ${fact("Venue", event.venue_name)}
              ${fact("Full address", event.full_address)}
              ${fact("Sector/locality", event.sector_locality)}
              ${fact("Price", event.price_label)}
              ${event.phone ? fact("Phone", event.phone) : ""}
            </div>
            <div class="quick-row">
              ${event.phone ? `<a class="button" href="tel:${event.phone}">${icon("phone")}Call</a>` : ""}
              ${event.whatsapp ? `<a class="ghost-button" href="https://wa.me/${event.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>` : ""}
              ${event.map_url ? `<a class="ghost-button" href="${event.map_url}" target="_blank" rel="noopener noreferrer">Direction</a>` : ""}
              <button class="ghost-button" data-action="share" data-title="${event.title}">${icon("share")}Share</button>
            </div>
          </article>
        </div>
      </section>
      ${related.length ? `<section class="section"><div class="container"><div class="section-header compact reveal"><div><h2>Related events</h2><p>More ${event.category.toLowerCase()} events in Gandhinagar.</p></div></div><div class="grid cols-3">${related.map(eventCard).join("")}</div></div></section>` : ""}
    </main>`;
}

function fact(label, value) {
  return `<div class="fact"><strong>${label}</strong><span class="small-muted">${value || "Not available"}</span></div>`;
}

function planCard(plan, selectedId = "", input = false) {
  const active = selectedId === plan.id;
  return `
    <label class="plan-card ${active ? "active" : ""}">
      ${input ? `<input type="radio" name="subscription_plan" value="${plan.id}" ${active ? "checked" : ""} required>` : ""}
      <span class="badge ${plan.id === "featured_499" ? "gold" : "green"}">${plan.id === "featured_499" ? "Priority" : "Standard"}</span>
      <h3>${plan.name}</h3>
      <strong>Rs ${plan.price}/month</strong>
      <p>${plan.description}</p>
      <ul>${plan.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
    </label>`;
}

function pricingCards(selectedId = "standard_249", input = false) {
  return `<div class="pricing-grid">${Object.values(LISTING_PLANS).map((plan) => planCard(plan, selectedId, input)).join("")}</div>`;
}

function addBusinessForm() {
  const pending = appState.addBusiness.pendingForm;
  const selectedPlan = planById(pending?.subscription_plan || appState.addBusiness.selectedPlanId);
  if (appState.addBusiness.submitted) {
    return `
      <div class="form-card reveal">
        <div class="notice success"><strong>Payment received. Your listing request has been sent for admin approval.</strong><br>Admin can now review payment, subscription, and listing details.</div>
        <div class="quick-row"><a class="button" href="/admin/requests" data-link>Open admin requests</a><a class="ghost-button" href="/explore" data-link>Back to Explore</a></div>
      </div>`;
  }

  if (pending) {
    return `
      <div class="form-card reveal">
        <h2>${pending.name}</h2>
        <p class="small-muted">Interactive subscription and payment placeholder flow.</p>
        <div class="step-tabs">
          ${["Basic Details", "Location", "Contact & Service Info", "Subscription", "Payment Placeholder", "Admin Approval"].map((label, index) => `<span class="${index < (appState.addBusiness.paymentPaid ? 6 : 5) ? "active" : ""}">${index + 1}. ${label}</span>`).join("")}
        </div>
        <div class="notice"><strong>${selectedPlan.name}</strong><br>Rs ${selectedPlan.price}/month. Payment does not auto-publish this listing; admin approval is still required.</div>
        <div class="timeline" style="margin-top:16px">
          <div class="timeline-step"><span class="step-dot">1</span><div><strong>Listing details captured</strong><p class="small-muted">${pending.category_name} in ${pending.sector_locality}</p></div></div>
          <div class="timeline-step"><span class="step-dot">2</span><div><strong>Plan selected</strong><p class="small-muted">${selectedPlan.name} at Rs ${selectedPlan.price}/month</p></div></div>
          <div class="timeline-step"><span class="step-dot">3</span><div><strong>Payment placeholder</strong><p class="small-muted">Amount: Rs ${selectedPlan.price}. Status: ${appState.addBusiness.paymentStatus.replace(/_/g, " ")}</p></div></div>
          <div class="timeline-step"><span class="step-dot">4</span><div><strong>Admin approval</strong><p class="small-muted">Public publishing happens only after admin approval.</p></div></div>
        </div>
        ${appState.addBusiness.error ? `<div class="notice error">${appState.addBusiness.error}</div>` : ""}
        <div class="quick-row">
          ${
            appState.addBusiness.paymentPaid
              ? `<button class="button" data-action="submit-paid-request">Submit Request for Admin Approval</button>`
              : `<button class="button" data-action="mark-form-paid">Mark as Paid</button><button class="ghost-button" data-action="mark-form-failed">Mark as Failed</button><button class="ghost-button" data-action="cancel-form-payment">Cancel</button>`
          }
          <button class="ghost-button" data-action="edit-add-business">Edit details</button>
        </div>
      </div>`;
  }

  return `
    <form class="form-card reveal multi-step-form" data-add-business-form>
      ${appState.addBusiness.error ? `<div class="notice error">${appState.addBusiness.error}</div>` : ""}
      <h2>Submit your listing</h2>
      <div class="step-tabs">
        <span class="active">1. Basic Details</span>
        <span class="active">2. Location</span>
        <span class="active">3. Contact & Service Info</span>
        <span>4. Subscription</span>
        <span>5. Payment</span>
        <span>6. Admin Approval</span>
      </div>
      <div class="form-grid">
        <div class="span-2 form-step-title">Basic Details</div>
        ${field("Owner/person name", "owner_name", "text", "", true)}
        ${field("Business/service/place name", "name", "text", "", true)}
        ${selectField("Listing type", "listing_type", listingTypes, "", true)}
        ${selectField("Category", "category_id", categories.map((cat) => [cat.id, cat.name]), "", true)}
        ${selectField("Service category", "service_category", serviceCategories, "", false)}
        ${field("Description", "description", "textarea", "", true, "span-2")}
        <div class="span-2 form-step-title">Location</div>
        ${field("Full address", "full_address", "text", "", true, "span-2")}
        ${selectField("Sector/locality", "sector_locality", SECTOR_LOCALITY_OPTIONS.slice(1), "", true)}
        ${field("City", "city", "text", "Gandhinagar", true)}
        ${field("Google Maps URL", "google_maps_url", "url", "https://maps.google.com/?q=Gandhinagar", false, "span-2")}
        ${field("Latitude optional", "latitude", "text")}
        ${field("Longitude optional", "longitude", "text")}
        <div class="span-2 form-step-title">Contact & Service Info</div>
        ${field("Phone number", "phone", "tel")}
        ${field("WhatsApp number", "whatsapp", "tel")}
        ${field("Email optional", "email", "email")}
        ${field("Website/social media optional", "website", "url")}
        ${field("Opening hours", "opening_hours", "text", "", true)}
        ${field("Services/products offered", "services_products", "text")}
        ${field("Service area covered", "service_area", "text")}
        ${field("Price starts from optional", "price_starts_from", "text")}
        <div class="field span-2 check-row">
          <label><input type="checkbox" name="home_visit_available"> Home visit available</label>
          <label><input type="checkbox" name="emergency_available"> Emergency available</label>
        </div>
        <div class="span-2 form-step-title" id="plans">Choose Plan</div>
        <div class="span-2">${pricingCards(appState.addBusiness.selectedPlanId, true)}</div>
      </div>
      <div class="notice" style="margin-top:16px"><strong>Admin approval required</strong><br>Payment does not auto-publish. Standard is Rs 249/month; Featured Top Placement is Rs 499/month.</div>
      <div class="quick-row"><button class="button" type="submit">Continue to Payment Placeholder</button></div>
    </form>`;
}

function field(label, name, type = "text", value = "", required = false, extraClass = "") {
  const input =
    type === "textarea"
      ? `<textarea name="${name}" rows="4" ${required ? "required" : ""}>${value}</textarea>`
      : `<input name="${name}" type="${type}" value="${value}" ${required ? "required" : ""}>`;
  return `<div class="field ${extraClass}"><label>${label}${required ? " *" : ""}</label>${input}</div>`;
}

function selectField(label, name, options, value = "", required = false, extraClass = "") {
  const opts = options
    .map((option) => {
      const optionValue = Array.isArray(option) ? option[0] : option;
      const optionLabel = Array.isArray(option) ? option[1] : option;
      return `<option value="${optionValue}" ${value === optionValue ? "selected" : ""}>${optionLabel}</option>`;
    })
    .join("");
  return `<div class="field ${extraClass}"><label>${label}${required ? " *" : ""}</label><select name="${name}" ${required ? "required" : ""}><option value="">Select</option>${opts}</select></div>`;
}

function renderAddBusiness() {
  return `
    <main class="page">
      ${pageTitle("Add Business or Service", "Choose Standard Listing or Featured Top Placement, complete payment placeholder, then submit for admin approval.")}
      <section class="section">
        <div class="container split">
          ${addBusinessForm()}
          <aside class="form-card reveal">
            <h2>How publishing works</h2>
            <div class="timeline">
              <div class="timeline-step"><span class="step-dot">1</span><div><strong>Fill listing details</strong><p class="small-muted">Owner, type, category, address, contact, service options, and map details.</p></div></div>
              <div class="timeline-step"><span class="step-dot">2</span><div><strong>Select ₹249/month plan</strong><p class="small-muted">The plan is shown on this page only.</p></div></div>
              <div class="timeline-step"><span class="step-dot">3</span><div><strong>Payment placeholder</strong><p class="small-muted">The amount updates from the selected plan and is ready for future gateway integration.</p></div></div>
              <div class="timeline-step"><span class="step-dot">4</span><div><strong>Admin approval</strong><p class="small-muted">Paid requests still require admin approval before public publishing.</p></div></div>
            </div>
            <div class="notice" style="margin-top:16px"><strong>Visibility rule</strong><br>Public listings require paid status, active subscription, and admin approval. Featured placement also requires the Featured Top Placement plan.</div>
          </aside>
        </div>
      </section>
    </main>`;
}

function emergencyType(listing) {
  const text = [listing.name, listing.category_name, listing.service_category, listing.description, listing.tags.join(" ")].join(" ").toLowerCase();
  if (text.includes("ambulance")) return "Ambulance";
  if (text.includes("police")) return "Police";
  if (text.includes("fire")) return "Fire";
  if (text.includes("blood")) return "Blood Bank";
  if (text.includes("pharmacy")) return "Pharmacy";
  if (listing.category_id === "hospitals" || text.includes("hospital")) return "Hospitals";
  if (text.includes("clinic") || text.includes("medical")) return "Emergency Clinics";
  return "Medical Help";
}

function isEmergencyListing(listing) {
  const allowed = ["emergency-services", "hospitals"];
  const type = emergencyType(listing);
  return allowed.includes(listing.category_id) || ["Ambulance", "Police", "Fire", "Blood Bank", "Pharmacy", "Emergency Clinics"].includes(type);
}

function emergencyFilterControls() {
  const params = new URLSearchParams(window.location.search);
  const types = ["Medical Help", "Ambulance", "Police", "Fire", "Hospitals", "Emergency Clinics", "Blood Bank", "Pharmacy"];
  const option = (value, current) => `<option value="${value}" ${current === value ? "selected" : ""}>${value}</option>`;
  return `
    <div class="filters emergency-filters reveal">
      <input data-filter="q" placeholder="Search emergency help" value="${params.get("q") || ""}">
      <select data-filter="emergency_type"><option value="">All emergency types</option>${types.map((type) => option(type, params.get("emergency_type"))).join("")}</select>
      <select data-filter="sector"><option value="">All Areas</option>${localityOptions(params.get("sector") || "")}</select>
      <a class="ghost-button filter-reset" href="/emergency" data-link>Reset</a>
    </div>`;
}

function emergencyListingCard(listing) {
  const type = emergencyType(listing);
  return `
    <article class="emergency-listing-card reveal">
      <div>
        <div class="badge-row">${badge(type, "red")}${listing.availability ? badge(listing.availability, "gold") : ""}</div>
        <h3>${listing.name}</h3>
        <p>${listing.description}</p>
        <div class="detail-facts compact">
          ${fact("Area", listing.sector_locality)}
          ${fact("Address", listing.full_address)}
          ${fact("Phone", listing.phone)}
          ${fact("Availability", listing.availability || listing.opening_hours || "Available")}
        </div>
      </div>
      <div class="card-actions">
        <a class="button danger-action" href="tel:${listing.phone}">${icon("phone")}Call now</a>
        <a class="ghost-button" href="${listing.google_maps_url}" target="_blank" rel="noopener noreferrer">Direction</a>
        <a class="text-button" href="/listing/${listing.slug}" data-link>View Details ${icon("arrow")}</a>
      </div>
    </article>`;
}

function renderEmergency() {
  const params = new URLSearchParams(window.location.search);
  const emergencyItems = publicListings().filter(isEmergencyListing);
  const q = (params.get("q") || "").toLowerCase().trim();
  const items = emergencyItems.filter((item) => {
    const search = [item.name, item.description, item.category_name, item.sector_locality, item.full_address, emergencyType(item)].join(" ").toLowerCase();
    if (q && !search.includes(q)) return false;
    if (params.get("sector") && item.sector_locality !== params.get("sector")) return false;
    if (params.get("emergency_type") && emergencyType(item) !== params.get("emergency_type")) return false;
    return true;
  });
  const instructions = [
    ["Medical emergency", "Call 108 immediately, keep the patient still, and share the nearest landmark.", "108"],
    ["Fire emergency", "Call 101, move people away from smoke, and avoid elevators.", "101"],
    ["Police help", "Call 100 or 112, stay in a safe public place, and share your exact locality.", "100"],
    ["Road accident", "Call 108 and 112, do not move injured people unless there is immediate danger.", "112"]
  ];
  const emergencyCategories = ["Medical Help", "Ambulance", "Police", "Fire", "Hospitals", "Emergency Clinics", "Blood Bank", "Pharmacy"];
  return `
    <main class="page">
      ${pageTitle("Emergency Help in Gandhinagar", "Use this page for urgent medical, police, fire, ambulance, blood bank, pharmacy, and public safety help.")}
      <section class="section emergency-dashboard">
        <div class="container">
          ${emergencyPanel()}
          <div class="emergency-type-grid">
            ${emergencyCategories.map((type) => `<a class="emergency-type-card reveal" href="/emergency?emergency_type=${encodeURIComponent(type)}" data-link><span class="icon-box">${icon("alert")}</span><strong>${type}</strong></a>`).join("")}
          </div>
        </div>
      </section>
      <section class="container">${emergencyFilterControls()}${activeFilterChips("/emergency")}</section>
      <section class="section">
        <div class="container">
          <div class="section-header compact reveal"><div><h2>Nearby emergency services</h2><p>${items.length} emergency-only listings. General home, repair, food, and lifestyle services are kept out of this page.</p></div></div>
          ${items.length ? `<div class="emergency-list">${items.map(emergencyListingCard).join("")}</div>` : `<div class="empty reveal"><h3>No emergency service found.</h3><p class="small-muted">Try a different emergency type or locality.</p></div>`}
        </div>
      </section>
      <section class="section dark">
        <div class="container">
          <div class="section-header reveal"><div><h2>Emergency instructions</h2><p>Simple, practical steps while help is on the way.</p></div></div>
          <div class="grid cols-3">
            ${instructions
              .map(([title, text, phone]) => `<article class="emergency-card listing-body reveal"><span class="icon-box">${icon("alert")}</span><h3>${title}</h3><p>${text}</p><div class="card-actions"><a class="button" href="tel:${phone}">Call ${phone}</a></div></article>`)
              .join("")}
          </div>
        </div>
      </section>
    </main>`;
}

function renderAbout() {
  const values = [
    ["Local discovery", "Find food, places, services, offices, hotels, and help without guessing where to look."],
    ["Verified information", "Listings can be approved, reported, updated, and managed through the admin workflow."],
    ["Easy navigation", "Open call, WhatsApp, external directions, and filters from listing cards."],
    ["Supports businesses", "Vendors and services can join through a clear ₹249/month listing flow."]
  ];
  const steps = ["Search or browse categories", "Filter by sector/locality", "View details and directions", "Call or WhatsApp directly", "Businesses submit listings", "Admin approves verified listings"];
  return `
    <main class="page">
      ${pageTitle("About Explore Gandhinagar", "A premium local discovery app for residents, visitors, vendors, service providers, and city administrators.")}
      <section class="section">
        <div class="container split">
          <div class="story-panel reveal"></div>
          <div class="form-card reveal">
            <h2>What the app does</h2>
            <p class="small-muted">Explore Gandhinagar helps people discover tourist places, food, local services, emergency help, hospitals, hotels, government offices, shops, vendors, and everyday businesses from one clean interface.</p>
            <div class="quick-row"><a class="button" href="/explore" data-link>Explore Gandhinagar</a><a class="ghost-button" href="/add-business" data-link>Add Business or Service</a></div>
          </div>
        </div>
      </section>
      <section class="section dark">
        <div class="container">
          <div class="section-header reveal"><div><h2>Why it is useful</h2><p>Made for both residents and visitors, with practical actions instead of static directory entries.</p></div></div>
          <div class="grid cols-4">${values.map(([title, text]) => `<article class="mood-card listing-body reveal"><span class="icon-box">${icon("spark")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section">
        <div class="container split">
          <div class="form-card reveal">
            <h2>How it works</h2>
            <div class="timeline">${steps.map((step, index) => `<div class="timeline-step"><span class="step-dot">${index + 1}</span><div><strong>${step}</strong><p class="small-muted">Designed to keep local discovery quick, verified, and action-oriented.</p></div></div>`).join("")}</div>
          </div>
          <div class="form-card reveal">
            <h2>For business owners</h2>
            <p class="small-muted">The ₹249/month listing plan appears only inside Add Business. Payment does not auto-publish a listing; admin approval is required first.</p>
            <div class="notice"><strong>Trust and verification</strong><br>Incorrect information can be reported from listing detail pages, and admins can review reports, payments, subscriptions, and approvals.</div>
            <div class="quick-row"><a class="button" href="/add-business" data-link>Add Business or Service</a><a class="ghost-button" href="/explore" data-link>Explore Listings</a></div>
          </div>
        </div>
      </section>
    </main>`;
}

function renderAboutModern() {
  const values = [
    ["Built for Gandhinagar", "Sector filters, local categories, and city-specific actions keep discovery practical."],
    ["Helps local businesses", "Owners can submit places, shops, services, cafes, clinics, vendors, and events."],
    ["Useful for everyone", "Residents and visitors can find food, offices, stays, healthcare, services, and activities quickly."],
    ["Important help is separate", "Emergency contacts and urgent listings are kept away from general service browsing."]
  ];
  const steps = [
    ["Search or browse", "Start from Explore, Services, or a category card."],
    ["Filter by area/category", "Narrow results by sector, locality, service, or emergency type."],
    ["View listing details", "Check address, availability, service area, images, and description."],
    ["Call, WhatsApp, or get directions", "Use direct actions from cards and detail pages."],
    ["Report incorrect information", "Flag stale details so admins can review and update them."]
  ];
  const stats = [
    ["16+", "Local categories"],
    ["80+", "Service types"],
    ["4", "Emergency contacts"],
    ["Rs 249", "Monthly plan"]
  ];
  return `
    <main class="page">
      ${pageTitle("About Explore Gandhinagar", "A city guide made to help people discover Gandhinagar with confidence, speed, and local context.")}
      <section class="section">
        <div class="container split">
          <div class="story-panel reveal"></div>
          <div class="form-card reveal">
            <h2>Purpose</h2>
            <p class="small-muted">Explore Gandhinagar helps residents and visitors discover places, food, cafes, hotels, hospitals, government offices, emergency help, local services, events, and businesses from one polished city guide.</p>
            <div class="quick-row"><a class="button" href="/explore" data-link>Explore Gandhinagar</a><a class="ghost-button" href="/add-business" data-link>Add Business or Service</a></div>
          </div>
        </div>
      </section>
      <section class="section dark">
        <div class="container">
          <div class="section-header reveal"><div><h2>Local value</h2><p>Made for daily city use, not just browsing.</p></div></div>
          <div class="grid cols-4">${values.map(([title, text]) => `<article class="mood-card listing-body reveal"><span class="icon-box">${icon("spark")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section">
        <div class="container split">
          <div class="form-card reveal">
            <h2>How it works</h2>
            <div class="timeline">${steps.map(([step, text], index) => `<div class="timeline-step"><span class="step-dot">${index + 1}</span><div><strong>${step}</strong><p class="small-muted">${text}</p></div></div>`).join("")}</div>
          </div>
          <div class="form-card reveal">
            <h2>For business owners</h2>
            <p class="small-muted">Businesses can list themselves for the Rs 249/month plan. Payment does not auto-publish a listing; admin approval is required before public visibility.</p>
            <div class="notice"><strong>Reliability rule</strong><br>Only paid, approved, active subscriptions appear publicly. This keeps the guide cleaner for residents and visitors.</div>
            <div class="quick-row"><a class="button" href="/add-business" data-link>Add Business or Service</a><a class="ghost-button" href="/explore" data-link>Explore Listings</a></div>
          </div>
        </div>
      </section>
      <section class="section dark">
        <div class="container">
          <div class="section-header reveal"><div><h2>Trust and safety</h2><p>Listings can be reviewed by admin, incorrect information can be reported, emergency help is separated from general services, and Google Maps direction links help users navigate externally.</p></div></div>
          <div class="stats-strip about-stats reveal">${stats.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("")}</div>
        </div>
      </section>
      <section class="section">
        <div class="container center-cta reveal">
          <h2>Discover the city, then help improve it.</h2>
          <div class="quick-row"><a class="button" href="/explore" data-link>Explore Gandhinagar</a><a class="ghost-button" href="/add-business" data-link>Add Business or Service</a></div>
        </div>
      </section>
    </main>`;
}

function renderAboutPremium() {
  const discover = [
    ["Places to visit", "Tourist spots, gardens, temples, and local landmarks.", "map"],
    ["Food and cafes", "Restaurants, cafes, street food, and family dining.", "utensils"],
    ["Hotels and stays", "Visitor stays, guest houses, and business travel options.", "bed"],
    ["Hospitals and emergency", "Healthcare, urgent help, pharmacies, and blood banks.", "heart"],
    ["Government offices", "Civic offices and public departments.", "building"],
    ["Local services", "Repair, home, professional, lifestyle, and utility services.", "tool"],
    ["Events", "Food festivals, cultural evenings, workshops, and meetups.", "calendar"],
    ["Shops and markets", "Markets, retail, vendors, and everyday essentials.", "bag"]
  ];
  const steps = [
    ["Search or browse", "Use Explore, Services, Events, or category cards."],
    ["Filter by locality", "Choose any Gandhinagar sector or nearby locality."],
    ["View details", "Check images, descriptions, address, and service data."],
    ["Call or WhatsApp", "Use direct contact actions when available."],
    ["Get directions", "Open Google Maps direction links externally."],
    ["Report issues", "Send incorrect information reports for admin review."]
  ];
  const trust = [
    ["Admin-reviewed listings", "Payment does not auto-publish. Admin approval is required."],
    ["Report incorrect information", "Users can flag stale or wrong listing details."],
    ["Emergency stays separate", "Urgent services are separated from general browsing."],
    ["Clear visibility rules", "Only paid, approved, active listings appear publicly."]
  ];
  const help = [
    ["Residents", "Find daily services, food, hospitals, government offices, shopping, and local events without bouncing across stale links.", "building"],
    ["Visitors", "Discover landmarks, stays, cafes, gardens, directions, and useful emergency access from one polished city guide.", "map"],
    ["Businesses", "Join through the Add Business flow, choose a visibility plan, complete payment placeholder, then wait for admin approval.", "bag"]
  ];
  const flow = [
    ["Discover", "Browse Explore, Services, Events, Emergency, or a category."],
    ["Filter", "Use sector, locality, service, category, status, and quick chips."],
    ["Act", "Call, WhatsApp, share, open directions, or report incorrect details."],
    ["Improve", "Admins review listings, payments, reports, categories, and events."]
  ];
  const stats = [
    [categories.length, "Local categories"],
    [serviceCategories.length, "Service types"],
    [publicEvents().length, "Event listings"],
    [4, "Emergency contacts"],
    ["2", "Business plans"]
  ];
  return `
    <main class="page about-page">
      <section class="about-hero route-hero reveal">
        <div class="container about-hero-grid">
          <div class="page-title">
            <h1>About Explore Gandhinagar</h1>
            <p>A premium city guide that helps people discover Gandhinagar's places, food, services, events, emergency help, and trusted local businesses from one consistent app.</p>
            <div class="quick-row"><a class="button" href="/explore" data-link>Explore Gandhinagar</a><a class="ghost-button" href="/add-business" data-link>Add Business or Service</a></div>
          </div>
          <aside class="about-hero-panel reveal">
            <span class="icon-box">${icon("map")}</span>
            <strong>One guide for real city decisions</strong>
            <p>Search by category, sector, locality, service type, or emergency need, then act with direct call, WhatsApp, directions, and report actions.</p>
            <div class="about-mini-grid">
              ${stats.slice(0, 4).map(([value, label]) => `<span><strong>${value}</strong>${label}</span>`).join("")}
            </div>
          </aside>
        </div>
      </section>

      <section class="section about-intro-section" id="about-does">
        <div class="container about-story-grid">
          <div class="story-panel about-story-media reveal"></div>
          <article class="about-copy-card reveal">
            <span class="icon-box">${icon("spark")}</span>
            <h2>What Explore Gandhinagar does</h2>
            <p>Explore Gandhinagar brings tourist places, restaurants, cafes, hotels, hospitals, government offices, shops, local services, vendors, events, and emergency help into a single managed discovery experience.</p>
            <div class="about-flow-grid">
              ${flow.map(([title, text]) => `<div><strong>${title}</strong><span>${text}</span></div>`).join("")}
            </div>
          </article>
        </div>
      </section>

      <section class="section dark about-band" id="about-help">
        <div class="container">
          <div class="section-header reveal"><div><h2>How it helps residents and visitors</h2><p>Designed for practical city use: compare, filter, call, navigate, and discover what is nearby without losing the premium flow.</p></div></div>
          <div class="grid cols-3">${help.map(([title, text, iconName]) => `<article class="mood-card about-help-card listing-body reveal"><span class="icon-box">${icon(iconName)}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
        </div>
      </section>

      <section class="section about-discovery-section" id="about-discovery">
        <div class="container">
          <div class="section-header compact reveal"><div><h2>Events, food, services, and emergency discovery</h2><p>Each destination uses the same premium card system, clear actions, and category-aware filters.</p></div><a class="text-button" href="/explore" data-link>Open Explore ${icon("arrow")}</a></div>
          <div class="grid cols-4">${discover.map(([title, text, iconName]) => `<article class="mood-card listing-body reveal"><span class="icon-box">${icon(iconName)}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
        </div>
      </section>

      <section class="section dark about-band" id="about-how">
        <div class="container">
          <div class="section-header compact reveal"><div><h2>How it works</h2><p>Simple steps for finding, acting on, and improving local information.</p></div></div>
          <div class="grid cols-3">${steps.map(([title, text], index) => `<article class="step-card reveal"><span class="step-dot">${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
        </div>
      </section>

      <section class="section about-business-section" id="about-business">
        <div class="container about-business-grid">
          <article class="about-copy-card reveal">
            <span class="icon-box">${icon("bag")}</span>
            <h2>How businesses can join</h2>
            <p>Local businesses, vendors, service providers, cafes, clinics, hotels, offices, shops, and event organizers can submit details through the Add Business flow.</p>
            <p>Businesses can choose Standard Listing at Rs 249/month or Featured Top Placement at Rs 499/month. Featured visibility is applied only after paid status, active subscription, and admin approval.</p>
            <div class="quick-row"><a class="button" href="/add-business" data-link>Add Business or Service</a><a class="ghost-button" href="/explore" data-link>Explore listings</a></div>
          </article>
          <div class="about-pricing-wrap reveal">${pricingCards("featured_499", false)}</div>
        </div>
      </section>

      <section class="section dark about-band" id="about-trust">
        <div class="container">
          <div class="section-header compact reveal"><div><h2>Trust and listing verification</h2><p>The guide is designed around clear publishing, correction, payment, subscription, and admin review workflows.</p></div></div>
          <div class="grid cols-4">${trust.map(([title, text]) => `<article class="mood-card listing-body reveal"><span class="icon-box">${icon("shield")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
        </div>
      </section>

      <section class="section about-stats-section">
        <div class="container">
          <div class="stats-strip about-stats reveal">${stats.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("")}</div>
        </div>
      </section>

      <section class="section about-final-cta">
        <div class="container center-cta reveal">
          <span class="icon-box">${icon("spark")}</span>
          <h2>Find the city faster, and help keep it useful.</h2>
          <p class="small-muted">Start exploring Gandhinagar now, or add a business or service so local users can discover it through the same trusted guide.</p>
          <div class="quick-row"><a class="button" href="/explore" data-link>Explore Gandhinagar</a><a class="ghost-button" href="/add-business" data-link>Add Business or Service</a></div>
        </div>
      </section>
    </main>`;
}

const legalPages = {
  "/privacy-policy": {
    title: "Privacy Policy",
    updated: "June 1, 2026",
    sections: [
      ["What this app is", "Explore Gandhinagar is a city guide for places, services, emergency help, events, businesses, and public-use listings in and around Gandhinagar."],
      ["Business listing submission data", "When a business or service is submitted, the app may store owner name, business name, address, sector/locality, phone, WhatsApp, email, website, description, services, images, Google Maps URL, payment placeholder status, subscription dates, and admin notes."],
      ["Reports and corrections", "If you report incorrect information, the message and optional contact details are stored so an admin can review and correct the affected listing."],
      ["Payment placeholder data", "The current app uses placeholder payment and subscription fields. Payment status, plan amount, subscription dates, and notes are used for admin review and public visibility rules. Real payment gateway webhooks are not connected yet."],
      ["How information is used", "Submitted information is used to review listings, publish approved paid active listings, maintain service/category filters, process reports, and manage subscriptions in the admin panel."],
      ["Public visibility", "Approved public listings may show business names, addresses, contact numbers, WhatsApp links, descriptions, images, opening hours, service areas, and Google Maps direction links."],
      ["Sharing and external links", "The app does not intentionally sell submitted data. Google Maps and WhatsApp links open external services, and those services may process data under their own policies."],
      ["Local storage", "The app uses browser localStorage for saved listings, demo data, admin placeholder records, and basic UI state. Clearing browser data may remove this local data."],
      ["Correction and removal", "Users and business owners can request correction or removal of listing information by contacting hello@example.com or by using the report form where available."],
      ["Security and updates", "This demo stores data locally in the browser and is not a substitute for production security controls. This policy may be updated as real backend, authentication, analytics, or payment integrations are added."]
    ]
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions",
    updated: "June 1, 2026",
    sections: [
      ["Use of the app", "Explore Gandhinagar is provided as a local directory and city guide. Users should verify important information before relying on it."],
      ["Directory information", "Listings may include places, cafes, hotels, hospitals, government offices, emergency contacts, events, and local services. Information can change and may require admin review or correction."],
      ["Business submissions", "Businesses and service providers are responsible for submitting accurate, lawful, and current information. Misleading, harmful, duplicate, or inappropriate submissions may be edited, rejected, or removed."],
      ["Listing plan", "The listing plan is Rs 249/month in the current placeholder flow. Payment does not guarantee publication. Admin approval is required before a listing appears publicly."],
      ["Approval and visibility", "Rejected, unpaid, expired, cancelled, pending, or inactive listings may be hidden from public pages. Admins may edit, deactivate, approve, reject, or remove listings to keep the guide useful."],
      ["Payments and subscriptions", "Payment and subscription handling is currently a placeholder system. Real payment gateway integration may be added later, and payment records should be reconciled before production use."],
      ["External links", "Google Maps, WhatsApp, websites, and direction links open external services. Explore Gandhinagar is not responsible for third-party content, cookies, accuracy, or availability."],
      ["Emergency information", "Emergency numbers and urgent listings are provided for convenience. In a real emergency, call official emergency services immediately and verify local availability."],
      ["Limitation of liability", "The app is a city guide and admin management prototype. It is provided without a guarantee that every listing, phone number, direction, or status is complete or error-free."],
      ["Changes", "Features, listing rules, pricing, public visibility rules, and these terms may be updated as the app becomes production-ready."]
    ]
  },
  "/cookie-policy": {
    title: "Cookie Policy",
    updated: "June 1, 2026",
    sections: [
      ["Cookies and local storage", "Cookies are small browser records. localStorage is browser storage used by this app for saved listings, demo listing data, placeholder admin records, and simple app state."],
      ["What we currently use", "The current app uses localStorage for saved listings, listing/payment/subscription demo data, reports, editable admin data, and settings. No analytics cookies are currently implemented in this codebase."],
      ["Future analytics", "Analytics or payment-provider cookies may be added later if a real analytics service or payment gateway is integrated. This policy should be updated before those features are used in production."],
      ["Third-party links", "Google Maps, WhatsApp, and external website links may use their own cookies or tracking once opened in a new tab."],
      ["Your choices", "You can control cookies and localStorage through your browser settings. Clearing localStorage may reset saved listings and demo/admin data in this prototype."],
      ["Updates", "This Cookie Policy may change as authentication, analytics, backend storage, or payment systems are added."]
    ]
  }
};

function renderLegalPage(path) {
  const page = legalPages[path];
  if (!page) return notFound();
  return `
    <main class="page">
      ${pageTitle(page.title, `Last updated ${page.updated}. Practical policies for the Explore Gandhinagar city guide.`)}
      <section class="section">
        <article class="container legal-card reveal">
          ${page.sections.map(([title, text]) => `<section><h2>${title}</h2><p>${text}</p></section>`).join("")}
          <div class="quick-row"><a class="button" href="/" data-link>Back to Home</a><a class="ghost-button" href="/about" data-link>About the App</a></div>
        </article>
      </section>
    </main>`;
}

function adminShell(content, title = "Admin") {
  // TODO: Add admin login and role-based authentication later.
  return `
    <main class="admin-layout page">
      <aside class="admin-sidebar">
        <div class="brand" style="margin-bottom:20px"><strong>Admin</strong><span>Open for now</span></div>
        <nav class="admin-nav">${adminItems.map(([label, href]) => link(href, label)).join("")}</nav>
      </aside>
      <section class="admin-main">
        <div class="admin-topbar reveal"><strong>${title}</strong><span>Open admin prototype</span><a class="ghost-button small-button" href="/" data-link>Public app</a></div>
        <div class="section-header reveal"><div><h2>${title}</h2><p>Manage Gandhinagar listings, payments, subscriptions, categories, services, reports, and approvals.</p></div></div>
        ${appState.adminNotice ? `<div class="notice success reveal">${appState.adminNotice}</div>` : ""}
        ${content}
      </section>
    </main>`;
}

function renderAdminDashboard() {
  const all = listings();
  const stats = [
    ["Total listings", all.length],
    ["Total services", all.filter((x) => x.listing_type === "service").length],
    ["Approved listings", all.filter((x) => x.approval_status === "approved").length],
    ["Pending approvals", all.filter((x) => x.approval_status === "pending").length],
    ["Paid listings", all.filter((x) => x.payment_status === "paid").length],
    ["Unpaid listings", all.filter((x) => x.payment_status !== "paid").length],
    ["Expired subscriptions", all.filter((x) => x.subscription_status === "expired").length],
    ["Rejected listings", all.filter((x) => x.approval_status === "rejected").length],
    ["Featured listings", all.filter((x) => x.featured).length],
    ["Verified listings", all.filter((x) => x.verified).length],
    ["Monthly revenue placeholder", `₹${all.filter((x) => x.payment_status === "paid").length * 249}`],
    ["Active subscriptions", all.filter((x) => x.subscription_status === "active").length],
    ["Total categories", categories.length],
    ["Total reports", reports().length]
  ];
  const charts = ["Listings by category", "Payment status overview", "Approval status overview", "Subscription expiry overview"];
  return adminShell(
    `<div class="grid cols-4">${stats.map(([label, value]) => `<article class="admin-stat reveal"><strong>${value}</strong><span class="small-muted">${label}</span></article>`).join("")}</div>
     <div class="grid cols-2" style="margin-top:24px">${charts.map((title, i) => chartPlaceholder(title, i)).join("")}</div>`,
    "Admin Dashboard"
  );
}

function chartPlaceholder(title, offset) {
  const heights = [55, 82, 36, 100, 72, 44, 90, 62].map((height) => Math.max(30, height - offset * 7));
  return `<div class="chart-placeholder reveal"><h3>${title}</h3><div class="bars">${heights.map((height) => `<span style="height:${height}%"></span>`).join("")}</div><p class="small-muted">Placeholder chart ready for analytics integration.</p></div>`;
}

function renderAdminDashboardV3() {
  const stats = getAdminStats();
  const charts = ["Listings by category", "Payment status overview", "Approval status overview", "Event status overview"];
  return adminShell(
    `<div class="grid cols-4">${stats.map(([label, value]) => `<article class="admin-stat reveal"><strong>${value}</strong><span class="small-muted">${label}</span></article>`).join("")}</div>
     <div class="grid cols-2" style="margin-top:24px">${charts.map((title, i) => chartPlaceholder(title, i)).join("")}</div>`,
    "Admin Dashboard"
  );
}

function adminRowActions(item, { viewHref = `/listing/${item.slug}`, editHref = `/admin/edit-listing/${item.id}`, payment = false, subscription = false } = {}) {
  const paymentActions = payment
    ? `<button data-admin-action="mark-paid" data-id="${item.id}">Mark as Paid</button><button data-admin-action="payment-failed" data-id="${item.id}">Mark Failed</button><button data-admin-action="payment-cancelled" data-id="${item.id}">Mark Cancelled</button><button data-admin-action="add-note" data-id="${item.id}">Add Note</button>`
    : "";
  const subscriptionActions = subscription
    ? `<button data-admin-action="extend" data-id="${item.id}">Extend Subscription</button><button data-admin-action="cancel-subscription" data-id="${item.id}">Cancel Subscription</button><button data-admin-action="mark-paid" data-id="${item.id}">Renew</button>`
    : "";
  return `
    <div class="admin-actions">
      <a class="button small-button" href="${viewHref}" ${viewHref.startsWith("/admin") || viewHref.startsWith("/listing") ? "data-link" : ""}>View</a>
      <a class="ghost-button small-button" href="${editHref}" data-link>Edit</a>
      <details class="more-menu">
        <summary class="ghost-button small-button">More</summary>
        <div>
          ${paymentActions}
          ${subscriptionActions}
          <button data-admin-action="approve" data-id="${item.id}">Approve</button>
          <button data-admin-action="reject" data-id="${item.id}">Reject</button>
          ${payment || subscription ? "" : `<button data-admin-action="mark-paid" data-id="${item.id}">Mark as Paid</button>`}
          <button data-admin-action="mark-unpaid" data-id="${item.id}">Mark as Unpaid</button>
          ${subscription ? "" : `<button data-admin-action="extend" data-id="${item.id}">Extend Subscription</button>`}
          <button data-admin-action="plan-standard" data-id="${item.id}">Convert to Standard</button>
          <button data-admin-action="plan-featured" data-id="${item.id}">Convert to Featured</button>
          <button data-admin-action="toggle-featured" data-id="${item.id}">Mark Featured</button>
          <button data-admin-action="toggle-verified" data-id="${item.id}">Mark Verified</button>
          <button class="danger-menu-action" data-admin-action="delete" data-id="${item.id}">Delete</button>
        </div>
      </details>
    </div>`;
}

function adminTable(items, mode = "listings") {
  if (!items.length) return `<div class="empty reveal"><h3>No ${mode} available</h3><p class="small-muted">No records match the current filters.</p></div>`;
  const tableClass = `admin-data-table admin-${String(mode).toLowerCase().replace(/[^a-z0-9]+/g, "-")}-table`;
  return `
    <div class="table-wrap reveal">
      <table class="${tableClass}">
        <thead><tr>
          <th>Name</th><th>Type</th><th>Category</th><th>Sector</th><th>Plan</th><th>Price</th><th>Payment</th><th>Approval</th><th>Subscription end</th><th>Featured</th><th>Priority</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${items
            .map(
              (item) => `<tr>
            <td><strong>${item.name}</strong><br><span class="small-muted">${item.owner_name}</span></td>
            <td>${item.listing_type}</td>
            <td>${item.category_name}</td>
            <td>${item.sector_locality}</td>
            <td>${item.plan_name}</td>
            <td>Rs ${item.plan_price}</td>
            <td>${statusBadge(item.payment_status)}</td>
            <td>${statusBadge(item.approval_status)}</td>
            <td>${item.subscription_end_date}</td>
            <td>${isFeaturedListing(item) ? "Active" : item.featured ? "Configured" : "No"}</td>
            <td>${item.placement_priority || 0}</td>
            <td class="actions-cell">${adminRowActions(item)}</td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`;
}

function renderAdminListings({ requests = false, servicesOnly = false } = {}) {
  let items = applyFilters(listings(), {});
  if (requests) items = items.filter((item) => item.approval_status === "pending");
  if (servicesOnly) items = items.filter((item) => item.listing_type === "service" || item.category_id === "local-services");
  const title = requests ? "Admin Requests" : servicesOnly ? "Admin Services" : "Admin Listings";
  return adminShell(`${filterControls({ category: true, service: servicesOnly, type: true, payment: true, approval: true, subscription: true })}${adminTable(items, title)}`, title);
}

function renderAdminSubscriptions() {
  const items = applyFilters(listings(), {});
  return adminShell(
    `<div class="table-wrap reveal"><table><thead><tr><th>Vendor/business</th><th>Plan</th><th>Price</th><th>Payment</th><th>Start</th><th>End</th><th>Days remaining</th><th>Approval</th><th>Renewal</th><th>Actions</th></tr></thead><tbody>
      ${items
        .map(
          (item) => `<tr><td><strong>${item.name}</strong></td><td>${item.plan_name}</td><td>₹${item.plan_price}</td><td>${statusBadge(item.payment_status)}</td><td>${item.subscription_start_date}</td><td>${item.subscription_end_date}</td><td>${daysRemaining(item.subscription_end_date)}</td><td>${statusBadge(item.approval_status)}</td><td>${statusBadge(item.subscription_status)}</td><td><div class="quick-row"><button class="ghost-button" data-admin-action="mark-paid" data-id="${item.id}">Mark paid</button><button class="ghost-button" data-admin-action="mark-unpaid" data-id="${item.id}">Mark unpaid</button><button class="ghost-button" data-admin-action="expire" data-id="${item.id}">Expire</button><button class="ghost-button" data-admin-action="extend" data-id="${item.id}">Extend</button><button class="ghost-button" data-admin-action="approve" data-id="${item.id}">Approve</button><button class="ghost-button" data-admin-action="reject" data-id="${item.id}">Reject</button></div></td></tr>`
        )
        .join("")}
    </tbody></table></div>`,
    "Admin Subscriptions"
  );
}

function renderAdminPayments() {
  const items = applyFilters(listings(), {});
  return adminShell(
    `<div class="table-wrap reveal"><table><thead><tr><th>Listing/business</th><th>Vendor</th><th>Phone</th><th>Plan</th><th>Amount</th><th>Payment</th><th>Date</th><th>Actions</th></tr></thead><tbody>
      ${items
        .map(
          (item) => `<tr><td><strong>${item.name}</strong></td><td>${item.owner_name}</td><td>${item.phone}</td><td>${item.plan_name}</td><td>₹${item.plan_price}</td><td>${statusBadge(item.payment_status)}</td><td>${item.updated_at.slice(0, 10)}</td><td><div class="quick-row">${paymentStatuses
            .map((status) => `<button class="ghost-button" data-admin-action="payment-${status}" data-id="${item.id}">${status.replace(/_/g, " ")}</button>`)
            .join("")}</div></td></tr>`
        )
        .join("")}
    </tbody></table></div>
    <div class="notice reveal" style="margin-top:16px">Placeholder payment system ready for future Razorpay, Stripe, or Indian payment gateway integration.</div>`,
    "Admin Payments"
  );
}

function renderAdminCategories() {
  return adminShell(`<div class="grid cols-4">${categories.map(categoryCard).join("")}</div>`, "Admin Categories");
}

function renderAdminReports() {
  const allReports = reports();
  const byId = Object.fromEntries(listings().map((listing) => [listing.id, listing.name]));
  return adminShell(
    allReports.length
      ? `<div class="table-wrap reveal"><table><thead><tr><th>Listing</th><th>Message</th><th>Reporter contact</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead><tbody>
      ${allReports
        .map(
          (report) => `<tr><td>${byId[report.listing_id] || "Unknown listing"}</td><td>${report.user_message}</td><td>${report.reporter_contact || "-"}</td><td>${statusBadge(report.status)}</td><td>${report.created_at}</td><td><div class="quick-row"><button class="ghost-button" data-report-action="reviewed" data-id="${report.id}">Mark reviewed</button><button class="ghost-button" data-report-action="resolved" data-id="${report.id}">Mark resolved</button></div></td></tr>`
        )
        .join("")}
      </tbody></table></div>`
      : `<div class="empty reveal"><h3>No reports available</h3><p class="small-muted">Incorrect information reports will appear here.</p></div>`,
    "Admin Reports"
  );
}

function renderAdminSettings() {
  return adminShell(
    `<div class="form-card reveal"><h2>Settings</h2><p class="small-muted">Admin remains open without login for now. Authentication and role-based access control are marked as a TODO in the admin shell.</p><div class="quick-row"><button class="ghost-button" data-action="reset-demo">Reset demo data</button></div></div>`,
    "Admin Settings"
  );
}

function renderAdminSubscriptionsV2() {
  const items = applyFilters(listings(), {});
  return adminShell(
    `${filterControls({ category: true, payment: true, approval: true, subscription: true, resetPath: "/admin/subscriptions" })}
    <div class="table-wrap reveal"><table><thead><tr><th>Subscription ID</th><th>Listing/business</th><th>Vendor</th><th>Plan</th><th>Price</th><th>Payment</th><th>Status</th><th>Start</th><th>End</th><th>Days</th><th>Renewal</th><th>Actions</th></tr></thead><tbody>
      ${items
        .map((item) => `<tr><td>SUB-${item.id}</td><td><strong>${item.name}</strong></td><td>${item.owner_name}</td><td>${item.plan_name}</td><td>Rs ${item.plan_price}</td><td>${statusBadge(item.payment_status)}</td><td>${statusBadge(item.subscription_status)}</td><td>${item.subscription_start_date || "-"}</td><td>${item.subscription_end_date || "-"}</td><td>${daysRemaining(item.subscription_end_date)}</td><td>${item.renewal_status || "manual"}</td><td>${adminRowActions(item, { subscription: true })}</td></tr>`)
        .join("")}
    </tbody></table></div>`,
    "Admin Subscriptions"
  );
}

function renderAdminPaymentsV2() {
  const items = applyFilters(listings(), {});
  return adminShell(
    `${filterControls({ category: true, payment: true, approval: true, subscription: true, resetPath: "/admin/payments" })}
    <div class="table-wrap reveal"><table><thead><tr><th>Payment ID</th><th>Listing/business</th><th>Vendor</th><th>Phone</th><th>Plan</th><th>Amount</th><th>Currency</th><th>Status</th><th>Payment date</th><th>Subscription start</th><th>Subscription end</th><th>Actions</th></tr></thead><tbody>
      ${items
        .map((item) => `<tr><td>${item.payment_id || `PAY-${item.id}`}</td><td><strong>${item.name}</strong></td><td>${item.owner_name}</td><td>${item.phone}</td><td>${item.plan_name}</td><td>Rs ${item.plan_price}</td><td>INR</td><td>${statusBadge(item.payment_status)}</td><td>${item.payment_date || "-"}</td><td>${item.subscription_start_date || "-"}</td><td>${item.subscription_end_date || "-"}</td><td>${adminRowActions(item, { payment: true })}</td></tr>`)
        .join("")}
    </tbody></table></div>
    <div class="notice reveal" style="margin-top:16px">Placeholder payment updates are synchronized across listings, requests, subscriptions, and dashboard stats. TODO: Replace placeholder payment status updates with real payment gateway webhook integration.</div>`,
    "Admin Payments"
  );
}

function categoryEditorCard(category, index) {
  return `
    <form class="admin-edit-card reveal" data-admin-category-form data-index="${index}">
      <div class="admin-card-head"><strong>${category.name}</strong>${statusBadge(category.active === false ? "inactive" : "active")}</div>
      <div class="form-grid compact-form">
        ${field("Category name", "name", "text", category.name, true)}
        ${field("Slug", "slug", "text", category.slug, true)}
        ${field("Icon", "icon", "text", category.icon || "dot")}
        ${field("Sort order", "sort_order", "number", category.sort_order || index + 1)}
        ${field("Description", "description", "textarea", category.description || "", true, "span-2")}
        <div class="field span-2 check-row"><label><input type="checkbox" name="active" ${category.active === false ? "" : "checked"}> Active</label></div>
      </div>
      <div class="admin-actions"><button class="button small-button" type="submit">Save</button><button class="ghost-button small-button" type="button" data-admin-category-action="deactivate" data-index="${index}">Deactivate</button></div>
    </form>`;
}

function renderAdminCategoriesV2() {
  return adminShell(
    `<form class="form-card reveal" data-admin-category-form data-index="new">
      <h2>Add category</h2>
      <div class="form-grid compact-form">${field("Category name", "name", "text", "", true)}${field("Slug", "slug", "text", "", true)}${field("Icon", "icon", "text", "dot")}${field("Sort order", "sort_order", "number", categories.length + 1)}${field("Description", "description", "textarea", "", true, "span-2")}<div class="field span-2 check-row"><label><input type="checkbox" name="active" checked> Active</label></div></div>
      <div class="quick-row"><button class="button" type="submit">Add category</button></div>
    </form>
    <div class="admin-card-grid">${categories.map(categoryEditorCard).join("")}</div>`,
    "Admin Categories"
  );
}

function serviceCategoryEditorCard(groupName, service, groupIndex, serviceIndex) {
  return `
    <form class="admin-edit-card reveal" data-admin-service-category-form data-group-index="${groupIndex}" data-service-index="${serviceIndex}">
      <div class="admin-card-head"><strong>${service}</strong>${statusBadge("active")}</div>
      <div class="form-grid compact-form">
        ${field("Service category name", "name", "text", service, true)}
        ${field("Parent group", "parent_group", "text", groupName, true)}
        ${field("Slug", "slug", "text", slugify(service), true)}
        ${field("Description", "description", "text", `${service} providers in Gandhinagar`)}
        ${field("Sort order", "sort_order", "number", serviceIndex + 1)}
        <div class="field check-row"><label><input type="checkbox" name="active" checked> Active</label></div>
      </div>
      <div class="admin-actions"><button class="button small-button" type="submit">Save</button><button class="ghost-button small-button" type="button" data-admin-service-action="deactivate" data-group-index="${groupIndex}" data-service-index="${serviceIndex}">Deactivate</button></div>
    </form>`;
}

function renderAdminServicesV2() {
  const serviceItems = listings().filter((item) => item.listing_type === "service" || item.category_id === "local-services");
  return adminShell(
    `<form class="form-card reveal" data-admin-service-category-form data-group-index="new">
      <h2>Add service category</h2>
      <div class="form-grid compact-form">${field("Service category name", "name", "text", "", true)}${field("Parent group", "parent_group", "text", "Business & Daily Utility Services", true)}${field("Slug", "slug", "text", "", true)}${field("Description", "description", "text", "")}${field("Sort order", "sort_order", "number", serviceCategories.length + 1)}<div class="field check-row"><label><input type="checkbox" name="active" checked> Active</label></div></div>
      <div class="quick-row"><button class="button" type="submit">Add service category</button></div>
    </form>
    <div class="admin-card-grid">${serviceGroups.flatMap(([groupName, items], groupIndex) => items.map((service, serviceIndex) => serviceCategoryEditorCard(groupName, service, groupIndex, serviceIndex))).join("")}</div>
    <div class="section-header compact reveal"><div><h2>Service listings</h2><p>Edit service listings, approval, payment, and subscriptions from one place.</p></div></div>
    ${adminTable(serviceItems, "services")}`,
    "Admin Services"
  );
}

function eventAdminActions(event) {
  return `
    <div class="admin-actions">
      <a class="button small-button" href="/event/${event.slug}" data-link>View</a>
      <a class="ghost-button small-button" href="/admin/edit-event/${event.id}" data-link>Edit</a>
      <details class="more-menu">
        <summary class="ghost-button small-button">More</summary>
        <div>
          <button data-admin-event-action="publish" data-id="${event.id}">Publish</button>
          <button data-admin-event-action="draft" data-id="${event.id}">Move to Draft</button>
          <button data-admin-event-action="cancelled" data-id="${event.id}">Mark Cancelled</button>
          <button data-admin-event-action="completed" data-id="${event.id}">Mark Completed</button>
          <button data-admin-event-action="feature" data-id="${event.id}">${event.featured ? "Unfeature" : "Feature"}</button>
          <button class="danger-menu-action" data-admin-event-action="delete" data-id="${event.id}">Delete</button>
        </div>
      </details>
    </div>`;
}

function renderAdminEvents() {
  const params = new URLSearchParams(window.location.search);
  const q = (params.get("q") || "").toLowerCase().trim();
  const filtered = events().filter((event) => {
    const search = [event.title, event.category, event.venue_name, event.sector_locality, event.status, event.description].join(" ").toLowerCase();
    if (q && !search.includes(q)) return false;
    if (params.get("event_status") && event.status !== params.get("event_status")) return false;
    if (params.get("event_category") && event.category !== params.get("event_category")) return false;
    if (params.get("sector") && event.sector_locality !== params.get("sector")) return false;
    return true;
  });
  return adminShell(
    `<div class="filters reveal">
      <input data-filter="q" placeholder="Search events" value="${params.get("q") || ""}">
      <select data-filter="event_status"><option value="">All statuses</option>${["draft", "published", "cancelled", "completed"].map((status) => `<option value="${status}" ${params.get("event_status") === status ? "selected" : ""}>${status}</option>`).join("")}</select>
      <select data-filter="event_category"><option value="">All categories</option>${eventCategories.map((cat) => `<option value="${cat}" ${params.get("event_category") === cat ? "selected" : ""}>${cat}</option>`).join("")}</select>
      <select data-filter="sector"><option value="">All Areas</option>${localityOptions(params.get("sector") || "")}</select>
      <a class="ghost-button filter-reset" href="/admin/events" data-link>Reset</a>
    </div>
    <div class="quick-row reveal"><a class="button" href="/admin/add-event" data-link>Add Event</a></div>
    <div class="table-wrap reveal"><table class="admin-events-table"><thead><tr><th>Event title</th><th>Category</th><th>Date & time</th><th>Venue</th><th>Area</th><th>Status</th><th>Featured</th><th>Actions</th></tr></thead><tbody>
      ${filtered.map((event) => `<tr><td><strong>${event.title}</strong></td><td>${event.category}</td><td>${event.event_date}<br><span class="small-muted">${event.start_time}${event.end_time ? `-${event.end_time}` : ""}</span></td><td>${event.venue_name}</td><td>${event.sector_locality}</td><td>${statusBadge(event.status)}</td><td>${event.featured ? "Yes" : "No"}</td><td>${eventAdminActions(event)}</td></tr>`).join("")}
    </tbody></table></div>`,
    "Admin Events"
  );
}

function renderAdminEventForm(id = "") {
  const existing = events().find((event) => event.id === id);
  const data = existing || { city: "Gandhinagar", status: "draft", event_date: daysFromNow(7), start_time: "18:00" };
  return adminShell(
    `<form class="form-card reveal" data-admin-event-form data-id="${id}">
      <h2>${existing ? "Edit event" : "Add event"}</h2>
      <div class="form-grid">
        <div class="span-2 form-step-title">Basic Details</div>
        ${field("Event title", "title", "text", data.title || "", true)}
        ${selectField("Event category", "category", eventCategories, data.category || "", true)}
        ${field("Description", "description", "textarea", data.description || "", true, "span-2")}
        ${field("Tags", "tags_text", "text", (data.tags || []).join(", "))}
        ${selectField("Status", "status", ["draft", "published", "cancelled", "completed"], data.status || "draft", true)}
        <div class="field check-row"><label><input type="checkbox" name="featured" ${data.featured ? "checked" : ""}> Featured</label></div>
        <div class="span-2 form-step-title">Date and Time</div>
        ${field("Event date", "event_date", "date", data.event_date || daysFromNow(7), true)}
        ${field("Start time", "start_time", "time", data.start_time || "18:00", true)}
        ${field("End time optional", "end_time", "time", data.end_time || "")}
        <div class="span-2 form-step-title">Location</div>
        ${field("Venue name", "venue_name", "text", data.venue_name || "", true)}
        ${selectField("Sector/locality", "sector_locality", SECTOR_LOCALITY_OPTIONS.slice(1), data.sector_locality || "", true)}
        ${field("Full address", "full_address", "text", data.full_address || "", true, "span-2")}
        ${field("Google Maps URL", "map_url", "url", data.map_url || "https://maps.google.com/?q=Gandhinagar", false, "span-2")}
        <div class="span-2 form-step-title">Contact and Media</div>
        ${field("Phone optional", "phone", "tel", data.phone || "")}
        ${field("WhatsApp optional", "whatsapp", "tel", data.whatsapp || "")}
        ${field("Email optional", "email", "email", data.email || "")}
        ${field("Website optional", "website", "url", data.website || "")}
        ${field("Event image URL", "image", "url", data.image || imagePool.event, false, "span-2")}
        ${field("Image alt text", "image_alt", "text", data.image_alt || data.title || "")}
        ${field("Price label", "price_label", "text", data.price_label || "Free")}
      </div>
      <div class="quick-row"><button class="button" type="submit">${existing ? "Save event" : "Add event"}</button><a class="ghost-button" href="/admin/events" data-link>Back to Events</a></div>
    </form>`,
    existing ? "Edit Event" : "Add Event"
  );
}

function renderAdminReportsV2() {
  const allReports = reports();
  const byId = Object.fromEntries(listings().map((listing) => [listing.id, listing]));
  return adminShell(
    allReports.length
      ? `<div class="table-wrap reveal"><table><thead><tr><th>Listing</th><th>Message</th><th>Reporter contact</th><th>Status</th><th>Admin note</th><th>Created</th><th>Actions</th></tr></thead><tbody>
      ${allReports
        .map((report) => `<tr><td>${byId[report.listing_id]?.name || "Unknown listing"}</td><td>${report.user_message}</td><td>${report.reporter_contact || "-"}</td><td>${statusBadge(report.status)}</td><td>${report.admin_note || "-"}</td><td>${report.created_at}</td><td><div class="admin-actions"><a class="ghost-button small-button" href="/admin/edit-listing/${report.listing_id}" data-link>Edit listing</a><details class="more-menu"><summary class="ghost-button small-button">More</summary><div><button data-report-action="reviewed" data-id="${report.id}">Mark reviewed</button><button data-report-action="resolved" data-id="${report.id}">Mark resolved</button><button data-report-action="note" data-id="${report.id}">Add admin note</button></div></details></div></td></tr>`)
        .join("")}
      </tbody></table></div>`
      : `<div class="empty reveal"><h3>No reports available</h3><p class="small-muted">Incorrect information reports will appear here.</p></div>`,
    "Admin Reports"
  );
}

function renderAdminSettingsV2() {
  const settings = load("gcg_settings", { app_name: "Explore Gandhinagar", contact_email: "hello@example.com", contact_phone: "", listing_price: 249, currency: "INR", footer_links: "visible" });
  return adminShell(
    `<form class="form-card reveal" data-admin-settings-form>
      <h2>Site settings</h2>
      <div class="form-grid">${field("App name", "app_name", "text", settings.app_name, true)}${field("Contact email", "contact_email", "email", settings.contact_email)}${field("Contact phone", "contact_phone", "tel", settings.contact_phone)}${field("Listing price", "listing_price", "number", settings.listing_price, true)}${field("Currency", "currency", "text", settings.currency, true)}${selectField("Footer links visibility", "footer_links", ["visible", "hidden"], settings.footer_links, true)}</div>
      <div class="notice"><strong>Legal content</strong><br>Legal pages are structured in the app and can be moved to editable backend content later.</div>
      <div class="quick-row"><button class="button" type="submit">Save settings</button><button class="ghost-button" type="button" data-action="reset-demo">Reset demo data</button></div>
    </form>`,
    "Admin Settings"
  );
}

function renderAdminListingForm(id = "") {
  const existing = listings().find((item) => item.id === id);
  const title = existing ? "Edit Listing" : "Add Listing";
  const data = existing || {};
  return adminShell(
    `<form class="form-card reveal" data-admin-listing-form data-id="${id}">
      <div class="form-grid">
        ${field("Owner/person name", "owner_name", "text", data.owner_name || "", true)}
        ${field("Business/service/place name", "name", "text", data.name || "", true)}
        ${field("Slug", "slug", "text", data.slug || "")}
        ${selectField("Listing type", "listing_type", listingTypes, data.listing_type || "", true)}
        ${selectField("Category", "category_id", categories.map((cat) => [cat.id, cat.name]), data.category_id || "", true)}
        ${selectField("Service category", "service_category", serviceCategories, data.service_category || "", false)}
        ${field("Description", "description", "textarea", data.description || "", true, "span-2")}
        ${field("Full address", "full_address", "text", data.full_address || "", true, "span-2")}
        ${selectField("Sector/locality", "sector_locality", SECTOR_LOCALITY_OPTIONS.slice(1), data.sector_locality || "", true)}
        ${field("Phone", "phone", "tel", data.phone || "", false)}
        ${field("WhatsApp", "whatsapp", "tel", data.whatsapp || "", false)}
        ${field("Email", "email", "email", data.email || "", false)}
        ${field("Website", "website", "url", data.website || "", false)}
        ${field("Google Maps URL", "google_maps_url", "url", data.google_maps_url || "https://maps.google.com/?q=Gandhinagar", false, "span-2")}
        ${field("Image/logo URL", "image", "url", data.images?.[0] || "", false, "span-2")}
        ${field("Opening hours", "opening_hours", "text", data.opening_hours || "9:00 AM - 8:00 PM", true)}
        ${field("Services/products offered", "services_products", "text", data.services_products || "")}
        ${field("Tags", "tags_text", "text", (data.tags || []).join(", "))}
        ${selectField("Payment status", "payment_status", paymentStatuses, data.payment_status || "paid", true)}
        ${selectField("Approval status", "approval_status", approvalStatuses, data.approval_status || "approved", true)}
        ${selectField("Subscription status", "subscription_status", subscriptionStatuses, data.subscription_status || "active", true)}
        ${selectField("Listing plan", "subscription_plan", Object.values(LISTING_PLANS).map((plan) => [plan.id, `${plan.name} - Rs ${plan.price}/month`]), data.subscription_plan || "standard_249", true)}
        ${field("Placement priority", "placement_priority", "number", data.placement_priority || 0)}
        ${field("Subscription start date", "subscription_start_date", "date", data.subscription_start_date || daysFromNow(0))}
        ${field("Subscription end date", "subscription_end_date", "date", data.subscription_end_date || daysFromNow(30))}
        <div class="field span-2 check-row"><label><input type="checkbox" name="featured" ${data.featured ? "checked" : ""}> Featured</label><label><input type="checkbox" name="verified" ${data.verified ? "checked" : ""}> Verified</label><label><input type="checkbox" name="home_visit_available" ${data.home_visit_available ? "checked" : ""}> Home visit</label><label><input type="checkbox" name="emergency_available" ${data.emergency_available ? "checked" : ""}> Emergency</label></div>
      </div>
      <div class="quick-row"><button class="button" type="submit">${existing ? "Save changes" : "Add listing manually"}</button></div>
    </form>`,
    title
  );
}

function daysRemaining(date) {
  if (!date) return 0;
  const value = Math.ceil((new Date(date) - new Date()) / 86400000);
  return Number.isFinite(value) ? value : 0;
}

function collectForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function normalizeFormData(data, existing = {}) {
  const category = categories.find((item) => item.id === data.category_id);
  const planId = data.subscription_plan || existing.subscription_plan || "standard_249";
  const plan = planById(planId);
  return makeListing({
    ...existing,
    ...data,
    category_name: category?.name || "Other",
    slug: data.slug || existing.slug || slugify(data.name),
    city: "Gandhinagar",
    phone: data.phone || data.whatsapp || "079-4000-0000",
    whatsapp: data.whatsapp || data.phone || "919999999999",
    home_visit_available: Boolean(data.home_visit_available),
    emergency_available: Boolean(data.emergency_available),
    subscription_plan: plan.id,
    plan_id: plan.id,
    plan_name: plan.name,
    plan_price: plan.price,
    subscription_price: plan.price,
    placement_priority: Number(data.placement_priority || existing.placement_priority || (plan.id === "featured_499" ? 100 : 0)),
    featured: plan.id === "featured_499" ? Boolean(data.featured ?? true) : Boolean(data.admin_featured_override && data.featured),
    verified: Boolean(data.verified),
    payment_status: data.payment_status || existing.payment_status || "payment_pending",
    approval_status: data.approval_status || existing.approval_status || "pending",
    subscription_status: data.subscription_status || existing.subscription_status || "active",
    subscription_start_date: data.subscription_start_date || existing.subscription_start_date || daysFromNow(0),
    subscription_end_date: data.subscription_end_date || existing.subscription_end_date || daysFromNow(30),
    featured_until: plan.id === "featured_499" ? data.subscription_end_date || existing.subscription_end_date || daysFromNow(30) : "",
    image: data.image || existing.images?.[0] || (data.listing_type === "service" ? imagePool.service : imagePool.city),
    tags: data.tags_text ? data.tags_text.split(",").map((item) => item.trim()).filter(Boolean) : [data.name, data.category_id, data.service_category, data.sector_locality].filter(Boolean)
  });
}

function validateBusiness(data) {
  const hasContact = Boolean(data.phone || data.whatsapp);
  const hasMap = Boolean(data.google_maps_url || (data.latitude && data.longitude));
  if (!data.owner_name || !data.name || !data.listing_type || !data.category_id || !data.description || !data.full_address || !data.sector_locality || !data.opening_hours) return "Please fill all required fields.";
  if (data.listing_type === "service" && !data.service_category) return "Service category is required for service listings.";
  if (!hasContact) return "Contact number or WhatsApp number is required.";
  if (!hasMap) return "Google Maps URL or latitude/longitude is required.";
  if (!data.subscription_plan || !LISTING_PLANS[data.subscription_plan]) return "Please select a listing plan.";
  return "";
}

function notFound(title = "Page not found", description = "This route is not available in the Gandhinagar City Guide app.") {
  return `<main class="page">${pageTitle(title, description)}<section class="section"><div class="container"><a class="button" href="/" data-link>Back home</a></div></section></main>`;
}

function routeContent() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/") return renderHome();
  if (path === "/explore") return renderExplore();
  if (path === "/categories") {
    history.replaceState(null, "", "/explore");
    return renderExplore();
  }
  if (path.startsWith("/category/")) return renderCategory(path.split("/")[2]);
  if (path === "/services") return renderServices();
  if (path === "/events") return renderEventsPage();
  if (path.startsWith("/listing/")) return renderListingDetail(path.split("/")[2]);
  if (path.startsWith("/event/")) return renderEventDetail(path.split("/")[2]);
  if (path === "/add-business") return renderAddBusiness();
  if (path === "/emergency") return renderEmergency();
  if (path === "/about") return renderAboutPremium();
  if (path === "/privacy-policy" || path === "/terms-and-conditions" || path === "/cookie-policy") return renderLegalPage(path);
  if (path === "/map") {
    history.replaceState(null, "", "/explore");
    return renderExplore();
  }
  if (path === "/admin") return renderAdminDashboardV3();
  if (path === "/admin/listings") return renderAdminListings();
  if (path === "/admin/events") return renderAdminEvents();
  if (path === "/admin/requests") return renderAdminListings({ requests: true });
  if (path === "/admin/subscriptions") return renderAdminSubscriptionsV2();
  if (path === "/admin/payments") return renderAdminPaymentsV2();
  if (path === "/admin/categories") return renderAdminCategoriesV2();
  if (path === "/admin/services") return renderAdminServicesV2();
  if (path === "/admin/reports") return renderAdminReportsV2();
  if (path === "/admin/settings") return renderAdminSettingsV2();
  if (path === "/admin/add-listing") return renderAdminListingForm();
  if (path.startsWith("/admin/edit-listing/")) return renderAdminListingForm(path.split("/")[3]);
  if (path === "/admin/add-event") return renderAdminEventForm();
  if (path.startsWith("/admin/edit-event/")) return renderAdminEventForm(path.split("/")[3]);
  return notFound();
}

function render() {
  document.body.classList.toggle("menu-open", appState.menuOpen);
  app.innerHTML = `<div class="site-shell">${renderHeader()}${routeContent()}${renderFooter()}</div>`;
  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal").forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 35, 260)}ms`;
      observer.observe(el);
    });
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ block: "start" });
    }
    requestAnimationFrame(markVisibleReveals);
  });
}

function markVisibleReveals() {
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 120 && rect.bottom > -120) {
      el.classList.add("in");
      observer.unobserve(el);
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.01, rootMargin: "120px 0px" }
);

window.addEventListener("scroll", () => requestAnimationFrame(markVisibleReveals), { passive: true });

window.addEventListener("popstate", render);

document.addEventListener("click", async (event) => {
  const moreSummary = event.target.closest(".more-menu summary");
  if (moreSummary) {
    document.querySelectorAll(".more-menu[open]").forEach((menu) => {
      if (menu !== moreSummary.closest(".more-menu")) menu.removeAttribute("open");
    });
  } else if (!event.target.closest(".more-menu")) {
    document.querySelectorAll(".more-menu[open]").forEach((menu) => menu.removeAttribute("open"));
  }

  const linkEl = event.target.closest("[data-link]");
  if (linkEl) {
    const href = linkEl.getAttribute("href");
    if (href && href.startsWith("/")) {
      event.preventDefault();
      appState.menuOpen = false;
      appState.adminMenuOpen = false;
      appState.adminNotice = "";
      history.pushState(null, "", href);
      render();
      const hash = href.split("#")[1];
      requestAnimationFrame(() => {
        if (hash && document.getElementById(hash)) document.getElementById(hash).scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "toggle-menu") {
    appState.menuOpen = !appState.menuOpen;
    render();
  }
  if (action === "refresh-weather") {
    appState.weather = { ...appState.weather, loading: true };
    render();
    await new Promise((resolve) => setTimeout(resolve, 450));
    const temp = 31 + Math.floor(Math.random() * 4);
    appState.weather = {
      loading: false,
      temp,
      condition: temp > 33 ? "Sunny" : "Clear sky",
      humidity: 38 + Math.floor(Math.random() * 10),
      wind: 7 + Math.floor(Math.random() * 5),
      feelsLike: temp + 2,
      updatedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };
    render();
  }
  if (action === "carousel-prev") {
    const total = publicListings().filter(isFeaturedListing).length || 1;
    appState.featuredStart = (appState.featuredStart - 1 + total) % total;
    render();
  }
  if (action === "carousel-next") {
    const total = publicListings().filter(isFeaturedListing).length || 1;
    appState.featuredStart = (appState.featuredStart + 1) % total;
    render();
  }
  if (action === "share") {
    const title = event.target.closest("[data-title]").dataset.title;
    if (navigator.share) await navigator.share({ title, url: window.location.href });
    else navigator.clipboard?.writeText(window.location.href);
  }
  if (action === "mark-form-paid") {
    appState.addBusiness.paymentPaid = true;
    appState.addBusiness.paymentStatus = "paid";
    appState.addBusiness.error = "";
    render();
  }
  if (action === "mark-form-failed") {
    appState.addBusiness.paymentPaid = false;
    appState.addBusiness.paymentStatus = "failed";
    appState.addBusiness.error = "Payment marked as failed. Mark as paid before submitting for admin approval.";
    render();
  }
  if (action === "cancel-form-payment") {
    appState.addBusiness.paymentPaid = false;
    appState.addBusiness.paymentStatus = "cancelled";
    appState.addBusiness.error = "Payment cancelled. You can mark it as paid for testing when ready.";
    render();
  }
  if (action === "edit-add-business") {
    appState.addBusiness.pendingForm = null;
    appState.addBusiness.paymentPaid = false;
    appState.addBusiness.paymentStatus = "unpaid";
    render();
  }
  if (action === "submit-paid-request") {
    const next = normalizeFormData(
      {
        ...appState.addBusiness.pendingForm,
        subscription_plan: appState.addBusiness.pendingForm.subscription_plan || appState.addBusiness.selectedPlanId,
        payment_status: appState.addBusiness.paymentStatus,
        approval_status: "pending",
        subscription_status: "active",
        subscription_start_date: daysFromNow(0),
        subscription_end_date: daysFromNow(30),
        payment_date: daysFromNow(0)
      },
      {}
    );
    setListings([...listings(), next]);
    appState.addBusiness = { pendingForm: null, paymentPaid: false, paymentStatus: "paid", selectedPlanId: "standard_249", step: 6, submitted: true, error: "" };
    render();
  }
  if (action === "reset-demo") {
    localStorage.removeItem("gcg_seed_v5");
    save("gcg_listings", seedListings());
    save("gcg_events", seedEvents());
    save("gcg_reports", defaultReports);
    save("gcg_categories", categories);
    save("gcg_service_groups", serviceGroups);
    ensureSeed();
    appState.adminNotice = "Demo data reset successfully.";
    render();
  }

  const adminAction = event.target.closest("[data-admin-action]");
  if (adminAction) {
    handleAdminAction(adminAction.dataset.adminAction, adminAction.dataset.id);
  }

  const eventAction = event.target.closest("[data-admin-event-action]");
  if (eventAction) {
    handleAdminEventAction(eventAction.dataset.adminEventAction, eventAction.dataset.id);
  }

  const categoryAction = event.target.closest("[data-admin-category-action]");
  if (categoryAction) {
    const index = Number(categoryAction.dataset.index);
    categories = categories.map((category, itemIndex) => (itemIndex === index ? { ...category, active: false } : category));
    save("gcg_categories", categories);
    appState.adminNotice = "Category deactivated without breaking existing listings.";
    render();
  }

  const serviceAction = event.target.closest("[data-admin-service-action]");
  if (serviceAction) {
    const groupIndex = Number(serviceAction.dataset.groupIndex);
    const serviceIndex = Number(serviceAction.dataset.serviceIndex);
    serviceGroups = serviceGroups.map(([group, items], index) => [group, index === groupIndex ? items.filter((_, itemIndex) => itemIndex !== serviceIndex) : items]);
    serviceCategories = serviceGroups.flatMap((group) => group[1]);
    save("gcg_service_groups", serviceGroups);
    appState.adminNotice = "Service category deactivated. Existing listings keep their saved service label.";
    render();
  }

  const reportAction = event.target.closest("[data-report-action]");
  if (reportAction) {
    const id = reportAction.dataset.id;
    const reportActionName = reportAction.dataset.reportAction;
    const note = reportActionName === "note" ? prompt("Admin note") : "";
    setReports(reports().map((report) => (report.id === id ? { ...report, status: reportActionName === "note" ? report.status : reportActionName, admin_note: note || report.admin_note || "", updated_at: new Date().toISOString().slice(0, 10) } : report)));
    appState.adminNotice = reportActionName === "note" ? "Report note saved." : `Report marked ${reportActionName}.`;
    render();
  }
});

document.addEventListener("input", (event) => {
  const filter = event.target.closest("[data-filter]");
  if (!filter) return;
  const params = new URLSearchParams(window.location.search);
  if (filter.value) params.set(filter.dataset.filter, filter.value);
  else params.delete(filter.dataset.filter);
  history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  render();
});

document.addEventListener("change", (event) => {
  const planInput = event.target.closest('input[name="subscription_plan"]');
  if (planInput) {
    appState.addBusiness.selectedPlanId = planInput.value;
    document.querySelectorAll(".plan-card").forEach((card) => {
      const input = card.querySelector('input[name="subscription_plan"]');
      card.classList.toggle("active", input?.value === planInput.value);
    });
    return;
  }
  const filter = event.target.closest("[data-filter]");
  if (!filter) return;
  const params = new URLSearchParams(window.location.search);
  if (filter.value) params.set(filter.dataset.filter, filter.value);
  else params.delete(filter.dataset.filter);
  history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  render();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".more-menu[open]").forEach((menu) => menu.removeAttribute("open"));
  }
});

document.addEventListener("submit", (event) => {
  const homeSearch = event.target.closest("[data-home-search]");
  if (homeSearch) {
    event.preventDefault();
    const data = new FormData(homeSearch);
    const params = new URLSearchParams();
    if (data.get("q")) params.set("q", data.get("q"));
    if (data.get("area") && data.get("area") !== "Gandhinagar") params.set("sector", data.get("area"));
    history.pushState(null, "", `/explore?${params.toString()}`);
    render();
    return;
  }

  const refineForm = event.target.closest("[data-refine-form]");
  if (refineForm) {
    event.preventDefault();
    const params = new URLSearchParams();
    const data = new FormData(refineForm);
    ["q", "category", "sector", "sort"].forEach((name) => {
      if (data.get(name)) params.set(name, data.get(name));
    });
    history.pushState(null, "", `/explore?${params.toString()}`);
    render();
    return;
  }

  const addForm = event.target.closest("[data-add-business-form]");
  if (addForm) {
    event.preventDefault();
    const data = collectForm(addForm);
    data.home_visit_available = addForm.home_visit_available.checked ? "on" : "";
    data.emergency_available = addForm.emergency_available.checked ? "on" : "";
    const error = validateBusiness(data);
    if (error) {
      appState.addBusiness.error = error;
      render();
      return;
    }
    appState.addBusiness.pendingForm = {
      ...data,
      category_name: categoryName(data.category_id),
      subscription_plan: data.subscription_plan
    };
    appState.addBusiness.selectedPlanId = data.subscription_plan;
    appState.addBusiness.error = "";
    render();
    return;
  }

  const reportForm = event.target.closest("[data-report-form]");
  if (reportForm) {
    event.preventDefault();
    const data = collectForm(reportForm);
    const report = {
      id: crypto.randomUUID(),
      listing_id: reportForm.dataset.listingId,
      user_message: data.user_message,
      reporter_contact: data.reporter_contact,
      status: "new",
      created_at: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString().slice(0, 10)
    };
    setReports([report, ...reports()]);
    reportForm.innerHTML = `<div class="notice success">Report submitted successfully.</div>`;
    return;
  }

  const adminListingForm = event.target.closest("[data-admin-listing-form]");
  if (adminListingForm) {
    event.preventDefault();
    const id = adminListingForm.dataset.id;
    const data = collectForm(adminListingForm);
    ["featured", "verified", "home_visit_available", "emergency_available"].forEach((name) => {
      data[name] = adminListingForm[name]?.checked ? "on" : "";
    });
    const all = listings();
    const existing = all.find((item) => item.id === id);
    const next = normalizeFormData(data, existing || {});
    setListings(existing ? all.map((item) => (item.id === id ? next : item)) : [...all, next]);
    appState.adminNotice = existing ? "Listing updated successfully." : "Listing added successfully.";
    history.pushState(null, "", "/admin/listings");
    render();
    return;
  }

  const adminEventForm = event.target.closest("[data-admin-event-form]");
  if (adminEventForm) {
    event.preventDefault();
    const id = adminEventForm.dataset.id;
    const data = collectForm(adminEventForm);
    if (!data.title || !data.category || !data.event_date || !data.start_time || !data.venue_name || !data.full_address || !data.sector_locality || !data.status) {
      appState.adminNotice = "Please fill all required event fields.";
      render();
      return;
    }
    const existing = events().find((item) => item.id === id);
    const next = makeEvent({
      ...existing,
      ...data,
      featured: Boolean(adminEventForm.featured?.checked),
      tags: data.tags_text ? data.tags_text.split(",").map((item) => item.trim()).filter(Boolean) : existing?.tags || [],
      updated_at: new Date().toISOString()
    });
    setEvents(existing ? events().map((item) => (item.id === id ? next : item)) : [...events(), next]);
    appState.adminNotice = existing ? "Event updated successfully." : "Event added successfully.";
    history.pushState(null, "", "/admin/events");
    render();
    return;
  }

  const categoryForm = event.target.closest("[data-admin-category-form]");
  if (categoryForm) {
    event.preventDefault();
    const data = collectForm(categoryForm);
    const nextCategory = {
      id: data.slug || slugify(data.name),
      slug: data.slug || slugify(data.name),
      name: data.name,
      icon: data.icon || "dot",
      description: data.description,
      sort_order: Number(data.sort_order || categories.length + 1),
      active: Boolean(categoryForm.active?.checked)
    };
    const index = categoryForm.dataset.index;
    categories = index === "new" ? [...categories, nextCategory] : categories.map((item, itemIndex) => (String(itemIndex) === index ? nextCategory : item));
    save("gcg_categories", categories);
    appState.adminNotice = index === "new" ? "Category added successfully." : "Category updated successfully.";
    render();
    return;
  }

  const serviceCategoryForm = event.target.closest("[data-admin-service-category-form]");
  if (serviceCategoryForm) {
    event.preventDefault();
    const data = collectForm(serviceCategoryForm);
    const groupIndex = serviceCategoryForm.dataset.groupIndex;
    const serviceIndex = serviceCategoryForm.dataset.serviceIndex;
    const nextGroups = serviceGroups.map(([group, items]) => [group, [...items]]);
    if (groupIndex === "new") {
      const found = nextGroups.find((group) => group[0] === data.parent_group);
      if (found) found[1].push(data.name);
      else nextGroups.push([data.parent_group, [data.name]]);
    } else {
      const oldGroup = nextGroups[Number(groupIndex)];
      oldGroup[1].splice(Number(serviceIndex), 1);
      const target = nextGroups.find((group) => group[0] === data.parent_group) || oldGroup;
      target[1].splice(Number(data.sort_order || serviceIndex + 1) - 1, 0, data.name);
      nextGroups.forEach((group) => (group[1] = group[1].filter(Boolean)));
    }
    serviceGroups = nextGroups;
    serviceCategories = serviceGroups.flatMap((group) => group[1]);
    save("gcg_service_groups", serviceGroups);
    appState.adminNotice = groupIndex === "new" ? "Service category added successfully." : "Service category updated successfully.";
    render();
    return;
  }

  const settingsForm = event.target.closest("[data-admin-settings-form]");
  if (settingsForm) {
    event.preventDefault();
    save("gcg_settings", collectForm(settingsForm));
    appState.adminNotice = "Settings saved successfully.";
    render();
  }
});

document.addEventListener(
  "error",
  (event) => {
    const image = event.target;
    if (image instanceof HTMLImageElement && !image.dataset.fallbackApplied) {
      image.dataset.fallbackApplied = "true";
      image.src = "/assets/gandhinagar-hero.png";
    }
  },
  true
);

function handleAdminAction(action, id) {
  let notice = "";
  const all = listings();
  const item = all.find((listing) => listing.id === id);
  if (!item) return;

  if (action === "delete") {
    if (!confirm("Delete this listing?")) return;
    setListings(all.filter((listing) => listing.id !== id));
    appState.adminNotice = "Listing deleted successfully.";
    render();
    return;
  }

  if (action === "mark-paid") {
    markPaymentPaid(id);
    appState.adminNotice = "Payment marked as paid successfully.";
    render();
    return;
  }

  if (action === "extend") {
    extendSubscription(id, 30);
    appState.adminNotice = "Subscription extended successfully.";
    render();
    return;
  }

  if (["reject", "cancel-subscription", "payment-failed", "payment-cancelled"].includes(action) && !confirm("Confirm this status change?")) return;

  if (action === "add-note") {
    const note = prompt("Payment note/reference");
    if (!note) return;
    setListings(all.map((listing) => (listing.id === id ? { ...listing, payment_note: note, updated_at: new Date().toISOString() } : listing)));
    appState.adminNotice = "Payment note saved.";
    render();
    return;
  }

  const next = all.map((listing) => {
    if (listing.id !== id) return listing;
    const updated = { ...listing, updated_at: new Date().toISOString() };
    if (action === "mark-unpaid") {
      updated.payment_status = "unpaid";
      notice = "Payment marked as unpaid.";
    }
    if (action === "approve") {
      if (updated.payment_status !== "paid") {
        notice = "Payment must be marked as paid before approval.";
      } else {
        updated.approval_status = "approved";
        notice = "Listing approved successfully.";
      }
    }
    if (action === "reject") {
      updated.approval_status = "rejected";
      notice = "Listing rejected successfully.";
    }
    if (action === "toggle-verified") {
      updated.verified = !updated.verified;
      notice = "Verified flag updated.";
    }
    if (action === "plan-standard") {
      Object.assign(updated, applyPlan(updated, "standard_249"));
      updated.featured = false;
      notice = "Listing converted to Standard Listing.";
    }
    if (action === "plan-featured") {
      Object.assign(updated, applyPlan(updated, "featured_499"));
      if (updated.payment_status === "paid" && updated.approval_status === "approved") updated.featured = true;
      notice = "Listing converted to Featured Top Placement.";
    }
    if (action === "toggle-featured") {
      if (updated.subscription_plan !== "featured_499" && !updated.admin_featured_override) {
        notice = "Featured placement requires Featured Top Placement plan.";
      } else {
        updated.featured = !updated.featured;
        if (updated.featured && updated.subscription_plan === "featured_499") updated.featured_until = updated.subscription_end_date;
        notice = "Featured flag updated.";
      }
    }
    if (action === "extend") {
      updated.subscription_status = "active";
      updated.subscription_end_date = daysFromNow(30 + Math.max(0, daysRemaining(updated.subscription_end_date)));
      notice = "Subscription extended successfully.";
    }
    if (action === "cancel-subscription") {
      updated.subscription_status = "cancelled";
      updated.payment_status = "cancelled";
      notice = "Subscription cancelled.";
    }
    if (action === "expire") {
      updated.subscription_status = "expired";
      updated.payment_status = "expired";
      updated.subscription_end_date = daysFromNow(-1);
      notice = "Subscription marked as expired.";
    }
    if (action.startsWith("payment-")) {
      updated.payment_status = action.replace("payment-", "");
      if (updated.payment_status === "paid") updated.subscription_status = "active";
      notice = `Payment marked as ${updated.payment_status.replace(/_/g, " ")}.`;
    }
    return updated;
  });
  setListings(next);
  appState.adminNotice = notice;
  render();
}

function handleAdminEventAction(action, id) {
  const all = events();
  const target = all.find((event) => event.id === id);
  if (!target) return;
  if ((action === "delete" || action === "cancelled") && !confirm(action === "delete" ? "Delete this event?" : "Mark this event cancelled?")) return;
  if (action === "delete") {
    setEvents(all.filter((event) => event.id !== id));
    appState.adminNotice = "Event deleted successfully.";
    render();
    return;
  }
  setEvents(
    all.map((event) => {
      if (event.id !== id) return event;
      const next = { ...event, updated_at: new Date().toISOString() };
      if (["published", "draft", "cancelled", "completed"].includes(action)) next.status = action;
      if (action === "publish") next.status = "published";
      if (action === "feature") next.featured = !next.featured;
      return next;
    })
  );
  appState.adminNotice = action === "feature" ? "Event featured status updated." : `Event marked ${action === "publish" ? "published" : action}.`;
  render();
}

ensureSeed();
render();
