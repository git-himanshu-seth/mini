import PropTypes from "prop-types";
import "../assets/styles/dropdown.styles.css";

const Dropdown = ({ options, onSelect, isDisabled, value, claseName }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue);
  };

  return (
    <select
      className={claseName ? claseName : "dropdown"}
      onChange={handleChange}
      value={value}
      disabled={isDisabled}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  value: PropTypes.string,
  claseName: PropTypes.string,
};

export default Dropdown;
