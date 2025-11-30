import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Passagem from "./components/Passagens";

export default function App() {
  const [leituras, setLeituras] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const API_URL = "http://10.139.38.181:3000/api/leituras";

  const carregarLeituras = async () => {
    try {
      const response = await axios.get(API_URL);
      setLeituras(response.data);
    } catch (error) {
      console.log("Erro ao carregar:", error);
    }
  };

  useEffect(() => {
    carregarLeituras();
    const interval = setInterval(carregarLeituras, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Rotas Ônibus</Text>

      <FlatList
        data={leituras}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={carregarLeituras} />
        }
        renderItem={({ item }) => (
          <Passagem
            pontoNome={item.ponto}    
            onibus={item.onibus}
            horario={new Date(item.data_registro).toLocaleTimeString("pt-BR")}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 30 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
});
