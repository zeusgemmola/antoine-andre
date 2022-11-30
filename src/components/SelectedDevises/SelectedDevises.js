import React from "react";

const SelectedDevises = ({ label, ...selectProps }) => {
  const options = [
    { value: "EUR", text: "EUR" },
    { value: "CHF", text: "CHF" },
    { value: "GBP", text: "GBP" },
    { value: "USD", text: "USD" }
  ];
  return (
    <>
      <label>{label}</label>
      <select
        className="browser-default"
        name="inputDevises"
        id="inputDevises"
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectedDevises;
