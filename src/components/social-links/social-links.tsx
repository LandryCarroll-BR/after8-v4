import Link from 'next/link';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../icons';
import { cn } from '@/lib/utils';

interface SocialLinksProps extends React.HTMLProps<HTMLDivElement> {}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className }) => {
  return (
    <ul aria-label="Social media" className={cn('flex gap-4', className)}>
      <li>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className={'text-primary'}
          href={'https://www.facebook.com/after8band/'}
        >
          <FacebookIcon />
        </Link>
      </li>

      <li>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className={'text-primary'}
          href={'https://www.instagram.com/after8band/'}
        >
          <InstagramIcon />
        </Link>
      </li>

      <li>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className={'text-primary'}
          href={'https://www.youtube.com/@theafter8band111'}
        >
          <YoutubeIcon />
        </Link>
      </li>
    </ul>
  );
};
