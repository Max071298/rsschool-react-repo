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
  url?: string;
  growth_time?: number;
  size?: number;
  smoothness?: number;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface HeaderProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export interface MainProps {
  errorTypeSearch: number;
  isSpinnerActive: boolean;
  searchData: Array<TotalSearchData>;
}

export interface ServerDataProps {
  name?: string;
  growth_time?: number;
  size?: number;
  smoothness?: number;
  results?: Array<{ name: string; url: string }>;
}
