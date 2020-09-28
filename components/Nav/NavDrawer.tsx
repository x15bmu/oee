import React, { PropsWithChildren } from "react";
import { Drawer } from "devextreme-react/drawer";
import NavDrawerContent from "./NavDrawerContent";

/** 
 * Internal to nav module.
 * 
 * A drawer for the nav.
 */
const NavDrawer = ({
  children,
  opened,
}: PropsWithChildren<{ opened: boolean }>) => {
  return (
    <Drawer
      minSize={50}
      opened={opened}
      openedStateMode="shrink"
      render={() => <NavDrawerContent />}
      revealMode="slide"
    >
      {children}
    </Drawer>
  );
};

export default NavDrawer;
