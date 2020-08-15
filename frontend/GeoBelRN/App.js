/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
const arcgisURL = 'https://geobel.maps.arcgis.com/apps/webappviewer/index.html?id=1a81ea9392954fbfa3eb6cec81f4da55';
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          style={{flex: 1, alignSelf: 'stretch'}}
          source={{uri: arcgisURL}}
          allowUniversalAccessFromFileURLs
          mixedContentMode={'compatibility'}
          useWebKit
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    // backgroundColor: '',
    // paddingVertical: 30
  }
});
