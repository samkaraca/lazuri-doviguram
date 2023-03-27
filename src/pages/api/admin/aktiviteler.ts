import {
  IActivity,
  initialActivityType,
} from "@/admin_panel/activity_editor/model/activity/activity";
import { auth } from "@/core/functions/api_functions";
import { apps, initializeApp } from "firebase-admin";
import { ServiceAccount, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { NextApiRequest, NextApiResponse } from "next";

const serviceAccount = require("../../../../lazuri-doviguram-firebase-adminsdk-ozmz7-da6de260f2.json");

if (!apps.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const referer = req.headers.referer;
      if (referer) {
        const UrlPaths = new URL(referer).pathname.split("/");
        const activityId = UrlPaths[UrlPaths.length - 1];
        const doc = await db.collection("activities").doc(activityId).get();
        const data = doc.data();

        if (data) {
          return res.status(200).json(data);
        }

        return res.status(200).json({
          type: initialActivityType,
          code: activityId,
          exercise: [],
          explanation: "",
          textAppendix: null,
        } as IActivity);
      }

      return res
        .status(501)
        .json({ error: "This API can only be used from certain origins" });

    case "POST":
      const activity = req.body as IActivity;
      await db.collection("activities").doc(activity.code).set(activity);
      return res.status(200).json(activity);

    default:
      return res.status(501).json({ error: "Unsopported request method" });
  }
}

export default auth(handler);
