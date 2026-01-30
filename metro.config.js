const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Windows'ta EPERM veren sistem dizinlerini izleme dışı bırak (Metro crawler bu yolları taramaz).
const defaultBlockList = config.resolver.blockList;
config.resolver.blockList = [
  ...(Array.isArray(defaultBlockList) ? defaultBlockList : [defaultBlockList]),
  /ElevatedDiagnostics/,
  /msdtadmin/,
  /WinSAT/,
];

module.exports = config;
