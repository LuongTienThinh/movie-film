import { IInput } from 'interfaces';

const Input = ({ id, type, name, placeholder, label, value = '', checked = false, rules = '', formatted, className, onChange, ...props }: IInput) => {
  switch (type) {
    case 'text':
    case 'password':
      return (
        <>
          <input
            className={`w-full rounded-p2 px-5 py-2 ${className ?? ''}`}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete='off'
            {...props}
          />
          {!formatted && value && <div className='-mt-0.5 mb-2 ms-2 text-left text-xs text-red-400'>{rules}</div>}
        </>
      );

    case 'checkbox':
      return (
        <div className='flex items-center'>
          <div className='relative h-[18px] select-none max-sm:scale-90'>
            <input className={`${className ?? ''}`} id={id} type={type} name={name} onChange={onChange} {...props} checked={checked} />
            <label className='checkbox'></label>
          </div>
          {label && (
            <label className='py-1 ps-1 sm:ps-2.5 leading-none max-sm:text-xs' htmlFor={name}>
              {label}
            </label>
          )}
        </div>
      );

    default:
      return <></>;
  }
};

export default Input;
