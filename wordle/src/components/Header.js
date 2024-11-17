export default function Header(props) {

    const container = {
        background: '#d3d3d3',
        height: '5%',
        display: 'flex', 

        flexWrap: 'nowrap',
        overflow: 'hidden', 
        Width: '100%',
    };


    const left = {

        fontSize: '30px',
        fontWeight: 'bold',
        whitespace: 'nowrap'
    }

    return (
        <div style={container}>
            <div style={left}>
                Name-dle
            </div>

        </div>
    )
}