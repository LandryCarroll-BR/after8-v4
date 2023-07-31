import { gql } from '@/__generated__';
import { GetUpcomingShowsPageQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Container,
  Footer,
  Header,
  Main,
  SiteHead,
  buttonVariants,
} from '@/components';
import { EventsList } from '@/components/events/events-list';
import FeaturedEvents from '@/components/events/featured-events';
import Link from 'next/link';

const Template: FaustTemplate<GetUpcomingShowsPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  // Set data variables
  const { nodes: menuItems } = props.data.primaryMenuItems;
  const { fullHead } = props.data.page.seo;
  const { featuredEvents } = props.data.page.upcomingShows;

  return (
    <>
      <SiteHead>{fullHead}</SiteHead>
      <Header menuItems={menuItems} />
      <Main>
        <FeaturedEvents featuredEvents={featuredEvents} />
        <Container className="flex w-full flex-col items-center justify-center gap-16 py-16 lg:flex-row lg:items-start lg:gap-6">
          <EventsList />

          <div className="sticky top-12 mx-auto max-h-[400px] w-full max-w-full lg:mx-0 lg:max-w-sm">
            <Card className="min-w-full">
              <CardHeader className="text-4xl uppercase tracking-tight text-primary">
                Interested in having us at your event?
              </CardHeader>
              {/* <CardContent> Interested in having us at your event? Drop us a line!</CardContent> */}
              <CardFooter>
                <Link
                  href={'/contact'}
                  className={buttonVariants({
                    variant: 'display',
                    size: 'lg',
                    className: '!font-bold',
                  })}
                >
                  Let&apos;s Talk
                </Link>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </Main>
      <Footer menuItems={menuItems} />
    </>
  );
};

Template.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Template.query = gql(`
  query GetUpcomingShowsPage($databaseId: ID!, $asPreview: Boolean = false) {
  page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      seo {
        fullHead
      }
      title
      content
      upcomingShows {
        featuredEvents {
          eventEndTime
          eventStartTime
          eventTitle
          eventLocation
          eventBackgroundImage {
            sourceUrl
          }
        }
      }
    }
    primaryMenuItems: menuItems(where: { location: PRIMARY }) {
      nodes {
        id
        uri
        path
        label
        parentId
        cssClasses
        menu {
          node {
            name
          }
        }
      }
    }
  }
`);

export default Template;
