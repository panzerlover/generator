import {useState} from 'react';
import MapRow from './MapRow';
import "./map.css"

const Map = ({mapSize}) => {

    const possibleColors = [
        "green",
        "blue",
        "grey"
    ]

    class Tile{
        color;
        constructor(color){
            this.color = color;
        }
    }
    const arr = [];
    for (let i = 0; i < mapSize.height; i++){
        const row = [];
        for (let j = 0; j < mapSize.width; j++){
            const rand = Math.floor(Math.random()*3);
            const newTile = new Tile(possibleColors[rand])
            row.push(newTile);
        }
        arr.push(row);
    }
    console.log(arr);
    const [mapArr, setMapArr] = useState(arr)

    return (
        <div>
            {mapArr.map(row => {
                return <MapRow row={row} />
            })}
        </div>

    )

}

export default Map;