// src/components/DateInput.tsx
import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface DateInputProps {
  date: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ date, onChange }) => (
  <FormControl>
    <FormLabel htmlFor="date" fontSize="lg" fontWeight="semibold" color="orange.300">
      Date
    </FormLabel>
    <Input
      id="date"
      type="date"
      value={date}
      onChange={onChange}
      size="lg"
      borderRadius="md"
      borderColor="orange.300"
      _placeholder={{ color: 'gray.400' }}
      _focus={{ borderColor: 'orange.400', boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.5)' }}
      color="white"
      bg="gray.700"
    />
  </FormControl>
);

export default DateInput;
