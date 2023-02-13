import { Box, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
import { router } from "next/router";

import { filterData, getFilterValues } from "../utils/filterData";

function SearchFilters() {
   const [filters, _setFilters] = useState(filterData);

   function searchProperties(filterValues) {
      const path = router.pathname;
      const { query } = router;

      const values = getFilterValues(filterValues);

      values.forEach((item) => {
         if (item.value && filterValues?.[item.name]) {
            query[item.name] = item.value;
         }

         // filterValues resetted
         if (filterValues?.[item.name] === "") {
            delete query[item.name];
         }
      });

      router.push({ pathname: path, query });
   }

   return (
      <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
         {filters.map((filter) => (
            <Box key={filter.queryName}>
               <Select
                  placeholder={filter.placeholder}
                  w="fit-content"
                  p="2"
                  onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
               >
                  {filter?.items?.map((item) => (
                     <option value={item.value} key={item.value}>
                        {item.name}
                     </option>
                  ))}
               </Select>

            </Box>
         ))}
      </Flex>
   );
}

export default SearchFilters;