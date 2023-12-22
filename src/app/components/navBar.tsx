import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';

export default function App() {
  return (
    <Navbar className='bg-[#232122]'>
      <NavbarBrand>
        <p className='font-bold text-inherit'>MoneyMinder</p>
      </NavbarBrand>

      <NavbarContent justify='end'>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='flat'>
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
