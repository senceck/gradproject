import React, { useState, useEffect, useCallback } from 'react';
import ThemeContext from '../../../lib/context/Theme';
import { useColorScheme } from 'react-native';
import { EventsRegistry, Navigation } from 'react-native-navigation';
import { COLOR_MODE, STORAGE_KEYS } from '../../../lib/constants';
import AsyncStorage from '@react-native-community/async-storage';

export const grayColors = (mode) => ({
  gray1: mode === 'dark' ? 'rgb(142,142,147)' : 'rgb(142, 142, 147)',
  gray2: mode === 'dark' ? 'rgb(99,99,102)' : 'rgb(174,174,178)',
  gray3: mode === 'dark' ? '#48484A' : '#C7C7CC',
  gray4: mode === 'dark' ? 'rgb(58,58,60)' : 'rgb(209,209,214)',
  gray5: mode === 'dark' ? 'rgb(44,44,46)' : 'rgb(229,229,234)',
  gray6: mode === 'dark' ? 'rgb(28,28,30)' : 'rgb(242,242,247)',
  gray7: mode === 'dark' ? 'rgb(28,28,30)' : 'rgb(242,242,247)',
});

export const primaryColors = (mode) => ({
  blue: mode === 'dark' ? '#3385FF' : '#0052CC',
  teal: '#00B8D9',
  yellow: '#F5A623',
  company: mode == 'dark' ? '#e7e6ed' : '#34343c',
  purple: mode === 'dark' ? '#7045af' : '#6554C0',
  green: '#36B37E',
  red: mode === 'dark' ? '#FF453A' : '#DE350B',
  black: '#34343c',
  white: '#e7e6ed',
});

export function compileColors(mode) {
  const gray = grayColors(mode);
  const primary = primaryColors(mode);
  return {
    background: {
      // old system fill 1D1D1D
      systemFill: mode === 'dark' ? '#34343c' : '#e7e6ed',
      secondarySystemFill: mode === 'dark' ? '#1C1C1E' : '#FFFFFF',
      tertiarySystemFill: mode === 'dark' ? 'rgb(30,30,30)' : '#EFEFF4',
    },
    fillColors: {
      systemFill: mode === 'dark' ? 'rgb(133,133,139)' : '#F6F6F6',
      secondarySystemFill:
        mode === 'dark' ? 'rgba(120,120,128,0.32)' : 'rgba(120,120,128,0.16)',
      tertiarySystemFill:
        mode === 'dark' ? 'rgba(118,118,128,0.24)' : 'rgba(118,118,128,0.12)',
      quaternarySystemFill:
        mode === 'dark' ? 'rgba(116,116,118,0.18)' : 'rgba(116,116,128,0.08)',
    },
    gray,
    label: {
      primary: mode === 'dark' ? '#e7e6ed' : '#34343c',
      secondaryLabel: gray.gray1,
      tertiaryLabel: gray.gray2,
      quaternaryLabel: gray.gray3,
      placeholderText: gray.gray2,
      link: primary.blue,
    },
    seperator: {
      primary: gray.gray5,
      opaque: gray.gray6,
    },
    primary,
  };
}
function ThemeWrapper(props: { componentId; children }) {
  //@ts-ignore

  // let systemColorScheme = 'light'
  let [systemColorScheme, setSystemColorScheme] = React.useState('light')
  // const schemeCompiler = (coming = null) => {
  //   return (userColorScheme == COLOR_MODE.DARK || userColorScheme == COLOR_MODE.LIGHT) ? userColorScheme : COLOR_MODE.LIGHT
  // }
  const [colors, setColors] = useState<any>(compileColors(systemColorScheme))

  const dynamicColor = useCallback(
    (darkColor, lightColor) => {
      // let schemeCompile = schemeCompiler()
      return systemColorScheme === 'dark' ? darkColor : lightColor
    },
    [systemColorScheme],
  );

  const changeScheme = async (mode: COLOR_MODE) => {
    setSystemColorScheme(mode)
  }

  const checkForExistingColorSchemes = async () => {
    let existing = await AsyncStorage.getItem(STORAGE_KEYS.THEME)
    setSystemColorScheme(!!existing ? existing : 'light')
  }

  React.useEffect(()=>{
    checkForExistingColorSchemes()
  },[])


  useEffect(() => {
    const _colors = compileColors(systemColorScheme);
    setColors(_colors)

  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        dynamicColor,
        colors,
        scheme: systemColorScheme,
        changeScheme
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeWrapper;
