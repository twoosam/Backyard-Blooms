import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const response = await fetch('/api/category');
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const result = await response.json();
        setCategories(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCatalog();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  return (
    <div className="font-serif text-black">
      <h1 className="text-2xl">Catalog</h1>
      <hr />
      <div className="flex justify-center flex-wrap bg-gray-200">
        {categories?.map((category) => (
          <div
            key={category.categoryId}
            className="lg:basis-1/3 content-center">
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  const { categoryId, name, imageUrl } = category;
  return (
    <div className=" border border-neutral-300 rounded-lg shadow ">
      <Link to={`/catalog/${categoryId}`}>
        <div className="flex justify-center flex-wrap pt-8">
          <img
            src={imageUrl}
            className="h-80 w-80 object-cover object-center"
            alt={name}
          />
        </div>
        <h5 className="text-xl mt-4">{name}</h5>
      </Link>
    </div>
  );
}
