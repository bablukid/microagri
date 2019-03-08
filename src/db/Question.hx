package db;
import sys.db.Object;
import sys.db.Types;
import QuestionService;
import sugoi.form.ListData;

enum QType{
    QText;      //réponse texte bloc
    QString;    //réponse text 1 ligne
    QInt;       //réponse chiffrée
    QFloat;
    QAddress;   //
    QRadio(list:FormData<String>,?other:Bool);   //reponse unique
    QCheckbox(list:FormData<String>,?other:Bool,?extras:FormData<String>);//reponses multiples + autres + champs en plus
    QYesNo; //oui ou non
    QMultiInput(extras:FormData<String>);
}

enum QuestionType{
    QText;      //réponse texte bloc
    QString;    //réponse text 1 ligne
    QInt;       //réponse chiffrée
    QFloat;
    QAddress;   
    QRadio;     //reponse unique
    QCheckbox;  //reponses multiples + autres + champs en plus
    QYesNo;     //oui ou non
    QMultiInput;
}

class Question extends Object{
    
    public var id : SId;
    public var ref : SString<64>;
    public var question : SString<256>;
    public var label : SString<128>; //short and unique label for this question. easier to remember than "ref"
    public var description : SText;
    public var type : SEnum<QuestionType>;
    public var data : SData<Dynamic>;
    public var required : SBool;

    public static function getByRef(ref:String){
        return manager.select($ref==ref,false);
    }

    override public function insert(){

        if(db.Question.manager.count($ref==ref)>0) throw "Il y a déjà une question avec la référence "+ref;

        super.insert();
    }

    /**
        Return type choices for forms 
    **/
    public static function getTypes(){
        return [
            /*QText;      //réponse texte bloc
    QString;    //réponse text 1 ligne
    QInt;       //réponse chiffrée
    QFloat;
    QAddress;   
    QRadio;     //reponse unique
    QCheckbox;  //reponses multiples + autres + champs en plus
    QYesNo;     //oui ou non
    QMultiInput;*/
            {label:"Ligne de texte"         , value:"QString"},
            {label:"Bloc de texte"          , value:"QText"},
            {label:"Liste à choix unique"   , value:"QRadio"},
            {label:"Cases à cocher"         , value:"QCheckbox"},
            
        ];
    }
}