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
        <div className="p-4">
            <div className="mb-4 max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Search by author..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full rounded-2xl border border-black/20 bg-white/10 px-4 py-3 text-slate-900 placeholder:text-slate-500 shadow-md focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                />
            </div>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                {filteredPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        className="group rounded-2xl border border-white/20 bg-white/10 p-2 shadow-xl backdrop-blur hover:-translate-y-1 transition-transform"
                    >
                        <img
                            src={photo.download_url}
                            alt={photo.author}
                            className="w-full h-56 object-cover rounded-xl"
                        />
                        <div className="mt-3 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-black">{photo.author}</p>
                            </div>
                            <button
                                className={`w-10 h-10 flex items-center justify-center rounded-full text-2xl transition shadow-md ${favourites.some((fav) => fav.id === photo.id)
                                    ? 'bg-[white] text-[#7F6E6D] ring-2 ring-[#d9b99d]'
                                    : 'bg-white text-[#7F6E6D] ring-2 ring-[#d9b99d] hover:bg-[white]'
                                    }`}
                                onClick={() => toggleFavourite(photo)}
                                aria-label={favourites.some((fav) => fav.id === photo.id) ? 'Remove favorite' : 'Add favorite'}
                            >
                                {favourites.some((fav) => fav.id === photo.id) ? '♥' : '♡'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;