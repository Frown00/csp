import * as React from 'react';
import * as mechanic from './mechanic';
import { IRegion } from './types';
import Map from './Graph';
import Graph from './Graph';

interface IProps {
}

interface IState {
  width?: number;
  height?: number;
  nPoints?: number,
  regions?: IRegion[],
  colors?: number;
}

export default class MapColoringProblem extends React.Component<IProps, IState> {
  state: IState = {
    width: 10,
    height: 10,
    nPoints: 10,
    regions: [],
    colors: 3
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
    const colors = this.state.colors;
    const problem = new mechanic.ColoringProblem(width, height, nPoints, colors);
    const regions = problem.generate();
    problem.solve();
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
        <label>
          Colors: 
          <input type="number" min={2} max={7} value={this.state.colors} name='colors' onChange={this.handleInputChange}/>  
        </label><br />
        <button onClick={this.run}>Run</button>
        <button onClick={this.reset}>Reset</button>
        <Graph 
          height={this.state.height} 
          width={this.state.width} 
          nPoints={this.state.nPoints} 
          regions={this.state.regions} 
        />
      </div>
    );
  }
}