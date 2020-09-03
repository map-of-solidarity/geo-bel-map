import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';

export default (props = {}) => {
  const {
    IconComponent,
    selected,
    color,
    colorSelected,
    onPress,
    disabled,
    containerStyle,
    loading,
    label,
    children,
  } = props;
  const textColor =
    props.textColor || (selected ? colorSelected : color) || Colors.darkBlue;
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : {})}
      disabled={disabled || false}
      style={{
        flexDirection: 'row',
        backgroundColor: (selected ? color : colorSelected) || Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 60,
        marginVertical: 15,
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: color || Colors.darkBlue,
        paddingVertical: 6,
        paddingHorizontal: 15,
        ...(containerStyle || {}),
      }}>
      {selected && loading ? (
        <ActivityIndicator color={colorSelected} animating={loading} />
      ) : (
        IconComponent || null
      )}
      {(label !== undefined && label !== null) ? (
        <Text
          style={{
            marginLeft: 4,
            color: textColor,
            fontSize: 18,
          }}>
          {label || 'Button'}
        </Text>
      ) : null}
      {children}
    </TouchableOpacity>
  );
};
