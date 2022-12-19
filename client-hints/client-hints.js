// client-hints.js

const HINTS = {
  userAgentHints: [
    'sec-ch-ua',
    'sec-ch-ua-arch',
    'sec-ch-ua-bitness',
    'sec-ch-ua-full-version-list',
    'sec-ch-ua-full-version',
    'sec-ch-ua-mobile',
    'sec-ch-ua-model',
    'sec-ch-ua-platform',
    'sec-ch-ua-platform-version',
  ],
  deviceHints: ['device-memory', 'dpr', 'width', 'viewport-width'],
  networkHints: ['save-data', 'downlink', 'ect', 'rtt'],
  format: function () {
    let allHints = this.userAgentHints.join(', ') + ', ';
    allHints += this.deviceHints.join(', ') + ', ';
    allHints += this.networkHints.join(', ');
    return allHints;
  },
};

const PERMS = {
  userAgentPerms: [
    'ch-ua',
    'ch-ua-arch',
    'ch-ua-bitness',
    'ch-ua-full-version-list',
    'ch-ua-full-version',
    'ch-ua-mobile',
    'ch-ua-model',
    'ch-ua-platform',
    'ch-ua-platform-version',
  ],
  devicePerms: ['device-memory', 'dpr', 'width', 'viewport-width'],
  networkPerms: ['save-data', 'downlink', 'ect', 'rtt'],
  format: function () {
    let allPerms = this.userAgentPerms.join(' http://localhost:3001;');
    allPerms += this.devicePerms.join(' http://localhost:3001;');
    allPerms += this.networkPerms.join(' http://localhost:3001;');
    return allPerms + ' http://localhost:3001';
  },
};

module.exports = { HINTS, PERMS };
