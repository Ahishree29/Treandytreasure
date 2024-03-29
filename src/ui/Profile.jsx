import { useSelector } from "react-redux";
import styled from "styled-components";

const Styledprofile = styled.div`
  background-color: ${(props) => props.bgColor};
  border-radius: 100%;
  border: 20px solid ${(props) => props.bgColor};
  margin: 10px;
`;
function Profile({ name }) {
  const profileLetter = name.charAt(0);
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };
  const isloggedin = useSelector((store) => store.loginslice.isloggedin);
  const bgColor = randomColor();
  const borderColor = randomColor();

  return (
    isloggedin && (
      <Styledprofile bgColor={bgColor} borderColor={borderColor}>
        {profileLetter}
      </Styledprofile>
    )
  );
}

export default Profile;
