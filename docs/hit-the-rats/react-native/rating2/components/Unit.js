import { TouchableOpacity, Text } from 'react-native';

export default function Unit({ isShowing, doUpdate, size, index }) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (isShowing) doUpdate();
      }}
      style={{
        aspectRatio: '1',
        width: `${100 / size}%`,
        height: `${100 / size}%`,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
      }}>
      {isShowing && (
        <Text style={{ verticalAlign: 'middle', marginTop: 'auto', marginBottom: 'auto', width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>H</Text>
      )}
    </TouchableOpacity>
  );
}
