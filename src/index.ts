import express, { Response } from "express";
import db, { VideoType } from "./models/db";
import { CreateVideoDto } from "./models/dto/create-video.dto";
import { IdParam } from "./models/dto/id.param";
import { TitleQuery } from "./models/dto/title.query";
import { UpdateVideoDto } from "./models/dto/update-course.dto";
import { VideoViewModel } from "./models/dto/video-view.model";
import { HTTP_STATUS } from "./models/status-codes.constants";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "./types";
import { getVideoViewModel } from "./utils/getVideoViewModel";

export const app = express();
const jsonParser = express.json();
app.use(jsonParser);
const port = 3001;

app.delete("/__test__/data", (req, res) => {
  db.videos = [];
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});

app.get(
  "/videos",
  (req: RequestWithQuery<TitleQuery>, res: Response<VideoViewModel[]>) => {
    let results = db.videos;

    if (req.query.title) {
      results = db.videos.filter(
        (video) => video.title.indexOf(req.query.title as string) > -1
      );
    }

    res.json(results.map(getVideoViewModel));
  }
);

app.get(
  "/videos/:id",
  (req: RequestWithParams<IdParam>, res: Response<VideoViewModel>) => {
    const foundedCourse = db.videos.find((item) => item.id === +req.params.id);

    if (!foundedCourse) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
      return;
    }

    res.json(getVideoViewModel(foundedCourse));
  }
);

app.delete("/videos/:id", (req: RequestWithParams<IdParam>, res) => {
  const index = db.videos.findIndex((item) => item.id === +req.params.id);

  if (index === -1) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }

  db.videos.splice(index, 1);

  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});

app.put(
  "/videos/:id",
  (
    req: RequestWithParamsAndBody<IdParam, UpdateVideoDto>,
    res: Response<VideoViewModel>
  ) => {
    if (!req.body?.title) {
      res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
      return;
    }

    const foundedVideo = db.videos.find((item) => item.id === +req.params.id);
    if (!foundedVideo) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
      return;
    }
    foundedVideo.title = req.body.title;
    foundedVideo.author = req.body.author;
    foundedVideo.availableResolutions = req.body.availableResolutions;
    foundedVideo.canBeDownloaded = req.body.canBeDownloaded;
    foundedVideo.minAgeRestriction = req.body.minAgeRestriction;

    res.json(getVideoViewModel(foundedVideo));
  }
);

app.post(
  "/videos",
  (req: RequestWithBody<CreateVideoDto>, res: Response<VideoViewModel>) => {
    if (!req.body?.title) {
      res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
      return;
    }

    const newVideo: VideoType = {
      id: Date.now(),
      title: req.body?.title,
      author: req.body?.author,
      availableResolutions: req.body?.availableResolutions,
      canBeDownloaded: req.body?.canBeDownloaded || true,
      minAgeRestriction: req.body?.minAgeRestriction || null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
    };

    db.videos.push(newVideo);

    res.json(getVideoViewModel(newVideo));
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
