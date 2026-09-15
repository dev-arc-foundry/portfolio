import type { IndexedEntry } from "./types";

export type ProcessStep = IndexedEntry;

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery",
    detail: "We start by understanding the problem, the constraints, and what \"done\" actually means.",
  },
  {
    index: "02",
    title: "Architecture",
    detail: "Before writing code, we agree on the shape of the system — data model, boundaries, what needs to scale.",
  },
  {
    index: "03",
    title: "Build",
    detail: "Iterative development with visibility into progress — working software, not status updates.",
  },
  {
    index: "04",
    title: "Ship",
    detail: "Deployed, monitored, and handed off with the operational knowledge to run it.",
  },
  {
    index: "05",
    title: "Support",
    detail: "Available after launch, because a system's real lifecycle starts once it goes live.",
  },
];
