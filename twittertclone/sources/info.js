const loginINFO = [
    {
        type: 'input',
        name: 'email',
        message: 'Enter Your Email'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter Your Password'
    }
];
const registerINFO = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter Your Name'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter Your Email'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter Your Password'
    },
    {
        type: 'list',
        choices: ["male", "famel"],
        name: 'gender',
        message: 'Select Gender'
    }
];
const tweetINFO = [
    {
        type: 'input',
        name: 'content',
        message: 'Write Tweet'
    }
];
const commentInfo = [
    {
        type: 'input',
        name: 'comment',
        message: 'Write Comment'
    }
];
let tweetListInfo = (choices) => {
   return [
        {
            type: 'list',
            choices: choices,
            name: 'id',
            message: 'List Tweet'
        }
    ]
}

let tweetControlInfo = (tweet)=>[
    {
        type: 'list',
        choices: ["New Comment","Show Comments","Share"],
        name: 'control',
        message: tweet
    }
]

module.exports = {loginINFO, registerINFO, tweetINFO, tweetListInfo, tweetControlInfo, commentInfo}