import { Habit } from "@/store/types";

export const mockHabits: Habit[] = [
  {
    id: "1",
    title: "Morning Run",
    description: "Run at least 3km every morning",
    target: 3,
    streak: 5,
    records: [
      {
        date: "2025-09-03",
        status: "done",
        value: 3,
      },
      {
        date: "2025-09-04",
        status: "done",
        value: 3,
      },
      {
        date: "2025-09-05",
        status: "done",
        value: 3,
      },
      {
        date: "2025-09-06",
        status: "done",
        value: 3,
      },
      {
        date: "2025-09-07",
        status: "done",
        value: 3,
      },
    ],
  },
  {
    id: "2",
    title: "Read a Book (at least 1h)",
    description: "Read 30 minutes, two times per day",
    target: 2,
    streak: 2,
    records: [
      {
        date: "2025-09-05",
        status: "partial",
        value: 1,
      },
      {
        date: "2025-09-06",
        status: "done",
        value: 2,
      },
      {
        date: "2025-09-07",
        status: "done",
        value: 2,
      },
    ],
  },
  {
    id: "3",
    title: "Meditation",
    description: "Meditate for at least 10 minutes",
    streak: 2,
    records: [
      {
        date: "2025-09-07",
        status: "done",
        value: true,
      },
      {
        date: "2025-09-08",
        status: "done",
        value: true,
      },
    ],
  },
];
