import axios from "axios";

export async function getLastPropertiesForRent() {
   return (await axios.get("http://localhost:3000/api/properties/list?purpose=for-rent&limit=6")).data;
}

export async function getLastPropertiesForSale() {
   return (await axios.get("http://localhost:3000/api/properties/list?purpose=for-sale&limit=6")).data;
}

export async function getDetailsFor(externalID) {
   return (await axios.get(`http://localhost:3000/api/properties/detail/${externalID}`)).data;
}

export async function getPropertiesFilteredBy(purpose, rentFrequency, minPrice, maxPrice, roomsMin, bathsMin, sort, areaMax, furnishingStatus, categoryExternalID) {
   const fields = { purpose, rentFrequency, minPrice, maxPrice, roomsMin, bathsMin, sort, areaMax, furnishingStatus, categoryExternalID };

   const queryStrings = [];
   for (const [key, value] of Object.entries(fields)) {
      if (fields[key] !== undefined) queryStrings.push(`${key}=${value}`);
   }

   return (await axios.get(`http://localhost:3000/api/properties/list${queryStrings.length !== 0 ? "?" : ""}${queryStrings.join("&")}`)).data;
}

