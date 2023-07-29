import { cn } from '@/lib/utils';

export interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Main: React.FC<MainProps> = ({ className, children }) => {
  return <main className={cn('pt-[70px]', className)}>{children}</main>;
};
