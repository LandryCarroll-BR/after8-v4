import { cn } from '@/lib/utils';
import { gql } from '../../__generated__';
import { motion, useMotionTemplate, useTransform } from 'framer-motion';
import { MenuIcon } from '../icons';
import { PrimaryMenuItemFragmentFragment } from '../../__generated__/graphql';

import {
  Container,
  Logo,
  NavigationMenu,
  Sheet,
  SheetContent,
  SheetTrigger,
  buttonVariants,
} from '@/components';

import { useBoundedScroll } from '@/hooks/use-bounded-scroll';

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  menuItems: PrimaryMenuItemFragmentFragment[];
}

export const Header = ({ menuItems }: HeaderProps) => {
  let { scrollYBoundedProgress } = useBoundedScroll(100);
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  );

  return (
    <motion.header
      style={{
        height: useTransform(scrollYBoundedProgressThrottled, [0, 1], [100, 70]),
        backgroundColor: useMotionTemplate`rgb(14 14 17 / ${useTransform(
          scrollYBoundedProgressThrottled,
          [0, 1],
          [1, 0.1]
        )})`,
      }}
      className="fixed inset-x-0 flex h-20 shadow backdrop-blur-md"
    >
      <Container className="flex w-full items-center gap-8 pt-4">
        <motion.div
          style={{ height: useTransform(scrollYBoundedProgressThrottled, [0, 1], [80, 54]) }}
        >
          <Logo className="aspect-auto h-full w-full" />
        </motion.div>
        <motion.div
          className="hidden lg:block"
          style={{ opacity: useTransform(scrollYBoundedProgressThrottled, [0, 1], [1, 0]) }}
        >
          <NavigationMenu menuItems={menuItems} />
        </motion.div>

        <div className="ml-auto block lg:hidden">
          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className: 'flex items-center justify-center',
                })
              )}
            >
              <MenuIcon className="h-8 w-8 text-primary" />
            </SheetTrigger>
            <SheetContent className="border-0 border-l pt-16">
              <NavigationMenu
                id={''}
                className={'flex-col gap-4 text-right !text-2xl !text-primary'}
                menuItems={menuItems}
              ></NavigationMenu>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </motion.header>
  );
};

Header.fragments = {
  generalSettingsFragment: gql(`
    fragment HeaderGeneralSettingsFragment on GeneralSettings {
      title
      description
    }
  `),
  menuItemFragment: gql(`
    fragment PrimaryMenuItemFragment on MenuItem {
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
  `),
};
