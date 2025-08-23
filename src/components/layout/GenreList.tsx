import useGenres from "@/hooks/useGenres";

const GenreList = () => {
    const { data, error, loading } = useGenres();

    return (
        <div className="genre-list">
            {data.map((genre) => (
                <div key={genre.id} className="genre-item">
                    {genre.name}
                </div>
            ))}
        </div>
    );
};

export default GenreList;