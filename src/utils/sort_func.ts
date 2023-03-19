export function compareStrings(a: string, b: string): number {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export function compareStringsIgnoreCase(a: string, b: string): number {
  return compareStrings(a.toLowerCase(), b.toLowerCase())
}

export function compareStringsFirstIgnoringCase(a: string, b: string): number {
  const diff = compareStringsIgnoreCase(a, b)
  if (diff !== 0) {
    return diff
  }
  return compareStrings(a, b)
}

