import React, { FC, useContext } from 'react';
import '../style/card.css'
import { gameContext } from '../context/gameContext';
import pique from '../assets/pique.svg'
import heart from '../assets/coeur.webp'
import diamonds from '../assets/diamonds.jpg'
import trefle from '../assets/trefle.png'

const Card : FC<CardProps>= ({card, index, turn,  updateCards}) => {
    const [activeCard, setActiveCard] = React.useState(false)
    const {rotateCard  }= useContext(gameContext)
    const tabImage : Record<string, string> = {carreau: diamonds, coeur: heart, "trèfle": trefle, pique: pique}
    React.useEffect(()=>{
      if(rotateCard){

        let timeout = setTimeout(()=>{
            setActiveCard(true)
            updateCards(index)
            
        },(index+1)*1000 )
        return()=>{
        clearTimeout(timeout)
      }
    }
    },[rotateCard])
    return (
        <div className="bg-transparent w-[100px] h-[136px] border borde-gray card-perspective">
        <div className={`relative w-full h-full align-center ${activeCard? "card-rotateY": ""} card-inner-transform`}>
            <div className="absolute w-full h-full card-visibility bg-card">
            </div>
            <div className="absolute w-full h-full card-visibility bg-white card-rotateY text-black">
              <div className='h-full w-full flex flex-col justify-around items-center'>
                <img className='w-1/5 self-end mr-1.5' src={tabImage[card.name.split(" ")[1]]}></img>
                <h2>{card.name.split(" ")[0]}</h2>
                <img className='w-1/5 self-start  ml-1.5' src={tabImage[card.name.split(" ")[1]]}></img>
              </div>
            </div>
        </div>
        </div>
    );
}

export default Card;
