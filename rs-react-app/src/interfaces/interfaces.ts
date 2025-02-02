export interface SearchButtonType {
  onClick: () => void;
}

export interface SearchInputType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface HeaderStateProps {
  searchText: string;
}
