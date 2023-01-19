import Video from '../types/video';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const calmdownman_id = 'UCUj6rrhMTR9pipbAWBAMvUQ';

export const getVideos = async (): Promise<Video[]> => {
  const response = await fetch(
    `${YOUTUBE_SEARCH_URL}?part=snippet&channelId=${calmdownman_id}&order=date&type=video&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`
  );

  const data = await response.json();

  return data.items.map((v: any) => ({
    id: v.id.videoId,
    imgUrl: v.snippet.thumbnails.high.url,
  }));
};
