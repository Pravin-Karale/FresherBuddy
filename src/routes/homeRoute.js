const question = require('./Admin/question')
const article = require('../routes/Articles/articles')
module.exports=function(app){
    
    app.get('/',function(req,res,next){
        res.send('diractory access forbidden')
    })
    question(app)
    article(app)
}