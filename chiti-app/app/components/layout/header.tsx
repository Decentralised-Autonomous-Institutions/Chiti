import { NavLink, useLocation } from "react-router";
import {
	Box,
	Flex,
	HStack,
	IconButton,
	Button,
	useDisclosure,
	Link,
	Image,
} from "@chakra-ui/react";
import { Menu as MenuIcon, X } from "lucide-react";

interface NavItem {
	label: string;
	href: string;
}

const navItems: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Services", href: "/services" },
	{ label: "Contact", href: "/contact" },
];

const Header = () => {
	const { open, onToggle } = useDisclosure();
	const location = useLocation();

	return (
		<Box
			bg="white"
			borderBottom="1px"
			borderColor="brand.border"
			position="sticky"
			top="0"
			zIndex="1000"
		>
			<Flex
				minH="60px"
				py={{ base: 2 }}
				px={{ base: 4, md: 6, lg: 8 }}
				align="center"
				justify="space-between"
			>
				{/* Logo */}
				<Flex align="center">
					<Link asChild>
						<NavLink to="/">
							<Image
								h="10px"
								w="10px"
								src="/images/icons/chiti_invert.svg"
								style={{ objectFit: "contain", objectPosition: "center", height: "40px", margin: "10px" }}
								alt="Logo"
							/>
						</NavLink>
					</Link>
				</Flex>

				{/* Desktop Navigation */}
				<HStack display={{ base: "none", md: "flex" }}>
					<HStack as="nav" gap={4}>
						{navItems.map((navItem) => (
							<Link
								key={navItem.label}
								asChild
								px={2}
								py={1}
								rounded="md"
								color={
									location.pathname === navItem.href
										? "brand.success"
										: "gray.600"
								}
								_hover={{
									textDecoration: "none",
									color: "brand.success",
								}}
								fontWeight="medium"
							>
								<NavLink to={navItem.href}>
									{navItem.label}
								</NavLink>
							</Link>
						))}
					</HStack>

					{/* Action Buttons */}
					<HStack gap={4}>
						<Button
							variant="subtle"
							display={{ base: "none", md: "inline-flex" }}
						>
							<NavLink to="/login">Sign In</NavLink>
						</Button>
						<Button
							variant="outline"
							display={{ base: "none", md: "inline-flex" }}
						>
							<NavLink to="/register">Get Started</NavLink>
						</Button>
					</HStack>
				</HStack>

				{/* Mobile Menu Button */}
				<Box display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
						variant="ghost"
						aria-label="Toggle Navigation"
					>
						{open ? <X /> : <MenuIcon />}
					</IconButton>
				</Box>
			</Flex>

			{/* Mobile Navigation */}
			<Box
				display={{ base: open ? "block" : "none", md: "none" }}
				p={4}
				bg="white"
				borderBottom="1px"
				borderColor="brand.border"
			>
				<Flex direction="column" gap={4}>
					{navItems.map((navItem) => (
						<Link
							key={navItem.label}
							asChild
							py={2}
							color={
								location.pathname === navItem.href
									? "brand.success"
									: "gray.600"
							}
							_hover={{
								textDecoration: "none",
								color: "brand.success",
							}}
							fontWeight="medium"
						>
							<NavLink to={navItem.href}>
								{navItem.label}
							</NavLink>
						</Link>
					))}
					<Button
						variant="subtle"
						w="full"
						mt={4}
					>
						<NavLink to="/login">Sign In</NavLink>
					</Button>
					<Button
						variant="outline"
						w="full"
						mt={2}
					>
						<NavLink to="/register">Get Started</NavLink>
					</Button>
				</Flex>
			</Box>
		</Box>
	);
};

export default Header;
