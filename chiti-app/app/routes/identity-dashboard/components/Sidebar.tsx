import React from 'react';
import { Layout, Typography, Button, Space } from 'antd';

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar: React.FC = () => {
    return (
        <Sider
            width={250}
            style={{
                background: '#fff',
                borderRight: '1px solid #cdd9d4',
                boxSizing: 'border-box',
                height: '100vh',
                position: 'sticky',
                top: 0,
                padding: 16,
            }}
        >
            <Space direction="vertical" size={24} style={{ display: 'flex', height: '100%' }}>
                {/* Logo / Title */}
                <Title level={4} style={{ margin: 0 }}>
                    Chiti
                </Title>

                {/* Navigation Buttons */}
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <Button block type="primary">
                        Home
                    </Button>
                    <Button block type="text">
                        Explore
                    </Button>
                    <Button block type="text">
                        Activities
                    </Button>
                    <Button block type="text">
                        Connections
                    </Button>
                    <Button block type="text">
                        Profile
                    </Button>
                </Space>

                {/* Sign Out Button */}
                <Button block danger style={{ marginTop: 'auto' }}>
                    Sign out
                </Button>
            </Space>
        </Sider>
    );
};

export default Sidebar;