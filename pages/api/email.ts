// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import sgMail from "@sendgrid/mail";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data: any = await new Promise((resolve, reject) => {
      const form = formidable();
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) {
          console.log(err);
          reject({ err });
        }
        resolve({ err, fields, files });
      });
    });

    const to: string = data.fields.to;
    const from: string = data.fields.from;
    const subject: string = data.fields.subject;
    const html: string = data.fields.html;
    const text: string = data.fields.text;
    const attachments: string = data.fields.attachments;
    const files = data.files;

    const newHtml = html.split('<br><div class="gmail_quote">')[0];
    const trimmed = html.split('<br><div class="gmail_quote">')[1];

    const firstPart = String.raw`The email address of this person is: <a href="mailto:`;
    const secondPart = String.raw`"`;
    const targetEmail = trimmed.split(firstPart)[1].split(secondPart)[0];

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const msg = {
      to: targetEmail,
      from: {
        email: "garden.playhouse.daycare@gmail.com",
        name: "Garden Playhouse Daycare",
      },
      subject: `Re: ${subject}`,
      html: newHtml,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({
        to: to,
        from: from,
        targetEmail: targetEmail,
        subject: subject,
        html: newHtml,
        text: text,
        attachments: attachments,
        files: files,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: 0 });
    }
  } else {
    console.log("Cannot receive GET request");
    res.status(200).send("Cannot receive GET request");
  }
}
