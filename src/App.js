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
  const [splitWord, setSplitWord] = useState(false);
  const [splitWordPrefix, setSplitWordPrefix] = useState("");
  const [splitWordRoot, setSplitWordRoot] = useState("");
  const [splitWordSuffix, setSplitWordSuffix] = useState("");

  const createWord = () => {
    setHideWord(true);
    setSplitWordPrefix("");
    setSplitWordRoot("");
    setSplitWordSuffix("");
    setSplitWord(false);
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
      setSplitWordPrefix(prefix.element);
      setRootMeaning(
        "Racine : " +
          root.element +
          " (" +
          root.language +
          ") : " +
          root.meaning
      );
      setSplitWordRoot(root.element);
      setSuffixMeaning(
        "Suffixe : " +
          suffix.element +
          " (" +
          suffix.language +
          ") : " +
          suffix.meaning
      );
      setSplitWordSuffix(suffix.element);
      setWordToGuess(word);
      setReveal(false);
      setHideWord(false);
    }, 300);
  };

  const revealSolution = () => {
    setReveal(true);
  };

  const splitWordWithColors = () => {
    setSplitWord(!splitWord);
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
              {splitWord ? (
                <>
                  <span className="prefix">{splitWordPrefix}</span>
                  <span className="root">{splitWordRoot}</span>
                  <span className="suffix">{splitWordSuffix}</span>
                </>
              ) : (
                wordToGuess
              )}
            </p>
          </b>
          <div className={`indices ${reveal ? "show" : ""}`}>
            {reveal ? (
              <>
                <p className="prefix">{prefixMeaning}</p>
                <p className="root">{rootMeaning}</p>
                <p className="suffix">{suffixMeaning}</p>
              </>
            ) : (
              <p>Révélez les indices pour qu'ils apparaissent ici</p>
            )}
          </div>
        </div>
        <div className="buttons">
          <div className="button-separation" onClick={splitWordWithColors}>
            {splitWord ? "Recomposer le mot" : "Décomposer le mot"}
          </div>
          <div
            className={reveal ? "button-solution-disabled" : "button-solution"}
            onClick={revealSolution}
          >
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
