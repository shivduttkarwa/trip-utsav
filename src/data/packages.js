/* ============================================================
   TRIP UTSAV — Package data
   All site content is driven from this file. Edit / add packages
   here and every page (home, listing, detail) updates itself.
   ============================================================ */

const IMG = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Brand-gradient placeholder used if a network image fails to load */
const FALLBACK_IMG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#0f4c9c'/><stop offset='1' stop-color='#f26b21'/>
      </linearGradient></defs>
      <rect width='1200' height='800' fill='url(#g)'/>
      <text x='600' y='410' font-family='Arial' font-size='44' fill='rgba(255,255,255,.85)' text-anchor='middle'>Trip Utsav</text>
    </svg>`
  );

const PACKAGES = [
  /* ---------------- DOMESTIC ---------------- */
  {
    id: "kashmir-paradise",
    title: "Kashmir — Paradise on Earth",
    location: "Srinagar · Gulmarg · Pahalgam",
    category: "domestic",
    region: "North India",
    days: 6, nights: 5,
    price: 24999, oldPrice: 29999,
    rating: 4.9, reviews: 214,
    badge: "Bestseller",
    featured: true,
    tags: ["Honeymoon", "Family", "Houseboat"],
    image: IMG("photo-1566837945700-30057527ade0"),
    summary:
      "Drift across Dal Lake on a shikara, ride the Gulmarg Gondola above snow peaks and wander the saffron-scented valleys of Pahalgam — Kashmir is India at its most cinematic.",
    highlights: [
      "Deluxe houseboat stay on Dal Lake with shikara ride",
      "Gulmarg Gondola (Phase 1) — Asia's highest cable car",
      "Betaab Valley & Chandanwari excursion in Pahalgam",
      "Mughal Gardens: Nishat, Shalimar & Chashme Shahi",
      "Local Wazwan dinner experience",
      "Saffron fields & dry-fruit market walk"
    ],
    itinerary: [
      { title: "Arrival in Srinagar — Houseboat Check-in", desc: "Airport pickup, shikara ride on Dal Lake at sunset, overnight in a deluxe houseboat." },
      { title: "Srinagar — Mughal Gardens", desc: "Nishat Bagh, Shalimar Bagh, Chashme Shahi and Shankaracharya Temple. Evening free at Lal Chowk market." },
      { title: "Gulmarg Day Excursion", desc: "Drive to the Meadow of Flowers, Gondola ride to Kongdoori, optional skiing/sledging in season." },
      { title: "Srinagar → Pahalgam", desc: "En-route saffron fields of Pampore and Awantipora ruins. Evening riverside walk along the Lidder." },
      { title: "Pahalgam — Betaab Valley", desc: "Betaab Valley, Aru Valley and Chandanwari by local cab. Picnic lunch by the river." },
      { title: "Departure", desc: "Drive back to Srinagar airport with a stop for kahwa and souvenirs." }
    ],
    inclusions: ["5 nights accommodation (1 houseboat + 4 hotel)", "Daily breakfast & dinner", "All transfers by private cab", "Shikara ride & sightseeing as per itinerary", "All applicable taxes"],
    exclusions: ["Airfare / train fare", "Gondola tickets & pony rides", "Lunches and personal expenses", "Travel insurance"]
  },
  {
    id: "kerala-backwaters",
    title: "Kerala Backwaters & Hills",
    location: "Munnar · Thekkady · Alleppey · Kochi",
    category: "domestic",
    region: "South India",
    days: 7, nights: 6,
    price: 27499, oldPrice: 32999,
    rating: 4.8, reviews: 186,
    badge: "Honeymoon Pick",
    featured: true,
    tags: ["Houseboat", "Nature", "Ayurveda"],
    image: IMG("photo-1602216056096-3b40cc0c9944"),
    summary:
      "Tea gardens rolling into the mist, spice-scented forests and a night aboard a private houseboat gliding through palm-fringed canals — God's Own Country, unhurried and green.",
    highlights: [
      "Private premium houseboat cruise in Alleppey with all meals",
      "Munnar tea estate walk & Tea Museum",
      "Periyar wildlife sanctuary boat safari, Thekkady",
      "Kathakali performance & Chinese fishing nets, Kochi",
      "Ayurvedic massage session (couple)",
      "Spice plantation guided tour"
    ],
    itinerary: [
      { title: "Kochi Arrival → Munnar", desc: "Scenic drive past Cheeyappara waterfalls. Evening at leisure amid tea gardens." },
      { title: "Munnar Sightseeing", desc: "Eravikulam National Park, Mattupetty Dam, Echo Point and Tea Museum." },
      { title: "Munnar → Thekkady", desc: "Spice plantation tour, optional bamboo rafting, evening Kalaripayattu show." },
      { title: "Thekkady → Alleppey Houseboat", desc: "Board your private houseboat at noon; cruise the backwaters with freshly cooked Kerala meals on board." },
      { title: "Alleppey → Kochi", desc: "Disembark after breakfast, drive to Kochi. Fort Kochi walk, Chinese fishing nets, sunset at Marine Drive." },
      { title: "Kochi Day", desc: "Mattancherry Palace, Jew Town antiques street, Kathakali evening performance." },
      { title: "Departure", desc: "Transfer to Kochi airport with memories and a bag of fresh spices." }
    ],
    inclusions: ["6 nights stay (incl. 1 night premium houseboat)", "Daily breakfast + all meals on houseboat", "Private AC cab throughout", "Periyar boat safari tickets", "All taxes & driver allowances"],
    exclusions: ["Flights", "Entry fees not mentioned", "Ayurveda treatments beyond inclusion", "Personal expenses"]
  },
  {
    id: "goa-beach-escape",
    title: "Goa Beach Escape",
    location: "North & South Goa",
    category: "domestic",
    region: "West India",
    days: 4, nights: 3,
    price: 13999, oldPrice: 16999,
    rating: 4.6, reviews: 342,
    badge: "Weekend",
    featured: true,
    tags: ["Beach", "Party", "Friends"],
    image: IMG("photo-1512343879784-a960bf40e7f2"),
    summary:
      "Sun, sand and susegad. A quick reset with beach shacks, flea markets, a sunset cruise on the Mandovi and Old Goa's Portuguese lanes.",
    highlights: [
      "Stay near Baga/Calangute with breakfast",
      "North Goa tour — Fort Aguada, Anjuna, Chapora",
      "South Goa tour — Old Goa churches & Colva",
      "Sunset cruise on the Mandovi with live music",
      "Saturday Night Market visit (in season)"
    ],
    itinerary: [
      { title: "Arrival & Beach Evening", desc: "Check-in, laze at Baga beach, shack dinner by the waves." },
      { title: "North Goa Tour", desc: "Fort Aguada, Sinquerim, Anjuna, Vagator and Chapora Fort. Evening Mandovi sunset cruise." },
      { title: "South Goa Tour", desc: "Basilica of Bom Jesus, Se Cathedral, Mangeshi Temple, Miramar and Colva beach." },
      { title: "Departure", desc: "Souvenir shopping at the flea market, drop to airport/station." }
    ],
    inclusions: ["3 nights hotel with breakfast", "Airport transfers", "North & South Goa sightseeing by shared coach", "Sunset cruise tickets", "All taxes"],
    exclusions: ["Flights/trains", "Water sports", "Lunches & dinners", "Personal expenses"]
  },
  {
    id: "rajasthan-royal",
    title: "Royal Rajasthan Heritage Trail",
    location: "Jaipur · Jodhpur · Udaipur · Jaisalmer",
    category: "domestic",
    region: "North India",
    days: 8, nights: 7,
    price: 34999, oldPrice: 41999,
    rating: 4.8, reviews: 158,
    badge: "Heritage",
    featured: false,
    tags: ["Culture", "Desert", "Palaces"],
    image: IMG("photo-1477587458883-47145ed94245"),
    summary:
      "Forts that scrape the sky, lakes that mirror palaces and a night under desert stars in Jaisalmer — the full royal circuit of the Land of Kings.",
    highlights: [
      "Amber Fort jeep ride & City Palace, Jaipur",
      "Mehrangarh Fort and blue lanes of Jodhpur",
      "Lake Pichola boat ride, Udaipur",
      "Sam dunes camel safari + cultural night, Jaisalmer",
      "Chokhi Dhani traditional dinner"
    ],
    itinerary: [
      { title: "Jaipur Arrival", desc: "Check-in and evening at Chokhi Dhani village resort with Rajasthani thali." },
      { title: "Jaipur — Pink City", desc: "Amber Fort, Jal Mahal, Hawa Mahal, City Palace and Jantar Mantar." },
      { title: "Jaipur → Jodhpur", desc: "Drive to the Blue City; sunset from Mehrangarh ramparts." },
      { title: "Jodhpur → Jaisalmer", desc: "Jaswant Thada, clock tower market, then on to the Golden City." },
      { title: "Jaisalmer — Desert Night", desc: "Jaisalmer Fort, Patwon ki Haveli; evening camel safari at Sam dunes, folk dance & dinner at desert camp." },
      { title: "Jaisalmer → Udaipur", desc: "Long scenic drive via Pali. Evening free at Fateh Sagar." },
      { title: "Udaipur — City of Lakes", desc: "City Palace, Saheliyon ki Bari, Jagdish Temple and Lake Pichola boat ride." },
      { title: "Departure", desc: "Transfer to Udaipur airport." }
    ],
    inclusions: ["7 nights heritage-style hotels", "Daily breakfast", "1 night desert camp with dinner & cultural show", "Private AC SUV with driver", "Camel safari at Sam"],
    exclusions: ["Airfare", "Monument entry tickets", "Meals not mentioned", "Tips & personal expenses"]
  },
  {
    id: "himachal-hills",
    title: "Himachal Hill Odyssey",
    location: "Shimla · Manali · Solang · Kasol",
    category: "domestic",
    region: "North India",
    days: 6, nights: 5,
    price: 18999, oldPrice: 22999,
    rating: 4.7, reviews: 268,
    badge: "Adventure",
    featured: false,
    tags: ["Mountains", "Adventure", "Snow"],
    image: IMG("photo-1506905925346-21bda4d32df4"),
    summary:
      "Colonial Shimla, the apple orchards of Kullu and adrenaline days at Solang Valley — the classic Himachal loop with a bonus night in boho Kasol.",
    highlights: [
      "Mall Road & Kufri in Shimla",
      "Atal Tunnel + Solang Valley adventure day",
      "Hadimba Temple & Old Manali cafés",
      "Riverside night in Kasol, Parvati Valley",
      "Kullu shawl factory & river rafting option"
    ],
    itinerary: [
      { title: "Arrival in Shimla", desc: "Check-in, evening stroll on the Ridge and Mall Road." },
      { title: "Shimla — Kufri", desc: "Kufri excursion, Jakhoo Temple, Christ Church and Scandal Point." },
      { title: "Shimla → Manali", desc: "Drive along the Beas; stop at Kullu for rafting and shawl factories." },
      { title: "Manali — Solang & Atal Tunnel", desc: "Snow point/Solang activities, Atal Tunnel to Sissu, evening at Old Manali." },
      { title: "Manali → Kasol", desc: "Parvati Valley drive, Manikaran Sahib gurudwara, riverside café evening." },
      { title: "Departure", desc: "Drive down to Bhuntar/Chandigarh for onward journey." }
    ],
    inclusions: ["5 nights hotels & camps", "Daily breakfast & dinner", "Private cab for full circuit", "Toll, parking, driver charges", "All taxes"],
    exclusions: ["Adventure activity fees", "Lunches", "Rohtang permits (seasonal)", "Personal expenses"]
  },
  {
    id: "andaman-islands",
    title: "Andaman Island Hopping",
    location: "Port Blair · Havelock · Neil Island",
    category: "domestic",
    region: "Islands",
    days: 6, nights: 5,
    price: 32999, oldPrice: 38999,
    rating: 4.9, reviews: 129,
    badge: "Scuba Special",
    featured: true,
    tags: ["Beach", "Scuba", "Honeymoon"],
    image: IMG("photo-1507525428034-b723cf961d3e"),
    summary:
      "Turquoise water you have to see to believe. Ferry-hop between Havelock and Neil, dive at Elephant Beach and watch history glow at Cellular Jail.",
    highlights: [
      "Radhanagar Beach — Asia's best beach",
      "Scuba dive / sea walk at Elephant Beach",
      "Cellular Jail light & sound show",
      "Glass-bottom boat at North Bay",
      "Private ferry transfers between islands"
    ],
    itinerary: [
      { title: "Port Blair Arrival", desc: "Corbyn's Cove beach and the moving Cellular Jail light & sound show." },
      { title: "Port Blair → Havelock", desc: "Morning cruise to Havelock; afternoon at world-famous Radhanagar Beach." },
      { title: "Havelock — Elephant Beach", desc: "Boat to Elephant Beach; scuba/snorkel over coral gardens." },
      { title: "Havelock → Neil Island", desc: "Bharatpur, Laxmanpur and the Natural Bridge; sunset at Laxmanpur Beach." },
      { title: "Neil → Port Blair", desc: "Return ferry; shopping at Aberdeen Bazaar; Chidiya Tapu sunset." },
      { title: "Departure", desc: "Airport drop with sandy shoes and full hearts." }
    ],
    inclusions: ["5 nights (2 Port Blair + 2 Havelock + 1 Neil)", "Daily breakfast", "All ferry tickets (premium class)", "Entry permits & sightseeing", "Airport & jetty transfers"],
    exclusions: ["Flights to Port Blair", "Scuba/water-sports fees", "Meals not mentioned", "Anything not in inclusions"]
  },
  {
    id: "ladakh-expedition",
    title: "Leh–Ladakh Expedition",
    location: "Leh · Nubra · Pangong · Khardung La",
    category: "domestic",
    region: "North India",
    days: 7, nights: 6,
    price: 29999, oldPrice: 35999,
    rating: 4.8, reviews: 176,
    badge: "Adventure",
    featured: false,
    tags: ["Road Trip", "Mountains", "Camping"],
    image: IMG("photo-1483728642387-6c3bdd6c93e5"),
    summary:
      "Cross Khardung La, sleep beside the colour-shifting waters of Pangong and ride a double-humped camel in Nubra — the trip that tops every bucket list.",
    highlights: [
      "Khardung La — one of the world's highest motorable passes",
      "Lakeside camp night at Pangong Tso",
      "Bactrian camel ride at Hunder sand dunes",
      "Thiksey, Hemis & Diskit monasteries",
      "Magnetic Hill & Sangam confluence"
    ],
    itinerary: [
      { title: "Arrival in Leh — Acclimatise", desc: "Complete rest day for altitude acclimatisation; evening walk to Leh Market and Shanti Stupa." },
      { title: "Leh Local", desc: "Hall of Fame, Magnetic Hill, Gurudwara Pathar Sahib and Indus–Zanskar Sangam." },
      { title: "Leh → Nubra via Khardung La", desc: "Cross 18,380 ft; Diskit monastery, camel safari on Hunder dunes; camp stay." },
      { title: "Nubra → Pangong", desc: "Drive via Shyok river route to the legendary blue lake; lakeside camping." },
      { title: "Pangong → Leh", desc: "Sunrise at the lake, return via Chang La; evening at leisure." },
      { title: "Monastery Circuit", desc: "Thiksey morning prayers, Hemis, Shey Palace and Rancho School." },
      { title: "Departure", desc: "Fly out over the Himalayas — window seat mandatory." }
    ],
    inclusions: ["6 nights (hotels + Swiss camps)", "Breakfast & dinner daily", "Tempo traveller / SUV as per group", "Inner-line permits & environment fees", "Oxygen cylinder in vehicle"],
    exclusions: ["Airfare", "Lunches", "ATV/rafting fees", "Anything not mentioned"]
  },
  {
    id: "golden-triangle",
    title: "Golden Triangle Classic",
    location: "Delhi · Agra · Jaipur",
    category: "domestic",
    region: "North India",
    days: 5, nights: 4,
    price: 16999, oldPrice: 19999,
    rating: 4.6, reviews: 402,
    badge: "Classic",
    featured: false,
    tags: ["Culture", "First Timers", "Family"],
    image: IMG("photo-1564507592333-c60657eea523"),
    summary:
      "India's greatest hits in one loop — the Taj at sunrise, Amber Fort by jeep and Delhi's 1,000 years of history, done comfortably in five days.",
    highlights: [
      "Sunrise visit to the Taj Mahal",
      "Agra Fort & Mehtab Bagh river view",
      "Amber Fort jeep ascent, Jaipur",
      "Old Delhi rickshaw ride & street-food walk",
      "Fatehpur Sikri ghost city en route"
    ],
    itinerary: [
      { title: "Delhi Arrival & Tour", desc: "India Gate, Humayun's Tomb, Qutub Minar and a rickshaw ride through Chandni Chowk." },
      { title: "Delhi → Agra", desc: "Drive via Yamuna Expressway; Agra Fort and sunset at Mehtab Bagh across the Taj." },
      { title: "Taj Mahal → Jaipur", desc: "Sunrise at the Taj, then to Jaipur via the abandoned Mughal capital Fatehpur Sikri." },
      { title: "Jaipur — Pink City", desc: "Amber Fort, City Palace, Hawa Mahal photo stop, local bazaar shopping." },
      { title: "Departure", desc: "Drop at Jaipur airport or drive back to Delhi." }
    ],
    inclusions: ["4 nights hotels with breakfast", "Private AC sedan/SUV", "English-speaking driver", "All interstate taxes & parking", "Sunrise Taj slot planning"],
    exclusions: ["Monument tickets", "Guide fees (bookable)", "Meals other than breakfast", "Tips"]
  },

  /* ---------------- INTERNATIONAL ---------------- */
  {
    id: "bali-bliss",
    title: "Bali Bliss — Ubud & Beaches",
    location: "Ubud · Kintamani · Seminyak · Nusa Penida",
    category: "international",
    region: "Southeast Asia",
    days: 6, nights: 5,
    price: 54999, oldPrice: 64999,
    rating: 4.9, reviews: 231,
    badge: "Bestseller",
    featured: true,
    tags: ["Honeymoon", "Beach", "Visa on Arrival"],
    image: IMG("photo-1537996194471-e657df975ab4"),
    summary:
      "Jungle swings over rice terraces, temple gates that frame volcanoes and a day-trip to Nusa Penida's cliffs — Bali delivers a different postcard every single day.",
    highlights: [
      "Tegalalang rice terraces & jungle swing",
      "Nusa Penida day trip — Kelingking Beach",
      "Ulun Danu & Tanah Lot sunset temple",
      "Mount Batur view lunch at Kintamani",
      "Private pool villa night in Ubud",
      "Floating breakfast experience"
    ],
    itinerary: [
      { title: "Arrival in Bali", desc: "Private transfer to Ubud villa; welcome dinner amid the paddies." },
      { title: "Ubud & Kintamani", desc: "Sacred Monkey Forest, Tegalalang terraces, jungle swing and volcano-view lunch." },
      { title: "Temples & Waterfalls", desc: "Tirta Empul holy springs, Tegenungan waterfall, evening Kecak fire dance at Uluwatu." },
      { title: "Nusa Penida Day Trip", desc: "Fast boat to Kelingking, Angel's Billabong, Broken Beach and Crystal Bay snorkelling." },
      { title: "Seminyak Beach Day", desc: "Move to beachside hotel; surf lesson or spa, sunset at Tanah Lot, beach club evening." },
      { title: "Departure", desc: "Souvenir run at Krisna, airport transfer." }
    ],
    inclusions: ["5 nights (villa + beach hotel)", "Daily breakfast + 2 dinners", "Private car with English-speaking driver", "Nusa Penida trip with lunch", "All entrance tickets & Kecak show"],
    exclusions: ["International flights", "Visa on arrival fee", "Lunches unless stated", "Travel insurance"]
  },
  {
    id: "dubai-dazzle",
    title: "Dubai Dazzle",
    location: "Dubai · Abu Dhabi",
    category: "international",
    region: "Middle East",
    days: 5, nights: 4,
    price: 62999, oldPrice: 72999,
    rating: 4.8, reviews: 197,
    badge: "Family Favourite",
    featured: true,
    tags: ["Luxury", "Family", "Shopping"],
    image: IMG("photo-1512453979798-5ea266f8880c"),
    summary:
      "Burj Khalifa at golden hour, dune-bashing at sunset and a day among Abu Dhabi's marble domes — the Gulf's showstopper city, end to end.",
    highlights: [
      "Burj Khalifa 124th-floor 'At the Top'",
      "Desert safari with BBQ dinner & shows",
      "Dhow cruise dinner at Dubai Marina",
      "Abu Dhabi day tour — Sheikh Zayed Grand Mosque",
      "Dubai Mall, fountain show & Old Souk abra ride"
    ],
    itinerary: [
      { title: "Arrival in Dubai", desc: "Evening dhow cruise at Marina with buffet dinner and skyline views." },
      { title: "City Tour + Burj Khalifa", desc: "Jumeirah Mosque, Palm drive, Dubai Frame; sunset from At the Top and fountain show." },
      { title: "Desert Safari", desc: "Morning at leisure/Gold Souk; afternoon dune bashing, camel rides, tanoura & BBQ under the stars." },
      { title: "Abu Dhabi Day Trip", desc: "Sheikh Zayed Grand Mosque, Ferrari World photo stop, Corniche drive." },
      { title: "Departure", desc: "Last-minute Dubai Mall dash, airport transfer." }
    ],
    inclusions: ["4 nights 4★ hotel with breakfast", "Airport transfers (private)", "Desert safari with dinner", "Burj Khalifa non-peak ticket", "Dhow cruise + Abu Dhabi tour"],
    exclusions: ["Flights & UAE visa (we can arrange)", "Tourism dirham (payable at hotel)", "Lunches", "Optional attractions"]
  },
  {
    id: "thailand-tropics",
    title: "Thailand Tropics",
    location: "Bangkok · Pattaya · Phuket · Phi Phi",
    category: "international",
    region: "Southeast Asia",
    days: 7, nights: 6,
    price: 49999, oldPrice: 58999,
    rating: 4.7, reviews: 289,
    badge: "Value Deal",
    featured: true,
    tags: ["Beach", "Nightlife", "Friends"],
    image: IMG("photo-1552465011-b4e21bf6e79a"),
    summary:
      "Golden temples and floating markets, then south to Phuket for longtail boats, Phi Phi's limestone lagoons and nights that don't want to end.",
    highlights: [
      "Phi Phi Islands speedboat tour with lunch",
      "Coral Island tour, Pattaya",
      "Grand Palace & Wat Arun, Bangkok",
      "Alcazar cabaret show",
      "Chao Phraya dinner cruise",
      "James Bond Island canoeing"
    ],
    itinerary: [
      { title: "Bangkok Arrival", desc: "Chao Phraya river dinner cruise with skyline views." },
      { title: "Bangkok Temples & Markets", desc: "Grand Palace, Wat Pho, Wat Arun; evening at Asiatique." },
      { title: "Bangkok → Pattaya", desc: "Coral Island speedboat trip with water sports; Alcazar show at night." },
      { title: "Fly to Phuket", desc: "Short flight south; sunset at Karon viewpoint and Bangla Road evening." },
      { title: "Phi Phi Islands", desc: "Speedboat to Maya Bay, Pileh Lagoon and Monkey Beach with buffet lunch." },
      { title: "Phang Nga Bay", desc: "James Bond Island tour with sea-canoeing through limestone caves." },
      { title: "Departure", desc: "Fly home tanned and happy." }
    ],
    inclusions: ["6 nights hotels (3 cities)", "Daily breakfast", "All tours on seat-in-coach basis", "Phi Phi & Coral Island trips with lunch", "Airport & inter-city transfers"],
    exclusions: ["International & domestic flights", "Thailand entry requirements", "Meals not mentioned", "National park fees (payable onsite)"]
  },
  {
    id: "singapore-family",
    title: "Singapore Super Family Week",
    location: "Singapore · Sentosa",
    category: "international",
    region: "Southeast Asia",
    days: 5, nights: 4,
    price: 74999, oldPrice: 84999,
    rating: 4.8, reviews: 143,
    badge: "Kids Love It",
    featured: false,
    tags: ["Family", "Theme Parks", "City"],
    image: IMG("photo-1525625293386-3f8f99389edd"),
    summary:
      "Universal Studios, Gardens by the Bay glowing at dusk and a night safari where the animals come to you — the world's easiest city delights every age.",
    highlights: [
      "Universal Studios Singapore full-day pass",
      "Gardens by the Bay + Cloud Forest domes",
      "Night Safari with tram ride",
      "Sentosa: Cable car, S.E.A. Aquarium, Wings of Time",
      "Marina Bay Sands light show"
    ],
    itinerary: [
      { title: "Arrival", desc: "Merlion Park, Marina Bay promenade and Spectra light show." },
      { title: "City + Gardens", desc: "City tour, Gardens by the Bay domes, Supertree Grove at sunset." },
      { title: "Universal Studios", desc: "Full day of rides and shows at USS, Sentosa." },
      { title: "Sentosa + Night Safari", desc: "Cable car, aquarium and beach time; evening Night Safari tram." },
      { title: "Departure", desc: "Orchard Road shopping, Jewel's Rain Vortex at Changi before the flight." }
    ],
    inclusions: ["4 nights city hotel with breakfast", "USS + Night Safari + Gardens tickets", "SIC transfers & city tour", "Sentosa cable car pass", "All taxes"],
    exclusions: ["Flights & Singapore visa", "Meals beyond breakfast", "Optional Sentosa add-ons", "Personal expenses"]
  },
  {
    id: "maldives-luxury",
    title: "Maldives Overwater Luxury",
    location: "Malé Atolls — Water Villa Resort",
    category: "international",
    region: "Islands",
    days: 5, nights: 4,
    price: 119999, oldPrice: 139999,
    rating: 5.0, reviews: 98,
    badge: "Luxury",
    featured: true,
    tags: ["Honeymoon", "Luxury", "All-Inclusive"],
    image: IMG("photo-1514282401047-d79a71a590e8"),
    summary:
      "Wake up over glass-clear water, breakfast floating in your private pool, snorkel with mantas before lunch. This is the honeymoon the word was invented for.",
    highlights: [
      "2 nights beach villa + 2 nights overwater villa",
      "All-inclusive meal plan with select beverages",
      "Sunset dolphin cruise",
      "House-reef snorkelling with equipment",
      "Couple spa session & floating breakfast",
      "Speedboat/seaplane transfers"
    ],
    itinerary: [
      { title: "Arrival in Paradise", desc: "Speedboat to the resort; check into your beach villa, sunset by the infinity pool." },
      { title: "Reef & Relax", desc: "Guided house-reef snorkelling, couple spa in the afternoon." },
      { title: "Overwater Upgrade", desc: "Move to your water villa; floating breakfast and dolphin cruise at golden hour." },
      { title: "Island Day", desc: "Water sports, sandbank picnic or simply your deck, the ocean and nothing else." },
      { title: "Departure", desc: "One last swim before the speedboat back to Malé." }
    ],
    inclusions: ["4 nights premium resort (2 beach + 2 overwater)", "All-inclusive dining plan", "Return speedboat transfers", "Snorkelling equipment", "Honeymoon décor & cake"],
    exclusions: ["International flights", "Seaplane upgrade (if chosen)", "Motorised water sports", "Green tax (payable at resort)"]
  },
  {
    id: "europe-highlights",
    title: "European Highlights",
    location: "Paris · Swiss Alps · Venice · Rome",
    category: "international",
    region: "Europe",
    days: 10, nights: 9,
    price: 189999, oldPrice: 214999,
    rating: 4.9, reviews: 87,
    badge: "Grand Tour",
    featured: false,
    tags: ["Culture", "Luxury", "Schengen"],
    image: IMG("photo-1499856871958-5b9627545d1a"),
    summary:
      "Eiffel sparkle, Jungfrau snow, gondolas in Venice and the Colosseum's roar — four countries, one seamless rail-and-coach journey with everything handled.",
    highlights: [
      "Eiffel Tower Level 2 + Seine cruise, Paris",
      "Jungfraujoch — Top of Europe rail excursion",
      "Gondola ride through Venice canals",
      "Guided Colosseum & Vatican tour, Rome",
      "Schengen visa assistance included",
      "Scenic train through the Alps"
    ],
    itinerary: [
      { title: "Arrival in Paris", desc: "Evening Seine river cruise past a sparkling Eiffel Tower." },
      { title: "Paris City", desc: "Louvre exteriors, Champs-Élysées, Eiffel Level 2, Montmartre at dusk." },
      { title: "Disneyland or Versailles", desc: "Full-day choice: Disneyland Paris or the Palace of Versailles." },
      { title: "TGV to Switzerland", desc: "High-speed rail to Interlaken; lakeside evening." },
      { title: "Jungfraujoch", desc: "Cogwheel train to 11,333 ft — Ice Palace and Sphinx observatory." },
      { title: "Lucerne & Mt Titlis", desc: "Rotair cable car, Cliff Walk, Chapel Bridge and lakefront." },
      { title: "To Venice", desc: "Scenic ride into Italy; evening at St Mark's Square." },
      { title: "Venice → Rome", desc: "Morning gondola ride, afternoon train to the Eternal City." },
      { title: "Rome", desc: "Guided Colosseum, Trevi Fountain, Pantheon and Vatican Museums." },
      { title: "Departure", desc: "Arrivederci — fly home from Rome." }
    ],
    inclusions: ["9 nights 4★ hotels", "Daily breakfast + 6 Indian dinners", "All inter-city trains (2nd class)", "Jungfraujoch & Titlis excursions", "Schengen visa documentation support", "Tour manager throughout"],
    exclusions: ["International airfare", "Schengen visa fee & insurance", "Lunches", "City taxes (payable locally)", "Optional tours"]
  },
  {
    id: "vietnam-discovery",
    title: "Vietnam Discovery",
    location: "Hanoi · Ha Long Bay · Da Nang · Hoi An",
    category: "international",
    region: "Southeast Asia",
    days: 7, nights: 6,
    price: 58999, oldPrice: 66999,
    rating: 4.8, reviews: 116,
    badge: "Trending",
    featured: false,
    tags: ["Cruise", "Culture", "Foodie"],
    image: IMG("photo-1528127269322-539801943592"),
    summary:
      "An overnight cruise among Ha Long's limestone towers, the Golden Bridge held by giant stone hands and lantern-lit evenings in Hoi An — Asia's coolest route right now.",
    highlights: [
      "Overnight luxury cruise in Ha Long Bay",
      "Ba Na Hills & Golden Bridge, Da Nang",
      "Hoi An Ancient Town lantern evening",
      "Hanoi Old Quarter street-food tour",
      "Basket-boat ride in the coconut village",
      "Marble Mountains"
    ],
    itinerary: [
      { title: "Hanoi Arrival", desc: "Old Quarter cyclo ride, egg-coffee tasting, Hoan Kiem Lake at night." },
      { title: "Hanoi → Ha Long Bay", desc: "Board an overnight cruise: kayaking, Sung Sot cave, sunset Tai Chi on deck." },
      { title: "Cruise → Fly to Da Nang", desc: "Bay-view brunch, back to Hanoi and evening flight to Da Nang; My Khe beach walk." },
      { title: "Ba Na Hills", desc: "World-record cable car, Golden Bridge, French Village and Fantasy Park." },
      { title: "Hoi An", desc: "Marble Mountains, basket boats at the coconut village, Ancient Town lanterns by night." },
      { title: "Da Nang Free Day", desc: "Beach morning, Han Market shopping, Dragon Bridge fire show (weekend)." },
      { title: "Departure", desc: "Fly out from Da Nang." }
    ],
    inclusions: ["6 nights (incl. 1 night cruise cabin)", "Daily breakfast + cruise meals", "Ba Na Hills cable car ticket", "All transfers & sightseeing", "English-speaking guides"],
    exclusions: ["International & internal flights", "Vietnam e-visa", "Meals not mentioned", "Personal expenses"]
  },
  {
    id: "sri-lanka-serendipity",
    title: "Sri Lanka Serendipity",
    location: "Kandy · Nuwara Eliya · Ella · Bentota",
    category: "international",
    region: "South Asia",
    days: 6, nights: 5,
    price: 46999, oldPrice: 52999,
    rating: 4.7, reviews: 104,
    badge: "Scenic Rail",
    featured: false,
    tags: ["Nature", "Rail", "Budget"],
    image: IMG("photo-1586348943529-beaae6c28db9"),
    summary:
      "The world's most beautiful train ride through tea country, leopard country in the south and golden beaches at Bentota — an island that packs a continent's variety.",
    highlights: [
      "Kandy–Ella blue train through tea estates",
      "Temple of the Sacred Tooth Relic, Kandy",
      "Nine Arch Bridge & Little Adam's Peak, Ella",
      "Madu River boat safari & turtle hatchery",
      "Bentota beach stay",
      "Pinnawala Elephant Orphanage"
    ],
    itinerary: [
      { title: "Colombo → Kandy", desc: "Pinnawala elephants en route; evening cultural dance show and Temple of the Tooth." },
      { title: "Kandy → Nuwara Eliya", desc: "Tea factory tour, Ramboda Falls, colonial 'Little England' walk." },
      { title: "Scenic Train to Ella", desc: "The famous blue train ride; sunset at Little Adam's Peak." },
      { title: "Ella", desc: "Nine Arch Bridge at train time, Ravana Falls, cafés with canyon views." },
      { title: "Ella → Bentota", desc: "Drive south; Madu River mangrove safari and turtle hatchery." },
      { title: "Departure", desc: "Beach morning at Bentota, transfer to Colombo airport." }
    ],
    inclusions: ["5 nights hotels with breakfast & dinner", "Private car with chauffeur-guide", "Kandy–Ella reserved train tickets", "Madu River boat safari", "All fuel, parking & taxes"],
    exclusions: ["Flights & Sri Lanka ETA", "Entrance tickets", "Lunches", "Tips"]
  }
];

/* Shared gallery pool used on detail pages */
const GALLERY_POOL = [
  IMG("photo-1476514525535-07fb3b4ae5f1", 800),
  IMG("photo-1530521954074-e64f6810b32d", 800),
  IMG("photo-1488646953014-85cb44e25828", 800),
  IMG("photo-1500835556837-99ac94a94552", 800),
  IMG("photo-1469854523086-cc02fe5d8800", 800),
  IMG("photo-1436491865332-7a61a109cc05", 800)
];

const TESTIMONIALS = [
  { name: "Priya & Arjun Mehta", trip: "Maldives Honeymoon", text: "Trip Utsav planned our honeymoon down to the flower petals on the bed. The floating breakfast surprise had us in tears. Worth every rupee." },
  { name: "Rakesh Sharma", trip: "Leh–Ladakh Group Trip", text: "Oxygen cylinders in the cab, hotel upgrades, permits sorted before we even asked. This team sweats the details so you don't have to." },
  { name: "The D'Souza Family", trip: "Singapore with Kids", text: "Travelling with a 4-year-old and grandparents is chaos — except it wasn't. Every transfer was on time and the itinerary pace was perfect." },
  { name: "Sneha Kulkarni", trip: "Europe Grand Tour", text: "Schengen visa done in 12 days, Indian dinners in Switzerland, and a tour manager who became family. 10 days felt like a dream." },
  { name: "Vikram & Friends", trip: "Thailand Boys' Trip", text: "Best value package we found anywhere online. The Phi Phi speedboat day alone was worth it. Already booked Vietnam with them!" },
  { name: "Anita Reddy", trip: "Kashmir Family Tour", text: "From the houseboat to the Gulmarg gondola, everything was pre-booked and seamless. My parents haven't stopped talking about it." }
];

export { IMG, FALLBACK_IMG, PACKAGES, GALLERY_POOL, TESTIMONIALS };

