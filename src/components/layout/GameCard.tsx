import type { Game } from "@/hooks/useGames";
import getCroppedImageUrl from "@/services/image-url";
import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";

interface Props {
    game: Game;
}

const GameCard = ({ game }: Props) => {

    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
    const hoverBorder = useColorModeValue('gray.300', 'whiteAlpha.300');
    const cardBg = useColorModeValue('white', 'gray.900');

    return (
        <Card.Root
            rounded="lg"
            overflow="hidden"
            borderWidth="1px"
            borderColor={borderColor}
            bg={cardBg}
            _hover={{ borderColor: hoverBorder, boxShadow: useColorModeValue('md', 'lg') }}
            transition="border-color 0.2s ease, box-shadow 0.25s ease"
        >
            <Image
                src={getCroppedImageUrl(game.background_image)}
                alt={game.name}
                objectFit="cover"
                aspectRatio={16 / 9}
                display="block"
            />
            <CardBody>
                <HStack justifyContent='space-between' marginBottom={3}>
                    <PlatformIconList platforms={game.parent_platforms?.map(p => p.platform)} />
                </HStack>
                <HStack justifyContent='space-between'>
                    <Heading fontSize='2xl'>{game.name}</Heading>
                    <CriticScore score={game.metacritic} />
                </HStack>
                <Emoji rating={game.rating_top} />
            </CardBody>
        </Card.Root>
    );
};

export default GameCard;