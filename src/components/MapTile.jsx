import "./tile.less";

const MapTile = ({tile}) => {
    return (
    <div className={tile.color}></div>
    )
}

export default MapTile;