export function getEnvVar(v: string): string {
  const ret = process.env[v];
  if (typeof ret === 'undefined') {
      throw new Error("process.env." + v + " is undefined!");
  }
  return ret;
}


