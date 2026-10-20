fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_prost_build::configure()
        .build_client(true)
        .build_server(false)
        .build_transport(false)
        .compile_protos(&["proto/bridge.proto"], &["proto"])?;

    Ok(())
}
