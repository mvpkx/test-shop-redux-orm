import React, {PropsWithChildren} from 'react';
import TopBar from './top-bar/top-bar';
import SideBar from './side-bar/side-bar';
import Footer from './footer/footer';

export default function Layout({children}: PropsWithChildren): JSX.Element {
  return (
    <>
      <SideBar>
        <TopBar>{children}</TopBar>
      </SideBar>
      <Footer />
    </>
  );
}
