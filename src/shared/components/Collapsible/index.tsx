import React, {useState, useEffect} from 'react';
import {Animated, LayoutAnimation, ViewStyle, StyleProp} from 'react-native';

interface Props {
  isExpanded;
  style?: ({collapsed}) => StyleProp<ViewStyle>;
  children?;
}

function Collapsible(props: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (props.isExpanded !== isExpanded) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsExpanded(props.isExpanded);
    }
  }, [props.isExpanded]);

  return (
    <Animated.View
      style={[
        {
          maxHeight: isExpanded ? 'auto' : 0,
          overflow: 'hidden',
          borderRadius: 10,
        },
        props.style && props.style({collapsed: !isExpanded}),
      ]}>
      {props.children}
    </Animated.View>
  );
}

export default Collapsible;
