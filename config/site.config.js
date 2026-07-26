/* ============================================================
   NitYoga — SITE CONFIG
   This is the ONLY file you need to edit.

   ▸ Change colours        → theme
   ▸ Change name / logo    → brand
   ▸ Top bar / socials     → topbar
   ▸ WhatsApp button       → whatsapp
   ▸ Languages             → languages (any text field below can be
                             a plain string OR {en, hi, sa})
   ▸ Add a menu item       → nav  (items may have `children` → dropdown)
   ▸ Add a whole new page  → add an entry to `pages`
   ▸ Add a class video     → append to `classes`. Paste the FULL
                             YouTube link in `youtube:` (or just the
                             ID — both work). Thumbnail is fetched
                             automatically.
   ▸ Add a gallery photo   → drop the file in assets/img/gallery/
                             and add one line under `gallery`
   ▸ Payment details       → payment (UPI + bank)
   ▸ Contact details       → contact

   Every page is a list of BLOCKS. Available block types:
     hero        {title, subtitle, ctas[], image?}
                 image → shows art beside the text (2-col on
                 desktop, stacked on mobile)
     stats       {items:[{value,label}]}
     marquee     {title?, subtitle?, images?:[{src,caption?}]}
                 — photo strip that glides left → right
                 (defaults to SITE.gallery if images omitted)
     videoGrid   {title?, subtitle?, source:"classes",
                  filters?:true, limit?, featuredOnly?}
     cardGrid    {title?, subtitle?, cards:[{icon,title,text,href?}]}
     people      {title?, people:[{name,role,bio,image?,initials?}]}
     banner      {title, text?, cta?}
     prose       {title?, html}
     gallery     {title?, images? (defaults to SITE.gallery)}
     payment     {}   — renders SITE.payment
     contact     {}   — renders SITE.contact + enquiry form
   ============================================================ */

window.SITE = {

  brand: {
    name: "NitYoga",
    tagline: { en: "Breathe. Move. Be.", hi: "साँस लें। चलें। रहें।", sa: "श्वस। चल। भव।" },
    logo: "assets/img/logo.svg",
  },

  /* Text in three languages. First entry is the default.
     Any text below can be a plain string (shown for every language)
     or an object like {en:"…", hi:"…", sa:"…"}.                     */
  languages: [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिंदी" },
    { code: "sa", label: "संस्कृतम्" },
  ],

  theme: {
    /* calm teal + deep pine + warm sand, like classic yoga sites,
       tuned to a modern fitness feel */
    "--c-primary":       "#1d7a74",   /* teal */
    "--c-primary-dark":  "#115e59",
    "--c-primary-soft":  "#e4f2f0",
    "--c-accent":        "#e8843c",   /* warm sunrise accent */
    "--c-ink":           "#15302d",   /* deep pine text */
    "--c-ink-soft":      "#4e6763",
    "--c-bg":            "#fbfaf7",   /* warm sand background */
    "--c-surface":       "#ffffff",
    "--c-line":          "#e3e0d8",
    "--radius":          "18px",
  },

  /* ---------- TOP BAR (phone, email, socials) ---------- */
  topbar: {
    phone: "+91 756 6687 916",
    email: "hello@nityoga.com",
    social: [
      { icon: "facebook",  href: "https://www.facebook.com/" },
      { icon: "instagram", href: "https://www.instagram.com/yogacharay_nitesh_shukla/" },
      { icon: "youtube",   href: "https://www.youtube.com/@nityoga_7" },
    ],
  },

  /* ---------- WHATSAPP ----------
     number: digits only, with country code. The floating button and
     every WhatsApp link on the site use this.                        */
  whatsapp: {
    number: "917566687916",
    message: "Namaste! I'd like to know more about NitYoga classes.",
  },

  /* ---------- SUPABASE (login / signup) ----------
     Credentials live in config/supabase.local.js (gitignored) —
     copy config/supabase.local.example.js to that name and fill it
     in. In production the deploy workflow generates the same file
     from the SUPABASE_URL / SUPABASE_ANON_KEY repo secrets.
     One-time project setup: run supabase/setup.sql in the SQL
     Editor, and (optional, smoothest flow) turn OFF "Confirm
     email" under Authentication → Sign In / Up.
     You may also put the url/anonKey here instead — the anon key is
     public by design — but supabase.local.js wins if present.    */
  supabase: {
    url: "",
    anonKey: "",
  },

  nav: [
    { label: { en: "Home", hi: "होम", sa: "गृहम्" }, page: "home" },
    { label: { en: "Classes", hi: "कक्षाएँ", sa: "कक्षाः" }, page: "classes" },
    { label: { en: "Book a Class", hi: "कक्षा बुक करें", sa: "कक्षां आरक्षतु" }, page: "book" },
    { label: { en: "Services", hi: "सेवाएँ", sa: "सेवाः" },
      children: [
        { label: { en: "Corporate Yoga", hi: "कॉर्पोरेट योग", sa: "संस्था-योगः" }, page: "corporate" },
        { label: { en: "Home Yoga", hi: "घर पर योग", sa: "गृह-योगः" }, page: "homeyoga" },
        { label: { en: "Programs", hi: "कार्यक्रम", sa: "कार्यक्रमाः" }, page: "programs" },
      ],
    },
    { label: { en: "Teachers", hi: "शिक्षक", sa: "गुरवः" }, page: "teachers" },
    { label: { en: "Gallery", hi: "गैलरी", sa: "चित्रशाला" }, page: "gallery" },
    { label: { en: "Payment", hi: "भुगतान", sa: "शुल्कम्" }, page: "payment" },
    { label: { en: "Contact", hi: "संपर्क", sa: "सम्पर्कः" }, page: "contact" },
  ],

  /* ---------- CLASS LIBRARY ----------
     youtube: paste the full video link straight from YouTube
     (watch, youtu.be and shorts links all work — a bare ID works too).
     Replace these sample links with your own uploads.       */
  filters: {
    style:    ["Hatha", "Vinyasa", "Yin", "Power", "Restorative"],
    level:    ["Beginner", "Intermediate", "Advanced"],
    duration: ["< 15 min", "15–30 min", "30–60 min", "> 60 min"],
  },

  classes: [
    {
      title: "Yoga Motivation",
      youtube: "https://www.youtube.com/shorts/bBGsKWFByi0",
      style: "Hatha", level: "Beginner", duration: "< 15 min",
      minutes: 1, teacher: "Yogacharya Nitesh Shukla",
      description: "A quick burst of yoga inspiration to get you moving.",
      featured: true,
    },
    {
      title: "Tadasana — Mountain Pose",
      youtube: "https://www.youtube.com/shorts/NkMivtwrv7c",
      style: "Hatha", level: "Beginner", duration: "< 15 min",
      minutes: 1, teacher: "Yogacharya Nitesh Shukla",
      description: "ताड़ासन — the foundation of all standing postures, demonstrated in under a minute.",
      featured: true,
    },
    {
      title: "Good Morning Yoga",
      youtube: "https://www.youtube.com/shorts/GFbi6hTZFkc",
      style: "Hatha", level: "Beginner", duration: "< 15 min",
      minutes: 1, teacher: "Yogacharya Nitesh Shukla",
      description: "Start your day with this energising morning yoga flow.",
      featured: true,
    },
  ],

  /* ---------- BOOKING (the Book a Class page) ----------
     Options shown in the booking form. Stored values are the
     English text; add/remove entries freely. Requires login —
     bookings are saved to the Supabase `bookings` table
     (created by supabase/setup.sql).                        */
  booking: {
    classTypes: [
      { en: "Individual (1-on-1)", hi: "व्यक्तिगत (1-on-1)", sa: "वैयक्तिकम् (1-on-1)" },
      { en: "Group class", hi: "समूह कक्षा", sa: "समूहकक्षा" },
      { en: "Corporate", hi: "कॉर्पोरेट", sa: "संस्थागतम्" },
    ],
    programs: [
      { en: "General fitness yoga", hi: "सामान्य फिटनेस योग", sa: "सामान्य-स्वास्थ्य-योगः" },
      { en: "Hatha foundations", hi: "हठ योग की नींव", sa: "हठयोग-आधाराः" },
      { en: "Asana intensive", hi: "आसन गहन अभ्यास", sa: "आसन-गहनाभ्यासः" },
      { en: "Pranayama & meditation", hi: "प्राणायाम और ध्यान", sa: "प्राणायामः ध्यानं च" },
      { en: "Back-pain relief", hi: "कमर दर्द से राहत", sa: "पृष्ठवेदना-शमनम्" },
      { en: "Flexibility & mobility", hi: "लचीलापन और गतिशीलता", sa: "नम्यता चलता च" },
      { en: "Weight management", hi: "वज़न प्रबंधन", sa: "भार-प्रबन्धनम्" },
    ],
    times: ["6–7 AM", "7–8 AM", "8–9 AM", "4–5 PM", "5–6 PM", "6–7 PM", "7–8 PM"],
    plans: [
      { en: "Single class", hi: "एक कक्षा", sa: "एका कक्षा" },
      { en: "30-day subscription", hi: "30 दिन की सदस्यता", sa: "त्रिंशद्दिन-सदस्यता" },
    ],
    subscriptionDays: 30,   // length of a subscription, used for the validity hint
  },

  /* ---------- GALLERY ----------
     Drop photos in assets/img/gallery/ and add a line here.
     (The current images are placeholders — replace freely.)  */
  gallery: [
    { src: "assets/img/gallery/g01.jpeg", caption: { en: "Setu Bandhasana — leading a school session", hi: "सेतुबंधासन — विद्यालय सत्र का नेतृत्व", sa: "सेतुबन्धासनम् — विद्यालयसत्रम्" } },
    { src: "assets/img/gallery/g02.jpeg", caption: { en: "Seated spinal twist, morning practice", hi: "बैठकर मेरुदंड मोड़ — प्रातः अभ्यास", sa: "वक्रासनम् — प्रातःसाधना" } },
    { src: "assets/img/gallery/g03.jpeg", caption: { en: "Trikonasana with students", hi: "विद्यार्थियों के साथ त्रिकोणासन", sa: "छात्रैः सह त्रिकोणासनम्" } },
    { src: "assets/img/gallery/g04.jpeg", caption: { en: "Morning yoga at the school courtyard", hi: "विद्यालय प्रांगण में प्रातः योग", sa: "विद्यालयप्राङ्गणे प्रातर्योगः" } },
    { src: "assets/img/gallery/g05.jpeg", caption: { en: "Balasana — rest and release", hi: "बालासन — विश्राम", sa: "बालासनम् — विश्रामः" } },
    { src: "assets/img/gallery/g06.jpeg", caption: { en: "Vrikshasana in the park", hi: "पार्क में वृक्षासन", sa: "उद्याने वृक्षासनम्" } },
    { src: "assets/img/gallery/g07.jpeg", caption: { en: "Guided meditation, open-air class", hi: "खुले में ध्यान सत्र", sa: "ध्यानसत्रम्" } },
    { src: "assets/img/gallery/g08.jpeg", caption: { en: "Yoga training camp — Hanslok Ashram, New Delhi", hi: "योग प्रशिक्षण शिविर — हंसलोक आश्रम, नई दिल्ली", sa: "योगप्रशिक्षणशिबिरम् — नवदिल्ली" } },
    { src: "assets/img/gallery/g09.jpeg", caption: { en: "Community classes — parks and schools", hi: "सामुदायिक कक्षाएँ — पार्क और विद्यालय", sa: "समुदायकक्षाः" } },
    { src: "assets/img/gallery/g10.jpeg", caption: { en: "Free yoga camp with SLBSNS University", hi: "निःशुल्क योग शिविर — संस्कृत विश्वविद्यालय", sa: "निःशुल्कयोगशिबिरम्" } },
    { src: "assets/img/gallery/g11.jpeg", caption: { en: "Dhanurasana — International Yoga Day shivir", hi: "धनुरासन — अंतर्राष्ट्रीय योग दिवस शिविर", sa: "धनुरासनम् — योगदिवसशिबिरम्" } },
    { src: "assets/img/gallery/g12.jpeg", caption: { en: "Mayurasana — strength in stillness", hi: "मयूरासन — स्थिरता में शक्ति", sa: "मयूरासनम्" } },
    { src: "assets/img/gallery/g13.jpeg", caption: { en: "Guiding the camp — Hanslok Ashram", hi: "शिविर मार्गदर्शन — हंसलोक आश्रम", sa: "शिबिरमार्गदर्शनम्" } },
    { src: "assets/img/gallery/g14.jpeg", caption: { en: "Vrikshasana at sunrise", hi: "सूर्योदय पर वृक्षासन", sa: "उषःकाले वृक्षासनम्" } },
  ],

  /* ---------- PAYMENT ----------
     Replace the QR image with a screenshot of your real UPI QR,
     and the details below with your own.                      */
  payment: {
    upi: {
      id: "nityoga@upi",              /* your UPI ID */
      payee: "NitYoga",
      qr: "assets/img/upi-qr.svg",    /* replace with your real QR image */
    },
    bank: {
      accountName: "NitYoga",
      accountNumber: "0000 0000 0000",
      ifsc: "HDFC0000000",
      bankName: "HDFC Bank, Rishikesh",
    },
    note: {
      en: "After paying, please WhatsApp us the screenshot with your name so we can confirm your slot.",
      hi: "भुगतान के बाद कृपया स्क्रीनशॉट अपने नाम के साथ WhatsApp करें, ताकि हम आपकी सीट पक्की कर सकें।",
      sa: "शुल्कदानानन्तरं कृपया चित्रं नाम च WhatsApp-द्वारा प्रेषयतु।",
    },
  },

  /* ---------- CONTACT ----------
     formAction: leave "" to open the visitor's email app with the
     filled form; or paste a Formspree/Getform endpoint URL to
     receive submissions directly.                              */
  contact: {
    address: {
      en: "Near Ram Jhula, Rishikesh, Uttarakhand 249304",
      hi: "राम झूला के पास, ऋषिकेश, उत्तराखंड 249304",
      sa: "रामझूला-समीपे, हृषीकेशः, उत्तराखण्डः 249304",
    },
    phone: "+91 756 6687 916",
    email: "hello@nityoga.com",
    hours: {
      en: "Mon–Sat · 6:00–10:00 & 16:00–19:00 IST",
      hi: "सोम–शनि · 6:00–10:00 व 16:00–19:00 IST",
      sa: "सोम–शनि · 6:00–10:00, 16:00–19:00 IST",
    },
    services: [
      { en: "Corporate Yoga", hi: "कॉर्पोरेट योग", sa: "संस्था-योगः" },
      { en: "Home Yoga", hi: "घर पर योग", sa: "गृह-योगः" },
      { en: "Online Classes", hi: "ऑनलाइन कक्षाएँ", sa: "ऑनलाइन-कक्षाः" },
      { en: "Retreats", hi: "रिट्रीट", sa: "विश्रान्तिशिबिरम्" },
    ],
    formAction: "",
  },

  /* ---------- PAGES ----------
     Add a key here + a nav item above = new page on the site. */
  pages: {

    home: {
      title: { en: "Yoga for every body", hi: "सबके लिए योग", sa: "सर्वेभ्यः योगः" },
      blocks: [
        { type: "hero",
          title: { en: "Healthy body.\nCalm mind.",
                   hi: "स्वस्थ शरीर।\nशांत मन।",
                   sa: "स्वस्थं शरीरम्।\nशान्तं मनः।" },
          subtitle: { en: "Full-length yoga and mindful-fitness classes, filmed with care and open to everyone — no sign-up, no paywall.",
                      hi: "पूर्ण-अवधि योग कक्षाएँ — बिना साइन-अप, बिना पेवॉल, सबके लिए।",
                      sa: "पूर्णाः योगकक्षाः — सर्वेभ्यः उन्मुक्ताः।" },
          image: "assets/img/hero.svg",   /* swap for your own photo/illustration any time */
          ctas: [
            { label: { en: "Start practising", hi: "अभ्यास शुरू करें", sa: "अभ्यासम् आरभस्व" }, page: "classes", primary: true },
            { label: { en: "Talk on WhatsApp", hi: "WhatsApp पर बात करें", sa: "WhatsApp-वार्ता" }, whatsapp: true },
          ],
        },
        /* Moving photo strip — pictures glide left → right.
           Add a picture: drop the file in assets/img/ (or gallery/)
           and add one { src: "..." } line below.               */
        { type: "marquee",
          title: { en: "Our community in motion", hi: "हमारा समुदाय, तस्वीरों में", sa: "अस्माकं समुदायः चित्रेषु" },
          images: [
            { src: "assets/img/nitesh.jpg",         caption: { en: "Yogacharya Nitesh Shukla", hi: "योगाचार्य नितेश शुक्ल", sa: "योगाचार्यः नितेशशुक्लः" } },
            { src: "assets/img/gallery/g01.jpeg",   caption: { en: "Setu Bandhasana — school session", hi: "सेतुबंधासन — विद्यालय सत्र", sa: "सेतुबन्धासनम्" } },
            { src: "assets/img/gallery/g03.jpeg",   caption: { en: "Trikonasana with students", hi: "विद्यार्थियों के साथ त्रिकोणासन", sa: "त्रिकोणासनम्" } },
            { src: "assets/img/gallery/g06.jpeg",   caption: { en: "Vrikshasana in the park", hi: "पार्क में वृक्षासन", sa: "वृक्षासनम्" } },
            { src: "assets/img/gallery/g07.jpeg",   caption: { en: "Guided meditation", hi: "ध्यान सत्र", sa: "ध्यानसत्रम्" } },
            { src: "assets/img/gallery/g08.jpeg",   caption: { en: "Yoga training camp", hi: "योग प्रशिक्षण शिविर", sa: "योगप्रशिक्षणशिबिरम्" } },
            { src: "assets/img/gallery/g11.jpeg",   caption: { en: "International Yoga Day shivir", hi: "अंतर्राष्ट्रीय योग दिवस शिविर", sa: "योगदिवसशिबिरम्" } },
          ],
        },
        { type: "videoGrid",
          title: { en: "Featured classes", hi: "चुनी हुई कक्षाएँ", sa: "विशिष्टाः कक्षाः" },
          subtitle: { en: "Hand-picked sessions to begin with.", hi: "शुरुआत के लिए चुने हुए सत्र।", sa: "आरम्भाय चितानि सत्राणि।" },
          source: "classes", featuredOnly: true,
        },
        { type: "cardGrid",
          title: { en: "Our services", hi: "हमारी सेवाएँ", sa: "अस्माकं सेवाः" },
          cards: [
            { icon: "🏢",
              title: { en: "Corporate Yoga", hi: "कॉर्पोरेट योग", sa: "संस्था-योगः" },
              text: { en: "Desk-friendly sessions at your office or over video — less stress, more focus.",
                      hi: "आपके दफ़्तर में या वीडियो पर — तनाव कम, एकाग्रता ज़्यादा।",
                      sa: "कार्यालये वा दूरतः — अल्पः क्लेशः, अधिका एकाग्रता।" },
              href: "#/corporate" },
            { icon: "🏠",
              title: { en: "Home Yoga", hi: "घर पर योग", sa: "गृह-योगः" },
              text: { en: "One-to-one and family classes at your home, on your schedule.",
                      hi: "आपके घर पर, आपके समय पर — व्यक्तिगत व पारिवारिक कक्षाएँ।",
                      sa: "भवतः गृहे, भवतः समये — योगशिक्षा।" },
              href: "#/homeyoga" },
            { icon: "🧘",
              title: { en: "Online Library", hi: "ऑनलाइन लाइब्रेरी", sa: "ऑनलाइन-सङ्ग्रहः" },
              text: { en: "Full-length free classes on YouTube — practise anywhere, any time.",
                      hi: "YouTube पर पूर्ण निःशुल्क कक्षाएँ — कहीं भी, कभी भी।",
                      sa: "YouTube-मध्ये निःशुल्काः कक्षाः — यत्र कुत्रापि।" },
              href: "#/classes" },
          ],
        },
        { type: "banner",
          title: { en: "New classes every week", hi: "हर हफ़्ते नई कक्षाएँ", sa: "प्रतिसप्ताहं नूतनाः कक्षाः" },
          text: { en: "Subscribe on YouTube so fresh sessions land in your feed the moment they publish.",
                  hi: "YouTube पर सब्सक्राइब करें — नए सत्र सीधे आपकी फ़ीड में।",
                  sa: "YouTube-मध्ये अनुसरणं कुरुत।" },
          cta: { label: { en: "Visit our channel", hi: "हमारा चैनल देखें", sa: "अस्माकं वाहिनीं पश्यत" }, href: "https://www.youtube.com/@nityoga_7" },
        },
      ],
    },

    classes: {
      title: { en: "Classes", hi: "कक्षाएँ", sa: "कक्षाः" },
      blocks: [
        { type: "hero", compact: true,
          title: { en: "Find your practice", hi: "अपना अभ्यास चुनें", sa: "स्वाभ्यासं चिनु" },
          subtitle: { en: "Filter by style, level and duration — press play and roll out the mat.",
                      hi: "शैली, स्तर और अवधि से छाँटें — प्ले दबाएँ और मैट बिछाएँ।",
                      sa: "शैली-स्तर-अवधिभिः चिनु — ततः अभ्यासम् आरभस्व।" },
        },
        { type: "videoGrid", source: "classes", filters: true },
      ],
    },

    book: {
      title: { en: "Book a Class", hi: "कक्षा बुक करें", sa: "कक्षां आरक्षतु" },
      blocks: [
        { type: "hero", compact: true,
          title: { en: "Book your class", hi: "अपनी कक्षा बुक करें", sa: "स्वकक्षाम् आरक्षतु" },
          subtitle: { en: "Pick a class type, focus and time that suits you — we'll take it from there.",
                      hi: "अपने अनुसार कक्षा प्रकार, फोकस और समय चुनें — आगे का काम हम संभालेंगे।",
                      sa: "कक्षाप्रकारं विषयं समयं च चिनु — शेषं वयं करिष्यामः।" },
        },
        { type: "booking" },
      ],
    },

    corporate: {
      title: { en: "Corporate Yoga", hi: "कॉर्पोरेट योग", sa: "संस्था-योगः" },
      blocks: [
        { type: "hero", compact: true,
          title: { en: "Corporate Yoga", hi: "कॉर्पोरेट योग", sa: "संस्था-योगः" },
          subtitle: { en: "Desk-friendly sessions that lower stress and lift focus — at your office or on a video call.",
                      hi: "तनाव घटाने और एकाग्रता बढ़ाने वाले सत्र — आपके दफ़्तर में या वीडियो कॉल पर।",
                      sa: "कार्यालये वा दूरतः — क्लेशं हरन्ति, एकाग्रतां वर्धयन्ति च सत्राणि।" },
        },
        { type: "cardGrid",
          cards: [
            { icon: "🪑",
              title: { en: "Chair & desk sessions", hi: "कुर्सी-डेस्क सत्र", sa: "आसन्दी-सत्राणि" },
              text: { en: "30–45 min classes that need no mats, no change of clothes — just a little floor space.",
                      hi: "30–45 मिनट — न मैट चाहिए, न कपड़े बदलने की ज़रूरत।",
                      sa: "30–45 निमेषाः — न किमपि साधनम् आवश्यकम्।" } },
            { icon: "🧠",
              title: { en: "Stress & focus programs", hi: "तनाव व एकाग्रता कार्यक्रम", sa: "क्लेश-एकाग्रता-कार्यक्रमाः" },
              text: { en: "Breathwork and mobility blocks designed around meetings-heavy calendars.",
                      hi: "व्यस्त कैलेंडर के हिसाब से प्राणायाम व मोबिलिटी सत्र।",
                      sa: "प्राणायामः, गतिशीलता च — कार्यदिनानुकूलम्।" } },
            { icon: "📅",
              title: { en: "Weekly or one-off", hi: "साप्ताहिक या एक-बार", sa: "साप्ताहिकं वा सकृत्" },
              text: { en: "Recurring team slots, wellness-day workshops, or Yoga Day events.",
                      hi: "नियमित टीम सत्र, वेलनेस-डे कार्यशालाएँ या योग दिवस आयोजन।",
                      sa: "नियमितसत्राणि, कार्यशालाः, योगदिवस-आयोजनानि च।" } },
          ],
        },
        { type: "banner",
          title: { en: "Bring yoga to your team", hi: "अपनी टीम के लिए योग लाएँ", sa: "स्वसमूहाय योगम् आनय" },
          text: { en: "Tell us your team size and city — we'll send a plan and a quote within a day.",
                  hi: "टीम का आकार और शहर बताएँ — एक दिन में योजना और क़ीमत पाएँ।",
                  sa: "समूहपरिमाणं नगरं च वदतु — योजना मूल्यं च प्रेषयिष्यामः।" },
          cta: { label: { en: "Enquire on WhatsApp", hi: "WhatsApp पर पूछें", sa: "WhatsApp-द्वारा पृच्छतु" }, whatsapp: true },
        },
      ],
    },

    homeyoga: {
      title: { en: "Home Yoga", hi: "घर पर योग", sa: "गृह-योगः" },
      blocks: [
        { type: "hero", compact: true,
          title: { en: "Yoga at your home", hi: "आपके घर पर योग", sa: "भवतः गृहे योगः" },
          subtitle: { en: "Personal attention, your own space, a schedule that follows your life.",
                      hi: "निजी ध्यान, अपनी जगह, आपकी दिनचर्या के अनुसार समय।",
                      sa: "व्यक्तिगतं ध्यानं, स्वस्थानं, स्वानुकूलः समयः।" },
        },
        { type: "cardGrid",
          cards: [
            { icon: "👤",
              title: { en: "One-to-one", hi: "व्यक्तिगत", sa: "एकैकशः" },
              text: { en: "A practice built around your body, goals and injuries — progressed week by week.",
                      hi: "आपके शरीर, लक्ष्य और चोटों के अनुसार अभ्यास — हर हफ़्ते आगे बढ़ता हुआ।",
                      sa: "भवतः शरीरानुसारम् अभ्यासः — क्रमेण वर्धमानः।" } },
            { icon: "👨‍👩‍👧",
              title: { en: "Family batches", hi: "पारिवारिक समूह", sa: "कुटुम्ब-कक्षाः" },
              text: { en: "One teacher, one visit, the whole household — kids and elders included.",
                      hi: "एक शिक्षक, एक विज़िट, पूरा परिवार — बच्चे और बुज़ुर्ग भी।",
                      sa: "एकः गुरुः, सम्पूर्णं कुटुम्बम् — बालाः वृद्धाः च।" } },
            { icon: "💻",
              title: { en: "Online 1:1", hi: "ऑनलाइन 1:1", sa: "ऑनलाइन 1:1" },
              text: { en: "Not in our city? The same personal class over a video call.",
                      hi: "हमारे शहर में नहीं हैं? वही निजी कक्षा वीडियो कॉल पर।",
                      sa: "दूरस्थाः अपि — सैव कक्षा दूरवार्तया।" } },
          ],
        },
        { type: "banner",
          title: { en: "Book a trial class", hi: "ट्रायल कक्षा बुक करें", sa: "परीक्षण-कक्षां आरक्षतु" },
          text: { en: "First session is free in Rishikesh and online.", hi: "पहला सत्र निःशुल्क — ऋषिकेश व ऑनलाइन।", sa: "प्रथमं सत्रं निःशुल्कम्।" },
          cta: { label: { en: "Book on WhatsApp", hi: "WhatsApp पर बुक करें", sa: "WhatsApp-द्वारा आरक्षतु" }, whatsapp: true },
        },
      ],
    },

    programs: {
      title: { en: "Programs", hi: "कार्यक्रम", sa: "कार्यक्रमाः" },
      blocks: [
        { type: "hero", compact: true,
          title: { en: "Programs", hi: "कार्यक्रम", sa: "कार्यक्रमाः" },
          subtitle: { en: "Multi-day journeys that build one class at a time.",
                      hi: "कई दिनों की यात्राएँ — एक-एक कक्षा से बनती हुई।",
                      sa: "बहुदिनयात्राः — क्रमेण निर्मीयमाणाः।" },
        },
        { type: "cardGrid",
          cards: [
            { icon: "🌅", title: { en: "14-Day Beginner Journey", hi: "14-दिन आरंभिक यात्रा", sa: "चतुर्दशदिन-यात्रा" },
              text: { en: "Two weeks from zero to a confident, complete practice. One short class per day.",
                      hi: "दो हफ़्तों में शून्य से आत्मविश्वासी अभ्यास तक। रोज़ एक छोटी कक्षा।",
                      sa: "सप्ताहद्वयेन पूर्णाभ्यासः। प्रतिदिनम् एका कक्षा।" }, href: "#/classes" },
            { icon: "🔥", title: { en: "Core & Strength — 7 Days", hi: "कोर व शक्ति — 7 दिन", sa: "बल-सप्ताहः" },
              text: { en: "A week of power sessions building heat, stability and stamina.",
                      hi: "एक हफ़्ता पावर सत्र — गर्मी, स्थिरता और दमख़म।",
                      sa: "सप्ताहः बलसत्राणाम् — स्थैर्यं, क्षमता च।" }, href: "#/classes" },
            { icon: "🌙", title: { en: "Sleep Better in 5 Nights", hi: "5 रातों में बेहतर नींद", sa: "पञ्चरात्रेण सुनिद्रा" },
              text: { en: "Evening wind-downs and breathing practices for genuinely deeper rest.",
                      hi: "सांध्य विश्राम और प्राणायाम — गहरी नींद के लिए।",
                      sa: "सायं विश्रामः प्राणायामश्च — गभीरनिद्रायै।" }, href: "#/classes" },
          ],
        },
      ],
    },

    teachers: {
      title: { en: "Teachers", hi: "शिक्षक", sa: "गुरवः" },
      blocks: [
        { type: "hero", compact: true,
          title: { en: "Meet your teacher", hi: "अपने गुरु से मिलें", sa: "गुरुं मिलतु" },
          subtitle: { en: "Learn from a real teacher — in class, at home, or on your screen.",
                      hi: "असली गुरु से सीखें — कक्षा में, घर पर या स्क्रीन पर।",
                      sa: "वास्तविकात् गुरोः शिक्षस्व — कक्षायां गृहे वा।" },
        },
        { type: "people",
          people: [
            { name: "Yogacharya Nitesh Shukla", initials: "NS",
              image: "assets/img/nitesh.jpg",
              role: { en: "Hatha · Vinyasa · Pranayama", hi: "हठ · विन्यास · प्राणायाम", sa: "हठः · विन्यासः · प्राणायामः" },
              bio: { en: "Guides students of every age — in studios, offices and homes. Follow his practice on Instagram: @yogacharay_nitesh_shukla",
                     hi: "हर उम्र के साधकों को योग सिखाते हैं — स्टूडियो, दफ़्तर और घर पर। Instagram: @yogacharay_nitesh_shukla",
                     sa: "सर्ववयसां साधकानां योगगुरुः। Instagram: @yogacharay_nitesh_shukla" } },
          ],
        },
        /* Community events & groups we're part of — edit/add cards freely. */
        { type: "cardGrid",
          title: { en: "Community & events", hi: "समुदाय व आयोजन", sa: "समुदायः उत्सवाश्च" },
          subtitle: { en: "Groups we practise with and events we host across the year.",
                      hi: "जिन समूहों के साथ हम अभ्यास करते हैं और साल भर के आयोजन।",
                      sa: "अस्माकं समुदायाः वार्षिकाः उत्सवाश्च।" },
          cards: [
            { icon: "🌏",
              title: { en: "International Yoga Day", hi: "अंतर्राष्ट्रीय योग दिवस", sa: "अन्ताराष्ट्रिय-योगदिवसः" },
              text: { en: "Every 21 June we lead open community sessions — everyone is welcome, no experience needed.",
                      hi: "हर 21 जून हम खुले सामुदायिक सत्र कराते हैं — सभी का स्वागत है।",
                      sa: "प्रति २१ जून सर्वेभ्यः उन्मुक्तानि सत्राणि।" } },
            { icon: "🌅",
              title: { en: "Sunrise Sangha, Rishikesh", hi: "सूर्योदय संघ, ऋषिकेश", sa: "उषःकाल-सङ्घः" },
              text: { en: "A free weekend morning circle by the Ganga — asana, pranayama and chai after.",
                      hi: "गंगा किनारे सप्ताहांत की निःशुल्क सुबह की मंडली — आसन, प्राणायाम और फिर चाय।",
                      sa: "गङ्गातीरे निःशुल्कं प्रातःमण्डलम्।" } },
            { icon: "🤝",
              title: { en: "Corporate wellness network", hi: "कॉर्पोरेट वेलनेस नेटवर्क", sa: "संस्था-स्वास्थ्य-जालम्" },
              text: { en: "We partner with offices and housing societies for wellness days and weekly batches.",
                      hi: "वेलनेस-डे व साप्ताहिक कक्षाओं के लिए दफ़्तरों व सोसाइटियों के साथ साझेदारी।",
                      sa: "कार्यालयैः सह साप्ताहिक-कक्षाणां सहयोगः।" } },
            { icon: "📱",
              title: { en: "Instagram practice circle", hi: "Instagram अभ्यास मंडल", sa: "Instagram-अभ्यासमण्डलम्" },
              text: { en: "Daily practice clips and Q&A with @yogacharay_nitesh_shukla — join the conversation.",
                      hi: "@yogacharay_nitesh_shukla के साथ रोज़ के अभ्यास क्लिप और सवाल-जवाब।",
                      sa: "प्रतिदिनम् अभ्यासदृश्यानि प्रश्नोत्तराणि च।" },
              href: "https://www.instagram.com/yogacharay_nitesh_shukla/" },
          ],
        },
        { type: "banner",
          title: { en: "Join our community", hi: "हमारे समुदाय से जुड़ें", sa: "अस्माकं समुदायं मिल" },
          text: { en: "Get event dates and new class alerts on WhatsApp.",
                  hi: "आयोजन की तारीख़ें और नई कक्षाओं की सूचना WhatsApp पर पाएँ।",
                  sa: "उत्सवसूचनाः WhatsApp-द्वारा प्राप्नुहि।" },
          cta: { label: { en: "Join on WhatsApp", hi: "WhatsApp पर जुड़ें", sa: "WhatsApp-द्वारा मिल" }, whatsapp: true },
        },
      ],
    },

    gallery: {
      title: { en: "Gallery", hi: "गैलरी", sa: "चित्रशाला" },
      blocks: [
        { type: "hero", compact: true,
          title: { en: "Moments from the mat", hi: "मैट से जुड़ी झलकियाँ", sa: "योगक्षणाः" },
          subtitle: { en: "Classes, retreats and celebrations — a few frames from the journey.",
                      hi: "कक्षाएँ, रिट्रीट और उत्सव — सफ़र की कुछ तस्वीरें।",
                      sa: "कक्षाः, शिबिराणि, उत्सवाश्च — यात्रायाः चित्राणि।" },
        },
        { type: "gallery" },
      ],
    },

    payment: {
      title: { en: "Payment", hi: "भुगतान", sa: "शुल्कम्" },
      authOnly: true,   /* page + nav item only for logged-in users */
      blocks: [
        { type: "hero", compact: true,
          title: { en: "Payment", hi: "भुगतान", sa: "शुल्कम्" },
          subtitle: { en: "Pay class or program fees by UPI or bank transfer.",
                      hi: "कक्षा या कार्यक्रम शुल्क UPI या बैंक ट्रांसफ़र से चुकाएँ।",
                      sa: "UPI-द्वारा बैङ्क-द्वारा वा शुल्कं ददातु।" },
        },
        { type: "payment" },
      ],
    },

    contact: {
      title: { en: "Contact us", hi: "संपर्क करें", sa: "सम्पर्कः" },
      blocks: [
        { type: "hero", compact: true,
          title: { en: "Contact us", hi: "संपर्क करें", sa: "सम्पर्कं कुरु" },
          subtitle: { en: "Questions, bookings, corporate enquiries — we reply within a day.",
                      hi: "प्रश्न, बुकिंग, कॉर्पोरेट पूछताछ — एक दिन में जवाब।",
                      sa: "प्रश्नाः, आरक्षणम्, संस्था-पृच्छा — शीघ्रम् उत्तरं दास्यामः।" },
        },
        { type: "contact" },
      ],
    },

    about: {
      title: { en: "About", hi: "परिचय", sa: "परिचयः" },
      blocks: [
        { type: "hero", compact: true,
          title: { en: "About NitYoga", hi: "NitYoga का परिचय", sa: "NitYoga-परिचयः" },
          subtitle: { en: "A small project with a simple idea: good yoga teaching should be free.",
                      hi: "एक छोटा प्रयास, एक सरल विचार: अच्छी योग शिक्षा निःशुल्क होनी चाहिए।",
                      sa: "लघुः प्रयासः, सरलः विचारः — उत्तमा योगशिक्षा निःशुल्का भवेत्।" },
        },
        { type: "prose",
          html: {
            en: `<p>NitYoga is an independent, ad-light home for full-length yoga classes.
                 Everything here is hosted on YouTube and stitched together as a fast,
                 static site — no accounts, no tracking walls, no locked content.</p>
                 <p>Roll out a mat, pick a class, and practise. That's the whole product.</p>`,
            hi: `<p>NitYoga पूर्ण-अवधि योग कक्षाओं का एक स्वतंत्र ठिकाना है।
                 सब कुछ YouTube पर है और यह साइट तेज़ और स्थिर है — न अकाउंट, न ट्रैकिंग, न बंद सामग्री।</p>
                 <p>मैट बिछाइए, कक्षा चुनिए, अभ्यास कीजिए। बस यही है।</p>`,
            sa: `<p>NitYoga स्वतन्त्रं योगकक्षाणां गृहम् अस्ति। सर्वं YouTube-मध्ये स्थितम् —
                 न खाता, न अनुसरणम्, न बद्धा सामग्री।</p>
                 <p>आसनं प्रसारय, कक्षां चिनु, अभ्यासं कुरु। एतावदेव।</p>`,
          },
        },
      ],
    },
  },

  /* ---------- UI STRINGS (labels used by the widgets) ---------- */
  strings: {
    clearFilters:  { en: "Clear filters", hi: "फ़िल्टर हटाएँ", sa: "चयनं निवारय" },
    classesWord:   { en: "classes", hi: "कक्षाएँ", sa: "कक्षाः" },
    noMatch:       { en: "No classes match those filters — try clearing one.", hi: "इन फ़िल्टरों से कोई कक्षा नहीं मिली — एक हटाकर देखें।", sa: "न काऽपि कक्षा प्राप्ता — एकं चयनं निवारय।" },
    with:          { en: "with", hi: "साथ:", sa: "सह" },
    payViaUpi:     { en: "Pay via UPI app", hi: "UPI ऐप से भुगतान करें", sa: "UPI-द्वारा ददातु" },
    scanQr:        { en: "Scan with any UPI app", hi: "किसी भी UPI ऐप से स्कैन करें", sa: "UPI-ऐप्-द्वारा स्कैन कुरु" },
    bankTransfer:  { en: "Bank transfer", hi: "बैंक ट्रांसफ़र", sa: "बैङ्क-प्रेषणम्" },
    accountName:   { en: "Account name", hi: "खाता नाम", sa: "खातानाम" },
    accountNumber: { en: "Account number", hi: "खाता संख्या", sa: "खातासङ्ख्या" },
    ifsc:          { en: "IFSC", hi: "IFSC", sa: "IFSC" },
    bank:          { en: "Bank", hi: "बैंक", sa: "बैङ्कः" },
    name:          { en: "Your name", hi: "आपका नाम", sa: "भवतः नाम" },
    emailLabel:    { en: "Email", hi: "ईमेल", sa: "ईमेल" },
    phoneLabel:    { en: "Phone", hi: "फ़ोन", sa: "दूरभाषः" },
    service:       { en: "I'm interested in", hi: "मेरी रुचि", sa: "मम रुचिः" },
    message:       { en: "Message", hi: "संदेश", sa: "सन्देशः" },
    send:          { en: "Send message", hi: "संदेश भेजें", sa: "सन्देशं प्रेषय" },
    orWhatsapp:    { en: "or message us directly:", hi: "या हमें सीधे लिखें:", sa: "अथवा साक्षात् लिखतु:" },
    chatWhatsapp:  { en: "Chat on WhatsApp", hi: "WhatsApp पर बात करें", sa: "WhatsApp-वार्ता" },
    addressLabel:  { en: "Address", hi: "पता", sa: "स्थानम्" },
    hoursLabel:    { en: "Hours", hi: "समय", sa: "समयः" },
    close:         { en: "Close", hi: "बंद करें", sa: "पिधत्स्व" },

    /* auth (login / signup) */
    login:            { en: "Login", hi: "लॉगिन", sa: "प्रवेशः" },
    signup:           { en: "Sign up", hi: "साइन अप", sa: "पञ्जीकरणम्" },
    logout:           { en: "Sign out", hi: "साइन आउट", sa: "निर्गमनम्" },
    passwordLabel:    { en: "Password", hi: "पासवर्ड", sa: "गूढपदम्" },
    passwordHint:     { en: "At least 6 characters.", hi: "कम से कम 6 अक्षर।", sa: "न्यूनतया ६ वर्णाः।" },
    confirmPassword:  { en: "Confirm password", hi: "पासवर्ड दोबारा लिखें", sa: "गूढपदं पुनः लिखतु" },
    authPasswordMismatch: { en: "Passwords don't match.", hi: "दोनों पासवर्ड मेल नहीं खाते।", sa: "गूढपदे न तुल्ये।" },
    createAccount:    { en: "Create account", hi: "खाता बनाएँ", sa: "खातं रचयतु" },
    authWelcomeBack:  { en: "Welcome back", hi: "पुनः स्वागत है", sa: "पुनः स्वागतम्" },
    authJoin:         { en: "Create your account", hi: "अपना खाता बनाएँ", sa: "स्वखातं रचयतु" },
    noAccount:        { en: "New to NitYoga?", hi: "नया खाता चाहिए?", sa: "नूतनं खातं इच्छसि?" },
    haveAccount:      { en: "Already have an account?", hi: "पहले से खाता है?", sa: "खातम् अस्ति वा?" },
    authCheckEmail:   { en: "Almost there — open the confirmation link we emailed you, then log in.", hi: "लगभग हो गया — ईमेल में भेजी गई पुष्टि लिंक खोलें, फिर लॉगिन करें।", sa: "ईमेल-पुष्टिं कृत्वा प्रविशतु।" },
    authBadLogin:     { en: "Incorrect email or password.", hi: "ईमेल या पासवर्ड ग़लत है।", sa: "प्रवेशविवरणम् अशुद्धम्।" },
    authConfirmFirst: { en: "Please confirm your email first — check your inbox.", hi: "पहले अपनी ईमेल की पुष्टि करें — इनबॉक्स देखें।", sa: "प्रथमम् ईमेल-पुष्टिं कुरु।" },
    authExists:       { en: "An account with this email already exists — try logging in.", hi: "इस ईमेल से खाता पहले से है — लॉगिन करें।", sa: "खातम् अस्ति एव — प्रविशतु।" },
    authPhoneInvalid: { en: "Please enter a valid phone number (at least 10 digits).", hi: "मान्य फ़ोन नंबर दर्ज करें (कम से कम 10 अंक)।", sa: "शुद्धं दूरभाषाङ्कं लिखतु।" },
    authError:        { en: "Something went wrong — please try again.", hi: "कुछ गड़बड़ हुई — फिर से प्रयास करें।", sa: "त्रुटिः अभवत् — पुनः प्रयतस्व।" },

    /* booking */
    classType:        { en: "Class type", hi: "कक्षा प्रकार", sa: "कक्षाप्रकारः" },
    program:          { en: "Program / focus", hi: "कार्यक्रम / फोकस", sa: "कार्यक्रमः" },
    preferredTime:    { en: "Preferred start time", hi: "पसंदीदा समय", sa: "अभीष्टसमयः" },
    plan:             { en: "Booking type", hi: "बुकिंग प्रकार", sa: "आरक्षणप्रकारः" },
    startDate:        { en: "Date (start date for subscriptions)", hi: "तिथि (सदस्यता के लिए आरंभ तिथि)", sa: "दिनाङ्कः (सदस्यतायाः आरम्भदिनम्)" },
    validTill:        { en: "Subscription valid till", hi: "सदस्यता मान्य रहेगी:", sa: "सदस्यता यावत् मान्या:" },
    notes:            { en: "Anything we should know? (optional)", hi: "कुछ और बताना चाहें? (वैकल्पिक)", sa: "अन्यत् किमपि? (वैकल्पिकम्)" },
    bookNow:          { en: "Book now", hi: "बुक करें", sa: "आरक्षतु" },
    bookingThanks:    { en: "Booking received!", hi: "बुकिंग मिल गई!", sa: "आरक्षणं प्राप्तम्!" },
    bookingThanksBody:{ en: "Namaste 🙏 Your NitYoga representative will reach out shortly to get you started.", hi: "नमस्ते 🙏 हमारे प्रतिनिधि जल्द ही आपसे संपर्क करेंगे।", sa: "नमस्ते 🙏 अस्माकं प्रतिनिधिः शीघ्रं सम्पर्कं करिष्यति।" },
    bookAnother:      { en: "Book another class", hi: "एक और बुकिंग करें", sa: "पुनः आरक्षतु" },
    myBookings:       { en: "My bookings", hi: "मेरी बुकिंग्स", sa: "मम आरक्षणानि" },
    loginToBook:      { en: "Login to book your class", hi: "बुकिंग के लिए लॉगिन करें", sa: "आरक्षणाय प्रविशतु" },
    loginToBookHint:  { en: "Create a free account or log in — booking takes under a minute.", hi: "मुफ़्त खाता बनाएँ या लॉगिन करें — बुकिंग में एक मिनट से भी कम लगता है।", sa: "खातं रचयित्वा प्रविशतु — क्षणमात्रं भवति।" },
  },

  footer: {
    text: { en: "Made with breath and intention.", hi: "साँस और संकल्प से बना।", sa: "श्वासेन सङ्कल्पेन च निर्मितम्।" },
    links: [
      { label: { en: "About", hi: "परिचय", sa: "परिचयः" }, page: "about" },
      { label: "YouTube", href: "https://www.youtube.com/@nityoga_7" },
      { label: "Instagram", href: "https://www.instagram.com/yogacharay_nitesh_shukla/" },
      { label: { en: "Contact", hi: "संपर्क", sa: "सम्पर्कः" }, page: "contact" },
    ],
  },
};
