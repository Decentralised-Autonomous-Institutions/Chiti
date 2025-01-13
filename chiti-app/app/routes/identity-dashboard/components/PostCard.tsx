import { Button, Card, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Avatar } from "~/components/ui/avatar";

interface PostCardProps {
    title: string;
    subtitle: string;
    content: string;
    imageUrl?: string;
    images?: string[];
    likes: number;
    comments: number;
}


// Utility Components
const PostCard: React.FC<PostCardProps> = ({ title, subtitle, content, imageUrl, images, likes, comments }) => {
    return (
        <Card.Root>
            <Card.Body>
                <HStack mb={4}>
                    <Avatar size="sm" name={"Airesh Bhat"} />
                    <VStack align="start" gap={0}>
                        <Text fontWeight="bold">{title}</Text>
                        <Text fontSize="sm" color="gray.500">{subtitle}</Text>
                    </VStack>
                </HStack>

                <Text mb={4}>{content}</Text>

                {imageUrl && <Image src={imageUrl} borderRadius="md" mb={4} />}
                {images && (
                    <HStack gap={2} mb={4}>
                        {images.map((img, i) => (
                            <Image key={i} src={img} w="100px" h="100px" borderRadius="md" />
                        ))}
                    </HStack>
                )}

                <HStack gap={4}>
                    <Button variant="ghost">Like ({likes})</Button>
                    <Button variant="ghost">Comment ({comments})</Button>
                    <Button variant="ghost">Share</Button>
                </HStack>
            </Card.Body>
        </Card.Root>
    );
};

export default PostCard;