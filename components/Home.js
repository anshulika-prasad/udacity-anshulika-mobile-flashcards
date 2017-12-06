import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Badge, Card } from 'react-native-elements';
import { fetchDeckDB } from '../actions';
import AddDeckButton from './AddDeckButton';
import { gray, lightBlack } from '../utils/colors';


class Home extends React.Component {

  componentDidMount() {
    this.props.fetchDeckDB();
  }

  componentDidUpdate() {
    this.props.fetchDeckDB()
  }

  renderItem = ({ item }) =>
    <Card >
      <TouchableOpacity
        key={item.title}
        style={styles.deck}
        onPress={() => this.props.navigation.navigate(
            'DeckDetail',
            {
              entryId: item.key,
              navTitle: item.title
            }
          )}
        >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.cards}>{item.questions.length} cards</Text>
      </TouchableOpacity>
    </Card>;


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.containerStyle}>
        {this.props.DBdata.length > 0
          ?
          <FlatList
            data={this.props.DBdata}
            renderItem={this.renderItem}
            keyExtractor={item => item.title}
          />
          : <Card title="Create a deck to get started!"/>
        }
        <AddDeckButton navigation={navigate} />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#ffff'
  }, 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deck: {
    paddingVertical: 50,
    borderBottomColor: gray,
    borderBottomWidth: 2,
    backgroundColor:'#eef7fa'
  },
  title: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 30,
    color: lightBlack,
  },
  cards: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 20,
    color: gray,
    marginTop: 5,
  }
};

const mapStateToProps = state => {
  const DBdata = state.decks;

  return { DBdata };
};

export default connect(mapStateToProps, { fetchDeckDB })(Home);

