import "./index.scss";
import React from "react";
interface ITokenInput {
    tokenSeparators?: string[];
    value?: string | string[];
    row?: number;
    tokenLength?: number;
    autoFocus?: boolean;
    placeholder?: string;
    validator?: (token: string) => boolean;
    onChange?: (newVal: string[]) => void;
}
export interface IRef {
    empty(): void;
}
declare const TokenInput: React.ForwardRefExoticComponent<ITokenInput & React.RefAttributes<IRef>>;
export default TokenInput;
