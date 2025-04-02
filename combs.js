const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

function findCombinations(sumValue, length, includeDigits, excludeDigits) {
  function backtrack(start, path, target) {
    if (path.length === length) {
      if (target === 0) {
        results.push([...path]);
      }
      return;
    }

    for (let i = start; i <= 9; i++) {
      if (i > target) break;
      path.push(i);
      backtrack(i + 1, path, target - i);
      path.pop();
    }
  }

  let results = [];
  backtrack(1, [], sumValue);

  return results.filter(comb => 
    includeDigits.every(digit => comb.includes(digit)) &&
    excludeDigits.every(digit => !comb.includes(digit))
  );
}

app.post("/findCombinations", (req, res) => {
  const { sumValue, length, includeDigits, excludeDigits } = req.body;
  const result = findCombinations(sumValue, length, includeDigits, excludeDigits);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
