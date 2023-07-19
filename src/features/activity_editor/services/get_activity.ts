import { Activity } from "@/core/models/entities/learning_unit";

export default function fetchActivity(): Promise<Activity<any>> {
  return new Promise((resolve, reject) => {
    fetch("/api/admin/aktiviteler")
      .then((res) => {
        res.json().then((activity) => resolve(activity));
      })
      .catch((err) => reject(err));
  });
}
