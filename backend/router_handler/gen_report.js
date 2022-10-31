const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip")
const fs = require("fs");
const path = require("path");
exports.gen_report = function(req,res){
    var word_dir_path = "D:\\Double-World-Class_Project"
    // console.log(__dirname);
    const content = fs.readFileSync(
        path.resolve(word_dir_path, "test.docx"),
        "binary"
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render({
        // sql查出的结果在这写入报告中
            year: "2022",
            quarter: "ssssss"
    });
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });
    fs.writeFileSync(path.resolve(word_dir_path, "output.docx"), buf);
}
