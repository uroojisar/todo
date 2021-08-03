import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Header = props => {
  return (
    <View style={styles.viewStyles}>
      <Text style={styles.textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyles: {
    backgroundColor: 'blue',
    // backgroundColor: '#F8F8F8',
  }, 
  textStyle: {
    fontSize: 20,
  }
});
export {Header};
