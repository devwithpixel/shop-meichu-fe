export function splitText(text: string, n: number = 1): [string, string] {
  const words = text.split(" ");
  const first = words.slice(0, n).join(" ");
  const rest = words.slice(n).join(" ");
  return [first, rest];
}
