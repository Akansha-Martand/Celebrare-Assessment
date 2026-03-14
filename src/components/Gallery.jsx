import useFetchPhotos from '../hooks/useFetchPhotos';
function Gallery() {
    const { photos, loading, error } = useFetchPhotos();

    if (loading) {
        return <p className="text-center mt-10">Loading photos...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {photos.map((photo) => (
                <div key={photo.id} className="border rounder-lg p-3">
                    <img src={photo.download_url} alt={photo.author} className="w-full h-48 object-cover rounded" />
                    <p className="mt-2 text-sm">{photo.author}</p>
                </div>
            ))}
        </div>
    );
}
export default Gallery;