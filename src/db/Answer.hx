package db;
import sys.db.Object;
import sys.db.Types;

/**
    one answer per user-dataset-question
**/
@:id(dataset,questionId,userId)
class Answer extends Object{

    public var dataset : SInt;
    @:relation(userId) public var user : db.User;
    @:relation(questionId) public var question : db.Question;

    public var answer : SNull<SString<128>>;


    public static function getOrCreate(user:db.User,question:db.Question){
        var a : db.Answer = null;
        var dataset : Int = App.current.session.data.dataset==null ? 1 : App.current.session.data.dataset;

        
        x = manager.select($user==user && $dataset=dataset && $question=question,true);
        
        if(App.current.user.id != user.id && !App.current.user.isAdmin() ){
            throw "accès interdit";
        }
        
         
        if(x==null) {
            x = new Answer();
            x.user = user;
            x.question = question
            x.dataset = dataset;
            x.insert();
        }
        return x;
    }

}