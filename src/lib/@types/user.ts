import { Generic } from "./generic";

export interface registerForm extends Generic {
    email;
    name;
    companyId;
    password;
    phone_number;
    country_code;
}

export interface iUser extends registerForm {
    notifiticaions?;
}

export interface loginForm extends Generic {
    phone;
    password;
}