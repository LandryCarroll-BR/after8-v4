import { cn } from '@/lib/utils';

interface CircleIconProps extends React.HTMLProps<HTMLOrSVGElement> {}

export const XIcon: React.FC<CircleIconProps> = ({ className }) => {
  return (
    <svg
      className={cn('', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};
