import type { IndexedEntry } from "./types";

export type PhilosophyPrinciple = IndexedEntry;

export const philosophy: PhilosophyPrinciple[] = [
  {
    index: "01",
    title: "Understand before you build",
    detail: "We don't start writing code until we can explain the problem back correctly.",
  },
  {
    index: "02",
    title: "Simple until proven otherwise",
    detail: "Complexity is a cost we take on deliberately, not a default we reach for.",
  },
  {
    index: "03",
    title: "Production is the only environment that counts",
    detail: "Code that works in a demo and code that works in production are different achievements.",
  },
  {
    index: "04",
    title: "Own the outcome, not just the ticket",
    detail: "We think about what happens after we ship, not only whether it ships.",
  },
  {
    index: "05",
    title: "Write it so someone else can read it",
    detail: "The next person to touch this code didn't write it, and we design for them too.",
  },
  {
    index: "06",
    title: "Say what we don't know",
    detail: "Precision about uncertainty is part of the engineering, not a weakness in it.",
  },
];
