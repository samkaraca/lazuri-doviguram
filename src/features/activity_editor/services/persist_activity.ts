import { Activity } from "@/core/models/entities/learning_unit";

export function persistActivity(pathname: string, activity: Activity<any>) {
  return new Promise((resolve, reject) => {
    fetch(`/api${pathname}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "saveActivity",
        activity,
      }),
    }).then((res) => {
      resolve(res);
    });
  });
}
