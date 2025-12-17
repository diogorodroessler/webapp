#include <emscripten/emscripten.h>

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int soma(int a, int b) {
        return a + b;
    }
}
