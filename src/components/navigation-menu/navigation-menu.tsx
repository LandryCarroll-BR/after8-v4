import { cn } from '@/lib/utils';
import { gql } from '@apollo/client';
import { PrimaryMenuItemFragmentFragment } from '../../__generated__/graphql';
import Link from 'next/link';

interface NavigationMenuProps extends React.HTMLProps<HTMLElement> {
  menuItems: PrimaryMenuItemFragmentFragment[];
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  menuItems,
  className,
  children,
}) => {
  if (!menuItems) {
    return null;
  }

  return (
    <nav className={''} role="navigation" aria-label={`${menuItems[0]?.menu.node.name} menu`}>
      <ul className={cn('flex gap-8 text-sm font-bold uppercase', className)}>
        {menuItems.map((item) => {
          const { id, path, label } = item;
          return (
            <li key={id ?? ''} className="text-primary hover:text-primary/70">
              <Link className="" href={path ?? ''}>
                {label ?? ''}
              </Link>
            </li>
          );
        })}
        {children}
      </ul>
    </nav>
  );
};
