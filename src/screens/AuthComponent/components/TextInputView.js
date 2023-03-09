import React, {useRef, forwardRef, useImperativeHandle} from 'react'
import {TextInput, View, StyleSheet} from 'react-native'

const TextInputView = (props, ref) => {
  const {
    value,
    onChangeText,
    placeholder,
    onSubmitEditing,
    editable = true,
    inputStylesContainer,
    multiline = false,
    secureTextEntry,
    customStyle,
    ...rest
  } = props

  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))

  const onChangeTextExtend = text => {
    onChangeText && onChangeText(text)
  }

  return (
    <View style={[styles.container, inputStylesContainer]}>
      <TextInput
        ref={inputRef}
        value={value}
        style={[customStyle]}
        onChangeText={onChangeTextExtend}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        onSubmitEditing={onSubmitEditing}
        editable={editable}
        scrollEnabled={false}
        multiline={multiline}
        textAlignVertical={'top'}
        secureTextEntry={secureTextEntry}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})

export default forwardRef(TextInputView)
