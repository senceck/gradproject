import React, { useEffect, useState } from "react";
import { KeychainService } from "../../services/Keychain";
import _ from "lodash";
import { registerForm } from "../../@types/user";
import { Generic } from "../../@types/generic";

interface KeychainCredentials extends Generic {
    email;
    name;
    companyId;
    password;
    phone_number;
    country_code;
}

const AB_R = "password";
export default function useRecentUser() {
    const [hasRecent, setHasRecent] = useState<Boolean>(false);
    const [_dycrptedKeychain, _setDycrptedKeychain] = useState<KeychainCredentials>();
    const [userData, setUserData] = useState<any>({})
    const handleKeychainCredentials = async () => {
        let credentials = await KeychainService.getKeychainCredentials();
        if (!!!credentials[AB_R] || credentials[AB_R].length == 0) {
            //LODASH FAILED ME HERE MILESTONE
            setHasRecent(false);
        } else {
            console.log("XXWW", credentials[AB_R])
            _setDycrptedKeychain(credentials)
            setHasRecent(true)
        }
    }
    useEffect(() => {
        setUserData(_.omit(_dycrptedKeychain, AB_R))
    }, [_dycrptedKeychain])

    useEffect(() => {
        handleKeychainCredentials();
    }, [])

    const getKeychainUserPassword = () => {
        return _dycrptedKeychain.password
    }
    return {
        recentUser: userData,
        hasRecent,
        getKeychainUserPassword
    }
}

