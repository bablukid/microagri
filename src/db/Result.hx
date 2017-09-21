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