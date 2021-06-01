import styled from "styled-components";

const CartContainer = styled.div`
  background: transparent;

  height: 100%;
  display: flex;
  flex-flow: column;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default CartContainer;
