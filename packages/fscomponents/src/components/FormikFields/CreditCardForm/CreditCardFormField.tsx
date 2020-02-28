import React from 'react';
import {
  Image,
  ImageURISource,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { useField, useFormikContext } from 'formik';
import { style } from '../../../styles/FormFK';

interface CreditCardCsvFormProps {
  name: string;
  label?: string;
  validIcon?: ImageURISource;
  errorIcon?: ImageURISource;
  textInputStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export const CreditCardFormField: React.FC<CreditCardCsvFormProps> = ({
  name,
  label,
  containerStyle,
  errorStyle,
  labelStyle,
  textInputStyle,
  ...props
}) => {

  const [field, meta] = useField(name);
  const { handleChange, setFieldTouched } = useFormikContext();
  const setTouched = () => setFieldTouched(name);

  return(
    <View style={[style.container, containerStyle]}>
      {label && <Text style={[style.label, labelStyle]}>{label}</Text>}
      <TextInput
        {...props}
        style={[style.textInput, textInputStyle]}
        onChangeText={handleChange(name)}
        onBlur={setTouched}
      />
      {
        meta.touched && meta.error &&
        <Text style={[style.errorMessageText, errorStyle]}>
          {meta.error}
        </Text>
      }
    </View>
  );
};
