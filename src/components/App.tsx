// App.tsx
import { hot } from 'react-hot-loader';
import React from 'react';
import GraphColoring from './graph-coloring-problem/GraphColoring';

const App = () => <div>
  <GraphColoring />
</div>;

export default hot(module)(App);