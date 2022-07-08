import React from "react";

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;

    align-self: flex-start;

    padding: 1rem 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;

    // 40em == 640px
    @media only screen and (max-width: 40em) {
      position: fixed;
      width: 100vw;
      bottom: 0;
    }
  `,
  // ...
};

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 3rem;
    position: relative;
    font-size: 12px;

    display: none;

    @media only screen and (max-width: 40em) {
      display: block;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25%;
    }
  `,
  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: black;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `,
};

function NavBar() {
  return (
    <Styles.Wrapper>
      <CSSReset />

      <Navbar.Wrapper>
        <Navbar.Logo>Logo</Navbar.Logo>

        <HamburgerButton.Wrapper>
          <HamburgerButton.Lines />
        </HamburgerButton.Wrapper>

        <Navbar.Items>
          <Navbar.Item>Home</Navbar.Item>
          <Navbar.Item>Blog</Navbar.Item>
          <Navbar.Item>About</Navbar.Item>
        </Navbar.Items>
      </Navbar.Wrapper>
    </Styles.Wrapper>
  );
}

export default NavBar;
