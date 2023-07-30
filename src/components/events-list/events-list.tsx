import { fetchEvents, queryClient } from '@/lib/api';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';

export const EventsList = () => {
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['events'], queryFn: fetchEvents });

  if (isLoading || isError) return;

  return <div></div>;
};
