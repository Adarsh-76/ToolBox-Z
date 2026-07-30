import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import styles from './Reveal.module.css';

const Reveal = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only animate the first time it enters the screen
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={styles.revealWrapper}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
