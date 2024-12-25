const fs = require('fs');
const path = require('path');

//Function to display the instructions
const showUsage = () => {
    console.log(`Usage:
        node app,js <command> <>options>
        Commands:
            create-file <file-path> <content> Create a file with content
            read-file <file-path>             Read a file
            delete-file <file-path>           Delete a file
            create-dir <dir-path>             Create a directory
            delete-dir <dir-path>             Delete a directory
            list-dir <dir-path>               List files in a directory
    `);
};

//Command handlers
//Create a file
const createFile = (filePath, content) => {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error creating file: ${err.message}`);
        }else{
            console.log(`File created successfully at ${filePath}`);
        }
    });
};

//Read a file
const readFile = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){
            console.error(`Error reading file: ${err.message}`);
        }else{
            console.log(`Content of ${filePath} : ${data}`);
        }
    });
};

//Delete a file
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if(err){
            console.error(`Error deleting file: ${err.message}`);
        }else{
            console.log(`File deleted successfully at ${filePath}`);
        }
    });
};

//Create a directory
const createDirectory = (dirPath) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
        if(err){
            console.error(`Error creating directory: ${err.message}`);
        }else{
            console.log(`Directory created successfully at ${dirPath}`);
        }
    });
};

//Delete a directory
const deleteDirectory = (dirPath) => {
    fs.rmdir(dirPath, { recursive: true }, (err) => {
        if(err){
            console.error(`Error deleting directory: ${err.message}`);
        }else{
            console.log(`Directory deleted successfully at ${dirPath}`);
        }
    });
};

//List files in a directory
const readDirectory = (dirPath) => {
    fs.readdir(dirPath, (err, files) => {
        if(err){
            console.error(`Error reading directory: ${err.message}`);
        }else{
            console.log(`Files in ${dirPath} : ${files}`);
        }
    });
};

//Main function
const args = process.argv.slice(2);

if(args.length === 0){
    showUsage();
}else{
    const command = args[0];
    const filePath = args[1];
    const content = args.slice(2).join(' ');

    switch(command){
        case 'create-file':
            if (!filePath || !content) {
                console.error('Please provide file path and content');
                showUsage();
            }else{
                createFile(filePath, content);
            }
            break;

        case 'read-file':   
            if (!filePath) {
                console.error('Please provide file path');
                showUsage();
            }else{  
                readFile(filePath);
                break;
            }
        case 'delete-file':
            if (!filePath) {
                console.error('Please provide file path');
                showUsage();
            }else{
                deleteFile(filePath);
            }
            break;
        case 'create-dir':
            if (!dirPath) {
                console.error('Please provide directory path');
                showUsage();
            }else{
                createDirectory(dirPath);
            }
            break;
        case 'delete-dir':
            if (!dirPath) {
                console.error('Please provide directory path');
                showUsage();
            }else{
                deleteDirectory(dirPath);
            }
            break;
        case 'list-dir':
            if (!dirPath) {
                console.error('Please provide directory path');
                showUsage();
            }else{
                readDirectory(dirPath);
            }
            break;
        default:
            console.error(`Invalid command: ${command}`);
            showUsage();   
            break;
    }
}