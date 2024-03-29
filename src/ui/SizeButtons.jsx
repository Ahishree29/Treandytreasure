import { useDispatch } from "react-redux";
import styled from "styled-components";
import { selectedsize } from "../Redux/cartslice";
const Styledsize = styled.button`
  height: 30px;
  width: 30px;
  background-color: #6b3414;
  color: white;
  margin: 5px;
  font-size: 15px;
`;
function SizeButtons({ itemsize }) {
  const dispatch = useDispatch();
  function handelSize(size) {
    dispatch(selectedsize(size));
  }
  return (
    <Styledsize onClick={() => handelSize(itemsize)}>{itemsize}</Styledsize>
  );
}

export default SizeButtons;
