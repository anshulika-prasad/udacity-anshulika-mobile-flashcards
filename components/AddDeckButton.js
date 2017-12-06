import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { getWidth, getHeight } from '../utils/helpers';
import { primaryColor } from '../utils/colors';

function AddDeckButton({ navigation }) {
  return (
    <View
      style={[
        styles.addDeckBtnContainer,
        { top: getHeight() - 250, left: getWidth() - 90 }
      ]}
    >
      <Icon
        reverse
        name="plus"
        type="entypo"
        color={primaryColor}
        containerStyle={{ borderRadius: Platform.OS === 'ios' ? 4 : 26 }}
        onPress={() => navigation('AddEntry')}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  addDeckBtnContainer: {
    position: 'absolute'
  }
});

export default AddDeckButton;
