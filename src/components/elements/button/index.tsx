import { IButton } from 'interfaces';

const Button = ({ leftIcon: LeftIcon, btnName, type, rightIcon: RightIcon, onClick, className, ...props }: IButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`auth-btn flex items-center justify-center rounded-p2 px-p2 py-2 text-sm font-semibold sm:px-0 sm:py-p1 sm:text-lg ${className ?? ''}`}
      {...props}
    >
      {LeftIcon && LeftIcon}
      <div className={`name ${LeftIcon || RightIcon ? 'w-4/5' : ''}`}>{btnName}</div>
      {RightIcon && RightIcon}
    </button>
  );
};

export default Button;
