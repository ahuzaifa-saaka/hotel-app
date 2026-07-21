import styled from "styled-components";
import { useState, useMemo } from "react";

const Wrapper = styled.div`
  position: relative;
`;

const List = styled.ul`
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  right: 0;
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  max-height: 18rem;
  overflow: auto;
  z-index: 50;
  list-style: none;
  margin: 0;
  padding: 0.4rem;
`;

const Item = styled.li`
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background: var(--color-brand-50);
    color: var(--color-brand-700);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  font-size: 1.4rem;
`;

function Autocomplete({ options = [], value, onChange, placeholder }) {
  const [query, setQuery] = useState(() => {
    if (!value) return "";
    const found = options.find((o) => o.value === value || o.label === value);
    return found ? found.label : value;
  });

  const filtered = useMemo(() => {
    if (!query) return options.slice(0, 10);
    return options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, query]);

  return (
    <Wrapper>
      <StyledInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />

      {filtered.length > 0 && (
        <List>
          {filtered.map((opt) => (
            <Item
              key={opt.value}
              onClick={() => {
                setQuery(opt.label);
                onChange(opt.value);
              }}
            >
              {opt.label}
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
}

export default Autocomplete;
