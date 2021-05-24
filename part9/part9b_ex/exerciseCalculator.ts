interface MultiInput {
  aim: number;
  fact: Array<number>;
}

interface Result {
  periodLength: number; //天数
  trainingDays: number; //训练日数
  target: number; //原始目标值
  average: number; //计算出的平均时间
  success: boolean; //布尔值，描述是否达到目标
  rating: number; //一个数字1-3之间的等级，区分满足小时数的程度。
  ratingDescription: string; //解释评级的文字值
}

const parseArguments2 = (args: Array<string>): MultiInput => {
  if (args.length < 4) throw new Error("Not enough arguments");
  //if (args.length > 4) throw new Error("Too many arguments");

  if (isNaN(Number(args[2]))) {
    throw new Error("Provided values were not numbers!");
  }

  const aim = Number(args[2]);
  const fact: Array<number> = [];
  for (let i = 3; i < args.length; i++) {
    let vi = Number(args[i]);
    if (!isNaN(vi)) {
      fact.push(vi);
    }
  }
  return {
    aim: aim,
    fact: fact,
  };
};

const calculateExercises = (aim: number, fact: Array<number>): Result => {
  const periodLength = fact.length;
  const trainingDays = fact.filter(x => x > 0).length;
  const average = fact.reduce((x, y) => x + y, 0) / periodLength;
  const success = average >= aim;
  let rating, ratingDescription;
  if (average > aim) {
    rating = 3;
    ratingDescription = "well done!";
  } else if (average > aim - 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better!";
  } else {
    rating = 1;
    ratingDescription = "too bad!";
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    target: aim,
    average: average,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
  };
};

try {
  const { aim, fact } = parseArguments2(process.argv);
  console.log(calculateExercises(aim, fact));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}

export { calculateExercises };
