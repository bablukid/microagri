package db;
import sys.db.Object;
import sys.db.Types;
using Lambda;

class Page extends Object{
    
    public var id : SId;
    public var title : SString<256>;
    public var description : SText;
    public var order : SInt;

    @hideInForms @:relation(questionnaireId) public var questionnaire : db.Questionnaire;

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




}