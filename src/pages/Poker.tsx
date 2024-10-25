import React from 'react';
import { generateCard, generateGame } from '../services/card';
import Card from '../component/Card';
import { CardsProvider } from '../context/cardsContext';
import Score from '../component/Score';
import { GameProvider } from '../context/gameContext';
import ButtonDefaut from '../component/Button';

const Poker = () => {
    const [cards, setCards] = React.useState<ObjectCard[]>([])
    const [player, setPlayer] = React.useState<ObjectCard[]>([])
    const [ia, setIa] = React.useState<ObjectCard[]>([])
    const [startGame , setStartGame] = React.useState<boolean>(false)
    const [restartGame , setRestartGame] = React.useState<boolean>(false)
    const [openScore , setOpenScore] = React.useState<boolean>(false)
    const [round , setRound] = React.useState<number>(1)
    const [rotateCard , setRotateCard] = React.useState<boolean>(false)
    // const [continueGame , setContinueGame] = React.useState<boolean>(false)
    React.useEffect(()=>{
        const cards : ObjectCard[]= generateCard()
        
        setCards(cards)
        return ()=>{
            setOpenScore(false)
        }        
    },[restartGame])
    React.useEffect(()=>{
        if(startGame && cards.length >0)
       { setPlayer(generateGame(cards))
        setIa(generateGame(cards))
       
    }
    },[startGame, cards])
  React.useEffect(()=>{
    const numberCardReturned = [...player, ...ia].reduce((acc, next)=>{
        if(next.returned){
            acc += 1
        }
        return acc
    },0)
    
    if(numberCardReturned === 8 ){
        setTimeout(function() {   setOpenScore(true) }, 2000);
      
    }
  },[player, ia])

    const launchGame = ()=>{
        setStartGame(true)
    }
    const endGame = ()=>{
        // setCards([])
        setStartGame(false)
        setRestartGame(!restartGame)
        setOpenScore(false)
        setRotateCard(false)
        setRound(1)
        setPlayer([])
        setIa([])
    }
    const cartTurn = ()=>{
        setRotateCard(true)
    }

      const updateIa = (index: number)=>{
        const newTab = [...ia]
        newTab[index].returned = true
        setIa([...newTab])
      }
      const updatePlayer = (index: number)=>{
        const newTab = [...player]
        newTab[index].returned = true
        setPlayer([...newTab])
      }
    return (
        <GameProvider value={{ rotateCard, endGame, setRotateCard}}>
        <CardsProvider value={{cards, player, ia, setPlayer, setIa }}>
            <div className='h-full flex flex-col items-center'>
                <h1 className='text-[2rem] font-bold'>Jeu de poker</h1>  
            
                <div className='h-screen flex flex-col items-center w-full justify-center'>
                {startGame &&
                    <div className='flex flex-col items-center gap-2.5 p-2.5'>
                        <ButtonDefaut onClick={() => { cartTurn(); } } className=''>Révéler les cartes </ButtonDefaut><ButtonDefaut onClick={() => { endGame(); } }>Quitter le jeu </ButtonDefaut>
                    </div>}
                    <div className=' relative w-4/5 p-2.5 h-[70vh] border-white border flex justify-between flex-col items-center '>
                    {startGame ? 
                        <>
                            <div className='flex items-center'>{ia.map((card: ObjectCard, index: number) => { 
                                return<Card key={index} card={card} updateCards={updateIa}index={index}  />
                            })}</div>
                            <div className='flex items-center'>{player.map((card: ObjectCard, index: number) => 
                                <Card key={index} card={card}  updateCards={updatePlayer} index={index}  />)}</div>
                        </>
                    :  
                     
                    <ButtonDefaut onClick={()=>{launchGame()}} > Début du jeu</ButtonDefaut>
}
                    </div>
                    {openScore && <Score/>}
                </div>
            </div>
        </CardsProvider>
        </GameProvider>
    );
}

export default Poker;
