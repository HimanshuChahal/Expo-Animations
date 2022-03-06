import React, { useRef, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Modal, Animated, PanResponder, useWindowDimensions } from 'react-native';
import BotSubComponents from './BotSubComponents';

export default ({ botOpen, setBotOpen }) => {

    const { width, height } = useWindowDimensions()

    const x = useRef(width/2 - 30)

    const translate = useRef(new Animated.ValueXY({
        x: x.current,
        y: -height/2 + 60
    })).current

    const scale = useRef(new Animated.Value(1)).current

    const rotate = useRef(new Animated.Value(0)).current

    const responder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                translate.setOffset({
                x: x.current,
                y: translate.y._value
                });

                scaleAndRotateAnim(1.5, 1)
            },
            onPanResponderMove: (event, gestureState) => {
                translate.setValue({
                x: gestureState.dx,
                y: gestureState.dy
                })
            },
            onPanResponderRelease: (event, gestureState) => {

                let y_set = translate.y._value

                if(event.nativeEvent.pageY < 60)
                {
                    y_set = -(gestureState.y0 - 60)
                }

                if(x.current === -width/2 + 30)
                {

                    if(gestureState.moveX > width/2)
                    {
                        x.current = -x.current

                        animTranslate(width - 60, y_set)
                    } else {
                        animTranslate(0, y_set)
                    }

                    } else
                    {
                    if(gestureState.moveX < width/2)
                    {
                        x.current = -x.current

                        animTranslate(-width + 60, y_set)
                    } else
                    {
                        animTranslate(0, y_set)
                    }
                }

                scaleAndRotateAnim(1, 0)
            }
        })
    ).current
    
    const animTranslate = (x, y) => {
        Animated.timing(translate,
        {
            toValue: {
            x,
            y
            },
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            translate.setValue({
            x,
            y
            })

            translate.flattenOffset();
        })
    }

    const scaleAndRotateAnim = (scaleToVal, rotateToVal) => {
        Animated.timing(scale,
        {
            toValue: scaleToVal,
            duration: 100,
            useNativeDriver: true
        }).start()

        Animated.spring(rotate,
        {
            toValue: rotateToVal,
            friction: 5,
            useNativeDriver: true
        }).start()
    }

    const botOnPressHandler = () => {
        if(!botOpen)
        {
            scaleAndRotateAnim(1.4, 1)
        } else
        {
            scaleAndRotateAnim(1, 0)
        }

        setBotOpen(!botOpen)
    }

    const rotation = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: [ '0deg', '90deg' ]
    })

    useEffect(() => {

        if(!botOpen)
        {
            scaleAndRotateAnim(1, 0)
        }

    }, [ botOpen ])

    return (
        <Animated.View style = {{ transform: [{ translateX: translate.x }, { translateY: translate.y }, { scale }, { rotate: rotation }] }}
        { ...responder.panHandlers }>

            <TouchableOpacity style = {{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'black' }}
            onPress = { botOnPressHandler }>

                <Image style = {{ width: 50, height: 50, borderRadius: 25 }} resizeMode = 'cover' source = { require('../../assets/bot1.png') }/>

            </TouchableOpacity>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
