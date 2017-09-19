import sugoi.form.ListData;

enum QType{
    QText;      //réponse texte
    QAddress;   //
    QRadio(list:Array<FormData<String>>);   //reponse unique
    QCheckbox(list:Array<FormData<String>>);//reponses multiples
}


class Questions{

    /**
    Structure générale des chapitres
    **/
    public static var chapitres = [
        "A"=>{
            nom : "Généralités sur la ferme",
            ordre : ["A1","A2","A3"],
        }
    ];

    /**
    Liste des questions :
        - label : le nom du champs utilisé pour stocker l'info dans la table
        - q : intitulé de la question
        - desc : commentaire supplémentaire
        - type : Type de question , sous-entend l'interface et la manière dont c'est stocké (type du champs)
        - data : Infos pour feeder le type
    **/
    public static var questions :[
        "A1" =>{
            label:"Nom",
            q:"Quel est le nom de votre ferme ?",
            desc:"Nom de la ferme. Si pas de nom, écrire le statut juridique ainsi que le nom de famille (leur laisser le choix entre le nom du/des responsable(s) ou fondateur(s) ?"                    
        },
    ];

    public static function get(){




    }


}