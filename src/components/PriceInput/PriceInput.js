import React from "react";

const PriceInput = ({ ...inputProps }) => {
  return (
    <div className="input-field col s12">
      <input id="amount" type="text" {...inputProps} />
      <span
        className="helper-text validate"
        data-error="Erreur"
        data-success="Valide"
      ></span>
      <label htmlFor="amount">Montant</label>
    </div>
  );
};

export default PriceInput;
