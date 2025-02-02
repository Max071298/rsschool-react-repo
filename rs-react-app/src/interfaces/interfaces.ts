export interface SearchButtonType {
  onClick: () => void;
}

export interface SearchInputType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface AppStateProps {
  searchText: string;
  isSpinnerActive: boolean;
  errorTypeSearch: number;
  searchData: Array<TotalSearchData>;
}

export interface TotalSearchData {
  name: string;
  url: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface DataComponentProps {
  name?: string;
}
