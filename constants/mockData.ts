import { Habit } from "@/store/types";

export const mockHabits: Habit[] = [
  {
    id: "1",
    title: "Morning Run",
    description: "Run at least 3 miles every morning",
    target: {
      name: "Distance",
      type: "number",
      unit: "miles",
      min: 3,
    },
    streak: 5,
  },
  {
    id: "2",
    title: "Read a Book",
    description: "Read for at least 30 minutes daily",
    target: {
      name: "Time",
      type: "number",
      unit: "minutes",
      min: 30,
    },
    streak: 10,
  },
  {
    id: "3",
    title: "Meditation",
    description: "Meditate for at least 10 minutes",
    target: {
      name: "Time",
      type: "number",
      unit: "minutes",
      min: 10,
    },
    streak: 7,
  },
];
