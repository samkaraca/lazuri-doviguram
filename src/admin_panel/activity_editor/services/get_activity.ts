import { IActivity } from "../model/activity/activity";

export default function getActivity(): Promise<IActivity> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/admin/aktiviteler")
      .then((res) => {
        res.json().then((activity) => resolve(activity));
      })
      .catch((err) => reject(err));
  });
}
