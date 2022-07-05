const express = require('express')
const router = express.Router()

// 导入并使用平台首页 培养拔尖创新人才 路由处理函数对应的模块
const cultivate_talents_handler = require('../router_handler/cultivate-talents')

// // 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const sub_schema2  = require('../schema/培养拔尖创新人才')


/* 
    查询三级表格是否可以填报，所有二级请求共用同一个处理函数
*/
router.post('/query-is-time', cultivate_talents_handler.query_is_time)


/*
    2-1 教书育人
 */
// 手动 填报思想政治教育特色与成效（2-1-1）
router.post('/education/political-edu',expressJoi(sub_schema2.table_2_1_1), cultivate_talents_handler.political_edu_sub)


/* 
    2-2 培养过程
*/
// 手动 填报教学成果奖存量情况（2-2-1-0）
router.post('/progress/edu-awards-num/counts', expressJoi(sub_schema2.table_2_2_1_0), cultivate_talents_handler.edu_awards_num_counts_sub)
// 手动 填报国家级教学成果奖情况（2-2-1-1）
router.post('/progress/edu-awards-num/nation-counts', expressJoi(sub_schema2.table_2_2_1_1), cultivate_talents_handler.edu_awards_num_nation_counts_sub)
// 手动 填报中国学位与研究生教育学会教育成果奖情况（2-2-1-2）
router.post('/progress/edu-awards-num/graduate-counts', expressJoi(sub_schema2.table_2_2_1_1), cultivate_talents_handler.edu_awards_num_graduate_counts_sub)
// 手动 填报省级教育成果奖情况（2-2-1-3）
router.post('/progress/edu-awards-num/province-counts', expressJoi(sub_schema2.table_2_2_1_1), cultivate_talents_handler.edu_awards_num_province_counts_sub)

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







module.exports = router