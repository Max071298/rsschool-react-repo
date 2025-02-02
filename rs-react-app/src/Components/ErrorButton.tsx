import React from 'react';

class ErrorButton extends React.Component {
  state: Readonly<{ error: boolean }> = {
    error: false,
  };
  handleClick = () => {
    this.setState({ error: true });
  };

  render(): React.ReactNode {
    if (this.state.error) {
      throw new Error('Test error');
    }
    return (
      <button type="button" onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
