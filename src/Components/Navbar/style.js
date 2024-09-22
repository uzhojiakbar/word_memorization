import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #333;
  padding: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    color: #f0f0f0;
  }
`;

export { Nav, NavLink };
