const electron = require('electron');
const app = electron.app;  // ������ �������������� ��������� ���� ������ ����������.
const BrowserWindow = electron.BrowserWindow;  // ������ ��������� ���������� ����.

// ����������� ����������� �������� ������ � ������� �� ������ ������� Electron.
electron.crashReporter.start({
    companyName: "Test Company",
    submitURL: "/app/crashReport.php"
});

// ����������� ���������� ������ , ���� �� �� ���������, ����
// ���� ����� ������� ������������� ����� JavaScript ������ ����� ������ ��������� ������.
var mainWindow = null;

// ��������� ��� ��� ���� ������� � ��������� ����������.
app.on('window-all-closed', function() {
    // � OS X ������� ��������� ���������� � �� menu bar
    //  ���������� ��������� �� ��� ��� ���� ������������ ������� �� ���� ����������� ������ Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// ���� ����� ����� ������ ����� Electron �������� ������������� 
// � ����� ����� � �������� ���������� ����.
app.on('ready', function() {
    // ������� ���� ��������.
    mainWindow = new BrowserWindow({
        width: 498,
        height: 825,
        resizable: false
    });

    // � ��������� ���� index.html ������ ��� ����������.
    mainWindow.loadURL(__dirname + '/../build/index.html');

    // ��������� DevTools.
    //mainWindow.webContents.openDevTools();

    // ���� ����� ����� �������� ����� ������������ ������� �������� ����.
    mainWindow.on('closed', function() {
        // ������� ������ �� ����, ���� ���� ���������� ����� ������������ ���������
        // ���� �� ������ ������� �� � �������, ��� ����� 
        // ����� ����� ������� ��������������� �������.
        mainWindow = null;
    });
});