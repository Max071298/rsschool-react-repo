import { TotalSearchData } from '../interfaces/interfaces';

const DataComponent = (props: TotalSearchData) => {
  return (
    <div className="result-box">
      <div>Name: {props.name}</div>
      <div className="result-box-description">
        {' '}
        <h3>Description</h3>
        {props.growth_time ? (
          <div>Growth time: {props.growth_time}</div>
        ) : (
          'Small fruit that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokémon'
        )}
        {props.size ? <div>Size: {props.size}</div> : ''}
        {props.smoothness ? <div>Smoothness: {props.smoothness}</div> : ''}
      </div>
    </div>
  );
};

export default DataComponent;
