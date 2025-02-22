import React from 'react';
import { DimensionValue, View } from 'react-native';

interface GapProps {
  width?: DimensionValue;
  height?: DimensionValue;
}

function Gap({ width = 10, height = 10 }: GapProps) {
  return <View style={{ width, height }} />;
}

export default Gap;
