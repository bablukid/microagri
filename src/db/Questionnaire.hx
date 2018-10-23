package db;
import sys.db.Object;
import sys.db.Types;

class Questionnaire extends Object{
    
    public var id : SId;
    public var name : SString<256>;
    public var startScreen : SString<256>;
    public var endScreen : SString<256>;

    public function new(){
        super();
        startScreen = "/answers";
        endScreen = "/answers";
    }

    public function getChapitres():Array<db.Chapitre>{
        return Lambda.array(db.Chapitre.manager.search($questionnaire == this, false));
    }

    public static function getLabels(){
        return [
            "name"=>"Titre"
        ];
    }


}