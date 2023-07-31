import { fetchEvents } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export const EventsList = () => {
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['events'], queryFn: fetchEvents });

  if (isError) return;

  return (
    <>
      {isLoading ? (
        <div className="flex w-full flex-col gap-4">
          {[...Array(3)].map((item, key) => (
            <div key={key} className="flex h-28 gap-4">
              <div className="w-full max-w-[60px] flex-1 animate-pulse rounded-xl bg-primary/10"></div>
              <div className="w-full flex-1 animate-pulse rounded-xl bg-primary/10"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-full flex-1">
          <div className="w-full border-b text-xl font-bold uppercase text-primary">
            <span className="">All upcoming shows</span>
          </div>
          <ul className="grid divide-y">
            {events.map((event) => {
              const eventStartDate = new Date(event.eventStartTime);
              const eventEndDate = new Date(event.eventEndTime);

              return (
                <li key={event.id} className="flex items-center gap-5 py-4">
                  <div className="flex-0 flex min-w-[60px] flex-col items-center justify-center text-primary">
                    <span className="text-4xl font-bold">{format(eventStartDate, 'd')}</span>
                    <span className="font-bold uppercase">{format(eventStartDate, 'MMM')}</span>
                  </div>
                  <div className="flex flex-1 flex-col text-primary">
                    <span className="font-display text-3xl font-bold tracking-tighter text-foreground">
                      {event.eventTitle}
                    </span>
                    <span>{`${format(eventStartDate, 'p')} - ${format(eventEndDate, 'p')}`}</span>
                    <span>{event.eventLocation.split(',')[0]}</span>
                    <span>{event.eventLocation.split(',')[1]}</span>
                    <span>{event.eventLocation.split(',').slice(2)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
