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
  const [definition, setDefinition] = useState("");
  const [showDefinition, setShowDefinition] = useState(false);
  
  const lastGeneratedWords = [];
  const maxStoredWords = 30;

  const adjustWord = (prefix, root, suffix) => {
    let newRoot = root.element;
    let newSuffix = suffix.element;

    if (prefix.element.slice(-1) === root.element[0]) {
      newRoot = root.element.substring(1);
    }

    if (newRoot.slice(-1) === suffix.element[0]) {
      newSuffix = suffix.element.substring(1);
    }

    return { newRoot, newSuffix };
  };

  const createWord = () => {
    setHideWord(true);
    setSplitWordPrefix("");
    setSplitWordRoot("");
    setSplitWordSuffix("");
    setSplitWord(false);
    setShowDefinition(false);

    let word = "";
    let prefix, root, suffix, adjusted;

    do {
      prefix =
        data.elements.prefixes[
          Math.floor(Math.random() * data.elements.prefixes.length)
        ];
      root =
        data.elements.roots[
          Math.floor(Math.random() * data.elements.roots.length)
        ];
      suffix =
        data.elements.suffixes[
          Math.floor(Math.random() * data.elements.suffixes.length)
        ];
      
      adjusted = adjustWord(prefix, root, suffix);
      word = prefix.element + adjusted.newRoot + adjusted.newSuffix;
    } while (lastGeneratedWords.includes(word)); // Éviter les répétitions immédiates

    lastGeneratedWords.push(word);
    if (lastGeneratedWords.length > maxStoredWords) {
      lastGeneratedWords.shift(); 
    }

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
    setSplitWordRoot(adjusted.newRoot);
    setSuffixMeaning(
      "Suffixe : " +
        suffix.element +
        " (" +
        suffix.language +
        ") : " +
        suffix.meaning
    );
    setSplitWordSuffix(adjusted.newSuffix);
    setWordToGuess(word);
    setReveal(false);
    setHideWord(false);
  };

  const revealSolution = () => {
    setReveal(true);
  };

  const splitWordWithColors = () => {
    setSplitWord(!splitWord);
  };

  const generateRandomDefinition = (prefix, root, suffix) => {
    let definition = "";
  
    if (prefix.meaning.includes("absence") || prefix.meaning.includes("sans")) {
      definition += `Absence de ${root.meaning}`;
    } else if (prefix.meaning.includes("grand") || prefix.meaning.includes("petit")) {
      definition += `Se dit de quelque chose de ${prefix.meaning} ayant trait à ${root.meaning}`;
    } else if (prefix.meaning.includes("plusieurs") || prefix.meaning.includes("nombreux")) {
      definition += `Qui comporte ${prefix.meaning} ${root.meaning}s`;
    } else if (prefix.meaning.includes("avant") || prefix.meaning.includes("avant")) {
      definition += `Qui précède ou se situe ${prefix.meaning} ${root.meaning}`;
    } else if (prefix.meaning.includes("contre") || prefix.meaning.includes("opposition")) {
      definition += `Qui est en opposition avec ${root.meaning}`;
    } else if (prefix.meaning.includes("à travers") || prefix.meaning.includes("au-delà")) {
      definition += `Qui traverse ou va ${prefix.meaning} ${root.meaning}`;
    } else if (prefix.meaning.includes("absence") || prefix.meaning.includes("sans")) {
      definition += `Caractérisé par l'absence de ${root.meaning}`;
    } else if (prefix.meaning.includes("en dessous") || prefix.meaning.includes("sous")) {
      definition += `Situé ${prefix.meaning} ${root.meaning}`;
    } else {
      definition += `Relatif à ${prefix.meaning} en lien avec ${root.meaning}`;
    }
  
    if (root.meaning.includes("voir") || root.meaning.includes("sentir") || root.meaning.includes("porter") || root.meaning.includes("faire") || root.meaning.includes("écrire")) {
      definition += `, impliquant l'action de ${root.meaning}`;
    } else if (root.meaning.includes("étoile") || root.meaning.includes("terre") || root.meaning.includes("vie")) {
      definition += `, lié au concept de ${root.meaning}`;
    }
  
    if (suffix.meaning.includes("qui aime")) {
      definition += `, indiquant une affection ou une attirance particulière (${suffix.meaning}).`;
    } else if (suffix.meaning.includes("étude")) {
      definition += `, constituant un domaine d'étude nommé ${prefix.element}${root.element}${suffix.element}.`;
    } else if (suffix.meaning.includes("souffrance") || suffix.meaning.includes("maladie") || suffix.meaning.includes("douleur")) {
      definition += `, caractérisé par une pathologie ou une douleur nommée ${prefix.element}${root.element}${suffix.element}.`;
    } else if (suffix.meaning.includes("capable de")) {
      definition += `, ayant la capacité d'être ${suffix.meaning}.`;
    } else if (suffix.meaning.includes("qui mange")) {
      definition += `, caractérisé par le fait de manger ${root.meaning}.`;
    } else if (suffix.meaning.includes("observation")) {
      definition += `, correspondant à une technique d'observation ou d'examen.`;
    } else if (suffix.meaning.includes("qui aime")) {
      definition += `, désignant un amour ou une attirance envers ${root.meaning}.`;
    } else if (suffix.meaning.includes("divination")) {
      definition += `, relatif à une méthode de divination basée sur ${root.meaning}.`;
    } else if (suffix.meaning.includes("ablation")) {
      definition += `, indiquant l'ablation ou la suppression chirurgicale de ${root.meaning}.`;
    } else if (suffix.meaning.includes("capable de")) {
      definition += `, signifiant la capacité ou l'aptitude à être ${root.meaning}.`;
    } else if (suffix.meaning.includes("état, qualité")) {
      definition += `, correspondant à l'état ou la qualité de ${root.meaning}.`;
    } else if (suffix.meaning.includes("qui craint")) {
      definition += `, caractérisé par une crainte irrationnelle envers ${root.meaning}.`;
    } else if (suffix.meaning.includes("qui aime")) {
      definition += `, décrivant une affection ou passion particulière pour ${root.meaning}.`;
    } else {
      definition += `, associé à l'idée de ${suffix.meaning}.`;
    }
    return definition;
  };  

const extractMeaning = (str) => str.substring(str.lastIndexOf(":") + 1).trim();

const handleGenerateDefinition = () => {
  const definition = generateRandomDefinition(
    { element: splitWordPrefix, meaning: extractMeaning(prefixMeaning) },
    { element: splitWordRoot, meaning: extractMeaning(rootMeaning) },
    { element: splitWordSuffix, meaning: extractMeaning(suffixMeaning) }
  );
  setDefinition(definition); 
  setShowDefinition(true);
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
          <div className={`definition`}>
            {showDefinition ? (
              <p><span style={{ fontWeight: "bold" }}>Définition</span> : {definition}</p>
            ) : (
              <p>Cliquez sur "Tenter une définition" pour obtenir une définition du mot</p>
            )}
          </div>
        <div className="buttons">
          <div className="button-separation" onClick={splitWordWithColors}>
            1️⃣ {splitWord ? "Recomposer le mot" : "Décomposer le mot"}
          </div>
          <div
            className={reveal ? "button-solution-disabled" : "button-solution"}
            onClick={revealSolution}
          >
            2️⃣ Révéler les indices
          </div>
          <div className="button-definition"onClick={handleGenerateDefinition}>
            3️⃣ Tenter une définition
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
