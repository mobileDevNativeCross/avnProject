import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
} from 'react-native';

/** */
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
/** */
import uuidv4 from 'uuid/v4';
/** */
import { Window, CardParams } from '../../Configuration/';
/**
*
*/
export default class Notecard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardText: '',
            key: uuidv4(),
            pan: new Animated.ValueXY(),
            placeholder: 'Type here',
            fadeAnim: new Animated.Value(0),
            scale: new Animated.Value(0),

            moveAnimation: new Animated.Value(CardParams.positionY)
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderMove: Animated.event([null, {
                  dx: this.state.pan.x,
                  dy: this.state.pan.y
            }]),

            onPanResponderRelease: (e, gesture) => {
                if (this.isDropZone(gesture)) {
                  this.onDropZone();
                } else {
                  this.onOtherPlace();
                }
            }
        });
    }

    componentDidMount() {
      this.moveFromBottom();
    }

    onDropZone() {
      this.fadeOut();
      this.saveCard();
    }

    onOtherPlace() {
      this.moveCardToInitPlace();
    }

    saveCard() {
      this.props.saveCallback(this.state.key, this.state.cardText, this.saveCallback.bind(this));
    }
    saveCallback() {
      this.resetCardState();
    }

    fadeOut() {
        Animated.spring(
            this.state.pan,
            {
                toValue: {
                    x: 0,
                    y: -1000
                }
            }
        ).start();
    }

    fadeIn() {
      Animated.timing(
          this.state.fadeAnim,
          {
              toValue: 1,
              duration: 1000,
          },

          this.state.scale,
          {
              toValue: 1,
              duration: 1200
          }
      ).start();
    }

    moveFromBottom() {
      this.state.pan.setValue({ x: 0, y: Window.height });
      Animated.spring(
        this.state.pan,
        {
          toValue: {
            x: 0,
            y: 0
          }
        }
      ).start();

      Animated.timing(
          this.state.fadeAnim,
          {
              toValue: 1,
              duration: 800,
          },
          this.state.scale,
          {
              toValue: 1,
              duration: 800
          }
      ).start();
    }

    moveCardToInitPlace() {
      Animated.spring(
        this.state.pan,
          {
            toValue: {
              x: 0,
              y: 0
            }
          }
        ).start();
    }

    isDropZone(gesture) {
        const dz = this.props.dropZone;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    resetCardState() {
      this.setState({
        cardText: '',
        key: uuidv4()
       });

      this.state.fadeAnim.setValue(0);
      this.state.scale.setValue(0);
      this.state.pan.setValue({ x: 0, y: 0 });
      this.state.moveAnimation.setValue(Window.height);

      this.moveFromBottom();
    }

    render() {
      return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            this.state.pan.getLayout(),
            styles.cardContainer,
            { opacity: this.state.fadeAnim }
          ]}
        >
          <AutoGrowingTextInput
            style={styles.notecard}
            underlineColorAndroid='transparent'
            onChangeText={(newText) => this.setState({ cardText: newText })}
            value={this.state.cardText}
            placeholder={this.state.placeholder}
          />
        </Animated.View>
      );
    }
}

/** */
const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    height: CardParams.height,
    width: CardParams.width,
    transform: [
      { translateX: CardParams.positionX },
      { translateY: CardParams.positionY }
    ],
    zIndex: 2,
    padding: 30,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#fff'
  },
  notecard: {
    flex: 1,
    color: '#222',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 18
  }
});
