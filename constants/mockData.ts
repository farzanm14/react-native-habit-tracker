import { Habit } from "@/store/types";

export const mockHabits: Habit[] = [
  {
    id: "1",
    title: "Morning Run",
    description: "Run at least 3 miles every morning",
    target: {
      hasAmount: false,
    },
    streak: 5,
  },
  {
    id: "2",
    title: "Read a Book",
    description: "Read for at least 30 minutes daily",
    target: {
      hasAmount: true,
      amount: 1, // in hours
    },
    streak: 10,
  },
  {
    id: "3",
    title: "Meditation",
    description: "Meditate for at least 10 minutes",
    target: {
      hasAmount: true,
      amount: 10, // in minutes
    },
    streak: 7,
  },
];
