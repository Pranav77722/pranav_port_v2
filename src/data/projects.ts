export interface Project {
  slug: string
  title: string
  category: string
  description: string
  tags: string[]
  images: string[]       // placeholder gradient colors used to generate visual cards
  gradient: string       // CSS gradient for placeholder thumbnails
  url?: string
  github?: string
  liveUrl?: string
  status?: 'live' | 'case-study' | 'sih-finalist' | 'in-progress'
  featured?: boolean
  metrics?: { label: string; value: string }[]
  fullDescription?: string
  features?: string[]
  galleryImages?: string[]
}

export const projects: Project[] = [
  {
    slug: 'saksham',
    title: 'SAKSHAM',
    category: 'GovTech Portal',
    description: 'Unified Beneficiary & Officer Portal. A Single Window Interface for Officer Administration, Scheme Management, and Citizen Services.',
    tags: ['React', 'Vite', 'Firebase', 'Tailwind', 'Recharts'],
    images: ['#0f172a', '#1e293b', '#00ffb3', '#00e6a1', '#00cc8f'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #00ffb3 100%)',
    status: 'sih-finalist',
    featured: true,
    github: 'https://github.com/Pranav77722/SIH_final_project_2025',
    liveUrl: 'https://pranav77722.github.io/SIH_final_project_2025/',
    metrics: [
      { label: 'Role', value: 'Full Stack & API' },
      { label: 'Hackathon', value: 'SIH 2025' },
    ],
    fullDescription: 'SAKSHAM is a comprehensive web-based platform designed to bridge the gap between Government Schemes and Beneficiaries. It provides a robust Officer Dashboard for field operations and a seamless Citizen Interface for accessing entitlements. Built with modern web technologies, SAKSHAM aims to enable transparency, efficiency, and accessibility in social welfare distribution under the Ministry of Social Justice and Empowerment.',
    features: [
      'Interactive Dashboard: Real-time KPI cards, district statistics, and quick action modules.',
      'Document Verification: Streamlined interface to review, approve, or reject citizen applications with AI-assisted insights.',
      'PFMS Integration: Management of Direct Benefit Transfer (DBT) batches and disbursements.',
      'Unified Login & Voice Assistant: Integrated "Blind Mode" with voice commands for accessibility.'
    ],
    galleryImages: [
      'https://raw.githubusercontent.com/Pranav77722/SIH_final_project_2025/main/assets/screenshots/home_page.png',
      'https://raw.githubusercontent.com/Pranav77722/SIH_final_project_2025/main/assets/screenshots/officer_dashboard.png'
    ]
  },
  {
    slug: 'cityfix',
    title: 'CityFix',
    category: 'GovTech Portal',
    description: 'Civic issue reporting system. Mobile app for residents to report problems, and an authority dashboard for municipal teams to monitor operations.',
    tags: ['React Native', 'Expo', 'React', 'Vite', 'Firebase'],
    images: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)',
    status: 'live',
    featured: true,
    github: 'https://github.com/Pranav77722/cityfix-app-and-dashboard',
    liveUrl: 'https://authoritydashboard-virid.vercel.app/',
    metrics: [
      { label: 'Platform', value: 'Mobile & Web' },
      { label: 'Role', value: 'Full Stack' },
    ],
    fullDescription: 'CityFix is a civic issue reporting system made up of two connected apps: A mobile app for residents to report problems, track updates, and get help from the AI bot. An authority dashboard for municipal teams to review issues, assign work, and monitor operations. This ensures the citizen workflow and the admin workflow are perfectly synced.',
    features: [
      'Mobile App: Report civic issues with photos and location, browse recent issues on the map, and track profile stats.',
      'AI Chatbot: Built-in bot in the mobile app for guidance and support.',
      'Authority Dashboard: View all issues in one operational table, sort by priority and severity.',
      'Geo-Intelligence: Review hotspot trends, analytics, and workforce status on the map.'
    ],
    galleryImages: [
      '/projects/cityfix/Screenshot_20260531-004424.png',
      '/projects/cityfix/Screenshot_20260531-004427.png',
      '/projects/cityfix/Screenshot_20260531-004430.png',
      '/projects/cityfix/Screenshot_20260531-004446.png',
      '/projects/cityfix/Screenshot_20260531-004450.png',
      '/projects/cityfix/Screenshot_20260531-004504.png'
    ]
  },
  {
    slug: 'orbisynth',
    title: 'Orbisynth',
    category: 'Mobile App',
    description: 'Hackathon contribution transforming the WorldMonitor platform into a tactical React Native mobile app using its API.',
    tags: ['React Native', 'TypeScript', 'MapLibre', 'Zustand', 'MMKV'],
    images: ['#0f172a', '#1e293b', '#10b981', '#059669', '#047857'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #10b981 100%)',
    status: 'live',
    featured: true,
    github: 'https://github.com/Pranav77722/orbiSynthpk',
    liveUrl: 'https://github.com/koala73/worldmonitor',
    metrics: [
      { label: 'Role', value: 'App Converter / API Integration' },
      { label: 'Type', value: 'Hackathon Contribution' },
    ],
    fullDescription: 'Orbisynth is a React Native Android app built during a hackathon as a mobile conversion of the WorldMonitor project. My contribution focused on converting the web platform into a dedicated app by leveraging its API. It monitors global risk, breaking news, country-level instability, and live intelligence summaries in one tactical interface. (Main project repo: github.com/koala73/worldmonitor).',
    features: [
      'Map View: Regional risk visibility and layer-based intelligence overlays.',
      'Home Dashboard: Breaking news banner, risk counters, and live summaries.',
      'Feed View: Fast scanning of categorized news streams with topic and time filters.',
      'Country View: Ranked risk lists and country-by-country trend comparisons.',
      'Intelligence View: Synthesized world briefings and high-priority risk signals.',
      'Tactical UI: Dark theme with neon accent colors and mobile-first layouts.'
    ],
    galleryImages: [
      '/projects/Orbysith/Screenshot_20260531-010855.png',
      '/projects/Orbysith/Screenshot_20260531-010915.png',
      '/projects/Orbysith/Screenshot_20260531-010919.png',
      '/projects/Orbysith/Screenshot_20260531-010922.png'
    ]
  },
  {
    slug: 'bookmyshow-clone',
    title: 'BookMyShow Clone',
    category: 'Web App',
    description: 'A modern, responsive web application for booking movie tickets and events, demonstrating robust frontend architecture.',
    tags: ['React', 'TypeScript', 'Tailwind', 'shadcn-ui', 'Vite'],
    images: ['#1e1b4b', '#312e81', '#ef4444', '#dc2626', '#b91c1c'],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #dc2626 100%)',
    status: 'live',
    featured: true,
    liveUrl: 'https://bookmyshow-home-hub.vercel.app/',
    metrics: [
      { label: 'Platform', value: 'Web' },
      { label: 'Role', value: 'Frontend Developer' },
    ],
    fullDescription: 'A modern, responsive web application for booking movie tickets, events, and more, built as a clone of the popular BookMyShow platform. This project demonstrates a robust frontend architecture using React, TypeScript, and modern styling libraries like Tailwind CSS and shadcn-ui. It includes complex interactive features like visual seat selection and a seamless booking flow.',
    features: [
      'Movie Listings: Browse current and upcoming movies with detailed information.',
      'Seat Selection: Interactive visual seat layout for choosing preferred seats.',
      'Booking Flow: Seamless multi-step process from movie selection to ticket booking.',
      'Responsive Design: Fully optimized for desktops, tablets, and mobile devices.',
      'Modern UI: Clean, engaging, and accessible interface inspired by the original platform.'
    ],
    galleryImages: [
      '/projects/Book my show/Screenshot 2026-06-05 201906.png',
      '/projects/Book my show/Screenshot 2026-06-05 201927.png',
      '/projects/Book my show/Screenshot 2026-06-05 201935.png',
      '/projects/Book my show/Screenshot 2026-06-05 201957.png',
      '/projects/Book my show/Screenshot 2026-06-05 202006.png',
      '/projects/Book my show/Screenshot 2026-06-05 202013.png'
    ]
  },
  {
    slug: 'calling-agent',
    title: 'AI Calling Agent',
    category: 'AI Voice Assistant',
    description: 'An intelligent voice calling agent utilizing Twilio for telecommunications and VAPI for natural, automated AI voice interactions.',
    tags: ['Twilio', 'VAPI', 'AI Voice', 'Node.js', 'Webhooks'],
    images: ['#2e1065', '#4c1d95', '#6d28d9', '#8b5cf6', '#a78bfa'],
    gradient: 'linear-gradient(135deg, #2e1065 0%, #8b5cf6 100%)',
    status: 'live',
    featured: true,
    github: 'https://github.com/Pranav77722/Calling-Agent',
    metrics: [
      { label: 'Role', value: 'AI Engineer' },
      { label: 'Focus', value: 'Conversational AI' },
    ],
    fullDescription: 'The AI Calling Agent is an advanced automated voice system designed to handle programmatic inbound and outbound telecommunications. By integrating Twilio for robust call routing and VAPI for ultra-realistic AI voice synthesis and conversational logic, the agent can conduct human-like phone conversations, answer queries, and execute commands in real time.',
    features: [
      'Automated Voice Responses: Seamless integration with VAPI to generate dynamic, contextual, and natural-sounding conversational responses.',
      'Programmatic Telephony: Leverages Twilio to programmatically dial, receive, and route phone calls at scale.',
      'Real-Time Processing: Low-latency webhook integration for instant processing of user speech and dynamic prompt generation.',
      'Scalable Architecture: Designed to manage multiple concurrent calls reliably and efficiently.'
    ],
    galleryImages: []
  }
]

export const galleryProjects: Project[] = []

