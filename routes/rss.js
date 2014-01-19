
/**
 * Module dependence
 */

var http       = require('http')
  , htmlparser = require('node-htmlparser')
  , laodiao    = 'http://www.bestxl.com/rss.php'
  , tjholowaychuk = 'http://www.screenr.com/user/tjholowaychuk/rss';

/*
 * GET rss listing.
 */

exports.list = function(req, res){
  getXML(laodiao,function(xml){
    console.log(toJSON(xml).items[0]);
    res.render('rss',toJSON(xml));
  });
};



/**
  * transfer a xml to json formate
  */
function toJSON(xml){
  var handler = new htmlparser.RssBuilder()
    , parser  = new htmlparser.Parser(handler)
    , cdata   = /\!\[\[(.*)\]\]/;
  parser.parseComplete(xml);
  return handler.dom;
}

//send request to u
function getXML(url,callback){
  http.get(url,function(res){
    var result;
    res.on('data',function(chunk){
      result += chunk;
    });
    res.on('end',function(){
      callback(result);
    });
  });
}
