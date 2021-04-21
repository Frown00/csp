import * as React from 'react';
import * as mechanic from './mechanic';
import { IRegion } from './types';
import Map from './Graph';
import Graph from './Graph';

interface IProps {
}

enum Alghortihm {
  BACKTRACKING = 'Backtracking',
  FORWARD_CHECKING = 'Forward checking'
}

interface IState {
  width?: number;
  height?: number;
  nPoints?: number,
  regions?: IRegion[],
  colors?: number;
  solutions?: number;
  alghorithm?: Alghortihm;
  variableWithMinium?: boolean
}

export default class MapColoringProblem extends React.Component<IProps, IState> {
  state: IState = {
    width: 10,
    height: 10,
    nPoints: 6,
    regions: [],
    colors: 3,
    alghorithm: Alghortihm.BACKTRACKING,
    variableWithMinium: false,
  }
  constructor(props: IProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.run = this.run.bind(this);
    this.render = this.render.bind(this);
    this.reset = this.reset.bind(this);
  }

  run() {
    console.clear();
    console.log('Run');
    const width = this.state.width;
    const height = this.state.height;
    const nPoints = this.state.nPoints;
    const colors = this.state.colors;
    const problem = new mechanic.ColoringProblem(width, height, nPoints, colors);
    const regions = problem.generate();
    let solutions = 0;
    // solutions = problem.solveBackTracing(false);
    // for(let i = 0; i < regions.length; i++) {
    //   regions[i].color = null;
    // }
    // solutions = problem.solveBackTracing(true);
    if(this.state.alghorithm === Alghortihm.BACKTRACKING) {
      solutions = problem.solveBackTracing(this.state.variableWithMinium);
    } else if(this.state.alghorithm === Alghortihm.FORWARD_CHECKING) {
      solutions = problem.solveForward(this.state.variableWithMinium);
    }
    this.setState({ regions, solutions });
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
        <label>
          Algorithm:
          <select name='alghorithm' onChange={this.handleInputChange}>
            <option>{Alghortihm.BACKTRACKING}</option>
            <option>{Alghortihm.FORWARD_CHECKING}</option>
          </select>
        </label> <br />
        <label>
          Variable with minium available values:
          <input type="checkbox" name="variableWithMinium" onChange={this.handleInputChange} />
        </label> <br />
        <button onClick={this.run}>Run</button>
        <button onClick={this.reset}>Reset</button>
        <Graph 
          height={this.state.height} 
          width={this.state.width} 
          nPoints={this.state.nPoints} 
          regions={this.state.regions} 
        />
        <div style={{marginTop: '10px'}}>
        { this.state.solutions ? 
            <p>There are <b>{this.state.solutions}</b> possible ways to solve this problem</p>
          : this.state.solutions != undefined ? 
            <p>No solution</p> 
          : ''
        }
        </div>
      </div>
    );
  }
}