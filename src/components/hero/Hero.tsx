import React from 'react';
import DinoGame from '../gamecomponents/GC';

const Hero: React.FC = () => {
    return (
        <div className="h-screen text-center place-content-center contact-c ">
            <DinoGame />
        </div>
    );
};

export default Hero;