import styled from "styled-components";

/** Wrapper which provides styling for all filters. */
const FilterWrapper = styled.div`
  box-shadow: 0 1px 3px 0 rgba(21, 27, 38, 0.15);
  display: flex;
  margin: 0 auto;
  padding: 5px;

  > * {
    margin: 5px;
  }

  .dx-widget {
    font-size: 11px;
  }
`;

export default FilterWrapper;
