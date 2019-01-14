interface I2DCoord {
  x: number;
  y: number;
}

// tslint:disable-next-line:interface-name
interface Math {
  LinearRegression(coords: I2DCoord[]): {m: number, c: number};
  Sd(data: number[]): number;
}

Math.Sd = (data: number[]): number => {
  const mean = data.reduce((t, n) => t + n) / data.length;
  return Math.sqrt((data.reduce((t, n) => t + Math.pow(n - mean, 2), 0)) / (data.length - 1));
}

Math.LinearRegression = (coords: I2DCoord[]): {m: number, c: number} => {
  const xBar = coords.reduce((t, n) => t + n.x, 0) / coords.length;
  const yBar = coords.reduce((t, n) => t + n.y, 0) / coords.length;
  const xSd = Math.Sd(coords.map((coord) => coord.x));
  const ySd = Math.Sd(coords.map((coord) => coord.y));

  const r = calculatePearsonCorrelationCoefficient(coords, xBar, yBar);
  const m = calculateGradient(r, xSd, ySd);
  const c = yBar - (m * xBar);
  
  return {m, c};
}

const calculatePearsonCorrelationCoefficient = (coords: I2DCoord[], xBar: number, yBar: number): number => {
  const xMinusXBarSqrSum = coords.map((coord) => Math.pow(coord.x - xBar, 2)).reduce((t, n) => t + n, 0);
  const yMinusYBarSqrSum = coords.map((coord) => Math.pow(coord.y - yBar, 2)).reduce((t, n) => t + n, 0);
  
  const numerator = coords.map((coord) => (coord.x - xBar) * (coord.y - yBar)).reduce((t, n) => t + n, 0);
  const denominator = Math.sqrt(xMinusXBarSqrSum * yMinusYBarSqrSum);

  return numerator / denominator;
}

const calculateGradient = (r: number, xSd: number, ySd: number): number => {
  return r * (ySd / xSd);
}