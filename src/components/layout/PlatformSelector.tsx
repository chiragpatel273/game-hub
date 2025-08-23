import usePlatforms, { type Platform } from "@/hooks/usePlatforms";
import { Button, Menu, Portal } from "@chakra-ui/react";

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
                <Button variant="outline" size="sm">
                    {selectedPlatform ? selectedPlatform.name : "Platforms"}
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content >
                        {data.map((platform) => (
                            <Menu.Item value={platform.name} key={platform.id} onSelect={() => onSelectPlatform(platform)}>
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