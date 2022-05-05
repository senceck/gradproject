import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: widthPercentageToDP('5.5'),
		color: 'black'
	},
	seeMoreTitle: { fontSize: 15, color: 'rgb(0,122, 255)' }
});
