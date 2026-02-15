import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

function AppButton({title, isLoading = false, style, disabled, ...rest}: Props): JSX.Element {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, isDisabled ? styles.buttonDisabled : null, style]}
      disabled={isDisabled}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: '#2563EB',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AppButton;
