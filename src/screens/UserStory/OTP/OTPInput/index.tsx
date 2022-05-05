import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ifArabic } from "../../../../lib/helpers/locale";
import { useThemeContext } from "../../../../lib/hooks/useThemeContext";
import Label from "../../../../shared/components/Label";

export interface Props {
  maxLength;
  secureTextEntry?;
  onFulfill;
  clearError;
}

export function OTPInput(props: Props) {
  const [digits, setDigits] = useState("");
  const setEmpty = () => {
    props.clearError()
    setDigits("")
  };
  useEffect(() => {
    if (digits.length === props.maxLength) {
      props.onFulfill && props.onFulfill(digits);
    }
  }, [digits]);

  const { colors, dynamicColor } = useThemeContext()

  const inputRef = useRef<any>(null);
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 350)
  }, [])

  return (
    <View
      style={{
        // flex: 1,
        height: 45,
        flexDirection: ifArabic("row-reverse", "row"),
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {Array.from(new Array(props.maxLength), (_, i) => (
        <View
          key={i}
          style={{
            paddingVertical: 10,
            minHeight: 40,
            width: widthPercentageToDP("10"),
            marginHorizontal: widthPercentageToDP("3"),
            borderBottomColor:
              digits.length === i ? colors.primary.company : dynamicColor(colors.primary.white, colors.primary.black),
            borderBottomWidth: 2
          }}
        >
          <Label
            type="primary"
            weight="medium"
            style={{
              fontSize: widthPercentageToDP("4"),
              height: "100%",
              textAlign: "center"
            }}
          >
            {digits.length > i ? (props.secureTextEntry ? "*" : digits[i]) : ""}
          </Label>
        </View>
      ))}
      <TextInput
        ref={inputRef}
        style={{
          opacity: 0,
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2
        }}
        onTouchStart={setEmpty}
        // autoFocus
        selection={{
          start: digits.length,
          end: digits.length
        }}
        selectTextOnFocus={false}
        // clearTextOnFocus
        secureTextEntry={props.secureTextEntry}
        keyboardType="numeric"
        value={digits}
        onChangeText={setDigits}
        maxLength={props.maxLength}
      />
    </View>
  );
}
