// terminal banner (CommonJS + chalk v4)
const figlet = require('figlet');
const chalk = require('chalk');

figlet('VisariaAI', (err, data) => {
    if (err) {
        console.log('Error generating banner');
        return;
    }
    console.log('\n' + chalk.cyan(data));
    console.log(chalk.magenta('   Accessible Image-to-Speech AI for Everyone'));
    console.log(chalk.gray('                                             - by Soumyajit Das'));
});


