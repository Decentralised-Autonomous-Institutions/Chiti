import { Flex } from "@chakra-ui/react";
// import IdentityDashboard from "./identity-dashboard";
import RightSidebar from "./components/RightSidebar";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import type { Route } from "./+types";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Identity Dashboard" },
        { name: "identity-dashboard", content: "Identity Dashboard" },
    ];
}

// Main App Component
const App = () => {
    return (
        <Flex h="100vh">
            <Sidebar />
            <Feed />
            <RightSidebar />
        </Flex>
    );
};

export default App;