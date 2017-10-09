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
                {qs:["A2"],titre:"Localisation",desc:"Adresse du siège de la ferme (rue, lieu-dit, code postal, commune)"},
                {qs:["A3"],titre:"Form juridique",desc:"Statut social de la ferme"},
                {qs:["A4-1","A4-2"],titre:"Année d’installation de la ferme"},
                {qs:["A5-1","A5-2"],titre:"Responsable(s) de la ferme",desc:"Nombre de personnes partageant les décisions sur la ferme"},
                {qs:["A6-1","A6-2"],titre:"Activité(s) de la ferme"},               
                {qs:["A7-1","A7-2"],titre:"Autres travailleurs",desc:"Travailleurs autres que les responsables de la ferme dont les aides familiaux, le ou la conjoint(e). "},
                {qs:["A8-1","A8-2","A8-3","A8-4"],titre:"Accueil de stagiaire(s), apprenti(s), service(s) civique(s), bénévole(s)"},
                {qs:["A9-1","A9-3"],titre:"SIQO(s), label(s), marque(s)",desc:"Garantie permettant de reconnaître les produits qui bénéficient d’un signe officiel d'identification de la qualité et de l’origine."},
                {qs:["A10-1","A10-3","A10-5"],titre:"Mode de faire-valoir des terres et des bâtiments",desc:"Direct (propriétaire), indirect (location) ou mixte (parcelles en location et en propriété). Exemples pour la catégorie « Autres » : terres utilisées à titre gratuit, illégalement, etc."},
            ],
        },
        {
            id:"B",
            nom:"Généralités sur le(s) reponsable(s) de la ferme",
            ordre:[
                {qs:["B1","B2","B3","B4"],titre:"",desc:""},
                {qs:["B5-1","B5-2"],titre:"Formation et Expérience",desc:""},
                {qs:["B6-1","B6-2","B6-3","B6-4","B6-5"],titre:"Parcours",desc:""},
                {qs:["B7"],titre:"Responsabilités sur la ferme",desc:"Tâches principales du responsable sur la ferme."},
                {qs:["B8-1","B8-2","B8-3"],titre:"Temps de travail",desc:"Temps de travail du responsable."},
                {qs:["B9-1","B9-2","B9-3","B9-4"],titre:"Couverture Sociale / Statut du responsable",desc:""},
                {qs:["B10-1","B10-2","B10-3","B10-4"],titre:"Pluriactivité ",desc:"Agriculteur à titre exclusif, en pluriactivité agricole ou non."},
                {qs:["B11"],titre:"Revenu"},
                
            ]
        },
        {
            id:"C",
            nom:"Œuvrer pour l'agro-écosystème",
            ordre:[
                {qs:["C1-1","C1-2"],titre:"Eau",desc:""},
                {qs:["C2-1","C2-2"],titre:"Ressources énergétiques",desc:"(bois, travail manuel, panneaux solaires, éoliennes, etc.)"},
                {qs:["C3-1","C3-2"],titre:"Sol",desc:""},
                {qs:["C4-1","C4-2"],titre:"Air",desc:""},
                {qs:["C5-1","C5-2"],titre:"Biodiversité",desc:""},
                {qs:["C6-1","C6-2"],titre:"Paysages",desc:"(ce qui fait la beauté, l’identité du paysage)"},
                
                
            ]
        },
        {
            id:"D",
            nom:"S'inscrire dans le territoire",
            ordre:[
                {qs:["D1-1","D1-2","D1-3","D1-4","D1-5","D1-6","D1-7","D1-8"],titre:"Échelle d'activité",desc:""},
                {qs:["D2"],titre:"Ouverture",desc:"Relation plus ou moins étroite entretenue par la ferme avec le territoire."},
                {qs:["D3-1","D3-2","D3-3","D3-4","D3-5","D3-6"],titre:"Appartenance et participation à des réseaux",desc:"Liens que développe la ferme avec d’autres acteurs du monde agricole et non agricole, en lien avec la thématique « écosystèmes, agricultures, alimentation »."},
            ]
        },
        {
            id:"E",
            nom:"Exercer une activité agricole professionnelle, diversifiée et de petite dimension",
            ordre:[
                {qs:["E1-1","E1-2","E1-3","E1-4"],titre:"Taille",desc:""},
                {qs:["E2-1","E2-2","E2-3"],titre:"Volume d'activité",desc:""},
            ]
        },
        {
            id:"F",
            nom:"tendre vers l'autonomie",
            ordre:[
                {qs:["F1-1","F1-2","F1-3"],titre:"Maîtrise des moyens de production",desc:"D’après la FAO, il s’agit de la main-d’œuvre, des bâtiments agricoles, des machines ou animaux de trait utilisés pour rendre sa ferme autonome. Par extension, nous prenons en compte le foncier, l’approvisionnement en énergie, en semence et en alimentation du bétail. Ex : la fabrication par soi-même des aliments des animaux de la ferme, installation de panneaux solaire, etc. Le terme « maitriser » peut renvoyer à la notion d’autoproduction, d’auto-construction (semences, plants, engrais, foin, matériel, bâtiments, etc.)."},
                {qs:["F2-1","F2-2","F2-3"],titre:"Stratégie de développement OU plutôt « Rythme d’évolution »",desc:"Renseigne sur la vitesse de réalisation des actions en faveur des objectifs de la ferme. Par ex., dans le cas d’une expérimentation à la ferme de techniques, le choix peut être fait : - de mettre en œuvre la technique sans tester mais sur la confiance de lectures et/ou conseils - de tester une ou plusieurs pratiques, d’attendre plus ou moins longtemps pour l’adopter voire d’attendre que des références techniques soient publiées.Ces choix traduisent un rythme d’évolution plus ou moins progressif."},
                {qs:["F3-1","F3-2"],titre:"Recherche de la robustesse",desc:"La robustesse d'une exploitation agricole correspond à sa capacité à s’adapter à différents types de fluctuations (environnementales, sociales, économiques), à des conditions nouvelles et à supporter des perturbations/chocs externes (Zahm F. et al, 2015)"},
                {qs:["F4-1","F4-2"],titre:"Liberté dans la prise de décision",desc:"Donne une idée du degré d’indépendance des choix pris par l’agriculteur sur la ferme. Ex : un paysan endetté peut se faire dicter des décisions par les créanciers (les organismes agricoles, organismes financiers…)."},
            ]
        },
        {
            id:"G",
            nom:"Réaliser un projet de vie",
            ordre:[
                {qs:["G1-1","G1-2"],titre:"Qualité de vie",desc:"La qualité de vie implique le bien-être ressenti (INSEE, 2013) de l’agriculteur vis-à-vis  son activité mais également vis-à-vis de son environnement. Dans quelle condition (morale, physique et environnementale) travaille-t-il ? Est-il constamment stressé par son travail ? A-t-il  des contraintes financières ? Équivalent à la notion de « Degré d’épanouissement personnel »."},
                {qs:["G2-1","G2-2"],titre:"Adéquation avec les attentes",desc:"Renseigne sur le ressenti de l’agriculteur vis-à-vis du décalage possible entre ses aspirations avant installation et l’évolution réel de sa ferme."},
                {qs:["G3-1","G3-2","G3-3"],titre:"Vie sociale et culturelle",desc:"Renseigne sur l’importance des liens entre l’agriculteur et le monde extérieur."},
                {qs:["G4"],titre:"Implication de  l’entourage",desc:"Renseigne sur le recours à son entourage proche (famille, amis, voisins) pour aider sur la ferme."},
                {qs:["G5"],titre:"Lieu de vie",desc:""},
            ]
        },
        {
            id:"H",
            nom:"Questions finales",
            ordre:[
                {qs:["H1"],titre:"",desc:""},
                {qs:["H2-1","H2-2","H2-3"],titre:"",desc:""},
                {qs:["H3"],titre:"",desc:""},
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
            ],true),            
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
                {label:"Accueil du public",value:"accueil"},                
            ],true),
        },
        "A6-2" =>{
            label:"autres_activites",
            q:"Quelles sont les activités agricoles de la ferme ?",
            desc:"",                   
            type:QCheckbox([
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
            ],true),
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
            ],true),
        },
        "A10-3" =>{
            label:"faire_valoir_bati",
            q:"Si vous avez des bâtiments (hors serres), quel est leur mode de faire-valoir ?",
            desc:"",                   
            type:QRadio([
                {label:"Aucun bâtiment",value:"aucun"},
                {label:"Direct (propriétaire)",value:"direct"},
                {label:"Indirect (location)",value:"indirect"},
                {label:"Mixte (parcelles en location et en propriété)",value:"mixte"},
            ],true),
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
            label:"naissance_responsable",
            q:"Année de naissance",
            desc:"Afin de calculer votre âge, saisissez votre année de naissance",
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
            ],true)
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
            label:"ferme_familiale",
            q:"Si oui, votre ferme est-elle sur la ferme familiale ?",
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
            ],true)
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
        "B9-1"=>{
            label:"couverture_soc",
            q:"A quelle(s) couverture(s) sociale(s) êtes-vous affilié ?",
            desc:"",
            type:QCheckbox([
                {label:"MSA",value:"MSA"},
                {label:"ENIM",value:"ENIM"},
                {label:"CPAM",value:"CPAM"},
                {label:"CMU",value:"CMU"},
                {label:"Aucune",value:"Aucune"},
            ],true)
        },
        "B9-2"=>{
            label:"couverture_statut",
            q:"Quel est votre statut social ?",
            desc:"",
            type:QCheckbox([
                {label:"Chef d’exploitation",value:"chef_exploit"},
                {label:"Conjoint collaborateur",value:"conjoint_collab"},
                {label:"Conjoint Associé",value:"conjoint_assoc"},
                {label:"Associé",value:"associe"},
                {label:"Conjoint salarié",value:"conjoint_salar"},
                {label:"Salarié",value:"salarie"},
                {label:"Cotisant solidaire",value:"cotisant_solid"},
                {label:"Retraité",value:"retraite"},
                {label:"Non inscrit",value:"non_inscrit"},
                {label:"Aucun",value:"aucun"},
            ],true)
        },
        "B9-3"=>{
            label:"couverture_soc_precis",
            q:"Préciser",
            desc:"",
            type:QRadio([
                {label:"A titre principal",value:"principal"},
                {label:"A titre secondaire",value:"secondaire"},
                {label:"Non concerné",value:"non_concerne"},
            ])
        },
        "B9-4"=>{
            label:"couverture_cmt",
            q:"Commentaire",
            desc:"",
            type:QText
        },
        "B10-1"=>{
            label:"pluri_activite",
            q:"Exercez-vous d’autres activités agricoles ?",
            desc:"",
            type:QCheckbox([
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
            ],true),
        },
        "B10-2"=>{
            label:"pluri_activite_autre",
            q:"Exercez-vous d’autres activités non agricoles ?",
            desc:"",
            type:QText
        },
        "B10-3"=>{
            label:"pluri_activites_temps",
            q:"Pour chaque activité, quelle proportion de temps de travail y consacrez-vous ?",
            desc:"",
            type:QInt
        },
        "B10-4"=>{
            label:"pluri_activites_revenu",
            q:"Parmi ces activités, laquelle vous procure le plus de revenu ?",
            desc:"",
            type:QText
        },
        "B11"=>{
            label:"revenus",
            q:"Quelle est votre principale source de revenu ? Combien ?",
            desc:"",
            type:QText
        },
        "C1-1"=>{
            label:"eau_actions",
            q:"Quelles actions avez-vous déjà mis en œuvre ?",
            desc:"",
            type:QText
        },
        "C1-2"=>{
            label:"eau_projets",
            q:"Avez-vous d’autres projets pour gérer cette ressource ?",
            desc:"",
            type:QText
        },
        "C2-1"=>{
            label:"ress_actions",
            q:"Quelles actions avez-vous déjà mis en œuvre ?",
            desc:"",
            type:QText
        },
        "C2-2"=>{
            label:"ress_projets",
            q:"Avez-vous d’autres projets pour gérer cette ressource ?",
            desc:"",
            type:QText
        },
        "C3-1"=>{
            label:"sol_actions",
            q:"Quelles actions avez-vous déjà mis en œuvre ?",
            desc:"",
            type:QText
        },
        "C3-2"=>{
            label:"sol_projets",
            q:"Avez-vous d’autres projets pour gérer cette ressource ?",
            desc:"",
            type:QText
        },
        "C4-1"=>{
            label:"air_actions",
            q:"Quelles actions avez-vous déjà mis en œuvre ?",
            desc:"",
            type:QText
        },
        "C4-2"=>{
            label:"air_projets",
            q:"Avez-vous d’autres projets pour gérer cette ressource ?",
            desc:"",
            type:QText
        },
        "C5-1"=>{
            label:"biodiv_actions",
            q:"Quelles actions avez-vous déjà mis en œuvre ?",
            desc:"",
            type:QText
        },
        "C5-2"=>{
            label:"biodiv_projets",
            q:"Avez-vous d’autres projets pour gérer cette ressource ?",
            desc:"",
            type:QText
        },
        "C6-1"=>{
            label:"paysage_actions",
            q:"Quelles actions avez-vous déjà mis en œuvre ?",
            desc:"",
            type:QText
        },
        "C6-2"=>{
            label:"paysage_projets",
            q:"Avez-vous d’autres projets pour gérer cette ressource ?",
            desc:"",
            type:QText
        },
        "D1-1"=>{
            label:"production_sur_ferme",
            q:"Votre production se réalise-t-elle uniquement sur la ferme ? ",
            desc:"(dont cueillette)",
            type:QYesNo
        },
        "D1-2"=>{
            label:"production_ailleurs",
            q:"Si non, sur quel(s) autre(s) territoire(s) ?",
            desc:"",
            type:QCheckbox([
                {label:"Région",value:"region"},
                {label:"Pays",value:"pays"},
                {label:"Département",value:"departement"},
                {label:"Commune",value:"commune"},
            ])
        },
        "D1-3"=>{
            label:"origine_intrants",
            q:"Quelle est l’origine de vos intrants ?",
            desc:"",
            type:QCheckbox([
                {label:"Ne sais pas",value:"ne_sais_pas"},
                {label:"Région",value:"region"},
                {label:"Pays",value:"pays"},
                {label:"Département",value:"departement"},
                {label:"Commune",value:"commune"},
            ],true)
        },
        "D1-4"=>{
            label:"origine_materiel",
            q:"Quelle est l’origine de votre matériel ?",
            desc:"",
            type:QCheckbox([
                {label:"Ne sais pas",value:"ne_sais_pas"},
                {label:"Région",value:"region"},
                {label:"Pays",value:"pays"},
                {label:"Département",value:"departement"},
                {label:"Commune",value:"commune"},
            ],true)
        },
        "D1-5"=>{
            label:"origine_mainsdoeuvre",
            q:"Quelle est l’origine de votre main d’œuvre ?",
            desc:"",
            type:QCheckbox([
                {label:"Ne sais pas",value:"ne_sais_pas"},
                {label:"Région",value:"region"},
                {label:"Pays",value:"pays"},
                {label:"Département",value:"departement"},
                {label:"Commune",value:"commune"},
            ],true)
        },
        "D1-6"=>{
            label:"transfo_sur_ferme",
            q:"Votre transformation se réalise-t-elle uniquement sur la ferme ?",
            desc:"",
            type:QYesNo
        },
        "D1-7"=>{
            label:"transfo_territoire",
            q:"Si non, sur quel territoire ?",
            desc:"",
            type:QCheckbox([
                {label:"Région",value:"region"},
                {label:"Pays",value:"pays"},
                {label:"Département",value:"departement"},
                {label:"Commune",value:"commune"},
            ],true)
        },
        "D1-8"=>{
            label:"commerc_territoire",
            q:"Quelle est votre territoire de commercialisation ?",
            desc:"",
            type:QCheckbox([
                {label:"Ne sais pas",value:"ne_sais_pas"},
                {label:"Région",value:"region"},
                {label:"Pays",value:"pays"},
                {label:"Département",value:"departement"},
                {label:"Commune",value:"commune"},
            ],true)
        },
        "D2"=>{
            label:"particip_vie_collec",
            q:"Estimez-vous participer à la vie collective ?",
            desc:"",
            type:QText
        },
        "D3-1"=>{
            label:"reseaux",
            q:"l(s) type(s) de réseau(x) appartenez-vous ?",
            desc:"",
            type:QCheckbox([
                {label:"Amicaux / informels",value:"amicaux"},
                {label:"Réseaux sociaux sur internet",value:"internet"},
                {label:"Mouvement",value:"mouvement"},
                {label:"Association",value:"association"},
                {label:"Syndicat",value:"syndicat"},
                {label:"Organisme professionnel",value:"organisme"},
                {label:"Collectivités",value:"collectivite"},
            ],true)
        },
        "D3-2"=>{
            label:"reseaux_cmt",
            q:"Précisez",
            desc:"",
            type:QText
        },
        "D3-3"=>{
            label:"reseaux_activite",
            q:"L’appartenance à ces réseaux apporte-t-il une aide à votre activité ?",
            desc:"",
            type:QYesNo
        },
        "D3-4"=>{
            label:"reseaux_activite_cmt",
            q:"Précisez",
            desc:"",
            type:QText
        },
        "D3-5"=>{
            label:"reseaux_elu",
            q:"L’un des responsables est-il élu de la République ?",
            desc:"",
            type:QYesNo
        },
        "D3-6"=>{
            label:"reseaux_autres",
            q:"Participez-vous à d’autres formes de réseaux ? ",
            desc:"(débats, manifestations, réseau sociaux, etc.)",
            type:QText
        },
        "E1-1"=>{
            label:"surface",
            q:"Quelle est la surface occupée par votre activité agricole ?",
            desc:"en mètres-carré",
            type:QInt
        },
        "E1-2"=>{
            label:"surface_utile",
            q:"Surface Agricole Utile",
            desc:"en mètres-carré",
            type:QInt
        },
        "E1-3"=>{
            label:"surface_par_type",
            q:"Surface par type d’activité agricole (cf. liste MSA) Si élevage, nombre de tête",
            desc:"en mètres-carré",
            type:QText
        },
        "E1-4"=>{
            label:"surface_bat",
            q:"Surface des bâtiments, infrastructures et emprises ",
            desc:"(ex. zone de manutention, serres, local de stockage et de vente) en mètres-carré",
            type:QInt
        },
        "E2-1"=>{
            label:"quantite",
            q:"Pouvez-vous estimer les quantités produites ?",
            desc:"(si possible en kg, sinon unité libre)",
            type:QText
        },
        "E2-2"=>{
            label:"pourcentage",
            q:"Quelle part de la production est vendue ?",
            desc:"(en pourcentage)",
            type:QInt
        },
        "E2-3"=>{
            label:"commercialisation",
            q:"Quels sont les principaux modes de commercialisation que vous utilisez ?",
            desc:"",
            type:QCheckbox([
                {label:"Vente à la ferme",value:"VAF"},
                {label:"Marchés",value:"marches"},
                {label:"Evenements",value:"evenements"},
                {label:"Panier en ligne",value:"paniers"},
                {label:"Supérettes",value:"superette"},
                {label:"Epiceries",value:"epicerie"},
                {label:"Boutiques et caves",value:"boutique"},
                {label:"Restaurant",value:"restau"},
                {label:"Coopératives",value:"coop"},
                {label:"Grandes et moyennes surfaces",value:"GMS"},
                {label:"Exportation",value:"Exportation"},
            ],true)
        },
        "F1-1"=>{
            label:"maitrise_prod_actions",
            q:"Quelles actions avez-vous déjà mis en œuvre ?",
            desc:"",
            type:QText
        },
        "F1-2"=>{
            label:"maitrise_niveau",
            q:"Quel niveau de maitrise des moyens de production visez-vous ?",
            desc:"",
           type:QRadio([
                {label:"1",value:"1"},
                {label:"2",value:"2"},
                {label:"3",value:"3"},
                {label:"4",value:"4"},
                {label:"5",value:"5"}
            ])
        },
        "F1-3"=>{
            label:"maitrise_cmt",
            q:"Commentaire",
            desc:"",
            type:QText
        },
        "F2-1"=>{
            label:"calendrier_dev",
            q:"Avez-vous un calendrier de développement ?",
            desc:"",
            type:QText
        },
        "F2-2"=>{
            label:"stade_auto",
            q:"A quel stade de l’autonomie en sont vos activités ?",
            desc:"",
            type:QRadio([{label:"1",value:"1"},{label:"2",value:"2"},{label:"3",value:"3"},{label:"4",value:"4"},{label:"5",value:"5"} ])
        },
        "F2-3"=>{
            label:"autonomie_cmt",
            q:"Commentaire",
            desc:"",
            type:QText
        },
        "F3-1"=>{
            label:"robustesse",
            q:"Pensez-vous que votre exploitation peut s’adapter à différents types de perturbations ?",
            desc:"",
            type:QRadio([{label:"1",value:"1"},{label:"2",value:"2"},{label:"3",value:"3"},{label:"4",value:"4"},{label:"5",value:"5"} ])
        },
        "F3-2"=>{
            label:"robustesse_cmt",
            q:"Préciser",
            desc:"",
            type:QText
        },
        "F4-1"=>{
            label:"liberte_tech",
            q:"Pensez-vous maîtriser vos choix techniques ?",
            desc:"",
            type:QRadio([{label:"Très faiblement",value:"1"},{label:"Faiblement",value:"2"},{label:"Moyennement",value:"3"},{label:"Fortement",value:"4"},{label:"Très fortement",value:"5"} ])
        },
        "F4-2"=>{
            label:"liberte_commerc",
            q:"Avez-vous l’impression que votre structure économique est maîtrisée ?",
            desc:"",
            type:QText
        },
        "G1-1"=>{
            label:"qualite_note",
            q:"Comment appréciez-vous votre qualité de vie ?",
            desc:"",
            type:QRadio([{label:"Très mauvaise",value:"1"},{label:"Mauvaise",value:"2"},{label:"Intermédiaire",value:"3"},{label:"Bonne",value:"4"},{label:"Très bonne",value:"5"} ])
        },
        "G1-2"=>{
            label:"qualite_cmt",
            q:"Préciser",
            desc:"",
            type:QText
        },
        "G2-1"=>{
            label:"aspirations",
            q:"Votre vie actuelle d’agriculteur correspond-elle à vos aspirations ?",
            desc:"",
            type:QRadio([{label:"Très faiblement",value:"1"},{label:"Faiblement",value:"2"},{label:"Moyennement",value:"3"},{label:"Fortement",value:"4"},{label:"Très fortement",value:"5"} ])
        },
        "G2-2"=>{
            label:"aspirations_cmt",
            q:"Préciser",
            desc:"",
            type:QText
        },
        "G3-1"=>{
            label:"vie_sociale",
            q:"Rencontrez-vous plus de personnes (association, consommateurs, etc.) depuis votre installation ?",
            desc:"",
            type:QRadio([{label:"Peu",value:"1"},{label:"Moyennement",value:"2"},{label:"Beaucoup",value:"3"} ])
        },
        "G3-2"=>{
            label:"vie_sociale_modif",
            q:"Estimez-vous que votre vie sociale et culturelle se soit modifiée depuis votre installation ?",
            desc:"",
            type:QYesNo
        },
        "G3-3"=>{
            label:"vie_sociale_modif_cmt",
            q:"Précisez",
            desc:"",
            type:QText
        },
        "G4"=>{
            label:"entourage",
            q:"Votre entourage proche s’implique-t-il dans le travail de la ferme ?",
            desc:"",
            type:QCheckbox([
                {label:"Oui, des membres de ma famille",value:"famille"},
                {label:"Oui, des amis",value:"amis"},
                {label:"Oui, des voisins",value:"voisins"} ,
                {label:"Non",value:"non"} 
            ])
        },
        "G5"=>{
            label:"habitat",
            q:"Habitez-vous sur la ferme ?",
            desc:"",
            type:QRadio([
                {label:"Oui, tous les responsables",value:"tous"},
                {label:"Oui, une partie des responsables",value:"partie"},
                {label:"Non",value:"non"} 
            ])
        },
        "H1"=>{
            label:"objectifs",
            q:"Quels sont pour vous les objectifs principaux de votre ferme ?",
            desc:"",
            type:QText
        },
        "H2-1"=>{
            label:"definition",
            q:"D’après vous, qu’est qu’une micro-ferme ?",
            desc:"",
            type:QText
        },
        "H2-2"=>{
            label:"definition_ferme",
            q:"Considérez-vous votre ferme comme étant une micro-ferme ?",
            desc:"",
            type:QRadio([
                {label:"Oui",value:"OUI"},
                {label:"Non",value:"NON"},
                {label:"Ne sais pas",value:"..."} 
            ])
        },
        "H2-3"=>{
            label:"definition_cmt",
            q:"Préciser",
            desc:"",
            type:QText
        },
        "H3"=>{
            label:"remarques",
            q:"Avez-vous des remarques à ajouter ?",
            desc:"",
            type:QText
        },

    ];

    public static function get(k){
       
        var q = new Question();
        q.qid = k;
        q.data = questions[k];
        if(q.data==null) throw "La question "+k+" n'existe pas.";
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
            if(q==null || q.data==null) continue;
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
            case QInt : 
                e = new sugoi.form.elements.IntInput(q.data.label,html,v,true);
                //e.inputType = 
            case QYesNo :
                var data = [{"label":"Oui",value:"OUI"},{label:"Non",value:"NON"}];
                e = new sugoi.form.elements.RadioGroup(q.data.label,html,data,v,null,null);
                untyped e.vertical = false; 
            default : e = new sugoi.form.elements.StringInput(q.data.label,html,v,true);
            }

            /*if(q.data.label.indexOf("cmt")>-1 || q.data.label.indexOf("autre")>-1)*/
            e.required = false;

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