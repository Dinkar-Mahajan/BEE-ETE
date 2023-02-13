import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import React from "react"
import { useRouter } from "next/router";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";

import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import noresult from "../assets/images/noresult.svg";
import { getPropertiesFilteredBy } from "../utils/PropertiesService";

function Search({ properties }) {
   const [searchFilters, setSearchFilters] = useState(false);
   const router = useRouter();

   return (
      <Box>
         <Flex
            cursor="pointer"
            bg="gray.100"
            borderBottom="1px"
            borderColor="gray.200"
            p="2"
            fontWeight="black"
            fontSize="lg"
            justifyContent="center"
            alignItems="center"
            onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
         >
            <Text>Search Property By Filters</Text>
            <Icon paddingLeft="2" w="7" as={BsFilter} />
         </Flex>
         {searchFilters && <SearchFilters />}
         <Text fontSize="2xl" p="4" fontWeight="bold">
            Properties {router.query.purpose}
         </Text>

         <Flex flexWrap="wrap">
            {properties.map((property) => <Property property={property} key={property.id} />)}
         </Flex>

         {properties.length === 0 && (
            <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
               <Image alt="no result" src={noresult} />
               <Text fontSize="2xl" marginTop="3">No Results found</Text>
            </Flex>
         )}
      </Box>
   );
}

export default Search;

export async function getServerSideProps({ query }) {
   const purpose = query.purpose;
   const rentFrequency = query.rentFrequency;
   const minPrice = query.minPrice;
   const maxPrice = query.maxPrice;
   const roomsMin = query.roomsMin;
   const bathsMin = query.bathsMin;
   const sort = query.sort;
   const areaMax = query.areaMax;
   const furnishingStatus = query.furnishingStatus;
   const categoryExternalID = query.categoryExternalID;

   return {
      props: {
         properties: await getPropertiesFilteredBy(purpose, rentFrequency, minPrice, maxPrice, roomsMin, bathsMin, sort, areaMax, furnishingStatus, categoryExternalID)
      },
   };
}
