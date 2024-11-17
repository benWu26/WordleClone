import Wordlebox from "./WordleBox";
import { useWordle } from "../contexts/WordProvider";
import { useEffect } from 'react';

export default function WordleInput({index}) {
    const { grid, shakeRow, row} = useWordle();

    useEffect(() => {
        //console.log(grid);
        console.log(index);
        console.log(grid[index]);
    }, [grid]);
    
    return (
        <div style={{ display: 'flex', justifyContent: "center", gap: "10px", marginTop: '10px' }}>
            {grid[index].map((box, col) => (
                <Wordlebox
                    key={col}
                    char={box.char}
                    color={box.color}
                    shake={shakeRow && index==row}
                />
            ))}
        </div>

    )
}