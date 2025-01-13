import { Box, Card, Heading, Image, Text, VStack } from "@chakra-ui/react";
import EventItem from "./EventItem";
import BirthdayItem from "./BirthdayItem";

const RightSidebar = () => {
    return (
        <VStack w="300px" h="100vh" p={4} borderLeft="1px" borderColor="gray.200" gap={6}>
            {/* Events Section */}
            <Box w="100%">
                <Heading size="sm" mb={4}>Your upcoming events</Heading>
                <VStack align="stretch" gap={3}>
                    <EventItem
                        title="Garden BBQ"
                        location="Tom's Garden"
                        date="Sat 16 June"
                    />
                    <EventItem
                        title="City Council Vote"
                        location="Town Hall"
                        date="Sat 16 June"
                    />
                    {/* Add more events */}
                </VStack>
            </Box>

            {/* Birthday Section */}
            <Box w="100%">
                <Heading size="sm" mb={4}>Birthdays</Heading>
                <VStack align="stretch">
                    <BirthdayItem
                        name="Bob Hammond"
                        age={28}
                        date="20 August"
                    />
                    {/* Add more birthdays */}
                </VStack>
            </Box>

            {/* Value Exchange Center */}
            <Box w="100%">
                <Heading size="sm" mb={4}>Value Exchange Center</Heading>
                <Card.Root>
                    <Card.Body>
                        <Image src="/laptop.jpg" borderRadius="md" mb={4} />
                        <Text fontSize="sm" color="gray.600">Transfer Interface</Text>
                    </Card.Body>
                </Card.Root>
            </Box>
        </VStack>
    );
};

export default RightSidebar;