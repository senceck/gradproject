import React from 'react';
import { Image } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface Props extends FastImageProps {
  style?: any;
  width?: number | string;
  height: number | string;
  resizeMode?;
}

function CachedImage(props: Props) {
  const { width, height } = props;
  // @ts-ignore
  const source = props.source.uri;

  if (
    !!source &&
    source !== null &&
    source !== '' &&
    source.match(`(http(s?):)([/])*`)
  ) {
    return (
      <FastImage
        source={{ uri: source, priority: 'high' }}
        style={[{ width, height }, props.style]}
        resizeMode={props.resizeMode}
      />
    );
  }
  return <Image source={source} style={[{ width, height }, props.style]} />;
}

export default CachedImage;
