import styled from "styled-components";
import React from "react";
import {Label} from "rebass";
import { connect } from "react-redux"
import {TOGGLE_LANGUAGE} from "../redux/actions";


const LinkLanguage = styled.a`
  text-decoration: none;
  position: relative;
  margin-bottom: 0;
  padding-bottom: 5px;
  color: ${props => props.theme.colors.primary};
  border-bottom: ${props =>
    props.selected &&
    `${props.borderWidth} solid ${props.theme.colors.primaryLight}`};
  transition: 0.4s;
  scroll-behavior: smooth;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 0;
    bottom: -${props => props.borderWidth};
    background: ${props => props.theme.colors.primaryLight};
    height: ${props => props.borderWidth};
    transition-property: width;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`;

const mapStateToProps = ({ language }) => {
    return { language }
};

const mapDispatchToProps = dispatch => {
    return { toggleLanguage: () => dispatch({type:TOGGLE_LANGUAGE}) }
};

const component = ({language, toggleLanguage}) => (
    <Label
        onClick={toggleLanguage}
        ml={[2, 3]}
        color="background"
        fontSize={[2, 3]}
        css={{cursor: 'pointer'}}
    >
        <LinkLanguage borderWidth="4px">
            {language === 'en' ? "English" : "Français"}
        </LinkLanguage>
    </Label>
);

const ToogleLanguage = connect(
    mapStateToProps,
    mapDispatchToProps
)(component);

export default ToogleLanguage;