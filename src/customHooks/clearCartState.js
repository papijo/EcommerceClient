const clearCartState = () => {
  let products = [];
  let quantity = 0;
  let shipping = {};

  return { shipping, products, quantity };
};

export default clearCartState;
