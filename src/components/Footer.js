import React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';
import PropTypes from 'prop-types';
import {graphql, StaticQuery} from "gatsby";
import {connect} from "react-redux";

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
  alt: PropTypes.string
};


const FooterQuery = ({language}) => (

    <StaticQuery
        query={graphql`
        query {
          en : allContentfulFooter(filter: { node_locale: { eq: "en-US" } }) {
            edges {
                node {
                    firstLine
                    secondLine
                }
            }
          }
  fr : allContentfulFooter(filter: { node_locale: { eq: "fr" } }) {
            edges {
                node {
                    firstLine
                    secondLine
                }
            }
          }

}
      `}

        render={data => {
            const { firstLine, secondLine } = data[language].edges[0].node;
            return (
                <p style={{textAlign:'center'}}>
                    {firstLine}
                    <br />
                    {secondLine}
                </p>
            )
        }}/>
);

const mapStateToProps = ({ language }) => {
    return { language }
};


const ConnectedFooterQuery = connect(
    mapStateToProps
)(FooterQuery);


const Footer = () => (
  <FooterContainer>
      <ConnectedFooterQuery/>
  </FooterContainer>
);

export default Footer;
