import { HomeFeatureData } from '@modules/home/types/home.types';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@modules/ui/components/accordion/accordion';
import React from 'react';

export type HomeFeatureCardProps = {
  index: number;
  data: HomeFeatureData;
};

const HomeFeatureCard: React.FC<HomeFeatureCardProps> = (props) => {
  const { index, data } = props;
  const { title, content, icon } = data;

  return (
    <AccordionItem key={title} value={String(index)} className="overflow-hidden border-b py-3 last:border-none">
      <AccordionTrigger className="group flex w-full items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <p className="text-sm">{content}</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default HomeFeatureCard;
