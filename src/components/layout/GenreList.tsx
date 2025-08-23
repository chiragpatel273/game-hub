import useGenres from "@/hooks/useGenres";
import getCroppedImageUrl from "@/services/image-url";
import { Heading, HStack, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";

const GenreList = () => {
    const { data, error, loading } = useGenres();

    if (error) return null;
    if (loading) return <Spinner></Spinner>;

    return (
        <>
            <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
                Genres
            </Heading>
            <List.Root>
                {data.map((genre) => (
                    <ListItem key={genre.id} paddingY="5px">
                        <HStack>
                            <Image
                                boxSize="32px"
                                borderRadius={8}
                                objectFit="cover"
                                src={getCroppedImageUrl(genre.image_background)}
                            />
                            <Text>{genre.name}</Text>
                        </HStack>
                    </ListItem>
                ))}
            </List.Root>
        </>
    );
};

export default GenreList;