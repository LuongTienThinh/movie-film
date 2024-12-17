import SubHeader from 'components/sub-header';
import { ISideBar } from 'interfaces';

const SideBar = ({ leftSide, rightSide }: ISideBar) => {
  return (
    <>
      <div className='side-bar flex w-full justify-between gap-5'>
        {leftSide && (
          <div className='left-side' style={{ width: `${leftSide.width && (leftSide.width / 12) * 100}%` }}>
            {leftSide.header && <SubHeader {...leftSide.header} />}
            {leftSide.content && leftSide.content}
          </div>
        )}
        {rightSide && (
          <div className='right-side' style={{ width: `${rightSide.width && (rightSide.width / 12) * 100}%` }}>
            {rightSide.header && <SubHeader {...rightSide.header} />}
            {rightSide.content && rightSide.content}
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
