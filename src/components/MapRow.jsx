import MapTile from "./MapTile";

const MapRow = ({row}) => {

    return (
    <div className="map-row">
        {row.map(tile => {
            return <MapTile tile={tile}/>
        })}
    </div>
    )
}

export default MapRow;