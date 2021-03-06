
import React, { useState, useEffect } from "react";
import SidebarWithHeader from "../../shared/SidebarProps";
import {
  Container,
  Grid,
  GridItem,
  Heading,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Stack,
  Text,
  Icon,
  Badge,
  Box,
} from "@chakra-ui/react";



function Items() {
  return (
    <SidebarWithHeader>
      <SimpleGrid columns={{ sm: 1, md: 2 }}>
          Item
      </SimpleGrid>
    </SidebarWithHeader>
  );
}
export default Items;
