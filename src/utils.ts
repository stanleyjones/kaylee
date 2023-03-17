export function fromHex(hex: string): Uint8Array {
  return Uint8Array.from(
    hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
}

export function toHex(array: Uint8Array): string {
  return array.reduce(
    (hex: string, byte: number) => hex + byte.toString(16).padStart(2, "0"),
    ""
  );
}
