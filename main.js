const { app, BrowserWindow, Menu, session } = require('electron');
const path = require('path');

// Performance and FPS Uncap Flags
app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('max-gum-fps', '9999');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-oop-rasterization');
app.commandLine.appendSwitch('enable-webgl2-compute-context');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-accelerated-2d-canvas');
app.commandLine.appendSwitch('enable-highres-timer');

// Standard User-Agent to look like a normal Chrome browser
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'Survev.io Client',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      // Performance tweaks
      backgroundThrottling: false,
      offscreen: false,
    }
  });

  // Set the User-Agent for all requests in this window
  win.webContents.setUserAgent(USER_AGENT);

  win.loadURL('https://survev.io/');

  // Custom Menu
  const template = [
    {
      label: 'Game',
      submenu: [
        { label: 'Reload', accelerator: 'F5', click: () => win.reload() },
        { label: 'Toggle Fullscreen', accelerator: 'F11', click: () => win.setFullScreen(!win.isFullScreen()) },
        { type: 'separator' },
        { label: 'Exit', role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'resetZoom' },
        { type: 'separator' },
        { role: 'toggleDevTools' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  win.on('page-title-updated', (e) => {
    e.preventDefault();
  });
}

app.whenReady().then(() => {
  // Set global User-Agent for the session
  session.defaultSession.setUserAgent(USER_AGENT);
  
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
