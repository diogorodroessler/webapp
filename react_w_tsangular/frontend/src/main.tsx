import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, {
  //AllocationRustI32,
  //CppSomaWASM,
  //RustSomaWASM,
  //RustWASMSomaData,
  //PyAppApi,
  //CountNumber2
  // ToolbarSearchTextArea,

} from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <CountNumber2 /> */}
    {/* <RustWASMSomaData /> */}
    {/* <RustSomaWASM /> */}
    {/* <CppSomaWASM /> */}
    {/* <AllocationRustI32 /> */}
    {/* <PyAppApi /> */}
    {/* <ToolbarSearchTextArea /> */}
  </StrictMode>,
)
