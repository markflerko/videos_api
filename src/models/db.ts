export const P144 = "P144";

export type ResolutionsType = typeof P144;

export type VideoType = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: ResolutionsType[];
};

export type dbType = {
  videos: VideoType[];
};

export const db: dbType = {
  videos: [
    {
      id: 0,
      title: "string",
      author: "string",
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: "2022-10-05T19:48:06.772Z",
      publicationDate: "2022-10-05T19:48:06.772Z",
      availableResolutions: ["P144"],
    },
  ],
};

export default db;
