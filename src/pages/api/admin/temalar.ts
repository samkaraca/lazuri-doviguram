import { initialRootDirectory } from "@/admin_panel/activity_finder/model/directory";
import type { NextApiRequest, NextApiResponse } from "next";
import { ServiceAccount, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { apps } from "firebase-admin";
import { cert } from "firebase-admin/app";
import { auth } from "../../../core/functions/api_functions";

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}
const db = getFirestore();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      if (req.query.ekle === "true") {
        const directories = await db
          .collection("directories")
          .doc("rootDirectory")
          .set(initialRootDirectory);
        return res.status(200).json(directories);
      }
      let data: any = {};
      const doc = await db.collection("directories").doc("rootDirectory").get();
      data = doc.data();
      return res.status(200).json(data);

    case "POST":
      const newRootDirectory = req.body;
      const respo = await db
        .collection("directories")
        .doc("rootDirectory")
        .set(newRootDirectory);
      return res.status(200).json(respo);

    default:
      return res.status(501).json({ error: "Unsopported request method" });
  }
}

export default auth(handler);
