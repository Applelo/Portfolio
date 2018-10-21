import React from 'react';
import {Subhead, Image, Text, Flex, Label} from 'rebass';
import {StaticQuery, graphql} from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import {CardContainer, Card} from '../components/Card';
import SocialLink from '../components/SocialLink';
import ImageSubtitle from '../components/ImageSubtitle';
import withNavigation from '../utils/withNavigation';
import connect from "react-redux/es/connect/connect";

const Title = styled(Subhead)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  width: calc(100% - 100px);
  flex-direction: column;
  padding: 10px;

  @media (min-width: 400px) {
    width: calc(100% - 200px);
  }
`;

const ImageContainer = styled.div`
  width: 100px;
  margin: auto;

  @media (min-width: 400px) {
    width: 200px;
  }
`;

const EmptyProjectImage = styled.div `
 padding: 10px;
  margin-top: 50px;
  height: 100px !important;
  width: 100px;
    
  @media (min-width: 400px) {
    width: 200px;
    padding: 40px;
    height: 200px !important;
    margin-top: 0px;
  }
`;

const ProjectImage = styled(Image)`
  padding: 10px;
  margin-top: 50px;
  height: 100px !important;
  width: 100px;
    border-radius: 50px;
    
  @media (min-width: 400px) {
    width: 200px;
    padding: 40px;
    height: 200px !important;
    margin-top: 0px;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  float: right;
  padding: 2px;
  top: -220px;

  @media (min-width: 400px) {
    top: -237px;
  }
`;

const getProjectImage = (logo) => {
    if (logo !== null) {
        return (<ProjectImage src={logo.img.src} alt={logo.title}/>);
    }
    else {
        return (<EmptyProjectImage/>);
    }
}

const Project = ({
                     name,
                     description,
                     projectUrl,
                     repositoryUrl,
                     type,
                     publishedDate,
                     logo,
                     language
                 }) => {
   return (
    <Card p={0}>
        <Flex css={{height: '200px'}}>
            <TextContainer>
        <span>
          <Title my={2} pb={1}>
            {name}
          </Title>
        </span>
                <Text width="100%" css={{overflow: 'auto'}}>
                    {description}
                </Text>
            </TextContainer>
            <ImageContainer>
                {getProjectImage(logo)}
                <ImageSubtitle bg="primaryLight" color="white" top="13px" top-s="-37px">
                    {type}
                </ImageSubtitle>
                <ImageSubtitle
                    color="white"
                    bg="primary"
                    invert="true"
                    top-s="-200px"
                    top="-227px"
                >
                    {publishedDate}
                </ImageSubtitle>
                <SocialLinksContainer>
                    <Label mx={1} fontSize={5}>
                        <SocialLink
                            color="primary"
                            hoverColor="primaryLight"
                            name={language === "en" ? "Check repository" : "Voir le dépôt"}
                            fontAwesomeIcon="github"
                            url={repositoryUrl}
                        />
                    </Label>
                    <Label mx={1} fontSize={5}>
                        <SocialLink
                            color="primary"
                            hoverColor="primaryLight"
                            fontSize={5}
                            mx={1}
                            name={language === "en" ? "See project" : "Voir le projet"}
                            fontAwesomeIcon="globe"
                            url={projectUrl}
                        />
                    </Label>
                </SocialLinksContainer>
            </ImageContainer>
        </Flex>
    </Card>
)};

const ProjectsQuery = ({language}) => (
    <div>
    <Section.Header name={language === 'en' ? "Projects" : "Projets"} icon="💻" label="notebook"/>
    <StaticQuery
        query={graphql`{
  en: allContentfulAbout(filter: {node_locale: {eq: "en-US"}}) {
    edges {
      node {
        projects {
          id
          name
          description
          projectUrl
          repositoryUrl
          publishedDate(formatString: "YYYY")
          type
          logo {
            title
            img: resize(width: 200, quality: 100) {
              src
            }
          }
        }
      }
    }
  }
  fr: allContentfulAbout(filter: {node_locale: {eq: "fr"}}) {
    edges {
      node {
        projects {
          id
          name
          description
          projectUrl
          repositoryUrl
          publishedDate(formatString: "YYYY")
          type
          logo {
            title
            img: resize(width: 200, quality: 100) {
              src
            }
          }
        }
      }
    }
  }
}

      `}
        render={data => {
            return (
                <CardContainer minWidth="350px">
                    {data[language].edges[0].node.projects.map((p, i) => {

                        return (<Fade key={p.id} bottom delay={i * 200}>
                        <Project
                            name={p.name}
                            description={p.description}
                            projectUrl={p.projectUrl}
                            repositoryUrl={p.repositoryUrl}
                            type={p.type}
                            publishedDate={p.publishedDate}
                            logo={p.logo}
                            language={language} />
                        </Fade>);
                    } )}
                </CardContainer>
            )
         }
        }
    />
    </div>
);

const mapStateToProps = ({ language }) => {
    return { language }
};

const ConnectedProjectsQuery = connect(
    mapStateToProps
)(ProjectsQuery);

const Projects = () => (
    <Section.Container id="projects">
        <ConnectedProjectsQuery/>
    </Section.Container>
);

export default withNavigation({
    label: {
        en: 'Projects',
        fr: 'Projets'
    },
    id: 'projects'
})(Projects);
