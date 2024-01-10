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
import NextLink from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function ExpenseForm() {
  const { onOpen, onOpenChange } = useDisclosure();
  const isOpen = true;

  return (
    <>
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
                Create your Account
              </ModalHeader>
              <ModalBody>
                <Button className='mb-1 bg-white font-medium hover:bg-gray-200  text-base p-5 text-black'>
                  <FcGoogle size={22} />
                  Continue with Google
                </Button>
                <Button className=' bg-white font-medium hover:bg-gray-200  text-base p-5 text-black'>
                  <FaGithub size={22} />
                  Continue with GitHub
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
                  href='login'
                  className='text-sm text-accent w-fit'
                  underline='hover'
                >
                  Already have an account?
                </Link>
                <Button type='submit' className='bg-primary font-medium '>
                  Register
                </Button>
                <div className='flex justify-center gap-2 mb-2'>
                  <p className='text-center text-sm'>
                    Already have an Account?
                  </p>
                  <Link
                    as={NextLink}
                    color='primary'
                    className='cursor-pointer text-sm text-accent'
                    underline='hover'
                    onPress={onClose}
                    href='/login'
                  >
                    Login
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
