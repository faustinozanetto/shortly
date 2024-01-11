import React from 'react';

type ChartWrapperProps = {
  children: React.ReactNode;
};

const ChartWrapper: React.FC<ChartWrapperProps> = (props) => {
  const { children } = props;

  return <div className="relative flex items-center justify-center m-auto h-auto w-[99%]">{children}</div>;
};

export default ChartWrapper;
