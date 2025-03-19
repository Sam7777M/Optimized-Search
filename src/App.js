import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      setResults(cache[input]);
      return;
    }
    console.log("API CALLED", input, cache[input]);
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await data.json();
    setResults(json.recipes);
    setCache((prev) => ({ ...prev, [input]: json.recipes }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="App">
      <h1>Auto Complete</h1>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResult(true)}
          onBlur={() => setShowResult(false)}
        />
        {showResult && (
          <div className="results-container">
            {results.map((result) => (
              <span key={result.id} className="result">
                {result.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
