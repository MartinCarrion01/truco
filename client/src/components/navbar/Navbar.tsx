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
import EditProfileModal from "../edit_profile/EditProfileModal";

export interface DisclosureTypeNav {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const availableLinks = {
  edit_profile: {
    name: "Editar perfil",
    modal: (disclosure: DisclosureTypeNav) => (
      <EditProfileModal isOpen={disclosure.isOpen} onClose={disclosure.onClose} />
    ),
  },
};

export default function Navbar() {
  const user = useSessionUser();
  console.log(user)
  const editProfileDisclosure = useDisclosure();

  return (
    <Box bg={"green.500"} p={2} width="100%" height="90px">
      <Flex alignItems={"center"} justifyContent={"space-between"} height="100%">
        <Flex alignItems={"center"}>
          <Image
            borderRadius="15%"
            boxSize="10%"
            src="logo_truco.jpg"
            alt="Logo truco"
            mr="2"
            height="75px"
            width="100px"
          />
          <NavLink
            hidden={user?.is_playing}
            name={availableLinks["edit_profile"].name}
            onOpen={editProfileDisclosure.onOpen}
            modal={availableLinks["edit_profile"].modal(editProfileDisclosure)}
          />
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
