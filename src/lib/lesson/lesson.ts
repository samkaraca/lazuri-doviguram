import IActivity from "../activity/activity";

export default interface ILesson {
  _id: string;
  title: string;
  explanation: string;
  activities: IActivity[];
}
