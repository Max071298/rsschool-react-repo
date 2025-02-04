import { HeaderProps } from '../interfaces/interfaces';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

const Header = ({ value, onChange, onClick }: HeaderProps) => {
  return (
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
        <SearchInput value={value} onChange={onChange} />
        <SearchButton onClick={onClick} />
      </div>
    </header>
  );
};

export default Header;
