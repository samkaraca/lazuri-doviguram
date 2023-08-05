import IActivity from "../activity/activity";

export default interface ILesson {
  id: string;
  title: string;
  explanation: string;
  activities: IActivity[];
}
