import React from 'react';
import styled from 'styled-components';
import { Text, Flex, Box } from 'rebass';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import MateLogo from './Logo/Portfolio.svg';

const FooterContainer = styled.footer`
  padding: 1em;
  background: ${props => props.theme.colors.primaryDark};
  color: ${props => props.theme.colors.background};
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResponsiveLogo = styled.img`
  width: 50px;
  height: 50px;

  @media (min-width: 400px) {
    width: 100px;
    height: 100px;
  }
`;

const Logo = ({ url, logo, alt = '' }) => (
  <Box>
    <a href={url} rel="noopener noreferrer" target="_blank">
      <ResponsiveLogo src={logo} alt={alt} />
    </a>
  </Box>
);

Logo.propTypes = {
  url: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

const Footer = () => (
  <FooterContainer>
    <p style={{textAlign:'center'}}>
          Developed by Loïs (alias Applelo) with ❤️
          ️
      <br />
          Based on Mate template by
      <em>emasuriano</em>
    </p>
  </FooterContainer>
);

export default Footer;
