import './App.css';
import React from 'react';
import { AppStateProps } from './interfaces/interfaces';
import SearchInput from './Components/SearchInput';
import SearchButton from './Components/SearchButton';
import Spinner from './Components/Spinner';
import ErrorButton from './Components/ErrorButton';
import ErrorBoundary from './Components/ErrorBoundary';

class App extends React.Component {
  state: Readonly<AppStateProps> = {
    searchText: localStorage.getItem('lastSearch') ?? '',
    isSpinnerActive: false,
  };

  handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value.replace(/\s/g, '') });
  };

  handleSubmitRequest = () => {
    localStorage.setItem('lastSearch', this.state.searchText);
    this.getData();
  };

  getData = () => {
    this.setState({ isSpinnerActive: true });
    fetch('https://pokeapi.co/api/v2/berry/', { method: 'GET' }).then(
      (data) => {
        const result = data.json();
        result.then((data2) => {
          this.setState({ isSpinnerActive: false });
          console.log(data2);
        });
      }
    );
  };
  render(): React.ReactNode {
    return (
      <>
        <header className="header">
          <h1>POKEAPI Berry search</h1>
          <SearchInput
            value={this.state.searchText}
            onChange={this.handleSearchText}
          />
          <SearchButton onClick={this.handleSubmitRequest} />
        </header>
        <main className="main">
          {this.state.isSpinnerActive ? <Spinner /> : ''}
        </main>
        <footer>
          <ErrorBoundary>
            <ErrorButton />
          </ErrorBoundary>
        </footer>
      </>
    );
  }
}

export default App;
