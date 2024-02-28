import { NextApiRequest, NextApiResponse } from "next";
import { SignJWT } from "jose";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const password = req.body.password;

    if (!jwtSecretKey) {
      console.error("JWT_SECRET_KEY is not set in the environment variables");

      return res.status(500).json({
        error: "Internal server error. Please contact the administrator.",
      });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (password === jwtSecretKey) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
      const jwt = await new SignJWT({ auth: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("240 days")
        .sign(secret);

      setCookie("token", jwt, { req, res, maxAge: 60 * 60 * 24 * 360 });

      return res.status(200).json({ message: "Logged in" });
    }

    return res.status(401).json({ error: "Unauthorized" });
  }

  return res.status(405).json({ error: "Unsopported request method" });
}
