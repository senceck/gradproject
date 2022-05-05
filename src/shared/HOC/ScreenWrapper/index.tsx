import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../../..';
import ThemeWrapper from '../ThemeWrapper';
import CustomToast from '../../components/CustomToast';
import { widthPercentageToDP } from 'react-native-responsive-screen';

function ScreenWrapper(props: any, C: React.FC) {
  return (
    <ThemeWrapper componentId={props.componentId}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <C {...props} />
        </PersistGate>
      </Provider>
    </ThemeWrapper>
  );
}

export default ScreenWrapper;
