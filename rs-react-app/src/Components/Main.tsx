import { MainProps } from '../interfaces/interfaces';
import DataComponent from './DataComponent';
import Spinner from './Spinner';

const Main = ({ errorTypeSearch, isSpinnerActive, searchData }: MainProps) => {
  return (
    <main className="main">
      <h2>Results</h2>
      {errorTypeSearch >= 400 && errorTypeSearch < 500 ? (
        <div className="throwned-error">
          Bad request. Sorry, but we did not find anything about your request
        </div>
      ) : (
        ''
      )}
      {errorTypeSearch >= 500 ? (
        <div className="throwned-error">
          The server encountered an error and could not complete your request.
        </div>
      ) : (
        ''
      )}
      {isSpinnerActive ? <Spinner /> : ''}
      {searchData.map((el, id) => {
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
  );
};

export default Main;
