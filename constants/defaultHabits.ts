import { Habit } from "@/store/types";

export const defaultHabits: Habit[] = [
  {
    id: "default-h1",
    title: "Wake up early",
    description: "Wake up before 9 AM every day",
  },
  {
    id: "default-h2",
    title: "Drink Water",
    description: "Drink at least 8 glasses of water",
    target: 8, // in glasses
  },
  {
    id: "default-h3",
    title: "Read Book",
    description: "At Least 1 hour, each time 15 minutes",
  },
  {
    id: "default-h4",
    title: "Meditation, 2x",
    description: "10 minuets morning, 10 minutes before bed",
    target: 2,
  },
];
