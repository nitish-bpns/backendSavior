const News = require('../model/news');

module.exports = async (req, res) => {
    let payload = req.body;

    const newsEntry = {
        'heading': payload.heading,
        'content': payload.content,
        'location': payload.location,
        'source': payload.source
    }
    
    let newsRegistry = new News(newsEntry);
    
    newsRegistry.save(async (registerErr, result) => {
        if(registerErr) {
            return res.status(500).send({message: 'Some glitch in adding the news. Please try after sometime'});
        }else{
              return res.status(200).send({
                message: 'news added successfully'
            });
        }
    });
}
