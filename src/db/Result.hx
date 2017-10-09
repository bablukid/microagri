package db;
import sys.db.Object;
import sys.db.Types;

class Result extends Object{

    public var id : SId;
    @:relation(userId) public var user : db.User;

    //généré par /shema    
var Nom:SNull<SString<128>>;
var Localisation:SNull<SString<256>>;
var Forme_juridique:SNull<SString<128>>;
var Annee_prod:SNull<SInt>;
var Annee_crea:SNull<SInt>;
var nbre_responsables:SNull<SInt>;
var nbre_responsables_cmt:SNull<SText>;
var activites:SNull<SString<128>>;
var autres_activites:SNull<SString<128>>;
var autres_travailleurs:SNull<SInt>;
var autres_travailleurs_temps:SNull<SInt>;
var stagiaires_num:SNull<SInt>;
var stagiaires_temps:SNull<SInt>;
var benevoles_num:SNull<SString<128>>;
var benevoles_temps:SNull<SString<128>>;
var siqo:SNull<SString<128>>;
var siqo_annee:SNull<SString<128>>;
var faire_valoir:SNull<SString<32>>;
var faire_valoir_bati:SNull<SString<32>>;
var faire_valoir_cmt:SNull<SText>;
var nom_responsable:SNull<SString<128>>;
var prenom_responsable:SNull<SString<128>>;
var sexe_responsable:SNull<SString<32>>;
var naissance_responsable:SNull<SInt>;
var formation:SNull<SString<128>>;
var experiences:SNull<SString<128>>;
var parcours:SNull<SString<32>>;
var ferme_familiale:SNull<SString<3>>;
var heritage:SNull<SString<3>>;
var reconversion:SNull<SString<3>>;
var ancien_metier:SNull<SString<128>>;
var responsabilites:SNull<SString<128>>;
var temps_plein:SNull<SString<3>>;
var temps:SNull<SInt>;
var temps_cmt:SNull<SText>;
var couverture_soc:SNull<SString<128>>;
var couverture_statut:SNull<SString<128>>;
var couverture_soc_precis:SNull<SString<32>>;
var couverture_cmt:SNull<SText>;
var pluri_activite:SNull<SString<128>>;
var pluri_activite_autre:SNull<SString<128>>;
var pluri_activites_temps:SNull<SInt>;
var pluri_activites_revenu:SNull<SString<128>>;
var revenus:SNull<SString<128>>;
var eau_actions:SNull<SString<128>>;
var eau_projets:SNull<SString<128>>;
var ress_actions:SNull<SString<128>>;
var ress_projets:SNull<SString<128>>;
var sol_actions:SNull<SString<128>>;
var sol_projets:SNull<SString<128>>;
var air_actions:SNull<SString<128>>;
var air_projets:SNull<SString<128>>;
var biodiv_actions:SNull<SString<128>>;
var biodiv_projets:SNull<SString<128>>;
var paysage_actions:SNull<SString<128>>;
var paysage_projets:SNull<SString<128>>;
var production_sur_ferme:SNull<SString<3>>;
var production_ailleurs:SNull<SString<128>>;
var origine_intrants:SNull<SString<128>>;
var origine_materiel:SNull<SString<128>>;
var origine_mainsdoeuvre:SNull<SString<128>>;
var transfo_sur_ferme:SNull<SString<3>>;
var transfo_territoire:SNull<SString<128>>;
var commerc_territoire:SNull<SString<128>>;
var particip_vie_collec:SNull<SString<128>>;
var reseaux:SNull<SString<128>>;
var reseaux_cmt:SNull<SText>;
var reseaux_activite:SNull<SString<3>>;
var reseaux_activite_cmt:SNull<SText>;
var reseaux_elu:SNull<SString<3>>;
var reseaux_autres:SNull<SString<128>>;
var surface:SNull<SInt>;
var surface_utile:SNull<SInt>;
var surface_par_type:SNull<SString<128>>;
var surface_bat:SNull<SInt>;
var quantite:SNull<SString<128>>;
var pourcentage:SNull<SInt>;
var commercialisation:SNull<SString<128>>;
var maitrise_prod_actions:SNull<SString<128>>;
var maitrise_niveau:SNull<SString<32>>;
var maitrise_cmt:SNull<SText>;
var calendrier_dev:SNull<SString<128>>;
var stade_auto:SNull<SString<32>>;
var autonomie_cmt:SNull<SText>;
var robustesse:SNull<SString<32>>;
var robustesse_cmt:SNull<SText>;
var liberte_tech:SNull<SString<32>>;
var liberte_commerc:SNull<SString<128>>;
var qualite_note:SNull<SString<32>>;
var qualite_cmt:SNull<SText>;
var aspirations:SNull<SString<32>>;
var aspirations_cmt:SNull<SText>;
var vie_sociale:SNull<SString<32>>;
var vie_sociale_modif:SNull<SString<3>>;
var vie_sociale_modif_cmt:SNull<SText>;
var entourage:SNull<SString<128>>;
var habitat:SNull<SString<32>>;
var objectifs:SNull<SString<128>>;
var definition:SNull<SString<128>>;
var definition_ferme:SNull<SString<32>>;
var definition_cmt:SNull<SText>;
var remarques:SNull<SString<128>>;


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