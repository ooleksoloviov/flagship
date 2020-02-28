import React from 'react';
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
import { useField, useFormikContext, Formik, FormikProps } from 'formik';

import { CreditCardType } from '../types/Store';
import { FormLabelPosition } from './Form';
import { CreditCardFormField, CreditCardNumberField } from './FormikFields/CreditCardForm';
import { CreditCardNumber } from './CreditCardNumber';

export interface CreditCardFormFKData {
  number: string;
  name: string;
  extra: {
    expirationDate: string;
    cvv: string;
  };
}

export interface CreditCardFormValues {
  number?: string;
  name?: string;
  expiration?: string;
  cvv?: string;
}

export interface CreditCardFormFKProps {
  fieldsOptions?: any;
  fieldsStyleConfig?: any;
  hideName?: boolean;
  cscIcon?: ImageURISource;
  cscIconStyle?: StyleProp<ImageStyle>;
  defaultCardImage?: ImageURISource;
  labelPosition?: FormLabelPosition;
  style?: StyleProp<ViewStyle>;
  supportedCards?: {
    type: CreditCardType;
    image: ImageURISource;
  }[];
  supportedCardsLabel?: JSX.Element;
  supportedCardsStyle?: StyleProp<ViewStyle>;
  supportedIconStyle?: StyleProp<ImageStyle>;
  value?: CreditCardFormFKData;
  onSubmit?: (value: CreditCardFormValues) => void;
};

export const CreditCardFormFK: React.FC<CreditCardFormFKProps> = props => {

  const initialValues: CreditCardFormValues = {
    // number: '',
    name: '',
    expiration: '',
    cvv: ''
  };

  const handleSubmit = (values: CreditCardFormValues) => {
    if (values && props.onSubmit) {
      props.onSubmit(values);
    }
  };

  return(
    <View>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(f: FormikProps<CreditCardFormValues>) => (
          <>
            <CreditCardNumberField name='number' label='Credit Card Number' />
            <CreditCardFormField name='name' label='Name'/>
            <CreditCardFormField name='expiration' label='Exp. Date'/>
            <CreditCardFormField name='cvv' label='CVV'/>
          </>
        )}
      </Formik>
    </View>
  );
}
