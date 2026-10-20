// pub fn add(left: u64, right: u64) -> u64 {
//     left + right
// }
//
// #[cfg(test)]
// mod tests {
//     use super::*;
//
//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
// }

use std::{mem, path::Path};
use wasm_bindgen::prelude::*; // Allocation for WASM

use tonic::Request;
use tonic_web_wasm_client::Client;
use wasm_bindgen::prelude::*;

pub mod bridge {
    tonic::include_proto!("bridge");
}

use bridge::{Message, bridge_client::BridgeClient};

#[wasm_bindgen]
pub async fn send_message(text: String) -> Result<String, JsValue> {
    let transport = Client::new("http://localhost:8080".to_string());

    let mut client = BridgeClient::new(transport);

    let request = Message { text, sequence: 1 };

    let response = client
        .exchange(Request::new(request))
        .await
        .map_err(|error| JsValue::from_str(&error.to_string()))?;

    let message = response.into_inner();

    Ok(message.text)
}

#[wasm_bindgen]
pub fn soma(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn get_string_for_url(message: String) -> String {
    println!("R: {:?}", message);
    message
}

/* ALLOCATION FOR WASM */

#[wasm_bindgen]
pub fn alloc_i32(len: usize) -> *mut i32 {
    let mut v = Vec::<i32>::with_capacity(len);
    let ptr = v.as_mut_ptr();
    mem::forget(v);
    ptr
}

#[wasm_bindgen]
pub fn free_i32(ptr: *mut i32, len: usize) {
    unsafe {
        let _ = Vec::from_raw_parts(ptr, len, len);
    }
}

#[wasm_bindgen]
pub fn double_array(input: Vec<i32>) -> Vec<i32> {
    input.into_iter().map(|v| v * 2).collect()
}

#[wasm_bindgen]
pub fn search_for(search: &str) {
    let mut push_from = Vec::new();
    let s = Path::new(search).to_str().unwrap();
    if s.starts_with(search.to_string().as_str()) {
        push_from.push(s);
    }
}
