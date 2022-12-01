import React from 'react';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    description: '',
    attr1: 0,
    attr2: 0,
    attr3: 0,
    img: '',
    rarity: '',
    trunfo: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  render() {
    const {
      state: {
        cardName,
        description,
        attr1,
        attr2,
        attr3,
        img,
        rarity,
        trunfo,
      },
      handleChange,
    } = this;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          description={ description }
          handleChange={ handleChange }
          attr1={ attr1 }
          attr2={ attr2 }
          attr3={ attr3 }
          img={ img }
          rarity={ rarity }
          trunfo={ trunfo }
        />
      </div>
    );
  }
}

export default App;
