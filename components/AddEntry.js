import React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import {
  Card,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import { saveDeckTitle } from '../utils/api';
import Button from './Button';


export default class AddEntry extends React.Component {
  state = {
    titleText: '',
    errorMessage: false
  };

  handleSubmit = () => {
    if (this.state.titleText) {
      const { titleText } = this.state;
      saveDeckTitle(titleText);
      this.setState({
        errorMessage: false,
        titleText: ''
      });
      this.props.navigation.navigate(
        'DeckDetail',
        {
          entryId: titleText,
          navTitle: titleText
        },
        Keyboard.dismiss()
      );
    } else {
      this.setState({ errorMessage: true })
    }
  };


  render() {
    return (
      <KeyboardAvoidingView style={{
        flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
        behavior="padding"
      >
        <Card title="What is the title of your new deck?" >
          <FormInput
            onChangeText={titleText => this.setState({ titleText })}
            value={this.state.titleText}
          />
          <FormValidationMessage>
            {this.state.errorMessage ? 'This field is required': ''}
          </FormValidationMessage>
          <Button
            icon={{ name: 'plus', type: 'entypo' }}
            title="Create Deck"
            backgroundColor="rgb(72, 149, 236)"
            containerViewStyle={{ marginTop: 15 }}
            onPress={this.handleSubmit}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}