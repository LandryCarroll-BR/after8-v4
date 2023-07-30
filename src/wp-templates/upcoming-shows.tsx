import { gql } from '@/__generated__';
import { GetUpcomingShowsPageQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { Footer, Header, Main, SiteHead } from '@/components';
import { EventsList } from '@/components/events-list/events-list';

const Template: FaustTemplate<GetUpcomingShowsPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  // Set data variables
  const { nodes: menuItems } = props.data.primaryMenuItems;
  const { fullHead } = props.data.page.seo;

  return (
    <>
      <SiteHead>{fullHead}</SiteHead>
      <Header menuItems={menuItems} />
      <Main>
        <EventsList></EventsList>
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
