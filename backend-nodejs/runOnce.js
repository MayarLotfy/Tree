var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Tree";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Tree");

  var nodesObj = [
  { name: 'A'},
  { name: 'B'},
  { name: 'C'},
  { name: 'D'},

  
  ];

 
  var collectionsObj = [
  
    {name: 'Tree', data: nodesObj},
  
  ];

  for (var i = 0; i < collectionsObj.length; i++){
    if(collectionsObj[i].data == null){
      dbo.createCollection(collectionsObj[i].name , function(err, res){
        if(err) throw err;
        done = true;
      });
    } else {
      dbo.collection(collectionsObj[i].name).insertMany(collectionsObj[i].data,function(err,res) {
        if(err) throw err;
        done = true;
      });
    }
    console.log("Collection: "+collectionsObj[i].name+" created !");
  }
  console.log("Press Control C");
}); 
