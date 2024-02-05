import {StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {useGetMeQuery} from "@/app/apiSlice";

export default function TabOneScreen() {
    const {isError} = useGetMeQuery({});

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <Text style={styles.secondLine}>You are currently {isError ? "not" : ""} logged in.</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <EditScreenInfo path="app/(tabs)/index.tsx"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    secondLine: {
        fontSize: 20,
        color: 'red',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
