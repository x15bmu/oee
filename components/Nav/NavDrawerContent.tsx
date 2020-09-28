import React from "react";
import Link from "next/link";
import TreeView from "devextreme-react/tree-view";
import styled from "styled-components";
import navigation, { NavigationItem } from "../../interfaces/navigation";

const NavDrawerContentTreeView = styled(TreeView)`
  background-color: #222d32;
  color: #fff;
  width: 200px;

  .dx-state-hover {
    color: unset;
  }

  .dx-treeview-item {
    padding-bottom: 12px;
    padding-left: 15px;
    padding-top: 12px;
  }

  /* Double class increases specificity so this gets priority in style sheet */
  .dx-treeview-node.dx-treeview-node {
    padding-right: 0;
  }

  .dx-item-content {
    text-align: left;
    padding-right: 16px;
  }

  .dx-treeview-node-is-leaf {
    background-color: #2c3b41;
    border-top: 1px solid #eeeeee1a;
    border-bottom: 1px solid #eeeeee1a;
  }
`;

const StyledA = styled.a`
  color: inherit;
  text-decoration: none;
`;

const renderNavTreeViewItem = (item: NavigationItem) => {
  if ("items" in item) {
    return (
      <div>
        {item.text} <i className={item.icon} />
      </div>
    );
  }
  return (
    <Link href={item.href} passHref>
      <StyledA>
        {item.text} <i className={item.icon} />
      </StyledA>
    </Link>
  );
};

/**
 * Internal to Nav module.
 * 
 * The drawer contents of the nav.
 */
const NavDrawerContent = () => {
  return (
    <NavDrawerContentTreeView
      items={navigation}
      expandEvent="click"
      rtlEnabled
      itemRender={renderNavTreeViewItem}
      focusStateEnabled={false}
    />
  );
};

export default NavDrawerContent;
