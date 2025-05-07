import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ImageUri, ThemeMode} from '@/types';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

function ImageCarousel({images, pressedIndex = 0}: ImageCarouselProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const [page, setpage] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);
    setpage(newPage);
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButtonContainer, {marginTop: insets.top + 10}]}
        onPress={() => navigation.goBack()}>
        <Octicons name="arrow-left" size={30} color={colors[theme].WHITE} />
      </Pressable>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030/'
                    : 'http://10.0.2.2:3030/'
                }${item.uri}`,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(0);
        }}
        onScroll={handleScroll}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
      <View style={[styles.pageContainer, {bottom: insets.bottom + 10}]}>
        {Array.from({length: images.length}, (_, index) => (
          <View
            key={index}
            style={[styles.pageDot, index === page && styles.currentPage]}
          />
        ))}
      </View>
    </View>
  );
}

export default ImageCarousel;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors[theme].WHITE,
    },
    backButtonContainer: {
      position: 'absolute',
      left: 20,
      zIndex: 1,
      backgroundColor: colors[theme].PINK_700,
      height: 40,
      width: 40,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    pageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
    },
    pageDot: {
      margin: 4,
      backgroundColor: colors[theme].GRAY_200,
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    currentPage: {
      backgroundColor: colors[theme].PINK_700,
    },
  });
