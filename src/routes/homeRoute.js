const question = require('./Admin/question');
const article = require('./Articles/articles');
const subject = require ('./Admin/subject');

module.exports = (app)=>{
    
    app.get('/',function(req,res,next){
        res.send('diractory access forbidden')
    })
    question(app);
    article(app);
    subject(app)
}