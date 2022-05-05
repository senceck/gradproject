import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TouchableWithoutFeedback, Dimensions } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

import Carousel from "react-native-snap-carousel";
import { Options } from "react-native-navigation";
import PageIndicator from "../PageIndicator";
import BannerItem from "./BannerItem";
import { GLOBAL_THEME } from "../../../lib/constants";
import BannerPlaceHolder from "./BannerPlaceholder";


interface Props {
  onItemPress?: (banner: any) => void;
  data;
  quantity;
  onImagesLoad;
}




function Banners(props: Props) {
  const activeSlide = useRef(0)
  const setActiveSlide = (index) => {
    activeSlide.current = index;
  }
  const renderItem = ({ item }, { setImagesLoaded }) => {
    return (
      <View style={{
        paddingHorizontal: widthPercentageToDP("4"),
        marginTop: GLOBAL_THEME.container * 1.5,
        marginBottom: GLOBAL_THEME.container * 1.8,
        position: "relative",
        height: widthPercentageToDP("42"),
      }}>
        <BannerItem
          // setImagesLoaded={setImagesLoaded}
          key={item.id} onPress={props.onItemPress} item={item} />
      </View>
    )
  }



  const carRef = useRef(null)
  const width = widthPercentageToDP(100);
  const itemWidth = widthPercentageToDP(100);



  const imagesLoaded = useRef(false)
  const setImagesLoaded = (v) => {
    imagesLoaded.current = v
    props.onImagesLoad(v)
  }

  return (
    <View
      style={{
        shadowColor: 'black',
        shadowOffset: {
          height: 2,
          width: 0
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        elevation: 3,
        overflow: "visible",
        marginTop: widthPercentageToDP("-5"),
        alignItems: "center",
        position: "relative"
      }}
    >
      {/* <BannerPlaceHolder
        isVisible={showBanner.current}
      /> */}
      <Carousel
        ref={carRef}
        data={props.data}
        // autoplay={true}
        // autoplayInterval={10000}
        renderItem={(d) => renderItem(d, {
          setImagesLoaded,
        })}
        removeClippedSubviews={false}
        // initialNumToRender={10}
        // maxToRenderPerBatch={10}
        loop={Platform.OS == "ios"}
        sliderWidth={width}
        itemWidth={itemWidth}
        onSnapToItem={index => {
          setActiveSlide(index);
        }}

      />
      <View style={{
        paddingTop: widthPercentageToDP("0.5"),
      }}>
        <PageIndicator
          containerStyle={styles.pageIndicator}
          xAxis={0}
          activePage={activeSlide.current}
          numberOfPage={props.quantity}
          onDotPress={(i) => { carRef.current.snapToItem(i) }}
        />
      </View>
    </View>
  )
}


export default React.memo(Banners);


const styles = StyleSheet.create({
  container: {
    // height: heightPercentageToDP(50),
    backgroundColor: 'red',
  },
  pageIndicator: {
    position: 'absolute',
    bottom: heightPercentageToDP(1),
    borderRadius: 4,
    // backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 10,
    paddingVertical: heightPercentageToDP(0.5),
    alignSelf: 'center',
  },
});