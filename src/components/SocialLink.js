import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'rebass';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconLink = styled(Link)`
  transition: color 0.5s;
  color: ${props => props.theme.colors[props.color]};

  &:hover {
    color: ${props => props.theme.colors[props.hover]};
  }
`;

const IconLinkDisable = styled(Link)`
  transition: color 0.5s;
  color: #dddd;
  pointer-events: none;
  cursor: default;
`;

const SocialLink = ({ fontAwesomeIcon, name, url, color, hoverColor }) => {

        if (url) {
            return (
                <Tooltip title={name} position="bottom" trigger="mouseenter">
                    <IconLink rel="noopener noreferrer" href={url} target="_blank" color={color} hover={hoverColor}>
                        <FontAwesome name={fontAwesomeIcon} />
                    </IconLink>
                </Tooltip>
            )
        }
        return (
            <IconLinkDisable href="#">
                <FontAwesome name={fontAwesomeIcon} />
            </IconLinkDisable>
        )
};

SocialLink.propTypes = {
  fontAwesomeIcon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  color: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
};

export default SocialLink;
