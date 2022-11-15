// create variables for inquirer, fs, and function from seperate js file to keep clean

const inquirer = require('inquirer');
const fs = require('fs');
const { generateReadMe } = require('./assets/generate-md');

// function object to ask questions using inquirer

const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of your project?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Please provide a breif description of your project:',
            name: 'description',
        },
        {
            type: 'input',
            message: 'How do you install your project?',
            name: 'install',
        },
        {
            type: 'input',
            message: 'Please provide any usage information for your project:',
            name: 'usage',
        },
        {
            type: 'input',
            message: 'Who contributed to this project?',
            name: 'contribution',
        },
        {
            type: 'input',
            message: 'What technologies did you use in this project?',
            name: 'tech',
        },
        {
            type: 'confirm',
            message: 'Are there any known bugs in your project?',
            name: 'bugs',
            default: false,
        },
        {
            type: 'list',
            message: 'What licensing are you using for your project?',
            choices: ['MIT', 'GNU LGPL', 'ISC', 'Unlicense', 'None'],
            name: 'license',
            default: 'None',
        },
        {
            type: 'input',
            message: 'What is your github username?',
            name: 'user',
        },
        {
            type: 'input',
            message: 'What is your github email address?',
            name: 'email',
        }
])
    .then(input=> {
        return input;
    })
};

// function using 'fs' to generate file

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        // throw error if there is an error
        if(err) throw err;
        console.log("README file has been created successfully!");
    })
}

// function to generate the TEXT of the readme, generate file, then throw error if necessary

function init() {
    questions()
        .then(input => {
            return generateReadMe(input);
        })
        .then(markdown => {
            writeToFile('./generated/README.md', markdown);
        })
        .catch(err => {
            console.log(err);
        })
}

init();
