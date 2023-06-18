"use client";
import { api } from "@/app/api";
import User from "@/app/interfaces/User";
import { useUserState } from "@/app/redux/user";
import { Box } from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
} from "@chakra-ui/react";
import { HiChevronDoubleDown } from "react-icons/hi";

export interface UserPainelProps {
  users: User[] | undefined;
}

export default function UserPainel({ users }: UserPainelProps) {
  const toast = useToast();
  const { user } = useUserState();

  async function handleDeleteUserAccount(id: string) {
    if (id === user?.id) {
      toast({
        title: "Unable to delete your own account!",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      await api.delete("users/" + id);

      toast({
        title: "Action executed successfully.",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "You do not have permition to do this!",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Box>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<HiChevronDoubleDown />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => handleDeleteUserAccount(user.id)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
