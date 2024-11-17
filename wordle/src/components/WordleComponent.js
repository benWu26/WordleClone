import WordleInput from "./WordleInput";
import { useEffect } from 'react';
import { WordProvider, useWordle } from "../contexts/WordProvider";


function WordleGame() {
    const { handleInput, grid, row } = useWordle();


    useEffect(() => {
        const handleKeyPress = (event) => {
            console.log(event);
            handleInput(event.key);
        };
        

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [grid, row]);



    const divStyle = {
        justifycontent: "center",
    }



    return (
        <div style={divStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {Array.from({ length: 6 }).map((_, rowIndex) => (
                    <WordleInput key={rowIndex} index={rowIndex} />
                ))}
            </div>
        </div>
    );
}

export default function WordleComponent() {
    return (
        <WordProvider>
            <WordleGame/>
        </WordProvider>
    )
}