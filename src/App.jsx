import  { useState, useEffect } from "react";

const App = () => {
  const initialText =
    "The journey of self-improvement begins with a single step, often taken with hesitation but filled with determination. Each day offers a fresh opportunity to learn, grow, and overcome challenges that once seemed insurmountable. Success is not defined by perfection but by consistent effort and resilience. Small actions, repeated over time, lead to significant results. Whether you're learning a new skill, building a habit, or pursuing a long-term goal, the key lies in persistence. Mistakes are not failures but lessons that guide you toward better decisions and outcomes. Embracing challenges with a positive mindset transforms obstacles into opportunities for growth. Surrounding yourself with supportive people, staying focused, and maintaining a clear vision of your goals are essential ingredients for success. Remember, the path may not always be smooth, but each step forward, no matter how small, brings you closer to your dreams.";
  const [text, setText] = useState(initialText);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, timeLeft]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!isRunning) setIsRunning(true);

    // Calculate stats
    const correctChars = value
      .split("")
      .filter((char, index) => char === text[index]).length;
    const wordsTyped = value.length / 5; // Assuming 5 characters = 1 word
    const calculatedWpm = Math.round((wordsTyped / (60 - timeLeft)) * 60);
    const calculatedAccuracy = Math.round((correctChars / value.length) * 100);

    setWpm(isNaN(calculatedWpm) ? 0 : calculatedWpm);
    setAccuracy(isNaN(calculatedAccuracy) ? 100 : calculatedAccuracy);
  };

  const restartTest = () => {
    setInput("");
    setTimeLeft(60);
    setIsRunning(false);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", textAlign: "center" }}>
      <h1>Typing Speed Test</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <p className="text">{text}</p>
      </div>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        style={{ width: "100%", height: "100px" }}
        disabled={timeLeft === 0}
        className="typing"
      />
      <div style={{ marginTop: "20px" }} className="stats">
        <p>Time Left: {timeLeft}s</p>
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
      <button className="btn" onClick={restartTest} style={{ marginTop: "10px" }}>
        Restart
      </button>
    </div>
  );
};

export default App;
