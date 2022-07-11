const home_gov = require('./home_gov')
const home_school = require('./home_school')
const home_descipline = require('./home_descipline')

exports.query_show = function(req,res) {
    switch(req.user.role_id){
        case 2:
            data = home_gov.home_gov_query(req,res)
            break;
        case 3:
            home_school.home_school_query(req,res)
            break;
        case 4:
            home_descipline.home_descipline_query(req,res)
            break;
        default:
            return res.send({
                message: "no home show"
            })
    }
}