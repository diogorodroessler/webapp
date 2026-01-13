// First Init project

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// My uses imports

import { useEffect, useState } from 'react'
import './App.css'

// Rust
import { initWasm, doubleArray } from "./wasmApi";
import init, {soma, search_for} from 'rust-wasm'

// C++
import initCxx from 'cpp-wasm'

// Python
import { doubleNumbers } from "./api/backend";

export function PyAppApi() {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    doubleNumbers([1, 2, 3, 4]).then(setData);
  }, []);

  return <div>{data.join(", ")}</div>;
}

/* C++ needed/optional, but this variable for better knownledge in the InitCpp_2 */
let cppModule:any;

// Init Cpp Async
async function initCppModule() {
  cppModule = await initCxx();
}

// Double Values Array in Rust - with file check: [wasmApi.ts]
export function AllocationRustI32() {
  const [data, setData] = useState<number[] | Int32Array>([]);
  const typed_data = [1, 2, 3, 4];
  const typed = new Int32Array(typed_data);

  useEffect(() => {
    initWasm().then(() => {
      setData(doubleArray(typed));
    });
  }, []);

  return <div>{data.join(", ")}</div>;
}

// Call C++ in WASM
export function CppSomaWASM() {
  const [result, setResult] = useState<number | undefined>(0);

  useEffect(() => {
    initCppModule().then(() => {
      const r = cppModule._soma(30,30);
      setResult(r);
    })
  }, []);
  return (
    <>
      <div> C++ SOMA - {result}</div>
    </>
  )
}

// Call Rust in WASM
export function RustSomaWASM() {
  const [result, setResult] = useState(0);
  const [err, setErr] = useState<string | undefined>();

  useEffect(() => {
    init().then(() => {
      const r = soma(50,50);
      setResult(r);
    })
    .catch(err => {
      setErr(String(err));
    });
  }, []);
  return (
    <>
      {err && <div> ERROR Fail </div>}
      <div> SOMA - {result}</div>
    </>
  )
}

// Call some Rust in WSAM
export function RustWASMSomaData() {
  const [val, setValue] = useState(0);
  const [resultado, setResultado] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    init()
      .then(() => {
        if (mounted) {
          const r = soma(10, 10);
          setResultado(r);
        }
      })
      .catch(err => {
        setErro(String(err));
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <button onClick={() => setValue(v => v + 1)}>
        Value {val}
      </button>

      {erro && <div>Erro: {erro}</div>}
      {resultado !== null && <div>Soma - {resultado}</div>}
    </>
  );
}

// Call Counter number with button [For Tests]
export function CountNumber() {
  const [count, setCounter] = useState(0)

  let card = null;
  let for_it = [];

  if (count > 0) {
    card = (
      <div className="card">
        <label title="ooooooh!!!">ooooooh!!!</label>
      </div>
    );
  }

  if (count > 0) {
    for (let i = 0; i < 5; i++) {
      for_it.push(
        <div className="card" key={i}>
          <img src="/1.jpg" alt="1" />
        </div>
      );
    }
  }

  return (
    <>
      <button onClick={() => setCounter((count) => count + 1)}>COUNTER - {count}</button>
      {card}
      {for_it}
    </>
  )
}

export function Toolbar() {

  const [value, setState] = useState(0);

  // For text area
  let search = [];
  let name: string = null;

  search.push(
    <input type='text' width='100' height='50' />
  );

  useEffect(() => {
    initWasm().then(() => {
      if ( Boolean.name.search(name) ) {}
      search_for(name);
    });
  }, []);

  return (
    <>
    {search}
    </>
  )
}

export function CountNumber2() {

  let img_push = [];

  for (let i = 0; i < 2; i++) {
    img_push.push(
      <div>
      <img src="/1.jpg" alt="1"/>
      </div>
    )
  }

  return (
    <>
    {img_push}
    </>
  )
}

// Main
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
