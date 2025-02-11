import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Calculator from './Calculator';
import Liverates from './Liverates';

const pageVariants = (direction) => ({
  initial: { x: direction === "left" ? "100vw" : "-100vw", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  exit: { x: direction === "left" ? "-100vw" : "100vw", opacity: 0, transition: { ease: "easeInOut", duration: 0.3 } }
});

function AnimatedRoutes() {
  const location = useLocation();
  const [direction, setDirection] = useState("left"); // Default direction

  useEffect(() => {
    if (location.pathname === "/") setDirection("right");
    else setDirection("left");
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div variants={pageVariants(direction)} initial="initial" animate="animate" exit="exit">
              <Calculator />
            </motion.div>
          }
        />
        <Route
          path="/liverates"
          element={
            <motion.div variants={pageVariants(direction)} initial="initial" animate="animate" exit="exit">
              <Liverates />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
