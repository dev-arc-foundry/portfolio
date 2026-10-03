export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail: ProjectImage;
  images: ProjectImage[];
};

const crmImages: ProjectImage[] = [
  {
    src: "/projects/multi-tenant-crm/crm_1.png",
    alt: "Multi Tenant CRM dashboard with lead overview, team activity, and recent leads",
    width: 1195,
    height: 1044,
  },
  {
    src: "/projects/multi-tenant-crm/crm_2.png",
    alt: "Multi Tenant CRM — screenshot 2",
    width: 1204,
    height: 682,
  },
  {
    src: "/projects/multi-tenant-crm/crm_3.png",
    alt: "Multi Tenant CRM — screenshot 3",
    width: 1193,
    height: 1212,
  },
  {
    src: "/projects/multi-tenant-crm/crm_4.png",
    alt: "Multi Tenant CRM — screenshot 4",
    width: 1207,
    height: 715,
  },
  {
    src: "/projects/multi-tenant-crm/crm_5.png",
    alt: "Multi Tenant CRM — screenshot 5",
    width: 1213,
    height: 919,
  },
  {
    src: "/projects/multi-tenant-crm/crm_6.png",
    alt: "Multi Tenant CRM — screenshot 6",
    width: 1217,
    height: 1114,
  },
  {
    src: "/projects/multi-tenant-crm/crm_7.png",
    alt: "Multi Tenant CRM — screenshot 7",
    width: 1220,
    height: 1021,
  },
  {
    src: "/projects/multi-tenant-crm/crm_8.png",
    alt: "Multi Tenant CRM — screenshot 8",
    width: 1202,
    height: 1055,
  },
];

const sockifyImages: ProjectImage[] = [
  {
    src: "/projects/sockify-wordpress-e-commerce-store/sockify_1.png",
    alt: "Sockify storefront homepage with a yellow hero, Good socks. Great days. headline, and a blue and white sock",
    width: 1794,
    height: 1298,
  },
  {
    src: "/projects/sockify-wordpress-e-commerce-store/sockify_2.png",
    alt: "Sockify WordPress e-commerce store — screenshot 2",
    width: 2325,
    height: 1331,
  },
  {
    src: "/projects/sockify-wordpress-e-commerce-store/sockify_3.png",
    alt: "Sockify WordPress e-commerce store — screenshot 3",
    width: 2316,
    height: 1293,
  },
];

const catalogueImages: ProjectImage[] = [
  {
    src: "/projects/auto-spare-parts-catalogue-quote-request/auto_repair_1.png",
    alt: "Ganpati Auto Spares Hub homepage with product search, category navigation, and a car hero image",
    width: 2450,
    height: 1319,
  },
  {
    src: "/projects/auto-spare-parts-catalogue-quote-request/auto_repair_2.png",
    alt: "Ganpati Auto Spares Hub — screenshot 2",
    width: 2461,
    height: 1336,
  },
  {
    src: "/projects/auto-spare-parts-catalogue-quote-request/auto_repair_3.png",
    alt: "Ganpati Auto Spares Hub — screenshot 3",
    width: 2396,
    height: 1327,
  },
  {
    src: "/projects/auto-spare-parts-catalogue-quote-request/auto_repair_4.png",
    alt: "Ganpati Auto Spares Hub — screenshot 4",
    width: 2444,
    height: 1309,
  },
];

// Edit content here and replace the local assets in public/projects, then rebuild.
// Order here determines the homepage card order and generated sitemap entries.
export const projects: Project[] = [
  {
    slug: "multi-tenant-crm",
    title: "Multi Tenant CRM",
    description: "CRM for managing projects, sales leads, team members, and follow-ups in one place. Developed the backend with Django REST Framework and the frontend with Next.js, using Supabase for authentication. Implemented role-based access control, lead assignment, status tracking, notes, activity history, and overdue follow-up filtering. Designed organization and project-level access controls to isolate customer data and support secure multi-tenant usage.",
    technologies: ["Django Stack", "Tailwind CSS", "React", "Next.js", "Supabase", "Celery", "Python", "Docker"],
    thumbnail: crmImages[0],
    images: crmImages,
  },
  {
    slug: "sockify-wordpress-e-commerce-store",
    title: "Sockify Wordpress E-Commerce Store",
    description: "A a modern, responsive WordPress e-commerce website for Sockify, a lifestyle apparel brand. The website features a custom storefront experience with product collections, category filtering, product pages, shopping cart functionality, size guides, responsive navigation, and a clean mobile friendly design. Focused on creating a fast, visually engaging shopping experience while keeping the website easy to manage and extend through WordPress.",
    technologies: ["WordPress", "WooCommerce", "CSS", "JavaScript", "HTML"],
    thumbnail: sockifyImages[0],
    images: sockifyImages,
  },
  {
    slug: "auto-spare-parts-catalogue-quote-request",
    title: "Auto Spare Parts Catalogue & Quote-Request Website",
    description: "A complete online catalogue for Ganpati Auto Spares Hub, an auto parts distributor in Karol Bagh, New Delhi. The Next.js site presents their inventory across 8 categories and 14+ car brands, with site-wide live search, detailed product pages, and per-product quote-enquiry forms a full lead-generation flow without the overhead of e-commerce. Fully responsive with validated enquiry forms and a 24-hour response promise.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Responsive Design", "TypeScript"],
    thumbnail: catalogueImages[0],
    images: catalogueImages,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
