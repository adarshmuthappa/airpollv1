var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var store = require('react-native-simple-store');

Parse.initialize('NXxA7ayrOBxizMjqlqamfcbVYq7t3Ti0Sh9bYptz', 'peDdshh8c0RUHlYJjO8N8xWEDbRwWJeBmTYiH7tf');
//Parse.User.enableRevocableSession();//without this cant seem to get this.data.user to work

var {
  AppRegistry,
  NavigatorIOS,
  Navigator,
  StyleSheet,
  View,
  Text
} = React;

var STORAGE_KEY = 'currentUser';

var airpollLatest = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function() {
    return {
      user: ParseReact.currentUser
    };
  },

  getInitialState() {
    this.activeUser = null;
    return {
    };
  },

  componentWillMount: function() {
    store.get('activeUser').then((value) => {
      this.activeUser = value;
      console.log(value);
    });
  },

  signOutUser() {
    this.activeUser = null;
  },

  renderScene(route, navigator) {
    switch (route.id) {
      case 'first-page':
        var FirstPage = require('./src/components/FirstPage/FirstPage');
        return <FirstPage navigator={navigator} route={route}/>;
        break;
      case 'landing-page':
        var AppLandingPage = require('./src/components/LoginPages/LandingPage/LandingPage');
        return <AppLandingPage navigator={navigator} route={route} />;
        break;
      case 'login-page':
        var LoginPage = require('./src/components/LoginPages/LoginPage/LoginPage');
        return <LoginPage navigator={navigator} route={route}/>;
        break;
      case 'signup-page':
        var SignUpPage = require('./src/components/LoginPages/SignUpPage/SignUpPage');
        return <SignUpPage navigator={navigator} route={route}/>;
        break;
      case 'tab-bar':
        var TabsLayout = require('./src/components/TabsPages/TabsLayout/TabsLayout');
        return <TabsLayout navigator={navigator} route={route} user={this.data.user} onSignOut={this.signOutUser}/>;
        break;
      case 'new-group':
        var GroupAttrs = require('./src/components/Groups/NewGroup');
        return <GroupAttrs navigator={navigator} route={route}/>;
        break;
      case 'group-view':
        var GroupView = require('./src/components/Groups/GroupView');
        return <GroupView navigator={navigator} route={route}/>;
        break;
      case 'thought-view':
        var ThoughtView = require('./src/components/Groups/ThoughtView');
        return <ThoughtView navigator={navigator} route={route}/>;
        break;
      case 'new-thought':
        var NewThought = require('./src/components/NewThought/NewFeel');
        return <NewThought navigator={navigator} route={route} user={this.activeUser}/>;
        break;
      case 'topic-scene':
        var TopicScene = require('./src/components/TabsPages/WorldStreamTab/TopicScene');
        return <TopicScene navigator={navigator} route={route}/>;
        break;
    }
  },

  render: function() {
    // console.log('index.ios.js Render');
    // console.log(this.data.user);
    // if (this.data.user === undefined) {
    //   console.log(this.data.user)
    //   // Still waiting
    //   Parse.User.logOut();
    //   return (
    //     <Navigator
    //       sceneStyle={styles.container}
    //       ref={(navigator) => { this.navigator = navigator; }}
    //       renderScene={this.renderScene}
    //       configureScene={(route) => ({
    //         ...route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom,// extend off route.sceneConfig if provided, otherwise default to FloatFromRight
    //         gestures: route.gestures
    //       })}
    //       initialRoute={{id: 'first-page'}}
    //     />
    //   );
    // }
    // else if (this.data.user === null) {
    //   // Show log in screen
    //   console.log(this.data.user)
    //   return (
    //     <Navigator
    //       sceneStyle={styles.container}
    //       ref={(navigator) => { this.navigator = navigator; }}
    //       renderScene={this.renderScene}
    //       configureScene={(route) => ({
    //         ...route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom,// extend off route.sceneConfig if provided, otherwise default to FloatFromRight
    //         gestures: route.gestures
    //       })}
    //       initialRoute={{id: 'login-page'}}
    //     />
    //   );
    // }
    // else {
    //   console.log(this.data.user)
    //   return (
    //     <Navigator
    //       sceneStyle={styles.container}
    //       ref={(navigator) => { this.navigator = navigator; }}
    //       renderScene={this.renderScene}
    //       configureScene={(route) => ({
    //         ...route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom,// extend off route.sceneConfig if provided, otherwise default to FloatFromRight
    //         gestures: route.gestures
    //       })}
    //       initialRoute={{id: 'tab-bar'}}
    //     />
    //   );
    // }
      return (
        <Navigator
          initialRoute={{id: 'landing-page'}}
          sceneStyle={styles.container}
          ref={(navigator) => { this.navigator = navigator; }}
          renderScene={this.renderScene}
          configureScene={(route) => ({
            ...route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom,// extend off route.sceneConfig if provided, otherwise default to FloatFromRight
            gestures: route.gestures
          })}
        />
      );
  }
});

var styles = StyleSheet.create({
  container: {
    left: 0,
    flex: 1,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('airpollLatest', () => airpollLatest);
