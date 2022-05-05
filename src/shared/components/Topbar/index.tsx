import React from 'react';
import { View, StyleSheet, PlatformColor, Platform, Animated } from 'react-native';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useDeviceConstants } from '../../../lib/hooks/useDeviceConstants';
import BackButton from './BackButton';
import FavoriteButton from './FavoriteButton';
import Row from '../layout/Row';
import ShareButton from './ShareButton';
import MenuButton from './MenuButton';
// import Logo from '../../company/Logo';
// import Animated from "react-native-reanimated"
// import LinearGradient from "react-native-linear-gradient"
import { GLOBAL_THEME } from '../../../lib/constants';
import UserButton from './UserButton';
import CloseButton from './CloseButton';
import Label from '../Label';
import { useUser } from '../../../lib/hooks/useUser';
import SearchButton from './SearchButton';
interface Props {
  onBackPress?;
  scrollPosition?;
  onFavToggle?;
  isFavorite?;
  onMenuPress?;
  onShare?;
  isBackVisible?;
  isMenuVisible?
  isFavoriteVisible?;
  animatedStyles?;
  isUserVisible?;
  onUserPress?;
  showButtonBackgrounds?;
  title?;
  animatedTitle?
  isCloseVisible?;
  onClosePress?;
  isInModal?;
  isSearchVisible?;
  hideShadow?;
  rightBlock?;
  leftBlock?;
  onSearchPress?;
}

function LeftSection(props) {
  return (
    <Row
      alignItems={'center'}
      style={{ flexGrow: 1, zIndex: 50, elevation: 5 }}
      justifyContent={'flex-start'}>
      {props.children}
    </Row>
  );
}

function RightSection(props) {
  return (
    <Row
      alignItems={'center'}
      style={{ flexGrow: 1, zIndex: 20, }}
      justifyContent={'flex-end'}>
      {props.children}
    </Row>
  );
}

function TitleSection(props) {
  return (
    <Row
      alignItems={'center'}
      style={{
        flexGrow: 1, zIndex: 20,
      }}
      justifyContent={'center'}>
      {props.children}
    </Row>
  );
}

function TopBar(props: Props) {

  const { colors, dynamicColor } = useThemeContext();
  const { topSpace } = useDeviceConstants();
  const { isLoggedIn } = useUser()

  const getTopSpace = () => {

    if (topSpace && topSpace > 0) {
      if (Platform.OS == "android") {
        return topSpace
      } else {
        if (props.isInModal) {
          return widthPercentageToDP("2")
        } else {
          return topSpace
        }
      }
    } else {
      return widthPercentageToDP("2")
    }

    return widthPercentageToDP("2")
  }

  return (
    <Animated.View style={[styles.container, {
      paddingTop: getTopSpace(), zIndex: 149,
      elevation: 150,
    }]}>


      <Animated.View
        style={[
          {
            zIndex: 10,
            backgroundColor: dynamicColor(
              colors.gray.gray6,
              colors.primary.white,
            ),
          },
          styles.background,
          !props.hideShadow ? {
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 0
          } : {},
          props.animatedStyles
        ]}
      />
      <LeftSection>
        {props.isBackVisible || props.isCloseVisible ? (
          <View>
            {props.isBackVisible && (<BackButton onPress={props.onBackPress}
              showButtonBackgrounds={props.showButtonBackgrounds}
            />)}
            {props.isCloseVisible && (<CloseButton onPress={props.onClosePress}
              showButtonBackgrounds={props.showButtonBackgrounds}
            />)}
          </View>
        ) : (
          // <Logo />
          <></>
        )}
        {props.leftBlock && (
          <View style={{ width: widthPercentageToDP("10") }} />
        )}
      </LeftSection>

      {props.title && (
        <TitleSection >
          <Animated.View style={[props.animatedTitle]}>
            <Label type="primary" size="headline" weight="medium">
              {props.title}
            </Label>
          </Animated.View>
        </TitleSection>
      )}
      <RightSection>
        {props.rightBlock && (
          <View style={{ width: widthPercentageToDP("10") }} />
        )}
        {props.isSearchVisible && <SearchButton
          showButtonBackgrounds={props.showButtonBackgrounds}
          onPress={props.onSearchPress}
        />}
        {props.isFavoriteVisible && (<FavoriteButton
          showButtonBackgrounds={props.showButtonBackgrounds}
          onPress={props.onFavToggle}
          isFavorite={props.isFavorite}
        />)}
        {props.isUserVisible && isLoggedIn && (
          <UserButton
            showButtonBackgrounds={props.showButtonBackgrounds}
            onPress={props.onUserPress}
          />
        )}
        {props.isMenuVisible && (<MenuButton
          showButtonBackgrounds={props.showButtonBackgrounds}
          onPress={props.onMenuPress}
        />)}

      </RightSection>
    </Animated.View >
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container: {
    position: 'absolute',
    paddingBottom: widthPercentageToDP(2),
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: GLOBAL_THEME.container,
    width: widthPercentageToDP(100),

  },
});

export default TopBar;
