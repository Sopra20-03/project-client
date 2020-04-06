import styled from "styled-components";

const Button = styled.button`
  display: table-cell;
  vertical-align: middle;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background-color: #00a4ea;
  transition: all 0.3s ease;
  
`;

export default Button;
