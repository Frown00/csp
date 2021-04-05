import * as React from 'react';
import LineTo from 'react-lineto';
import { IRegion } from './types';

interface IProps {
  width?: number;
  height?: number;
  nPoints?: number,
  regions?: IRegion[]
}

export default class Map extends React.Component<IProps> {
  display() {
    const items = [];
    const lines = [];
    for(let y = 0; y < this.props.height; y++) {
      for(let x = 0; x < this.props.width; x++) {
        let content = <span></span>
        const region = this.props.regions.find((r: IRegion) => r.point[0] === x && r.point[1] === y);
        if(region) {
          content = <div style={{borderRadius: "50%", backgroundColor: "black", width: 5, height: 5}}></div>
          for(let i = 0; i < region.neighbors.length; i++) {
            const neighbor = region.neighbors[i]
            const from = `${region.point[0]}x ${region.point[1]}y`;
            const to = `${neighbor.point[0]}x ${neighbor.point[1]}y`;
            lines.push(<LineTo className={`line ${from}x  ${to}y`} key={`line ${from}  ${to}`} from={from} to={to} />)
          }
        }
        items.push(
          <div className={`${x}x ${y}y`} key={`${x}x + ${y}y`} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            width: 20,
            height: 20,
            margin: 0,
            padding: 0, 
            border: '1px solid whitesmoke', 
            boxSizing: "border-box"
          }}>
            {content}
          </div>
        )
      }
    }
    const map = <div id="map" style={{
      width: this.props.width * 20, 
      height: this.props.height * 20, 
      backgroundColor: 'lightgray',
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      {items}
      {lines}
    </div>
    
    return map;
  }

  render () {
    const items = [];
    const lines = [];
    for(let y = 0; y < this.props.height; y++) {
      for(let x = 0; x < this.props.width; x++) {
        let content = <span></span>
        const region = this.props.regions.find((r: IRegion) => r.point[0] === x && r.point[1] === y);
        if(region) {
          content = <div style={{borderRadius: "50%", backgroundColor: "black", width: 5, height: 5}}></div>
          for(let i = 0; i < region.neighbors.length; i++) {
            const neighbor = region.neighbors[i]
            const from = `${region.point[0]}x ${region.point[1]}y`;
            const to = `${neighbor.point[0]}x ${neighbor.point[1]}y`;
            lines.push(<LineTo className={`line ${from}x  ${to}y`} key={`line ${from}  ${to}`} from={from} to={to} />)
          }
        }
        items.push(
          <div className={`${x}x ${y}y`} key={`${x}x + ${y}y`} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            width: 20,
            height: 20,
            margin: 0,
            padding: 0, 
            border: '1px solid whitesmoke', 
            boxSizing: "border-box"
          }}>
            {content}
          </div>
        )
      }
    }
    return (
      <div id="map" style={{
        width: this.props.width * 20, 
        height: this.props.height * 20, 
        backgroundColor: 'lightgray',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        {items}
        {lines}
      </div>
    );
  }
}