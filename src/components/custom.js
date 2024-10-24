import React from 'react';
import { Snackbar } from 'react-native-paper';
import { View } from 'react-native';

const CustomSnackbar = ({ visible, message, onDismiss }) => {
    return (
        <View>
            <Snackbar
                visible={visible}
                onDismiss={onDismiss}
                duration={3000}
                action={{
                    onPress: onDismiss,
                }}>
                {message}
            </Snackbar>
        </View>
    );
};

export default CustomSnackbar;
