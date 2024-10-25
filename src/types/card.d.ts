type ObjectCard = {name: string, point: number, returned: boolean}

type CardProps = {
    card:ObjectCard, 
    index: number, 
    turn: boolean,
     updateCards : (index : number)=> void,
}
type CardContext = {
    cards: ObjectCard[], 
    player: ObjectCard[], 
    ia: ObjectCard[], 
    setPlayer : (data : ObjectCard[])=> void,
    setIa : (data : ObjectCard[])=> void
}

type CardViewProps = {
    card: ObjectCard,
    className?: string
} 
