export interface Project {
  id: string;
  title: string;
  category: string;
  thumb: string;
  description: string;
  tags: string[];
  year: number;
  role: string;
  images: string[];
  link?: string;
  repo?: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string; // FontAwesome class or emoji
  shortDesc: string;
  fullDesc: string;
  features: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  link?: string;
  linkText?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  details: string[];
}

export interface Skill {
  name: string;
  category: 'Tech' | 'Tool' | 'Core';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number; // 1-5
}

export interface SiteContent {
  personal: {
    name: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    socials: {
      github: string;
      linkedin: string;
      instagram: string;
    };
    bioShort: string;
    bioLong: string;
  };
  hero: {
    headline: string;
    subheadline: string;
  };
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
}