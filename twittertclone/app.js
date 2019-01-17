let program = require('commander');
let UserConfig = require('./sources/userconfig')
var  prompt  = require('inquirer');
let { logininfo, registerinfo } = require('./sources/info');
let UserController = require('./sources/controllers/usercontrol');



program
    .command('login')
    .alias('l')
    .description('Login a user')
    .action(() => {
        prompt(logininfo).then(answers => {
            let userController = new UserController();
            let { email, password } = answers;
            userController.login(email, password, (error, data) => {
                if (!error) {
                    UserConfig.setLogin(data.uid)
                    console.log("login successfully")
                }
            })
        })
    });
program
    .command('register')
    .alias('r')
    .description('Create new user')
    .action(() => {
        UserConfig.checkLogin((uid) => {
            if (!uid) {
                prompt(registerinfo).then(answers => {
                    let userController = new UserController();
                    userController.register(answers)
                })
            } else {
                console.log("you are login !")
            }
        })
    });

program
    .command('logout')
    .alias('lo')
    .description('Logaout')
    .action(() => {
        UserConfig.checkLogin((uid) => {
            if (uid) {
                UserConfig.logout((uid) => {
                    console.log("logout successfully")
                })
            } else {
                console.log("you are not login !")
            }
        })
    });




program.parse(process.argv);

