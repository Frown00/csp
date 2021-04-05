import * as React from 'react';
import * as mechanic from './mechanic';
import LineTo from 'react-lineto';
import { IRegion } from './types';

interface IProps {
}

interface IState {
  width?: number;
  height?: number;
  nPoints?: number,
  regions?: IRegion[]
}

export default class MapColoringProblem extends React.Component<IProps, IState> {
  state: IState = {
    width: 13,
    height: 10,
    nPoints: 20,
    regions: [],
  }
  constructor(props: IProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.run = this.run.bind(this);
    this.render = this.render.bind(this);
    this.reset = this.reset.bind(this);
    this.display = this.display.bind(this);
  }

  run() {
    console.log('Run');
    const width = this.state.width;
    const height = this.state.height;
    const nPoints = this.state.nPoints;
    const problem = new mechanic.MapColoringProblem(width, height, nPoints);
    const regions = problem.generate();
    this.setState({ regions });
  }

  reset() {
    console.log('To reset');
    console.log('Click Ctrl + R');
  }

  handleInputChange(event: any) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  display() {
    const items = [];
    const lines = [];
    for(let y = 0; y < this.state.height; y++) {
      for(let x = 0; x < this.state.width; x++) {
        let content = <span></span>
        const region = this.state.regions.find((r: IRegion) => r.point[0] === x && r.point[1] === y);
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
      width: this.state.width * 20, 
      height: this.state.height * 20, 
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
    const map = this.display();
    return (
      <div>
        <label>
          Map width: 
          <input type="number" value={this.state.width} name='width' onChange={this.handleInputChange}/>
        </label><br />
        <label>
          Map height: 
          <input type="number" value={this.state.height} name='height' onChange={this.handleInputChange}/>
        </label><br />
        <label>
          Points: 
          <input type="number" value={this.state.nPoints} name='nPoints' onChange={this.handleInputChange}/>  
        </label><br />
        <button onClick={this.run}>Run</button>
        <button onClick={this.reset}>Reset</button>
        {map}
      </div>
    );
  }
}