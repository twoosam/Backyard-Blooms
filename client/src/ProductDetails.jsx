import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductsDetails() {
  const { categoryId, productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [quantity, setQuantity] = useState(1);

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
      console.log(itemInCart);
    } catch (err) {
      setError(err);
    }
  }

  const { name, imageUrl, price, details } = product;
  const cartIdentifier = { userId: 1, productId: Number(productId), quantity };
  return (
    <div>
      <div className="">
        <h1 className="text-2xl">{name}</h1>
        <hr />
      </div>
      <img src={imageUrl} className=" h-80 w-80" alt={name} />
      <div className="">
        <h5>${price}</h5>
        <h5>{details}</h5>
        <label>
          Quantity:
          <select
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <Link to={`/cart/user/${cartIdentifier.userId}`}>
          <button
            onClick={() => addToCart(cartIdentifier)}
            className="text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-0.5">
            Add to cart
          </button>
        </Link>
      </div>
    </div>
  );
}
