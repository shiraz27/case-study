import { StyleSheet } from "react-native";
import { Text, View, Button } from "@/components/Themed";
import { useGetMeQuery, useLoginMutation } from "@/app/apiSlice";
import { useDispatch } from "react-redux";
import { setToken } from "../authSlice";

const LoginButton = ({ callback }: { callback: () => void }) => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const data = await login({}).unwrap();
      dispatch(setToken(data.token || null));
      callback();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return <Button title="Login" onPress={handleLogin} />;
};

export default function TabOneScreen() {
  const { isError, refetch } = useGetMeQuery({});

  return (
    <View style={styles.container}>
      <Text style={isError ? styles.secondLineError : styles.secondLine}>
        You are currently{isError ? " not" : ""} logged in.
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <LoginButton callback={refetch} />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  secondLineError: {
    fontSize: 20,
    color: "red",
  },
  secondLine: {
    fontSize: 20,
    color: "green",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
