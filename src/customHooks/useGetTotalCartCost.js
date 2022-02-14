import { useSelector } from "react-redux";

const useGetTotalCartCost = () => {
  const cart = useSelector((state) => state.cart);
  let totalCartCost = 0;

  cart.products.map((p) => {
    return (totalCartCost += p.quantity * p.price);
  });

  return { totalCartCost };
};

export default useGetTotalCartCost;
