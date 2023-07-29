import { gql } from '@/__generated__';
import { GetAboutPageQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Container,
  Footer,
  Header,
  Main,
  SiteHead,
  buttonVariants,
} from '@/components';

import Link from 'next/link';
import Image from 'next/image';
import { Number8SVG } from '@/components/icons/number8';

const Template: FaustTemplate<GetAboutPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  // Set data variables
  const { nodes: menuItems } = props.data.primaryMenuItems;
  const { fullHead } = props.data.page.seo;
  const { hero, aboutSection, bandSection, calloutBox, cta } = props.data.page.about;

  return (
    <>
      <SiteHead>{fullHead}</SiteHead>
      <Header menuItems={menuItems} />
      <Main>
        {/* Hero Section */}
        <section className="relative overflow-x-clip pt-16">
          <Container className="my-16 grid grid-cols-1 gap-8 lg:my-28 lg:grid-cols-2">
            <div className="relative z-10">
              <h1 className="mb-8 font-display text-4xl leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl">
                <span className="text-primary">{hero.headingLine1}</span>
                <br />
                <span className="text-primary">{hero.headingLine2}</span>
              </h1>

              <p className="mb-16 max-w-md font-sans text-primary">{hero.body}</p>

              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded border border-border lg:translate-x-48">
                <Image src={hero.image2?.sourceUrl} fill className="object-cover" alt="" priority />
              </div>
            </div>
            <div className="relative z-0">
              <div className="relative z-10 mr-28 hidden items-center justify-center overflow-hidden rounded border border-border lg:flex">
                <Image
                  src={hero.image1?.sourceUrl}
                  width="550"
                  height="760"
                  className="object-cover"
                  priority
                  alt=""
                />
              </div>

              <div className="absolute -right-36 top-20 z-0 hidden items-center justify-center overflow-hidden rounded border border-border lg:flex">
                <Image
                  src={hero.image3?.sourceUrl}
                  width="320"
                  height="500"
                  className="object-cover"
                  priority
                  alt=""
                />
              </div>
            </div>
          </Container>

          <div className="absolute left-0 top-60 -ml-56 scale-75 object-contain md:-ml-32 lg:scale-100">
            <Number8SVG className="w-[600px] fill-primary/5" />
          </div>
        </section>

        {/* About Section */}
        <section className="xl:-mt-20">
          <Container className="my-16 flex flex-col gap-6 lg:my-28 lg:flex-row">
            <div className="flex-1">
              <h2 className="mb-8 font-display text-3xl tracking-tighter text-primary md:text-4xl lg:text-5xl">
                {aboutSection.heading}
              </h2>
              <div
                className="font-sans text-primary"
                dangerouslySetInnerHTML={{ __html: aboutSection.body }}
              />
            </div>

            <div className="mt-auto flex flex-1 flex-col overflow-hidden rounded border text-center">
              <h3
                className="flex items-center justify-center bg-primary p-8 font-sans font-bold uppercase text-primary-foreground"
                dangerouslySetInnerHTML={{ __html: calloutBox.heading }}
              />
              <div className="p-8 font-sans text-gray-100">
                <div className="mb-6" dangerouslySetInnerHTML={{ __html: calloutBox.body }} />
                <Link href={calloutBox?.link?.url} className={cn(buttonVariants({ size: 'xl' }))}>
                  {calloutBox?.link?.title}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Meet The Band Section */}
        <section>
          <Container className="space-y-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {bandSection?.bandMembers?.slice(0, 2).map((bandMember, index) => (
                <Card key={index} className="overflow-hidden rounded">
                  <CardContent className="relative flex aspect-square items-end justify-start">
                    <div className="flex items-center justify-end gap-2">
                      <CardTitle className="relative z-10 text-center text-3xl uppercase text-white lg:text-5xl">
                        {bandMember?.name}
                      </CardTitle>
                      <span className="relative z-10 block text-3xl uppercase text-white lg:text-5xl">
                        |
                      </span>
                      <CardDescription className="relative z-10 text-lg leading-[1.2] text-white lg:text-2xl">
                        {bandMember?.description}
                      </CardDescription>
                    </div>
                    <Image
                      src={bandMember?.image?.sourceUrl}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute z-0 h-auto w-auto object-cover object-top"
                      alt=""
                    />
                    <div className="absolute right-0 top-0 z-0 h-full w-full bg-gradient-to-b from-transparent to-background object-cover object-top opacity-80"></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {bandSection?.bandMembers?.slice(2).map((bandMember, index) => (
                <Card key={index} className="overflow-hidden rounded">
                  <CardContent className="relative flex aspect-square items-end justify-start">
                    <div className="flex items-center justify-end gap-2">
                      <CardTitle className="relative z-10 text-center text-3xl uppercase text-white">
                        {bandMember?.name}
                      </CardTitle>
                      <span className="relative z-10 block text-3xl uppercase text-white">|</span>
                      <CardDescription className="relative z-10 text-lg leading-[1.2] text-white">
                        {bandMember?.description}
                      </CardDescription>
                    </div>
                    <Image
                      src={bandMember?.image?.sourceUrl}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute z-0 h-auto w-auto object-cover object-top"
                      alt=""
                    />
                    <div className="absolute right-0 top-0 z-0 h-full w-full bg-gradient-to-b from-transparent to-background object-cover object-top opacity-80"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Call To Action */}
        <section className="relative mt-28 flex h-[550px] flex-col items-center justify-center overflow-hidden text-center">
          <div className="container">
            <div className="relative z-10 flex flex-col items-center justify-center gap-7">
              <h2 className="tracking-tightest text-center font-display text-[10vw] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
                {cta.heading}
              </h2>

              <div className="text-a max-w-lg font-sans text-xl">{cta.body}</div>

              <Link href={'/contact'} className={cn(buttonVariants({}))}>
                {cta?.button?.title}
              </Link>
            </div>

            <div className="pointer-events-none absolute right-0 top-0 -z-0 h-full w-full object-cover object-center mix-blend-lighten">
              <Image
                src={cta.imageDesktop?.sourceUrl}
                fill
                alt=""
                priority
                className="object-contain object-top md:object-center"
              />
            </div>
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
  query GetAboutPage($databaseId: ID!, $asPreview: Boolean = false) {
  page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      seo {
        fullHead
      }
      title
      content
      about {
        hero {
          body
          headingLine1
          headingLine2
          image1 {
            sourceUrl
          }
          image2 {
            sourceUrl
          }
          image3 {
            sourceUrl
          }
        }
        cta {
          body
          button {
            title
            url
          }
          heading
          imageDesktop {
            sourceUrl
          }
        }
        aboutSection {
          body
          heading
        }
        calloutBox {
          body
          heading
          link {
            title
            url
          }
        }
        bandSection {
          bandMembers {
            image {
              sourceUrl
            }
            name
            description
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
