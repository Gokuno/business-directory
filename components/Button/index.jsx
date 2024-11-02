import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export function Button({
    title,
    isLoading = false,
    icon,
    ...rest
}) {
    return (
        <TouchableOpacity style={styles.container} disabled={isLoading} activeOpacity={0.8} {...rest}>
            {isLoading ? (
                <ActivityIndicator color="white" />
            ) : (
                <>
                    <Ionicons name={icon} style={styles.icon} />
                    <Text style={styles.title}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: Colors.light.tint,
        padding: 16,
        borderRadius: 99,
        marginTop: 20
    },
    icon: {
        color: "#fff",
        fontSize: 18
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "tinos-bold"
    }
});