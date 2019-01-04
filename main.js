const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
let win = null;

function createWindow() {
  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, height: 600});

  // Specify entry point
  win.loadURL('http://localhost:3000');

  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });
}
/*function createWindow() {  win = new BrowserWindow({width: 800, height: 600})
win.loadURL(url.format ({  pathname: path.join(__dirname, 'src/index.html'),
protocol: 'file:',  slashes: true  }))  }*/

app.on('ready', function () {

  createWindow();

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
