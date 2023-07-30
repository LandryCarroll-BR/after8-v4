import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const calendar = google.calendar({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY,
  });

  const params = {
    calendarId: 'after8booking@gmail.com',
  };

  async function main(params: any) {
    try {
      const res = await calendar.events.list({ calendarId: params.calendarId });
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  const events = await main(params);

  return res.status(200).json(events);
}
