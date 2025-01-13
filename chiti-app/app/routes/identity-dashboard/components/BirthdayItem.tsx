import React from 'react';
import { HStack, VStack, Text } from "@chakra-ui/react";
import { Avatar } from "~/components/ui/avatar";

interface BirthdayItemProps {
  name: string;
  age: number;
  date: string;
}

const BirthdayItem: React.FC<BirthdayItemProps> = ({ name, age, date }) => {
  return (
    <HStack>
      <Avatar size="sm" />
      <VStack align="start" gap={0}>
        <Text fontWeight="medium">{name}</Text>
        <Text fontSize="sm" color="gray.500">
          Turning {age} years old
        </Text>
      </VStack>
    </HStack>
  );
};

export default BirthdayItem;
