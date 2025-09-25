import { Event } from '@/lib/fetch-events';
import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const calendar = google.calendar({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY,
  });

  const params = {
    calendarId: 'after8booking@gmail.com',
    showDeleted: false,
    timeMin: new Date().toISOString(),
    orderBy: 'startTime',
    singleEvents: true,
  };

  function transformEvents(googleApiResponse: any) {
    return googleApiResponse?.data?.items?.map((item: any) => ({
      id: item?.id,
      eventTitle: item?.summary ?? 'private event',
      eventLocation: item?.location ?? 'private location',
      eventStartTime: item?.start?.dateTime,
      eventEndTime: item?.end?.dateTime,
      eventLink: item?.htmlLink,
    }));
  }

  function cleanupEvents(events: Event[]) {
    return events.filter((event) => event.eventStartTime);
  }

  async function main(params: Record<string, string | boolean>) {
    try {
      const res = await calendar.events.list(params);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  const googleApiResponse = await main(params);
  const allEvents = transformEvents(googleApiResponse);
  const upcomingEvents = cleanupEvents(allEvents);

  return res.status(200).json(upcomingEvents);
}
