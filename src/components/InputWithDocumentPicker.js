import {Text, StyleSheet, View, Alert} from 'react-native'
import React, {useCallback} from 'react'
import {responsiveHeight} from '../themes/metrics'

import {colors} from '../themes'
import DocumentPicker from 'react-native-document-picker'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'

const InputWithDocumentPicker = props => {
  const {title, style, onHandleDocument} = props

  const showDocumentPicker = useCallback(async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
        ],
      })
      if (!res.size || res.uri.includes('storage/document')) {
        return Alert.alert('', 'Can not send file from drive')
      }
      //file size < 5Mb
      if (res.size > 5 * 1024 * 1024) {
        setTimeout(() => {
          Alert.alert('', 'File size must less than 5Mb')
        }, 500)
      } else {
        console.log('res', res)
        onHandleDocument(res)
      }
    } catch (err) {
      // TODO:
    }
  }, [onHandleDocument])

  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity onPress={showDocumentPicker} style={styles.content}>
        <Ionicons name={'cloud-upload'} size={15} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: responsiveHeight(20),
    flex: 1,
  },
  title: {
    marginBottom: responsiveHeight(5),
    fontSize: responsiveHeight(16),
    fontWeight: '500',
    color: colors.lightGray,
  },
  content: {
    width: '100%',
    height: responsiveHeight(45),
    borderRadius: 5,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 5,
  },
})

export default React.memo(InputWithDocumentPicker)
