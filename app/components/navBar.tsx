'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';

export default function NavBar() {
  return (
    <Navbar className='bg-[#1E1E1E]' maxWidth='full'>
      <NavbarBrand>
        <p className='font-bold text-inherit tablet:text-2xl  mobile:text-xl'>
          MoneyMinder
        </p>
      </NavbarBrand>

      <NavbarContent justify='end'>
        <NavbarItem>
          {/* <Button as={Link} color='primary'> */}
          <Button as={Link} className='bg-[#6200EE]'>
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
