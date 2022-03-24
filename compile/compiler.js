import { renderFile } from 'pug';
import { access, unlink, watch, writeFile, readFileSync } from 'fs';

const variables = JSON.parse(readFileSync('./variables.json'));


var timeout = false;

watch('../pug/', (event, filename) => {
    // Prevent multiple rapid calls    
    if (timeout) {
            return false;
        } else {
            timeout = true;
            setTimeout(() => {timeout = false}, 200);
        }

        if (filename) {
            if (event = 'change') {
                // File change detected. Compile that file
                compile(filename);
            } else if (event = 'rename') {
                // file was created, deleted or renamed
                access('../pug' + filename, constants.F_OK,
                    (err) => {
                        if (err) {
                            // File was deleted -> delete respective html file
                            unlink(htmlFilePath(filename), 
                                (err) => {
                                    if (err) {
                                        console.log("Deletion Failed");
                                    } else {
                                        console.log("File deleted");
                                    }
                                });
                        } else {
                            // File was renamed or created -> compile new file
                            compile(filename);
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
            var compiledFile = renderFile('../pug/' + filename, variables);

            // Write into file
            writeFile(htmlFilePath(filename),
                compiledFile,
                (err) => {
                    if (err) {
                        console.log('Unable to write into file: ' + err);
                    } else {
                        console.log('Compiling successfull');
                    }
                });
        } catch (err) {
            console.log(err);
        }

    } else {
        console.log('Compiler: No filename provided');
    }
}


function htmlFilePath(filename) {
    /**
     * Converts a pug file name into the corresponding html file path
     */

    if (filename.slice(filename.length - 4, filename.length) === '.pug') {
        return '../html/' + filename.slice(0, filename.length - 3) + 'html';
    } else {
        throw new Error("Given file was no pug file");
    }
}
