import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

import { Router, Request, Response } from "express";

(async () => {
  const app = express();

  const port = process.env.PORT || 8082;

  app.use(bodyParser.json());

  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  app.get("/filteredimage", async (req: Request, res: Response) => {
    let imgUrl: string = req.query.image_url;
    if (imgUrl) {
      filterImageFromURL(imgUrl)
        .then((img) => {
          res.statusCode = 200;
          res.sendFile(img, () => {
            return deleteLocalFiles([img]);
          });
        })
        .catch(() => {
          res.statusCode = 404;
          res.send("image not found, make sure you used a valid image URL");
        });
    } else {
      res.statusCode = 400;
      res.send("Please add the image URL");
    }
  });

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
