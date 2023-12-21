import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import Amount from './FormElements/amount';
import Date from './FormElements/date';
import Category from './FormElements/category';
import Payment from './FormElements/payment';
import Vendor from './FormElements/vendor';
import Description from './FormElements/description';

export default function ExpenseForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                EXpense Form
              </ModalHeader>
              <ModalBody>
                <Vendor />
                <Description />
                <div className='flex flex-row gap-4 '>
                  <Amount />
                  <Date />
                </div>
                <div className='flex flex-row gap-4 '>
                  <Category />
                  <Payment />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
