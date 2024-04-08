import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";
import styles from "./AddNewButton.module.css";
import { createFolder } from "../folders-list/FoldersList";

const AddNewButton = () => (
  <Menu>
    <MenuButton
      px={4}
      py={2}
      transition="all 0.2s"
      borderRadius="md"
      borderWidth="1px"
      _hover={{ bg: "gray.700" }}
      _focus={{ boxShadow: "outline" }}
    >
      <CiMenuKebab size={"20px"} color="rgba(255, 255, 255, 0.452)" />
    </MenuButton>
    <MenuList>
      <MenuItem gap={"10px"}>
        <button onClick={createFolder}>
          <VscNewFile />
          New File
        </button>
      </MenuItem>
      <MenuItem color={"#f54040"} fontWeight={"600"} gap={"10px"}>
        <FaTrash />
        Delete File
      </MenuItem>
    </MenuList>
  </Menu>
);

export { AddNewButton };
