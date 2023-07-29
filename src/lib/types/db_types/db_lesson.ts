import { DBActivity } from "./db_activity";

export interface DBLesson {
  title: string;
  explanation: string;
  activities: {
    idOrder: DBActivity[] | any;
    [key: string]: DBActivity;
  };
}
