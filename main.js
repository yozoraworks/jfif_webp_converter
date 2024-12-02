const fs = require('fs');
const webp = require('webp-converter');

//webp.grant_permission();

function replaceExtension(fileName, newExtension) {
    var i = fileName.lastIndexOf('.');
    return fileName.substr(0, i) + newExtension;
}

function processFolder(path) {
    let files = fs.readdirSync(path);

    files.forEach(file => {
        if (fs.statSync(path + '\\' + file).isDirectory()) {
            processFolder(path + '\\' + file);
        } else {
            if (file.endsWith(".jfif")) {
                console.log(file);
                fs.renameSync(path + "\\" + file, path + "\\" + replaceExtension(file, ".jpg"));
            }
            if (file.endsWith(".webp")) {
                console.log(file);
                const result = webp.dwebp(path + "\\" + file, path + "\\" + replaceExtension(file, ".png"), "-o", logging = "-v");
                result.then((response) => {
                    if (!response.startsWith("Error!")) {
                        fs.unlinkSync(path + "\\" + file);
                    }
                });
            }
        }
    });
}

processFolder("C:\\Users\\inuya\\Downloads");
//processFolder("W:\\Images");