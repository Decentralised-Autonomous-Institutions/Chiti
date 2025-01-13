import { Box, Button, Card, CardBody, HStack, IconButton, Input, VStack } from "@chakra-ui/react";
import { Avatar } from "~/components/ui/avatar";
import PostCard from "./PostCard";
import { Paperclip, Link2, MapPin, Smile } from "lucide-react";

const Feed = () => {
    return (
        <Box flex={1} p={4}>
            <Input
                placeholder="Enter your decentralized identity here"
                mb={4}
                size="lg"
            />

            {/* Post Creation Card */}
            <Card.Root mb={4}>
                <Card.Body>
                    <HStack gap={4}>
                        <Avatar size="sm" />
                        <Input placeholder="What" />
                    </HStack>
                    <HStack mt={4} gap={4}>
                        <IconButton aria-label="Attach" ><Paperclip /></IconButton>
                        <IconButton aria-label="Link" ><Link2 /></IconButton>
                        <IconButton aria-label="Location" ><MapPin /></IconButton>
                        <IconButton aria-label="Emoji" ><Smile /></IconButton>
                        <Button ml="auto">Post</Button>
                    </HStack>
                </Card.Body>
            </Card.Root>

            {/* Posts */}
            <VStack gap={4} align="stretch">
                <PostCard
                    title="New User Onboarding Available"
                    subtitle="Quick Access to Knowledge Base for New Users"
                    content="Welcome to the App! Login with your decentralized identity to get started. If you're new here, we have an onboarding option available to help you get started. Check out our knowledge base for..."
                    imageUrl="/mountains.jpg"
                    likes={230}
                    comments={5}
                />

                <PostCard
                    title="Photo Album"
                    subtitle="Thursday, 17 August 10:40 AM"
                    content="I'm selling these clothes. Anyone interested? Or shall we do a swap evening at mine? 😊"
                    images={["/clothes1.jpg", "/clothes2.jpg", "/clothes3.jpg"]}
                    likes={18}
                    comments={2}
                />
            </VStack>
        </Box>
    );
};

export default Feed;