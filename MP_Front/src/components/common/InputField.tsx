import React, {ForwardedRef, forwardRef, ReactNode, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';

import {mergeRefs} from '@/utils';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {disabled = false, error, touched, icon = null, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const {theme} = useThemeStore();
    const styles = styling(theme);
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
            props.multiline && styles.multiline,
          ]}>
          <View style={Boolean(icon) && styles.innerContainer}>
            {icon}
            <TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              editable={!disabled}
              placeholderTextColor={colors[theme].GRAY_500}
              style={[styles.input, disabled && styles.disabled]}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              {...props}
            />
          </View>
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      padding: deviceHeight > 700 ? 15 : 10,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    multiline: {
      paddingBottom: deviceHeight > 700 ? 45 : 30,
      paddingTop: deviceHeight > 700 ? 15 : 10,
    },
    input: {
      fontSize: 16,
      color: colors[theme].BLACK,
      padding: 0,
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_200,
      color: colors[theme].GRAY_700,
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors[theme].RED_300,
    },
    error: {
      color: colors[theme].RED_500,
      fontSize: 12,
      paddingTop: 5,
    },
  });

export default InputField;
