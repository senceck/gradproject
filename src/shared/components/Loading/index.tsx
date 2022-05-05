// import { BlurView } from '@react-native-community/blur';
// import { AnimatePresence, MotiView } from 'moti';
// import React from 'react'
// import { View, Text, ActivityIndicator } from 'react-native'
// import { widthPercentageToDP } from 'react-native-responsive-screen'
// import { GLOBAL_THEME } from '../../../lib/constants';
// import { useThemeContext } from '../../../lib/hooks/useThemeContext'

// interface Props {
//     isVisible;
//     opacity?;
// }

// export default function Loading(props: Props) {
//     const { colors, dynamicColor } = useThemeContext();
//     return (
//         <AnimatePresence>
//             {props.isVisible && <MotiView
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     zIndex: 1000000000,
//                     backgroundColor: `rgba(0,0,0,${props.opacity ? props.opacity : 0})`
//                 }}
//             >
//                 <View
//                     style={{
//                         flex: 1,
//                         justifyContent: "center",
//                         alignItems: 'center',
//                         // backgroundColor:'rgba(0,0,0,0.2)'
//                     }}
//                 // blurRadius={0.2}
//                 // blurAmount={0.2}
//                 // blurType='dark'
//                 >
//                     <View

//                         style={{
//                             borderRadius: GLOBAL_THEME.radius.small,
//                             padding: widthPercentageToDP("2.5"),
//                             backgroundColor: dynamicColor(colors.gray.gray6, colors.gray.gray5)
//                         }}
//                     >
//                         <ActivityIndicator
//                             size={widthPercentageToDP("5")}
//                             color={dynamicColor(colors.primary.white, colors.primary.black)}
//                         />
//                     </View>
//                 </View>
//             </MotiView>}
//         </AnimatePresence>
//     )
// }

import React from 'react'
import { View, Text } from 'react-native'

export default function Loading() {
    return (
        <View>
            <Text></Text>
        </View>
    )
}
