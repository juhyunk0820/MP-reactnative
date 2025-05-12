import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {CompoundOption} from '../common/CompoundOption';
import {MarkerColor} from '@/types';
import useAuth from '@/hooks/queries/useAuth';
import {colorHex} from '@/constants';

interface MarkerFilterOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

function MarkerFilterOption({isVisible, hideOption}: MarkerFilterOptionProps) {
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};
  const [filterCondition, setFilterCondition] = useState<string>('색상');

  const handleCondition = (condition: string) => {
    setFilterCondition(condition);
  };
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Title>마커 필터링</CompoundOption.Title>
          <CompoundOption.Divider />
          <View style={styles.filterContainer}>
            {['색상', '평점'].map(condition => (
              <CompoundOption.Filter
                key={condition}
                isSelected={filterCondition === condition}
                onPress={() => handleCondition(condition)}>
                {condition}
              </CompoundOption.Filter>
            ))}
          </View>
          <CompoundOption.Divider />
          {filterCondition === '색상' && (
            <>
              {categoryList.map(color => {
                return (
                  <CompoundOption.CheckBox
                    key={color}
                    onPress={() => {}}
                    isChecked={false}
                    icon={
                      <View
                        style={[
                          styles.marker,
                          {
                            backgroundColor: colorHex[color],
                          },
                        ]}
                      />
                    }>
                    {categories?.[color]}
                  </CompoundOption.CheckBox>
                );
              })}
            </>
          )}
          {filterCondition === '평점' && (
            <>
              {['1', '2', '3', '4', '5'].map(score => (
                <CompoundOption.CheckBox
                  key={score}
                  onPress={() => {}}
                  isChecked={false}>
                  {score}점
                </CompoundOption.CheckBox>
              ))}
            </>
          )}
          <CompoundOption.Divider />
          <CompoundOption.Button onPress={hideOption}>
            완료
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default MarkerFilterOption;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});
