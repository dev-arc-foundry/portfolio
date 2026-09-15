import type { IndexedEntry } from "./types";

export type ExperienceDomain = IndexedEntry;

export const experienceDomains: ExperienceDomain[] = [
  {
    index: "01",
    title: "High-throughput data pipelines",
    detail: "Moving and transforming data at volumes where naive approaches fall over.",
  },
  {
    index: "02",
    title: "Distributed task processing",
    detail: "Queues and worker fleets that process asynchronously without losing jobs.",
  },
  {
    index: "03",
    title: "LLM-backed product features",
    detail: "Shipping AI features that behave predictably against real user input.",
  },
  {
    index: "04",
    title: "API design for external consumers",
    detail: "Versioning, rate limits, and contracts other teams and clients depend on.",
  },
  {
    index: "05",
    title: "Database scaling & migration",
    detail: "Schema changes and read/write splits on systems that can't go down.",
  },
  {
    index: "06",
    title: "Caching strategy",
    detail: "Reducing load on primary systems without serving stale or incorrect data.",
  },
  {
    index: "07",
    title: "Authentication & authorization",
    detail: "Session and permission systems that need to be correct, not just working.",
  },
  {
    index: "08",
    title: "Observability & incident response",
    detail: "Instrumenting systems well enough to know what broke and why.",
  },
  {
    index: "09",
    title: "CI/CD & deployment pipelines",
    detail: "Getting code to production safely and repeatedly, not just once.",
  },
  {
    index: "10",
    title: "Real-time systems",
    detail: "Websockets and event streams, and the ordering problems that come with them.",
  },
  {
    index: "11",
    title: "Legacy system modernization",
    detail: "Untangling and replacing systems too load-bearing to rewrite outright.",
  },
];
