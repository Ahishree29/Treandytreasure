import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useGetCart() {
  const [cartItem, setCartItem] = useState([]);

  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.loginslice.userId);
  const Delete = useSelector((store) => store.cartslice.delete);
  const isselector = useSelector((store) => store.cartslice.selector);

  useEffect(
    function () {
      const abortController = new AbortController();

      async function getCart() {
        try {
          setisLoading(true);
          const data = await fetch(`http://localhost:5000/api/cart/${userId}`, {
            headers: {
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )} `,
            },
            signal: abortController.signal,
          });

          if (!data.ok) {
            throw new Error(`Request failed with status: ${data.status}`);
          }

          const cartdata = await data.json();
          dispatch(setCartItem(cartdata));
          setCartItem(cartdata);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setisLoading(false);
        }
      }

      getCart();

      return () => {
        abortController.abort();
      };
    },
    [Delete, isselector]
  );

  return { cartItem, isLoading };
}
