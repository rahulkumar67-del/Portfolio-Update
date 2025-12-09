import { SiteContent } from './types';

// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
// Images: Place in public/images/ folder and reference here like '/images/my-pic.jpg'
// OR use external URLs.

export const content: SiteContent = {
  personal: {
    name: "Rahul Kumar",
    role: "Game Developer & VR Specialist",
    location: "India",
    email: "krindustries966@gmail.com",
    phone: "+91 9610040837",
    socials: {
      github: "https://github.com/rahulkumar67-del",
      linkedin: "https://www.linkedin.com/in/rahul-kumar-a51002299/",
      instagram: "https://www.instagram.com/kr.543131/?hl=en"
    },
    bioShort: "I build playful, high-performance VR & simulation experiences.",
    bioLong: "I'm a dedicated game developer with a focus on immersive Unity 3D experiences, VR/AR, and computer vision. I love blending creativity with technical performance to solve real-world challenges."
  },
  hero: {
    headline: "Building Digital Worlds That Inspire",
    subheadline: "Hi, I'm Rahul. I craft high-performance interactive simulations, games, and VR experiences."
  },
  skills: [
    { name: "Unity 3D", category: "Tech" },
    { name: "C# / .NET", category: "Tech" },
    { name: "VR Development (OpenXR)", category: "Tech" },
    { name: "Blender", category: "Tool" },
    { name: "3D Simulation", category: "Core" },
    { name: "Computer Vision (OpenCV)", category: "Tech" },
    { name: "Photogrammetry", category: "Core" },
    { name: "SolidWorks / CAD", category: "Tool" }
  ],
  experience: [
    {
      id: "exp-1",
      role: "VR Development Intern",
      company: "ACS Lab, IIT Mandi",
      period: "2024 — 2025",
      description: "Researched and implemented VR interaction systems.",
      responsibilities: [
        "Designed player locomotion (teleport/smooth hybrid) to reduce motion sickness.",
        "Built custom input handlers for tracked controllers.",
        "Optimized shaders to maintain stable 72+ FPS on standalone headsets."
      ],
      link: "https://drive.google.com/file/d/1fIigLsMPIXL6EtCqmQKqT_o0OdBzvohA/view?usp=sharing",
      linkText: "View Certificate"
    },
    {
      id: "exp-2",
      role: "AR Glasses Development Intern",
      company: "Glimpse Tech (Remote)",
      period: "June 2025",
      description: "Developed AR solutions for visually impaired assistance.",
      responsibilities: [
        "Implemented UI systems in Unity with backend logic.",
        "Utilized OpenCV for real-time frame processing.",
        "Mentored student projects on code structure."
      ],
      link: "https://drive.google.com/file/d/1EkbydPc-JJbb78G5tUM5j32qb1PR8_0w/view?usp=sharing",
      linkText: "View Certificate"
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Tech (Mechanical Engineering)",
      school: "IIT Mandi",
      period: "2023 — Present",
      details: [
        "Focus on Modelling & Simulation, CFD.",
        "Actively integrating game/VR projects with mechanical design."
      ]
    },
    {
      id: "edu-2",
      degree: "High School",
      school: "Govt School",
      period: "2020 — 2022",
      details: ["Focus on Science and Mathematics"]
    }
  ],
  services: [
    {
      id: "srv-1",
      title: "Game Development",
      icon: "fa-gamepad",
      shortDesc: "Full-cycle game development in Unity.",
      fullDesc: "From prototyping to polish, I build engaging 2D and 3D games using Unity and C#. I focus on smooth mechanics, optimized performance, and clean code architecture.",
      features: ["Gameplay Programming", "Level Design", "Performance Optimization", "Multiplatform Support"]
    },
    {
      id: "srv-2",
      title: "VR/AR Solutions",
      icon: "fa-vr-cardboard",
      shortDesc: "Immersive virtual and augmented reality apps.",
      fullDesc: "I create standalone and PCVR experiences. Specializing in interaction design, locomotion systems, and optimizing 3D assets for mobile processors.",
      features: ["Oculus/Meta Quest Dev", "OpenXR Integration", "Immersive Training Sims", "AR Visualization"]
    },
    {
      id: "srv-3",
      title: "3D Modeling & Sim",
      icon: "fa-cube",
      shortDesc: "Asset creation and physics simulations.",
      fullDesc: "Using Blender and Unity Physics, I create realistic models and simulations for educational, industrial, or gaming purposes.",
      features: ["Low/High Poly Modeling", "UV Mapping", "Physics Simulations", "Environment Design"]
    }
  ],
  projects: [
    {
      id: "fps-game",
      title: "FPS Game Prototype",
      category: "Game Dev",
      thumb: "https://picsum.photos/id/237/600/400",
      description: "Tactical shooter prototype with advanced enemy AI and responsive player controller.",
      tags: ["Unity", "AI", "FPS"],
      year: 2024,
      role: "Solo Developer",
      images: ["https://picsum.photos/id/237/800/600", "https://picsum.photos/id/238/800/600"],
      link: "#",
      repo: "#"
    },
    {
      id: "vr-drone",
      title: "VR Drone Controller",
      category: "VR",
      thumb: "https://picsum.photos/id/250/600/400",
      description: "Immersive VR-based drone control system with real-time navigation and camera feed.",
      tags: ["VR", "Oculus", "Simulation"],
      year: 2025,
      role: "Lead Developer",
      images: ["https://picsum.photos/id/250/800/600"],
      link: "#",
      repo: "https://github.com/rahulkumar67-del/VR_DroneController"
    },
    {
      id: "space-crafts",
      title: "Spacecraft Models",
      category: "3D Art",
      thumb: "https://picsum.photos/id/21/600/400",
      description: "High-quality spacecraft models made in Blender for integration into space-themed games.",
      tags: ["Blender", "3D Modeling"],
      year: 2024,
      role: "3D Artist",
      images: ["https://picsum.photos/id/21/800/600"]
    },
    {
      id: "flood-sim",
      title: "Flood Simulation",
      category: "Simulation",
      thumb: "https://picsum.photos/id/119/600/400",
      description: "Real location-based 3D model flood simulation using geospatial data.",
      tags: ["Unity", "GIS", "Simulation"],
      year: 2024,
      role: "Developer",
      images: ["https://picsum.photos/id/119/800/600"]
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "John Doe",
      role: "Project Manager, Tech Corp",
      text: "Rahul delivered the VR prototype ahead of schedule. His understanding of interaction design is top-notch.",
      rating: 5
    }
  ]
};