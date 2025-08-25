import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
    return <Box>{children}</Box>;
};

export default GameCardContainer;