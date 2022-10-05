import { VideoType } from "../models/db";
import { VideoViewModel } from "../models/dto/video-view.model";

export const getVideoViewModel = (dbCourse: VideoType): VideoViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
    author: dbCourse.author,
    canBeDownloaded: dbCourse.canBeDownloaded,
    minAgeRestriction: dbCourse.minAgeRestriction,
    createdAt: dbCourse.createdAt,
    publicationDate: dbCourse.publicationDate,
    availableResolutions: dbCourse.availableResolutions,
  };
};
