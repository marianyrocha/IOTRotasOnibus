import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const TAGS_NOMES = {
  "23DAD79A": "Seringueiras",
  "A2E3E121": "Centro",
  "A2880E21": "Jardim dos Migrantes",
  "83CDE11B": "Capelasso",
  "53A5021C": "Bosque dos Ipês",
  "43043431": "Nova Brasília"
};

const ONIBUS_ATUAL = "Ônibus 03";

app.post("/api/leituras", async (req, res) => {
  const { tag } = req.body;

  if (!tag) {
    return res.status(400).json({ erro: "Campo 'tag' é obrigatório." });
  }
  try {
    const nomePonto = TAGS_NOMES[tag] || "Ponto não cadastrado";
    const sql = `
      INSERT INTO leituras (tag, nome, onibus, data_registro)
      VALUES (?, ?, ?, NOW())
    `;

    await db.query(sql, [tag, nomePonto, ONIBUS_ATUAL]);
    console.log(`[OK] Registro salvo → ${nomePonto} | ${ONIBUS_ATUAL}`);
    res.json({
      mensagem: "Leitura registrada!",
      registro: { ponto: nomePonto, onibus: ONIBUS_ATUAL }
    });

  } catch (error) {
    console.error("[ERRO] MySQL:", error);
    res.status(500).json({ erro: "Erro ao salvar no banco" });
  }
});

app.get("/api/leituras", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, tag, nome AS ponto, onibus, data_registro
      FROM leituras
      ORDER BY data_registro DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("[ERRO SELECT]", error);
    res.status(500).json({ erro: "Erro ao buscar registros" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("API rodando em http://10.139.38.181:3000/api/leituras");
});
