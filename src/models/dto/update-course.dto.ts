import { ResolutionsType } from "../db";

export interface UpdateVideoDto {
  title?: string;
  author?: string;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number | null;
  availableResolutions?: ResolutionsType[];
}
