const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const jimp = require('jimp');

const MenuBuilder = require('./menu');

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
      nodeIntegration: true,
      preload: require.resolve('./preload')
    }
  });

  mainWindow.setContentProtection(true);

  mainWindow.loadURL(`${winURL}`);

  const menu = new MenuBuilder(mainWindow);
  menu.buildMenu();

  ipcMain.on('add-renderer-notification', (event, text, type = 'default') => {
    mainWindow.webContents.send('add-renderer-notification', text, type);
  });

  // compress image and send it the render process
  ipcMain.on('compress-image', (event, data) => {
    const win = event.sender.getOwnerBrowserWindow().webContents;
    let ext = 'jpg';
    let { type, data: givenImage, name, savePath } = data;

    if (givenImage.indexOf(';base64,') >= 0) {
      givenImage = Buffer.from(givenImage.replace(/^data:image\/png;base64,/, ''), 'base64');
    } else {
      if (typeof type === 'undefined') {
        ext = /^.+\.([^.]+)$/.exec(givenImage)[1];

        switch (ext) {
          case 'svg':
            type = 'svg';
            break;
          case 'png':
          case 'jpg':
          case 'jpeg':
            type = 'buffer';
            break;
        }
      }
    }

    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
      jimp
        .read(givenImage)
        .then(image => {
          if (type === 'buffer') {
            image
              .quality(95)
              .resize(jimp.AUTO, 1200)
              .getBuffer(jimp.MIME_JPEG, (err, img) => {
                win.send(`compressed-image-${name}`, img);
              });
          } else if (type === 'path') {
            image.quality(95).write(savePath);

            win.send(`compressed-image-${name}`, savePath);
          }
        })
        .catch(err => {
          win.send('error', true);
        });
    } else {
      if (type === 'svg') {
        fs.readFile(givenImage, 'utf8', (err, file) => {
          if (!err) {
            win.send(`compressed-image-${name}`, file);
          }
        });
      }
    }
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
