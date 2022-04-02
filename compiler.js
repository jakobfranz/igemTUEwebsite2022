import { renderFile } from 'pug';
import { access, unlink, watch, writeFile, readFileSync, readdirSync } from 'fs';

const variables = JSON.parse(readFileSync('./compile/variables.json'));
const pugFolder = './pug/';


var files = readdirSync(pugFolder);
// This array contains the files, that are currently accessed,
// to prevent multiple writes on the same file
var writing = [];



var timeout = false;


// Compile all files upon loading
compileAll();

// watch-cycle: Whenever a pug file is changed, compile it.
watch(pugFolder, (event, filename) => {
    // Prevent multiple rapid calls    
    if (writing.indexOf(filename) > -1) {
            return false;
        }
        
        writing.push(filename);

        if (filename) {
            if (event = 'change') {
                // File change detected. Compile that file
                compile(filename);
            } else if (event = 'rename') {
                // file was created, deleted or renamed
                access(pugFolder + filename, constants.F_OK,
                    (err) => {
                        if (err) {
                            // File was deleted -> delete respective html file, delete from file list
                            unlink(htmlFilePath(filename), 
                                (err) => {
                                    if (err) {
                                        console.log("Deletion Failed: " + err);
                                    } else {
                                        console.log("File deleted");
                                        files.splice(files.indexOf(filename),1);
                                    }
                                });
                        } else {
                            // File was renamed or created -> compile new file, add file to file list
                            compile(filename);
                            files.push(filename);
                        }
                    });
            } else {
                throw new Error("fs.acces failed, no event was given");
            }
        } else {
            console.log('filename not provided');
        }
    });






function compile(filename) {
    /**
     * Compiles and renders a pug file into html and writes it into the corresponding file in /html/
     * 
     * @argument filename name of file to be compiled. Needs to be in the /pug/ folder. Example: 'example.pug'
     */

    if (filename) {
        console.log('Compiling and rendering \'' + filename + '\'');

        try {
            // compile and render pug file
            var compiledFile = renderFile(pugFolder + filename, variables);

            // Write into file
            writeFile(htmlFilePath(filename),
                compiledFile,
                (err) => {
                    if (err) {
                        console.log('Unable to write into file: ' + err);
                    } else {
                        console.log('Compiling successfull');
                    }
                    // Removing writing prohibition for file
                    writing.splice(writing.indexOf(filename),1);
                });
        } catch (err) {
            console.log(err);
        }

    } else {
        console.log('Compiler: No filename provided');
    }
}


function compileAll() {
    /**
     * Compiles all pug files
     */
    console.log("Compiling all files");
    files.forEach((file) => compile(file));
}



function htmlFilePath(filename) {
    /**
     * Converts a pug file name into the corresponding html file path
     */

    if(filename === 'index.pug') {
        return './index.html';
    }

    if (filename.slice(filename.length - 4, filename.length) === '.pug') {
        return './site/' + filename.slice(0, filename.length - 3) + 'html';
    } else {
        throw new Error("Given file was no pug file");
    }
}
