import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { getNextStaticProps } from '@faustwp/core';
import { GetStaticPropsContext } from 'next';
import { Footer, Header } from '@/components';

/**
 * Next.js file based page example with Faust helpers.
 */
export default function Page() {
  const { data } = useQuery(Page.query);

  const { title: siteTitle } = data.generalSettings;
  const menuItems = data.primaryMenuItems.nodes;

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header menuItems={menuItems} />

      <main className="container">
        <p>Next.js pages are still supported!</p>
      </main>

      <Footer />
    </>
  );
}

Page.query = gql(`
  query GetExamplePage {
    generalSettings {
      title
      description
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

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
  });
}
