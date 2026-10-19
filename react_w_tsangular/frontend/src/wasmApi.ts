
import {
  double_array,
  get_string_for_url as rustGetStringForUrl,
} from "../rust-wasm-pkg/rust_wasm";

export async function initWasm(): Promise<void> {
  // Sem inicialização default: o módulo gerado não exporta default.
}

export function getStringForUrl(message: string): string {
  return rustGetStringForUrl(message);
}

export function doubleArray(data: Int32Array): Int32Array {
  return double_array(data);
}
