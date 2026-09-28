import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Home.module.css";

const topics = ["Music","Sports","History","Science"];
const difficulties = ["easy", "medium", "hard"];

export default function Home(){
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz App</h1>
      <p className={styles.subtitle}>
        {selectedTopic ? "Choose difficulty" : "Choose a topic"}
      </p>

      <div className={selectedTopic ? styles.row : styles.grid}>
        {!selectedTopic
          ? topics.map((topic) => (
              <button key={topic} className={styles.button} onClick={() => setSelectedTopic(topic)}>
                {topic}
              </button>
            ))
          : difficulties.map((diff) => (
              <button
                key={diff}
                className={styles.button}
                onClick={() => navigate(`/quiz/${selectedTopic}/${diff}`)}
              >
                {diff}
              </button>
            ))}
      </div>
    </div>
  );
}
