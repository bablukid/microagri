package db;
import sys.db.Object;
import sys.db.Types;

class Result extends Object{

    var id : SId;
    var a1 : SNull<SString<64>>; //nom de la ferme
    var a2 : SNull<SString<256>>; //adresse de la ferme
    var a3 : SNull<SInt>; //type d'exploitation



}