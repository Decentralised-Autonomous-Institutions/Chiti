import React, { useState } from 'react';
import { Steps, Button, Card, Input, Space, Alert, theme } from 'antd';
import { UserOutlined, SafetyCertificateOutlined, LinkOutlined } from '@ant-design/icons';

const IdentityCreation = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: 'Basic Information',
      icon: <UserOutlined />,
      content: (
        <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
          <Input placeholder="Enter your full name" />
          <Input type="number" placeholder="Enter your age" />
          <Input type="email" placeholder="Enter your email" />
          <Input placeholder="Choose a username" />
        </Space>
      ),
    },
    {
      title: 'Value Selection',
      icon: <SafetyCertificateOutlined />,
      content: (
        <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
          <Card title="Community Tokens">
            <Space wrap>
              {['Token A', 'Token B', 'Token C'].map(token => (
                <Button key={token}>{token}</Button>
              ))}
            </Space>
          </Card>
          <Card title="Protocol Stakes">
            <Space wrap>
              {['Stake X', 'Stake Y', 'Stake Z'].map(stake => (
                <Button key={stake}>{stake}</Button>
              ))}
            </Space>
          </Card>
        </Space>
      ),
    },
    {
      title: 'Connection Setup',
      icon: <LinkOutlined />,
      content: (
        <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
          <Input placeholder="Enter Node ID" />
          <Input placeholder="Define relationship" />
          <Input placeholder="Describe the connection" />
        </Space>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  const contentStyle = {
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Create Your Identity</h1>
        <p style={{ color: token.colorTextSecondary }}>Secure, decentralized identity creation</p>
      </div>

      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>

      <Alert
        message="Security Notice"
        description="Your security is our priority. All information is encrypted and stored securely. Make sure to safely store your recovery phrase once generated."
        type="warning"
        showIcon
        style={{ margin: '24px 0' }}
      />

      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => console.log('Complete')}>
            Complete
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default IdentityCreation;