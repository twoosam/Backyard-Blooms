import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Plumeria() {
  const [plumerias, setPlumerias] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadPlumeria() {
      try {
        const response = await fetch('/api/:categoryId/product');
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const result = await response.json();
        setPlumerias(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadPlumeria();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Plumeria :{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  return (
    <div className="container">
      <h1 className="text-2xl">Plumeria</h1>
      <hr />
      <div className="row">
        {plumerias?.map((product) => (
          <div key={product.productId} className="col-12 col-md-6 col-lg-4">
            <PlumeriaCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlumeriaCard({ product }) {
  const { productId, name, imageUrl } = product;
  return (
    <Link to={`details/${productId}`}>
      <img src={imageUrl} className="object-scale-down h-20 w-20" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
    </Link>
  );
}
