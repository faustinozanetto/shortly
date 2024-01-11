import React from 'react';

export type StatsCardProps = {
  title: string;
  stat: string | number;
  unit: string;
  description: string;
};

const StatsCard: React.FC<StatsCardProps> = (props) => {
  const { title, stat, unit, description } = props;

  return (
    <div className="bg-background rounded border p-3 shadow transition-transform hover:scale-105 md:p-4">
      <h3 className="text-lg font-semibold sm:text-xl">{title} </h3>
      <span className="text-primary mt-2 text-3xl font-bold md:text-4xl xl:text-5xl">{`${stat}${unit}`}</span>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default StatsCard;
