import React from 'react';

type Theme = {
  colors: {
    gray: {
      gray1;
      gray2;
      gray3;
      gray4;
      gray5;
      gray6;
    };
    label: {
      primary;
      secondaryLabel;
      tertiaryLabel;
      quaternaryLabel;
      placeholderText;
      link;
    };
    seperator: {
      primary;
      opaque;
    };
    background: {
      systemFill;
      secondarySystemFill;
      tertiarySystemFill;
      quaternarySystemFill;
    };
    fillColors: {
      systemFill;
      secondarySystemFill;
      tertiarySystemFill;
      quaternarySystemFill;
    };
    primary: {
      blue;
      teal;
      yellow;
      purple;
      green;
      red;
      black;
      white;
      company;
    };
  };
  dynamicColor;
  scheme;
  changeScheme
};

const ThemeContext = React.createContext<Theme>({
  // @ts-ignore
  colors: {},
  dynamicColor: () => { },
  changeScheme: () => { }
});

export default ThemeContext;
