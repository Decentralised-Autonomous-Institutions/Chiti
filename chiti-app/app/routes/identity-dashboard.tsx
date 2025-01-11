import type { Route } from "./+types/identity-dashboard";
import {
    Box,
    Field,
    Container,
    Grid,
    Heading,
    Text,
    Input,
    Stack,
    Card,
    Flex,
    IconButton,
    defineStyle,
    useDisclosure,
} from '@chakra-ui/react';
// Import changes at the top of the file
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer"
import { useColorMode } from '../components/ui/color-mode';
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Edit, Key, Lock, Shield, User, Settings } from 'lucide-react';
import { Tag } from "~/components/ui/tag";
import { useEffect } from "react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Identity Dashboard" },
        { name: "identity-dashboard", content: "Identity Dashboard" },
    ];
}

interface IdentityDashboardProps {
    identity: {
        did: string;
        name: string;
        avatar?: string;
        status: 'active' | 'pending' | 'revoked';
        verifiedCredentials: Array<{
            id: string;
            type: string;
            issuer: string;
            issuanceDate: string;
        }>;
        devices: Array<{
            id: string;
            name: string;
            lastUsed: string;
            type: 'mobile' | 'desktop' | 'browser';
        }>;
    }
}

const defaultIdentity = {
    did: 'abcd:abcd:abcd',
    name: 'Anonymous User',
    avatar: '/images/icons/avatar.webp',
    status: 'pending' as const,
    verifiedCredentials: [],
    devices: [],
};

// Updated floating styles to match Chiti theme tokens
const floatingStyles = defineStyle({
    pos: "absolute",
    bg: {
        base: "tokens.colors.background.DEFAULT.value",
        _dark: "tokens.colors.neutral.DEFAULT.value"
    },
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "medium",
    fontSize: "sm",
    pointerEvents: "none",
    transition: "all 0.2s ease-in-out",
    _peerPlaceholderShown: {
        color: "tokens.colors.border.DEFAULT.value",
        top: "2.5",
        insetStart: "3",
        fontSize: "md",
    },
    _peerFocusVisible: {
        color: "tokens.colors.blue.DEFAULT.value",
        top: "-3",
        insetStart: "2",
        fontSize: "sm",
    }
});

const IdentityDashboard: React.FC<IdentityDashboardProps> = ({ identity = defaultIdentity }) => {
    const { open, onOpen, onClose } = useDisclosure();

    const { setColorMode } = useColorMode();

    // Set light mode
    useEffect(() => {
        setColorMode('light');
    }, []);

    return (
        <Container maxW="container.xl" py={8} bg="tokens.colors.background.DEFAULT.value">
            <Grid
                templateColumns={{ base: "1fr", md: "1fr 2fr" }}
                gap={6}
                w="full"
            >
                {/* Identity Profile Section */}
                <Card.Root bg="white" borderRadius="xl" shadow="sm">
                    <Card.Header>
                        <Flex justify="space-between" align="center" px={4} py={3}>
                            <Heading size="md">Identity Profile</Heading>
                            <IconButton
                                aria-label="Edit profile"
                                variant="ghost"
                            ><Edit className="h-4 w-4" /></IconButton>
                        </Flex>
                    </Card.Header>
                    <Card.Body>
                        <Stack gap={4} align="center" px={4} py={3}>
                            <Avatar
                                size="sm"
                                name={identity.name}
                                src={identity.avatar}
                            />
                            <Stack gap={2} align="center">
                                <Heading size="md">{identity.name}</Heading>
                                <Text color="tokens.colors.border.DEFAULT.value">
                                    {identity.did}
                                </Text>
                                <Tag
                                    variant="subtle"
                                    colorScheme={
                                        identity.status === 'active' ? 'success' :
                                            identity.status === 'pending' ? 'warning' : 'error'
                                    }
                                >
                                    {identity.status.toUpperCase()}
                                </Tag>
                            </Stack>
                            <Button
                                variant="outline"
                                w="full"
                            >
                                <Key className="h-4 w-4" /> Manage Keys
                            </Button>
                        </Stack>
                    </Card.Body>
                </Card.Root>

                {/* Verified Credentials Section */}
                <Stack gap={6}>
                    <Card.Root bg="white" borderRadius="xl" shadow="sm">
                        <Card.Header>
                            <Flex justify="space-between" align="center" px={4} py={3}>
                                <Heading size="md">Verified Credentials</Heading>
                                <Button
                                    variant="ghost"
                                >
                                    <Shield className="h-4 w-4" /> Add Credential
                                </Button>
                            </Flex>
                        </Card.Header>
                        <Card.Body>
                            <Stack gap={4} px={4} py={3}>
                                {identity.verifiedCredentials.map(cred => (
                                    <Box
                                        key={cred.id}
                                        p={4}
                                        borderWidth="1px"
                                        borderColor="tokens.colors.border.DEFAULT.value"
                                        borderRadius="lg"
                                    >
                                        <Flex justify="space-between" align="center">
                                            <Stack gap={1}>
                                                <Text fontWeight="medium">{cred.type}</Text>
                                                <Text color="tokens.colors.border.DEFAULT.value">
                                                    Issued by {cred.issuer} on {new Date(cred.issuanceDate).toLocaleDateString()}
                                                </Text>
                                            </Stack>
                                            <IconButton
                                                aria-label="View credential"
                                                variant="ghost"
                                            ><Lock className="h-4 w-4" /></IconButton>
                                        </Flex>
                                    </Box>
                                ))}
                            </Stack>
                        </Card.Body>
                    </Card.Root>

                    {/* Connected Devices Section */}
                    <Card.Root bg="white" borderRadius="xl" shadow="sm">
                        <Card.Header>
                            <Flex 
                                justify="space-between" 
                                align="center" 
                                px={6} 
                                py={4}
                                borderBottom="1px"
                                borderColor="gray.100"
                            >
                                <Heading size="md" color="gray.900">Connected Devices</Heading>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    colorScheme="gray"
                                >
                                    <Settings size={16} /> Manage Devices
                                </Button>
                            </Flex>
                        </Card.Header>
                        
                        <Card.Body p={6}>
                            <Stack gap={4}>
                                {identity.devices.map(device => (
                                    <Box
                                        key={device.id}
                                        p={4}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        _hover={{ borderColor: "gray.300" }}
                                        transition="all 0.2s"
                                    >
                                        <Flex justify="space-between" align="center">
                                            <Stack gap={1}>
                                                <Text 
                                                    fontWeight="semibold" 
                                                    color="gray.900"
                                                >
                                                    {device.name}
                                                </Text>
                                                <Text 
                                                    fontSize="sm" 
                                                    color="gray.500"
                                                >
                                                    Last used {new Date(device.lastUsed).toLocaleString()}
                                                </Text>
                                            </Stack>
                                            <Tag
                                                size="sm"
                                                variant="subtle"
                                                colorScheme={
                                                    device.type === 'mobile' ? 'green' :
                                                    device.type === 'desktop' ? 'blue' : 'purple'
                                                }
                                            >
                                                {device.type}
                                            </Tag>
                                        </Flex>
                                    </Box>
                                ))}
                            </Stack>
                        </Card.Body>
                    </Card.Root>
                </Stack>
            </Grid>

            {/* Edit Profile Drawer */}
            <DrawerRoot>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <IconButton
                        aria-label="Edit profile"
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: "gray.100" }}
                    ><Edit size={16} /></IconButton>
                </DrawerTrigger>
                <DrawerBody 
                    bg="white" 
                    _dark={{ bg: "gray.800" }}
                    p={6}
                >
                    <Stack gap={6}>
                        <DrawerHeader px={0}>
                            <DrawerTitle>Edit Profile</DrawerTitle>
                        </DrawerHeader>
                        
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input
                                    className="peer"
                                    defaultValue={identity.name}
                                    placeholder="Enter your name"
                                    variant="flushed"
                                    bg="gray.50"
                                    _hover={{ bg: "gray.100" }}
                                    _focus={{ bg: "gray.100" }}
                                />
                                <Field.Label css={floatingStyles}>
                                    Name
                                </Field.Label>
                            </Box>
                        </Field.Root>
                        
                        <DrawerFooter px={0}>
                            <Button variant="ghost" mr={3}>Cancel</Button>
                            <Button colorScheme="blue">Save</Button>
                        </DrawerFooter>
                    </Stack>
                </DrawerBody>
            </DrawerRoot>
        </Container>
    );
};

export default IdentityDashboard;