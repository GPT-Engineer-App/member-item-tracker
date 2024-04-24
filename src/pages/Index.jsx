import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, Text, Select, VStack, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [members, setMembers] = useState([]);
  const [newItem, setNewItem] = useState({ memberName: "", startDate: "", endDate: "", itemName: "", tag: "" });
  const [items, setItems] = useState([]);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addItem = () => {
    if (!newItem.memberName || !newItem.startDate) {
      toast({
        title: "Error",
        description: "Member name and start date are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setItems([...items, newItem]);
    setNewItem({ memberName: "", startDate: "", endDate: "" });
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Member Name</FormLabel>
          <Input placeholder="Enter member name" name="memberName" value={newItem.memberName} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input type="date" name="startDate" value={newItem.startDate} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>End Date (optional)</FormLabel>
          <Input type="date" name="endDate" value={newItem.endDate} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Item Name</FormLabel>
          <Input placeholder="Enter item name" name="itemName" value={newItem.itemName} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Tag</FormLabel>
          <Select placeholder="Select or create tag" name="tag" value={newItem.tag} onChange={handleInputChange}>
            {items.map((item, index) => (
              <option key={index} value={item.tag}>
                {item.tag}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addItem}>
          Add Item
        </Button>
      </VStack>

      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Member Name</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Item Name</Th>
            <Th>Tag</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, index) => (
            <Tr key={index}>
              <Td>{item.memberName}</Td>
              <Td>{item.startDate}</Td>
              <Td>{item.endDate || "N/A"}</Td>
              <Td>{item.itemName}</Td>
              <Td>{item.tag}</Td>
              <Td>
                <IconButton aria-label="Delete item" icon={<FaTrash />} onClick={() => deleteItem(index)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Index;
