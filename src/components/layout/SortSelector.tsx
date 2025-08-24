import { Button, HStack, Icon, Menu, Portal } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
    onSelectSortOrder: (sortOrder: string) => void;
    sortOrder: string;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
    const sortOrders = [
        { value: "", label: "Relevance" },
        { value: "-added", label: "Date added" },
        { value: "name", label: "Name" },
        { value: "-released", label: "Release date" },
        { value: "-metacritic", label: "Popularity" },
        { value: "-rating", label: "Average rating" },
    ];
    const currentSortOrder = sortOrders.find(order => order.value === sortOrder);

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant="outline" size="sm" display="inline-flex" alignItems="center" gap={2}>
                    <HStack gap={1} align="center">
                        <span>Order by: {currentSortOrder?.label || 'Relevance'}</span>
                    </HStack>
                    <Icon as={BsChevronDown} fontSize="xs" opacity={0.8} />
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content >
                        {sortOrders.map((order) => (
                            <Menu.Item
                                value={order.value}
                                key={order.value}
                                onSelect={() => onSelectSortOrder(order.value)}
                                cursor="pointer"
                            >
                                {order.label}
                            </Menu.Item>
                        ))}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

export default SortSelector;