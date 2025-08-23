import usePlatforms, { type Platform } from "@/hooks/usePlatforms";
import { Button, HStack, Icon, Menu, Portal } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
    onSelectPlatform: (platform: Platform) => void;
    selectedPlatform: Platform | null;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatform }: Props) => {
    const { data, error } = usePlatforms();

    if (error) return null;

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant="outline" size="sm" display="inline-flex" alignItems="center" gap={2}>
                    <HStack gap={1} align="center">
                        <span>{selectedPlatform ? selectedPlatform.name : "Platforms"}</span>
                    </HStack>
                    <Icon as={BsChevronDown} fontSize="xs" opacity={0.8} />
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content >
                        {data.map((platform) => (
                            <Menu.Item
                                value={platform.name}
                                key={platform.id}
                                onSelect={() => onSelectPlatform(platform)}
                                cursor="pointer"
                                _hover={{ bg: "whiteAlpha.100" }}
                            >
                                {platform.name}
                            </Menu.Item>
                        ))}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

export default PlatformSelector;