fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("cargo:rerun-if-changed=proto/bridge.proto");

    tonic_prost_build::configure()
        .build_client(true)
        .build_server(false)
        .build_transport(false)
        .compile_protos(&["proto/bridge.proto"], &["proto"])?;

    Ok(())
}
