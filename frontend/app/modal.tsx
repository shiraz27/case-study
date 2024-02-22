import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { View, Text } from "@/components/Themed";
import { useFetchOrderQuery } from "./Redux/apiSlice";
import { Image } from "expo-image";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.icon} />
      <Image
        style={{ width: 150, height: 80 }}
        contentFit="contain"
        source="https://gonina.com/wp-content/uploads/2023/11/Frame-33.svg"
      />
      <Link href="/" asChild>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            contentFit="contain"
            source={require("../assets/icons/circle-xmark.svg")}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const CountdownOrder = ({
  time,
  setRefetchIsReady,
}: {
  time: number;
  setRefetchIsReady: (value: number) => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(time);

  let hours = Math.floor(timeLeft / 3600);
  let minutes = Math.floor((timeLeft % 3600) / 60);
  let seconds = timeLeft % 60;

  useEffect(() => {
    if (timeLeft <= 0) {
      setRefetchIsReady(timeLeft);
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      hours = Math.floor(timeLeft / 3600);
      minutes = Math.floor((timeLeft % 3600) / 60);
      seconds = timeLeft % 60;
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(time);
  }, [time]);

  return (
    <>
      <Text style={styles.title}>Payment successful</Text>
      <Text style={styles.message}>Your pickup time starts in 1 minute</Text>
      <View style={styles.separator10} />
      <View>
        <Text style={styles.timer}>
          {`${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
        </Text>
      </View>
    </>
  );
};

const PaidOrder = () => {
  return (
    <View style={styles.paid}>
      <Text style={styles.timer}>
        🐧 Your order is confirmed, our driver is on the way!
      </Text>
      <View style={styles.separator10} />
      <Link href="/">
        <Text style={styles.message}>Go to home screen!</Text>
      </Link>
    </View>
  );
};

export default function ModalScreen() {
  const { orderId } = useLocalSearchParams();
  const { data, isLoading, refetch } = useFetchOrderQuery(orderId, {
    skip: !orderId,
  });
  const { width } = useWindowDimensions();
  const [isReady, setIsReady] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [waitTime, setWaitTime] = useState(2);
  const [isReloading, setIsReloading] = useState(false);

  const getOrder = async () => {
    try {
      setIsReloading(true);
      refetch().then((res) => {
        setIsPaid(res?.data?.status === "PAID");
        console.log(res?.data?.status);
        setIsReloading(false);
      });
    } catch (error) {
      console.log(error);
      setIsReloading(false);
    }
  };

  useEffect(() => {
    if (isReady) {
      getOrder();
    }
  }, [isReady]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Image
        style={{
          width: width * 0.45,
          height: width * 0.45,
          borderRadius: width * 0.45,
        }}
        contentFit="contain"
        source={require("../assets/icons/check-circle.svg")}
      />
      <View style={styles.separator20} />
      <View style={styles.separator10} />
      {isPaid && isReady ? (
        <PaidOrder />
      ) : (
        <CountdownOrder
          time={waitTime}
          setRefetchIsReady={(time) => setIsReady(time === 0)}
        />
      )}
      {isReady && !isPaid && !isLoading && !isReloading ? (
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => {
            setWaitTime(10);
            setIsReady(false);
            setIsPaid(false);
          }}
        >
          <Text style={styles.secondLineError}>
            Looks like your order is taking slower than usual, please press here
            to refresh your timer.
          </Text>
        </TouchableOpacity>
      ) : null}
      {isLoading ||
        (isLoading && <ActivityIndicator size="small" color="#0f71e9" />)}
      <Image
        style={styles.image}
        contentFit="contain"
        source="https://gonina.com/wp-content/uploads/2023/11/Group-15.svg"
        transition={1000}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  image: {
    width: 300,
    height: 250,
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    paddingTop: 0,
  },
  icon: { width: 30, height: 30 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f71e9",
  },
  separator20: {
    height: "10%",
  },
  separator10: {
    height: 10,
  },
  message: {
    fontSize: 14,
    color: "grey",
    fontWeight: "bold",
  },
  timer: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  paid: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 0,
  },
  secondLineError: {
    fontSize: 12,
    color: "red",
  },
});
