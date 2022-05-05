import { useContext } from 'react';
import ThemeContext from '../../context/Theme';

export function useThemeContext() {
  let { colors, dynamicColor, changeScheme, scheme } = useContext(ThemeContext);
  return { colors, dynamicColor, changeScheme, scheme };
}
