import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex, Label } from 'rebass';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import MouseIcon from '../components/MouseIcon';


const LandingPage = () => (
  <Section.Container id="home">
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulAbout {
            name
            roles
            socialLinks {
              id
              url
              name
              fontAwesomeIcon
            }
          }
        }
      `}
      render={data => {
        const { name, socialLinks, roles } = data.contentfulAbout;

        return (
          <Fragment>
            <Heading
              textAlign="center"
              is="h1"
              color="primary"
              fontSize={[5, 6, 8]}
              mb={[3, 4, 5]}
            >
              {`Hello, I'm ${name}!`}
            </Heading>

            <Heading
              is="h2"
              color="primary"
              fontSize={[4, 5, 6]}
              mb={[2, 4]}
              textAlign="center"
            >
                <TypistLoop interval={1000}>
                    {roles.map(text => (
                        <Typist key={text} delayStart={500}>
                            {text}
                        </Typist>
                    ))}
                </TypistLoop>

            </Heading>
            <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
              {socialLinks.map(({ id, ...rest }) => (
                <Label mx={3} fontSize={[5, 6, 6]} key={id}>
                  <SocialLink
                    color="primary"
                    hoverColor="primaryLight"
                    {...rest}
                  />
                </Label>
              ))}
            </Flex>
            <MouseIcon />
          </Fragment>
        );
      }}
    />
  </Section.Container>
);

export default LandingPage;
