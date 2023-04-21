export type ThemeLevel = "beginning" | "intermediate" | "advanced";

export interface Theme {
  id?: string;
  created_at?: string;
  title: string;
  code: string;
  image: string;
  level: ThemeLevel;
  lessons?: { title: string }[];
}
