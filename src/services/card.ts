import { TABLE_SCORE } from "../constant/score"

export const generateCard = ()=>{
    const numberCard = [{name: '7', value: 7}, {name: '8', value: 8} , {name: '9', value: 9},{name: '10', value: 10} , {name: 'V', value: 11}, {name: 'D', value: 12}, {name: 'R', value: 13} , {name: 'As', value: 14}]
    const typeCard = ['carreau', "coeur", "pique", "trèfle"]
    return numberCard.reduce((acc : ObjectCard[],  next)=> {
        typeCard.forEach((type)=>{
            acc = [...acc, {name:`${next.name} ${type}`, point: next.value, returned: false }]
        })
        return acc
    }, [])

}
const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };
export const generateGame = (cards: ObjectCard[])=>{
        let playerCards :ObjectCard[] = []
    for (let i = 0; i < 4; i++) {
        const int = getRandomInt(cards.length)
        playerCards = [...playerCards, cards[int]]
        cards.splice(int, 1)
    }
    return playerCards
}

export const detectScore = (cards : ObjectCard[])=>{
    let totalPoint = 0
    let copyCards = [...cards]
    let cardWinner :ObjectCard[] = []
    for (let i = 0; i < copyCards.length - 1; i++) {
        const card = copyCards[i];
        const cardFiltered = copyCards.filter((item : ObjectCard) => item.point === card.point)
        const lengthCard = cardFiltered.length 
        if(lengthCard===2 ){
         totalPoint += 2
         cardWinner = [...cardWinner,cardFiltered[i] ]
         copyCards.splice(i, 1)
        }
        else if(lengthCard===3){
            totalPoint += 6
            cardWinner = [...cardWinner,cardFiltered[i] ]
            break
        }
        else if(lengthCard===4){
            totalPoint += 8
            cardWinner = [...cardWinner,cardFiltered[i] ]
         break;
        }
    }
    return {totalPoint, cardWinner}
}

export const detectWinner = (cardsPlayer : ObjectCard[], cardsIA : ObjectCard[])=>{
    let scoreObjectPlayer =  detectScore(cardsPlayer);
    let scoreObjectIa = detectScore(cardsIA);
    let scorePlayer =  scoreObjectPlayer.totalPoint;
    let scoreIa =scoreObjectIa.totalPoint;
        if (scoreIa === 0  && scorePlayer === 0){
        const tabPointsIA = cardsIA.reduce((acc : number[],  next)=> {
            return [...acc, next.point]
        }, [])
        const tabPointsPlayer = cardsPlayer.reduce((acc : number[],  next)=> {
            return [...acc, next.point]
        }, [])
        const maxValuePlayer =Math.max(...tabPointsPlayer)
        const maxValueIa =Math.max(...tabPointsIA)
        if(maxValueIa > maxValuePlayer){
            scoreIa += 1
            scoreObjectIa.cardWinner = [...scoreObjectIa.cardWinner,...cardsIA.filter(card=> card.point === maxValuePlayer) ]
        }else if(maxValueIa < maxValuePlayer){
            scorePlayer +=1
            scoreObjectPlayer.cardWinner = [...scoreObjectPlayer.cardWinner,...cardsPlayer.filter(card=> card.point === maxValuePlayer) ]
    }
        
    }
    
     if (scoreIa > scorePlayer){
        return {player : false, ia: TABLE_SCORE[scoreIa as keyof typeof TABLE_SCORE], card: scoreObjectIa.cardWinner}
    }
    else  if (scoreIa < scorePlayer){
        return {ia : false, player: TABLE_SCORE[scorePlayer as keyof typeof TABLE_SCORE], card: scoreObjectPlayer.cardWinner}
    }else{
        return  {player: false, ia: false, card: []}
    }
}