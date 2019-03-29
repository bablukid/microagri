package db;
import sys.db.Object;
import sys.db.Types;

//@deprecated
class ____Result extends Object{

    public var id : SId;
    @:relation(userId) public var user : db.User;

    //généré par /shema   
public var email:SNull<SText>;
public var transfo_sur_ferme:SNull<SText>;
public var definition:SNull<SText>;
public var aspirations:SNull<SText>;
public var calendrier_dev:SNull<SText>;
public var reseaux_elu_cmt:SNull<SText>;
public var quantite:SNull<SText>;
public var objectifs:SNull<SText>;
public var temps_plein:SNull<SText>;
public var stagiaires_num:SNull<SText>;
public var ress_actions_cmt:SNull<SText>;
public var responsabilites:SNull<SText>;
public var nom_responsable:SNull<SText>;
public var pluri_activite:SNull<SText>;
public var Nom:SNull<SText>;
public var faire_valoir:SNull<SText>;
public var eau_projets:SNull<SText>;
public var paysage_projets_cmt:SNull<SText>;
public var ferme_familiale:SNull<SText>;
public var autres_activites:SNull<SText>;
public var couverture_cmt:SNull<SText>;
public var revenus:SNull<SText>;
public var reseaux_activite_cmt:SNull<SText>;
public var carac_microferme:SNull<SText>;
public var sol_projets:SNull<SText>;
public var qualite_note:SNull<SText>;
public var maitrise_prod_actions:SNull<SText>;
public var surface:SNull<SText>;
public var liberte_commerc_cmt:SNull<SText>;
public var production_sur_ferme:SNull<SText>;
public var autres_travailleurs:SNull<SText>;
public var eau_actions_cmt:SNull<SText>;
public var nom_responsables:SNull<SText>;
public var cheptel:SNull<SText>;
public var Annee_crea_cmt:SNull<SText>;
public var origine_mainsdoeuvre:SNull<SText>;
public var biodiv_projets_cmt:SNull<SText>;
public var experiences:SNull<SText>;
public var nbre_responsables_cmt:SNull<SText>;
public var benevoles_temps:SNull<SText>;
public var equi_temps_plein:SNull<SText>;
public var pluri_activites_revenu:SNull<SText>;
public var paysage_projets:SNull<SText>;
public var form_complet:SNull<SText>;
public var eau_actions:SNull<SText>;
public var vie_sociale_modif_cmt:SNull<SText>;
public var habitat:SNull<SText>;
public var combien_personnes:SNull<SText>;
public var paysage_actions_cmt:SNull<SText>;
public var parcours:SNull<SText>;
public var endettement:SNull<SText>;
public var activites:SNull<SText>;
public var couverture_soc_precis:SNull<SText>;
public var demarche_autonomie:SNull<SText>;
public var reseaux_activite:SNull<SText>;
public var siqo_annee:SNull<SText>;
public var sol_actions:SNull<SText>;
public var ancien_metier:SNull<SText>;
public var biodiversite_actions:SNull<SText>;
public var liberte_commerc:SNull<SText>;
public var air_projets_cmt:SNull<SText>;
public var surface_bat:SNull<SText>;
public var Annee_crea:SNull<SText>;
public var recenseur_responsable:SNull<SText>;
public var origine_materiel:SNull<SText>;
public var pluri_activite_autre:SNull<SText>;
public var biodiversite_projets:SNull<SText>;
public var commerc_territoire:SNull<SText>;
public var definition_cmt:SNull<SText>;
public var entourage:SNull<SText>;
public var biodiv_actions_cmt:SNull<SText>;
public var autonomie_cmt:SNull<SText>;
public var formation:SNull<SText>;
public var commercialisation:SNull<SText>;
public var nbre_responsables:SNull<SText>;
public var temps_cmt:SNull<SText>;
public var appro_env_proch:SNull<SText>;
public var benevoles_num:SNull<SText>;
public var naissance_responsable:SNull<SText>;
public var recontacter:SNull<SText>;
public var vie_sociale_modif:SNull<SText>;
public var robustesse_cmt:SNull<SText>;
public var charges:SNull<SText>;
public var couverture_statut:SNull<SText>;
public var reseaux:SNull<SText>;
public var sol_projets_cmt:SNull<SText>;
public var energie_projets:SNull<SText>;
public var reconversion:SNull<SText>;
public var reseaux_autres:SNull<SText>;
public var air_projets:SNull<SText>;
public var liberte_tech:SNull<SText>;
public var siret:SNull<SText>;
public var air_actions_cmt:SNull<SText>;
public var maitrise_cmt:SNull<SText>;
public var surface_par_type:SNull<SText>;
public var Annee_prod:SNull<SText>;
public var origine_intrants:SNull<SText>;
public var sexe_responsable:SNull<SText>;
public var telephone:SNull<SText>;
public var Forme_juridique:SNull<SText>;
public var transfo_territoire:SNull<SText>;
public var definition_ferme:SNull<SText>;
public var faire_valoir_cmt:SNull<SText>;
public var aspirations_cmt:SNull<SText>;
public var stade_auto:SNull<SText>;
public var pourcentage:SNull<SText>;
public var stagiaires_temps:SNull<SText>;
public var ress_projets_cmt:SNull<SText>;
public var remarques:SNull<SText>;
public var vie_sociale:SNull<SText>;
public var robustesse:SNull<SText>;
public var chiffre_affaire:SNull<SText>;
public var couverture_soc:SNull<SText>;
public var reseaux_ext:SNull<SText>;
public var siqo:SNull<SText>;
public var sol_actions_cmt:SNull<SText>;
public var energie_actions:SNull<SText>;
public var heritage:SNull<SText>;
public var impliq_monde_pro:SNull<SText>;
public var reseaux_elu:SNull<SText>;
public var prenom_responsable:SNull<SText>;
public var air_actions:SNull<SText>;
public var pourcentage_cmt:SNull<SText>;
public var Localisation:SNull<SText>;
public var paysage_actions:SNull<SText>;
public var faire_valoir_bati:SNull<SText>;
public var carte_microferme:SNull<SText>;
public var qualite_cmt:SNull<SText>;
public var maitrise_niveau:SNull<SText>;
public var production_ailleurs:SNull<SText>;
public var autres_travailleurs_temps:SNull<SText>;
public var eau_projets_cmt:SNull<SText>;



    public static function getOrCreate(user:db.User){
        var x : db.Result = null;
        if(App.current.session.data.resultId==null){
            x = manager.select($user==user,true);
        }else{
            x = manager.get(App.current.session.data.resultId,true);
            if(x.user.id != user.id && !App.current.user.isAdmin() ) x = null;
        }
         
        if(x==null) {
            x = new Result();
            x.user = user;
            x.insert();
        }
        return x;
    }

}