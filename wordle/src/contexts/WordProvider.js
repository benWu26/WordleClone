import React, { createContext, useState, useContext, useEffect } from 'react';
import Axios from 'axios';


const URL = "https://randomuser.me/api/?results=20&nat=us";

export const WordContext = createContext();

export function WordProvider ({ children }) {
    const [name, setName] = useState("");
    const [nameMap, setNameMap] = useState({});
    const [grid, setGrid] = useState(Array.from({ length: 6 }, () =>
        Array.from({ length: 5 }, () => ({ char: '', color: 'white' }))
    ));
    const [col, setCol] = useState(0);
    const [row, setRow] = useState(0);
    const [shake, setShake] = useState(false);
    const [edit, setEdit] = useState(true);


    // two names are generated in strict mode as useEffect will run twice
    useEffect(() => {
        async function fetch() {
            try {
                while (true) {
                    const response = await Axios.get(URL);
                    const name = response.data.results.find((person) => {
                        return typeof person.name.first === 'string' && person.name.first.length === 5;
                    })?.name.first.toUpperCase();

                    if (name != null) {
                        console.log(name);
                        const counts = {};
                        for (const char of name) {
                            console.log("char", char);
                           counts[char] = (counts[char] || 0) + 1; 
                        }

                        setNameMap(counts);
                        setName(name);
                        console.log(name);
                        return name;
                    }

                }
            } catch (e) {
                console.log(e);
            }
        }
        fetch();

    }, []);

    

    const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];

    const validWord = (word) => {
        console.log(word);
        console.log(word.length);
        return vowels.some(vowel => word.includes(vowel)) && word.length===5
    };

    const handleInput = (key) => {
        if (!edit) return;
        console.log("on row", row);
        console.log(name);
        if (key === 'Enter') {
            const word = grid[row].map((box) => box.char).join('');
            if (!validWord(word)) {
                setShake(true);
                setTimeout(() => setShake(false), 500);
                console.log("not a valid word");
                return;
            }
            const newGrid = [...grid];

            const map = {...nameMap};
            console.log("nameMap", nameMap);

            newGrid[row] = newGrid[row].map((box, index) => {

                if (name.charAt(index).toUpperCase() == word.charAt(index).toUpperCase()) {
                    map[name.charAt(index).toUpperCase()]--;
                    return {
                        ...box,
                        color: 'green'
                    }
                }
                return box;
                
            })

            newGrid[row] = newGrid[row].map((box, index) => {
                if (box.color == 'green') return box;
                if (name.includes(word.charAt(index).toUpperCase())) {
                    console.log("map[word.charAt(index).toUpperCase()]", map[word.charAt(index).toUpperCase()]);
                    if (map[word.charAt(index).toUpperCase()] > 0) {
                        map[word.charAt(index).toUpperCase()]--;
                        return {
                            ...box,
                            color: 'yellow'
                        }
                    }
                } 
                return box;
                
            })

            console.log("endMap", map);



            console.log("newGrid", newGrid);
            setGrid(newGrid);


            if (name.toUpperCase() === word) {
                setEdit(false);
                return;
            }



            setRow((prev) => prev + 1);
            setCol(0);
            
            //success
        } else if (key === 'Backspace') {
            if (col > 0) {
                const newGrid = [...grid];
                newGrid[row][col - 1] = { char: '', color: 'white' };
                setGrid(newGrid);
                setCol((prev) => prev - 1);
            }
        } else if (/^[a-zA-Z]$/.test(key)) {
            console.log(col);
            if (col < 5) {
                const newGrid = [...grid];
                newGrid[row][col] = { char: key.toUpperCase(), color: 'white' };
                console.log("newGrid[" + row + "][" + col +"]= ",newGrid[row][col]);
                
                console.log(newGrid[row][col]);
                setGrid(newGrid);
                setCol((prev) => (prev + 1 > 5) ? 4: prev + 1);
            }
        }
    }

    return (
        <WordContext.Provider value={{ grid, shake, handleInput, row, edit}}>
            {children}
        </WordContext.Provider>
    )
};


export const useWordle = () => useContext(WordContext);

