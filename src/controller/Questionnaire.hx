package controller ;
import sugoi.form.Form;
import sugoi.form.elements.*;

class Questionnaire extends sugoi.BaseController
{

	public function new() 
	{
		super();
	}


	@admin @tpl('questionnaire/default.mtt')
	public function doDefault() {
		view.questionnaires = db.Questionnaire.manager.all();
	}

    @admin @tpl('questionnaire/view.mtt')
	public function doView(questionnaire:db.Questionnaire) {
		view.questionnaire = questionnaire;
	}

    @admin @tpl('form.mtt')
    public function doEdit(questionnaire:db.Questionnaire){

        var f = sugoi.form.Form.fromSpod(questionnaire);

        if(f.isValid()){
            questionnaire.lock();
            f.toSpod(questionnaire);
            questionnaire.update();
            throw Ok("/questionnaire","Questionnaire mis à jour");
        }

        view.form = f;
    }

    @admin @tpl('form.mtt')
    public function doInsert(){
        var questionnaire = new db.Questionnaire();
        var f = sugoi.form.Form.fromSpod( questionnaire );
        if(f.isValid()){
            f.toSpod(questionnaire);
            questionnaire.insert();
            throw Ok("/questionnaire","Nouveau questionnaire créé");

        }

        view.form = f;
    }

    
	
}