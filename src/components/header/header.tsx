import { gql } from '../../__generated__';
import { PrimaryMenuItemFragmentFragment } from '../../__generated__/graphql';
import { Logo } from '../logo/logo';

import Link from 'next/link';

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  menuItems: PrimaryMenuItemFragmentFragment[];
}

export const Header = ({ menuItems }: HeaderProps) => {
  return (
    <header className={'bg-gray-100 py-4'}>
      <div className="container flex items-center">
        <Link href="/" className={''}>
          <Logo />
        </Link>

        <nav className={'ml-auto'}>
          <ul className="flex gap-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.uri}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
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
