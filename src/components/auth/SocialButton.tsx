import type { FC, ReactNode } from 'react';

type SocialButtonProps = {
  Icon: ReactNode;
  label: string;
  onClick?: () => void;
};

const SocialButton: FC<SocialButtonProps> = ({ Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-2xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      {label}
      {Icon}
    </button>
  );
};

export default SocialButton;
