import type { LucideIcon } from "lucide-react";
import { Layers, Bot, Network, Database } from "lucide-react";

export type ServiceCategory = {
  index: string;
  title: string;
  thesis: string;
  icon: LucideIcon;
  capabilities: string[];
};

export const services: ServiceCategory[] = [
  {
    index: "01",
    title: "Product Engineering",
    thesis: "Software people actually want to open twice.",
    icon: Layers,
    capabilities: [
      "Web applications",
      "Mobile applications",
      "Design systems & component libraries",
      "API integration & internal tooling",
    ],
  },
  {
    index: "02",
    title: "AI & Agentic Development",
    thesis: "LLMs wired into systems that hold up under real usage, not demos.",
    icon: Bot,
    capabilities: [
      "LLM application architecture",
      "Agentic workflows & tool use",
      "Retrieval-augmented systems",
      "Model evaluation & prompt engineering",
    ],
  },
  {
    index: "03",
    title: "Backend & Distributed Systems",
    thesis: "The parts users never see are where the engineering actually happens.",
    icon: Network,
    capabilities: [
      "API design & service architecture",
      "Queues, workers & async processing",
      "Caching & performance tuning",
      "Observability & reliability",
    ],
  },
  {
    index: "04",
    title: "Architecture & Data",
    thesis: "Decisions made early that a team is still living with in year three.",
    icon: Database,
    capabilities: [
      "Data modeling & pipeline design",
      "System architecture & technical strategy",
      "Database design & migration",
      "Infrastructure & deployment",
    ],
  },
];
