import { IActivity } from "../model/activity/activity";

export function persistActivity(activity: IActivity) {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/aktiviteler`, {
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
