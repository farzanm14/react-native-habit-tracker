import { Dimensions } from "react-native";
import { mvs, s, vs } from "react-native-size-matters";

const window = Dimensions.get("window");
const inputHeight = 50;

export default {
  windowWidth: window.width,
  windowHeight: window.height,
  windowAspectRatio: window.height / window.width,

  zero: 0,

  // icon
  iconSize2: vs(2),
  iconSize5: vs(5),
  iconSize8: vs(8),
  iconSize10: vs(10),
  iconSize12: vs(12),
  iconSize16: vs(16),
  iconSize20: vs(20),
  iconSize24: vs(24),
  iconSize28: vs(28),
  iconSize32: vs(32),
  iconSize40: vs(40),
  iconSize64: vs(64),
  iconSize72: vs(72),
  iconSize100: vs(100),

  borderWidthHalf: vs(0.5),
  borderWidth: vs(1),
  borderWidth2: vs(2),
  borderWidth3: vs(3),

  // button
  buttonHeight24: vs(24),
  buttonHeight32: vs(32),
  buttonHeight40: vs(40),
  buttonHeight48: vs(48),
  buttonHeight64: vs(64),

  // input
  inputHeight55: vs(55),
  inputHeight: inputHeight,
  textAreaHeight: inputHeight * 3,

  // vertical margin/padding
  v2: vs(2),
  v4: vs(4),
  v6: vs(6),
  v8: vs(8),
  v10: vs(10),
  v12: vs(12),
  v14: vs(14),
  v16: vs(16),
  v18: vs(18),
  v20: vs(20),
  v24: vs(24),
  v32: vs(32),
  v36: vs(36),
  v40: vs(40),
  v46: vs(46),
  v50: vs(50),
  v55: vs(55),
  v64: vs(64),
  v90: vs(90),
  v120: vs(120),
  v200: vs(200),
  v250: vs(250),
  v300: vs(300),

  // horizontal margin/padding
  h2: s(2),
  h4: s(4),
  h6: s(6),
  h8: s(8),
  h10: s(10),
  h12: s(12),
  h14: s(14),
  h16: s(16),
  h18: s(18),
  h20: vs(20),
  h24: vs(24),
  h32: s(32),
  h36: s(36),
  h40: s(40),
  h46: s(46),
  h50: s(50),
  h56: s(56),
  h64: s(64),
  h70: s(70),
  h82: s(82),
  h100: s(100),
  h150: s(150),
  h200: s(200),

  // radius
  radius2: vs(2),
  radius5: vs(5),
  radius10: vs(10),
  radius15: vs(15),
  radius20: vs(20),
  radius30: vs(30),
  radius40: vs(40),
  radius50: vs(50),

  //fontSizes
  fs8: mvs(8),
  fs10: mvs(10),
  fs12: mvs(12),
  fs14: mvs(14),
  fs16: mvs(16),
  fs18: mvs(18),
  fs20: mvs(20),
  fs24: mvs(24),
  fs28: mvs(28),
  fs32: mvs(32),

  // header
  headerHeight: vs(65),
  headerDivider: vs(1),
  headerHeightTab: vs(75),

  //bottomTab
  bottomTabHeight: vs(70),
  bottomTabPadding: vs(75),
  fabWithBottomTab: vs(75),
};
