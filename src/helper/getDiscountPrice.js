export const getDiscountPrice = (originalPrice, offer = 0) => {
  const discount_amount = originalPrice * offer;
  const final_Price = originalPrice - discount_amount;
  return final_Price;
};
export const getOffer = (offer) => {
  const off = offer * 100;
  return off;
};
