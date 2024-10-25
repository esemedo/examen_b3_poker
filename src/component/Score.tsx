import React, { FC, useContext } from 'react';
import { cardsContext } from '../context/cardsContext';
import { detectWinner } from '../services/card';
import { gameContext } from '../context/gameContext';
import CardView from './CardView';
type ScoreInfo = {
    player: string | boolean,
    ia : string |boolean ,
    card: ObjectCard[] 
}
const Score : FC= () => {
    const {player, ia}=useContext(cardsContext)
    const {endGame}=useContext(gameContext)
    const [winnerText, setWinnerText] = React.useState<string>("")
    const [info, setInfo] = React.useState<ScoreInfo>({} as ScoreInfo)
    React.useEffect(()=>{
        const winner = detectWinner(player, ia)
        setInfo(winner)
        if (winner?.player){
            setWinnerText("Vous avez gagné !")
        }
        else if (winner?.ia){
            setWinnerText("Vous avez perdu !")
        }else {
            setWinnerText("Aucun vainqueur")
        }
        
        

    },[])
    
    return (
        <div className='fixed top-0 left-0 bg-[#0000008a] w-screen h-screen ] '>
            <div className='absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 bg-white w-4/5 h-[70vh] text-black'>
                <div className='flex flex-col items-center justify-around h-full'>
                    <h1 className='text-[3rem] font-bold text-[#681a68]'>{winnerText}</h1>
                    <p>{info.player? `Vous l'emporter avec une ${info.player.toString().toLowerCase()}`:info.ia?`L'IA l'emporte avec ${info.player.toString().toLowerCase()}`: '' }</p>
                   {info?.card?.length >0 && info.card.map((card : ObjectCard, index: number)=><CardView key={index} card={card} />)}
                    <button className='border bg-[#681a68] hover:bg-[#955e95] border-[#681a68] p-2.5 rounded-md text-white' onClick={endGame}>Rejouer</button>
                </div>
            </div>
        </div>
    );
}

export default Score;
