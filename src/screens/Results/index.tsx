import React, {useRef} from 'react';
import Label from '../../shared/components/Label';
import Container from '../../shared/components/Container';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CardBottomSheet from '../../shared/components/CardBottomSheet';
import {Navigation} from 'react-native-navigation';
import {useThemeContext} from '../../lib/hooks/useThemeContext';
import {IResult} from '../Home';

interface Props {
  result: IResult;
}

export default function Results({result}: Props) {
  const {colors, dynamicColor} = useThemeContext();

  const popUpDriver = useRef<any>(null);
  
  const setResult =(d: string)=>{
    if (d == "0"){
        return "tampered"
    }
    else {return "untampered"}
  }

  React.useEffect(() => {
    popUpDriver.current?.show();
  }, [popUpDriver]);
  return (
    <CardBottomSheet
      onDismiss={() => {
        popUpDriver.current?.dismiss();
        Navigation.dismissAllOverlays();
      }}
      dismissOnClickOutside
      transition="Card"
      ref={popUpDriver}>
      <Container
        style={{
          padding: widthPercentageToDP(5),
          height: widthPercentageToDP(40),
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: dynamicColor(
            colors.primary.white,
            colors.primary.black,
          ),
        }}>
        <Label
          type="secondaryLabel"
          size="body"
          weight="light"
          style={{
            color: dynamicColor(colors.primary.black, colors.primary.white),
            marginBottom: widthPercentageToDP(1)
          }}>
          This image is
        </Label>
        <Label
          type="primary"
          size="title2"
          weight="bold"
          style={{
            color: dynamicColor(colors.primary.black, colors.primary.white),
            marginBottom: widthPercentageToDP(1)
          }}>
          {setResult(result.Class)}
        </Label>
        <Label
          type="secondaryLabel"
          size="body"
          weight="light"
          style={{
            color: dynamicColor(colors.primary.black, colors.primary.white),
            
          }}>
          Confidence level is {result.Confidence}
        </Label>
      </Container>
    </CardBottomSheet>
  );
}
