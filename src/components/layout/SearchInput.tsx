import { Box, Icon, Input } from "@chakra-ui/react";
import type { FormEvent } from "react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useColorModeValue } from "../ui/color-mode";

interface Props {
    onSearch?: (value: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
    const ref = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (onSearch && ref.current) onSearch(ref.current.value.trim());
    };

    // (reverted) Removing dark-mode custom overrides; rely on default theme styles.

    const iconColor = useColorModeValue('gray.500', 'whiteAlpha.700');
    const placeholderColor = useColorModeValue('gray.500', 'whiteAlpha.500');
    const bg = useColorModeValue('gray.100', 'whiteAlpha.200');
    const bgHover = useColorModeValue('gray.200', 'whiteAlpha.300');
    const bgFocus = useColorModeValue('white', 'whiteAlpha.400');
    const borderColor = useColorModeValue('gray.300', 'whiteAlpha.300');
    const borderHover = useColorModeValue('gray.400', 'whiteAlpha.400');
    const borderFocus = useColorModeValue('teal.500', 'teal.300');

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box position="relative" w="full">
                <Icon
                    as={BsSearch}
                    fontSize="sm"
                    opacity={0.7}
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    pointerEvents="none"
                    zIndex={1}
                    color={iconColor}
                />
                <Input
                    ref={ref}
                    pl={9}
                    borderRadius={20}
                    placeholder="Search games..."
                    fontSize="sm"
                    variant="subtle"
                    bg={bg}
                    borderWidth="1px"
                    borderColor={borderColor}
                    height="9"
                    _placeholder={{ color: placeholderColor }}
                    transition="background-color .15s ease, border-color .15s ease, box-shadow .15s ease"
                    _hover={{ bg: bgHover, borderColor: borderHover }}
                    _focusVisible={{ bg: bgFocus, borderColor: borderFocus, boxShadow: `0 0 0 1px ${borderFocus}` }}
                    _active={{ bg: bgFocus }}
                    autoComplete="off"
                />
            </Box>
        </form>
    );
};

export default SearchInput;