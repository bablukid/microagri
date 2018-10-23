package controller ;
import sugoi.form.Form;
import sugoi.form.elements.*;

class Chapitre extends sugoi.BaseController
{

	public function new() 
	{
		super();
	}

    /**
    Modifier un chapitre
    **/
	@admin @tpl('form.mtt')
    public function doEdit(chapitre:db.Chapitre){

        var f = sugoi.form.Form.fromSpod(chapitre);

        if(f.isValid()){
            chapitre.lock();
            f.toSpod(chapitre);
            chapitre.update();
            throw Ok("/questionnaire/view/"+chapitre.questionnaire.id,"Chapitre mis à jour");
        }

        view.form = f;
    }

    /**
    Ajouter un chapitre à un questionnaire
    **/
    @admin @tpl('form.mtt')
    public function doInsert(questionnaire:db.Questionnaire){
        var chapitre = new db.Chapitre();
        chapitre.order = db.Chapitre.manager.count($questionnaire==questionnaire);
        var f = sugoi.form.Form.fromSpod( chapitre );
        if(f.isValid()){
            f.toSpod(chapitre);
            chapitre.questionnaire = questionnaire; 
            chapitre.insert();
            throw Ok("/questionnaire/view/"+questionnaire.id,"Nouveau chapitre créé");

        }

        view.form = f;
    }


    
	
}