import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '../container/container';
import { Button, buttonVariants } from '../button/Button';
import { ArrowRightIcon } from '../icons';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Event } from '@/lib/api';


interface FeaturedEventsProps extends React.HTMLProps<HTMLDivElement> {
  featuredEvents: Event[];
  images: string[];
}

export default function FeaturedEvents({ featuredEvents,images }: FeaturedEventsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastEventIndex = featuredEvents.length - 1;

  return (
    <div className="relative flex min-h-[80vh] w-full flex-col justify-center py-10">
      <AnimatePresence>
      <Container className="relative z-20 w-full text-center md:text-start">
        <span className="mb-4 block text-xl uppercase text-primary md:text-2xl">
          Featured Shows
        </span>
        {featuredEvents.map((event: Event, index: number) => {
          const eventDay = format(new Date(event.eventStartTime), 'EEEE');
          const startTime = format(new Date(event.eventStartTime), 'p');
          const endTime = format(new Date(event.eventEndTime), 'p');

          return (
            <motion.div
              key={index}
              initial={{opacity: 0, translateX: 5}}
              animate={{opacity: 1, translateX: 0 }}
              transition={{duration: 0.5, type: 'spring', stiffness: 60}}
              className="flex-col text-primary flex"
            >
              <div className="mb-2 font-display text-5xl font-bold tracking-tighter text-foreground md:text-7xl">
                {event.eventTitle}
              </div>
              <div className="text-3xl uppercase md:text-4xl">{`${startTime} - ${endTime}`}</div>
              <div className="text-2xl md:text-3xl whitespace-pre-line ">{`${eventDay}, ${event.eventLocation}`}</div>
            </motion.div>
          );
        })[currentIndex]}

        <div className="mt-16 flex w-full flex-wrap items-center justify-center gap-4 md:justify-start">
          <Button
            onClick={() => setCurrentIndex(currentIndex === 0 ? lastEventIndex : currentIndex - 1)}
            variant="ghost"
            className="hidden rounded-full border-2 border-transparent px-5 py-4 hover:bg-transparent md:inline"
          >
            <ArrowRightIcon className="rotate-180 stroke-primary" />
          </Button>
          {featuredEvents.map((event: Event, index: number) => {
            const status = index === currentIndex ? 'isActive' : 'isNotActive';
            const eventMonth = format(new Date(event.eventStartTime), 'MMM');
            const eventDate = format(new Date(event.eventStartTime), 'dd');

            return (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                initial={false}
                animate={status}
                variants={{
                  isActive: {
                    background: 'hsla(305 32% 71%)',
                    color: 'hsla(240 10% 6%)',
                    transition: {
                      duration: 0.1,
                    },
                  },
                  isNotActive: {
                    background: 'hsla(240 10% 6%, 0)',
                    color: 'hsla(305 32% 71%)',
                    transition: {
                      duration: 0.1,
                    },
                  },
                }}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'aspect-[7/12] w-16 rounded-full border-2 border-primary p-2 hover:bg-primary/20'
                )}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold uppercase">{eventMonth}</span>
                  <span className="text text-4xl font-bold">{eventDate}</span>
                </div>
              </motion.button>
            );
          })}
          <Button
            onClick={() => setCurrentIndex(currentIndex === lastEventIndex ? 0 : currentIndex + 1)}
            variant="ghost"
            className="hidden rounded-full border-2 border-transparent px-5 py-4 hover:bg-transparent md:inline"
          >
            <ArrowRightIcon className="stroke-primary" />
          </Button>
        </div>
      </Container>
      {featuredEvents.map((_: Event, index: number) => {
        const status = index === currentIndex ? 'isActive' : 'isNotActive';

        return (
          <motion.div
            key={index}
            animate={status}
            initial={false}
            variants={{
              isActive: {
                display: 'flex',
                opacity: 1,
              },
              isNotActive: {
                opacity: 0,
                display: 'none',
              },
            }}
            className="absolute aspect-auto h-full w-full object-cover"
          >
            <Image
              alt="Background Image"
              src={images[index] || images[index - 2]}
              fill
              priority
              role='presentation'
              className="absolute aspect-auto h-full w-full object-cover"
            />
          </motion.div>
        );
      })}
      <div className="absolute z-10 h-full w-full bg-gradient-to-t from-background to-background/50 md:bg-gradient-to-r md:to-background/0"></div>
      </AnimatePresence>
    </div>
  );
}
