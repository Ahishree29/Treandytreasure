import styled from "styled-components";

import { IoLogoTwitter } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const StyleFooter = styled.footer`
  background-color: #181618;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  border-color: #181618;
  position: fixed;
  bottom: 0;

  @media (max-width: 780px) {
    padding-top: 5px;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 780px) {
    margin-bottom: 1px;
  }
`;

const Footericon = styled.a`
  color: white;
  width: 1.5rem;
  height: 1.5rem;

  margin: 0 10px;

  @media (max-width: 780px) {
    margin: 0 1px;
    width: 2rem;
    height: 2rem;
  }
`;

const FooterText = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

const FooterBase = styled.div`
  background-color: white;
  color: black;
  padding: 5px;
  font-size: smaller;
  display: flex;
  justify-content: space-between;

  @media (max-width: 780px) {
    padding: 5px;
  }
`;
const Footercontact = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 355px) {
    display: flex;
    flex-direction: column;
  }
`;
const StyledContact = styled.span`
  padding-right: 15px;
`;

function Footer() {
  const facebookUrl = "https://www.facebook.com/yourPage";
  const twittwrUrl = "https://twitter.com/i/flow/login";
  const LinkedinUrl = "https://www.linkedin.com/notifications/?filter=all";
  const handleFacebookClick = (e) => {
    e.preventDefault();
    window.open(facebookUrl, "_blank");
  };
  const handletwitter = (e) => {
    e.preventDefault();
    window.open(twittwrUrl, "_blank");
  };
  const handleLinkedin = (e) => {
    e.preventDefault();
    window.open(LinkedinUrl, "_blank");
  };
  return (
    <StyleFooter>
      <Icon>
        <Footericon
          href={facebookUrl}
          onClick={handleFacebookClick}
          target="_blank"
        >
          <FaFacebookF />
        </Footericon>
        <Footericon href={twittwrUrl} onClick={handletwitter} target="_blank">
          <IoLogoTwitter />
        </Footericon>
        <Footericon href={LinkedinUrl} onClick={handleLinkedin} target="_blank">
          <FaLinkedinIn />
        </Footericon>
      </Icon>
      <FooterText>Bangalore,Karnataka,India</FooterText>
      <FooterText>
        <Footercontact>
          {" "}
          <FaPhoneAlt /> <StyledContact> +91-9928736767 </StyledContact>
          <IoMdMail /> <StyledContact> trendytesure@gmail.com</StyledContact>
        </Footercontact>
      </FooterText>

      <FooterBase>
        <span>copyright coder 2023</span>
        <span>powered By @ARP</span>
      </FooterBase>
    </StyleFooter>
  );
}

export default Footer;
