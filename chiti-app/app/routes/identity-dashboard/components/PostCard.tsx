import React from 'react';
import { Card, Image, Space, Typography, Button, Avatar } from 'antd';

interface PostCardProps {
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string;
  images?: string[];
  likes: number;
  comments: number;
}

const { Text } = Typography;

const PostCard: React.FC<PostCardProps> = ({
  title,
  subtitle,
  content,
  imageUrl,
  images,
  likes,
  comments
}) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Space align="start" style={{ marginBottom: 16 }}>
        <Avatar size="small" style={{ marginRight: 8 }}>
          AB
        </Avatar>
        <Space direction="vertical" size={0}>
          <Text strong>{title}</Text>
          <Text type="secondary">{subtitle}</Text>
        </Space>
      </Space>

      <Text>{content}</Text>

      {imageUrl && (
        <Image
          src={imageUrl}
          style={{ borderRadius: 8, marginTop: 16, marginBottom: 16 }}
          preview={false}
        />
      )}

      {images && (
        <Space wrap style={{ gap: 8, marginBottom: 16 }}>
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              style={{ width: 100, height: 100, borderRadius: 8 }}
              preview={false}
            />
          ))}
        </Space>
      )}

      <Space size={16}>
        <Button type="text">Like ({likes})</Button>
        <Button type="text">Comment ({comments})</Button>
        <Button type="text">Share</Button>
      </Space>
    </Card>
  );
};

export default PostCard;