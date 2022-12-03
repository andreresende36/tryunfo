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
      hasTrunfo: prevState.cardsList.some((card) => card.cardTrunfo === true)
        ? true : !!prevState.cardTrunfo,
      cardsList: [...prevState.cardsList, prevState],
    }), () => {
      this.setState({ cardTrunfo: false });
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

  removeCard = ({ target }) => {
    const cardName = target.parentElement.firstChild.innerHTML;

    this.setState((prevState) => ({
      cardsList: prevState.cardsList.filter((card) => card.cardName !== cardName),
    }), () => {
      const { cardsList } = this.state;
      this.setState(() => ({
        hasTrunfo: cardsList.some((item) => item.cardTrunfo === true),
      }));
    });
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
      removeCard,
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
          button={ false }
          removeCard={ removeCard }
        />
        {/* Lista de cards */}
        {cardsList.map((card, index) => (
          <Card
            key={ card.cardName }
            cardName={ card.cardName }
            cardDescription={ card.cardDescription }
            cardAttr1={ card.cardAttr1 }
            cardAttr2={ card.cardAttr2 }
            cardAttr3={ card.cardAttr3 }
            cardImage={ card.cardImage }
            cardRare={ card.cardRare }
            cardTrunfo={ card.cardTrunfo }
            id={ `card${index}` }
            button
            removeCard={ removeCard }
          />
        ))}

      </div>
    );
  }
}

export default App;
