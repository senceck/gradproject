import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import _ from "lodash";
import { GLOBAL_CHECKOUT_SERVICE } from '../../hooks/useCheckout';
import Icon from '../../../shared/components/Icon';

export const KeychainService = {
    storeKeychainCredentials: async (username, password) => {
        return Keychain.setGenericPassword(JSON.stringify(username), password).then(() => {
        });
    },
    getKeychainCredentials: () => {
        return Keychain.getGenericPassword().then((user: any) => {
            if (_.isNull(user.username) || _.isUndefined(user.username) || _.isNull(user.password) || _.isUndefined(user.password)) {
                throw new Error()
            }
            return { ...JSON.parse(user.username), password: user.password }
        }).catch(e => {
            return {}
        })
    },
    resetKeychainCredentials: () => {
        return Keychain.resetGenericPassword();
    }
}