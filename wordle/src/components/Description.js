export default function Description(props) {

    const style = {
        paddingTop: '20px',
        paddingBottom: '20px',
        fontsize: '10px',
        justifycontent: 'center',
        alignItems: 'center',      
        textAlign: 'center', 
    };

    return (
        <div style={style}>
            {props.children}
        </div>
    )
};