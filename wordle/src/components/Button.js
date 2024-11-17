export default function Button({text, onClick}) {

    const style = {
        border: '2px solid #000000',
        borderRadius: '8px',
        padding: '10px 20px',
        cursor: 'pointer',
    }


    return (
        <button
            onClick={onClick}
            style={style}
        >
            {text}
        </button>
    );
}