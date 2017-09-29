package db;
import sys.db.Object;
import sys.db.Types;

class Result extends Object{

    public var id : SId;
    @:relation(userId) public var user : db.User;

    //généré par /shema    
   var Nom:SNull<SString<512>>;
var Localisation:SNull<SString<512>>;
var Forme_juridique:SNull<SString<512>>;
var Annee_prod:SNull<SInt>;
var Annee_crea:SNull<SInt>;
var nbre_responsables:SNull<SInt>;
var nbre_responsables_cmt:SNull<SString<512>>;
var activites:SNull<SString<512>>;
var activites_autres:SNull<SString<512>>;
var autres_travailleurs:SNull<SInt>;
var autres_travailleurs_temps:SNull<SInt>;
var stagiaires_num:SNull<SInt>;
var stagiaires_temps:SNull<SInt>;
var benevoles_num:SNull<SString<512>>;
var benevoles_temps:SNull<SString<512>>;
var siqo:SNull<SString<512>>;
var siqo_autres:SNull<SString<512>>;
var siqo_annee:SNull<SString<512>>;
var faire_valoir:SNull<SString<32>>;
var faire_valoir_autres:SNull<SString<512>>;
var faire_valoir_bati:SNull<SString<32>>;
var faire_valoir_bati_autres:SNull<SString<512>>;
var faire_valoir_cmt:SNull<SString<512>>;


    public static function getOrCreate(user:db.User){
        var x = manager.select($user==user,true);
        if(x==null) {
            x = new Result();
            x.user = user;
            x.insert();
        }
        return x;
    }

}