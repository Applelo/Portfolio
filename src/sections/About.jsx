import React from 'react';
import { Box, Image, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import withNavigation from '../utils/withNavigation';

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

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  transition: all 0.25s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const About = () => (
  <Section.Container id="about">
    <Section.Header name="About" />
    <StaticQuery
      query={graphql`
        query AboutMeQuery {
          contentfulAbout {
            aboutMe {
              childMarkdownRemark {
                html
              }
            }

          }
        }
      `}
      render={data => {
        const { aboutMe } = data.contentfulAbout;
        return (
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
              <Fade>
                <AboutText
                  dangerouslySetInnerHTML={{
                    __html: aboutMe.childMarkdownRemark.html,
                  }}
                />
              </Fade>
            </Box>
          </Flex>
        );
      }}
    />
  </Section.Container>
);

export default withNavigation({ label: 'About', id: 'about' })(About);
