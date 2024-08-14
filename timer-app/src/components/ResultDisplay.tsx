// src/components/ResultDisplay.tsx
import React from 'react';
import { Box, Text, Stack, VStack } from '@chakra-ui/react';

interface ResultDisplayProps {
  timeRemaining: string;
}

const timeUnitLetters: Record<string, string> = {
  Years: 'Y',
  Months: 'M',
  Days: 'D',
  Hours: 'H',
  Minutes: 'M',
  Seconds: 'S',
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ timeRemaining }) => {
  // Split the timeRemaining string by commas to create an array of results
  const timeUnits = timeRemaining.split(', ').map(item => {
    const [value, label] = item.split(' ').slice(-2);
    return { value, label };
  });

  return (
    <Box
      p={4}
      borderRadius="md"
      bg="gray.800"
      border="1px"
      borderColor="gray.700"
      boxShadow="md"
      color="white"
    >
      <VStack spacing={3} align="start">
        {timeUnits.map(({ value, label }, index) => (
          <Stack key={index} direction="row" align="center" spacing={3}>
            <Text fontSize="2xl" color="orange.300" fontWeight="bold">
              {timeUnitLetters[label] || label.charAt(0)}
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              {value} {label}
            </Text>
          </Stack>
        ))}
      </VStack>
    </Box>
  );
};

export default ResultDisplay;
