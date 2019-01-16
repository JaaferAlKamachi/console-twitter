let program = require('commander');
let UserConfig = require('./sources/userconfig')
var { prompt } = require('inquirer');
let { logininfo, registerinfo, tweetinfo, commentinfo, tweetListinfo, tweetControlinfo } = require('./sources/info');
let UserController = require('./sources/controllers/usercontrol');
let TweetController = require('./sources/controllers/tweetcontrol');
let CommentController = require('./sources/controllers/commentcontrol');
let TimeAgo = require('javascript-time-ago')
let en = require('javascript-time-ago/locale/en')
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')


// LOGIN==LOGIN==LOGIN==LOGIN==LOGIN==LOGIN==LOGIN==LOGIN==LOGIN==
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

// REGISTER==REGISTER===REGISTER==REGISTER====REGISTER====
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

// LOGOUT==LOGOUT===LOGOUT==LOGOUT====LOGOUT====
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


// create Tweet==create Tweet===create Tweet==create Tweet====create Tweet====
program
    .command('tweet')
    .alias('tw')
    .description('Create Tweet')
    .action(() => {
        UserConfig.checkLogin((uid) => {
            if (uid) {
                prompt(tweetinfo).then(answers => {
                    answers.uid = uid
                    answers.date = Date.now()
                    let tweetController = new TweetController();
                    tweetController.createTweet(answers)
                })
            } else {
                console.log("you are not login !")
            }
        })
    });


// show Tweet==show Tweet===show Tweet==show Tweet====show Tweet====
program
    .command('home')
    .alias('h')
    .description('Show all Tweets')
    .action(() => {
        UserConfig.checkLogin((uid) => {
            if (uid) {
                let tweetController = new TweetController();
                tweetController.showTweets((tw) => {
                    let tweets = []
                    tw.forEach(function (doc) {
                        tweets.push(doc.data().content + "\t (" + timeAgo.format(doc.data().date) + ") \n" + doc.id)
                    });
                    prompt(tweetListinfo(tweets)).then((answers) => {
                        let id = answers.id.split("\n")[1]
                        prompt(tweetControlinfo(tweets)).then((answers) => {
                            let commentController = new CommentController();
                            if (answers.control == 'New Comment') {
                                
                                prompt(commentinfo).then((answers) => {
                                    answers.tweetId = id
                                    answers.uid = uid
                                    commentController.createComment(answers)
                                })
                            }
                            if(answers.control == 'Show Comments'){
                                commentController.showComments(id);
                            }
                        })
                    })
                })

            } else {
                console.log("you are not login !")
            }
        })
    });



program.parse(process.argv);

