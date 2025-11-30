import { View, Text, StyleSheet } from "react-native";

export default function Passagens({ pontoNome, onibus, horario }) {
  return (
    <View style={styles.card}>
      <Text style={styles.texto}>
        {onibus} → {pontoNome} às {horario}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EAF1FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  texto: {
    fontSize: 16,
    color: "#003C96",
  },
});
