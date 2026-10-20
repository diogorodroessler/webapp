
import {
  double_array,
  get_string_for_url as rustGetStringForUrl,
  send_message as rustSendMessage,
} from "../rust-wasm-pkg/rust_wasm";

export async function initWasm(): Promise<void> {
  // Sem inicialização default: o módulo gerado não exporta default.
}

export async function send_message(text: string): Promise<string>
{
  return send_message(text);
}

export function getStringForUrl(message: string): string {
  return rustGetStringForUrl(message);
}

export function doubleArray(data: Int32Array): Int32Array {
  return double_array(data);
}
