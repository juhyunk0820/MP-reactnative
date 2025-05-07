import CustomButton from '@/components/common/CustomButton';
import {alerts, colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

function DeleteAccountScreen() {
  const {deleteAccountMutation} = useAuth();
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const handlePressDeleteAccount = () => {
    Alert.alert(
      alerts.DELETE_ACCOUNT.TITLE,
      alerts.DELETE_ACCOUNT.DESCRIPTION,
      [
        {
          text: '탈퇴',
          onPress: () =>
            deleteAccountMutation.mutate(null, {
              onSuccess: () =>
                Toast.show({
                  type: 'success',
                  text1: '회원탈퇴 완료',
                  text2: '회원탈퇴가 완료되었습니다.',
                  position: 'top',
                }),
              onError: error =>
                Toast.show({
                  type: 'error',
                  text1:
                    error.response?.data.message || '회원탈퇴에 실패했습니다.',
                  position: 'top',
                }),
            }),
          style: 'destructive',
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          저장된 데이터를 모두 삭제해야 탈퇴가 가능합니다.
        </Text>
        <Text style={styles.infoText}>
          저장된 장소가 남아있다면, 삭제해 주세요.
        </Text>
      </View>
      <CustomButton label="회원탈퇴" onPress={handlePressDeleteAccount} />
    </View>
  );
}

export default DeleteAccountScreen;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors[theme].PINK_700,
      borderRadius: 3,
      padding: 10,
      gap: 10,
    },
    infoText: {
      color: colors[theme].PINK_700,
      fontSize: 15,
      fontWeight: '600',
    },
  });
