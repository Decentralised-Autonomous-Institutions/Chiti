import { Layout, Space, Menu, Button, Avatar } from 'antd';
import { NavLink, useLocation } from 'react-router';
import { Settings } from 'lucide-react';
import { useDisclosure } from '~/hooks/useDisclosure';

const { Header: AntHeader } = Layout;

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const { open, onToggle } = useDisclosure();
  const location = useLocation();

  return (
    <AntHeader 
      style={{ 
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink to="/">
          <img
            src="/images/icons/chiti_invert.svg"
            style={{ 
              height: '40px',
              margin: '10px',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
            alt="Logo"
          />
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ border: 'none' }}
        >
          {navItems.map((item) => (
            <Menu.Item key={item.href}>
              <NavLink to={item.href}>
                {item.label}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>

        <Space style={{ marginLeft: 24 }}>
          <Avatar size="small" src="/images/avatar.png" />
          <Button 
            type="text" 
            icon={<Settings size={16} />}
            onClick={onToggle}
          />
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
