import useFetchPhotos from '../hooks/useFetchPhotos';
import { useState, useMemo, UseCallback } from 'react';
import { useReducer, useEffect } from "react";
import { favouritesReducer } from "../reducers/favouritesReducer";


function Gallery() {
    const { photos, loading, error } = useFetchPhotos();
    const { search, setSearch } = useState('');

    const [favourites, dispatch] = useReducer(favouritesReducer, [], () => {
        const stored = localStorage.getItem("favourites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    function toggleFavourite(photo) {
        dispatch({ type: "TOGGLE_FAVOURITE", payload: photo });
    }

    const handleSearch = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const filterPhotos = useMemo(() => {
        return photos.filter((photo) => photo.author.toLowerCase().includes(search.toLowerCase()));

    }, [photos, search]);


    if (loading) {
        return <p className="text-center mt-10">Loading photos...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <input type="text" placeholder='Search by author...' value={search} onChange={handleSearch} className="border p-2 rounded w-full mb-4" />
            {filteredphotos.map((photo) => (
                <div key={photo.id} className="border rounder-lg p-3">
                    <img src={photo.download_url} alt={photo.author} className="w-full h-48 object-cover rounded" />
                    <p className="mt-2 text-sm">{photo.author}</p>
                </div>
            ))}
        </div>
    );
}
export default Gallery;