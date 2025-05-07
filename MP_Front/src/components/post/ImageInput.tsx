import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ImageInputProps {
  onChange: () => void;
}

function ImageInput({onChange}: ImageInputProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}
      onPress={onChange}>
      <Ionicons
        name="camera-outline"
        size={20}
        color={colors[theme].GRAY_500}
      />
      <Text style={styles.imageInputText}>사진 추가</Text>
    </Pressable>
  );
}

export default ImageInput;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    imageInput: {
      borderWidth: 1.5,
      borderStyle: 'dotted',
      borderColor: colors[theme].GRAY_300,
      height: 70,
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    imageInputPressed: {
      opacity: 0.5,
    },
    imageInputText: {
      fontSize: 12,
      color: colors[theme].GRAY_500,
    },
  });
