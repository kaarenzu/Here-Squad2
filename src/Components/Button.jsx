import React from 'react';

class Button extends React.Component {
  render () {
    const styles = {
      color: this.props.color,
      background: this.props.background,
      id: this.props.id   
    }
    return (
      <button style={styles}>Crear Usuario</button>
    )
  }
}
export default Button;
