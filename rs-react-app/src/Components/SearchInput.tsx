import { SearchInputType } from '../interfaces/interfaces';

const SearchInput: React.FC<SearchInputType> = ({
  onChange,
  value,
}: SearchInputType) => {
  return (
    <input
      type="search"
      className="search-input"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
