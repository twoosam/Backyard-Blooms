import { useEffect, useState } from 'react';

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/carousel');
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const result = await response.json();
        setImages(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    fetchImages();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);
    return () => clearTimeout(timerId);
  }, [currentIndex, images.length]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Carousel:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  return (
    <div className=" text-black bg-white w-screen font-serif">
      {/* <h1 className="text-2xl">Welcome</h1> */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image.imageUrl}
          alt={`Image ${index}`}
          style={{ display: index === currentIndex ? 'block' : 'none' }}
          className=""
        />
      ))}
    </div>
  );
}
