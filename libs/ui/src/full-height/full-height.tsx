import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export const FullHeight = ({ children }: { children: ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default FullHeight;
