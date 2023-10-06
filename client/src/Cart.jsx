import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Cart() {
  const [item, setItem] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchCartItem() {
      setError(undefined);
      try {
        const response = await fetch(`/api/cart/${userId}`);
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const itemInCart = await response.json();
        setItem(itemInCart);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    fetchCartItem();
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Cart Details :{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl">Cart</h1>
      <hr />
      {item?.map((product, index) => (
        <div key={index}>
          <img src={product.imageUrl} className="object-scale-down h-20 w-20" />
          <h5>{product.name}</h5>
          <h5>${product.price}</h5>
        </div>
      ))}
    </div>
  );
}
