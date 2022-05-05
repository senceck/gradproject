import React, { useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import CachedImage from "../../CachedImage";
import Animated, { useSharedValue, Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { TouchableScale } from "../../TouchableScalable";
import _ from 'lodash'
import { GLOBAL_THEME } from "../../../../lib/constants";

interface Props {
  onPress: (item: any) => void;
  item;
  setImagesLoaded?;
}

export default function BannerItem(props: Props) {


  return (
    // <TouchableScale
    //   // scaleTo={0.97}
    //   key={_.get(props, "item.image.en",'')}
    //   onPress={() => props.onPress(props.item)}
    // >
      <View
        style={[
          styles.container,
        ]}
      >
        <CachedImage
          // onLoadEnd={() => props.setImagesLoaded(true)}
          // onLoad={() => props.setImagesLoaded(true)}
          height={"100%"}
          width="100%"
          resizeMode={"cover"}
          source={{ uri: _.get(props, "item.image.en",'') }}
        />

      </View>
    // </TouchableScale >
  );

}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexGrow: 1,
    width: "100%",
    borderRadius: GLOBAL_THEME.radius.custom,
    overflow: "hidden",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    elevation: 5
  },
})
