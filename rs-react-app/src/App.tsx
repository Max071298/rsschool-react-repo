import './App.css';
import React from 'react';
import { AppStateProps } from './interfaces/interfaces';
import SearchInput from './Components/SearchInput';
import SearchButton from './Components/SearchButton';
import Spinner from './Components/Spinner';
import ErrorButton from './Components/ErrorButton';
import ErrorBoundary from './Components/ErrorBoundary';
import DataComponent from './Components/DataComponent';

class App extends React.Component {
  state: Readonly<AppStateProps> = {
    searchText: localStorage.getItem('lastSearch') ?? '',
    isSpinnerActive: false,
    errorTypeSearch: 0,
    searchData: [],
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
    fetch(`https://pokeapi.co/api/v2/berry/${this.state.searchText}`, {
      method: 'GET',
    }).then((data) => {
      if (data.status) {
        this.setState({ errorTypeSearch: data.status });
      }
      const result = data.json();
      result
        .then((data2) => {
          this.setState({ isSpinnerActive: false });
          if (data2.results.length) {
            this.setState({ searchData: data2.results });
          }
          console.log(data2);
        })
        .catch((error) => {
          this.setState({ isSpinnerActive: false });
          console.error(error);
        });
    });
  };
  render(): React.ReactNode {
    return (
      <>
        <header className="header">
          <h1>
            POKEAPI Berry search (
            <a
              href="https://pokeapi.co/docs/v2#berries"
              target="_blank"
              rel="noreferrer"
            >
              Detailed info
            </a>
            )
          </h1>
          <SearchInput
            value={this.state.searchText}
            onChange={this.handleSearchText}
          />
          <SearchButton onClick={this.handleSubmitRequest} />
        </header>
        <main className="main">
          {this.state.errorTypeSearch === 404 ? (
            <div>
              404 not found. Sorry, but we did not find anything about your
              request
            </div>
          ) : (
            ''
          )}
          {this.state.isSpinnerActive ? <Spinner /> : ''}
          {this.state.searchData.map((el, id) => {
            return <DataComponent key={id} name={el.name} />;
          })}
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
