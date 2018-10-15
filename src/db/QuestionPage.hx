package db;
import sys.db.Object;
import sys.db.Types;

@:id(questionId,pageId)
class QuestionPage extends Object{
    
    @:relation(questionId) public var question : db.Question;
    @:relation(pageId) public var page : db.Page;
    public var order : SInt;


}