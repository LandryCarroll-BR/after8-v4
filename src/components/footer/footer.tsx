import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/icons';
import { NavigationMenu, SocialLinks } from '@/components';
import { PrimaryMenuItemFragmentFragment } from '@/__generated__/graphql';

import Link from 'next/link';

interface FooterProps extends React.HTMLProps<HTMLElement> {
  menuItems: PrimaryMenuItemFragmentFragment[];
}

export const Footer = ({ menuItems }: FooterProps) => {
  return (
    <footer className={'mt-auto border-t border-border py-8'}>
      <div className="container mx-auto flex flex-col items-center justify-center gap-8">
        <SocialLinks />

        <NavigationMenu className={'flex-wrap justify-center'} menuItems={menuItems} />
        <div className={'mt-auto'}>&copy; {new Date().getFullYear()} After 8</div>
      </div>
    </footer>
  );
};
