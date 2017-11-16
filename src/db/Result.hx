package db;
import sys.db.Object;
import sys.db.Types;

class Result extends Object{

    public var id : SId;
    @:relation(userId) public var user : db.User;

    //généré par /shema    
public var Nom:SNull<SString<128>>;
public var Forme_juridique:SNull<SString<128>>;
public var Annee_prod:SNull<SInt>;
public var Annee_crea:SNull<SInt>;
public var nbre_responsables:SNull<SInt>;
public var nbre_responsables_cmt:SNull<SText>;
public var activites:SNull<SString<128>>;
public var autres_activites:SNull<SString<128>>;
public var autres_travailleurs:SNull<SInt>;
public var autres_travailleurs_temps:SNull<SInt>;
public var stagiaires_num:SNull<SInt>;
public var stagiaires_temps:SNull<SInt>;
public var benevoles_num:SNull<SString<128>>;
public var benevoles_temps:SNull<SString<128>>;
public var siqo:SNull<SString<128>>;
public var siqo_annee:SNull<SString<128>>;
public var faire_valoir:SNull<SString<32>>;
public var faire_valoir_bati:SNull<SString<32>>;
public var faire_valoir_cmt:SNull<SText>;

//B
public var nom_responsable:SNull<SString<128>>;
public var prenom_responsable:SNull<SString<128>>;
public var sexe_responsable:SNull<SString<128>>;
public var naissance_responsable:SNull<SString<128>>;
public var formation:SNull<SString<128>>;
public var experiences:SNull<SString<128>>;
public var parcours:SNull<SString<128>>;
public var ferme_familiale:SNull<SString<128>>;
public var heritage:SNull<SString<128>>;
public var reconversion:SNull<SString<128>>;
public var ancien_metier:SNull<SString<128>>;
public var responsabilites:SNull<SString<128>>;
public var temps_plein:SNull<SString<128>>;
public var temps:SNull<SString<128>>;
public var temps_cmt:SNull<SString<128>>;
public var couverture_soc:SNull<SString<128>>;
public var couverture_statut:SNull<SString<128>>;
public var couverture_soc_precis:SNull<SString<32>>;
public var couverture_cmt:SNull<SString<128>>;
public var pluri_activite:SNull<SString<128>>;
public var Localisation:SNull<SString<256>>;
public var pluri_activite_autre:SNull<SString<128>>;
public var pluri_activites_temps:SNull<SString<128>>;
public var pluri_activites_revenu:SNull<SString<128>>;
public var revenus:SNull<SString<128>>;

//C
public var eau_actions:SNull<SString<128>>;
public var eau_projets:SNull<SString<128>>;
public var ress_actions:SNull<SString<128>>;
public var ress_projets:SNull<SString<128>>;
public var sol_actions:SNull<SString<128>>;
public var sol_projets:SNull<SString<128>>;
public var air_actions:SNull<SString<128>>;
public var air_projets:SNull<SString<128>>;
public var biodiv_actions:SNull<SString<128>>;
public var biodiv_projets:SNull<SString<128>>;
public var paysage_actions:SNull<SString<128>>;
public var paysage_projets:SNull<SString<128>>;
public var production_sur_ferme:SNull<SString<3>>;
public var production_ailleurs:SNull<SString<128>>;
public var origine_intrants:SNull<SString<128>>;
public var origine_materiel:SNull<SString<128>>;
public var origine_mainsdoeuvre:SNull<SString<128>>;
public var transfo_sur_ferme:SNull<SString<3>>;
public var transfo_territoire:SNull<SString<128>>;
public var commerc_territoire:SNull<SString<128>>;
public var particip_vie_collec:SNull<SString<128>>;
public var reseaux:SNull<SString<128>>;
public var reseaux_cmt:SNull<SText>;
public var reseaux_activite:SNull<SString<3>>;
public var reseaux_activite_cmt:SNull<SText>;
public var reseaux_elu:SNull<SString<3>>;
public var reseaux_autres:SNull<SString<128>>;
public var surface:SNull<SInt>;
public var surface_utile:SNull<SInt>;
public var surface_par_type:SNull<SString<128>>;
public var surface_bat:SNull<SInt>;
public var quantite:SNull<SString<128>>;
public var pourcentage:SNull<SInt>;
public var commercialisation:SNull<SString<128>>;
public var maitrise_prod_actions:SNull<SString<128>>;
public var maitrise_niveau:SNull<SString<32>>;
public var maitrise_cmt:SNull<SText>;
public var calendrier_dev:SNull<SString<128>>;
public var stade_auto:SNull<SString<32>>;
public var autonomie_cmt:SNull<SText>;
public var robustesse:SNull<SString<32>>;
public var robustesse_cmt:SNull<SText>;
public var liberte_tech:SNull<SString<32>>;
public var liberte_commerc:SNull<SString<128>>;
public var qualite_note:SNull<SString<32>>;
public var qualite_cmt:SNull<SText>;
public var aspirations:SNull<SString<32>>;
public var aspirations_cmt:SNull<SText>;
public var vie_sociale:SNull<SString<32>>;
public var vie_sociale_modif:SNull<SString<3>>;
public var vie_sociale_modif_cmt:SNull<SText>;
public var entourage:SNull<SString<128>>;
public var habitat:SNull<SString<32>>;
public var objectifs:SNull<SString<128>>;
public var definition:SNull<SString<128>>;
public var definition_ferme:SNull<SString<32>>;
public var definition_cmt:SNull<SText>;
public var remarques:SNull<SString<128>>;


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