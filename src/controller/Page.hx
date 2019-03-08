package controller ;
import sugoi.form.Form;
import sugoi.form.elements.*;
import db.Question;

class Page extends sugoi.BaseController
{

	public function new() 
	{
		super();
	}


	@admin @tpl('form.mtt')
    public function doEdit(page:db.Page){

        var f = sugoi.form.Form.fromSpod(page);

        if(f.isValid()){
            page.lock();
            f.toSpod(page);
            page.update();
            throw Ok("/questionnaire/view/"+page.chapitre.questionnaire.id,"Page mise à jour");
        }

        view.form = f;
    }

    /**
    Ajouter une page à un chapitre
    **/
    @admin @tpl('form.mtt')
    public function doInsert(chapitre:db.Chapitre){
        var page = new db.Page();
        page.order = db.Page.manager.count($chapitre==chapitre);
        var f = sugoi.form.Form.fromSpod( page );
        if(f.isValid()){
            f.toSpod(page);
            page.chapitre = chapitre;            
            page.insert();
            throw Ok("/questionnaire/view/"+chapitre.questionnaire.id,"Nouvelle page créé");
        }
        view.form = f;
    }

    /**
    Add a question to a page
    **/
    @admin @tpl('form.mtt')
    public function doAddQuestion(page:db.Page){
        
        var f = new sugoi.form.Form("addq");
        f.addElement(new sugoi.form.elements.StringInput("ref","Référence de question"));


        if(f.isValid()){
           var ref = f.getValueOf("ref");
           var q = db.Question.getByRef(ref);
           if(q==null) throw "il n'existe pas de question avec la référence "+ref;
           var qp = new db.QuestionPage();
           qp.question = q;
           qp.page = page;
           qp.order = db.QuestionPage.manager.count($page==page)+1;
           qp.insert();

            throw Ok("/questionnaire/view/"+page.chapitre.questionnaire.id,"Nouvelle question ajoutée");

        }

        view.form = f;
    }

    /**
        Create a new question
    **/
    @admin @tpl('form.mtt')
    public function doInsertQuestion(page:db.Page){
        view.title = "Saisir une nouvelle question";
        
        var f = new sugoi.form.Form("addq");
        f.addElement(new sugoi.form.elements.StringInput("ref",         "ID de la question","",true));
        f.addElement(new sugoi.form.elements.StringInput("label",       "identifiant court","",true));
        f.addElement(new sugoi.form.elements.StringSelect("type",       "Type de question",db.Question.getTypes(),"QString",true));
        f.addElement(new sugoi.form.elements.StringInput("question",    "Question","",true));
        f.addElement(new sugoi.form.elements.StringInput("description", "Description","",false));


        if(f.isValid()){
           
           var q = db.Question.getByRef(f.getValueOf("ref"));
           if(q!=null) throw Error("Cet ID de question existe déjà","/page/insertQuestion/"+page.id);

           var q = new db.Question();
           q.ref = f.getValueOf("ref");
           q.label = f.getValueOf("label");
           q.question = f.getValueOf("question");
           q.description = f.getValueOf("description");
           q.type = Type.createEnum(db.Question.QuestionType,f.getValueOf("type"));
           q.insert();

           var qp = new db.QuestionPage();
           qp.question = q;
           qp.page = page;
           qp.order = db.QuestionPage.manager.count($page==page)+1;
           qp.insert();


            throw Ok("/questionnaire/view/"+page.chapitre.questionnaire.id,"Nouvelle question créé");

        }

        view.form = f;
    }

    @admin @tpl('form.mtt')
    public function doEditQuestion(q:db.Question,page:db.Page){
        view.title = "Modifier une question";
        
        var f = new sugoi.form.Form("modq");
        f.addElement( new sugoi.form.elements.StringInput("ref","ID de la question", q.ref ,true) );
        f.addElement(new sugoi.form.elements.StringInput("label","identifiant court",q.label,true));
       

        //can edit only string or text questions
        /*if(q.type==QString || q.type==QText){
            f.addElement(new sugoi.form.elements.StringSelect("type", "Type de question",db.Question.getTypes(),Std.string(q.type),true));
        }*/
        
        f.addElement(new sugoi.form.elements.StringInput("question",    "Question",q.question,true));
        f.addElement(new sugoi.form.elements.StringInput("description", "Description",q.description,false));
        f.addElement(new sugoi.form.elements.Checkbox("required", "Réponse obligatoire",q.required,false));

        if(q.type==QCheckbox){
            f.addElement(new sugoi.form.elements.Html("html","Question de type 'Case à cocher'. Saisissez les libellés et les valeurs séparés par un \":\""));
            f.addElement(new sugoi.form.elements.TextArea("data",    "Réponses possibles",QuestionService.getQuestionDataAsText(q),true));
            var other = q.data==null ? false : q.data.other; 
            f.addElement(new sugoi.form.elements.Checkbox("other",    "Champs 'autres'",other,false));
        }
        if(q.type==QRadio){
            f.addElement(new sugoi.form.elements.Html("html","Question de type 'Liste à choix unique'. Saisissez les libellés et les valeurs séparés par un \":\""));
            f.addElement(new sugoi.form.elements.TextArea("data",    "Réponses possibles",QuestionService.getQuestionDataAsText(q),true));
            var other = q.data==null ? false : q.data.other; 
            f.addElement(new sugoi.form.elements.Checkbox("other",    "Champs 'autres'",other,false));
        }

        if(f.isValid()){ 
          
            q.lock();
            q.ref = f.getValueOf("ref");
            q.label = f.getValueOf("label");
            q.question = f.getValueOf("question");
            q.description = f.getValueOf("description");
            q.required = f.getValueOf("required");
            QuestionService.setQuestionDataAsText(f,q);
            q.update();

            throw Ok("/questionnaire/view/"+page.chapitre.questionnaire.id,"Question modifiée");
        }

        view.form = f;
    }

    
    
    public function doRemoveQuestion(q:db.Question,page:db.Page){
    
        var qp = db.QuestionPage.manager.select($question==q && $page==page);
        qp.delete();
        throw Ok("/questionnaire/view/"+page.chapitre.questionnaire.id,"Question retirée");

    }

    
	
}