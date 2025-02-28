import React, { useEffect, useState } from 'react';

const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const colors = ['#ff6a33', '#ff8c5a', '#ffb38a', '#ffd1b8', '#ffe6db'];
    const shapes = ['circle', 'square', 'triangle'];
    const newParticles: JSX.Element[] = [];
    
    for (let i = 0; i < 100; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * -50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 1 + 0.5;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 0.5;
      
      let particleJsx: JSX.Element;
      
      if (shape === 'circle') {
        particleJsx = (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              backgroundColor: color,
              width: `${size}rem`,
              height: `${size}rem`,
              animation: `fall ${duration}s linear ${delay}s forwards`,
            }}
          />
        );
      } else if (shape === 'square') {
        particleJsx = (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              backgroundColor: color,
              width: `${size}rem`,
              height: `${size}rem`,
              animation: `fall ${duration}s linear ${delay}s forwards, rotate ${duration / 2}s linear infinite`,
            }}
          />
        );
      } else {
        particleJsx = (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: 0,
              height: 0,
              borderLeft: `${size / 2}rem solid transparent`,
              borderRight: `${size / 2}rem solid transparent`,
              borderBottom: `${size}rem solid ${color}`,
              animation: `fall ${duration}s linear ${delay}s forwards, rotate ${duration / 2}s linear infinite`,
            }}
          />
        );
      }
      
      newParticles.push(particleJsx);
    }
    
    setParticles(newParticles);
  }, []);

  return <div className="confetti-container">{particles}</div>;
};

export default Confetti;