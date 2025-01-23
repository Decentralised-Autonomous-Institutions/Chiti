import { Space, Typography } from 'antd';

interface EventItemProps {
  title: string;
  location: string;
  date: string;
}

const { Text } = Typography;

const EventItem: React.FC<EventItemProps> = ({ title, location, date }) => {
  return (
    <Space align="start">
      <div style={{ 
        padding: '8px', 
        background: '#f5f5f5', 
        borderRadius: '4px' 
      }}>
        <Text style={{ fontSize: '14px' }}>{date.split(" ")[1]}</Text>
      </div>
      <Space direction="vertical" size={0}>
        <Text strong>{title}</Text>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          {location}
        </Text>
      </Space>
    </Space>
  );
};

export default EventItem;