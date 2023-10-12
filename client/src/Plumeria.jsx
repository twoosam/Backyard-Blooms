import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Products() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`/api/${categoryId}/product`);
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const result = await response.json();
        setProducts(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProducts();
  }, [categoryId]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Products :{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  return (
    <div className="font-serif text-black">
      <h1 className="text-2xl">Products</h1>
      <hr />
      <div className="flex justify-center flex-wrap bg-gray-200">
        {products?.map((product) => (
          <div key={product.productId} className="basis-1/3 content-center">
            <ProductListCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductListCard({ product }) {
  const { categoryId, productId, name, imageUrl, price } = product;
  return (
    <div className=" border border-neutral-300 rounded-lg shadow ">
      <Link to={`/catalog/${categoryId}/${productId}`}>
        <div className="flex justify-center flex-wrap pt-8">
          <img
            src={imageUrl}
            className="h-80 w-80 object-cover object-center"
            alt={name}
          />
        </div>
        <h5>{name}</h5>
        <h5>${price}</h5>
      </Link>
    </div>
  );
}
