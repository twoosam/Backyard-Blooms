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
    <div className="">
      <h1 className="text-2xl">Catalog</h1>
      <hr />
      <div className="">
        {categories?.map((category) => (
          <div key={category.categoryId} className="flex justify-center">
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
    <Link to={`/catalog/${categoryId}`}>
      <img src={imageUrl} className="object-scale-down h-20 w-20" alt={name} />
      <div className="">
        <h5 className="">{name}</h5>
      </div>
    </Link>
  );
}
