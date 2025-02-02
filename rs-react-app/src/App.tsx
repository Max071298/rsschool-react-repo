import './App.css';
import React from 'react';
import { HeaderStateProps } from './interfaces/interfaces';
import SearchInput from './Components/SearchInput';
import SearchButton from './Components/SearchButton';
import Spinner from './Components/Spinner';

class App extends React.Component {
  state: Readonly<HeaderStateProps> = {
    searchText: localStorage.getItem('lastSearch') ?? '',
  };

  handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value.replace(/\s/g, '') });
  };

  handleSubmitRequest = () => {
    localStorage.setItem('lastSearch', this.state.searchText);
    this.getData();
  };

  getData = () => {
    fetch('https://pokeapi.co/api/v2/berry/cheri/', { method: 'GET' }).then(
      (data) => {
        const result = data.json();
        result.then((data2) => console.log(data2));
      }
    );
  };
  render(): React.ReactNode {
    return (
      <>
        <header>
          <h1>POKEAPI Berry search</h1>
          <SearchInput
            value={this.state.searchText}
            onChange={this.handleSearchText}
          />
          <SearchButton onClick={this.handleSubmitRequest} />
        </header>
        <main>
          <Spinner />
        </main>
      </>
    );
  }
}

export default App;
