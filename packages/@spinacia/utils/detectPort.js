const detect = require('detect-port-alt');
const inquirer = require('inquirer');

function findFreePort(port, host) {
    return detect(port, host)
    .then(_port => {
        
        if (port === _port) {
            return _port;
        } else {
            return findFreePort(_port, host);
        }
    })
    .catch(err => {
        console.log('detect port error: ', err);
        process.exit(1);
    });
}

function detectPort(port, host) {
    
   return new Promise(resolve => resolve())
    .then(async () => {
        const _port = await findFreePort(port, host);

        if (_port === port) return port;

        return await inquirer
        .prompt([{
            type: 'confirm',
            name: 'changePort',
            message: `port: ${port} was occupied, try port: ${_port}?`
        }])
        .then(answers => {
                const {changePort} = answers;

                if (changePort) {
                    return _port;
                } else {
                    console.log('> app exit');
                    process.exit(0);
                }
        });
    })
    .catch(err => {
        console.log('detect port error: ', err);
        process.exit(1);
    });
}

module.exports = detectPort;