import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

interface DownloadConfig {
  audio_quality: string;
  subtitles: boolean;
  subtitle_lang: string;
  title_format: string;
  output_path: string;
  rate_limit: string;
  sleep_interval: number;
  // Nuevas opciones avanzadas
  cookies_browser: string;
  sponsorblock: boolean;
  extract_audio: boolean;
  audio_format: string;
  geo_bypass: boolean;
  max_filesize: string;
  embed_metadata: boolean;
  embed_thumbnail: boolean;
  all_subtitles: boolean;
  playlist_items: string;
  use_python: boolean;
}

interface VideoDownload {
  url: string;
  status: 'pending' | 'downloading' | 'completed' | 'error';
  message: string;
}


function App() {
  const [urls, setUrls] = useState<string>("");
  const [config, setConfig] = useState<DownloadConfig>({
    audio_quality: "0",
    subtitles: false,
    subtitle_lang: "es",
    title_format: "date-original",
    output_path: "",
    rate_limit: "5M", // Cambiado: antes "unlimited", ahora 5MB/s por defecto
    sleep_interval: 3, // Cambiado: antes 0, ahora 3 segundos por defecto
    cookies_browser: "none",
    sponsorblock: false,
    extract_audio: false,
    audio_format: "mp3",
    geo_bypass: false,
    max_filesize: "unlimited",
    embed_metadata: false,
    embed_thumbnail: false,
    all_subtitles: false,
    playlist_items: "single",
    use_python: false,
  });
  const [downloads, setDownloads] = useState<VideoDownload[]>([]);
  const [ytdlpInstalled, setYtdlpInstalled] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    checkYtdlp();
  }, []);

  async function checkYtdlp() {
    try {
      const installed = await invoke<boolean>("check_ytdlp");
      setYtdlpInstalled(installed);
    } catch (error) {
      console.error("Error checking yt-dlp:", error);
      setYtdlpInstalled(false);
    }
  }

  async function selectFolder() {
    try {
      const folder = await invoke<string>("select_folder");
      setConfig({ ...config, output_path: folder });
    } catch (error) {
      console.error("Error selecting folder:", error);
    }
  }

  async function startDownloads() {
    if (!config.output_path) {
      alert("Por favor, selecciona una carpeta de descarga");
      return;
    }

    const urlList = urls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    if (urlList.length === 0) {
      alert("Por favor, ingresa al menos una URL");
      return;
    }

    setIsDownloading(true);
    const newDownloads: VideoDownload[] = urlList.map(url => ({
      url,
      status: 'pending',
      message: 'En cola...',
    }));
    setDownloads(newDownloads);

    for (let i = 0; i < urlList.length; i++) {
      const url = urlList[i];
      
      // Añadir pausa antes de cada descarga (excepto la primera)
      if (i > 0 && config.sleep_interval > 0) {
        setDownloads(prev => prev.map((d, idx) => 
          idx === i ? { 
            ...d, 
            status: 'pending', 
            message: `Esperando ${config.sleep_interval} segundos antes de descargar...` 
          } : d
        ));
        
        await new Promise(resolve => setTimeout(resolve, config.sleep_interval * 1000));
      }
      
      setDownloads(prev => prev.map((d, idx) => 
        idx === i ? { ...d, status: 'downloading', message: 'Descargando...' } : d
      ));

      try {
        const result = await invoke<string>("download_video", { url, config });
        setDownloads(prev => prev.map((d, idx) => 
          idx === i ? { ...d, status: 'completed', message: result } : d
        ));
      } catch (error) {
        setDownloads(prev => prev.map((d, idx) => 
          idx === i ? { ...d, status: 'error', message: String(error) } : d
        ));
      }
    }

    setIsDownloading(false);
  }

  if (!ytdlpInstalled) {
    return (
      <main className="container">
        <div className="error-container">
          <h1>yt-dlp no está instalado</h1>
          <p>Por favor, instala yt-dlp para usar esta aplicación:</p>
          
          <div style={{ marginTop: '15px', textAlign: 'left' }}>
            <strong>Windows:</strong>
            <code>pip install yt-dlp</code>
            <p style={{ fontSize: '0.85em', color: '#888' }}>
              o descarga desde: <a href="https://github.com/yt-dlp/yt-dlp/releases" target="_blank" style={{ color: '#4a9eff' }}>
                GitHub Releases
              </a>
            </p>
          </div>
          
          <div style={{ marginTop: '15px', textAlign: 'left' }}>
            <strong>Linux/Ubuntu:</strong>
            <code>sudo apt install yt-dlp</code>
            <p style={{ fontSize: '0.85em', color: '#888' }}>o</p>
            <code>pip install yt-dlp</code>
          </div>
          
          <div style={{ marginTop: '15px', textAlign: 'left' }}>
            <strong>macOS:</strong>
            <code>brew install yt-dlp</code>
            <p style={{ fontSize: '0.85em', color: '#888' }}>o</p>
            <code>pip install yt-dlp</code>
          </div>
          
          <button onClick={checkYtdlp} style={{ marginTop: '20px' }}>
            Verificar de nuevo
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>YouTube Downloader</h1>
      
      {/* Barra de configuración */}
      <div className="config-bar">
        <div className="config-section">
          <label>
            Calidad de Audio:
            <select 
              value={config.audio_quality} 
              onChange={(e) => setConfig({ ...config, audio_quality: e.target.value })}
            >
              <option value="0">Máxima Calidad</option>
              <option value="1">Alta Calidad</option>
              <option value="2">Calidad Media</option>
              <option value="5">Calidad Baja (menor tamaño)</option>
            </select>
          </label>
        </div>

        <div className="config-section">
          <label>
            <input
              type="checkbox"
              checked={config.subtitles}
              onChange={(e) => setConfig({ ...config, subtitles: e.target.checked })}
            />
            Subtítulos
          </label>
          {config.subtitles && (
            <select 
              value={config.subtitle_lang}
              onChange={(e) => setConfig({ ...config, subtitle_lang: e.target.value })}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          )}
        </div>

        <div className="config-section">
          <label>
            Formato de Título:
            <select 
              value={config.title_format}
              onChange={(e) => setConfig({ ...config, title_format: e.target.value })}
            >
              <option value="date-original">Fecha - Nombre Original</option>
              <option value="original">Nombre Original</option>
            </select>
          </label>
        </div>

        <div className="config-section">
          <label>
            Límite de Velocidad:
            <select 
              value={config.rate_limit}
              onChange={(e) => setConfig({ ...config, rate_limit: e.target.value })}
            >
              <option value="unlimited">Sin límite</option>
              <option value="5M">5 MB/s (recomendado)</option>
              <option value="2M">2 MB/s</option>
              <option value="1M">1 MB/s</option>
              <option value="500K">500 KB/s</option>
            </select>
          </label>
        </div>

        <div className="config-section">
          <label>
            Pausa entre descargas:
            <select 
              value={config.sleep_interval}
              onChange={(e) => setConfig({ ...config, sleep_interval: parseInt(e.target.value) })}
            >
              <option value="0">Sin pausa</option>
              <option value="3">3 segundos (recomendado)</option>
              <option value="5">5 segundos</option>
              <option value="10">10 segundos</option>
              <option value="30">30 segundos</option>
            </select>
          </label>
        </div>

        <div className="config-section">
          <button onClick={selectFolder} className="folder-button">
            {config.output_path || "Seleccionar Carpeta de Descarga"}
          </button>
        </div>
      </div>

      {/* Área de URLs */}
      <div className="url-section">
        <label>
          <strong>URLs de Videos (una por línea):</strong>
        </label>
        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          rows={10}
          disabled={isDownloading}
        />
      </div>

      {/* Botón de descarga */}
      <button 
        onClick={startDownloads} 
        disabled={isDownloading}
        className="download-button"
      >
        {isDownloading ? "Descargando..." : "Iniciar Descargas"}
      </button>

      {/* Lista de descargas */}
      {downloads.length > 0 && (
        <div className="downloads-list">
          <h2>Descargas:</h2>
          {downloads.map((download, idx) => (
            <div key={idx} className={`download-item ${download.status}`}>
              <div className="download-url">{download.url}</div>
              <div className="download-status">
                {download.status === 'pending' && 'En cola'}
                {download.status === 'downloading' && 'Descargando...'}
                {download.status === 'completed' && 'Completado'}
                {download.status === 'error' && 'Error'}
              </div>
              <div className="download-message">{download.message}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
