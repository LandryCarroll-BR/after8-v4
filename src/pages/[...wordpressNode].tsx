import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import { WordPressTemplateProps } from '../types';
import { fetchEvents } from '@/lib/fetch-events';

export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let extendedData: Record<string, any> = {}


  if (ctx.params?.wordpressNode.includes('upcoming-shows')) {
    const events = await fetchEvents()
    extendedData = {
      events: events
      .filter(event => event.eventTitle.endsWith("*"))
      .slice(0,3)
      .map(event => ({
        ...event,
        eventTitle: event.eventTitle.split("(")[0],
        eventLocation: event.eventLocation.split(",").slice(0,4).join("\n").trim(),
      }))
    }
  }

  return getWordPressProps({ ctx, revalidate: 60 * 15, props: { extendedData } });
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
