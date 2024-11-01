/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#001247';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#dedede',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF',
    background: '#151718',
    tint: tintColorDark,
    icon: '#232426',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
