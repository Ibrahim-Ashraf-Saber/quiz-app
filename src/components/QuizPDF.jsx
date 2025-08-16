import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  scoreBox: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#e0e7ff",
    borderRadius: 10,
    textAlign: "center",
  },
  scoreText: { fontSize: 16, color: "#4f46e5", fontWeight: "bold" },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#9ca3af",
    padding: 5,
    backgroundColor: "#f3f4f6",
    fontWeight: "bold",
  },
  tableCol: {
    width: "33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 5,
  },
  correct: { color: "#16a34a", fontWeight: "bold" },
  wrong: { color: "#dc2626", fontWeight: "bold" },
  footer: {
    marginTop: 20,
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },
});

export default function QuizPDF({
  saveAnswer,
  numQ,
  level,
  points,
  maxPoints,
  timeSec,
}) {
  const p = Math.floor((points / maxPoints) * 100);
  const maxSec = numQ * 30;
  const sec = maxSec - timeSec;
  const m = Math.floor(sec / 60);
  const s = sec % 60;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Quiz Summary</Text>
          <Text>Level: {level}</Text>
          <Text>
            Time Taken: {m < 10 && 0}
            {m}:{s < 10 && 0}
            {s}
          </Text>
          <Text>Total Questions: {numQ}</Text>
        </View>

        <View style={styles.scoreBox}>
          <Text style={{ fontSize: 16 }}>Final Score</Text>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#4f46e5" }}>
            {p}%
          </Text>
          <Text style={styles.scoreText}>
            {points} / {maxPoints}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Questions and Answers</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Question</Text>
              <Text style={styles.tableColHeader}>Your Answer</Text>
              <Text style={styles.tableColHeader}>Result</Text>
            </View>
            {saveAnswer.map((q, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text style={styles.tableCol}>{q.question}</Text>
                <Text style={styles.tableCol}>{q.myAnswer}</Text>
                <Text
                  style={[
                    styles.tableCol,
                    q.answer === q.myAnswer ? styles.correct : styles.wrong,
                  ]}
                >
                  {q.answer === q.myAnswer ? "Correct" : "Wrong"}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>
          Generated on: {new Date().toLocaleDateString()} | Made by Ibrahim
          Ashraf
        </Text>
      </Page>
    </Document>
  );
}
