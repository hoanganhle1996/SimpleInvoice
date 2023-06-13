import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'
import Animated, {useAnimatedStyle, withTiming, Easing} from 'react-native-reanimated'

const ColorInterpolation = () => {
  const [startAnimation, setStartAnimation] = useState(false)
  const animatedColor = useAnimatedStyle(() => {
    const color = withTiming(1, {
      duration: 2000,
      easing: Easing.linear,
    })

    return {
      color: `rgba(255, 0, 0, ${color.value})`,
    }
  })

  useEffect(() => {
    if (startAnimation) {
      // Start the animation after a delay
      setTimeout(() => {
        setStartAnimation(true)
      }, 1000)
    }
  }, [])

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
      }}>
      <Animated.Text style={[animatedColor, {fontSize: 40}]}>Interpolated Text Color</Animated.Text>
    </View>
  )
}

export default ColorInterpolation
