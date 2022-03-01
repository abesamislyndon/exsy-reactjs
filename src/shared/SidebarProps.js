import React, { ReactNode } from "react"; 
import { NavLink, useNavigate, Link} from "react-router-dom";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Collapse,
} from "@chakra-ui/react";
import {
  FiHome,
  FiClipboard,
  FiUsers,
  FiBarChart,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import AuthService from "../services/auth.service";
import { useState, useEffect } from "react";

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

interface LinkItemProps {
  name: string;
  to: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboards", icon: FiHome, to: "/dashboard" },
  {
    name: "Jobwork form",
    icon: FiClipboard,
    to: "/jobwork",
    children: "/dasd",
  },
  {
    name: "Jobwork List",
    icon: FiClipboard,
    to: "/joblist",
  },
  { name: "Clients", icon: FiUsers, to: "/client" },
  { name: "Divisions", icon: FiUsers, to: "/division" },
  { name: "User Management", icon: FiBarChart, to: "/user" },
  { name: "Reports", icon: FiBarChart, to: "/reports" },
  { name: "Settings", icon: FiSettings, to: "/reports" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode,
}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ icon, onClose, ...rest }: SidebarProps) => {
  //const integrations = useDisclosure();
  const navigate = useNavigate();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 245 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
 
      <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/dashboard"
            onSelect={({itemId}) => {
              navigate(itemId); 
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <FiHome />,
              },
              {
                title: 'Projects',
                itemId: '#',
                elemBefore: () => <FiClipboard />,
                subNav: [ 
                  {
                    title: 'Job List',
                    itemId: '/joblist',
                  },
                  {
                    title: 'Job Work Forms',
                    itemId: '/jobwork',
                  },
                ],
              },
              {
                title: 'Client Management',
                //itemId: '/',
                elemBefore: () => <FiUsers />,
                subNav: [
                  {
                    title: 'Client',
                    itemId: '/client',
                  },
                  {
                    title: 'Division',
                    itemId: '/division',
                  },
                ],
              },
              {
                title: 'Reports',
                //itemId: '/',
                elemBefore: () => <FiUsers />,
                subNav: [
                  {
                    title: 'Client',
                    itemId: '/client',
                  },
                  {
                    title: 'Division',
                    itemId: '/division',
                  },
                ],
              },
              {
                title: ' Settings',
                //itemId: '/',
                elemBefore: () => <FiUsers />,
                subNav: [
                  {
                    title: 'Client',
                    itemId: '/client',
                  },
                  {
                    title: 'Division',
                    itemId: '/division',
                  },
                ],
              },
            ]}
            
          />
      
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user.auth_status === "authenticated") {
      setCurrentUser(user);
    } else {
      navigate("/");
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <Link to="/" onClick={logOut}>
                <MenuItem>Logout</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
