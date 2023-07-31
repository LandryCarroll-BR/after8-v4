import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.FRONTEND_URL;

export type Event = {
  id: string;
  eventTitle: string;
  eventLocation: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLink: string;
};

export async function fetchEvents() {
  try {
    let response: Response = await fetch(`${BASE_URL}/api/events`);
    let events: Event[] = await response.json();

    return events;
  } catch (error) {
    console.error(error);
  }
}
