import { IActivity } from "../model/activity/activity";

export default function getActivity(): Promise<IActivity> {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/aktiviteler`)
      .then((res) => {
        res.json().then((activity) => resolve(activity));
      })
      .catch((err) => reject(err));
  });
}
