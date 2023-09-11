// Developed by Nannaphat Keamanuchet
// This is the client side of ontogpt mode

var _ = require("lodash/array");
var elementTools = require("../util/elementTools")();
const { spawn } = require("child_process");

module.exports = function (txtfile, template, outputPath) {
    const command = "ontogpt extract -t";
    const command2 = "-i";
    const command3 = "-o";
    const command4 = "-O";
    const command5 = "owl";
    const fileparts = outputPath.split("/");
    const outputFileName = fileparts[fileparts.length - 1];
    fetch(
        `http://localhost:3000/execute-command?command=${command}&param1=${template}&param2=${command2}&param3=${txtfile}&param4=${command3}&param5=${outputPath}&param6=${command4}&param7=${command5}`,
        {
            method: "GET",
        }
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("File download failed");
            }
            return response.blob();
        })
        .then((blob) => {
            const fileName = outputFileName;
            const blobURL = URL.createObjectURL(blob);
            const downloadLink = document.createElement("a");
            const newHashParameter = "file=" + fileName;
            if (location.hash === "#" + newHashParameter) {
                loadingModule.parseUrlAndLoadOntology();
            } else {
                location.hash = newHashParameter;
            }
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);  // Append the link to the document (optional)
            downloadLink.click();
            document.body.removeChild(downloadLink);  // Remove the link from the document (optional)
            URL.revokeObjectURL(blobURL);
        })
        .catch((error) => {
            console.error("File download error:", error);
        });

    console.log("${txtfile} received");
    console.log("${template} received");
    console.log("${outputPath} received");
};
