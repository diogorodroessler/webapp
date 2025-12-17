emcc soma.cpp \
  -O3 \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s ENVIRONMENT=web \
  -s EXPORTED_FUNCTIONS='["_soma"]' \
  -s EXPORTED_RUNTIME_METHODS='[]' \
  -o cpp_wasm.js
