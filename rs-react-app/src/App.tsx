import './App.css';
import React from 'react';
import { AppStateProps, ServerDataProps } from './interfaces/interfaces';
import ErrorButton from './Components/ErrorButton';
import Header from './Components/Header';
import Main from './Components/Main';

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
      }
      const result: Promise<ServerDataProps> = data.json();
      result
        .then((data2) => {
          this.setState({ isSpinnerActive: false });
          if (data2.smoothness) {
            this.setState({
              searchData: {
                name: data2.name,
                growth_time: data2.growth_time,
                size: data2.size,
                smoothness: data2.smoothness,
              },
            });
          } else if (data2.results) {
            this.setState({ searchData: data2.results });
          }
        })
        .catch((error) => {
          this.setState({ isSpinnerActive: false });
          console.error(error.message);
        });
    });
  };

  componentDidMount(): void {
    this.getData();
  }

  render(): React.ReactNode {
    return (
      <>
        <Header
          value={this.state.searchText}
          onChange={this.handleSearchText}
          onClick={this.handleSubmitRequest}
        />
        <Main
          errorTypeSearch={this.state.errorTypeSearch}
          isSpinnerActive={this.state.isSpinnerActive}
          searchData={this.state.searchData}
        />
        <footer className="footer">
          <ErrorButton />
        </footer>
      </>
    );
  }
}

export default App;
