import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  textInput: {
    height: 30,
    paddingHorizontal: 10
  },
  inputContainer: {
    marginVertical: 5
  },
  buttonText: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    backgroundColor: '#555',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10
  },
  errorMessageText: {
    color: 'red'
  },
  label: {
    marginBottom: 10
  },
  icon: {
    padding: 10
  }
});
