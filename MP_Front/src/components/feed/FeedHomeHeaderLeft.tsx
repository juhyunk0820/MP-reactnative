import React from 'react';
import HeaderButton from '@/components/common/HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useThemeStore from '@/store/useThemeStore';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedHomeHeaderLeft(navigation: FeedHomeHeaderLeftProps) {
  const {theme} = useThemeStore();
  return (
    <HeaderButton
      icon={<Ionicons name="menu" size={25} color={colors[theme].BLACK} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default FeedHomeHeaderLeft;
