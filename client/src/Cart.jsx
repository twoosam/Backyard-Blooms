import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  let subtotal = 0;
  items.forEach((item) => (subtotal += item.price * item.quantity));
  const salesTax = subtotal * 0.0725;
  const total = subtotal + salesTax;

  let totalItems = 0;
  items.forEach((item) => (totalItems += item.quantity));

  useEffect(() => {
    async function fetchCartItem() {
      setError(undefined);
      if (!localStorage.getItem('token')) {
        alert('You must be signed in to view your cart');
        navigate('/signIn');
        return;
      }
      try {
        const req = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const response = await fetch(`/api/cart/view`, req);
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
  }, [navigate]);

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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      await fetch(`/api/cart/${cartId}`, req);
      const keptItems = items.filter((i) => i.cartId !== cartId);
      setItems(keptItems);
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className="text-black font-serif">
      <div>
        <h1 className="text-2xl">Cart</h1>
        <hr />
      </div>
      <div className="flex flex-col lg:flex-row justify-center bg-gray-200">
        <div className="lg:basis-3/5 flex flex-col border border-neutral-300 rounded-lg shadow">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((product, index) => (
                <tr key={index}>
                  <td className="flex justify-center">
                    <img
                      src={product.imageUrl}
                      className="h-20 lg:h-40 w-20 lg:w-40 object-cover object-center"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price * product.quantity}</td>
                  <td>
                    <select
                      name="selectedQuantity"
                      value={product.quantity}
                      onChange={(e) =>
                        editCartItem(product.cartId, Number(e.target.value))
                      }
                      className="bg-gray-200 border border-neutral-400">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => removeCartItem(product.cartId)}
                      className="text-red-500">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:basis-2/5 justify-items-center pt-8 border border-neutral-300 rounded-lg shadow">
          <h1 className="text-2xl">Order Summary</h1>
          <hr className="border-solid border-black w-52 m-auto" />
          <div className="text-lg">
            <div>{`${totalItems} item(s): $${subtotal.toFixed(2)}`}</div>
            <div>{`Sales Tax: $${salesTax.toFixed(2)}`}</div>
            <h1 className="pt-5 font-bold">{`Total: $${total.toFixed(2)}`}</h1>
            <div className="pt-5 pb-5">
              <button className="text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-4">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
