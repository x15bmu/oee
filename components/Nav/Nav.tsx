import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Item, Toolbar } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import NavDrawer from "./NavDrawer";

// TODO: Consider not creating the global style here. Maybe this should be the concern of the parents?
const GlobalStyle = createGlobalStyle`
    html, body, #__next {
        height: 100vh;
        margin: 0;
    }
`;

const NavToolbar = styled(Toolbar)`
  background-color: #3c8dbc;
  padding: 5px 10px;

  /* Styling for all icons in the navbar. */
  .dx-icon {
    color: #fff;
  }
`;

const NavDrawerContainer = styled.div`
  height: calc(100% - 46px);
`;

/**
 * Adds a navbar with a toolbar and a drawer to the react application.
 * All main app contents should be children of this component.
 */
const Nav = ({ children }: React.PropsWithChildren<{}>) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <GlobalStyle />
      <NavToolbar>
        <Item location="before">
          <Button
            icon="menu"
            stylingMode="text"
            onClick={() => {
              setDrawerOpen(!isDrawerOpen);
            }}
          />
        </Item>
      </NavToolbar>
      <NavDrawerContainer>
        <NavDrawer opened={isDrawerOpen}>{children}</NavDrawer>
      </NavDrawerContainer>
    </>
  );
};

export default Nav;
