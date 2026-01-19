import { useState, useEffect } from "react";
import { downloadDir, join } from "@tauri-apps/api/path";
import { Clapperboard, Music, Mic, Clock, Download, CheckCircle, AlertCircle } from "lucide-react";
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

type UIMode = 'simple' | 'pro';

function App() {
  const [uiMode, setUiMode] = useState<UIMode>('simple');
  const [activePreset, setActivePreset] = useState<'video' | 'audio' | 'podcast' | null>(null);
  const [urls, setUrls] = useState<string>("");
  const [config, setConfig] = useState<DownloadConfig>({
    audio_quality: "0",
    subtitles: false,
    subtitle_lang: "es",
    title_format: "date-original",
    output_path: "",
    rate_limit: "5M",
    sleep_interval: 3,
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
  const [ytdlpInfo, setYtdlpInfo] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    checkYtdlp();
    setupDefaultPath();
  }, []);
  async function setupDefaultPath() {
    try {
      const baseDir = await downloadDir();

      const defaultPath = await join(baseDir, 'oxidetube');
      setConfig(prev => ({
        ...prev,
        output_path: prev.output_path || defaultPath
      }));
    } catch (error) {
      console.error("Error al obtener directorio de descargas:", error);
    }
  }

  async function checkYtdlp() {
    try {
      const info = await invoke<string>("check_ytdlp");
      setYtdlpInfo(info);
      if (info.includes("python")) {
        setConfig(prev => ({ ...prev, use_python: true }));
      }
    } catch (error) {
      console.error("Error checking yt-dlp:", error);
      setYtdlpInfo("");
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

      if (i > 0 && config.sleep_interval > 0) {
        setDownloads(prev => prev.map((d, idx) =>
          idx === i ? {
            ...d,
            status: 'pending',
            message: `Esperando ${config.sleep_interval}s...`
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

  function applySimplePreset(preset: 'video' | 'audio' | 'podcast') {
    setActivePreset(preset);
    switch (preset) {
      case 'video':
        setConfig(prev => ({
          ...prev,
          extract_audio: false,
          subtitles: true,
          subtitle_lang: 'es',
          sponsorblock: true,
          embed_metadata: true,
          cookies_browser: 'none',
        }));
        break;
      case 'audio':
        setConfig(prev => ({
          ...prev,
          extract_audio: true,
          audio_format: 'mp3',
          audio_quality: '0',
          subtitles: false,
          embed_metadata: true,
          embed_thumbnail: true,
        }));
        break;
      case 'podcast':
        setConfig(prev => ({
          ...prev,
          extract_audio: true,
          audio_format: 'mp3',
          audio_quality: '5',
          subtitles: false,
          sponsorblock: true,
          max_filesize: '500M',
        }));
        break;
    }
  }

  if (!ytdlpInfo) {
    return (
      <main className="container">
        <div className="error-container">
          <h1>yt-dlp no está instalado</h1>
          <p>Instala yt-dlp para usar esta aplicación</p>
          <div className="install-instructions">
            <div><strong>Windows:</strong> <code>pip install yt-dlp</code></div>
            <div><strong>Linux:</strong> <code>sudo apt install yt-dlp</code></div>
            <div><strong>macOS:</strong> <code>brew install yt-dlp</code></div>
          </div>
          <button onClick={checkYtdlp} className="btn-primary">Verificar de nuevo</button>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <header className="app-header">
        <div className="header-left">
          <h1>OxideTube</h1>
        </div>
        <div className="mode-toggle">
          <button
            className={`mode-btn ${uiMode === 'simple' ? 'active' : ''}`}
            onClick={() => setUiMode('simple')}
          >Simple</button>
          <button
            className={`mode-btn ${uiMode === 'pro' ? 'active' : ''}`}
            onClick={() => setUiMode('pro')}
          >Pro</button>
        </div>
      </header>

      {uiMode === 'simple' && (
        <div className="simple-mode">
          <div className="preset-selector">
            <h3>¿Qué deseas descargar?</h3>
            <div className="preset-cards">
              <button className={`preset-card ${activePreset === 'video' ? 'active' : ''}`} onClick={() => applySimplePreset('video')}>
                <div className="preset-icon"><Clapperboard size={32} /></div>
                <h4>Video</h4>
                <p>Con subtítulos, sin anuncios</p>
              </button>
              <button className={`preset-card ${activePreset === 'audio' ? 'active' : ''}`} onClick={() => applySimplePreset('audio')}>
                <div className="preset-icon"><Music size={32} /></div>
                <h4>Audio/Música</h4>
                <p>Alta calidad MP3</p>
              </button>
              <button className={`preset-card ${activePreset === 'podcast' ? 'active' : ''}`} onClick={() => applySimplePreset('podcast')}>
                <div className="preset-icon"><Mic size={32} /></div>
                <h4>Podcast</h4>
                <p>Audio comprimido, sin anuncios</p>
              </button>
            </div>
          </div>

          <div className="simple-controls">
            <div className="control-group">
              <label>URLs (una por línea)</label>
              <textarea value={urls} onChange={(e) => setUrls(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." rows={5} disabled={isDownloading} />
            </div>

            <div className="control-group">
              <label>Carpeta de descarga</label>
              <div className="folder-selector">
                <input type="text" value={config.output_path} readOnly placeholder="Selecciona una carpeta..." />
                <button onClick={selectFolder} className="btn-secondary">Seleccionar</button>
              </div>
            </div>

            <button onClick={startDownloads} disabled={isDownloading} className="btn-primary btn-large">
              {isDownloading ? 'Descargando...' : 'Iniciar Descarga'}
            </button>

            {downloads.length > 0 && (
              <div className="downloads-section">
                <h3>Descargas</h3>
                <div className="downloads-list">
                  {downloads.map((download, index) => (
                    <div key={index} className={`download-item status-${download.status}`}>
                      <div className="download-status">
                        {download.status === 'pending' && <Clock size={20} />}
                        {download.status === 'downloading' && <Download size={20} className="animate-spin" />}
                        {download.status === 'completed' && <CheckCircle size={20} />}
                        {download.status === 'error' && <AlertCircle size={20} />}
                      </div>
                      <div className="download-info">
                        <div className="download-url">{download.url}</div>
                        <div className="download-message">{download.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {uiMode === 'pro' && (
        <div className="pro-mode">
          <div className="config-section">
            <h3>Configuración General</h3>
            <div className="config-grid">
              <div className="control-group">
                <label>Formato</label>
                <select value={config.extract_audio ? 'audio' : 'video'} onChange={(e) => setConfig({ ...config, extract_audio: e.target.value === 'audio' })}>
                  <option value="video">Video</option>
                  <option value="audio">Solo Audio</option>
                </select>
              </div>

              {config.extract_audio && (
                <div className="control-group">
                  <label>Formato Audio</label>
                  <select value={config.audio_format} onChange={(e) => setConfig({ ...config, audio_format: e.target.value })}>
                    <option value="mp3">MP3</option>
                    <option value="m4a">M4A</option>
                    <option value="opus">OPUS</option>
                    <option value="flac">FLAC</option>
                    <option value="wav">WAV</option>
                  </select>
                </div>
              )}

              <div className="control-group">
                <label>Calidad Audio</label>
                <select value={config.audio_quality} onChange={(e) => setConfig({ ...config, audio_quality: e.target.value })}>
                  <option value="0">Mejor (0)</option>
                  <option value="2">Alta (2)</option>
                  <option value="5">Media (5)</option>
                  <option value="9">Baja (9)</option>
                </select>
              </div>

              <div className="control-group">
                <label>Formato Título</label>
                <select value={config.title_format} onChange={(e) => setConfig({ ...config, title_format: e.target.value })}>
                  <option value="date-original">Fecha - Nombre</option>
                  <option value="original">Solo Nombre</option>
                </select>
              </div>

              <div className="control-group">
                <label>Límite Velocidad</label>
                <select value={config.rate_limit} onChange={(e) => setConfig({ ...config, rate_limit: e.target.value })}>
                  <option value="unlimited">Sin límite</option>
                  <option value="5M">5 MB/s</option>
                  <option value="2M">2 MB/s</option>
                  <option value="1M">1 MB/s</option>
                  <option value="500K">500 KB/s</option>
                </select>
              </div>

              <div className="control-group">
                <label>Pausa entre Videos (seg)</label>
                <select value={config.sleep_interval} onChange={(e) => setConfig({ ...config, sleep_interval: Number(e.target.value) })}>
                  <option value="0">Sin pausa</option>
                  <option value="3">3 segundos</option>
                  <option value="5">5 segundos</option>
                  <option value="10">10 segundos</option>
                  <option value="30">30 segundos</option>
                </select>
              </div>

              <div className="control-group">
                <label>Tamaño Máximo</label>
                <select value={config.max_filesize} onChange={(e) => setConfig({ ...config, max_filesize: e.target.value })}>
                  <option value="unlimited">Sin límite</option>
                  <option value="100M">100 MB</option>
                  <option value="500M">500 MB</option>
                  <option value="1G">1 GB</option>
                  <option value="2G">2 GB</option>
                </select>
              </div>

              <div className="control-group">
                <label>Cookies Navegador</label>
                <select value={config.cookies_browser} onChange={(e) => setConfig({ ...config, cookies_browser: e.target.value })}>
                  <option value="none">No usar</option>
                  <option value="chrome">Chrome</option>
                  <option value="firefox">Firefox</option>
                  <option value="edge">Edge</option>
                  <option value="brave">Brave</option>
                  <option value="opera">Opera</option>
                  <option value="safari">Safari</option>
                </select>
              </div>
            </div>
          </div>

          <div className="config-section">
            <h3>Subtítulos</h3>
            <div className="config-grid">
              <div className="control-group checkbox-group">
                <label>
                  <input type="checkbox" checked={config.subtitles} onChange={(e) => setConfig({ ...config, subtitles: e.target.checked })} />
                  Descargar Subtítulos
                </label>
              </div>

              {config.subtitles && (
                <>
                  <div className="control-group checkbox-group">
                    <label>
                      <input type="checkbox" checked={config.all_subtitles} onChange={(e) => setConfig({ ...config, all_subtitles: e.target.checked })} />
                      Todos los idiomas
                    </label>
                  </div>

                  {!config.all_subtitles && (
                    <div className="control-group">
                      <label>Idioma</label>
                      <select value={config.subtitle_lang} onChange={(e) => setConfig({ ...config, subtitle_lang: e.target.value })}>
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                        <option value="de">Alemán</option>
                        <option value="pt">Portugués</option>
                        <option value="it">Italiano</option>
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="config-section">
            <h3>Opciones Avanzadas</h3>
            <div className="config-grid">
              <div className="control-group checkbox-group">
                <label><input type="checkbox" checked={config.sponsorblock} onChange={(e) => setConfig({ ...config, sponsorblock: e.target.checked })} /> Remover anuncios integrados (SponsorBlock)</label>
              </div>

              <div className="control-group checkbox-group">
                <label><input type="checkbox" checked={config.geo_bypass} onChange={(e) => setConfig({ ...config, geo_bypass: e.target.checked })} /> Bypass restricción geográfica</label>
              </div>

              <div className="control-group checkbox-group">
                <label><input type="checkbox" checked={config.embed_metadata} onChange={(e) => setConfig({ ...config, embed_metadata: e.target.checked })} /> Incluir metadata en archivo</label>
              </div>

              <div className="control-group checkbox-group">
                <label><input type="checkbox" checked={config.embed_thumbnail} onChange={(e) => setConfig({ ...config, embed_thumbnail: e.target.checked })} /> Incluir thumbnail en archivo</label>
              </div>

              <div className="control-group checkbox-group">
                <label><input type="checkbox" checked={config.use_python} onChange={(e) => setConfig({ ...config, use_python: e.target.checked })} /> Forzar uso de Python</label>
              </div>

              <div className="control-group">
                <label>Playlist</label>
                <select value={config.playlist_items} onChange={(e) => setConfig({ ...config, playlist_items: e.target.value })}>
                  <option value="single">Solo video individual</option>
                  <option value="all">Toda la playlist</option>
                  <option value="1-5">Primeros 5 videos</option>
                  <option value="1-10">Primeros 10 videos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="config-section">
            <div className="control-group">
              <label>URLs (una por línea)</label>
              <textarea value={urls} onChange={(e) => setUrls(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." rows={6} disabled={isDownloading} />
            </div>

            <div className="control-group">
              <label>Carpeta de descarga</label>
              <div className="folder-selector">
                <input type="text" value={config.output_path} readOnly placeholder="Selecciona una carpeta..." />
                <button onClick={selectFolder} className="btn-secondary">Seleccionar</button>
              </div>
            </div>

            <button onClick={startDownloads} disabled={isDownloading} className="btn-primary btn-large">
              {isDownloading ? 'Descargando...' : 'Iniciar Descarga'}
            </button>
          </div>
        </div>
      )}


    </main>
  );
}

export default App;
