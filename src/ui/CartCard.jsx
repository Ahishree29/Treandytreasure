import ItemCard from "./ItemCard";

function CartCard({ item }) {
  const {
    _id: id,
    color,
    price,
    brand,
    type,
    fabric,
    gender,
    image,
    occation,
    stock,
    size,
    userId,
    quantity,
  } = item;
  return (
    <div>
      <ItemCard
        id={id}
        image={image}
        brand={brand}
        gender={gender}
        occation={occation}
        fabric={fabric}
        color={color}
        price={price}
        stock={stock}
        size={size}
        type={type}
        userId={userId}
        quantity={quantity}
      />
    </div>
  );
}

export default CartCard;
