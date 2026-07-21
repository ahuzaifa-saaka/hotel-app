import styled from "styled-components";

const StyledSelect = styled.select`
  width: 100%;
  font-size: 1.3rem;
  min-height: 4rem;
  padding: 0 1rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, placeholder, value, onChange, ...props }) {
  return (
    <div>
      <StyledSelect value={value} onChange={onChange} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
}

export default Select;
