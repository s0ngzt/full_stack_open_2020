import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/Hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.send({
      error: "malformatted parameters",
    });
  } else {
    const bmiDescription = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height,
      bmi: bmiDescription,
    });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  res.send(calculateExercises(target, daily_exercises));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
