import { Link } from 'react-router-dom';

import { IAnchor } from 'interfaces';

const Anchor = ({ anchorName, linkTo = '', onClick, className, ...props }: IAnchor) => {
  return (
    <Link
      to={linkTo}
      onClick={onClick}
      className={`auth-btn my-p1 flex items-center justify-center rounded-p2 py-p1 text-lg font-semibold ${className ?? ''}`}
      {...props}
    >
      <div className={`name`}>{anchorName}</div>
    </Link>
  );
};

export default Anchor;
