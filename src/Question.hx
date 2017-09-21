import sugoi.form.elements.*;
import sugoi.form.ListData;

enum QType{
    QText;      //réponse texte
    QInt;       //réponse chiffrée
    QAddress;   //
    QRadio(list:FormData<String>);   //reponse unique
    QCheckbox(list:FormData<String>);//reponses multiples
}


class Question{

    public var qid : String;
    public var data : {label:String,q:String,desc:String,type:QType};

    public function new(){ }

    /**
    Structure générale des chapitres
    **/
    public static var chapitres = [
        "A"=>{
            nom : "Généralités sur la ferme",
            ordre : ["A1","A2","A3","A4-1","A4-2"],
        }
    ];

    /**
    Liste des questions :
        - label : le nom du champs utilisé pour stocker l'info dans la table
        - q : intitulé de la question
        - desc : commentaire supplémentaire
        - type : Type de question , sous-entend l'interface et la manière dont c'est stocké (type du champs)
        
    **/
    public static var questions = [
        "A1" =>{
            label:"Nom",
            q:"Quel est le nom de votre ferme ?",
            desc:"Nom de la ferme. Si pas de nom, écrire le statut juridique ainsi que le nom de famille (leur laisser le choix entre le nom du/des responsable(s) ou fondateur(s) ?",                    
            type:QText,
        },
        "A2" =>{
            label:"Localisation",
            q:"Quelle est l’adresse de la ferme ?",
            desc:"",                   
            type:QAddress,
        },
         "A3" =>{
            label:"Forme_juridique",
            q:"Quelle est la forme juridique de votre ferme ?",
            desc:"Statut social de la ferme. cf. liste Agreste 2014 : Exploitation individuelle, GAEC, EARL, SCEA, Association, etc. Si la ferme est portée par une entreprise, elle peut être définie comme une exploitation agricole selon l’arrêté du 20 septembre 1993 relatif à la terminologie de l’agriculture. Dans le cas contraire, c’est le statut du responsable de la ferme qui détermine la vocation agricole de son activité.",                   
            type:QCheckbox([
                {label:"Entreprise individuelle",value:"EI"},
                {label:"EIRL",value:"EIRL"},
                {label:"SASU",value:"SASU"},
                {label:"GAEC",value:"GAEC"},
                {label:"EARL",value:"EARL"},
                {label:"SCEA",value:"SCEA"},
            ]),            
        },
        "A4-1" =>{
            label:"Annee_prod",
            q:"En quelle année avez-vous débuté votre production ?",
            desc:"",                   
            type:QInt,
        },
        "A4-2" =>{
            label:"Annee_crea",
            q:"Quelle année avez-vous créé juridiquement votre ferme ?",
            desc:"",                   
            type:QInt,
        },
    ];

    public static function get(k){
        var q = new Question();
        q.qid = k;
        q.data = questions[k];
        return q;
    }


    public function getForm(){

        var form = new sugoi.form.Form("q"+qid);

        //define a form render method
        form.toString = function(){
            var s:StringBuf = new StringBuf();
            s.add(form.getOpenTag());
            if (form.isSubmitted()) s.add(form.getErrors());

            for (element in form.getElements())
                if (element != form.submitButton && element.internal == false)                
                    s.add("\t"+element.render()+"\n");

            //submit button
            form.submitButton = new Submit('submit',  'Valider');
            form.submitButton.parentForm = form;            
            s.add( "<div style='margin-top:8px;' class='text-center'>"+ form.submitButton.render() + "</div>");            
            s.add( form.getCloseTag() );

            return s.toString();
        }


        switch(this.data.type){
            case QText : form.addElement(new sugoi.form.elements.TextArea("q",null,null,true) );
            default : form.addElement(new sugoi.form.elements.TextArea("q","unknown",null,true) );

        }

        return form;

    }

    public function getNext():Question{

        //trouver le chapitre
        for(c in chapitres){
            for(i in 0...c.ordre.length){
                var q = c.ordre[i];
                if(q==this.qid && c.ordre[i+1]!=null) return get(c.ordre[i+1]);            
            }
        }
        return null;
    }

    public function save(f:sugoi.form.Form){

        var r = db.Result.getOrCreate(App.current.user);

        Reflect.setField(r,this.data.label,f.getValueOf("q"));

        r.update();

    }


}