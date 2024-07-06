import {useState ,useEffect} from "react";
import Card from "./Card";
import cardsArray from "./Data";

function Board() {
    const [matchArray, setMatchArray] = useState([]);  
    const [moves, setMoves] = useState(0); 
    const [firstCard, setFirstCard] = useState(null); 
    const [secondCard, setSecondCard] = useState(null); 
    const [stopFlip, setStopFlip] = useState(false);  
    const [won, setWon] = useState(0);

    const NewGame = () => {
        setTimeout(() => { 
            const randomOrderArray = cardsArray.sort(() => 0.5 - Math.random()); 
            setMatchArray(randomOrderArray); 
            setMoves(0); 
            setFirstCard(null); 
            setSecondCard(null); 
            setWon(0); 
        }, 1200);
    }

    const handleSelectedCards = (item) => {
        if (firstCard !== null && firstCard.id !== item.id) { 
            setSecondCard(item); 
        } else { 
            setFirstCard(item); 
        }
    }

    useEffect(() => { 
        if (firstCard && secondCard) { 
            setStopFlip(true); 
            if (firstCard.name === secondCard.name) { 
                setMatchArray((prevArray) => { 
                    return prevArray.map((unit) => { 
                        if (unit.name === firstCard.name) { 
                            return { ...unit, matched: true }; 
                        } else { 
                            return unit; 
                        } 
                    }); 
                }); 
                setWon((preVal) => preVal + 1); 
                removeSelection(); 
            } else { 
                setTimeout(() => { 
                    removeSelection(); 
                }, 1000); 
            } 
        } 
    }, [firstCard, secondCard]);

    const removeSelection = () => {
        setFirstCard(null); 
        setSecondCard(null); 
        setStopFlip(false); 
        setMoves((prevValue) => prevValue + 1);
    }

    useEffect(() => { 
        NewGame(); 
    }, []); 

    return ( 
        <div className="container"> 
            <div className="header"> 
                <h1>Memory Game</h1> 
            </div> 
            <div className="board"> 
                {
                    matchArray.map((item) => ( 
                        <Card 
                            item={item} 
                            key={item.id} 
                            handleSelectedCards={handleSelectedCards} 
                            toggled={ 
                                item === firstCard || 
                                item === secondCard || 
                                item.matched === true
                            } 
                            stopflip={stopFlip} 
                        /> 
                    )) 
                } 
            </div> 
            
            <div className="footer">

                {won !== 6 ? ( 
                    <div className="comments">Moves : {moves}</div> 
                ) : ( 
                    <div className="comments"> 
                        You Won in {moves} moves!!
                    </div> 
                )} 
                <button className="button" onClick={NewGame}> 
                    New Game 
                </button> 
            </div>
        </div> 
    ); 
}

export default Board;