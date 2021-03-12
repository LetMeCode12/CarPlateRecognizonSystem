/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { NativeRouter, Route } from "react-router-native";
import {
  StyleSheet,
  View,
} from 'react-native';

import Login from "./containers/login"
import GatePanel from "./containers/gatePanel"



class App extends Component {
 
  render() {
    console.disableYellowBox=true;
    return (
      <>
        <NativeRouter>
          <View>
            <Route path="/gatePanel" component={(props)=><GatePanel {...props} /> }/>
            <Route exact path="/" component={(props)=><Login {...props} /> }/>
          </View>
        </NativeRouter>

      </>
    );
  }
};

const styles = StyleSheet.create({

});

export default App;
