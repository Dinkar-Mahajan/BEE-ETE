import details from "../../db/details.json" assert {type: "json"};

export default function handler(req, res) {
   if (req.method === "GET") {
      const { externalID } = req.query;
      const detail = details.filter(x => x.externalID === externalID)?.[0];

      return res.status(200).json(detail);
   }

   return res.status(400).json({ code: "METHOD_NOT_SUPPORTED" });
}
