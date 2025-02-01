import './App.css';
import React from 'react';
import Header from './Components/Header';
import Main from './Components/Main';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

export default App;
