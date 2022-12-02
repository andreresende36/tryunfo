import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cardsList: [],
  };

  onSaveButtonClick = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      hasTrunfo: !!prevState.cardTrunfo,
      cardsList: [...prevState.cardsList,
        { savedCardName: prevState.cardName,
          savedCardDescription: prevState.cardDescription,
          savedCardAttr1: prevState.cardAttr1,
          savedCardAttr2: prevState.cardAttr2,
          savedCardAttr3: prevState.cardAttr3,
          savedCardImage: prevState.cardImage,
          savedCardRare: prevState.cardRare,
          savedCardTrunfo: prevState.cardTrunfo }],
    }), () => {
      const { cardsList } = this.state;
      this.setState({ cardTrunfo: false });
      console.log(cardsList);
    });
  };

  checkEnablingButton = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const ninety = 90;
    const maximumAttr = 210;
    const numberAttr1 = Number(cardAttr1);
    const numberAttr2 = Number(cardAttr2);
    const numberAttr3 = Number(cardAttr3);

    if (
      cardName !== ''
      && cardDescription !== ''
      && cardImage !== ''
      && cardRare !== ''
      && numberAttr1 <= ninety
      && numberAttr1 >= 0
      && numberAttr2 <= ninety
      && numberAttr2 >= 0
      && numberAttr3 <= ninety
      && numberAttr3 >= 0
      && (numberAttr1 + numberAttr2 + numberAttr3) <= maximumAttr) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.checkEnablingButton);
  };

  render() {
    const {
      state: {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
        hasTrunfo,
        isSaveButtonDisabled,
        cardsList,
      },
      onInputChange,
      onSaveButtonClick,
    } = this;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ onInputChange }
          onSaveButtonClick={ onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        {/* Lista de cards */}
        { cardsList.map((card) => {
          const {
            savedCardName,
            savedCardDescription,
            savedCardAttr1,
            savedCardAttr2,
            savedCardAttr3,
            savedCardImage,
            savedCardRare,
            savedCardTrunfo,
          } = card;
          return (
            <Card
              key={ savedCardName }
              cardName={ savedCardName }
              cardDescription={ savedCardDescription }
              cardAttr1={ savedCardAttr1 }
              cardAttr2={ savedCardAttr2 }
              cardAttr3={ savedCardAttr3 }
              cardImage={ savedCardImage }
              cardRare={ savedCardRare }
              cardTrunfo={ savedCardTrunfo }
            />
          );
        })}

      </div>
    );
  }
}

export default App;
