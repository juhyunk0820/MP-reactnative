import React from 'react';
import {colors, feedNavigations, feedTabNavigations} from '@/constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import {StyleSheet} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import useThemeStore from '@/store/useThemeStore';

export type FeedTabParamList = {
  [feedTabNavigations.FEED_HOME]: {
    screen: typeof feedNavigations.FEED_DETAIL;
    params: {
      id: number;
    };
    initial: false;
  };
  [feedTabNavigations.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcons(route: RouteProp<FeedTabParamList>, focuesed: boolean) {
  let iconName = '';
  const {theme} = useThemeStore();

  switch (route.name) {
    case feedTabNavigations.FEED_HOME: {
      iconName = focuesed ? 'reader' : 'reader-outline';
      break;
    }
    case feedTabNavigations.FEED_FAVORITE: {
      iconName = focuesed ? 'star' : 'star-outline';
      break;
    }
  }
  return (
    <Ionicons
      name={iconName}
      color={focuesed ? colors[theme].PINK_700 : colors[theme].GRAY_500}
      size={25}
    />
  );
}

function FeedTabNavigator() {
  const {theme} = useThemeStore();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors[theme].PINK_700,
        tabBarStyle: {
          backgroundColor: colors[theme].WHITE,
          borderTopColor: colors[theme].GRAY_200,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <Tab.Screen
        name={feedTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: (tabRoute => {
            const routeName = getFocusedRouteNameFromRoute(tabRoute);

            if (
              routeName === feedNavigations.FEED_DETAIL ||
              routeName === feedNavigations.EDIT_POST ||
              routeName === feedNavigations.IMAGE_ZOOM
            ) {
              return {display: 'none'};
            }
            return {
              backgroundColor: colors[theme].WHITE,
              borderTopColor: colors[theme].GRAY_200,
              borderTopWidth: StyleSheet.hairlineWidth,
            };
          })(route),
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={({navigation}: any) => ({
          headerTitle: '즐겨찾기',
          cardStyle: {
            backgroundColor: colors[theme].GRAY_100,
          },
          headerStyle: {
            shadowColor: 'gray',
            backgroundColor: colors[theme].WHITE,
          },
          headerTitleStyle: {
            fontSize: 15,
          },
          headerTintColor: colors[theme].BLACK,
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
    </Tab.Navigator>
  );
}

export default FeedTabNavigator;
