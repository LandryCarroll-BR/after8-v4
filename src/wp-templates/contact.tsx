import { gql } from '@/__generated__';
import { gql as apolloGql, useMutation } from '@apollo/client';
import { cn } from '@/lib/utils';
import { GetContactPageQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { motion } from 'framer-motion';
import { SpinnerIcon } from '@/components/icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Footer,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Header,
  Input,
  Main,
  SiteHead,
  Textarea,
  buttonVariants,
} from '@/components';

import Image from 'next/image';
import Link from 'next/link';

const SUBMIT_FORM = apolloGql`
  mutation SubmitForm($databaseId: ID!, $fieldValues: [FormFieldValuesInput]!) {
    submitGfForm(input: { id: $databaseId, fieldValues: $fieldValues }) {
      confirmation {
        message
      }
      errors {
        id
        message
      }
    }
  }
`;

const FormSchema = z.object({
  firstName: z.string().max(30, 'Must be shorter than 30 characters'),
  lastName: z.string().max(30, 'Must be shorter than 30 characters'),
  emailAddress: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  phoneNumber: z
    .string()
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'Invalid number'),
  eventDate: z.string(),
  eventTime: z.string(),
  eventDetails: z.string().max(120, 'Must be shorter than 120 characters'),
});

const Template: FaustTemplate<GetContactPageQuery> = (props) => {
  const [mutateFunction, { data, loading }] = useMutation(SUBMIT_FORM);

  let isSuccess = data?.submitGfForm?.confirmation?.message;
  let isError = data?.submitGfForm?.errors;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onFormSubmit(values: z.infer<typeof FormSchema>) {
    try {
      let response = await mutateFunction({
        variables: {
          databaseId: 1,
          fieldValues: [
            {
              id: 1,
              nameValues: {
                first: values.firstName,
                last: values.lastName,
              },
            },
            {
              id: 2,
              emailValues: {
                value: values.emailAddress,
              },
            },
            {
              id: 5,
              value: values.phoneNumber,
            },
            {
              id: 6,
              value: values.eventDate,
            },
            {
              id: 8,
              value: values.eventTime,
            },
            {
              id: 3,
              value: values.eventDetails,
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  const { hero } = props.data.page.contact;

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
      <Header menuItems={menuItems} className="block lg:hidden" />
      <Main className="relative min-h-screen bg-background">
        <div className="relative aspect-video lg:absolute lg:inset-0 lg:left-1/2 lg:aspect-auto">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            fill
            src={hero.heroImageDesktop.sourceUrl}
            alt=""
          />
        </div>

        <div className="pb-24 pt-16 sm:pb-32 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2">
          <div className="px-6 lg:px-8">
            <div className="mx-auto h-full max-w-xl lg:mx-0 lg:max-w-lg">
              <h1 className="font-display text-5xl tracking-tighter text-primary lg:text-6xl">
                {hero.heading}
              </h1>
              <motion.div
                initial={{ opacity: 0, height: 0, display: 'none' }}
                animate={{
                  opacity: isError || isSuccess ? 1 : 0,
                  height: isError || isSuccess ? 'auto' : 0,
                  transitionEnd: {
                    display: isError || isSuccess ? 'auto' : 'none',
                  },
                }}
                className=""
              >
                {isSuccess ? (
                  <div>
                    <p className="my-6">
                      Thank you for contacting us! We&apos;ll get back with you shortly.
                    </p>
                    <Link href={'/'} className={cn(buttonVariants())}>
                      Back to home
                    </Link>
                  </div>
                ) : (
                  <div className="my-6 rounded-2xl border border-red-400 p-8 text-red-300">
                    <p className="">
                      Oh no! Looks like something went wrong! Please try again later
                    </p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 1, height: 'auto', display: 'block' }}
                animate={{
                  opacity: isError || isSuccess ? 0 : 1,
                  height: isError || isSuccess ? 0 : 'auto',
                  transitionEnd: {
                    display: isError || isSuccess ? 'none' : 'auto',
                  },
                }}
              >
                <p className="my-6">{hero.body}</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onFormSubmit)} className="">
                    <div className="flex w-full flex-col items-start justify-center gap-6">
                      <div className="grid w-full grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="emailAddress"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid w-full grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="eventDate"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Date of your event</FormLabel>
                              <FormControl>
                                <Input type="date" placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="eventTime"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Time of your event</FormLabel>
                              <FormControl>
                                <Input type="time" placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="eventDetails"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Can you tell us more about your event?</FormLabel>
                            <FormControl>
                              <Textarea placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="ml-auto" size="sm">
                        Submit
                        <motion.div
                          className="-mr-3 ml-3"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{
                            opacity: loading ? 1 : 0,
                            width: loading ? 'auto' : 0,
                          }}
                        >
                          <SpinnerIcon className="text-background" />
                        </motion.div>
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            </div>
          </div>
        </div>
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
  query GetContactPage($databaseId: ID!, $asPreview: Boolean = false) {
  page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      seo {
        fullHead
      }
      title
      content
      contact {
        hero {
          heading
          body
          heroImageDesktop {
            sourceUrl
            altText
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
