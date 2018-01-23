import Question;

class QData{



    

    /**
    Formulaire 3 'complet'
    **/
    public static var formulaire3 : Array<Chapitre>= [
        {
            id:"A",
            nom : "La ferme",
            ordre : [
                {qs:["A1"],titre:"Nom",desc:"Nom de la ferme. Si pas de nom, écrire le statut juridique ainsi que le nom de famille"},
                {qs:["A2"],titre:"Localisation",desc:"Adresse du siège de la ferme (rue, lieu-dit, code postal, commune)"},
                {qs:["A3"],titre:"Form juridique",desc:"Statut social de la ferme"},
                {qs:["A4-1","A4-2","A4-3"],titre:"Année d’installation de la ferme"},
                {qs:["A5-1","A5-2"],titre:"Responsable(s) de la ferme",desc:"Nombre de personnes partageant les décisions sur la ferme"},
                {qs:["A6-1","A6-2"],titre:"Activité(s) de la ferme"},               
                {qs:["A7-1","A7-2"],titre:"Autres travailleurs",desc:"Travailleurs autres que les responsables de la ferme dont les aides familiaux, le ou la conjoint(e). "},
                {qs:["A8-1","A8-2","A8-3","A8-4"],titre:"Accueil de stagiaire(s), apprenti(s), service(s) civique(s), bénévole(s)"},
                {qs:["A9-1","A9-3"],titre:"SIQO(s), label(s), marque(s)",desc:"Garantie permettant de reconnaître les produits qui bénéficient d’un signe officiel d'identification de la qualité et de l’origine."},
                {qs:["A10-1","A10-3","A10-5"],titre:"Mode de faire-valoir des terres et des bâtiments",desc:"Direct (propriétaire), indirect (location) ou mixte (parcelles en location et en propriété). Exemples pour la catégorie « Autres » : terres utilisées à titre gratuit, illégalement, etc."},
            ],
        },
        {
            id:"B", // q/1/0
            nom:"Le(s) responsable(s)",
            ordre:[
                {qs:["B1","B2","B3","B4"],titre:"",desc:""},
                {qs:["B5-1","B5-2"],titre:"Formation et Expérience",desc:""},
                {qs:["B6-1","B6-2","B6-3","B6-4","B6-5"],titre:"Parcours",desc:""},
                {qs:["B7"],titre:"Responsabilités sur la ferme",desc:"Tâches principales du responsable sur la ferme."},
                {qs:["B8-1","B8-2","B8-3"],titre:"Temps de travail",desc:"Temps de travail du responsable."},
                {qs:["B9-1","B9-2","B9-3","B9-4"],titre:"Couverture Sociale / Statut du responsable",desc:""},
                {qs:["B10-1","B10-2","B10-4"],titre:"Pluriactivité ",desc:"Agriculteur à titre exclusif, en pluriactivité agricole ou non."},
                {qs:["B11"],titre:"Revenu"},                
            ]
        },
        {
            id:"C",
            nom:"Gestion des ressources",
            ordre:[
                {qs:[],titre:"Gestion des ressources",desc:"Les questions suivantes concernent 6 ressources :<br/>l’eau, l’énergie, le sol, l’air, la biodiversité et le paysage. "},
                {qs:["C1-1","C1-2"],titre:"Eau",desc:""},
                {qs:["C2-1","C2-2"],titre:"Ressources énergétiques",desc:"(bois, travail manuel, panneaux solaires, éoliennes, etc.)"},
                {qs:["C3-1","C3-2"],titre:"Sol",desc:""},
                {qs:["C4-1","C4-2"],titre:"Air",desc:"Par exemple : rejets de gaz à effet de serre, soit direct (utilisation d’engins polluants, beaucoup de transport)<br/>ou indirect (utilisation d’intrants dont la fabrication ou l’acheminement utilise des énergies fossiles)"},
                {qs:["C5-1","C5-2"],titre:"Biodiversité",desc:""},
                {qs:["C6-1","C6-2"],titre:"Paysages",desc:"(ce qui fait la beauté, l’identité du paysage)"},
                
                
            ]
        },
        {
            id:"D",
            nom:"Territoire",
            ordre:[
                {qs:["D1-1","D1-2","D1-3","D1-4","D1-5","D1-6","D1-7","D1-8"],titre:"Échelle d'activité",desc:""},
                {qs:["D2"],titre:"Ouverture",desc:"Relation plus ou moins étroite entretenue par la ferme avec le territoire."},
                {qs:["D3-1",/*"D3-2","D3-3","D3-4",*/"D3-5","D3-5b","D3-6"],titre:"Appartenance et participation à des réseaux",desc:"Liens que développe la ferme avec d’autres acteurs du monde agricole et non agricole, en lien avec la thématique « écosystèmes, agricultures, alimentation »."},
            ]
        },
        {
            id:"E",
            nom:"Activité",
            ordre:[
                {qs:["E1-1","E1-3","E1-4"],titre:"Taille",desc:""},
                {qs:["E2-1","E2-2","E2-2b","E2-3"],titre:"Volume d'activité",desc:""},
                {qs:["E3-1","E3-2","E3-3"],titre:"Finances",desc:""}
            ]
        },
        {
            id:"F",
            nom:"Autonomie",
            ordre:[
                {qs:["F1-1","F1-2","F1-3"],titre:"Maîtrise des moyens de production",desc:"Il s’agit de la main-d’œuvre, des bâtiments agricoles, des machines ou animaux de trait utilisés pour rendre sa ferme autonome. Par extension, nous prenons en compte le foncier, l’approvisionnement en énergie, en semence et en alimentation du bétail. Ex : la fabrication par soi-même des aliments des animaux de la ferme, installation de panneaux solaire, etc. Le terme « maitriser » peut renvoyer à la notion d’autoproduction, d’auto-construction (semences, plants, engrais, foin, matériel, bâtiments, etc.)."},
                {qs:["F2-1","F2-2","F2-3"],titre:"Stratégie de développement",desc:"Renseigne sur la vitesse de réalisation des actions en faveur des objectifs de la ferme.<br/>Vos choix traduisent un rythme d’évolution plus ou moins progressif."},
                {qs:["F3-1","F3-2"],titre:"Recherche de la robustesse",desc:"Renseigne sur la capacité d'une ferme à s’adapter à différents types de fluctuations (environnementales, sociales, économiques), à des conditions nouvelles et à supporter des perturbations/chocs externes"},
                {qs:["F4-1","F4-2","F4-3"],titre:"Liberté dans la prise de décision",desc:"Donne une idée du degré d’indépendance des choix pris par l’agriculteur sur la ferme.<br/>Ex : un agriculteur endetté peut se faire dicter des décisions par les créanciers (les organismes agricoles, organismes financiers…)."},
            ]
        },
        {
            id:"G",
            nom:"Projet de vie",
            ordre:[
                {qs:["G1-1","G1-2"],titre:"Qualité de vie",desc:"La qualité de vie implique le bien-être ressenti du ou de la responsable de la ferme vis-à-vis son activité mais également vis-à-vis de son environnement.<br/>Etes-vous constamment stressé par votre travail ?<br/>Avez-vous des contraintes financières ?<br/>Dans quelle condition (morale, physique et environnementale) travaillez-vous ?"},
                {qs:["G2-1","G2-2"],titre:"Adéquation avec les attentes",desc:"Renseigne sur le ressenti de l’agriculteur vis-à-vis du décalage possible entre ses aspirations avant installation et l’évolution réel de sa ferme."},
                {qs:["G3-1","G3-2","G3-3"],titre:"Vie sociale et culturelle",desc:"Renseigne sur l’importance des liens entre le ou la responsable de la ferme et le monde extérieur."},
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
                {qs:["H3-2","H3-1"],titre:"",desc:""},
            ]
        }
    ];



    /**
     *  1er formulaire court 
     */
    public static var formulaire1 : Array<Chapitre>= [
        {
            id:"A",
            nom : "APPEL A RECENSEMENT DES MICROS-FERMES DE GIRONDE (5 mn)",
            ordre : [
                {qs:["A1","A1-1","A1-2","A1-3","A2","A6-1"],titre:"",desc:"Toute personne susceptible d’identifier une ferme comme ayant des caractéristiques de micro-fermes peut répondre à ce questionnaire (5 minutes) :\n citoyens, partenaires du programme MicroAgri et, bien évidemment, les agriculteurs et agricultrices se sentant concernés."},
                {qs:["A6-2"],titre:"",desc:""},
                {qs:["A11","A12"],titre:"",desc:""},
                
            ],
        },
    ];

    /**
     *  2e formulaire court
     **/
     public static var formulaire2 : Array<Chapitre>= [
        {
            id:"A",
            nom : "APPEL A RECENSEMENT DES MICROS-FERMES DE GIRONDE (10 mn)",
            ordre : [
                {qs:["A13","B9-2","A3"],titre:"",desc:"Cette deuxième partie de formulaire est uniquement à destination de l’un ou l’une des responsables de la ferme (personne en charge des décisions sur la ferme)."},
                {qs:["E1-3"],titre:"",desc:""},
                {qs:["A10-1","A10-3"],titre:"Mode de faire-valoir des terres et des bâtiments",desc:"Exemples pour la catégorie « Autres » : terres utilisées à titre gratuit, illégalement, etc."},
                {qs:["B8-2"],titre:"Temps de travail agricole",desc:"Temps de travail agricole : production et actes en prolongement de la production (transformation, commercialisation, etc.)"},
                {qs:["D3-2","D2","D4","D5","D6","D7"],titre:"",desc:""},
                {qs:["H3-3"],titre:"Merci !",desc:""},
            ],
        },
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
            q:"Quel est le nom de la ferme ?",
            desc:"",                    
            type:QString,
        },
        "A1-1"=>{
            label:"nom_responsables",
            q:"Nom du ou des responsable(s) de la ferme",
            desc:"",
            type:QString,
        },
        "A1-2"=>{
            label:"email",
            q:"Email du responsable de la ferme",
            desc:"",
            type:QString,
        },
        "A1-3"=>{
            label:"telephone",
            q:"Numéro de téléphone du responsable de la ferme",
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
        "A4-3" =>{
            label:"Annee_crea_cmt",
            q:"Commentaire",
            desc:"",                   
            type:QText,
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
                {label:"Production",        value:"production"},
                {label:"Transformation",    value:"transformation"},
                {label:"Commercialisation", value:"commercialisation"},
                {label:"Accueil du public", value:"accueil"},                
            ],true),
        },
        "A6-2" =>{
            label:"autres_activites",
            q:"Quelles sont les activités agricoles de la ferme ?",
            desc:"",                   
            type:QCheckbox([
                /*{label:"Viticulture",value:"viticulture"},
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
                {label:"Activités de pêche maritime à pied",value:"peche_a_pied"},*/
                {label:"Céréales, légumineuses et oléagineuses",value:"cereales"},
                {label:"Culture de légumes et maraîchage",value:"maraichage"},
                {label:"Autres cultures non permanentes",value:"autres_cult_non_perm"},
                {label:"Viticulture",value:"viticulture"},
                {label:"Culture de fruitiers",value:"fruitiers"},
                {label:"Plantes à épices, aromatiques, médicinales et pharmaceutiques",value:"aromatiques"},
                {label:"Autres cultures permanentes",value:"autres_cult_perm"},
                {label:"Production de semences et reproduction de plants",value:"semences"},
                {label:"Aquaponie",value:"aquaponie"},
                {label:"Polyculture-élevage",value:"polyculture-elevage"},
                {label:"Elevage de bovins",value:"bovins"},
                {label:"Elevage d’ovins ou caprins",value:"ovins_caprins"},
                {label:"Élevage de porcins",value:"porcins"},
                {label:"Élevage de volailles",value:"volailles"},
                {label:"Elevages mixtes",value:"elevage_mixte"},
                {label:"Autres élevages (dont équidés)",value:"autres_elevages"},
                {label:"Sylviculture et autres activités forestières",value:"sylviculture"},
                {label:"Aquaculture en mer ou en eau douce",value:"aquaculture"},
                {label:"Pêche en mer ou en eau douce",value:"peche"},
                {label:"Ecolieu",value:"ecolieu"},
                
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
                {label:"Aucune",value:"Aucune"},
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
                {label:"Uniquement propriétaire",value:"proprietaire"},
                {label:"Uniquement locataire",value:"locataire"},
                {label:"Mixte, propriété majoritaire",value:"mixte_prop"},
                {label:"Mixte, location majoritaire",value:"mixte_loca"},
                {label:"Sans terre",value:"aucun"},
                {label:"Autre",value:"autre"},
            ],false),
        },
        "A10-3" =>{
            label:"faire_valoir_bati",
            q:"Si vous avez des bâtiments (hors serres), quel est leur mode de faire-valoir ?",
            desc:"",                   
            type:QRadio([                
                {label:"Uniquement propriétaire",value:"proprietaire"},
                {label:"Uniquement locataire",value:"locataire"},
                {label:"Mixte, propriété majoritaire",value:"mixte_prop"},
                {label:"Mixte, location majoritaire",value:"mixte_loca"},
                {label:"Aucun bâtiment",value:"aucun"},
                {label:"Autre",value:"autre"},
            ],false),
        },
        "A10-5" =>{
            label:"faire_valoir_cmt",
            q:"Commentaire",
            desc:"",                   
            type:QText,
        },
        "A11" =>{
            label:"carac_microferme",
            q:"Caractéristiques",
            desc:"Donner ici les caractéristiques qui vous permettent d'identifier la ferme comme étant une micro-ferme (surface, taille du cheptel, mode(s) de commercialisation, certification(s), etc.",                   
            type:QText,
        },
        "A12" =>{
            label:"carte_microferme",
            q:"Si vous êtes l’un(e) des responsables de la ferme, souhaitez-vous que votre ferme apparaisse sur notre carte des micro-fermes de Gironde ?",
            desc:"",                   
            type:QYesNo,
        },
        "A13" =>{
            label:"siret",
            q:"Si votre activité est enregistrée, donnez le numéro de SIRET de la ferme",
            desc:"",                   
            type:QString,
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
            q:"Etes-vous issus d’une famille d’agriculteurs ?",
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
            q:"Combien de temps travaillez-vous par an ? (En heures)",
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
            q:"Précisez",
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
            desc:"Rencontrez-vous ou avez-vous rencontré des difficultés ?<br/>Etes-vous satisfait de votre couverture sociale ?",
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
            ],true,[{label:"Pourcentage de votre temps investi dans cette activité",value:"percentage"}] ),
        },
        "B10-2"=>{
            label:"pluri_activite_autre",
            q:"Exercez-vous d’autres activités non agricoles ?",
            desc:"",
            type:QText
        },
       /* "B10-3"=>{
            label:"pluri_activites_temps",
            q:"Pour chaque activité, quelle proportion de temps de travail y consacrez-vous ?",
            desc:"",
            type:QInt
        },*/
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
                {label:"Autre",value:"autre"},
            ],false,[{label:"Précisez si nécéssaire",value:"detail"}])
        },
        "D4"=>{
            label:"appro_env_proch",
            q:"Vous approvisionnez-vous dans un environnement proche pour :",
            desc:"",
            type:QCheckbox([
                {label:"Vos intrants",value:"intrants"},
                {label:"Votre matériel (achat,location)",value:"materiel"},
                {label:"Votre main d'oeuvre",value:"main_doeuvre"},
                {label:"La transformation",value:"transformation"},
                {label:"La commercialisation",value:"commercialisation"},                
            ],false)
        },
        "D5"=>{
            label:"demarche_autonomie",
            q:"Etes-vous dans une démarche d’autonomie pour :",
            desc:"",
            type:QCheckbox([
                {label:"Vos intrants",value:"intrants"},
                {label:"Votre matériel (achat,location)",value:"materiel"},
                {label:"Votre main d'oeuvre",value:"main_doeuvre"},
                {label:"Vos ressources financières",value:"finance"},
            ],false)
        },
        "D6"=>{
            label:"importance_agroecologie",
            q:"Comment estimez-vous l’importance de la dimension agro-écologique  dans vos pratiques ?",
            desc:"",
            type:QRadio([
                {label:"Pas du tout",value:"0"},
                {label:"Un peu",value:"1"},
                {label:"Beaucoup",value:"2"},
                {label:"Très fortement",value:"3"},
            ],false)
        },
        "D7"=>{
            label:"devel_pratique_agroeco",
            q:"Avez-vous des projets pour développer des pratiques agro-écologiques ?",
            desc:"",
            type:QRadio([
                {label:"Pas du tout",value:"0"},
                {label:"Un peu",value:"1"},
                {label:"Beaucoup",value:"2"},
                {label:"Très fortement",value:"3"},
            ],false)
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
                {label:"Autre",value:"autre"},
            ],false,[{label:"Précisez si nécéssaire",value:"detail"}])
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
                {label:"Autre",value:"autre"},
            ],false,[{label:"Précisez si nécéssaire",value:"detail"}])
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
                {label:"Autre",value:"autre"},
            ],false,[{label:"Précisez si nécéssaire",value:"detail"}])
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
                {label:"Autre",value:"autre"},
            ],false,[{label:"Précisez si nécéssaire",value:"detail"}])
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
                {label:"Autre",value:"autre"},
            ],false,[{label:"Précisez si nécéssaire",value:"detail"}])
        },
        "D2"=>{
            label:"particip_vie_sociale",
            q:"Comment évaluez-vous votre participation à la vie sociale de votre environnement proche ?",
            desc:"",
            type:QRadio([
                {label:"Pas du tout",value:"0"},
                {label:"Un peu",value:"1"},
                {label:"Beaucoup",value:"2"},
                {label:"Très fortement",value:"3"},
            ])
        },
        "D3-1"=>{
            label:"reseaux_ext",
            q:"A quel(s) type(s) de réseau(x) appartenez-vous ?",
            desc:"",
            type:QCheckbox([
                {label:"Amicaux / informels",value:"amicaux"},
                {label:"Réseaux sociaux sur internet",value:"internet"},
                {label:"Mouvement",value:"mouvement"},
                {label:"Association",value:"association"},
                {label:"Syndicat",value:"syndicat"},
                {label:"Organisme professionnel",value:"organisme"},
                {label:"Collectivités",value:"collectivite"},
                {label:"Autre",value:"autre"},
            ],true,[{label:"Nom du réseau",value:"nom"},{label:"Cela vous apporte t'il de l'aide ? (oui/non)",value:"aide"},{label:"Précisez",value:"detail"}])
        },
        "D3-2"=>{
            label:"reseaux",
            q:"A quel(s) type(s) de réseau(x) appartenez-vous ?",
            desc:"",
            type:QCheckbox([
                {label:"Amicaux / informels",value:"amicaux"},
                {label:"Réseaux sociaux sur internet",value:"internet"},
                {label:"Mouvement",value:"mouvement"},
                {label:"Association",value:"association"},
                {label:"Syndicat",value:"syndicat"},
                {label:"Organisme professionnel",value:"organisme"},
                {label:"Collectivités",value:"collectivite"},
                {label:"Autre",value:"autre"},
            ])
        },
        "D3-3"=>{
            label:"reseaux_activite",
            q:"L’appartenance à ces réseaux apporte-t'elle une aide à votre activité ?",
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
        "D3-5b"=>{
            label:"reseaux_elu_cmt",
            q:"Si oui, précisez",
            desc:"",
            type:QText
        },
        "D3-6"=>{
            label:"reseaux_autres",
            q:"Participez-vous à d’autres formes de réseaux ? ",
            desc:"(débats, manifestations, etc.)",
            type:QText
        },
        "E1-1"=>{
            label:"surface",
            q:"Quelle est la surface totale occupée par votre activité agricole ?",
            desc:"En mètres-carré",
            type:QInt
        },
        /*"E1-2"=>{
            label:"surface_utile",
            q:"Surface Agricole Utile",
            desc:"en mètres-carré",
            type:QInt
        },*/
        /*"E1-3"=>{
            label:"surface_par_type",
            q:"Surface par type d’activité agricole",
            desc:"Surface en mètres-carré. Si élevage, en nombre de têtes",
            type:QMultiInput([{label:"Surface en m² / Nbre de têtes",value:"surface"}])
        },*/
        "E1-3"=>{
            label:"surface_par_type",
            q:"Dimension de l'activité agricole",
            desc:"Superficies (utilisation du sol, en hectares)",
            type:QCheckbox([
                 {label:"A - Terres arables",value:"arables"},
                {label:"...dont maraîchage",value:"maraich"},
                {label:"...dont sous serres",value:"serres"},
                {label:"B - Cultures permanentes",value:"cult_perm"},
                {label:"...dont verger",value:"verger"},
                {label:"C - Surface toujours en Herbe",value:"herbe"},
                {label:"D - Superficies non agricoles (étang,bois,etc.)",value:"non_agri"},
                {label:"E - Surfaces non mises en culture (bâtiments,chemins,haies)",value:"non_cult"},
                {label:"Superficie totale de l'exploitation (A+B+C+D+E)",value:"total"},
                {label:"Autres superficies utilisées pour la production (communaux,parcours,estives,forêts domaniales,etc.)",value:"autre_sup"},
                ]
                ,null,
                [{label:"Superficie (ha)",value:"ha"}]

            )
        },
        "E1-4"=>{
            label:"surface_bat",
            q:"Surface des bâtiments, infrastructures et emprises ",
            desc:"(ex. zone de manutention, serres, local de stockage et de vente) en mètres-carré",
            type:QMultiInput([{"label":"Type de bâtiment",value:"type"},{label:"Surface",value:"surface"}])
        },
        "E2-1"=>{
            label:"quantite",
            q:"Pouvez-vous estimer les quantités produites par an ?",
            desc:"Si possible en kg, sinon unité libre. Vous pouvez faire une estimation à la louche.",
            type:QText
        },
        "E2-2"=>{
            label:"pourcentage",
            q:"Quelle part de la production est vendue ?",
            desc:"(en pourcentage)",
            type:QInt
        },
        "E2-2b"=>{
            label:"pourcentage_cmt",
            q:"Précisez",
            desc:"",
            type:QText
        },
        "E2-3"=>{
            label:"commercialisation",
            q:"Quels sont les principaux modes de commercialisation que vous utilisez ?",
            desc:"",
            type:QCheckbox([
                {label:"Vente à la ferme",value:"VAF"},
                {label:"Marchés",value:"marches"},
                {label:"Evenements",value:"evenements"},
                {label:"Paniers",value:"paniers"},
                {label:"Sur Internet",value:"internet"},
                {label:"Supérettes",value:"superette"},
                {label:"Epiceries",value:"epicerie"},
                {label:"Boutiques et caves",value:"boutique"},
                {label:"Restaurant",value:"restau"},
                {label:"Coopératives",value:"coop"},
                {label:"Grandes et moyennes surfaces",value:"GMS"},
                {label:"Exportation",value:"Exportation"},
            ],true,[{label:"Proportion du C.A",value:"ca"},{label:"Proportion du volume",value:"vol"}])
        },
        "E3-1"=>{
            label:"chiffre_affaire",
            q:"Chiffre d'affaire annuel",
            desc:"En euros",
            type:QInt
        },
        "E3-2"=>{
            label:"charges",
            q:"Charges annuelles",
            desc:"En euros",
            type:QInt
        },
        "E3-3"=>{
            label:"endettement",
            q:"Endettement",
            desc:"En euros",
            type:QInt
        },
        "F1-1"=>{
            label:"maitrise_prod_actions",
            q:"Quelles actions avez-vous déjà mises en œuvre ?",
            desc:"",
            type:QText
        },
        "F1-2"=>{
            label:"maitrise_niveau",
            q:"Quel niveau de maitrise des moyens de production visez-vous ? (de 1 à 5)",
            desc:"",
           type:QFloat
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
            type:QYesNo
        },
        "F2-2"=>{
            label:"stade_auto",
            q:"A quel stade de l’autonomie en sont vos activités ?  (de 1 à 5)",
            desc:"",
            type:QFloat
        },
        "F2-3"=>{
            label:"autonomie_cmt",
            q:"Commentaire",
            desc:"",
            type:QText
        },
        "F3-1"=>{
            label:"robustesse",
            q:"Pensez-vous que votre exploitation peut s’adapter à différents types de perturbations ?  (de 1 à 5)",
            desc:"",
            type:QFloat
        },
        "F3-2"=>{
            label:"robustesse_cmt",
            q:"Précisez",
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
            type:QYesNo
        },
        "F4-3"=>{
            label:"liberte_commerc_cmt",
            q:"Commentaire",
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
            q:"Précisez",
            desc:"",
            type:QText
        },
        "G2-1"=>{
            label:"aspirations",
            q:"Votre vie actuelle de responsable de la ferme correspond-elle à vos aspirations ?",
            desc:"",
            type:QRadio([{label:"Très faiblement",value:"1"},{label:"Faiblement",value:"2"},{label:"Moyennement",value:"3"},{label:"Fortement",value:"4"},{label:"Très fortement",value:"5"} ])
        },
        "G2-2"=>{
            label:"aspirations_cmt",
            q:"Précisez",
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
            q:"Quels sont les objectifs principaux de votre ferme ?",
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
            q:"Précisez",
            desc:"",
            type:QText
        },
        "H3-1"=>{
            label:"remarques",
            q:"Avez-vous des remarques à ajouter ?",
            desc:"",
            type:QText
        },
        "H3-2"=>{
            label:"recontacter",
            q:"J'accepte d'être éventuellement recontacté par le coordinateur de MicroAgri pour des nouvelles concernant l’avancée du programme, des mises en relation, un suivi dans le cadre des recherches actuellement menées, etc.",
            desc:"",
            type:QYesNo
        },
         "H3-3"=>{
            label:"form_complet",
            q:"Merci d’avoir répondu à ce questionnaire de pré-recensement. Seriez-vous favorable à ce que le coordinateur du programme MicroAgri vous recontacte pour compléter un questionnaire plus détaillé ?",
            desc:"(environ 1h-1h30, soit par téléphone, soit en entretien à la ferme).",
            type:QYesNo
        },

    ];


    public static var formulaires = [
        1 => {nom:"APPEL A RECENSEMENT DES MICROS-FERMES DE GIRONDE (5 mn)", startScreen:"/answers", endScreen:"/title",chapitres:QData.formulaire1},
        2 => {nom:"APPEL A RECENSEMENT DES MICROS-FERMES DE GIRONDE (10 mn)", startScreen:"/answers", endScreen:"/answers",chapitres:QData.formulaire2},
        3 => {nom:"Formulaire complet",startScreen:"/qhome",endScreen:"/qhome",chapitres:QData.formulaire3},
    ];

}