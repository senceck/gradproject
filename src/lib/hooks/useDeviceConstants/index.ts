import { useEffect, useState } from 'react';
import SafeArea from 'react-native-safe-area';
import { Navigation } from 'react-native-navigation';
import { themeRedux } from '../../actions/theme';
import { useDispatch, useSelector } from 'react-redux';




export function useDeviceConstants() {
  const dispatch = useDispatch();

  //@ts-ignore
  const { constants: { space, constants } } = useSelector(({ Theme }) => Theme)


  const rehydarateConstants = async () => {
    await GLOBAL_DEVICE_CONSTANTS_SERVICE.rehydarate(dispatch)
  }

  useEffect(() => {
    // rehydarateConstants()
  }, []);

  return {
    rehydarateConstants,
    bottomSpace: space.bottom,
    topSpace: space.top,
    bottomTabsHeight: constants.bottomTabsHeight,
    topBarHeight: constants.topBarHeight
  };
}

export const GLOBAL_DEVICE_CONSTANTS_SERVICE = {
  rehydarate: (dispatch) => {
    return new Promise(async (resolve, reject) => {
      let constants;
      let space;
      try {
        await SafeArea.getSafeAreaInsetsForRootView().then(
          ({ safeAreaInsets: { bottom, top, left, right } }) => {
            space = ({ bottom, top, left, right });
          },
        );
        await Navigation.constants().then(_constants => {
          console.log("MY FUCKING CONSTANTS", constants)
          constants = (_constants);
        });
        themeRedux.setConstants({ constants, space: { ...space } })(dispatch)
        resolve(null)
      } catch (e) {
        reject(e)
      }
    })
  }
}
