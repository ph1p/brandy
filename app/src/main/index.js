import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';
import Jimp from 'jimp';
const winURL =
  process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}` : `file://${__dirname}/index.html`;

let mainWindow;

const createWindow = () => {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 800,
    minWidth: 1180,
    minHeight: 800,
    center: true,
    backgroundColor: '#f0f1f4',
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      preload: require.resolve('./preload')
    }
  });

  mainWindow.setContentProtection(true);

  mainWindow.loadURL(`${winURL}`);

  ipcMain.on('add-renderer-notification', (event, text, type = 'default') => {
    mainWindow.webContents.send('add-renderer-notification', text, type);
  });

  // compress image and send it the render process
  ipcMain.on('compress-image', (event, data) => {
    const win = event.sender.getOwnerBrowserWindow().webContents;
    let givenImage = data.image;

    if (data.isBase64) {
      givenImage = Buffer.from(data.image, 'base64');
    }

    Jimp.read(givenImage)
      .then(image => {
        if (data.isBackground) {
          image
            .quality(95)
            .resize(Jimp.AUTO, 1200)
            .getBuffer(Jimp.MIME_JPEG, (err, img) => {
              win.send('compressed-background-image', img);
            });
        } else {
          image.quality(95).write(data.savePath);

          win.send('compressed-image', data.savePath);
        }
      })
      .catch(err => {
        win.send('error', true);
      });
  });
};

app.on('ready', createWindow);

app.on('browser-window-focus', event => {
  mainWindow.webContents.send('is-window-focused', true);
});

app.on('browser-window-blur', event => {
  mainWindow.webContents.send('is-window-blurred', true);
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
