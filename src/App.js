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
    nameFilter: '',
    // rareFilter: '',
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

  normalize = (string) => string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

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
        nameFilter,
        // rareFilter,
      },
      onInputChange,
      onSaveButtonClick,
      removeCard,
      normalize,
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
        {/* Container de cards */}
        <div className="saved-cards-container">

          {/* Filtro de cards */}
          <div className="cards-filter">
            <span>Filtros de busca</span>

            {/* Filtro de nomes */}
            <input
              type="text"
              data-testid="name-filter"
              name="nameFilter"
              id="nameFilter"
              value={ nameFilter }
              onChange={ onInputChange }
            />

            {/* Filtro de raridade
            <select
              data-testid="rare-filter"
              name="rare-filter"
              id="rare-filter"
              onChange={ cardsListFilter }
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select> */}

            {/* Filtro de Super Trunfo */}
            {/* <label htmlFor="cardTrunfo">
              <input
                type="checkbox"
                data-testid="trunfo-filter"
                name="trunfo-filter"
                id="trunfo-filter"
                onChange={ cardsListFilter }
              />
              Super Trybe Trunfo
            </label> */}
          </div>
          {cardsList.filter((card) => normalize(card.cardName).includes(
            normalize(nameFilter),
          )).map((card) => (
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
              button
              removeCard={ removeCard }
            />
          ))}
        </div>

      </div>
    );
  }
}

export default App;
