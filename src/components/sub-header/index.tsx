import { Link } from "react-router-dom";

const SubHeader = ({ title = '', btnMore = true, linkTo = '', titleWidth = 10, btnMoreWidth = 2 }) => {
  return (
    <>
      <div className='header sub-header common-flex-box overflow-hidden'>
        {title && (
          <div className='title' style={{ width: `${(titleWidth / (titleWidth + btnMoreWidth)) * 100}%` }}>
            <div className='bg' style={{ width: `${titleWidth < btnMoreWidth && (btnMoreWidth / titleWidth) * 100}%` }}></div>
            <h2>{title}</h2>
          </div>
        )}
        {btnMore && (
          <div className='btn-more' style={{ width: `${(btnMoreWidth / (titleWidth + btnMoreWidth)) * 100}%` }}>
            <div className='bg' style={{ width: `${titleWidth >= btnMoreWidth && (titleWidth / btnMoreWidth) * 100}%` }}></div>
            <Link to={linkTo}>Xem thêm</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SubHeader;
