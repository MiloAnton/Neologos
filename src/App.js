import "./App.css";
import { useEffect, useState } from "react";
import data from "./data/data.js";
import Topbar from "./components/Topbar/Topbar.js";

function App() {
  const [wordToGuess, setWordToGuess] = useState("test");
  const [prefixMeaning, setPrefixMeaning] = useState("");
  const [rootMeaning, setRootMeaning] = useState("");
  const [suffixMeaning, setSuffixMeaning] = useState("");
  const [reveal, setReveal] = useState(false);
  const [hideWord, setHideWord] = useState(false);

  const createWord = () => {
    setHideWord(true);
    let word = "";
    setTimeout(() => {
      let prefix =
        data.elements.prefixes[
          Math.floor(Math.random() * data.elements.prefixes.length)
        ];
      let root =
        data.elements.roots[
          Math.floor(Math.random() * data.elements.roots.length)
        ];
      let suffix =
        data.elements.suffixes[
          Math.floor(Math.random() * data.elements.suffixes.length)
        ];
      word = prefix.element + root.element + suffix.element;
      setPrefixMeaning(
        "Préfixe : " +
          prefix.element +
          " (" +
          prefix.language +
          ") : " +
          prefix.meaning
      );
      setRootMeaning(
        "Racine : " +
          root.element +
          " (" +
          root.language +
          ") : " +
          root.meaning
      );
      setSuffixMeaning(
        "Suffixe : " +
          suffix.element +
          " (" +
          suffix.language +
          ") : " +
          suffix.meaning
      );
      setWordToGuess(word);
      setReveal(false);
      setHideWord(false);
    }, 300);
  };

  const revealSolution = () => {
    setReveal(true);
  };

  useEffect(() => {
    createWord();
  }, []);

  return (
    <div>
      <Topbar />
      <div className="main-content">
        <div className="consignes">
          <h3>
            Neologos est un jeu où vous devez deviner le sens d'un mot à partir
            de ses éléments constitutifs.
          </h3>
          <h4>Les éléments sont les suivants :</h4>
          <ul>
            <li>Préfixe : élément placé avant le radical</li>
            <li>Racine : élément central du mot</li>
            <li>Suffixe : élément placé après le radical</li>
          </ul>
          <h4>Les éléments sont tirés de deux langues : Grec et Latin</h4>
        </div>
        <div className="main-block">
          <b>
            <p className={`word-to-guess ${hideWord ? "hide" : ""}`}>
              {wordToGuess}
            </p>
          </b>
          <div className={`indices ${reveal ? "show" : ""}`}>
            {reveal ? (
              <>
                <p>{prefixMeaning}</p>
                <p>{rootMeaning}</p>
                <p>{suffixMeaning}</p>
              </>
            ) : (
              <p>Révélez les indices pour qu'ils apparaissent ici</p>
            )}
          </div>
        </div>
        <div className="buttons">
          <div className="button-solution" onClick={revealSolution}>
            Révéler les indices
          </div>
          <div className="button-word" onClick={createWord}>
            Nouveau mot
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
