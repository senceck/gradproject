import React, { memo } from 'react';
import { human, sanFranciscoWeights } from 'react-native-typography';
import _, { capitalize } from 'lodash';
import { Text, TextProperties } from 'react-native';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Platform } from 'react-native';

type FontSize =
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subhead'
  | 'footnote'
  | 'caption1'
  | 'caption2';

type FontWeight = 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

type Type =
  | 'primary'
  | 'secondaryLabel'
  | 'tertiaryLabel'
  | 'quaternaryLabel'
  | 'placeholderText'
  | 'link';

export interface LabelProps extends TextProperties {
  children;
  size?: FontSize;
  type?: Type;
  weight?: FontWeight;
  color?;
}

const sizeMap = {
  ...Platform.select({
    android: {
      undefined: {
        fontSize: widthPercentageToDP("3.5")
      },
      null: {
        fontSize: widthPercentageToDP("3.5")
      },
      largeTitle: {
        fontSize: human.largeTitleObject.fontSize,
      },
      title1: {
        fontSize: human.title1Object.fontSize,
      },
      title2: {
        fontSize: widthPercentageToDP(5.6),
      },
      title3: {
        fontSize: widthPercentageToDP(4.7),
      },
      headline: {
        fontSize: human.headlineObject.fontSize
      },
      body: {
        fontSize: human.bodyObject.fontSize
      },
      callout: {
        fontSize: human.calloutObject.fontSize,
      },
      subhead: {
        fontSize: human.subheadObject.fontSize
      },
      footnote: {
        fontSize:  widthPercentageToDP(3.2),
      },
      caption1: {
        fontSize: widthPercentageToDP(3),
      },
      caption2: {
        fontSize: human.caption2Object.fontSize,
      }
    },
    ios: {
      largeTitle: human.largeTitle,
      title1: human.title1,
      title2: human.title2,
      title3: human.title3,
      headline: human.headline,
      body: human.body,
      callout: human.callout,
      subhead: human.subhead,
      footnote: human.footnote,
      caption1: human.caption1,
      caption2: human.caption2,
    }
  })

};

const weightMap = {
  ...Platform.select({
    android: {
      thin: {
        fontWeight: "200"
      },
      light: {
        fontWeight: '300'
      },
      regular: {
        fontWeight: '400'
      },
      medium: {
        fontWeight: '500'
      },
      semibold: {
        fontWeight: '600'
      },
      bold: {
        fontWeight: '700'
      },
    }, ios: {
      thin: sanFranciscoWeights.thin,
      light: sanFranciscoWeights.light,
      medium: sanFranciscoWeights.medium,
      regular: sanFranciscoWeights.regular,
      semibold: sanFranciscoWeights.semibold,
      bold: sanFranciscoWeights.bold,
    }
  })

};

const Label = memo((props: LabelProps) => {
  const { children, style, ..._props } = props;

  const { colors } = useThemeContext();
  return (
    <Text
      {..._props}
      style={[
        Platform.select({
          android: {
            fontFamily: `SF-Pro-Display-${capitalize(props.weight)}`
          }, ios: {}
        }),
        //@ts-ignore
        sizeMap[props.size] || {},
        //@ts-ignore
        weightMap[props.weight] || {},
        { color: colors.primary.black },
        props.type && { color: colors.label[props.type] },
        props.color && { color: props.color },
        ...(_.isArray(style) ? style : [style]),
      ]}>
      {children}
    </Text>
  );
});

export default Label;
