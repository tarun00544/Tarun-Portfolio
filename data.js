/* ============================================================
   PORTFOLIO DATA
   Edit this file to add/update projects and skills.
   Nothing here should be invented — every entry traces back to
   Tarun's original portfolio content.
   ============================================================ */

const SKILL_CATEGORIES = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "languages", label: "Languages" },
  { id: "tools", label: "Tools & Technologies" },
  { id: "arvr", label: "AR/VR & Emerging Tech" },
  { id: "soft", label: "Professional Skills" },
];

const SKILLS = [
  // Frontend
  { name: "HTML5", category: "frontend", icon: "🌐", desc: "Semantic markup and page structure." },
  { name: "CSS3", category: "frontend", icon: "🎨", desc: "Responsive layouts, animations and theming." },
  { name: "JavaScript", category: "frontend", icon: "⚡", desc: "Interactive, dynamic front-end logic." },
  { name: "Bootstrap", category: "frontend", icon: "🅱️", desc: "Responsive component framework." },
  { name: "React", category: "frontend", icon: "⚛️", desc: "Component-based user interfaces." },
  { name: "UI/UX Design", category: "frontend", icon: "🖌️", desc: "Designing clean, usable interfaces." },

  // Backend
  { name: "Node.js", category: "backend", icon: "🟢", desc: "Server-side JavaScript runtime." },
  { name: "Express.js", category: "backend", icon: "🚂", desc: "Minimal backend web framework." },
  { name: "REST APIs", category: "backend", icon: "🔗", desc: "Designing & consuming RESTful services." },
  { name: "JWT / Auth", category: "backend", icon: "🔐", desc: "Authentication & authorization flows." },

  // Database
  { name: "MongoDB", category: "database", icon: "🍃", desc: "NoSQL document database." },
  { name: "SQL", category: "database", icon: "🗄️", desc: "Relational database querying." },

  // Languages
  { name: "Java", category: "languages", icon: "☕", desc: "Object-oriented programming language." },
  { name: "Python", category: "languages", icon: "🐍", desc: "General-purpose scripting & backend." },
  { name: "C / C++", category: "languages", icon: "💻", desc: "Systems-level programming fundamentals." },
  { name: "Data Structures & Algorithms", category: "languages", icon: "🧩", desc: "Problem solving & efficient code." },

  // Tools
  { name: "Git", category: "tools", icon: "🔀", desc: "Version control for tracking changes." },
  { name: "GitHub", category: "tools", icon: "🐙", desc: "Hosting & collaborating on repositories." },
  { name: "VS Code", category: "tools", icon: "🧰", desc: "Primary code editor." },
  { name: "Postman", category: "tools", icon: "📮", desc: "Testing and documenting APIs." },

  // AR/VR
  { name: "360° / Immersive Web", category: "arvr", icon: "🥽", desc: "Building 360° image viewers with JavaScript." },
  { name: "AR/VR Concepts", category: "arvr", icon: "🌀", desc: "Exploring immersive, spatial experiences on the web." },

  // Soft skills
  { name: "Teamwork", category: "soft", icon: "🤝", desc: "Collaborating effectively within a team." },
  { name: "Leadership", category: "soft", icon: "🧭", desc: "Guiding and motivating towards a shared goal." },
];

const PROJECT_CATEGORIES = ["All", "Frontend", "Backend", "MERN", "AR/VR"];

/*
  category: one of "Frontend" | "Backend" | "MERN" | "AR/VR"
  tech: short list of general technology/skill tags for filtering & search
        (kept general — no unverified library names invented)
  links: { demo, secondary } — only real links that existed in the original site
*/
const PROJECTS = [
   {
id: "news-website",
title: "JANAMAT YUG Digital News Platform",
category: "MERN",
tech: ["MERN Stack", "API Integration", "Responsive Design", "News Portal"],
icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ-EyZVSb9zammxtrupFRewQzFlJmuTxwXe0RgRoDhzNdaF_v4HVdygSY&s=10",
description: "A professional full-stack digital news platform developed using the MERN stack. The platform delivers categorized news content through API integration with a responsive and user-friendly interface. The project was developed as a client-based solution for JANAMAT YUG Digital Channel.",
links: [
{
label: "View News Website",
url: "https://janamat-yug.vercel.app/"
},
{
label: "JANAMAT YUG Digital Channel",
url: "https://janamat-yug-sandy.vercel.app/index.html"
}
],
},
 {
id: "food-delivery-app",
title: "Food Delivery App",
category: "MERN",
type: "Available for Sale",
tech: [
"MongoDB",
"Express.js",
"React.js",
"Node.js",
"Authentication",
"Payment Integration",
"Responsive Design"
],
icon: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/182906510/original/a69a2d36061750a4ad76632245e9ec50453191d9/do-modern-food-express-restaurant-kitchen-logo-design.jpg",
description: "A complete full-stack food delivery platform built with the MERN stack, featuring restaurant listings, user authentication, order management, payment integration, and a responsive user-friendly interface. This project is available for sale and can be customized according to the buyer's requirements.",
links: [
{
label: "View Live Demo",
url: "https://food-express-full-stack-food-delive.vercel.app/"
},
{
label: "Interested? Contact Me",
url: "#contact"
}
]
},
  {
   id: "movie-recommendation-website",
   title: "Movie Recommendation Website",
    category: "Backend",
    tech: ["Node.js", "Express.js", "MongoDB"],
    icon: "https://assets.goal.com/images/v3/blted575fe7335a4ea7/cinevault_master_logo.jpg?auto=webp&format=pjpg&width=3840&quality=60",
    description: "A movie recommendation website built with Node.js, Express.js, and MongoDB, providing personalized movie suggestions based on user preferences and ratings.",
    links: [{ label: "View CINEVAULT", url: "https://movie-project-swart-eta.vercel.app/" }],
  }, 
  {
    id: "warehouse-management",
    title: "Warehouse Management",
    category: "Backend",
    tech: ["Cloud Database", "Analytics Dashboard"],
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTSkoJrwQ-r35djtF9AofYM-q-uVCJuApqdQ&s",
    description: "A cloud-based Warehouse Management System for inventory tracking, supplier management, stock monitoring, purchase & sales management, analytics dashboard, and real-time cloud database integration.",
    links: [{ label: "View Project", url: "https://warehousemanagement-with-web.onrender.com/" }],
  },
  {
    id: "food-express",
    title: "Food Express",
    category: "Frontend",
    tech: ["JavaScript", "UI/UX", "Payments UI"],
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwD6wsvFB8VKZTeFoNxcyxPhhrHP-1nt4ZQ&s",
    description: "Food delivery app with restaurant listings and secure payment processing.",
    links: [{ label: "Order Now", url: "https://foodexpress-fooddeliveryapp.vercel.app/" }],
  },
  {
    id: "drum-kit",
    title: "Drum Kit",
    category: "Frontend",
    tech: ["JavaScript", "DOM Events"],
    icon: "https://c8.alamy.com/comp/G2FWK6/drum-kit-icon-G2FWK6.jpg",
    description: "A simple and fun Drum Kit. Press keys A, S, D, F, G, H, J, K on your keyboard (or tap on mobile) to play 8 different drum sounds.",
    links: [{ label: "Play Now", url: "https://drum-kit-three-tau.vercel.app/" }],
  },
  {
    id: "vr-experience",
    title: "360° VR Experience",
    category: "AR/VR",
    tech: ["JavaScript", "360° Media", "Immersive Web"],
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5tKammRppBQaIRxt9v714nGHtVPUH9JQ8pQ&s",
    description: "Immersive 360-degree image viewer with advanced JavaScript.",
    links: [
      { label: "College View", url: "https://tarun00544.github.io/AR-VR-3D/" },
      { label: "Hostel View", url: "https://hostel-vr.vercel.app/" },
    ],
  },
  {
    id: "indian-cultural-heritage",
    title: "Indian Cultural Heritage",
    category: "Frontend",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: "https://i.pinimg.com/736x/5e/74/ec/5e74ec29fcf66a8b539f3e80a80042b1.jpg",
    description: "A clean, simple website highlighting India's monuments, festivals, arts, and traditions in one visual experience.",
    links: [{ label: "View Now", url: "https://indian-cultural-heritage.vercel.app/" }],
  },
  {
    id: "ecosmart-pro",
    title: "EcoSmart Pro",
    category: "Frontend",
    tech: ["JavaScript", "UI/UX"],
    icon: "https://i.pinimg.com/736x/5e/74/ec/5e74ec29fcf66a8b539f3e80a80042b1.jpg",
    description: "A smart, eco-friendly web solution designed to help users cut electricity waste and improve energy efficiency.",
    links: [{ label: "View Now", url: "https://smart-energy-saver-tan.vercel.app/" }],
  },
  {
    id: "solvemate-ai",
    title: "SolveMate AI",
    category: "Frontend",
    tech: ["JavaScript", "UI Animation"],
    icon: "https://img.freepik.com/premium-psd/3d-futuristic-smart-calculator-icon-with-advanced-ai-technology_653681-5232.jpg",
    description: "Advanced calculator with modern UI and smooth animations.",
    links: [{ label: "Try Now", url: "https://ai-calculator-bay.vercel.app/" }],
  },
  
  {
    id: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    category: "Frontend",
    tech: ["JavaScript", "Game Logic"],
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyyhb3FPkhzx22mIfmg5b26XmHZwwzeohrWPljoIT30po4bmf9fzqIe95biiitIDGGeo&usqp=CAU",
    description: "Interactive game with real-time score tracking and animations.",
    links: [{ label: "Play Now", url: "https://rock-paper-scissors-xi-sage.vercel.app/" }],
  },
  {
    id: "registration-portal",
    title: "Registration Portal",
    category: "Backend",
    tech: ["Authentication", "Form Validation"],
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiUwXwRZJZhR3USqUT-tfSz0uMACOMaEoU5A&s",
    description: "Secure authentication system with modern design and data validation.",
    links: [{ label: "Register Now", url: "https://registration-portal-henna.vercel.app/" }],
  },
  {
    id: "ecommerce-website",
    title: "E-commerce Website",
    category: "Frontend",
    tech: ["HTML", "CSS", "JavaScript", "UI/UX"],
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvpkZCkbs1lW8WUKwLAJPm4dEjXRs90eAjQ&s",
    description: "A fully functional e-commerce website with product listing, shopping cart, and secure checkout process.",
    links: [{ label: "View Store", url: "https://lnt-project1.vercel.app/" }],
  },
  {
    id: "developer-portfolio",
    title: "Developer Portfolio",
    category: "Frontend",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: "https://www.creativefabrica.com/wp-content/uploads/2022/07/29/Occupation-business-portfolio-icon-Graphics-35104847-1.jpg",
    description: "A modern developer portfolio showcasing projects, skills, and experience.",
    links: [{ label: "View Portfolio", url: "https://lnt-project2.vercel.app/" }],
  },
  {
    id: "login-page",
    title: "Login Page",
    category: "Frontend",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: "https://cdn-icons-png.flaticon.com/512/3966/3966442.png",
    description: "A sleek login page with modern design, featuring email and password fields, a remember-me option, and links for password recovery and sign-up.",
    demoCredentials: { email: "tarunkumar894186@gmail.com", password: "Tarun@1230" },
    links: [{ label: "Login Now", url: "https://loginpage-web-wine.vercel.app/" }],
  },
  
 
];

const ABOUT_CONTENT = {
  intro: "B.Tech CSE student and passionate Full Stack Developer crafting innovative web solutions with modern technologies. I enjoy turning ideas into working products — from small interactive tools to full MERN-stack applications and immersive AR/VR experiences.",
  education: {
    degree: "B.Tech in Computer Science Engineering",
    school: "Lamrin Tech Skills University, Ropar, Punjab",
    note: "Constantly learning and evolving as a developer.",
  },
  strengths: [
    { icon: "💡", title: "Innovation", text: "Creating innovative web applications that solve real-world problems with elegant and efficient solutions." },
    { icon: "🎯", title: "Dedication", text: "Bringing the same dedication from gym to coding, pushing limits and achieving excellence in every project." },
    { icon: "🧠", title: "Continuous Learner", text: "Actively exploring new tools and technologies across frontend, backend, and emerging AR/VR spaces." },
  ],
  goal: "Looking for opportunities to build impactful, user-focused software as a Full Stack Developer — while continuing to explore MERN-stack and AR/VR development.",
};

const SOCIAL_LINKS = [
  { label: "Email", url: "mailto:tarunsingh925954@gmail.com", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRajSNqOc_VpaTpQIMTp-0nSOnPJ1f7PZZ1sw&s" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/tarun-kumar-ba7941296", icon: "https://images.seeklogo.com/logo-png/24/1/linkedin-icon-logo-png_seeklogo-249364.png" },
  { label: "GitHub", url: "https://github.com/tarun005444", icon: "https://cdn-icons-png.flaticon.com/256/25/25231.png" },
  { label: "Instagram", url: "https://www.instagram.com/__tarun__singh00/", icon: "https://img.freepik.com/premium-psd/instagram-logo-social-media-icon_705838-13489.jpg" },
  { label: "Facebook", url: "https://www.facebook.com/profile.php?id=100055484945053", icon: "https://image.similarpng.com/file/similarpng/very-thumbnail/2020/04/Popular-Logo-facebook-icon-png.png" },
  { label: "YouTube", url: "https://www.youtube.com/@TarunBhakti00", icon: "https://similarpng.com/_next/image?url=https%3A%2F%2Fimage.similarpng.com%2Ffile%2Fsimilarpng%2Fvery-thumbnail%2F2020%2F04%2FYouTube-logo-glossy-social-media-png.png&w=3840&q=75" },
  { label: "Telegram", url: "https://web.telegram.org/k/", icon: "https://static.vecteezy.com/system/resources/thumbnails/016/716/472/small/telegram-icon-free-png.png" },
];

const ROLES = ["Full Stack Developer", "MERN Stack Developer", "Software Developer"];
