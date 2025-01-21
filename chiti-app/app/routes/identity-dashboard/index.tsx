import { Layout } from 'antd';
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
        <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
            <Sidebar />
            <Feed />
            <RightSidebar />
        </Layout>
    );
};

export default App;