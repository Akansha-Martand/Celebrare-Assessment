import Gallery from './components/Gallery';

function App() {
  return (
    <div className="min-h-screen bg-[#A99796] text-[#111827] py-10 px-4">
      <div className="mx-auto max-w-7xl rounded-3xl bg-[#fffdf7] border border-slate-200 p-5 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center tracking-tight text-[#A99796] md:text-5xl">
          Photo Gallery
        </h1>
        <p className="text-center text-slate-600 mt-2 mb-6">Browse beautiful images and save your favorites.</p>
        <Gallery />
      </div>
    </div>
  );
}

export default App