/* ============================================================
   NitYoga — SITE CONFIG
   This is the ONLY file you need to edit.

   ▸ Change colours        → theme
   ▸ Change name / logo    → brand
   ▸ Add a menu item       → nav
   ▸ Add a whole new page  → add an entry to `pages`
                             (and a nav item pointing at it)
   ▸ Add a class video     → append to `classes`
                             (just the YouTube ID — thumbnail
                             is fetched automatically)

   Every page is a list of BLOCKS. Available block types:
     hero        {title, subtitle, ctas[], image?}
     stats       {items:[{value,label}]}
     videoGrid   {title?, subtitle?, source:"classes",
                  filters?:true, limit?, featuredOnly?}
     cardGrid    {title?, subtitle?, cards:[{icon,title,text,href?}]}
     people      {title?, people:[{name,role,bio,image?,initials?}]}
     banner      {title, text?, cta?}
     prose       {title?, html}
   ============================================================ */

window.SITE = {

  brand: {
    name: "NitYoga",
    tagline: "Breathe. Move. Be.",
    logo: "assets/img/logo.svg",
  },

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

  nav: [
    { label: "Home",     page: "home" },
    { label: "Classes",  page: "classes" },
    { label: "Programs", page: "programs" },
    { label: "Teachers", page: "teachers" },
    { label: "About",    page: "about" },
  ],

  /* ---------- CLASS LIBRARY ----------
     youtubeId: the part after v= in the YouTube URL.
     Replace these sample IDs with your own uploads.       */
  filters: {
    style:    ["Hatha", "Vinyasa", "Yin", "Power", "Restorative"],
    level:    ["Beginner", "Intermediate", "Advanced"],
    duration: ["< 15 min", "15–30 min", "30–60 min", "> 60 min"],
  },

  classes: [
    {
      title: "Morning Wake-Up Flow",
      youtubeId: "v7AYKMP6rOE",
      style: "Vinyasa", level: "Beginner", duration: "15–30 min",
      minutes: 20, teacher: "Ananya Rao",
      description: "A gentle sunrise sequence to loosen the spine and set your day in motion.",
      featured: true,
    },
    {
      title: "Deep Hip Release — Yin",
      youtubeId: "4pKly2JojMw",
      style: "Yin", level: "Beginner", duration: "30–60 min",
      minutes: 40, teacher: "Meera Iyer",
      description: "Long, quiet holds that melt tension from hips and lower back.",
      featured: true,
    },
    {
      title: "Power Core Burner",
      youtubeId: "GLy2rYHwUqY",
      style: "Power", level: "Intermediate", duration: "15–30 min",
      minutes: 25, teacher: "Dev Sharma",
      description: "A sweat-forward core sequence for strength and stability.",
      featured: true,
    },
    {
      title: "Hatha Foundations",
      youtubeId: "6p_yaNFSYao",
      style: "Hatha", level: "Beginner", duration: "30–60 min",
      minutes: 35, teacher: "Ananya Rao",
      description: "The essential postures, taught slowly and precisely.",
    },
    {
      title: "Evening Unwind",
      youtubeId: "BiWDsfZ3zbo",
      style: "Restorative", level: "Beginner", duration: "< 15 min",
      minutes: 12, teacher: "Meera Iyer",
      description: "Twelve minutes to switch off the day before sleep.",
    },
    {
      title: "Advanced Arm Balances",
      youtubeId: "Eml2xnoLpYE",
      style: "Power", level: "Advanced", duration: "30–60 min",
      minutes: 45, teacher: "Dev Sharma",
      description: "Crow to firefly — build the shoulders and focus to fly.",
    },
  ],

  /* ---------- PAGES ----------
     Add a key here + a nav item above = new page on the site. */
  pages: {

    home: {
      title: "Yoga for every body",
      blocks: [
        { type: "hero",
          title: "Move with intention.\nRest with purpose.",
          subtitle: "Free full-length yoga and mindful-fitness classes, filmed with care and open to everyone — no sign-up, no paywall.",
          ctas: [
            { label: "Start practising", page: "classes", primary: true },
            { label: "Browse programs", page: "programs" },
          ],
        },
        { type: "stats",
          items: [
            { value: "100%", label: "free, forever" },
            { value: "5",    label: "yoga styles" },
            { value: "3",    label: "experienced teachers" },
            { value: "0",    label: "logins required" },
          ],
        },
        { type: "videoGrid",
          title: "Featured classes",
          subtitle: "Hand-picked sessions to begin with.",
          source: "classes", featuredOnly: true,
        },
        { type: "cardGrid",
          title: "Why practise with us",
          cards: [
            { icon: "🧘", title: "All levels welcome", text: "From your first downward dog to advanced inversions — filters get you to the right class fast." },
            { icon: "⏱️", title: "Fits your day",       text: "Twelve-minute resets to ninety-minute deep practices. Pick by time, style or level." },
            { icon: "📱", title: "Any device",          text: "Practise from your phone on a mat in the park, or cast to the living-room TV." },
          ],
        },
        { type: "banner",
          title: "New classes every week",
          text: "Subscribe on YouTube so fresh sessions land in your feed the moment they publish.",
          cta: { label: "Visit our channel", href: "https://www.youtube.com/" },
        },
      ],
    },

    classes: {
      title: "Classes",
      blocks: [
        { type: "hero", compact: true,
          title: "Find your practice",
          subtitle: "Filter by style, level and duration — press play and roll out the mat.",
        },
        { type: "videoGrid", source: "classes", filters: true },
      ],
    },

    programs: {
      title: "Programs",
      blocks: [
        { type: "hero", compact: true,
          title: "Programs",
          subtitle: "Multi-day journeys that build one class at a time.",
        },
        { type: "cardGrid",
          cards: [
            { icon: "🌅", title: "14-Day Beginner Journey", text: "Two weeks from zero to a confident, complete practice. One short class per day.", href: "#/classes" },
            { icon: "🔥", title: "Core & Strength — 7 Days", text: "A week of power sessions building heat, stability and stamina.", href: "#/classes" },
            { icon: "🌙", title: "Sleep Better in 5 Nights", text: "Evening wind-downs and breathing practices for genuinely deeper rest.", href: "#/classes" },
          ],
        },
        { type: "banner",
          title: "Want a program for a specific goal?",
          text: "Tell us what you're working toward and we'll build the playlist.",
          cta: { label: "Suggest a program", href: "mailto:hello@example.com" },
        },
      ],
    },

    teachers: {
      title: "Teachers",
      blocks: [
        { type: "hero", compact: true,
          title: "Meet the teachers",
          subtitle: "Real teachers with real classrooms — now on your screen.",
        },
        { type: "people",
          people: [
            { name: "Ananya Rao",  initials: "AR", role: "Hatha · Vinyasa",       bio: "500-hour RYT with a decade of teaching. Precise alignment, warm pace, zero intimidation." },
            { name: "Meera Iyer",  initials: "MI", role: "Yin · Restorative",     bio: "Specialises in slow practice and nervous-system recovery for busy, wired lives." },
            { name: "Dev Sharma",  initials: "DS", role: "Power · Arm balances",  bio: "Former athlete turned teacher — strength-driven flows with playful peak poses." },
          ],
        },
      ],
    },

    about: {
      title: "About",
      blocks: [
        { type: "hero", compact: true,
          title: "About NitYoga",
          subtitle: "A small project with a simple idea: good yoga teaching should be free.",
        },
        { type: "prose",
          html: `
            <p>NitYoga is an independent, ad-light home for full-length yoga classes.
            Everything here is hosted on YouTube and stitched together as a fast,
            static site — no accounts, no tracking walls, no locked content.</p>
            <p>Roll out a mat, pick a class, and practise. That's the whole product.</p>
          `,
        },
      ],
    },
  },

  footer: {
    text: "Made with breath and intention.",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/" },
      { label: "Instagram", href: "https://www.instagram.com/" },
      { label: "Contact", href: "mailto:hello@example.com" },
    ],
  },
};
