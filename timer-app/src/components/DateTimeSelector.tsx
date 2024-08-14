"use client";

import React, { useState, useEffect } from 'react';
import { Box, Text, Button, VStack, HStack, useBreakpointValue } from '@chakra-ui/react';
import DateInput from './DateInput';
import TimeInput from './TimeInput';
import ResultDisplay from './ResultDisplay';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import './DateTimeSelector.css'; // Import the CSS file

const DateTimeSelector: React.FC = () => {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(new Date().toTimeString().split(' ')[0].substring(0, 8));
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [dateStatus, setDateStatus] = useState<string>("");

  useEffect(() => {
    document.body.style.backgroundColor = '#1a202c'; // Dark background color
    document.body.style.color = 'white'; // Light text color for contrast
  }, []);

  const calculateTimeRemaining = () => {
    const now = new Date();
    const targetDateTime = new Date(`${date}T${time}`);
    const difference = targetDateTime.getTime() - now.getTime();

    const absDifference = Math.abs(difference);

    const totalSeconds = Math.floor(absDifference / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);
    const days = totalDays % 30; // Approximate months
    const months = Math.floor(totalDays / 30); // Approximate months
    const years = Math.floor(months / 12);

    const timeUnits = [
      { label: 'Years', value: years, icon: '📅' },
      { label: 'Months', value: months % 12, icon: '🗓️' },
      { label: 'Days', value: days, icon: '📆' },
      { label: 'Hours', value: hours, icon: '⏰' },
      { label: 'Minutes', value: minutes, icon: '⌛' },
      { label: 'Seconds', value: seconds, icon: '⏳' }
    ];

    const resultText = timeUnits
      .filter(unit => unit.value > 0)
      .map(unit => `${unit.icon} ${unit.value} ${unit.label}`)
      .join(', ');

    setTimeRemaining(resultText);

    if (difference < 0) {
      setDateStatus("Passed Date");
    } else {
      setDateStatus("Upcoming Date");
    }
  };

  useEffect(() => {
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [date, time]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleSubmit = () => {
    calculateTimeRemaining();
  };

  const maxW = useBreakpointValue({
    base: 'full',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl'
  });

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
        <HStack spacing={3} align="center" mb={6}>
          <TimeIcon w={8} h={8} color="orange.300" mt={8} />
          <TimeInput time={time} onChange={handleTimeChange} />
        </HStack>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color={dateStatus === "Passed Date" ? "red.400" : "green.400"}>
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
