import React, { Component } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Card as BaseCard, Text, Badge } from 'react-native-elements';
import Button from './Button';
import { primaryColor, lightColor, lightPurple, darkorchid, white } from '../utils/colors';


class QuestionCard extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.flipValue = 0;

    this.animatedValue.addListener(({ value }) => {
      this.flipValue = value;
      if ((value === 0 || value === 180) && this.props.onCompleteFlip) {
        this.props.onCompleteFlip(value === 0);
      }
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });

    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });

    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  componentDidMount() {}

  flip = () => {
    Animated.spring(this.animatedValue, {
      toValue: this.flipValue >= 90 ? 0 : 180,
      friction: 8,
      tension: 10
    }).start();
  };

  renderFront() {
    const { question, order, totalQuestions } = this.props;
    const frontAnimatedStyle = {
      transform: [{ rotateX: this.frontInterpolate }]
    };
    return (
      <Animated.View
        style={[
          styles.flipCard,
          frontAnimatedStyle,
          { opacity: this.frontOpacity }
        ]}
      >
        <BaseCard key={question.question + order} title={`Question ${order}`}>
          <View style={styles.badgeStyle}>
            <Badge
              containerStyle={{ backgroundColor: '#9999ff'}}>
               <Text style={{color: white, textAlign: 'center'}}>
              {`${order} of ${totalQuestions}`}
              </Text>
            </Badge>
          </View>
          <Text h4 style={{ marginBottom: 20, textAlign: 'center', }}>
            {question.question}
          </Text>
          <Button
            icon={{ name: 'lightbulb', type: 'foundation' }}
            backgroundColor={lightPurple}
            title="Answer"
            onPress={() => this.flip()}
          />
        </BaseCard>
      </Animated.View>
    );
  }

  renderBack() {
    const { question, order , totalQuestions} = this.props;
    const backAnimatedStyle = {
      transform: [{ rotateX: this.backInterpolate }]
    };
    return (
      <Animated.View
        style={[
          backAnimatedStyle,
          styles.flipCard,
          { opacity: this.backOpacity },
          styles.flipCardBack
        ]}
      >
        <BaseCard
          containerStyle={styles.flipCardBack}
          title={`Answer question ${order}`}
        >
          <View style={styles.badgeStyle}>
            <Badge
              containerStyle={{ backgroundColor: '#9999ff'}}>
              <Text style={{color: white, textAlign: 'center'}}>
                {`${order} of ${totalQuestions}`}
              </Text>
            </Badge>
          </View>

          <Text h4
            style={{
              marginBottom: 20,
              color: lightColor,
              textAlign: 'center',
              backgroundColor: primaryColor
            }}
          >
            {question.answer}
          </Text>
          <Button
            icon={{ name: 'thumbs-up', type: 'entypo', color: primaryColor }}
            backgroundColor={lightPurple}
            color='white'
            title="Got it!"
            onPress={() => this.flip()}
          />
        </BaseCard>
      </Animated.View>
    );
  }
  render() {
    const { question, order } = this.props;
    return (
      <View key={question.question + order}>
        {this.renderFront()}
        {this.renderBack()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flipCard: {
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    backgroundColor: 'white',
    marginBottom: 10
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  badgeStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default QuestionCard;
