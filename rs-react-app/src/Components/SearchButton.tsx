import { SearchButtonType } from '../interfaces/interfaces';

const SearchButton: React.FC<SearchButtonType> = ({
  onClick,
}: SearchButtonType) => {
  return (
    <button type="button" className="search-button" onClick={onClick}>
      Search
    </button>
  );
};

export default SearchButton;
