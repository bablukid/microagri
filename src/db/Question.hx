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
    // public var label : SString<128>;
    public var description : SText;
    public var type : SEnum<QuestionType>;
    public var data : SData<Dynamic>;

    public static function getByRef(ref:String){
        return manager.select($ref==ref,false);



    }
}