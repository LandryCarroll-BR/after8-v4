import { cn } from '@/lib/utils';

interface CircleIconProps extends React.HTMLProps<HTMLOrSVGElement> {}

export const CircleIcon: React.FC<CircleIconProps> = ({ className }) => {
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
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};
