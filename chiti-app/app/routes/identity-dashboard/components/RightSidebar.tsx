import { Layout, Typography, Card, Space, Image } from 'antd';
import EventItem from "./EventItem";
import BirthdayItem from "./BirthdayItem";

const { Sider } = Layout;
const { Title, Text } = Typography;

const RightSidebar = () => {
    return (
        <Sider 
            width={300} 
            style={{ 
                background: '#fff',
                borderLeft: '1px solid #f0f0f0',
                padding: '16px',
                height: '100vh',
                overflow: 'auto'
            }}
        >
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
                {/* Events Section */}
                <div>
                    <Title level={5} style={{ marginBottom: 16 }}>
                        Your upcoming events
                    </Title>
                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
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
                    </Space>
                </div>

                {/* Birthday Section */}
                <div>
                    <Title level={5} style={{ marginBottom: 16 }}>
                        Birthdays
                    </Title>
                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                        <BirthdayItem
                            name="Bob Hammond"
                            age={28}
                            date="20 August"
                        />
                    </Space>
                </div>

                {/* Value Exchange Center */}
                <div>
                    <Title level={5} style={{ marginBottom: 16 }}>
                        Value Exchange Center
                    </Title>
                    <Card>
                        <Image 
                            src="/laptop.jpg" 
                            style={{ borderRadius: 8, marginBottom: 16 }} 
                            preview={false}
                        />
                        <Text type="secondary">Transfer Interface</Text>
                    </Card>
                </div>
            </Space>
        </Sider>
    );
};

export default RightSidebar;