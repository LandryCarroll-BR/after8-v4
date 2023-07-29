import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/icons';
import { NavigationMenu } from '@/components';
import { PrimaryMenuItemFragmentFragment } from '@/__generated__/graphql';

import Link from 'next/link';

interface FooterProps extends React.HTMLProps<HTMLElement> {
  menuItems: PrimaryMenuItemFragmentFragment[];
}

export const Footer = ({ menuItems }: FooterProps) => {
  return (
    <footer className={'mt-auto border-t border-border py-8'}>
      <div className="container mx-auto flex flex-col items-center justify-center gap-8">
        <div className={'flex gap-4'}>
          <ul aria-label="Social media" className="flex gap-4">
            <li>
              <Link target="_blank" rel="noopener noreferrer" className={'text-primary'} href={''}>
                <FacebookIcon />
              </Link>
            </li>

            <li>
              <Link target="_blank" rel="noopener noreferrer" className={'text-primary'} href={''}>
                <InstagramIcon />
              </Link>
            </li>

            <li>
              <Link target="_blank" rel="noopener noreferrer" className={'text-primary'} href={''}>
                <YoutubeIcon />
              </Link>
            </li>
          </ul>
        </div>

        <NavigationMenu className={'flex-wrap justify-center'} menuItems={menuItems} />
        <div className={'mt-auto'}>&copy; {new Date().getFullYear()} After 8</div>
      </div>
    </footer>
  );
};
