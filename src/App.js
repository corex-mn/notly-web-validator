import React from 'react';
import {hot} from 'react-hot-loader';

import './assets/css/main.css';
import './scss/App.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SchoolList from "./components/Schools/SchoolList/SchoolList";
import AboutHome from "./components/AboutUs/AboutHome/AboutHome";
import PartnersForm from "./components/PartnersForm/PartnersForm";
import {IntlProvider} from "react-intl";
import {WrappedComponentProps} from "react-intl";
import {LocaleContext, LocaleProvider} from "./LocaleContext";
import {languageMap} from "./translations";

export type IntlProps = WrappedComponentProps;

class App extends React.Component {
  static contextType = LocaleContext;

  constructor() {
    super();
    this.state = {
      locale: 'mn',
    }
  };

  componentDidMount() {
    if (window.env.faviconIconUrl) {
      const favicon = document.getElementById("favicon");
      favicon.href = window.env.faviconIconUrl;
    }

    window.addEventListener('storage', (e) => {
      const { currentTarget: { localStorage: { locale }}} = e;
      this.setState({ locale });
    });
  };

  componentWillUnmount() {
    window.removeEventListener('storage', (e) => {
      const { currentTarget: { localStorage: { locale }}} = e;
      this.setState({ locale });
    });
  }

  render() {
    const { locale } = this.state;

    return (
      <LocaleProvider>
        <IntlProvider locale={locale} messages={languageMap[locale]} key={locale}>
          <div className="App">
            <Router>
              <Navbar/>
              <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route path="/partners">
                  <SchoolList/>
                </Route>
                <Route path="/about">
                  <AboutHome/>
                </Route>
                <Route path="/partnersForm">
                  <PartnersForm/>
                </Route>
              </Switch> 
              <Footer/>
            </Router>
          </div>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

export default hot(module)(App);
