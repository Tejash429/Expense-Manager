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

import IncomeSource from './FormElements/incomeSource';
import { addIncome } from '../actions';

export default function IncomeForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = () => {
    console.log('Clicked');
  };
  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Add Income
      </Button>
      <Modal
        backdrop='blur'
        placement='center'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form action={addIncome} onSubmit={handleSubmit}>
              <ModalHeader className='flex flex-col gap-1'>
                Income Form
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-row gap-4 '>
                  <Amount />
                  <Date />
                </div>
                <IncomeSource />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' type='submit' onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
