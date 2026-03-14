import useFetchPhotos from '../hooks/UseFetchPhotos';
import { useState, useMemo, useCallback, useReducer, useEffect } from 'react';
import { favouritesReducer } from '../reducers/favouritesReducers';

function Gallery() {
    const { photos, loading, error } = useFetchPhotos();
    const [search, setSearch] = useState('');

    const [favourites, dispatch] = useReducer(favouritesReducer, [], () => {
        const stored = localStorage.getItem('favourites');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    function toggleFavourite(photo) {
        dispatch({ type: 'TOGGLE_FAVOURITE', payload: photo });
    }

    const handleSearch = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const filteredPhotos = useMemo(() => {
        return photos.filter((photo) =>
            photo.author.toLowerCase().includes(search.toLowerCase())
        );
    }, [photos, search]);

    if (loading) {
        return <p className="text-center mt-10">Loading photos...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <input
                type="text"
                placeholder="Search by author..."
                value={search}
                onChange={handleSearch}
                className="border p-2 rounded w-full mb-4"
            />
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {filteredPhotos.map((photo) => (
                    <div key={photo.id} className="border rounded-lg p-3">
                        <img
                            src={photo.download_url}
                            alt={photo.author}
                            className="w-full h-48 object-cover rounded"
                        />
                        <div className="mt-2 flex justify-between items-center">
                            <p className="text-sm">{photo.author}</p>
                            <button
                                className="text-blue-600 text-xs"
                                onClick={() => toggleFavourite(photo)}
                            >
                                {favourites.some((fav) => fav.id === photo.id)
                                    ? 'Unfavorite'
                                    : 'Favorite'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;