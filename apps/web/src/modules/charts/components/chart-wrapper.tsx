import React from 'react';

type ChartWrapperProps = {
  children: React.ReactNode;
};

const ChartWrapper: React.FC<ChartWrapperProps> = (props) => {
  const { children } = props;

  return <div className="relative flex items-center justify-center h-full w-[99%] sm:w-full">{children}</div>;
};

export default ChartWrapper;
