var mongoose = require('mongoose'),
moment = require('moment'),
Tree = mongoose.model('Tree'),
Validations = require('../utils/Validations');









module.exports.getParentInfo = function(req, res, next) {

    
var valid =
req.params.nodeName &&
Validations.isString(req.params.nodeName) ;

if (!valid) {
return res.status(422).json({
  err: null,
  msg: 'nodeName(String) is required fields.',
  data: null
});
}


console.log('hena');

  var  parentsResult = [];

Tree.find(  { name: req.params.nodeName } ).exec(function(err, node) {
if (err) {
  return next(err);
}
if (!node) {
  return res
    .status(404)
    .json({ err: null, msg: 'node not found.', data: null });
}
console.log(node);

node.forEach(n => {

  if (n.parentName!= ''){
    console.log(n.parentName);
  parentsResult.push(n.parentName);
      

  Tree.find(  { name: n.parentName } ).exec(function(err, node1) {
    if (err) {
      return next(err);
    }
    if (!node1) {
      return res
        .status(404)
        .json({ err: null, msg: 'node not found.', data: null });
    }
    
    node1.forEach(n => {

      console.log(n.parentName);
      if (n.parentName != '' ){
           parentsResult.push(n.parentName);  }

     
           res.status(200).json({
            err: null,
                 msg: 'Parents  retrieved successfully.',
          data: parentsResult,
             });
     
          });
  });



  }

  res.status(200).json({
    err: null,
         msg: 'Parents  retrieved successfully.',
  data: parentsResult,
     });

});


console.log('Parent result:  ' + parent);




});

  };




  module.exports.getChildrenInfo = function(req, res, next) {

console.log('get children info dakhal');

    var valid =
      req.params.nodeName &&
      Validations.isString(req.params.nodeName) ;
   
      if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'nodeName(String) is required fields.',
        data: null
      });
    }
    

    console.log('hena');
  
        var  childrenResult = [];

    Tree.find(  { parentName: req.params.nodeName } ).exec(function(err, node) {
      if (err) {
        return next(err);
      }
      if (!node) {
        return res
          .status(404)
          .json({ err: null, msg: 'node not found.', data: null });
      }
      console.log(node);

      node.forEach(n => {

        console.log(n.name);
        childrenResult.push(n.name);
    
      var n = childrenResult.length;

      

        Tree.find(  { parentName: n.name } ).exec(function(err, node) {
          if (err) {
            return next(err);
          }
          if (!node) {
            return res
              .status(404)
              .json({ err: null, msg: 'node not found.', data: null });
          }
          
          node.forEach(n => {

            console.log(n.name);
            childrenResult.push(n.name);

          childrenResult.push(node.name);  });  });
    
    
    
    
      });
     
      
      console.log('children result:  ' + childrenResult);


     res.status(200).json({
        err: null,
             msg: 'children  retrieved successfully.',
      data: childrenResult,
         });

    });
  };


  
  module.exports.getChildInfo = function(req, res, next) {

    var node = req.body.name;
    var childResult= [];

    let recursivelyGetChild = (node) => {
      let item
      return find(node)
        .then((document) => {
          item = document
    
          if(item.name) {
            return recursivelyGetChild(item.name)
          } else {
            return true;
          }
    
        })
        .then(() => {
          return addToArray(item.name)
        })
        .catch((err) => {
          console.log(err)
        }) ;



        res.status(200).json({
          err: null,
               msg: 'children  retrieved successfully.',
        data: childResult,
           });

    };

    let addToArray = (name) => {
      return new Promise((resolve, reject) => {
        childResult.push(push);
    }); }

    let find = (node) => {
      return new Promise((resolve, reject) => {
        Tree.find( { parentName: node } , (err, item) => {
          if(err) {
            return reject(err);
          } else {
            return resolve(item);
          }
      });
    });
  };

 


}
  