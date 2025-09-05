export type Target = {
  hasAmount: boolean;
  amount?: number; //count or duration in minutes
};

export type RecordStatus = "done" | "none" | "partial";
export type DailyRecord = {
  date: string;
  status: RecordStatus;
  value?: number | boolean; //if the habit has amount, this will be number, otherwise boolean
};

export type Habit = {
  id: string;
  title: string;
  description?: string;
  target?: Target;
  streak?: number;
  records?: DailyRecord[];
};
