import { Story, StoryItem } from "@prisma/client";
import { instance } from "./instance";

export type IStory = {
  items: StoryItem[];
} & Story;

export const getAll = async () => {
  return (await instance.get<IStory[]>("/stories")).data;
};
