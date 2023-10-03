import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Catalog.css';

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
    <div className="container">
      <h1>Catalog</h1>
      <hr />
      <div className="row">
        {categories?.map((category) => (
          <div key={category.categoryId} className="col-12 col-md-6 col-lg-4">
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
    <Link to={`details/${categoryId}`}>
      <img src={imageUrl} className="img-size" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
    </Link>
  );
}
