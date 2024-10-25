import React, { FC } from 'react';

const CardView : FC<CardViewProps> = ({className, card}) => {
    return (
        <div className="bg-transparent w-[100px] h-[136px] border borde-gray card-perspective">
        <div className={`relative w-full h-full align-center ${className} card-inner-transform`}>
            <div className="absolute w-full h-full card-visibility bg-card">
            </div>
            <div className="absolute w-full h-full card-visibility bg-white card-rotateY text-black">
            <h2>{card.name}</h2>
            </div>
        </div>
        </div>
    );
}

export default CardView;
