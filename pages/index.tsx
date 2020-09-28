import React from "react";
import Nav from "../components/Nav";
import withAuthServerSideProps from "../components/withAuth";

export const getServerSideProps = withAuthServerSideProps();

export default function IndexPage() {
  // TODO: Render some default home page, or just render the login page here. Up to you!
  return <Nav>Hello world!</Nav>;
}
