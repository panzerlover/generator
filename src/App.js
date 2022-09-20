import logo from './logo.svg';
import './App.css';
import Map from "./components/Map";
import Title from "./components/Title";
import {useState} from 'react';

function App() {

  const [mapSize, setMapSize] = useState({height: 10, width: 10})

  return (
    <div className="App">
      <Title />
      <Map mapSize={mapSize}/>
    </div>
  );
}

export default App;
