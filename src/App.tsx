import React from 'react';
import Platform from './components/Platform/Platform';
import Matrix from './components/Matrix/Matrix';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <Platform />
      <Matrix />
    </div>
  );
};

export default App;
