import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default class Filter extends Component {
  render() {
    const {
      nameFilter,
      rareFilter,
      onInputChange,
      trunfoFilter,
      filterCards,
      removeCard,
    } = this.props;
    return (
      // Container de cards
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
            disabled={ trunfoFilter }
          />

          {/* Filtro de raridade */}
          <select
            data-testid="rare-filter"
            name="rareFilter"
            id="rareFilter"
            value={ rareFilter }
            onChange={ onInputChange }
            disabled={ trunfoFilter }
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>

          {/* Filtro de Super Trunfo */}
          <label htmlFor="cardTrunfo">
            <input
              type="checkbox"
              data-testid="trunfo-filter"
              name="trunfoFilter"
              id="trunfoFilter"
              onChange={ onInputChange }
              checked={ trunfoFilter }
            />
            Super Trybe Trunfo
          </label>
        </div>
        {filterCards(nameFilter, rareFilter, trunfoFilter).map((card) => (
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
    );
  }
}

Filter.propTypes = {
  nameFilter: PropTypes.string.isRequired,
  rareFilter: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  trunfoFilter: PropTypes.bool.isRequired,
  filterCards: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
};
