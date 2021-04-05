import * as React from 'react';
import * as mechanic from './mechanic';
import { IRegion } from './types';
import Map from './Map';

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

  render () {
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
        <Map 
          height={this.state.height} 
          width={this.state.width} 
          nPoints={this.state.nPoints} 
          regions={this.state.regions} 
        />
      </div>
    );
  }
}