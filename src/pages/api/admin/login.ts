import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const password = req.body.password;

      if (password === process.env.ADMIN_PASSWORD!) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
        const jwt = await new jose.SignJWT({ auth: "admin" })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("240 days")
          .sign(secret);

        setCookie("token", jwt, { req, res, maxAge: 60 * 60 * 24 * 360 });

        return res.redirect(307, "/admin/temalar");
      }

      return res.redirect(307, "/admin/login");

    default:
      return res.status(405).json({ error: "Unsopported request method" });
  }
}

export default handler;
