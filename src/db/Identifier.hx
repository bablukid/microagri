package db;
import sys.db.Object;
import sys.db.Types;

class Identifier extends Object{

    public var id : SId;
    @:relation(userId) public var user : db.User;

    public var nom : SString<64>;
    public var localisation : SNull<SString<64>>;
    public var responsables : SNull<SString<64>>;
    public var email : SNull<SString<64>>;
    public var phone : SNull<SString<64>>;
    public var elements : SNull<SText>;
    public var activite : SNull<SText>;
    public var activite_agricole : SNull<SText>;
    


    public static function getOrCreate(user:db.User){
        var x = manager.select($user==user,true);
        if(x==null) {
            x = new Identifier();
            x.user = user;
            x.insert();
        }
        return x;
    }

}