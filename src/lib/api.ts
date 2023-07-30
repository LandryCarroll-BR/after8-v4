import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.FRONTEND_URL;

export async function fetchEvents() {
  try {
    let events = await fetch(`${BASE_URL}/api/events`);
    return events;
  } catch (error) {
    console.error(error);
  }
}
