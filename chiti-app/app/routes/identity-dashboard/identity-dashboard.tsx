import type { Route } from "../+types/identity-dashboard";
import { 
  Layout, 
  Typography, 
  Input, 
  Card, 
  Button, 
  Space, 
  Grid, 
  Avatar, 
  Tag, 
  Drawer 
} from 'antd';
import { 
  EditOutlined, 
  KeyOutlined, 
  LockOutlined, 
  UserOutlined, 
  SettingOutlined 
} from '@ant-design/icons';
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Identity Dashboard" },
    { name: "identity-dashboard", content: "Identity Dashboard" }
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
  };
}

const IdentityDashboard: React.FC<IdentityDashboardProps> = ({ identity }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  return (
    <Content style={{ padding: '24px' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Profile Section */}
          <Space align="center">
            <Avatar size={64} src={identity.avatar} />
            <Space direction="vertical" size={0}>
              <Title level={4}>{identity.name}</Title>
              <Text type="secondary">{identity.did}</Text>
              <Tag color={
                identity.status === 'active' ? 'success' :
                identity.status === 'pending' ? 'warning' : 'error'
              }>
                {identity.status}
              </Tag>
            </Space>
          </Space>

          {/* Verified Credentials Section */}
          <Card title="Verified Credentials">
            <Space direction="vertical" style={{ width: '100%' }}>
              {identity.verifiedCredentials.map(credential => (
                <Card.Grid key={credential.id} style={{ width: '100%' }}>
                  <Space>
                    <KeyOutlined />
                    <Space direction="vertical" size={0}>
                      <Text strong>{credential.type}</Text>
                      <Text type="secondary">Issued by {credential.issuer}</Text>
                      <Text type="secondary">{new Date(credential.issuanceDate).toLocaleDateString()}</Text>
                    </Space>
                  </Space>
                </Card.Grid>
              ))}
            </Space>
          </Card>

          {/* Devices Section */}
          <Card title="Connected Devices">
            <Space direction="vertical" style={{ width: '100%' }}>
              {identity.devices.map(device => (
                <Card.Grid key={device.id} style={{ width: '100%' }}>
                  <Space>
                    {device.type === 'mobile' ? <UserOutlined /> :
                     device.type === 'desktop' ? <LockOutlined /> : <SettingOutlined />}
                    <Space direction="vertical" size={0}>
                      <Text strong>{device.name}</Text>
                      <Text type="secondary">Last used: {new Date(device.lastUsed).toLocaleDateString()}</Text>
                      <Tag>{device.type}</Tag>
                    </Space>
                  </Space>
                </Card.Grid>
              ))}
            </Space>
          </Card>
        </Space>
      </Card>

      {/* Edit Profile Drawer */}
      <Drawer
        title="Edit Profile"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Input placeholder="Name" defaultValue={identity.name} />
          <Button type="primary" onClick={() => setDrawerVisible(false)}>
            Save Changes
          </Button>
        </Space>
      </Drawer>
    </Content>
  );
};

export default IdentityDashboard;