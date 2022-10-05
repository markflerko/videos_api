import { ResolutionsType } from "../db";

export interface CreateVideoDto {
  title: string;
  author: string;
  availableResolutions: ResolutionsType[];
  canBeDownloaded?: boolean;
  minAgeRestriction?: number | null;
}
