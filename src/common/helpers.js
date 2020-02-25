import { Dimensions, Platform, ToastAndroid, AlertIOS } from 'react-native';

const { width, height } = Dimensions.get('window');
const isPortrait = height > width;
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => isPortrait ? (width / guidelineBaseWidth) * size : (height / guidelineBaseWidth) * size;
const heightScale = size => isPortrait ? (height / guidelineBaseHeight) * size : (width / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const isIphoneX = () => {
    return Platform.OS === 'ios' && (height == 812 || width == 812);
};

export { scale as w, heightScale as h, moderateScale as m, isIphoneX };
const fullWidth = width;
const fullHeight = height;
export { fullWidth, fullHeight };
export { isPortrait };

export function notifyMessage(msg) {
	if (Platform.OS === 'android') {
		ToastAndroid.show(msg, ToastAndroid.SHORT)
	} else {
		AlertIOS.alert(msg);
	}
}
