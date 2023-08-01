import Link from 'next/link';

import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../icons';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SocialLinksProps extends React.HTMLProps<HTMLDivElement> {}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className }) => {
  const socialLinksMotion = {
    rest: {
      opacity: 0,
      width: 0,
      transition: {
        ease: 'easeInOut',
        width: {
          delay: 0.2,
        },
      },
    },
    hover: {
      opacity: 1,
      width: 'auto',
      transition: {
        ease: 'easeInOut',
        opacity: {
          delay: 0.2,
        },
      },
    },
  };

  return (
    <ul aria-label="Social media" className={cn('flex gap-4', className)}>
      <li className="">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={'https://www.facebook.com/after8band/'}
        >
          <motion.div
            initial={'rest'}
            whileHover={'hover'}
            animate={'rest'}
            className="flex items-center justify-center rounded-full border-2 border-primary p-2 text-primary"
          >
            <motion.div
              variants={socialLinksMotion}
              className="pointer-events-none block font-bold uppercase text-primary"
            >
              Facebook
            </motion.div>
            <FacebookIcon />
          </motion.div>
        </Link>
      </li>

      <li className="">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className={'text-primary'}
          href={'https://www.instagram.com/after8band/'}
        >
          <motion.div
            initial={'rest'}
            whileHover={'hover'}
            animate={'rest'}
            className="flex items-center justify-center rounded-full border-2 border-primary p-2 text-primary"
          >
            <motion.div
              variants={socialLinksMotion}
              className="pointer-events-none block font-bold uppercase text-primary"
            >
              <span>Instagram</span>
              <span className="opacity-0">_</span>
            </motion.div>
            <InstagramIcon />
          </motion.div>
        </Link>
      </li>

      <li className="">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className={'text-primary'}
          href={'https://www.youtube.com/@theafter8band111'}
        >
          <motion.div
            initial={'rest'}
            whileHover={'hover'}
            animate={'rest'}
            className="flex items-center justify-center rounded-full border-2 border-primary p-2 text-primary "
          >
            <motion.div
              variants={socialLinksMotion}
              className="pointer-events-none font-bold uppercase text-primary"
            >
              <span>Youtube</span>
              <span className="opacity-0">_</span>
            </motion.div>
            <YoutubeIcon />
          </motion.div>
        </Link>
      </li>
    </ul>
  );
};
