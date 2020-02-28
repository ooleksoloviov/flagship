import React, { useState } from 'react';
import {
  Image,
  ImageStyle,
  ImageURISource,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { useField, useFormikContext } from 'formik';
import { style } from '../../../styles/FormFK';

export enum CardIconPosition {
  Left,
  Right
}

interface CreditCardNumberFieldProps extends TextInputProps {
  name: string;
  label?: string;
  cardIcon?: {
    position: CardIconPosition;
    icon: ImageURISource;
  };
  validIcon?: ImageURISource;
  errorIcon?: ImageURISource;
  iconStyle?: StyleProp<ImageStyle>;
  textInputStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  hideCCNumber?: boolean;
}

export const CreditCardNumberField: React.FC<CreditCardNumberFieldProps> = ({
  name,
  label,
  containerStyle,
  errorStyle,
  labelStyle,
  iconStyle,
  textInputStyle,
  cardIcon,
  hideCCNumber,
  ...props
}) => {

  const [field, meta] = useField(name);
  const { handleChange, setFieldTouched } = useFormikContext();
  const [value, setValue] = useState('');
  const [hiddenValue, setHiddenValue] = useState('');
  const setTouched = () => setFieldTouched(name);

  const iconElement = (icon: ImageURISource) => (
    <Image style={[style.icon, iconStyle]} source={icon} />
  );

  const onChange = (value: string) => {
    handleChange(name);
    const v = value.replace(/ /g, '').match(/.{1,4}/g) || [];
    setValue(
      v.join(' ')
    );
  };

  return(
    <View style={[style.container, containerStyle]}>
      {label && <Text style={[style.label, labelStyle]}>{label}</Text>}
      <View>
        {
          cardIcon && cardIcon.position === CardIconPosition.Left &&
            iconElement(cardIcon.icon)
        }
        <TextInput
          {...props}
          style={[style.textInput, textInputStyle]}
          onChangeText={onChange}
          value={value}
          onBlur={setTouched}
        />
        {
          cardIcon && cardIcon.position === CardIconPosition.Right &&
            iconElement(cardIcon.icon)
        }
      </View>
      {
        meta.touched && meta.error &&
        <Text style={[style.errorMessageText, errorStyle]}>
          {meta.error}
        </Text>
      }
    </View>
  );
};
