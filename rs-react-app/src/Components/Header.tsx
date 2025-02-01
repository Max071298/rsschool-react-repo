import React from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <SearchInput />
        <SearchButton />
      </>
    );
  }
}

export default Header;
