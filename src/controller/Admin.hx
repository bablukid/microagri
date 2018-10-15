package controller ;
import sugoi.form.Form;
import sugoi.form.elements.*;

class Admin extends sugoi.BaseController
{

	public function new() 
	{
		super();
	}


	@admin @tpl('admin/questionnaire/default.mtt')
	public function doDefault() {
		view.questionnaires = db.Questionnaire.manager.all();
	}

    @admin @tpl('admin/questionnaire/view.mtt')
	public function doView(questionnaire:db.Questionnaire) {
		view.questionnaire = questionnaire;
	}

    @admin @tpl('form.mtt')
    public function doEdit(?questionnaire:db.Questionnaire){

        var f = null;
        if(questionnaire!=null){
            questionnaire = new db.Questionnaire();
            f = new sugoi.form.Form.fromSpod(questionnaire);
        }else{
            f = new sugoi.form.Form.fromSpod(questionnaire);
        }


        if(f.isValid()){

        }

    }

    
	
}