package db;
import sys.db.Object;
import sys.db.Types;
using Lambda;

class Page extends Object{
    
    public var id : SId;
    public var title : SString<256>;
    public var description : SText;
    public var order : SInt;

    @hideInForms @:relation(chapitreId) public var chapitre : db.Chapitre;

    public function new(){

        super();
        
    }


    public function getQuestions(){
        var qp = db.QuestionPage.manager.search($page==this,{orderBy:order},false);
        return qp.map(function(qp) return qp.question).array();
    }

    public static function getLabels(){
        return [
            "title" => "Titre",
            "description" => "Description",
            "order" => "Ordre"
        ];
    }

    public function moveQuestion(q:db.Question,move:String){

        var qp = db.QuestionPage.manager.select($question==q && $page==this,true);
        if(qp==null) throw "cette question n'est pas dans cette page";
        //min/max
        if(move=="up" && qp.order==0) return;
        if(move=="down" && qp.order==getQuestions().length-1) return;

        var currentOrder = qp.order;

        //update order
        if(move=="up"){
            qp.order--;
            var other = db.QuestionPage.manager.select($page==this && $order == qp.order,true);
            if(other!=null) {
                other.order++;
                other.update();
            }
            qp.update();

        } 
        if(move=="down"){
            qp.order++;
            var other = db.QuestionPage.manager.select($page==this && $order == qp.order,true);
            if(other!=null) {
                other.order--;
                other.update();
            }
            qp.update();
        } 

       
    }


}