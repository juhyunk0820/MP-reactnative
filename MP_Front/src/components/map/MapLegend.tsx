import {colorHex, colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Category, MarkerColor, ThemeMode} from '@/types';
import React, {Fragment} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

function MapLegend() {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  const {getProfileQuery} = useAuth();
  const insets = useSafeAreaInsets();
  const {categories} = getProfileQuery.data || {};

  return (
    <>
      {Object.values(categories as Category).join('') !== '' && (
        <View style={[styles.container, {top: insets.top || 20}]}>
          {categoryList.map((color, i) => {
            return (
              <Fragment key={i}>
                {categories?.[color] !== '' && (
                  <View style={styles.column}>
                    <View
                      style={[
                        styles.legendColor,
                        {backgroundColor: colorHex[color]},
                      ]}
                    />
                    <Text style={styles.legendText}>{categories?.[color]}</Text>
                  </View>
                )}
              </Fragment>
            );
          })}
        </View>
      )}
    </>
  );
}

export default MapLegend;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      right: 15,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 10,
      borderRadius: 10,
      gap: 3,
    },
    column: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    legendColor: {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    legendText: {
      color: colors[theme].UNCHANGE_WHITE,
      fontWeight: '500',
      fontSize: 13,
    },
  });
