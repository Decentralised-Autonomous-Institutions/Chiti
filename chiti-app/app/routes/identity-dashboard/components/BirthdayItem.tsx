import React from 'react';
import { Space, Typography, Avatar } from 'antd';

interface BirthdayItemProps {
  name: string;
  age: number;
  date: string;
}

const { Text } = Typography;

const BirthdayItem: React.FC<BirthdayItemProps> = ({ name, age, date }) => {
  return (
    <Space align="start">
      <Avatar size="small" />
      <Space direction="vertical" size={0}>
        <Text strong>{name}</Text>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Turning {age} years old
        </Text>
      </Space>
    </Space>
  );
};

export default BirthdayItem;