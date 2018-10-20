import React from 'react';
import Headroom from 'react-headroom';
import {Flex, Image} from 'rebass';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import RouteLink from './RouteLink';
import Logo from '../assets/img/Logo.svg';
import ToggleLanguage from "./ToggleLanguage";
import {SectionConsumer} from "./SectionContext";
import connect from "react-redux/es/connect/connect";

const HeaderContainer = styled(Headroom)`
 

  position: absolute;
  width: 100%;
`;
const mapStateToProps = ({ language }) => {
    return { language }
};


const SectionConsumerWithLanguage = ({language}) => (
    <SectionConsumer>
        {({ sections }) =>
            sections.map(({ label, id }) => (
                <RouteLink key={id} label={label[language]} to={id} />
            ))
        }
    </SectionConsumer>
);

const ConnectedSectionConsumer = connect(
    mapStateToProps
)(SectionConsumerWithLanguage);

const Header = () => (
  <HeaderContainer>
    <Fade top>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <a href="#home">
          <Image src={Logo} width="50px" alt="Portfolio Logo" />
        </a>
        <Flex mr={[0, 3, 5]}>
            <ConnectedSectionConsumer/>
            <ToggleLanguage/>
        </Flex>
      </Flex>
    </Fade>
  </HeaderContainer>
);

export default Header;
