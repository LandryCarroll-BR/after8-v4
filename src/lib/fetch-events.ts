const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.after8music.com';

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
