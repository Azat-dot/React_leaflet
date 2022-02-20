import React from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import GeojsonLayer from './GeojsonLayer';
import Basemap from './Basemaps';
import './Map.css';

// указываем путь к файлам marker
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class MapComponent extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.onBMChange = this.onBMChange.bind(this);
  // };

  state = {
    lat: 35.702868,
    lng: -87.530865,
    zoom: 6,
    basemap: 'topo',

    geojsonvisible: false,
  };

  onBMChange = (bm)  => {
    // console.log(this);
      this.setState({
          basemap: bm
      });
  }

  onGeojsonToggle = (e) => {

    this.setState({
        geojsonvisible: e.currentTarget.checked
    });
  }

  render() {
    let center = [this.state.lat, this.state.lng];

    const basemapsDict = {
        osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        topo: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
    }

    return (
      <MapContainer zoom={this.state.zoom} center={center}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={basemapsDict[this.state.basemap]}
        />
        <Basemap basemap={this.state.basemap} onChange={this.onBMChange}/>

        <div className="geojson-toggle">
            <label htmlFor="layertoggle">Toggle Geojson</label>
            <input type="checkbox" 
                name="layertoggle" id="layertoggle"
                value={this.state.geojsonvisible} onChange={this.onGeojsonToggle}/>
        </div>

        {this.state.geojsonvisible &&
            <GeojsonLayer url="geojson.json" />
        }

        <Marker position={center}>
          <Popup>Выбрана базовая карта {this.state.basemap}!</Popup>
        </Marker>
      </MapContainer>
    );
  }
};

export default MapComponent;

