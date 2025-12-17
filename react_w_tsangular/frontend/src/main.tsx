import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { AllocationRustI32, CppSomaWASM, RustSomaWASM, RustWASMSomaData, PyAppApi } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <CountNumber /> */}
    {/* <RustWASMSomaData /> */}
    {/* <RustSomaWASM /> */}
    {/* <CppSomaWASM /> */}
    {/* <AllocationRustI32 /> */}
    <PyAppApi />
  </StrictMode>,
)
