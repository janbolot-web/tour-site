import img1 from './assets/0I1A2081.jpg';
import img2 from './assets/0I1A2101.jpg';
import img3 from './assets/0I1A2145.jpg';
import img4 from './assets/0I1A2153.jpg';
import img5 from './assets/0I1A2168.jpg';
import img6 from './assets/0I1A2245.jpg';
import img7 from './assets/0I1A2271.jpg';
import img8 from './assets/0I1A2335.jpg';
import img9 from './assets/0I1A2355.jpg';
import img10 from './assets/0I1A2366.jpg';
import img11 from './assets/0I1A2400.jpg';
import img12 from './assets/0I1A2617.jpg';
import img13 from './assets/0I1A2630.jpg';
import img14 from './assets/0I1A2652.jpg';
import img15 from './assets/0I1A2674.jpg';
import img16 from './assets/IMG_3530.jpg';
import img17 from './assets/IMG_3542.jpg';
import img18 from './assets/IMG_3567.jpg';
import img19 from './assets/IMG_3571.jpg';
import img20 from './assets/IMG_3574.jpg';
import img21 from './assets/IMG_3578.jpg';
import img22 from './assets/IMG_3593.jpg';
import img23 from './assets/IMG_3781.jpg';
import img24 from './assets/IMG_3813.jpg';
import img25 from './assets/IMG_3903.jpg';
import img26 from './assets/0I1A1778 (1).jpg';
import img27 from './assets/0I1A1804.jpg';
import img28 from './assets/0I1A1823.jpg';
import img29 from './assets/0I1A1918.jpg';
import img30 from './assets/0I1A1925.jpg';
import img31 from './assets/0I1A1929.jpg';
import img32 from './assets/0I1A2044.jpg';
import img33 from './assets/0I1A2049.jpg';

// Aliases for readability
const heroImg = img1;        // mountain panorama
const lakeTourImg = img23;   // Song-Kol lake
const horseTourImg = img12;  // horse riding
const panoramaImg = img2;    // mountain panorama 2

export const toursData = [];

export const sightsData = [
    {
        id: 'song-kol-lake',
        name: "Song-Kol Lake",
        description: "A high-altitude alpine lake surrounded by lush summer pastures and nomadic yurts.",
        image: img23,
    },
    {
        id: 'kel-suu-lake',
        name: "Kel-Suu Lake",
        description: "One of the most beautiful and remote lakes in the world, famous for its turquoise water and sheer cliffs.",
        image: img26,
    },
    {
        id: 'tash-rabat',
        name: "Tash-Rabat",
        description: "A 15th-century stone caravansarai that once served as a sanctuary for Silk Road travelers.",
        image: img6,
    },
    {
        id: 'altyn-arashan',
        name: "Altyn-Arashan Valley",
        description: "Famous for its natural hot springs and stunning views of the Palatka Peak.",
        image: img12,
    },
    {
        id: 'karakol-city',
        name: "Karakol City",
        description: "A historic city known for its unique wooden mosque and Russian Orthodox cathedral.",
        image: img18,
    },
    {
        id: 'ysyk-kol-lake',
        name: "Ysyk-Kol Lake",
        description: "The second largest alpine lake in the world, which never freezes even in winter.",
        image: img1,
    }
];

export const teamData = [
    {
        id: 'chyngyz',
        name: "Chyngyz",
        role: "Owner & Founder",
        image: img16,
        years: 9,
        nationality: "Kyrgyz",
        languages: ["Kyrgyz", "Russian", "English"],
        specialties: ["Horseback Tours", "Song-Kol Lake", "Nomadic Culture", "Leadership"],
        bio: "Chyngyz was born in the Naryn region and grew up among the mountains and yurt camps that now define his tours. After studying tourism management in Bishkek, he returned to his roots and founded TRIPLINE in 2017 with a simple mission: to share the authentic nomadic spirit of Kyrgyzstan with the world.\n\nWith over 9 years of guiding experience, Chyngyz has led hundreds of travelers through Song-Kol Lake, the Tian Shan peaks, and the wide open jailoos of Central Kyrgyzstan. His deep knowledge of Kyrgyz history, horse culture, and traditional hospitality makes every journey feel genuinely personal.\n\nAn active English teacher, he is fluent in Kyrgyz, Russian, and English, and is known for his warmth, patience, and extraordinary horsemanship.",
        whatsapp: "https://wa.me/996705660593",
        featured: true,
    },
    {
        id: 'gulina',
        name: "Gulina",
        role: "Project Manager",
        image: img20,
        years: 5,
        nationality: "Kyrgyz",
        languages: ["Kyrgyz", "Russian", "English"],
        specialties: ["Tour Planning", "Logistics", "Client Relations", "Itinerary Design"],
        bio: "Gulina is the organizational backbone of TRIPLINE. With a background in event management and a passion for tourism, she coordinates every detail — from accommodation bookings to permit administration — so that every tour runs seamlessly.\n\nShe joined the team in 2020 and quickly became indispensable, building relationships with guesthouses, yurt camp families, and transport partners across the country. Travelers often say Gulina's meticulous planning made their trip feel effortless.\n\nFluent in three languages, she is always available to help guests with any questions before or during their journey.",
        whatsapp: "https://wa.me/996705660593",
        featured: false,
    },
    {
        id: 'adina',
        name: "Adina",
        role: "Office Manager",
        image: img22,
        years: 4,
        nationality: "Kyrgyz",
        languages: ["Kyrgyz", "Russian", "English"],
        specialties: ["Customer Support", "Booking Management", "Communications", "Social Media"],
        bio: "Adina is often the first voice travelers hear when they reach out to TRIPLINE. Her warm and responsive communication style has earned glowing reviews and helped convert countless inquiries into life-changing journeys.\n\nWith a degree in international relations and four years on the team, she manages all incoming bookings, coordinates with guides, and ensures that every client feels confident and cared for from day one.\n\nShe also manages the company's social media presence, sharing stories and photos that inspire travelers around the world.",
        whatsapp: "https://wa.me/996705660593",
        featured: false,
    },
    {
        id: 'baiysh',
        name: "Baiysh",
        role: "Senior Mountain Guide",
        image: img9,
        years: 7,
        nationality: "Kyrgyz",
        languages: ["Kyrgyz", "Russian", "English"],
        specialties: ["High-Altitude Trekking", "Kel-Suu Lake", "Altyn-Arashan", "First Aid"],
        bio: "Baiysh grew up in the Issyk-Kul region, spending his summers trekking the high passes of the Terskey Ala-Too range. His intimate knowledge of remote trails, weather patterns, and mountain safety makes him one of the most trusted guides in the company.\n\nOver seven years, he has guided treks to Ala-Kol Lake, Altyn-Arashan Valley, and the remote Kel-Suu gorge near the Chinese border. He is certified in wilderness first aid and has led groups ranging from solo travelers to families with children.\n\nBaiysh is known for his patient, encouraging approach with first-time trekkers and his ability to navigate any terrain with calm confidence.",
        whatsapp: "https://wa.me/996705660593",
        featured: false,
    },
    {
        id: 'aman',
        name: "Aman",
        role: "Horse Riding Guide",
        image: img13,
        years: 6,
        nationality: "Kyrgyz",
        languages: ["Kyrgyz", "Russian", "English"],
        specialties: ["Horseback Riding", "Song-Kol", "Kochkor Valley", "Eagle Hunting"],
        bio: "Aman was practically born in the saddle. Raised in Kochkor Village, he learned to ride before he could read and spent his childhood herding horses across the jailoos of central Kyrgyzstan.\n\nHe joined TRIPLINE six years ago and now leads the company's most popular horseback expeditions to Song-Kol Lake. His ability to read horses and match riders to the right animal ensures everyone — beginners and experienced riders alike — feels safe and confident in the mountains.\n\nAman also has deep knowledge of eagle hunting traditions and can organize demonstration sessions with local hunters along the route.",
        whatsapp: "https://wa.me/996705660593",
        featured: false,
    },
    {
        id: 'adil',
        name: "Adil",
        role: "Vehicle & Trekking Guide",
        image: img11,
        years: 5,
        nationality: "Kyrgyz",
        languages: ["Kyrgyz", "Russian", "English"],
        specialties: ["4×4 Road Trips", "Tash-Rabat", "South Kyrgyzstan", "Off-Road Driving"],
        bio: "Adil is the team's road trip specialist, combining expert off-road driving with deep local knowledge of southern Kyrgyzstan. He guides tours to Tash-Rabat, Kel-Suu Lake, and the Naryn region — some of the most remote and dramatic landscapes in all of Central Asia.\n\nWith five years on the team and a background in mechanical engineering, Adil keeps vehicles running on the roughest mountain roads and ensures every journey is both adventurous and safe. He also offers optional trekking extensions alongside his driving routes.\n\nTravelers love his easy humor, his stories about local history, and his ability to find the most spectacular picnic spots on any route.",
        whatsapp: "https://wa.me/996705660593",
        featured: false,
    }
];
