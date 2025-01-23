import React from 'react';
import { Layout, Input, Button, Card, Space, Avatar } from 'antd';
import { Paperclip, Link2, MapPin, Smile } from 'lucide-react';
import PostCard from './PostCard';

const { Content } = Layout;

const Feed: React.FC = () => {
  return (
    <Content style={{ flex: 1, padding: 16 }}>
      <Input
        placeholder="Enter your decentralized identity here"
        style={{ marginBottom: 16 }}
        size="large"
      />

      {/* Post Creation Card */}
      <Card style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space align="center" size={16} style={{ width: '100%' }}>
            <Avatar size="small">AB</Avatar>
            <Input placeholder="What" />
          </Space>
          <Space align="center" style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button icon={<Paperclip size={16} />} type="text" />
            <Button icon={<Link2 size={16} />} type="text" />
            <Button icon={<MapPin size={16} />} type="text" />
            <Button icon={<Smile size={16} />} type="text" />
            <Button type="primary">Post</Button>
          </Space>
        </Space>
      </Card>

      {/* Posts */}
      <Space direction="vertical" style={{ width: '100%' }} size={16}>
        <PostCard
          title="New User Onboarding Available"
          subtitle="Quick Access to Knowledge Base for New Users"
          content="Welcome to the App! Login with your decentralized identity to get started. If you're new here, we have an onboarding option available to help you get started. Check out our knowledge base for..."
          imageUrl="/mountains.jpg"
          likes={230}
          comments={5}
        />

        <PostCard
          title="Photo Album"
          subtitle="Thursday, 17 August 10:40 AM"
          content="I'm selling these clothes. Anyone interested? Or shall we do a swap evening at mine? 😊"
          images={["/clothes1.jpg", "/clothes2.jpg", "/clothes3.jpg"]}
          likes={18}
          comments={2}
        />
      </Space>
    </Content>
  );
};

export default Feed;