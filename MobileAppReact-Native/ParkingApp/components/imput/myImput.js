import React, { Component } from 'react';
import {
  StyleSheet,
    TextInput,
  View,
  Text
} from 'react-native';


class MyInput extends Component {
 
  render() {
      const {title, error , touched , password} = this.props;
      console.log("Props",this.props)
    return (
        <View style={styles.component}>
            <Text>{title}:</Text>
            <TextInput style={styles.input} placeholder={title} secureTextEntry={password} {...this.props}/>
            { touched && error &&
              <Text style={styles.error}>{error}</Text>
            }
        </View>
    );
  }
};

const styles = StyleSheet.create({
    component:{
      paddingBottom:20
    },
    input:{
      borderBottomColor:"#03a9fc",
      borderBottomWidth:1,
    },
    error:{
      color:"red"
    }
});

export default MyInput;
