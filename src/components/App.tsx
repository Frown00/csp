// App.tsx
import { hot } from 'react-hot-loader';
import React from 'react';
import MapColoringProblem from './map-coloring-problem/MapColoringProblem';

const App = () => <div>
  <MapColoringProblem />
</div>;

export default hot(module)(App);