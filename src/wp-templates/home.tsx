import { gql } from '@/__generated__';
import { GetHomePageQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { cn } from '@/lib/utils';

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

import Link from 'next/link';
import Image from 'next/image';

type GridRow = {
  __typename?: 'Page_Home_AboutSection_featuredGrid';
  body?: string;
  image1?: {
    __typename?: 'MediaItem';
    sourceUrl?: string;
  };
  image2?: {
    __typename?: 'MediaItem';
    sourceUrl?: string;
  };
  link?: {
    __typename?: 'AcfLink';
    url?: string;
    title?: string;
  };
};

interface GridRowProps extends React.HTMLProps<HTMLDivElement> {
  gridRow: GridRow;
}

const GridRow: React.FC<GridRowProps> = ({ gridRow }) => {
  return (
    <div className="flex flex-col items-center gap-2 md:flex-row-reverse md:gap-6 odd:md:flex-row">
      <div className="relative flex aspect-[5/3] w-full items-center justify-center overflow-hidden rounded border border-border object-cover md:flex-1">
        <Image
          src={gridRow?.image1?.sourceUrl}
          fill
          className="absolute aspect-auto w-full object-cover"
          alt=""
        />
      </div>
      <div className="relative hidden aspect-[5/3] w-full items-center justify-center overflow-hidden rounded border border-border object-cover md:flex-1 lg:flex">
        <Image
          src={gridRow?.image2?.sourceUrl}
          fill
          className="absolute aspect-auto w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col md:flex-1">
        <div className="p-4">
          <p>{gridRow?.body}</p>
          <Link
            href={gridRow?.link?.url}
            className={cn(
              'mt-4 w-full',
              buttonVariants({ size: 'xl', variant: 'display-outline' })
            )}
          >
            {gridRow?.link?.title}
          </Link>
        </div>
      </div>
    </div>
  );
};

const Template: FaustTemplate<GetHomePageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  // Set data variables
  const { nodes: menuItems } = props.data.primaryMenuItems;
  const { fullHead } = props.data.page.seo;
  const { hero, aboutSection, awardsSection, ctaSection } = props.data.page.home;

  return (
    <>
      <SiteHead>{fullHead}</SiteHead>
      <Header menuItems={menuItems} />
      <Main>
        {/* Hero Section */}
        <section className="relative flex h-[calc(100vh-200px)] w-full flex-col overflow-hidden">
          <Container className="mt-auto flex w-full flex-col items-end justify-end pb-10 text-right">
            <h1 className="font-display text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block text-primary">{hero?.headingLine1}</span>
              <span className="block">{hero?.headingLine2}</span>
            </h1>

            <Link href={hero?.cta?.url} className={cn('mt-8', buttonVariants())}>
              {hero?.cta?.title}
            </Link>
          </Container>

          <div className="pointer-events-none absolute right-0 top-0 -z-0 h-full w-full object-cover object-center mix-blend-lighten">
            <Image
              src={hero?.bgImageDesktop?.sourceUrl}
              fill
              alt={''}
              priority
              className="object-cover"
            />
          </div>
        </section>

        {/* About Section */}
        <section className="my-28">
          <Container className="">
            <h2 className="mb-8 font-display text-2xl tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              {aboutSection?.aboutHeading}
            </h2>

            <ul className="grid grid-cols-1 gap-6">
              {aboutSection?.featuredGrid.map((gridRow, index) => {
                return <GridRow key={index} gridRow={gridRow} />;
              })}
            </ul>
          </Container>
        </section>

        {/* Awards Section */}
        <section className="my-28">
          <Container>
            <div className="grid gap-12 md:grid-cols-2 md:gap-10">
              <Card className="max-h-fit">
                <CardHeader className="text-3xl font-bold">
                  {awardsSection.awardsHeading}
                </CardHeader>
                <CardContent>
                  <p dangerouslySetInnerHTML={{ __html: awardsSection.awardsBody }} />
                </CardContent>
                <CardFooter className="flex flex-col gap-5">
                  <div className="mr-auto flex w-full flex-1 flex-col gap-5 md:flex-row">
                    <Link
                      href={awardsSection?.theKnotLink?.url}
                      className={cn(
                        buttonVariants({
                          size: 'xl',
                          variant: 'display-outline',
                          className: 'w-full md:w-fit',
                        })
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {awardsSection?.theKnotLink?.title}
                    </Link>
                    <Link
                      href={awardsSection?.weddingWireLink?.url}
                      className={cn(
                        buttonVariants({
                          size: 'xl',
                          variant: 'display-outline',
                          className: 'w-full md:w-fit',
                        })
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {awardsSection?.weddingWireLink?.title}
                    </Link>
                  </div>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-4 gap-x-3 gap-y-4 md:border-y md:py-5">
                {awardsSection?.awardsImages?.map((node, index) => (
                  <div key={index} className="object-fit flex items-center justify-center">
                    <Image
                      loading="lazy"
                      src={node.awardLogo.sourceUrl}
                      width="100"
                      height="100"
                      className="aspect-auto h-auto w-auto"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ctaSection */}
        <section className="relative mt-28 flex h-[550px] flex-col items-center justify-center overflow-hidden">
          <div className="container relative z-10">
            <div className="flex flex-col items-center justify-center gap-7">
              <h2 className="font-display text-2xl tracking-tighter sm:text-3xl md:text-4xl lg:text-6xl">
                {ctaSection.ctaHeading}
              </h2>

              <Link href={ctaSection?.ctaLink?.url} className={cn(buttonVariants())}>
                {ctaSection?.ctaLink?.title}
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 top-0 -z-0 h-full w-full object-cover object-center opacity-80">
            <Image
              src={ctaSection?.ctaImage?.sourceUrl}
              fill
              priority
              className="object-cover"
              alt=""
            />
          </div>
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
  query GetHomePage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      seo {
        fullHead
      }
      title
      content
      home {
        hero {
          headingLine1
          headingLine2
          bgImageDesktop {
            sourceUrl
          }
          bgImageMobile {
            sourceUrl
          }
          blurb
          cta {
            url
            title
          }
        }
        aboutSection {
          aboutHeading
          featuredGrid {
            image1 {
              sourceUrl
            }
            image2 {
              sourceUrl
            }
            body
            link {
              url
              title
            }
          }
        }
        awardsSection {
          awardsHeading
          awardsBody
          theKnotLink {
            url
            title
          }
          weddingWireLink {
            url
            title
          }
          awardsImages {
            awardLogo {
              sourceUrl
            }
          }
        }
        ctaSection {
          ctaHeading
          ctaImage {
            sourceUrl
          }
          ctaLink {
            url
            title
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
