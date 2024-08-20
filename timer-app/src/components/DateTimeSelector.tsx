"use client";

import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack, useBreakpointValue } from '@chakra-ui/react';
import DateInput from './DateInput';
import ResultDisplay from './ResultDisplay';
import { CalendarIcon } from '@chakra-ui/icons';
import './DateTimeSelector.css'; // Import the CSS file

const DateTimeSelector: React.FC = () => {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    document.body.style.backgroundColor = '#1a202c'; // Dark background color
    document.body.style.color = 'white'; // Light text color for contrast
  }, []);

  function useChosenDate(chosenDate:string) : Date{
    const timeMidnight='00:00:00';
        return new Date(`${chosenDate}T${timeMidnight}`);
  }


  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const difference = Math.abs(useChosenDate(date).getTime() - now);

    const units = [
        { label: 'Years', value: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)), icon: '📅' },
        { label: 'Months', value: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)) % 12, icon: '🗓️' },
        { label: 'Days', value: Math.floor(difference / (1000 * 60 * 60 * 24)) % 30, icon: '📆' },
        { label: 'Hours', value: Math.floor(difference / (1000 * 60 * 60)) % 24, icon: '⏰' },
        { label: 'Minutes', value: Math.floor(difference / (1000 * 60)) % 60, icon: '⌛' },
        { label: 'Seconds', value: Math.floor(difference / 1000) % 60, icon: '⏳' }
    ];

    const resultText = units
        .filter(unit => unit.value > 0)
        .map(unit => `${unit.icon} ${unit.value} ${unit.label}`)
        .join(', ');

    setTimeRemaining(resultText);
};


  useEffect(() => {
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [date]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };


  const maxW = useBreakpointValue({
    base: 'full',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl'
  });
   
  function getDateStatus(targetDate:Date): string  
  {
    const currentDate=new Date();

    if  (targetDate>currentDate){
      return 'Upcoming Date';
    }
    else if (targetDate.getDate() == currentDate.getDate())
    {
      return 'Current Date';
    }
    return 'Passed Date';
  }  


   const targetDate= useChosenDate(date);
   const dateStatus=getDateStatus(targetDate);

  return (
    <Box className="date-time-selector-container" maxW={maxW}>
      <VStack spacing={4} align="center" mb={6}>
        <Text className="date-time-selector-header-text">Timer App</Text>
        <Text className="date-time-selector-subtext">
          Choose a date and time to see the remaining or elapsed time.
        </Text>
      </VStack>
      <VStack spacing={6} align="stretch">
        <HStack spacing={3} align="center" mb={4}>
          <CalendarIcon w={8} h={8} color="orange.300" mt={8} />
          <DateInput date={date} onChange={handleDateChange} />
        </HStack>
         <Text fontSize="2xl" fontWeight="bold" textAlign="center" 
         color={
          dateStatus === "Passed Date" ?
           "red.400" : 
            dateStatus === "Current Date"
            ? "blue.400" : 
            " green.400"
          }>
          {dateStatus}
        </Text>
        {timeRemaining && <ResultDisplay timeRemaining={timeRemaining} />}
      </VStack>
      <Box className="date-time-selector-footer">
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} VladiHack. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default DateTimeSelector;
