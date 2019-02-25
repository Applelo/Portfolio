import React from 'react';
import { Box, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import withNavigation from '../utils/withNavigation';
import connect from "react-redux/es/connect/connect";

const AboutText = styled(Box)`
  p:first-child {
    margin-top: 0em;
  }

  p {
    line-height: 2em;
  }

  ul {
    margin: 0;

    li {
      margin: 1em 0;
      line-height: 2em;
    }
  }

  a {
    display: inline-block;
    transition: color 250ms, text-shadow 250ms;
    color: black;
    text-decoration: none;
    position: relative;

    &:after {
      position: absolute;
      z-index: -1;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      width: 100%;
      height: 3px;
      background-color: ${props => props.theme.colors.primaryLight};
      transition: all 250ms;
    }

    &:hover {
      color: white;

      &::after {
        height: 110%;
        width: 110%;
      }
    }
  }
`;

const mapStateToProps = ({ language }) => {
    return { language }
};


const AboutQuery = ({language}) => (
    <StaticQuery
        query={graphql`
        query {
        en : allContentfulAbout(filter: { node_locale: { eq: "en-US" } }) {
          edges {
          	node {
            	aboutMe {
              	childMarkdownRemark {
                	html
              	}
            	}
            }
          }
        }
  			fr : allContentfulAbout(filter: { node_locale: { eq: "fr" } }) {
          edges {
          	node {
            	aboutMe {
              	childMarkdownRemark {
                	html
              	}
            	}
            }
          }
        }
}
      `}
        render={data => {
            const { aboutMe } = data[language].edges[0].node;

            return (
                <div>
                <Section.Header name={language === 'en' ? "About" : "A propos"} />
                <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1]} px={[1, 2, 4]}>
                        <Fade>
                            <AboutText
                                dangerouslySetInnerHTML={{
                                    __html: aboutMe.childMarkdownRemark.html,
                                }}
                            />
                        </Fade>
                    </Box>
                </Flex>
                </div>
            );
        }}
    />
);

const ConnectedFooterQuery = connect(
    mapStateToProps
)(AboutQuery);

const About = () => (
  <Section.Container id="about">
    <ConnectedFooterQuery/>
  </Section.Container>
);

export default withNavigation({
    label: {
        en: 'About',
        fr: 'A propos'
    },
    id: 'about'
})(About);
