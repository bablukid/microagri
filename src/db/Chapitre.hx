package db;
import sys.db.Object;
import sys.db.Types;
using Lambda;

class Chapitre extends Object{
    
    public var id : SId;
    public var title : SString<256>;
    public var description : SText;
    public var order : SInt;
      @hideInForms @:relation(questionnaireId) public var questionnaire : db.Questionnaire;

    public function new(){

        super();
        
    }

    public function getPages():Array<db.Page>{
        return Lambda.array(db.Page.manager.search($chapitre==this,{orderBy:order},false));
        
    }

    public static function getLabels(){
        return [
            "title" => "Titre",
            "description" => "Description",
            "order" => "Ordre"
        ];
    }




}