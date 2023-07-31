import { gql } from '@/__generated__';
import { DataTable } from '@/components/songs/components/data-table';
import { songs } from '@/components/songs/data/songs';
import { columns } from '@/components/songs/components/columns';
import { GetSongListPageQuery } from '@/__generated__/graphql';
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

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Template: FaustTemplate<GetSongListPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  // Set data variables
  const { nodes: menuItems } = props.data.primaryMenuItems;
  const { fullHead } = props.data.page.seo;
  const { hero } = props.data.page.songList;

  return (
    <>
      <SiteHead>{fullHead}</SiteHead>
      <Header menuItems={menuItems} />
      <Main>
        <section className="relative flex aspect-square w-full flex-col items-center justify-center md:aspect-[16/7]">
          <div className="relative z-20 flex flex-col items-center justify-center">
            <h1 className="mb-3 text-center font-display text-[clamp(40px,8vw,72px)] font-bold tracking-tighter">
              {hero.heading}
            </h1>
            <p className="mx-auto mb-7 max-w-md text-center text-[clamp(20px,4vw,28px)]">
              {hero.body}
            </p>
            <Link
              className={cn(
                buttonVariants({ variant: 'display', size: 'sm' }),
                'rounded-full px-6'
              )}
              href={hero.songListFile.link}
            >
              Download our song list
            </Link>
          </div>
          <Image
            src={hero.backgroundImage.sourceUrl}
            alt=""
            fill
            className="h-full w-full object-cover"
          />
          <div className="absolute z-10 h-full w-full bg-gradient-to-t from-background to-background/0"></div>
        </section>
        <section>
          <Container className="container my-16">
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-start">
              <DataTable data={songs} columns={columns} />

              <div className="sticky top-16 mx-auto w-full lg:mx-0 lg:max-w-sm">
                <Card className="min-w-full">
                  <CardHeader className="text-4xl uppercase tracking-tight text-primary">
                    Hear these songs in action!
                  </CardHeader>
                  <CardContent>
                    Experience the magic of our music! Check out our captivating performances and
                    listen to these songs on our Youtube channel.
                  </CardContent>
                  <CardFooter>
                    <Link
                      target="_blank"
                      href={'https://www.youtube.com/@theafter8band111'}
                      className={buttonVariants({
                        variant: 'display',
                        size: 'lg',
                        className: '!font-bold',
                      })}
                    >
                      Go to Youtube
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </Container>
        </section>
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
  query GetSongListPage($databaseId: ID!, $asPreview: Boolean = false) {
  page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      seo {
        fullHead
      }
      title
      content
      songList {
        hero {
          body
          heading
          backgroundImage {
            sourceUrl
          }
          songListFile {
            link
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
