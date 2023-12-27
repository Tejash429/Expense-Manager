'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* <Button onPress={onOpen} color='danger'>
        Add Expense
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
              <ModalHeader className='flex flex-col gap-1'>
                Expense Form
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' type='submit' onPress={onClose}>
                  Login
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal> */}
      Login Page
    </>
  );
}
