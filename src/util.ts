import util from 'util';

export function log(item: any) {
  console.log(util.inspect(item, {showHidden: false, depth: null}))
}

export function randomWeighted(weights: number[]): number {
  const sanitizedWeights = weights.map(sanitizeWeight);
  const weightSum = sanitizedWeights.reduce((acc, w) => acc + w, 0);
  if(weightSum === 0) {
    throw new Error('Weight sum is equal zero');
  }
  let n = Math.random() * weightSum;
  let selected = null;
  for(let i = 0; i < sanitizedWeights.length && n > 0; i++) {
    if(sanitizedWeights[i] <= 0)
      continue;
    n -= sanitizedWeights[i];
    selected = i;
  }
  return selected;
}

function sanitizeWeight(weight: unknown): number {
  // or any other validation/sanitization logic, like treating invalid value as 0
  if(weight === '') {
    throw new Error(`Weight must be numeric, got ${weight}`);
  }
  const n = Number(weight);
  if(!Number.isFinite(n) || n < 0) {
    throw new Error(`Weight must be finite positive, got ${weight}`);
  }
  return n;
}