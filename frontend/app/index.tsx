import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Text, View, Button } from "@/components/Themed";
import {
  useCreateOrderMutation,
  useGetMeQuery,
  useLoginMutation,
} from "./Redux/apiSlice";
import { useDispatch } from "react-redux";
import { setToken } from "./Redux/authSlice";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";

const LoginButton = ({ callback }: { callback: (token: boolean) => void }) => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const data = await login({}).unwrap();
      dispatch(setToken(data.token || null));
      callback(data.token || null);
    } catch (error) {}
  };

  return <Button isLoading={isLoading} title="Login" onPress={handleLogin} />;
};

const LogoutButton = ({ callback }: { callback: () => void }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await SecureStore.deleteItemAsync("token");
      dispatch(setToken(null));
      callback();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return <Button isLoading={isLoading} title="Logout" onPress={handleLogout} />;
};

const OrderButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleOrder = async () => {
    if (isLoggedIn) {
      try {
        const data = await createOrder({}).unwrap();
        router.setParams({ orderId: data?.id });
      } catch (error) {}
    } else {
      Alert.alert("Something went wrong", "You have to login to make orders!", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <Link href={isLoggedIn ? "/modal" : "/"} asChild>
      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.text}>Order something 🍕</Text>
        {isLoading && <ActivityIndicator size="small" color="white" />}
      </TouchableOpacity>
    </Link>
  );
};

export default function index() {
  const dispatch = useDispatch();
  const { refetch } = useGetMeQuery({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      setIsLoggedIn(token ? true : false);
      dispatch(setToken(token));
    };
    loadToken();
  }, [dispatch, isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        {isLoggedIn ? (
          <LogoutButton callback={() => setIsLoggedIn(false)} />
        ) : (
          <LoginButton
            callback={(value) => {
              setIsLoggedIn(value);
              refetch();
            }}
          />
        )}
      </View>
      <View style={styles.body}>
        <Text style={isLoggedIn ? styles.secondLine : styles.secondLineError}>
          You are currently{isLoggedIn ? "" : " not"} logged in.
        </Text>
        <OrderButton isLoggedIn={isLoggedIn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
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
  authContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
