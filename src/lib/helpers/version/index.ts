// import compareVersions from 'compare-versions';
import VersionNumber from 'react-native-version-number';

const appVersion = VersionNumber.appVersion;

export const isUpdateNeeded = (version) => {
  // return compareVersions(appVersion, version) >= 0;
};
