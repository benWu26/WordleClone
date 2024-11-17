import React from 'react';


const WordleBox = React.memo(function WordleBox({char, color, shake}) {

    

    const style = {
        width: '50px',
        height: '50px',
        borderStyle: "solid",
        borderWidth: "medium",
        borderColor: "#d3d3d3",
        fontSize: '24px',
        justifyContent: 'center',
        alignItems: 'center',
        background: color,
        animation: shake ? 'shake 0.5s' : 'none',
    }

    return (
        <div style={style}>
            {char}
        </div>
    )
});


export default WordleBox;