const Student = require("../model/student");

module.exports = async (req, res) => {
    try {
            await Student.find({},(getStudentsErr, studentsList) => {
                if(getStudentsErr) {
                    res.status(500).json({message: 'Some glitch in getting the Students list.'})
                }
                var pageNo = parseInt(req.query.pageNo);
                var size = parseInt(req.query.size);
                var query = {};
                if(pageNo < 0 || pageNo === 0) 
                {
                  response = {"error" : true,"message" : "invalid page number, should start with 1"};
                  return res.json(response)
                }
                query.skip = size * (pageNo - 1)
                query.limit = size

                if(req.headers.location){
                  Student.count({city: req.headers.location},function(err,totalCount) {
                    if(err) {
                      response = {"error" : true,"message" : "Error fetching data"}
                    }
                    Student.find({city: req.headers.location},{},query,function(err,data) {
                
                      if(err) {
                        response = {"error" : true,"message" : "Error fetching data"};
                      } else {
                        var totalPages = Math.ceil(totalCount / size)
                        response = {"error" : false,"message" : data,"pages": totalPages};
                      }
                      res.status(200).json(response);
                    });
                  })
                }
                else{
                  Student.count({},function(err,totalCount) {
                    if(err) {
                      response = {"error" : true,"message" : "Error fetching data"}
                    }
                    Student.find({},{},query,function(err,data) {
                
                      if(err) {
                        response = {"error" : true,"message" : "Error fetching data"};
                      } else {
                        var totalPages = Math.ceil(totalCount / size)
                        response = {"error" : false,"message" : data,"pages": totalPages};
                      }
                      res.status(200).json(response);
                    });
                  })
                }
            });
      }catch (err) {
        console.log(
          `err `,
          err
        );
      }
};