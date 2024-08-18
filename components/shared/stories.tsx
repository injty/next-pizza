"use client";

import { FC, useEffect, useState } from "react";
import ReactStories from "react-insta-stories";

import { Container } from "./container";

import { Api } from "@/services/api-client";
import { IStory } from "@/services/stories";
import { cn } from "@/utils/helpers/cn";
import { X } from "lucide-react";

interface StoriesProps {
  className?: string;
}

export const Stories: FC<StoriesProps> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <Container className={cn("my-10 flex items-center justify-between gap-2", className)}>
      {stories.length === 0 && [...Array(6)].map((_, i) => <div className="h-[250px] w-[200px] animate-pulse rounded-md bg-gray-200" key={i} />)}
      {stories.map((story) => (
        <img
          alt="Story."
          className="cursor-pointer rounded-md"
          height={250}
          key={story.id}
          onClick={() => onClickStory(story)}
          src={story.previewImageUrl}
          width={200}
        />
      ))}
      {open && (
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/80">
          <div className="relative" style={{ width: 520 }}>
            <button className="-top-30 -right-30 absolute z-30" onClick={() => setOpen(false)}>
              <X className="absolute right-0 top-0 h-8 w-8 text-white/50" />
            </button>
            <ReactStories
              defaultInterval={3000}
              height={800}
              onAllStoriesEnd={() => setOpen(false)}
              stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
              width={520}
            />
          </div>
        </div>
      )}
    </Container>
  );
};
