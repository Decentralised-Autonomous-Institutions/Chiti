import { VStack, Heading, Box } from "@chakra-ui/react";
import { Button } from "~/components/ui/button";

const Sidebar = () => {
    return (
        <Box rounded="md" borderWidth="1px" borderColor="#cdd9d4" boxSizing="border-box" >
            <VStack
                w="250px" h="100vh" p={4} borderRight="1px" borderColor="black.200" bg="white"
                position="sticky"
                top={0}
                gap={6}>
                <Heading size="md" mb={6}>Chiti</Heading>

                <VStack gap={2} align="stretch" w="100%">
                    <Button variant="solid" justifyContent="start">Home</Button>
                    <Button variant="ghost" justifyContent="start">Explore</Button>
                    <Button variant="ghost" justifyContent="start">Activities</Button>
                    <Button variant="ghost" justifyContent="start">Connections</Button>
                    <Button variant="ghost" justifyContent="start">Profile</Button>
                </VStack>

                <Button mt="auto" colorScheme="red" w="100%">Sign out</Button>
            </VStack>
        </Box>
    );
};

export default Sidebar;