import { HStack, VStack, Box, Text } from "@chakra-ui/react";

interface EventItemProps {
  title: string;
  location: string;
  date: string;
}

const EventItem: React.FC<EventItemProps> = ({ title, location, date }) => {
  return (
    <HStack>
      <Box p={2} bg="gray.100" borderRadius="md">
        <Text fontSize="sm">{date.split(" ")[1]}</Text>
      </Box>
      <VStack align="start" gap={0}>
        <Text fontWeight="medium">{title}</Text>
        <Text fontSize="sm" color="gray.500">
          {location}
        </Text>
      </VStack>
    </HStack>
  );
};

export default EventItem;
