import React from 'react';
import Layout from '../components/Layout';
import Landing from '../sections/Landing';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Plume from "../components/Plume";
import connect from "react-redux/es/connect/connect";
import {TOGGLE_LANGUAGE} from "../redux/actions";

const mapStateToProps = ({ language }) => {
    return { language }
};

const mapDispatchToProps = dispatch => {
    return { toggleLanguage: () => dispatch({type:TOGGLE_LANGUAGE}) }
};

class IndexPage extends React.Component {

    componentDidMount() {
        if (typeof window !== 'undefined' &&
            (window.navigator.language === "fr-FR" || window.navigator.language === "fr")
            && this.props.language === "en") {
            this.props.toggleLanguage();
        }
    }

    render() {
        return (
        <Layout>
            <Plume/>
            <Landing />
            <About />
            <Projects />
        </Layout>
        );
    }
}

const IndexPageConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);

export default IndexPageConnected;
