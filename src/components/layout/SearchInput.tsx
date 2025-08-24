import { Box, Icon, Input } from "@chakra-ui/react";
import type { FormEvent } from "react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

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
                    // basic dark mode aware color (html.dark class from next-themes)
                    color={typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'whiteAlpha.700' : 'gray.500'}
                />
                <Input
                    ref={ref}
                    pl={9}
                    borderRadius={20}
                    placeholder="Search games..."
                    variant="subtle"
                    fontSize="sm"
                    _focus={{ boxShadow: "outline" }}
                    autoComplete="off"
                />
            </Box>
        </form>
    );
};

export default SearchInput;