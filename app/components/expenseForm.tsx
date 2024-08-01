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
import Amount from './FormElements/amount';
import Date from './FormElements/date';
import Category from './FormElements/category';
import Payment from './FormElements/payment';
import Vendor from './FormElements/vendor';
import { addExpense } from '../actions';
import toast from 'react-hot-toast';

const notify = () => toast.success('Expense Added.');

export default function ExpenseForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className='bg-[#F44336]'>
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
            <form action={addExpense} className='bg-[#1E1E1E]'>
              <ModalHeader className='flex flex-col gap-1'>
                Expense Form
              </ModalHeader>
              <ModalBody>
                <Vendor />
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
                <Button
                  color='primary'
                  type='submit'
                  onClick={notify}
                  onPress={onClose}
                >
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
