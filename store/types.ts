export type Target = {
  name: string;
  type: number | boolean | string;
  unit?: string;
  min?: number;
  max?: number;
};

export type RecordStatus = "done" | "none" | "partial";
export type DailyRecord = {
  date: string;
  status: RecordStatus;
  value?: number | boolean | string;
};

export type Habit = {
  id: string;
  title: string;
  description?: string;
  target?: Target;
  streak?: number;
  records?: DailyRecord[];
};
