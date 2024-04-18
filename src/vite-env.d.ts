/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Declare specific environment variables here, e.g.:
  readonly VITE_API_KEY: string;
  // More variables can be added as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
