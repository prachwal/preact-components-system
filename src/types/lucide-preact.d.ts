declare module 'lucide-preact' {
  import type { FunctionComponent } from 'preact';

  export interface LucideProps {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
    [key: string]: any;
  }

  // Export all the icon components as function components
  export const Home: FunctionComponent<LucideProps>;
  export const Star: FunctionComponent<LucideProps>;
  export const Info: FunctionComponent<LucideProps>;
  export const Mail: FunctionComponent<LucideProps>;
  export const Heart: FunctionComponent<LucideProps>;
  export const Settings: FunctionComponent<LucideProps>;
  export const User: FunctionComponent<LucideProps>;
  export const Search: FunctionComponent<LucideProps>;
  export const Menu: FunctionComponent<LucideProps>;
  export const X: FunctionComponent<LucideProps>;
  export const Check: FunctionComponent<LucideProps>;
  export const ChevronRight: FunctionComponent<LucideProps>;
  export const ChevronLeft: FunctionComponent<LucideProps>;
  export const AlertCircle: FunctionComponent<LucideProps>;
  export const AlertTriangle: FunctionComponent<LucideProps>;
  export const HelpCircle: FunctionComponent<LucideProps>;
  export const Calendar: FunctionComponent<LucideProps>;
  export const Clock: FunctionComponent<LucideProps>;
  export const Download: FunctionComponent<LucideProps>;
  export const Upload: FunctionComponent<LucideProps>;
  export const Edit: FunctionComponent<LucideProps>;
  export const Trash2: FunctionComponent<LucideProps>;
  export const Book: FunctionComponent<LucideProps>;
  export const FileText: FunctionComponent<LucideProps>;
  export const Activity: FunctionComponent<LucideProps>;
  export const Github: FunctionComponent<LucideProps>;
  export const Package: FunctionComponent<LucideProps>;
}