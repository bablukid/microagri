import sugoi.form.elements.*;
import sugoi.form.ListData;

enum QType{
    QText;      //réponse texte bloc
    QString;    //réponse text 1 ligne
    QInt;       //réponse chiffrée
    QAddress;   //
    QRadio(list:FormData<String>,?other:Bool);   //reponse unique
    QCheckbox(list:FormData<String>,?other:Bool);//reponses multiples
    QYesNo; //oui ou non
}


class Question{

    public var qid : String;
    public var data : {label:String,q:String,desc:String,type:QType};

    public function new(){ }

    /**
    Structure générale des chapitres
    **/
    public static var chapitres : Array<{ id:String,nom:String,ordre:Array<{qs:Array<String>,?titre:String,?desc:String}> }>= [
        {
            id:"A",
            nom : "Généralités sur la ferme",
            ordre : [
                {qs:["A1"],titre:"Nom",desc:"Nom de la ferme. Si pas de nom, écrire le statut juridique ainsi que le nom de famille"},
                {qs:["A2"],titre:"Localisation",desc:"Adresse du siège de la ferme (rue, lieu-dit, commune, département)"},
                {qs:["A3"],titre:"Form juridique",desc:"Statut social de la ferme (cf. liste Agreste 2014)"},
                {qs:["A4-1","A4-2"],titre:"Année d’installation de la ferme"},
                {qs:["A5-1","A5-2"],titre:"Responsable(s) de la ferme",desc:"Nombre de personnes partageant les décisions sur la ferme"},
                {qs:["A6-1","A6-2"],titre:"Activité(s) de la ferme"},               
                {qs:["A7-1","A7-2"],titre:"Autres travailleurs",desc:"Travailleurs autres que les responsables de la ferme dont les aides familiaux, le ou la conjoint(e). "},
                {qs:["A8-1","A8-2","A8-3","A8-4"],titre:"Accueil de stagiaire(s), apprenti(s), service(s) civique(s), bénévole(s)"},
                {qs:["A9-1","A9-2","A9-3"],titre:"SIQO(s), label(s), marque(s)",desc:"Garantie permettant de reconnaître les produits qui bénéficient d’un signe officiel d'identification de la qualité et de l’origine."},
                {qs:["A10-1","A10-2","A10-3","A10-4","A10-5"],titre:"Mode de faire-valoir des terres et des bâtiments",desc:"Direct (propriétaire), indirect (location) ou mixte (parcelles en location et en propriété). Exemples pour la catégorie « Autres » : terres utilisées à titre gratuit, illégalement, etc."},
            ],
        },
        {
            id:"B",
            nom:"Généralités sur le(s) reponsable(s) de la ferme",
            ordre:[
                {qs:["B1","B2","B3","B4"],titre:"",desc:""},
                {qs:["B5-1","B5-2"],titre:"Formation et Expérience",desc:""},
                {qs:["B6-1","B6-2","B6-3","B6-4","B6-5"],titre:"Parcours",desc:""},
            ]
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
            desc:"",                    
            type:QString,
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
            desc:"",                   
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
        "A5-1" =>{
            label:"nbre_responsables",
            q:"Vous êtes combien de responsables dans la gestion de la ferme ?",
            desc:"",                   
            type:QInt,
        },
        "A5-2" =>{
            label:"nbre_responsables_cmt",
            q:"Commentaire",
            desc:"",                   
            type:QText,
        },
        "A6-1" =>{
            label:"activites",
            q:"Quelles sont les activités de la ferme ?",
            desc:"",                   
            type:QCheckbox([
                {label:"Production",value:"production"},
                {label:"Transformation",value:"transformation"},
                {label:"Commercialisation",value:"commercialisation"},
                {label:"Viticulture",value:"viticulture"},
                {label:"Maraîchage",value:"maraichage"},
                {label:"Arboriculture",value:"arboriculture"},
                {label:"Céréaliculture",value:"cerealiculture"},
                {label:"Plantes à Parfum, Aromatiques et Médicinales",value:"aromatiques"},
                {label:"Bovins",value:"bovins"},
                {label:"Caprins",value:"caprins"},
                {label:"Ovins",value:"ovins"},
                {label:"Équidés",value:"equides"},
                {label:"Porcins",value:"porcins"},
                {label:"Elevages mixtes",value:"elevage_mixte"},
                {label:"Elevages spécialisés (apiculture, animaux domestiques ou exotiques…)",value:"elevage_spec"},
                {label:"Petit élevage",value:"elevage_petit"},
                {label:"Pisciculture",value:"pisciculture"},
                {label:"Conchyliculture",value:"conchyliculture"},
                {label:"Activités de pêche maritime à pied",value:"peche_a_pied"},
            ]),
        },
        "A6-2" =>{
            label:"activites_autres",
            q:"Autres activités",
            desc:"",                   
            type:QText,
        },
        "A7-1" =>{
            label:"autres_travailleurs",
            q:"Combien de travailleurs sur la ferme ?",
            desc:"",                   
            type:QInt,
        },
        "A7-2" =>{
            label:"autres_travailleurs_temps",
            q:"Pour chacun, combien de temps de travail ?",
            desc:"(en ETP / en heures)",                   
            type:QInt,
        },
        "A8-1" =>{
            label:"stagiaires_num",
            q:"Par an, combien accueillez-vous de stagiaire(s), d’apprenti(s) ou de service(s) civique(s) ?",
            desc:"",                   
            type:QInt,
        },
        "A8-2" =>{
            label:"stagiaires_temps",
            q:"Au total, combien de temps de travail cela représente-t-il ?",
            desc:"En ETP ou en heures",                   
            type:QInt,
        },
        "A8-3" =>{
            label:"benevoles_num",
            q:"Par an, combien accueillez-vous de bénévole(s) (amapiens, woofeurs, etc.) ? ",
            desc:"Donner un nombre approximatif et une fréquence (ex. 4 stagiaires d’1 mois de mars à septembre)",                   
            type:QText,
        },
        "A8-4" =>{
            label:"benevoles_temps",
            q:"Au total, combien de temps de travail cela représente-t-il ?",
            desc:"En ETP ou en heures",                   
            type:QString,
        },
        "A9-1" =>{
            label:"siqo",
            q:"Avez-vous une certification et/ou labellisation de votre production ? ",
            desc:"Pour chacune, donnez l’année d’inscription",                   
            type:QCheckbox([
                {label:"Appellation d’origine protégée (AOP)",value:"AOP"},
                {label:"Appellation d’origine contrôlée (AOC)",value:"AOC"},
                {label:"Indication géographique protégée (IGP)",value:"IGP"},
                {label:"Spécialité traditionnelle garantie (STG)",value:"STG"},
                {label:"Agriculture Biologique (AB)",value:"AB"},
                {label:"Label Rouge",value:"LR"},
            ],true),
        },
        "A9-2" =>{
            label:"siqo_autres",
            q:"Autres",
            desc:"",                   
            type:QText,
        },
        "A9-3" =>{
            label:"siqo_annee",
            q:"Pour chacune, donnez l’année d’inscription",
            desc:"",                   
            type:QText,
        },
        "A10-1" =>{
            label:"faire_valoir",
            q:"Quel est le mode de faire-valoir de vos terres ?",
            desc:"",                   
            type:QRadio([
                {label:"Direct (propriétaire)",value:"direct"},
                {label:"Indirect (location)",value:"indirect"},
                {label:"Mixte (parcelles en location et en propriété)",value:"mixte"},
            ]),
        },
        "A10-2" =>{
            label:"faire_valoir_autres",
            q:"Autres",
            desc:"",                   
            type:QText,
        },
        "A10-3" =>{
            label:"faire_valoir_bati",
            q:"Quel est le mode de faire-valoir de vos terres ?",
            desc:"",                   
            type:QRadio([
                {label:"Aucun bâtiment",value:"aucun"},
                {label:"Direct (propriétaire)",value:"direct"},
                {label:"Indirect (location)",value:"indirect"},
                {label:"Mixte (parcelles en location et en propriété)",value:"mixte"},
            ]),
        },
        "A10-4" =>{
            label:"faire_valoir_bati_autres",
            q:"Autres",
            desc:"",                   
            type:QText,
        },
        "A10-5" =>{
            label:"faire_valoir_cmt",
            q:"Commentaire",
            desc:"",                   
            type:QText,
        },
        "B1"=>{
            label:"nom_responsable",
            q:"Nom",
            desc:"",
            type:QString,
        },
        "B2"=>{
            label:"prenom_responsable",
            q:"Prénom",
            desc:"",
            type:QString,
        },
        "B3"=>{
            label:"sexe_responsable",
            q:"Sexe",
            desc:"",
            type:QRadio([{label:"Homme",value:"M"},{label:"Femme",value:"F"}]),
        },
        "B4"=>{
            label:"age_responsable",
            q:"Age",
            desc:"",
            type:QInt,
        },
        "B5-1"=>{
            label:"formation",
            q:"Quelle est la formation agricole que vous avez reçue ?",
            desc:"",
            type:QCheckbox([
                {label:"Aucune",value:"Aucune"},
                {label:"Ingénieur(e) agri/agro",value:"Inge"},
                {label:"BPH",value:"BPH"},
                {label:"BTSA",value:"BTSA"},
                {label:"BPREA",value:"BPREA"}, 
                {label:"BTA",value:"BTA"}, 
                {label:"Bac professionnel Agroéquipements",value:"BP A"},
                {label:"Bac professionnel Conduite et gestion de l’exploitation agricole",value:"BP CGEA"},
                {label:"Bac professionnel Productions horticoles",value:"BP PH"},
                {label:"Bac technologique S.T.A.V.",value:"BT STAV"}, 
            ])
        },
        "B5-2"=>{
            label:"experiences",
            q:"Citez les expériences agricoles acquises avant la création de votre ferme ?",
            desc:"",
            type:QText
        },
        "B6-1"=>{
            label:"parcours",
            q:"Etes-vous issus d’une famille d’agriculteur ?",
            desc:"",
            type:QRadio([
                {label:"Oui, de la première génération",value:"OUI1"},
                {label:"Oui, de la deuxième génération",value:"OUI2"},
                {label:"Non",value:"NON"},
            ])
        },
        "B6-2"=>{
            label:"conjointe",
            q:"Si oui, votre conjoint(e) est-il/elle sur la ferme familiale ?",
            desc:"",
            type:QYesNo
        },
        "B6-3"=>{
            label:"heritage",
            q:"Avez-vous hérité ?",
            desc:"",
            type:QYesNo
        },
        "B6-4"=>{
            label:"reconversion",
            q:"Est-ce une reconversion professionnelle ?",
            desc:"",
            type:QYesNo
        },
        "B6-5"=>{
            label:"ancien_metier",
            q:"Quel(s) métier(s) et quelle(s) fonction(s) occupiez-vous ?",
            desc:"",
            type:QString
        },
        "B7"=>{
            label:"responsabilites",
            q:"Quel est votre rôle sur la ferme ?",
            desc:"",
            type:QCheckbox([
                {label:"Administratif",value:"Administratif"},
                {label:"Communication",value:"Communication"},
                {label:"Production",value:"Production"},
                {label:"Transformation",value:"Transformation"},
                {label:"Commercialisation",value:"Commercialisation"},
                {label:"Apport de capital",value:"Apport de capital"},
            ])
        },
        "B8-1"=>{
            label:"temps_plein",
            q:"Etes-vous à temps plein ?",
            desc:"",
            type:QYesNo,
        },
        "B8-2"=>{
            label:"temps",
            q:"Combien de temps en heures par semaine prend votre travail de responsable de la ferme ? (approximativement) ",
            desc:"",
            type:QInt,
        },
        "B8-3"=>{
            label:"temps_cmt",
            q:"Commentaire",
            desc:"",
            type:QText,
        },
        
    ];

    public static function get(k){
       
        var q = new Question();
        q.qid = k;
        q.data = questions[k];
        return q;
    }

    public static function getForm(qs:Array<Question>){

        var form = new sugoi.form.Form("q");
        var r = db.Result.getOrCreate(App.current.user);

        //define a form render method
        form.toString = function(){
            var s:StringBuf = new StringBuf();
            s.add(form.getOpenTag());
            if (form.isSubmitted()) s.add(form.getErrors());

            for ( element in form.getElements() ){
                if (element != form.submitButton && element.internal == false) {
                    s.add("<div class='row' style='margin-bottom:12px'><div class='col-md-6'>"+element.label+"</div>\n");
                    s.add("<div class='col-md-6'>"+element.render()+"</div></div>\n");                    
                }               
            }                                 

            //submit button
            form.submitButton = new Submit('submit',  'Valider');
            form.submitButton.parentForm = form;            
            s.add( "<div style='margin-top:8px;' class='text-center'>"+ form.submitButton.render() + "</div>");            
            s.add( form.getCloseTag() );

            return s.toString();
        }

        for ( i in 0...qs.length){
            var q = qs[i];
            var html = "<h4>"+q.data.q+"</h4><p>"+q.data.desc+"</p>";
            var v : Dynamic = Reflect.field(r,q.data.label);
            var e : sugoi.form.FormElement<Dynamic> = null;
            switch(q.data.type){
            case QText : e = new sugoi.form.elements.TextArea(q.data.label,html,v,true);
            case QCheckbox(data,other) :
                //v = "[bla,blo]"
                if(v!=null) v = v.substr(1,v.length-2).split(",");
                if(other){
                    e = new form.Checkboxes(q.data.label,html,data,v,null,null);
                }else{
                    e = new sugoi.form.elements.CheckboxGroup(q.data.label,html,data,v,null,null);
                }
                
            case QRadio(data) : e = new sugoi.form.elements.RadioGroup(q.data.label,html,data,v,null,null);
            case QInt : e = new sugoi.form.elements.IntInput(q.data.label,html,v,true);
            case QYesNo :
                var data = [{"label":"Oui",value:"OUI"},{label:"Non",value:"NON"}];
                e = new sugoi.form.elements.RadioGroup(q.data.label,html,data,v,null,null);
                untyped e.vertical = false; 
            default : e = new sugoi.form.elements.StringInput(q.data.label,html,v,true);
            }

            if(q.data.label.indexOf("cmt")>-1 || q.data.label.indexOf("autre")>-1) e.required = false;

            form.addElement(e);
            
        }      

        return form;
    }

   /* public function getNext():Question{

        //trouver le chapitre
        for(c in chapitres){
            for(i in 0...c.ordre.length){
                var q = c.ordre[i].;
                if(q==this.qid && c.ordre[i+1]!=null) return get(c.ordre[i+1]);            
            }
        }
        return null;
    }*/

    public static function  next(c:Int,i:Int){

        if(Question.chapitres[c]==null) return null;
        if(Question.chapitres[c].ordre[i+1]==null) return null;
        
        return {chapitre:c,index:i+1};
    }

    public static function save(f:sugoi.form.Form){

       var r = db.Result.getOrCreate(App.current.user);

        f.toSpod(r);

        //Reflect.setField(r,this.data.label,f.getValueOf("q"));

        r.update();

    }


}