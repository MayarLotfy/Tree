var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentId: {
    type: String   },
    
  parentName: {
    type: String
  } , 

},{collection: 'Tree'}
);

mongoose.model('Tree', productSchema);
