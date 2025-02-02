import './App.css';
import React from 'react';
import { AppStateProps } from './interfaces/interfaces';
import SearchInput from './Components/SearchInput';
import SearchButton from './Components/SearchButton';
import Spinner from './Components/Spinner';
import ErrorButton from './Components/ErrorButton';
import DataComponent from './Components/DataComponent';

class App extends React.Component {
  state: Readonly<AppStateProps> = {
    searchText: localStorage.getItem('lastSearch') ?? '',
    isSpinnerActive: false,
    errorTypeSearch:
      JSON.parse(localStorage.getItem('errorTypeSearch') as string) ?? 0,
    searchData: localStorage.getItem('searchData')
      ? JSON.parse(localStorage.getItem('searchData') as string)
      : [],
  };

  handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value.replace(/\s/g, '') });
  };

  handleSubmitRequest = () => {
    localStorage.setItem('lastSearch', this.state.searchText);
    this.setState({ errorTypeSearch: 0, searchData: [] });
    this.getData();
  };

  getData = () => {
    this.setState({ isSpinnerActive: true });
    fetch(`https://pokeapi.co/api/v2/berry/${this.state.searchText}`, {
      method: 'GET',
    }).then((data) => {
      if (data.status) {
        this.setState({ errorTypeSearch: data.status });
        localStorage.setItem('errorTypeSearch', JSON.stringify(data.status));
        localStorage.setItem('searchData', JSON.stringify([]));
      }
      const result = data.json();
      result
        .then((data2) => {
          this.setState({ isSpinnerActive: false });
          if (data2.smoothness) {
            const finalData = [
              {
                name: data2.name,
                growth_time: data2.growth_time,
                size: data2.size,
                smoothness: data2.smoothness,
              },
            ];
            this.setState({
              searchData: finalData,
            });
            localStorage.setItem('searchData', JSON.stringify(finalData));
          } else if (data2.results) {
            this.setState({ searchData: data2.results });
            localStorage.setItem('searchData', JSON.stringify(data2.results));
          }
        })
        .catch((error) => {
          this.setState({ isSpinnerActive: false });
          console.error(error.message);
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
            ) https://pokeapi.co/api/v2/berry/id or name/
          </h1>
          <div className="search">
            <SearchInput
              value={this.state.searchText}
              onChange={this.handleSearchText}
            />
            <SearchButton onClick={this.handleSubmitRequest} />
          </div>
        </header>
        <main className="main">
          <h2>Results</h2>
          {this.state.errorTypeSearch >= 400 &&
          this.state.errorTypeSearch < 500 ? (
            <div className="throwned-error">
              Bad request. Sorry, but we did not find anything about your
              request
            </div>
          ) : (
            ''
          )}
          {this.state.errorTypeSearch >= 500 ? (
            <div className="throwned-error">
              The server encountered an error and could not complete your
              request.
            </div>
          ) : (
            ''
          )}
          {this.state.isSpinnerActive ? <Spinner /> : ''}
          {this.state.searchData.map((el, id) => {
            return (
              <DataComponent
                key={id}
                name={el.name}
                growth_time={el.growth_time || undefined}
                size={el.size || undefined}
                smoothness={el.smoothness || undefined}
              />
            );
          })}
        </main>
        <footer className="footer">
          <ErrorButton />
        </footer>
      </>
    );
  }
}

export default App;
