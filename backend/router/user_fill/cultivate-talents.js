const express = require('express')
const router = express.Router()

// 导入并使用平台首页 培养拔尖创新人才 路由处理函数对应的模块
const cultivate_talents_handler = require('../../router_handler/user_fill/cultivate-talents')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const sub_schema2  = require('../../schema/培养拔尖创新人才')
// 3. 导入解析文件中间件
const excel_parsing2 = require('../../excel_parsing/培养拔尖创新人才_xls')
const public = require('../../excel_parsing/公用中间件multer')
const multer = require('multer')


/* 
     2-1 查询三级表格是否可以填报，所有二级请求共用同一个处理函数
*/
router.post('/education', cultivate_talents_handler.query_is_time)
/* 
     2-2 查询三级表格是否可以填报，所有二级请求共用同一个处理函数
*/
router.post('/progress', cultivate_talents_handler.query_is_time)
/* 
     2-3 查询三级表格是否可以填报，所有二级请求共用同一个处理函数
*/
router.post('/graduate-employment', cultivate_talents_handler.query_is_time)
/* 
     2-4 查询三级表格是否可以填报，所有二级请求共用同一个处理函数
*/
router.post('/international-contacts', cultivate_talents_handler.query_is_time)



/*
    2-1 教书育人
 */
// 手动 填报思想政治教育特色与成效（2-1-1）
router.post('/education/political-edu',expressJoi(sub_schema2.table_2_1_1), cultivate_talents_handler.political_edu_sub)
// 表格 填报思想政治教育特色与成效（2-1-1）
router.post('/education/political-edu-template', public.upload_file_callback, excel_parsing2.deal_table_2_1_1, 
expressJoi(sub_schema2.table_2_1_1), cultivate_talents_handler.political_edu_sub)

/* 
    2-2 培养过程
*/
// 手动 填报教学成果奖存量情况（2-2-1-0）
router.post('/progress/edu-awards-num/counts', expressJoi(sub_schema2.table_2_2_1_0), cultivate_talents_handler.edu_awards_num_counts_sub)
// 表格 填报教学成果奖存量情况（2-2-1-0）
router.post('/progress/edu-awards-num/counts-template', public.upload_file_callback, excel_parsing2.deal_table_2_2_1_0, 
expressJoi(sub_schema2.table_2_2_1_0), cultivate_talents_handler.edu_awards_num_counts_sub)

// 手动 填报国家级教学成果奖情况（2-2-1-1）
router.post('/progress/edu-awards-num/nation-counts', expressJoi(sub_schema2.table_2_2_1_1), cultivate_talents_handler.edu_awards_num_nation_counts_sub)
// 手动 填报中国学位与研究生教育学会教育成果奖情况（2-2-1-2）
router.post('/progress/edu-awards-num/graduate-counts', expressJoi(sub_schema2.table_2_2_1_2), cultivate_talents_handler.edu_awards_num_graduate_counts_sub)
// 手动 填报省级教育成果奖情况（2-2-1-3）
router.post('/progress/edu-awards-num/province-counts', expressJoi(sub_schema2.table_2_2_1_3), cultivate_talents_handler.edu_awards_num_province_counts_sub)

// 手动 填报出版教材质量（2-2-2-1）
router.post('/progress/major-class/publish-quality', expressJoi(sub_schema2.table_2_2_2_1), cultivate_talents_handler.major_class_publish_quality_sub) 
// 手动 填报国家级一流课程建设情况（2-2-2-3）
router.post('/progress/major-class/nation-counts', expressJoi(sub_schema2.table_2_2_2_3), cultivate_talents_handler.major_class_nation_counts_sub)
// 手动 填报省级一流课程建设情况（2-2-2-4）
router.post('/progress/major-class/province-counts', expressJoi(sub_schema2.table_2_2_2_4), cultivate_talents_handler.major_class_province_counts_sub)

// 手动 填报人才培养平台/基地建设存量情况（2-2-3-0）
router.post('/progress/personnel-cultivate/platform-counts', expressJoi(sub_schema2.table_2_2_3_0), cultivate_talents_handler.personnel_cultivate_platform_counts_sub) 
// 手动 填报国家级人才培养平台/基地建设存量情况（2-2-3-1）
router.post('/progress/personnel-cultivate/nation-counts', expressJoi(sub_schema2.table_2_2_3_1), cultivate_talents_handler.personnel_cultivate_nation_counts_sub) 
// 手动 填报省部级人才培养平台/基地建设存量情况（2-2-3-2）
router.post('/progress/personnel-cultivate/province-counts', expressJoi(sub_schema2.table_2_2_3_2), cultivate_talents_handler.personnel_cultivate_province_counts_sub) 

// 手动 填报硕士导师和博士导师情况（2-2-4）
router.post('/progress/master-doctoral-tutor', expressJoi(sub_schema2.table_2_2_4), cultivate_talents_handler.master_doctoral_tutor_sub) 
// 手动 填报给本科生上课的正教授人数（2-2-5）
router.post('/progress/professor-counts', expressJoi(sub_schema2.table_2_2_5), cultivate_talents_handler.professor_counts_sub) 
// 手动 填报本科生、硕士生、博士生（含留学生）国内外竞赛获奖项目清单（2-2-6）
router.post('/progress/student-competition', expressJoi(sub_schema2.table_2_2_6), cultivate_talents_handler.student_competition_sub) 
// 手动 填报本科生、硕士生、博士生（含留学生）发表的代表性论文清单（2-2-7）
router.post('/progress/student-paper', expressJoi(sub_schema2.table_2_2_7), cultivate_talents_handler.student_paper_sub) 


/**
 *   2-3 毕业就业
 */
// 手动 填报年度授予学士、硕士、博士学位情况（2-3-1）
router.post('/graduate-employment/degree-counts', expressJoi(sub_schema2.table_2_3_1), cultivate_talents_handler.degree_counts_sub)
// 手动 填报学科领域突出贡献者情况（2-3-2）
router.post('/graduate-employment/discipline-pioneer', expressJoi(sub_schema2.table_2_3_2), cultivate_talents_handler.discipline_pioneer_sub)

/**
 *   2-4 国际合作交流
 */
// 手动 填报来本学科攻读学位的国（境）外留学生（本、硕、博）及博士后、交流学者情况（2-4-1）
router.post('/international-contacts/scholar-counts',expressJoi(sub_schema2.table_2_4_1), cultivate_talents_handler.scholar_counts_sub)
// 手动 填报本科生、硕士生、博士生参加本领域国内外重要学术会议并作报告人员清单（2-4-2）
router.post('/international-contacts/conference-counts',expressJoi(sub_schema2.table_2_4_2), cultivate_talents_handler.conference_counts_sub)




module.exports = router