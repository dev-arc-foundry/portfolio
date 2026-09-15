// TODO: Replace placeholder bios and links with real team data. Do not invent
// personal details (schools, prior employers, locations) beyond what is
// confirmed real.

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image?: string;
  links: {
    linkedin?: string;
    github?: string;
  };
};

export const team: TeamMember[] = [
  {
    id: "apoorv-yadav",
    name: "Apoorv Yadav",
    role: "Senior Software Engineer - Backend",
    bio: "5+ years building backend services and distributed systems in production. Focused on architecture that stays correct under load.",
    skills: [
      "Rust",
      "Golang",
      "Python",
      "Django",
      "Docker",
      "MongoDB",
      "PostgreSQL",
      "SQL",
      "REST",
      "gRPC",
      "GraphQL",
      "K8s",
      "RabbitMQ",
      "Redis",
      "Kafka",
    ],
    image: "/team/apoorv-yadav.jpg",
    links: {},
  },
  {
    id: "shubham-verma",
    name: "Shubham Verma",
    role: "Senior Software Engineer - Frontend",
    bio: "5+ years building scalable web products with React, Next.js, TypeScript, and Rust. I turn complex product requirements into fast, polished, production-ready experiences.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Rust",
      "Node.js",
      "Docker",
      "Mongo DB",
      "Tailwind CSS",
      "Redux",
      "REST",
      "gRPC",
    ],
    image: "/team/shubham-verma.jpg",
    links: {},
  },
  {
    id: "anish-jain",
    name: "Anish Jain",
    role: "Senior Software Engineer - Backend",
    bio: "I build scalable, production-grade systems with Java, Spring Boot, ML, Kubernetes, and agentic AI—transforming complex problems into reliable software and intelligent, automation-driven solutions.",
    skills: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Agentic Development",
      "Machine Learning",
      "Kubernetes",
      "AWS",
      "Java Messaging Queues",
      "CI/CD Pipelines",
    ],
    image: "/team/anish-jain.jpg",
    links: {},
  },
];
