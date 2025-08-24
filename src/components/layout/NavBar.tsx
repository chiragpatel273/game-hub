import { Box, Flex, Text } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import SearchInput from "./SearchInput";

interface Props {
  onSearch?: (value: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");
  return (
    <Flex
      as="header"
      align="center"
      height="14"
      px="4"
      borderBottomWidth="1px"
      gap="4"
      bg={bg}
      borderColor={border}
    >
      <Text fontWeight="semibold" whiteSpace="nowrap">Game Hub</Text>
      <SearchInput onSearch={onSearch} />
      <Box ml="auto">
        <ColorModeButton />
      </Box>
    </Flex>
  );
};

export default NavBar;
