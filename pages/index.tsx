import { GetServerSideProps } from "next";
import SEO from "../components/SEO";

type Movie = {
    id: string;
    original_title: string;
    poster_path: string;
};

export default function Home({ movies }: { movies: Movie[] }) {
    return (
        <div className="container">
            <SEO title="Home"></SEO>
            {movies.length === 0 && <h4>Loading...</h4>}
            {movies?.map((movie) => {
                return (
                    <div className="movie" key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                        <h4>{movie.original_title}</h4>
                    </div>
                );
            })}
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch("http://localhost:3000/api/movies");
    const data = await res.json();
    return {
        props: {
            movies: data.results,
        },
    };
};
