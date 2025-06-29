import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0 
}: AnimatedSectionProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  });

  const animationClasses = {
    fadeInUp: hasIntersected 
      ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' 
      : 'opacity-0 translate-y-8',
    fadeInLeft: hasIntersected 
      ? 'animate-[fadeInLeft_0.8s_ease-out_forwards]' 
      : 'opacity-0 -translate-x-8',
    fadeInRight: hasIntersected 
      ? 'animate-[fadeInRight_0.8s_ease-out_forwards]' 
      : 'opacity-0 translate-x-8',
    fadeIn: hasIntersected 
      ? 'animate-[fadeIn_0.8s_ease-out_forwards]' 
      : 'opacity-0',
    scaleIn: hasIntersected 
      ? 'animate-[scaleIn_0.8s_ease-out_forwards]' 
      : 'opacity-0 scale-95',
  };

  return (
    <section
      ref={elementRef}
      className={`transition-all duration-800 ease-out ${animationClasses[animation]} ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </section>
  );
}