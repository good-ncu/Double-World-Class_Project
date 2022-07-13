
const JSZipUtils = require('jszip-utils');
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip")
const fs = require("fs");
const path = require("path");
function gen_report(){
    const content = fs.readFileSync(
        path.resolve(__dirname, "fuwu.docx"),
        "binary"
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render({
            year: "2022",
            quarter: "ssssss"
    });
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });
    fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
    // // 读取并获得模板文件的二进制内容
    // JSZipUtils.getBinaryContent('./fuwu.docx', function(err, content){
    //     if(err){
    //         throw err
    //     }
    //     // 创建一个PizZip实例，内容为模板的内容
    //     let zip = new PizZip(content)
    //     // 创建并加载docxtemplater实例对象
    //     let doc = new docxtemplater().loadZip(zip);
    //     // 去除未定义值所显示的undefined
    //     doc.setOptions({
    //         nullGetter: function () {
    //             return "";
    //         }
    //     });
    //     doc.setData({
    //         year: "2022",
    //         quarter: "第一"
    //     })

    //     try {
    //         // 用模板变量的值替换所有模板变量
    //         doc.render();
    //     } catch (error) {
    //         // 抛出异常
    //         let e = {
    //             message: error.message,
    //             name: error.name,
    //             stack: error.stack,
    //             properties: error.properties,
    //         };
    //         console.log(JSON.stringify({ error: e }));
    //         throw error;
    //     }

    //     // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
    //     let out = doc.getZip().generate({
    //         type: "blob",
    //         mimeType:
    //             "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //     });
    //     // 将目标文件对象保存为目标类型的文件，并命名
    //     saveAs(out, "testlou.docx");
    // })

}

// gen_report()