import axios from "axios";
import fs from "fs";

async function getProperties() {
   function getOptionsFor(purpose, page) {
      return {
         method: "GET",
         url: "https://bayut.p.rapidapi.com/properties/list",
         params: {
            locationExternalIDs: "5002",
            purpose: purpose,
            page: page,
            lang: "en"
         },
         headers: {
            "X-RapidAPI-Key": "TODO",
            "X-RapidAPI-Host": "bayut.p.rapidapi.com"
         }
      };
   }

   const ITERATIONS = 2;
   let allHits = [];
   for (let i = 0; i < ITERATIONS; i++) {
      const data = (await axios.request(getOptionsFor("for-rent", "" + i))).data;
      const { hits } = data;
      allHits = [...allHits, ...hits];
   }

   for (let j = 0; j < ITERATIONS; j++) {
      const data = (await axios.request(getOptionsFor("for-sale", "" + j))).data;
      const { hits } = data;
      allHits = [...allHits, ...hits];
   }

   fs.writeFileSync("properties.json", JSON.stringify(allHits, null, 4));
}

async function getDetails() {
   function getOptionsFor(externalID) {
      return {
         method: "GET",
         url: "https://bayut.p.rapidapi.com/properties/detail",
         params: { externalID: externalID },
         headers: {
            "X-RapidAPI-Key": "TODO",
            "X-RapidAPI-Host": "bayut.p.rapidapi.com"
         }
      };
   }

   let rawdata = fs.readFileSync("properties.json");
   let properties = JSON.parse(rawdata);

   let allDetails = [];
   for (const [index, property] of properties.entries()) {
      const details = (await axios.request(getOptionsFor(property.externalID))).data;
      allDetails.push(details);

      console.log(`${index} finished.`);
   }

   console.log(allDetails.length);
   fs.writeFileSync("details.json", JSON.stringify(allDetails, null, 4));
}

// getProperties();
// getDetails();
