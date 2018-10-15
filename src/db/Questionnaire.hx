package db;
import sys.db.Object;
import sys.db.Types;

class Questionnaire extends Object{
    
    public var id : SId;
    public var name : SString<256>;

    public function getPages(){
        return db.Page.manager.search($questionnaire == this, false);
    }

    public static function getLabels(){
        return [
            "name"=>"Titre"
        ];
    }


}