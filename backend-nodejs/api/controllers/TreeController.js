var mongoose = require('mongoose'),
moment = require('moment'),
Tree = mongoose.model('Tree'),
Validations = require('../utils/Validations');


var parentName = '';

module.exports.getNode = function(req, res, next) {
  if (!Validations.isObjectId(req.params.nodeId)) {
    return res.status(422).json({
      err: null,
      msg: 'nodeID parameter must be a valid ObjectId.',
      data: null
    });
  }
  Tree.findById(req.params.nodeId).exec(function(err, node) {
    if (err) {
      return next(err);
    }
    if (!node) {
      return res
        .status(404)
        .json({ err: null, msg: 'node not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'node retrieved successfully.',
      data: node
    });
  });
};

module.exports.getNodes = function(req, res, next) {
  Tree.find({}).exec(function(err, node) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'nodes retrieved successfully.',
      data: node
    });
  });
};


module.exports.createNode = function(req, res, next) {
  var valid =
    req.body.name &&
    Validations.isString(req.body.name);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name (String) is a required field.',
      data: null
    });
  }

    console.log(req.body);
    console.log(req.body.parentName);
    
    console.log (req.body.parentName == ''  );
     console.log( req.body.childName == ''  ) ;
    console.log((req.body.parentName == undefined   && req.body.childName == undefined));
    console.log (req.body.parentName == null   && req.body.childName == null);
    console.log( typeof req.body.parentName == 'undefined'   && typeof req.body.childName == 'undefined');
    console.log((req.body.parentName == '0'   && req.body.childName == '0'));
    console.log(req.body.parentName == 'none'   && req.body.childName == 'none');

    var parentName = '';

    if ( (req.body.parentName == ''   && req.body.childName == '')  ){

      console.log('case 1');


      Tree.create(req.body, function(err, node)
       {
           if (err) {
             return next(err);
             }
           res.status(201).json({
           err: null,
            msg: 'node was created successfully.',
           data: node
             });
        });
      }
      else if ( req.body.childName == '' ) {

        console.log('case 2');
        Tree.findById(req.body.parentName).exec(function(err, parent) {
          if (err) {
            return next(err);
          }
          if (!parent) {
            return res
              .status(404)
              .json({ err: null, msg: 'parent not found.', data: null });
          }
          this.parentName = parent.name;
          req.body.parentName = parent.name;
          req.body.parentId = parent._id;




          
        Tree.create(req.body, function(err, node)
        {
            if (err) {
              return next(err);
              }
            res.status(201).json({
            err: null,
             msg: 'node was created successfully.',
            data: node
              });
         });
        });
  
      }





      else  {
          var newParentName = '';
          var newParentId = '' ;
        
          console.log('case 3');

        Tree.findById(req.body.parentName).exec(function(err, parent) {
          if (err) {
            return next(err);
          }
          if (!parent) {
            return res
              .status(404)
              .json({ err: null, msg: 'parent not found.', data: null });
          }
          this.parentName = parent.name;
          req.body.parentName = parent.name;
          req.body.parentId = parent._id;
          
            console.log(req.body);

          Tree.create(req.body, function(err, node)
          {
              if (err) {
                return next(err);
                }
          

                req.body.parentName = node.name;
                req.body.parentId = node._id;

                console.log('new parent name' + req.body.parentName );
                console.log('new parent id' + req.body.parentId);





                Tree.findByIdAndUpdate( req.body.childName).exec(function(err, updatedNode) 
                {
                    if (err) 
                    {
                      return next(err);
                     }
                    if (!updatedNode) {
                       return res.status(404)
                          .json({ err: null, msg: 'child not found.', data: null });
                          }
      
                             updatedNode.parentName = req.body.parentName;
                             updatedNode.parentId = req.body.parentId;
                               updatedNode.save();
      
                                 res.status(200).json({
                             err: null,
                        msg: 'child  was updated successfully.',
                           data: updatedNode
                              });
                               });


           });


         
                        
                        });
  
      }



       



};




module.exports.updateNode = function(req, res, next) {
  if (!Validations.isObjectId(req.params.nodeId)) {
    return res.status(422).json({
      err: null,
      msg: 'productId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.name &&
    Validations.isString(req.body.name);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String)  are required fields.',
      data: null
    });
  }


  Tree.findByIdAndUpdate(
    req.params.name,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedNode) {
    if (err) {
      return next(err);
    }
    if (!updatedNode) {
      return res
        .status(404)
        .json({ err: null, msg: 'node not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'node was updated successfully.',
      data: updatedNode
    });
  });
};

module.exports.deleteNode = function(req, res, next) {
  if (!Validations.isObjectId(req.params.nodeId)) {
    return res.status(422).json({
      err: null,
      msg: 'nodeId parameter must be a valid ObjectId.',
      data: null
    });
  }
  Tree.findByIdAndRemove(req.params.nodeId).exec(function(
    err,
    deletedNode
  ) {
    if (err) {
      return next(err);
    }
    if (!deletedNode) {
      return res
        .status(404)
        .json({ err: null, msg: 'node not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'node was deleted successfully.',
      data: deletedNode
    });
  });
};
