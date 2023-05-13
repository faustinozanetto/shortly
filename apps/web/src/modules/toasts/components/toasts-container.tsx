import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useToastContext } from '@modules/toasts/hooks/use-toast-context';
import Toast from '@modules/toasts/components/toast';

const ToastsContainer: React.FC = () => {
  const { state } = useToastContext();

  return (
    <LazyMotion features={domAnimation}>
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex flex-col">
        <ul className="mx-auto max-w-xl">
          <AnimatePresence initial={false}>
            {state.toasts &&
              state.toasts.map((toast) => {
                return <Toast key={toast.id} toast={toast} />;
              })}
          </AnimatePresence>
        </ul>
      </div>
    </LazyMotion>
  );
};

export default ToastsContainer;
