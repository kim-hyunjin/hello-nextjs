import videoData from '../data/temp.json';
import Video from '../types/video';

export const getVideos = (): Video[] => {
  return videoData.items.map((v) => ({
    id: v.id.videoId,
    imgUrl: v.snippet.thumbnails.high.url,
  }));
};
