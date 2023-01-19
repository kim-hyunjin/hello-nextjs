import videoData from '../data/temp.json';
import Video from '../types/video';

export const getVideos = (): Promise<Video[]> => {
  return Promise.resolve().then(() => {
    return videoData.items.map((v) => ({
      id: v.id.videoId,
      imgUrl: v.snippet.thumbnails.high.url,
    }));
  });
};
