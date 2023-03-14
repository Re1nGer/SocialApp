import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

//const AnimatedPost = motion(Post);
export const AnimatedPostInView = ({ children }) => {

    const ref = useRef(null);

    const inView = useInView(ref, { once: true });

    const controls = useAnimation();

    React.useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, scale: 1 });
        }

    }, [inView, controls]);

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.section>
    );
};