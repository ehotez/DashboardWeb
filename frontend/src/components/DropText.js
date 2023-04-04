import React, { useState } from "react";

const Dropdown = ({ options, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;