declare module "cpp-wasm" {
    export default funtion init(): Promise<{
        _soma(a: number, b: number): number;
    }>;
}
