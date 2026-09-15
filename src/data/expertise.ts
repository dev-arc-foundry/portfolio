export type ExpertiseColumn = {
  label: string;
  items: string[];
};

export const expertise: ExpertiseColumn[] = [
  {
    label: "Languages",
    items: ["TypeScript", "Python", "Go", "SQL", "Rust", "Java"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Node.js", "FastAPI", "Django", "Spring Boot"],
  },
  {
    label: "Infrastructure & Data",
    items: [
      "PostgreSQL",
      "Redis",
      "Kafka",
      "RabbitMQ",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "AWS",
    ],
  },
];
