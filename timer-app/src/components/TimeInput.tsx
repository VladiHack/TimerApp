// src/components/TimeInput.tsx
import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface TimeInputProps {
  time: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ time, onChange }) => (
  <FormControl>
    <FormLabel htmlFor="time" fontSize="lg" fontWeight="semibold" color="orange.300">
      Time
    </FormLabel>
    <Input
      id="time"
      type="time"
      value={time}
      onChange={onChange}
      step="1"
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

export default TimeInput;
