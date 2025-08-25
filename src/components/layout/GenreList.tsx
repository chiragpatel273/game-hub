import useGenres, { type Genre } from "@/hooks/useGenres";
import getCroppedImageUrl from "@/services/image-url";
import { Box, Button, Heading, HStack, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface Props {
    onSelectGenre: (genre: Genre) => void;
    selectedGenre?: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
    const { data, error, loading } = useGenres();

    if (error) return null;
    if (loading) return <Spinner />;

    const activeBg = useColorModeValue("gray.200", "whiteAlpha.200");
    const activeHover = useColorModeValue("gray.300", "whiteAlpha.300");
    const hoverBg = useColorModeValue("gray.100", "whiteAlpha.100");
    const activeColor = useColorModeValue("teal.600", "teal.300");

    return (
        <>
            <Heading fontSize="2xl" mt={3} mb={3} letterSpacing="wide">
                Genres
            </Heading>
            <List.Root display="flex" flexDirection="column" gap={1}>
                {data.map((genre) => {
                    const isActive = selectedGenre?.id === genre.id;
                    return (
                        <ListItem key={genre.id} px={1}>
                            <Button
                                onClick={() => onSelectGenre(genre)}
                                role="menuitemradio"
                                aria-checked={isActive}
                                variant="ghost"
                                justifyContent="flex-start"
                                w="full"
                                px={2}
                                py={2}
                                gap={3}
                                rounded="md"
                                cursor="pointer"
                                bg={isActive ? activeBg : "transparent"}
                                _hover={{ bg: isActive ? activeHover : hoverBg, transform: "translateX(4px)" }}
                                _active={{ bg: activeHover }}
                                transition="all 0.18s ease"
                                fontWeight={isActive ? "semibold" : "medium"}
                                color={isActive ? activeColor : undefined}
                            >
                                <HStack align="center" gap={3} w="full">
                                    <Box flexShrink={0}>
                                        <Image
                                            boxSize="34px"
                                            rounded="md"
                                            objectFit="cover"
                                            src={getCroppedImageUrl(genre.image_background)}
                                            alt={genre.name}
                                            filter="auto"
                                            brightness="95%"
                                            transition="transform 0.25s ease"
                                            _hover={{ transform: "scale(1.05)" }}
                                        />
                                    </Box>
                                    <Text
                                        fontSize="sm"
                                        textAlign="left"
                                        fontWeight={isActive ? "semibold" : "medium"}
                                        lineHeight="1.2"
                                        lineClamp={2}
                                    >
                                        {genre.name}
                                    </Text>
                                </HStack>
                            </Button>
                        </ListItem>
                    );
                })}
            </List.Root>
        </>
    );
};

export default GenreList;