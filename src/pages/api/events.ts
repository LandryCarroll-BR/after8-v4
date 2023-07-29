import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(_req: NextRequest, res: NextResponse) {
  const calendar = google.calendar({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY,
  });

  const params = {
    calendarId: 'after8booking@gmail.com',
  };

  async function fetchEvents(params: any) {
    try {
      const res = await calendar.events.list({ calendarId: params.calendarId });
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  const events = await fetchEvents(params);

  return new Response(
    JSON.stringify({
      events,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
