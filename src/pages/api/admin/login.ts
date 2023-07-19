import { NextApiRequest, NextApiResponse } from "next";
import { SignJWT } from "jose";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const password = JSON.parse(req.body).password;

    if (!jwtSecretKey)
      return res.status(500).send("Environment variable missing.");

    if (!password) return res.status(400).send("Password missing.");

    if (password === jwtSecretKey) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
      const jwt = await new SignJWT({ auth: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("240 days")
        .sign(secret);

      setCookie("token", jwt, { req, res, maxAge: 60 * 60 * 24 * 360 });

      return res.status(200).send("Successful!");
    }

    return res.status(401).send("Wrong password.");
  }

  return res.status(400).send("API route not found.");
}
