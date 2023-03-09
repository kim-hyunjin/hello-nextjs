import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Modal from 'react-modal';
import clsx from 'classnames';

import styles from '@/styles/Video.module.css';
import { getPlaylistItems, getPlaylists } from '@/lib/videos';
import { YoutubeSnippet } from '@/types/youtube';
import { GetStaticProps } from 'next';
import NavBar from '@/components/nav/Navbar';

Modal.setAppElement('#__next');

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const videos: YoutubeSnippet[] = await getPlaylistItems(String(params?.playlistId));

  return {
    props: {
      videos,
    },
    revalidate: 60 * 30, // 30min
  };
};

export async function getStaticPaths() {
  const listOfPlaylists = await getPlaylists();

  const paths = listOfPlaylists.map((p) => ({
    params: { playlistId: p.id },
  }));

  return { paths, fallback: true };
}

const Video = ({ videos }: { videos: YoutubeSnippet[] }) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel='Watch the series'
        onRequestClose={handleClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {videos.map((v) => (
          <p key={v.id}>{v.title}</p>
        ))}
      </Modal>
    </div>
  );
};

export default Video;
