import express from "express";
import bodyParser from "body-parser";
import { Router, Request, Response } from "express";

(async () => {
  const app = express();

  const port = process.env.PORT || 8082;

  app.use(bodyParser.json());

  app.use("/", async (req: Request, res: Response) => {
    res.send(
      "try method: GET & path: /filteredimage?image_url={{}}, so you can edit your image"
    );
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
