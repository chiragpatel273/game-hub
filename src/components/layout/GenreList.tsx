import useGenres, { type Genre } from "@/hooks/useGenres";
import getCroppedImageUrl from "@/services/image-url";
import { Box, Button, Heading, HStack, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";

interface Props {
    onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSelectGenre }: Props) => {
    const { data, error, loading } = useGenres();

    if (error) return null;
    if (loading) return <Spinner size="sm" />;

    return (
        <>
            <Heading fontSize="2xl" mt={9} mb={3} letterSpacing="wide">
                Genres
            </Heading>
            <List.Root display="flex" flexDirection="column" gap={1}>
                {data.map((genre) => (
                    <ListItem key={genre.id} px={1}>
                        <Button
                            onClick={() => onSelectGenre(genre)}
                            variant="ghost"
                            justifyContent="flex-start"
                            w="full"
                            px={2}
                            py={2}
                            gap={3}
                            rounded="md"
                            cursor="pointer"
                            _hover={{ bg: "whiteAlpha.100", transform: "translateX(4px)" }}
                            _active={{ bg: "whiteAlpha.200" }}
                            transition="all 0.18s ease"
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
                                <Text fontSize="sm" textAlign="left" fontWeight="medium" lineHeight="1.2" lineClamp={2}>
                                    {genre.name}
                                </Text>
                            </HStack>
                        </Button>
                    </ListItem>
                ))}
            </List.Root>
        </>
    );
};

export default GenreList;