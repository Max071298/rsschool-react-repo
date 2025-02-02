import { DataComponentProps } from '../interfaces/interfaces';

const DataComponent = (props: DataComponentProps) => {
  return <div>{props.name}</div>;
};

export default DataComponent;
