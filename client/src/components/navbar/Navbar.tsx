import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Image,
  Avatar,
  Text,
  Link,
} from "@chakra-ui/react";
import NavLink from "./NavLink";
import { useSessionUser } from "../../store/userStore";
import { FiLogOut } from "react-icons/fi";
import { Link as ReactRouterLink } from "react-router-dom";
import { logout } from "../../services/userService";

const availableLinks = [
  { name: "Inicio", route: "/" },
  { name: "Reglas de juego", route: "/" },
  { name: "Editar perfil", route: "/plans" },
];

export default function Navbar() {
  const user = useSessionUser();

  return (
    <Box bg={"green.500"} p={2}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <Image
            borderRadius="15%"
            boxSize="10%"
            src="logo_truco.jpg"
            alt="Logo truco"
            mr="2"
          />
          {availableLinks.map((link, index) => (
            <NavLink key={index} name={link.name} route={link.route} />
          ))}
        </Flex>
        <Flex alignItems={"center"}>
          <Avatar
            src={user ? user.avatar_url : ""}
            name="Avatar usuario"
            size="lg"
            mr="2"
          />
          <Text mx={2} fontSize="lg" as="i" color={"white"}>
            {user ? user.username : ""}
          </Text>
          <IconButton
            aria-label="logout"
            rounded="md"
            variant="ghost"
            cursor="pointer"
            _hover={{
              textDecoration: "none",
              bg: "green",
            }}
            icon={<FiLogOut color="white" />}
            onClick={logout}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
