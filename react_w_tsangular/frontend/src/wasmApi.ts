import init, { double_array } from "rust-wasm";

let ready = false;

export async function initWasm() {
  if (!ready) {
    await init();
    ready = true;
  }
}

export function doubleArray(data: Int32Array) {
  if (!ready) {
    throw new Error("Wasm not initialized");
  }

  return double_array(data);
}
