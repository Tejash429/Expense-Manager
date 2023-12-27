'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Link,
} from '@nextui-org/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function ExpenseForm() {
  const { onOpen, onOpenChange } = useDisclosure();
  const isOpen = true;

  return (
    <>
      <Button onPress={onOpen} color='danger'>
        Login
      </Button>

      <Modal
        backdrop='blur'
        placement='center'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className='block text-center'>
                Login to your account
              </ModalHeader>
              <ModalBody>
                <Button className='mb-1 bg-white font-medium text-base p-5 text-black'>
                  <FcGoogle size={22} />
                  Login with Google
                </Button>
                <Button className=' bg-white font-medium text-base p-5 text-black'>
                  <FaGithub size={22} />
                  Login with GitHub
                </Button>

                <p className='text-center text-sm'>or continue with email</p>

                <Input
                  type='email'
                  label='Emial Address'
                  placeholder='Enter your email address'
                  labelPlacement='outside'
                  name='email'
                  className='font-medium'
                  required
                />

                <Input
                  type='password'
                  label='Password'
                  placeholder='********'
                  labelPlacement='outside'
                  name='email'
                  className='font-medium'
                  required
                />
                <Link
                  href='#'
                  className='text-sm text-accent w-fit'
                  underline='hover'
                >
                  Forgot Password?
                </Link>
                <Button type='submit' className='bg-primary font-medium '>
                  Login
                </Button>
                <div className='flex justify-center gap-2 mb-2'>
                  <p className='text-center text-sm'>
                    Do you have an account yet?
                  </p>
                  <Link
                    color='primary'
                    className='cursor-pointer text-sm text-accent'
                    underline='hover'
                    onPress={onClose}
                  >
                    Register
                  </Link>
                </div>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
