import { IActivity } from "../model/activity/activity";

export function persistActivity(activity: IActivity) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/admin/aktiviteler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    }).then((res) => {
      resolve(res);
    });
  });
}
