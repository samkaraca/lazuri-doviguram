import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, hasCookie } from "cookies-next";
import * as jose from "jose";

export function auth(
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    const tokenCookie = getCookie("token", { req, res });

    if (tokenCookie) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
        await jose.jwtVerify(tokenCookie as string, secret);

        return handler(req, res);
      } catch (error) {
        return res.status(401).send({ error: "Unauthorized cookie" });
      }
    }

    return res.status(401).send({ error: "Unauthorized" });
  };
}
