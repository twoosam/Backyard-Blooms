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
    if (!sessionStorage.getItem('token')) {
      alert('You must be signed in to add to cart');
      return;
    }
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(item),
      };
      const response = await fetch('/api/cart/add', req);
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
  const cartIdentifier = {
    userId: Number(sessionStorage.getItem('userId')),
    productId: Number(productId),
    quantity,
  };
  return (
    <div className="font-serif text-black">
      <h1 className="text-2xl">{name}</h1>
      <hr />
      <div className=" flex justify-center bg-gray-200">
        <div className="basis-2/5 flex pl-24 pt-20 pb-52 border border-neutral-300 rounded-lg shadow ">
          <img
            src={imageUrl}
            className=" h-96 w-96 object-cover object-center"
            alt={name}
          />
        </div>
        <div className="basis-3/5 justify-items-center pt-20 border border-neutral-300 rounded-lg shadow ">
          <h1 className="text-2xl">Product Details</h1>
          <hr className="border-solid border-black w-96 m-auto" />
          <h5 className="pt-5 text-lg">{details}</h5>
          <h5 className="pt-5 text-xl font-bold ">${price}</h5>
          <div className="flex justify-center text-lg">
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
            <button
              onClick={() => addToCart(cartIdentifier)}
              className="text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-0.5">
              Add to cart
            </button>
            <Link to={`/cart`}>View cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
