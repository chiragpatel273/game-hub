import type { Game } from "@/hooks/useGames";
import { getGameImage } from "@/utils/gameImage";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface Props {
    game: Game;
}

const GameCard = ({ game }: Props) => {
    const src = getGameImage({ image: game.image, title: game.title });

    return (
        <Card.Root>
            <Image
                src={src}
                alt={game.title}
                objectFit="cover"
                aspectRatio={16 / 9}
                borderTopRadius="md"
            />
            <CardBody>
                <Heading fontSize="xl">{game.title}</Heading>
            </CardBody>
        </Card.Root>
    );
};

export default GameCard;