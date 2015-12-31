var React = require('react-native');
var store = require('react-native-simple-store');

var {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  StatusBarIOS,
  Navigator,
} = React;

let count = 1;

var FirstPage = React.createClass({
  getInitialState() {
    this.activeUser = null;
    this.activeUser2 = null;
    return {
      activeUser: null
    };
  },

  goToLandingPage() {
    // this.activeUser = 'Login';
    this.props.navigator.push({
      id: 'landing-page',
      sceneConfig: Navigator.SceneConfigs.FadeAndroid
    });
 },

  goToMainView() {
    // this.activeUser = 'Active';
    this.props.navigator.push({
      id: 'tab-bar',
      sceneConfig: Navigator.SceneConfigs.FadeAndroid
    });
  },

  componentWillMount: function() {
    console.log('componentWillMount');
    console.log(this.props.route);
    console.log(this.props.navigator);
    if(this.props.route.from === 'logout'){
      // this.props.navigator.state.routeStack = this.props.navigator.state.routeStack.splice(this.props.navigator.state.routeStack.length-1,1);
      // this.props.navigator.state.sceneConfigStack = this.props.navigator.state.sceneConfigStack.splice(this.props.navigator.state.sceneConfigStack.length-1,1);
      // console.log(this.props.route.routeReset)
      // this.props.navigator.immediatelyResetRouteStack([this.props.route.routeReset])
    }
    console.log(this.props.navigator);
    store.get('activeUser').then((value) => {
      // this.setState({activeUser: value});
      this.activeUser = value;
      console.log(value)
      if(this.activeUser) {
        this.goToMainView();
        console.log('Success user loaded from store');
      }
      else if(!this.activeUser){
        console.log('No user in store');
        this.goToLandingPage();
      }
    });
  },

  componentWillUpdate: function() {
    console.log('componentWillUpdate');
    // console.log(count);
    // console.log(this.state.activeUser);
    // console.log(this.activeUser);
    // console.log(this.props.navigator);
    // console.log('User from logout -'+this.props.userFromLogout);
   //  if(this.activeUser === 'Active' || this.activeUser === 'Login') {
   //    this.count = 1;
   //   console.log(this.activeUser);
   // }
    // store.get('activeUser').then((value) => {
    //   this.activeUser2 = value;
    // });
    // console.log(this.state.activeUser);
    // console.log(this.activeUser);
    // console.log(this.activeUser2);
    //   if(this.activeUser && count>0) {
    //     this.goToMainView();
    //     console.log('Success user loaded from store');
    //     count--;
    //   }
    //   else if(!this.activeUser  && count>0){
    //     console.log('No user in store');
    //     this.goToLandingPage();
    //     count--;
    //   }
  },

  render: function() {
    console.log('First Page Render');
    return (
      <View style={styles.container}>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8F9'
  }
});

module.exports = FirstPage;
