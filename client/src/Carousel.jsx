import { useEffect, useState } from 'react';
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaCircle,
//   FaRegCircle,
// } from 'react-icons/fa';

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
    <div>
      <h1 className="text-2xl">Welcome</h1>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.imageUrl}
          alt={`Image ${index}`}
          style={{ display: index === currentIndex ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
}

// return (
//   <div className="box">
//     <div className="row">
//       <PrevButton
//         onSelect={() =>
//           setCurrentIndex((currentIndex - 1 + images.length) % images.length)
//         }
//       />
//       <Banner image={images[currentIndex]} />
//       <NextButton
//         onSelect={() => setCurrentIndex((currentIndex + 1) % images.length)}
//       />
//     </div>
//     <Indicators
//       count={images.length}
//       current={currentIndex}
//       onSelect={(i) => setCurrentIndex(i)}
//     />
//   </div>
// );
// }

// function Banner({ image }) {
// return (
//   <div>
//     <img src={`/images/${image}.png`} alt={image} className="img" />
//   </div>
// );
// }

// function PrevButton({ onSelect }) {
// return <FaChevronLeft onClick={onSelect} className="arrow" />;
// }

// function NextButton({ onSelect }) {
// return <FaChevronRight onClick={onSelect} className="arrow" />;
// }

// function Indicators({ count, current, onSelect }) {
// const buttons = [];
// for (let i = 0; i < count; i++) {
//   if (i === current) {
//     buttons.push(
//       <FaCircle onClick={() => onSelect(i)} className="circles" />
//     );
//   } else {
//     buttons.push(
//       <FaRegCircle onClick={() => onSelect(i)} className="circles" />
//     );
//   }
// }
// return <div>{buttons}</div>;
// }
