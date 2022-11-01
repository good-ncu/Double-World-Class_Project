const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip")
const fs = require("fs");
const path = require("path");
// 导入数据库操作模块
const client = require('../db/index')
const async = require('async');


exports.gen_report = async function(req,res){
    console.log("1111");
    sql = `select
	sum(国家级人才存量) as 国家级人才存量,
	sum(国家级人才增量) as 国家级人才增量,
	sum(国家级人才增量)/sum(国家级人才存量) as 国家级人才增长率,
	sum(国家重点重大项目存量) as 国家重点重大项目存量,
	sum(国家重点重大项目增量) as 国家重点重大项目增量,
	sum(国家重点重大项目增量)/sum(国家重点重大项目存量) as 国家重点重大项目增长率,
	sum(国家级教学成果奖存量) as 国家级教学成果奖存量,
	sum(国家级教学成果奖增量) as 国家级教学成果奖增量,
	sum(国家级教学成果奖增量)/sum(国家级教学成果奖存量) as 国家级教学成果奖增长率,
	sum(教师国家级奖项存量) as 教师国家级奖项存量,
	sum(教师国家级奖项增量) as 教师国家级奖项增量,
	sum(教师国家级奖项增量)/sum(教师国家级奖项存量) as 教师国家级奖项增长率,
	sum(国家级科研平台存量) as 国家级科研平台存量,
	sum(国家级科研平台增量) as 国家级科研平台增量,
	sum(国家级科研平台增量)/sum(国家级科研平台存量) as 国家级科研平台增长率
from
(
SELECT
	concat_ws('-',all_xk.univ_name,all_xk.discipline_name) AS 学科名,
	COALESCE(a1.num,0) AS 国家级人才存量,
	COALESCE(a2.num,0) AS 国家级人才增量,
	COALESCE(a3.num,0) AS 国家级科研平台存量,
	COALESCE(a4.num,0) AS 国家级科研平台增量,
	COALESCE(a5.num,0) AS 国家重点重大项目存量,
	COALESCE(a6.num,0) AS 国家重点重大项目增量,
	COALESCE(a7.num,0) AS 国家级教学成果奖存量,
	COALESCE(a8.num,0) AS 国家级教学成果奖增量,
	COALESCE(a9.num,0) AS 教师国家级奖项存量,
	COALESCE(a10.num,0) AS 教师国家级奖项增量,
	COALESCE(a11.num,0) AS 省级教学成果奖存量,
	COALESCE(a12.num,0) AS 省级教学成果奖增量,
	COALESCE(a13.num,0) AS 教师省部级奖项存量,
	COALESCE(a14.num,0) AS 教师省部级奖项增量,
	COALESCE(a15.num,0) AS 省部级科研平台存量,
	COALESCE(a16.num,0) AS 省部级科研平台增量
FROM
(
SELECT
	univ_discipline.univ_code,
	univ_discipline.discipline_code,
	univ_discipline.univ_name,
	univ_discipline.discipline_name
FROM univ_discipline
	WHERE univ_discipline.univ_code !='99999'
-- 	AND  univ_discipline.subsubtag1 = '主干'
-- 	AND  univ_discipline.tag2 = '突击队'
) AS all_xk
LEFT JOIN
(
SELECT
	talent_team.univ_code,
	talent_team.discipline_code,
	COUNT(talent_team.id) AS num
FROM
	talent_team
INNER JOIN user_fill 
	ON user_fill.id = talent_team.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND talent_team.is_delete = '0' 
	AND	talent_team.talent_or_team = '人才'
	AND talent_team.level = '国家级'
	AND talent_team.yr <2021
GROUP BY
	talent_team.univ_code,
	talent_team.discipline_code
) AS a1 ON all_xk.univ_code = a1.univ_code AND all_xk.discipline_code = a1.discipline_code
LEFT JOIN
(
SELECT
	talent_team.univ_code,
	talent_team.discipline_code,
	COUNT(talent_team.id) AS num
FROM
	talent_team
INNER JOIN user_fill 
	ON user_fill.id = talent_team.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND talent_team.is_delete = '0' 
	AND	talent_team.talent_or_team = '人才'
	AND talent_team.level = '国家级'
	AND talent_team.yr >2020
GROUP BY
	talent_team.univ_code,
	talent_team.discipline_code
) AS a2 ON all_xk.univ_code = a2.univ_code AND all_xk.discipline_code = a2.discipline_code
LEFT JOIN
(
SELECT
	sci_innova_plat.univ_code,
	sci_innova_plat.discipline_code,
	COUNT(sci_innova_plat.id) AS num
FROM
	sci_innova_plat
INNER JOIN user_fill 
	ON user_fill.id = sci_innova_plat.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND sci_innova_plat.is_delete = '0' 
	AND sci_innova_plat.palt_level = '国家级' 
	AND sci_innova_plat.yr <2021
GROUP BY
	sci_innova_plat.univ_code,
	sci_innova_plat.discipline_code
) AS a3 ON all_xk.univ_code = a3.univ_code AND all_xk.discipline_code = a3.discipline_code
LEFT JOIN
(
SELECT
	sci_innova_plat.univ_code,
	sci_innova_plat.discipline_code,
	COUNT(sci_innova_plat.id) AS num
FROM
	sci_innova_plat
INNER JOIN user_fill 
	ON user_fill.id = sci_innova_plat.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND sci_innova_plat.is_delete = '0' 
	AND sci_innova_plat.palt_level = '国家级' 
	AND sci_innova_plat.yr >2020
GROUP BY
	sci_innova_plat.univ_code,
	sci_innova_plat.discipline_code
) AS a4 ON all_xk.univ_code = a4.univ_code AND all_xk.discipline_code = a4.discipline_code
LEFT JOIN
(
SELECT
	host_sciproj.univ_code,
	host_sciproj.discipline_code,
	COUNT(host_sciproj.id) AS num
FROM
	host_sciproj
INNER JOIN user_fill 
	ON user_fill.id = host_sciproj.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND host_sciproj.is_delete = '0' 
	AND host_sciproj.proj_level = '国家重点重大项目'
	AND host_sciproj.yr <2021
GROUP BY
	host_sciproj.univ_code,
	host_sciproj.discipline_code
) AS a5 ON all_xk.univ_code = a5.univ_code AND all_xk.discipline_code = a5.discipline_code
LEFT JOIN
(
SELECT
	host_sciproj.univ_code,
	host_sciproj.discipline_code,
	COUNT(host_sciproj.id) AS num
FROM
	host_sciproj
INNER JOIN user_fill 
	ON user_fill.id = host_sciproj.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND host_sciproj.is_delete = '0' 
	AND host_sciproj.proj_level = '国家重点重大项目'
	AND host_sciproj.yr >2020
GROUP BY
	host_sciproj.univ_code,
	host_sciproj.discipline_code
) AS a6 ON all_xk.univ_code = a6.univ_code AND all_xk.discipline_code = a6.discipline_code
LEFT JOIN
(
SELECT
	teaching_achv.univ_code,
	teaching_achv.discipline_code,
	COUNT(teaching_achv.id) AS num
FROM
	teaching_achv
INNER JOIN user_fill 
	ON user_fill.id = teaching_achv.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND teaching_achv.is_delete = '0' 
	AND teaching_achv.award_ltype = '国家级教学成果奖'
	AND teaching_achv.yr <2021
GROUP BY
	teaching_achv.univ_code,
	teaching_achv.discipline_code
) AS a7 ON all_xk.univ_code = a7.univ_code AND all_xk.discipline_code = a7.discipline_code
LEFT JOIN
(
SELECT
	teaching_achv.univ_code,
	teaching_achv.discipline_code,
	COUNT(teaching_achv.id) AS num
FROM
	teaching_achv
INNER JOIN user_fill 
	ON user_fill.id = teaching_achv.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND teaching_achv.is_delete = '0' 
	AND teaching_achv.award_ltype = '国家级教学成果奖'
	AND teaching_achv.yr >2020
GROUP BY
	teaching_achv.univ_code,
	teaching_achv.discipline_code
) AS a8 ON all_xk.univ_code = a8.univ_code AND all_xk.discipline_code = a8.discipline_code
LEFT JOIN
(
SELECT
	tch_award.univ_code,
	tch_award.discipline_code,
	COUNT(tch_award.id) AS num
FROM
	tch_award
INNER JOIN user_fill 
	ON user_fill.id = tch_award.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND tch_award.is_delete = '0' 
	AND tch_award.level = '国家级' 
	AND tch_award.yr <2021
GROUP BY
	tch_award.univ_code,
	tch_award.discipline_code
) AS a9 ON all_xk.univ_code = a9.univ_code AND all_xk.discipline_code = a9.discipline_code
LEFT JOIN
(
SELECT
	tch_award.univ_code,
	tch_award.discipline_code,
	COUNT(tch_award.id) AS num
FROM
	tch_award
INNER JOIN user_fill 
	ON user_fill.id = tch_award.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND tch_award.is_delete = '0' 
	AND tch_award.level = '国家级' 
	AND tch_award.yr >2020
GROUP BY
	tch_award.univ_code,
	tch_award.discipline_code
) AS a10 ON all_xk.univ_code = a10.univ_code AND all_xk.discipline_code = a10.discipline_code
LEFT JOIN
(
SELECT
	teaching_achv.univ_code,
	teaching_achv.discipline_code,
	COUNT(teaching_achv.id) AS num
FROM
	teaching_achv
INNER JOIN user_fill 
	ON user_fill.id = teaching_achv.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND teaching_achv.is_delete = '0' 
	AND teaching_achv.award_ltype = '省级教学成果奖'
	AND teaching_achv.yr <2021
GROUP BY
	teaching_achv.univ_code,
	teaching_achv.discipline_code
) AS a11 ON all_xk.univ_code = a11.univ_code AND all_xk.discipline_code = a11.discipline_code
LEFT JOIN
(
SELECT
	teaching_achv.univ_code,
	teaching_achv.discipline_code,
	COUNT(teaching_achv.id) AS num
FROM
	teaching_achv
INNER JOIN user_fill 
	ON user_fill.id = teaching_achv.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND teaching_achv.is_delete = '0' 
	AND teaching_achv.award_ltype = '省级教学成果奖'
	AND teaching_achv.yr >2020
GROUP BY
	teaching_achv.univ_code,
	teaching_achv.discipline_code
) AS a12 ON all_xk.univ_code = a12.univ_code AND all_xk.discipline_code = a12.discipline_code
LEFT JOIN
(
SELECT
	tch_award.univ_code,
	tch_award.discipline_code,
	COUNT(tch_award.id) AS num
FROM
	tch_award
INNER JOIN user_fill 
	ON user_fill.id = tch_award.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND tch_award.is_delete = '0' 
	AND tch_award.level = '省部级' 
	AND tch_award.yr <2021
GROUP BY
	tch_award.univ_code,
	tch_award.discipline_code
) AS a13 ON all_xk.univ_code = a13.univ_code AND all_xk.discipline_code = a13.discipline_code
LEFT JOIN
(
SELECT
	tch_award.univ_code,
	tch_award.discipline_code,
	COUNT(tch_award.id) AS num
FROM
	tch_award
INNER JOIN user_fill 
	ON user_fill.id = tch_award.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND tch_award.is_delete = '0' 
	AND tch_award.level = '省部级' 
	AND tch_award.yr >2020
GROUP BY
	tch_award.univ_code,
	tch_award.discipline_code
) AS a14 ON all_xk.univ_code = a14.univ_code AND all_xk.discipline_code = a14.discipline_code
LEFT JOIN
(
SELECT
	sci_innova_plat.univ_code,
	sci_innova_plat.discipline_code,
	COUNT(sci_innova_plat.id) AS num
FROM
	sci_innova_plat
INNER JOIN user_fill 
	ON user_fill.id = sci_innova_plat.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND sci_innova_plat.is_delete = '0' 
	AND sci_innova_plat.palt_level = '省部级' 
	AND sci_innova_plat.yr <2021
GROUP BY
	sci_innova_plat.univ_code,
	sci_innova_plat.discipline_code
) AS a15 ON all_xk.univ_code = a15.univ_code AND all_xk.discipline_code = a15.discipline_code
LEFT JOIN
(
SELECT
	sci_innova_plat.univ_code,
	sci_innova_plat.discipline_code,
	COUNT(sci_innova_plat.id) AS num
FROM
	sci_innova_plat
INNER JOIN user_fill 
	ON user_fill.id = sci_innova_plat.user_fill_id
WHERE 
	user_fill.is_delete = '0' 
	--AND user_fill.is_seen = '1'  
	AND sci_innova_plat.is_delete = '0' 
	AND sci_innova_plat.palt_level = '省部级' 
	AND sci_innova_plat.yr >2020
GROUP BY
	sci_innova_plat.univ_code,
	sci_innova_plat.discipline_code
) AS a16 ON all_xk.univ_code = a16.univ_code AND all_xk.discipline_code = a16.discipline_code
)AS b`
    var results = await query(sql)
    console.log("3333");

    var word_dir_path = "D:\\Double-World-Class_Project"
    // console.log(__dirname);
    const content = fs.readFileSync(
        path.resolve(word_dir_path, "阶段性数据报告-1.docx"),
        "binary"
    );
    console.log(results.rows);
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render({
        // sql查出的结果在这写入报告中
        国家级人才存量: results.rows[0].国家级人才存量,
        国家级人才增量: results.rows[0].国家级人才增量,
        国家级人才增长率: results.rows[0].国家级人才增长率,
        国家重点重大项目存量: results.rows[0].国家重点重大项目存量,
        国家重点重大项目增量: results.rows[0].国家重点重大项目增量,
        国家重点重大项目增长率: results.rows[0].国家重点重大项目增长率,
        国家级教学成果奖存量: results.rows[0].国家级教学成果奖存量,
        国家级教学成果奖增量: results.rows[0].国家级教学成果奖增量,
        国家级教学成果奖增长率: results.rows[0].国家级教学成果奖增长率,
        教师国家级奖项存量: results.rows[0].教师国家级奖项存量,
        教师国家级奖项增量: results.rows[0].教师国家级奖项增量,
        教师国家级奖项增长率: results.rows[0].教师国家级奖项增长率,
        国家级科研平台存量: results.rows[0].国家级科研平台存量,
        国家级科研平台增量: results.rows[0].国家级科研平台增量,
        国家级科研平台增长率: results.rows[0].国家级科研平台增长率,

    });
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });
    fs.writeFileSync(path.resolve(word_dir_path, "output.docx"), buf);
}



let query = function (sql ,values){
    // 返回一个 Promise
  return new Promise(( resolve, reject ) => {
    client.query(sql, values, ( err, results) => {
        if ( err ) {
            reject( err )
        } else {
            console.log("2222");
            resolve( results )
        }
    })
  })
}

