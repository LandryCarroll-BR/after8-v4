import { cn } from '@/lib/utils';
import { gql } from '../../__generated__';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/use-scroll';
import { MenuIcon } from '../icons';
import { PrimaryMenuItemFragmentFragment } from '../../__generated__/graphql';

import {
  Logo,
  NavigationMenu,
  Sheet,
  SheetContent,
  SheetTrigger,
  buttonVariants,
} from '@/components';

import Link from 'next/link';

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  menuItems: PrimaryMenuItemFragmentFragment[];
}

export const Header = ({ className, menuItems }: HeaderProps) => {
  let { height: headerHeight } = useScrollPosition(50, 80);
  let { height: logoHeight } = useScrollPosition(40, 60);

  return (
    <motion.header
      style={{ height: headerHeight }}
      className={cn(
        'fixed top-0 z-40 flex w-full items-center border-border bg-background/80 py-2 pt-8',
        className
      )}
    >
      <div className="container">
        <div className={'flex w-full items-center gap-5'}>
          <motion.div style={{ height: logoHeight }} className={cn('')}>
            <Link href="/" title="Home" className="">
              <Logo className="aspect-auto h-full w-full" />
            </Link>
          </motion.div>

          <NavigationMenu className={'hidden lg:flex'} menuItems={menuItems}></NavigationMenu>

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
        </div>
      </div>
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
