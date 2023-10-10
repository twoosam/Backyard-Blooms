import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Cart() {
  const [items, setItems] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchCartItem() {
      setError(undefined);
      try {
        const response = await fetch(`/api/cart/${userId}`);
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const itemsInCart = await response.json();
        setItems(itemsInCart);
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

  async function editCartItem(cartId, quantity) {
    try {
      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity, userId }),
      };
      const response = await fetch(`/api/cart/${cartId}`, req);
      if (!response.ok) {
        throw new Error(`fetch Error ${response.status}`);
      }
      const editedCart = await response.json();
      if (editedCart) console.log(editedCart);
      const updatedCart = items.map((i) =>
        i.cartId === cartId ? { ...i, quantity } : i
      );
      setItems(updatedCart);
    } catch (err) {
      setError(err);
    }
  }

  async function removeCartItem(cartId) {
    try {
      const req = {
        method: 'DELETE',
      };
      await fetch(`/api/cart/${cartId}`, req);
      const keptItems = items.filter((i) => i.cartId !== cartId);
      setItems(keptItems);
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl">Cart</h1>
        <hr />
      </div>
      <div className="flex justify-center">
        <div className="basis-1/2">
          {items?.map((product, index) => (
            <div
              key={index}
              className="flex flex-wrap content-center items-center ml-20 pt-8">
              <img src={product.imageUrl} className="h-40 w-40" />
              <div className=" flex justify-center pl-8 gap-x-8">
                <h5>{product.name}</h5>
                <h5>${product.price}</h5>
                <label>
                  Quantity:
                  <select
                    name="selectedQuantity"
                    value={product.quantity}
                    onChange={(e) =>
                      editCartItem(product.cartId, Number(e.target.value))
                    }>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label>
                <button onClick={() => removeCartItem(product.cartId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="basis-1/2 pt-8">
          <button className="text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-4">
            Checkout
          </button>
          <h1>Order Summary</h1>
          <h1>Total:</h1>
        </div>
      </div>
    </div>
  );
}
