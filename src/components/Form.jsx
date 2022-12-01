import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  submitButtonFunc = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      cardName,
      description,
      handleChange,
      attr1,
      attr2,
      attr3,
      img,
      rarity,
      trunfo,
    } = this.props;
    const { submitButtonFunc } = this;
    return (
      <div className="form">
        {/* Nome da carta */}
        <label htmlFor="cardName">
          Nome da carta:
          <input
            type="text"
            data-testid="name-input"
            name="cardName"
            id="cardName"
            value={ cardName }
            onChange={ handleChange }
          />
        </label>
        <br />

        {/* Descrição da carta */}
        <label htmlFor="description">
          Descrição:
          <textarea
            data-testid="description-input"
            name="description"
            id="description"
            value={ description }
            onChange={ handleChange }
          />
        </label>
        <br />

        {/* Primeiro atributo da carta. */}
        <label htmlFor="attr1">
          Primeiro atributo:
          <input
            type="number"
            data-testid="attr1-input"
            name="attr1"
            id="attr1"
            value={ attr1 }
            onChange={ handleChange }
          />
        </label>
        <br />

        {/* Segundo atributo da carta. */}
        <label htmlFor="attr2">
          Segundo atributo:
          <input
            type="number"
            data-testid="attr2-input"
            name="attr2"
            id="attr2"
            value={ attr2 }
            onChange={ handleChange }
          />
        </label>
        <br />

        {/* Terceiro atributo da carta. */}
        <label htmlFor="attr3">
          Terceiro atributo:
          <input
            type="number"
            data-testid="attr3-input"
            name="attr3"
            id="attr3"
            value={ attr3 }
            onChange={ handleChange }
          />
        </label>
        <br />

        {/* Imagem da carta. */}
        <label htmlFor="img">
          Link da imagem:
          <input
            type="text"
            data-testid="image-input"
            name="img"
            id="img"
            value={ img }
            onChange={ handleChange }
          />
        </label>
        <br />

        {/* Raridade da carta. */}
        <label htmlFor="rarity">
          Link da imagem:
          <select
            data-testid="rare-input"
            name="rarity"
            id="rarity"
            value={ rarity }
            onChange={ handleChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>
        <br />

        {/* É super Trunfo? */}
        <label htmlFor="trunfo">
          Essa carta é Super-trunfo?
          <input
            type="checkbox"
            data-testid="trunfo-input"
            name="trunfo"
            id="trunfo"
            value={ trunfo }
            onChange={ handleChange }
          />
        </label>
        <br />

        {/* Botão */}
        <button
          type="submit"
          data-testid="save-button"
          name="save"
          id="save"
          onClick={ submitButtonFunc }
        >
          Salvar
        </button>
        <br />

      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  attr1: PropTypes.number.isRequired,
  attr2: PropTypes.number.isRequired,
  attr3: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  rarity: PropTypes.string.isRequired,
  trunfo: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};
