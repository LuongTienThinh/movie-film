import { ReactNode } from 'react';

import './index.scss';

interface ILoading {
  children?: ReactNode;
  isLoading?: boolean;
  timingData?: number;
  timingRender?: number;
}

const Loading = ({ isLoading, timingData = 0, timingRender = 0, children }: ILoading) => {
  return (
    <>
      {isLoading ? (
        <>
          {timingData > 0 ? (
            <>
              <style>
                {`
                  .loader::before {
                    animation-duration: ${timingData / 1000}s;
                  }
                  .loader::after {
                    width: 0% !important;
                  }
                `}
              </style>
            </>
          ) : (
            <>
              <style>
                {`
                  .loader::after {
                    animation-duration: ${timingRender / 1000}s;
                  }
                `}
              </style>
            </>
          )}
          <div className={`loader`}></div>
        </>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
