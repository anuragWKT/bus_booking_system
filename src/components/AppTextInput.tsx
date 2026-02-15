import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

type Props = TextInputProps & {
  hasError?: boolean;
};

function AppTextInput({hasError = false, style, ...rest}: Props): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, hasError ? styles.errorBorder : null, style]}
        placeholderTextColor="#94A3B8"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
  },
  errorBorder: {
    borderColor: '#DC2626',
  },
});

export default AppTextInput;
