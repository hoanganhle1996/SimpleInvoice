import React, {useState, useImperativeHandle} from 'react'
import {View, StyleSheet, Modal, Image, Text} from 'react-native'
import {colors, responsiveWidth, responsiveHeight} from '../../../themes'
import Feather from 'react-native-vector-icons/Feather'
import Images from '../../../themes/images'
import Circle from '../../../components/Circle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {TouchableOpacity} from 'react-native-gesture-handler'

const BottomSheetModalComponent = ({}, ref) => {
  const [isVisible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    openModal: () => setVisible(true),
    closeModal: () => setVisible(false),
  }))

  return (
    <Modal transparent animationType={'slide'} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Feather name="x" size={25} color={colors.grayText} style={styles.cancelIcon} />
          <View>
            <Image source={Images.map} style={styles.image} resizeMode="cover" />
            <Circle
              style={styles.exclamationIcon}
              children={<AntDesign name="exclamation" size={45} color={colors.white} />}
            />
          </View>
          <Text style={styles.title}>You have not arrived back at Expo</Text>
          <Text style={styles.descriptionText}>Please report back at Foyer 1 to complete the job.</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false)
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackOpacity,
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    width: '100%',

    backgroundColor: colors.white,
    padding: 20,
    alignItems: 'center',
  },
  cancelIcon: {
    alignSelf: 'flex-end',
  },
  image: {
    width: responsiveWidth(150),
    height: responsiveHeight(150),
    borderRadius: 200,
  },
  exclamationIcon: {
    backgroundColor: colors.westSide,
    position: 'absolute',
    right: responsiveWidth(-8),
    top: responsiveHeight(-8),
  },
  title: {
    fontSize: 35,
    marginTop: responsiveHeight(30),
    fontWeight: '600',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 20,
    color: colors.grayText,
    textAlign: 'center',
    marginTop: responsiveHeight(20),
  },
  button: {
    width: '100%',
    backgroundColor: colors.black,
    padding: 20,
    marginVertical: responsiveHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '500',
  },
  buttonView: {
    width: '100%',
  },
})

export default React.forwardRef(BottomSheetModalComponent)
