// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

type Data = {
  subject: string;
  name: string;
  message: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg = {
    to: "garden.playhouse.daycare@gmail.com",
    from: { email: "mmnagelia@outlook.com", name: "Garden Playhouse Website" },
    subject: `New message from Garden Playhouse: ${req.body.subject}`,
    html: `<p>Hey Sarika,<br />You've received a message from ${req.body.name}. Below is the message:<br /><br />${req.body.message}<br /><br />The email address of this person is: ${req.body.email}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: 0 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: 1 });
  }
}
