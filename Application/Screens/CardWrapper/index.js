import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Notecard from '../../Components/Notecard';
import { DropZoneParams } from '../../Configuration/';

/**
*
*/
export default class CardWrapper extends Component {
  /**
  *
  * @constructor
  */
  constructor(props) {
    super(props);

    this.state = {
      dropZoneValues: null,
      cardsStorage: []
    };
  }

  /**
  *
  * @param { Boolean } saveResult -
  */
  onSaveComplete(saveResult) {
    if (saveResult === true) {
      console.log('Saved!');
    } else {
      console.log('Save error!');
    }
  }

  /**
  *
  * @param { Event } saveResult -
  */
  setDropZoneValues(event) {
    this.setState({
      dropZoneValues: event.nativeEvent.layout,
    });
  }

  /**
  *
  * @param { String } cardKey -
  * @param { String } cardText -
  */
  addCardToStaroge(cardKey, cardText, onSaveCallback) {
    this.setState({
      cardsStorage: [
        ...this.state.cardsStorage,
        {
          key: cardKey,
          text: cardText
        }
      ]
    });

    console.log('Saving cards: ', cardText, ' with key: ', cardKey);
    if (onSaveCallback !== undefined) onSaveCallback();
    this.onSaveComplete(true);
  }

  /**
  *
  */
  saveCard() {
    this.onSaveComplete(true);
  }

  /**
  *
  */
  drawCard() {
    return (
      <Notecard
        dropZone={this.state.dropZoneValues}
        saveCallback={this.addCardToStaroge.bind(this)}
      />
    );
  }

  /**
  *
  */
  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.dropZone}
          onLayout={this.setDropZoneValues.bind(this)}
        >
          <Text style={styles.dropZoneText}>Drag to here</Text>
        </View>
        { this.drawCard() }
      </View>
    );
  }
}

/** */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    marginTop: 18
  },
  dropZone: {
    height: DropZoneParams.height,
    width: DropZoneParams.width,
    backgroundColor: '#2c3e50',
  },
  dropZoneText: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center'
  }
});
