import Video from '../types/video';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const calmdownman_id = 'UCUj6rrhMTR9pipbAWBAMvUQ';

export const getVideos = async (type: 'video' | 'playlist'): Promise<Video[]> => {
  try {
    const response = await fetch(
      `${YOUTUBE_SEARCH_URL}?part=snippet&channelId=${calmdownman_id}&order=date&type=${type}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.error('youtube api error', data.error);
      return [];
    }

    return data.items.map((v: any) => ({
      id: type === 'video' ? v.id.videoId : v.id.playlistId,
      imgUrl: v.snippet.thumbnails.high.url,
      title: v.snippet.title,
      description: v.snippet.description,
    }));
  } catch (e) {
    console.error('error while call youtube api', e);
    return [];
  }
};
