// FalaComigo — camada Rust (Tauri 2)
//
// Por enquanto a aplicação é um wrapper desktop em torno do frontend React.
// Comandos invocáveis pelo frontend serão adicionados aqui (ex.: persistência
// SQLite, exportação PDF, TTS nativo de fallback) à medida que avançarmos.

#[tauri::command]
fn app_version() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![app_version])
        .run(tauri::generate_context!())
        .expect("error while running FalaComigo");
}
