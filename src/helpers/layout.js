import styled from "styled-components";

export const DESKTOP_WIDTH = 1160;
export const SMALL_LAPTOPS_WIDTH = 970;
export const TABLETS_WIDTH = 750;
export const SMALL_WIDTH = 768;

export const BaseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%
`;

export const LoginContainer = styled.div`
  margin-top: 2em;
  left: 15em;
  --webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 5px 5px 5px 5px;
  background: #ffffff;
  padding: 1.2rem;
  width: 35%;
  position: relative;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const GameContainer = styled.div`
  margin-top: 2em;
  --webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 5px 5px 5px 5px;
  background: #ffffff;
  padding: 1.2rem;
  width: 75%;
  position: relative;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  text-align: center;
`;
