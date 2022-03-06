import React, { useState } from 'react'
import { StyleSheet, View, Modal, useWindowDimensions } from 'react-native'
import BotComponent from './src/components/BotComponent'
import BotSubComponents from './src/components/BotSubComponents'

export default () => {

  const [ modalVisibility, setModalVisibility ] = useState(false)

  const { height } = useWindowDimensions()

  return (
    <View style={styles.container}>

      <BotComponent botOpen = { modalVisibility } setBotOpen = { setModalVisibility }/>

      <Modal style = {{ position: 'absolute' }}
      transparent
      animationType = 'fade'
      visible = { modalVisibility }
      onRequestClose = {() => {
        setModalVisibility(false)
      }}>

        <View style = {{ flex: 1, backgroundColor: '#0000009F', justifyContent: 'flex-end', paddingHorizontal: 20 }}>

          <View>
          
            <BotSubComponents y = { height/2 } delay = { 200 } extraStyles ={{ position: 'absolute', alignSelf: 'flex-start' }}/>

            <BotSubComponents y = { height/2 } delay = { 300 } extraStyles ={{ position: 'absolute', alignSelf: 'center' }}/>

            <BotSubComponents y = { height/2 } delay = { 400 } extraStyles ={{ position: 'absolute', alignSelf: 'flex-end' }}/>

          </View>

        </View>

      </Modal>

    </View>
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
