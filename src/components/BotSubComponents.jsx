import React, { useRef } from 'react'
import { Animated, TouchableOpacity, Image } from 'react-native'

export default ({ y, delay, extraStyles }) => {

    const scale = useRef(new Animated.Value(1)).current
    const translateY = useRef(new Animated.Value(0)).current

    const botOnPressInHandler = () => {

        Animated.spring(scale,
            {
                toValue: 1.4,
                friction: 5,
                useNativeDriver: true
            }
        ).start()

    }

    const botOnPressOutHandler = () => {

        Animated.spring(scale,
            {
                toValue: 1,
                friction: 5,
                useNativeDriver: true
            }
        ).start()

    }

    const translationY = translateY.interpolate({
        inputRange: [0, 1],
        outputRange: [ 0, -y ]
    })
    
    Animated.spring(translateY,
        {
            toValue: 1,
            friction: 4,
            delay,
            useNativeDriver: true
        }).start()

    return (
        <Animated.View style = {[ { transform: [ { scale: scale }, { translateY: translationY } ] }, extraStyles ]}>

            <TouchableOpacity style = {{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'black' }}
            onPressIn = { botOnPressInHandler }
            onPressOut = { botOnPressOutHandler }>

                <Image style = {{ width: 50, height: 50, borderRadius: 25 }} source = { require('../../assets/bot1.png') }/>

            </TouchableOpacity>

        </Animated.View>
    )
}
