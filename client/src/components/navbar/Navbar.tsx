import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../services/userService";
import { useCurrentTable } from "../../store/tableStore";
import { useSessionUser } from "../../store/userStore";
import EditProfileModal from "../edit_profile/EditProfileModal";
import NavLink from "./NavLink";
import TeamBuildingInstructions from "./TeamBuildingInstructions";

export interface DisclosureTypeNav {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const availableLinks = {
  edit_profile: {
    name: "Editar perfil",
    modal: (disclosure: DisclosureTypeNav) => (
      <EditProfileModal
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
      />
    ),
  },
  team_rules: {
    name: "¿Como se arman las parejas?",
    modal: (disclosure: DisclosureTypeNav) => (
      <TeamBuildingInstructions
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
      />
    ),
  },
};

export default function Navbar() {
  const user = useSessionUser();
  const table = useCurrentTable();
  const editProfileDisclosure = useDisclosure();
  const teamRulesDisclosure = useDisclosure();

  return (
    <Box bg="green.500" p="2" width="100%" height="90px">
      <Flex alignItems="center" justifyContent="space-between" height="100%">
        <Flex alignItems="center">
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
          <NavLink
            hidden={!user?.is_playing || table?.game_type === "singles"}
            name={availableLinks["team_rules"].name}
            onOpen={teamRulesDisclosure.onOpen}
            modal={availableLinks["team_rules"].modal(teamRulesDisclosure)}
          />
        </Flex>
        <Flex alignItems="center">
          <Avatar
            src={user ? user.avatar_url : ""}
            name="Avatar usuario"
            size="lg"
            mr="2"
          />
          <Text mx="2" fontSize="lg" as="i" color="white">
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
