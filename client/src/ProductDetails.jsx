import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductsDetails() {
  const { categoryId, productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadProductDetails() {
      try {
        const response = await fetch(`/api/${categoryId}/product/${productId}`);
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const result = await response.json();
        setProduct(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProductDetails();
  }, [categoryId, productId]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Product Details :{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  async function addToCart(item) {
    try {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      };
      const response = await fetch('/api/cart', req);
      if (!response.ok) {
        throw new Error(`fetch Error ${response.status}`);
      }
      const itemInCart = await response.json();
      console.log('Item added to cart', itemInCart);
    } catch (err) {
      setError(err);
    }
  }

  const { name, imageUrl, price, details } = product;
  const cartIdentifier = { userId: 1, productId: Number(productId) };
  return (
    <div>
      <div className="">
        <h1 className="text-2xl">{name}</h1>
        <hr />
      </div>
      <img src={imageUrl} className="object-scale-down h-20 w-20" alt={name} />
      <div className="">
        <h5>${price}</h5>
        <h5>{details}</h5>
        <Link to={`/cart/user/${cartIdentifier.userId}`}>
          <button onClick={() => addToCart(cartIdentifier)}>Add to cart</button>
        </Link>
      </div>
    </div>
  );
}
