import { Files } from "formidable";
import { Fields } from "formidable";
import { IncomingForm } from "formidable";
import { NextApiRequest } from "next";

export const parseFormidableForm = async (req: NextApiRequest) => {
    const form = new IncomingForm();
    const [fields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve([fields, files]);
        });
    });
    return { fields, files };
};