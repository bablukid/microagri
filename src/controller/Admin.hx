package controller ;
import sugoi.form.Form;
import sugoi.form.elements.*;

class Admin extends sugoi.BaseController
{

	public function new() 
	{
		super();
	}


	/*@admin @tpl('admin/questionnaire/default.mtt')
	public function doDefault() {
		view.questionnaires = db.Questionnaire.manager.all();
	}

    @admin @tpl('admin/questionnaire/view.mtt')
	public function doView(questionnaire:db.Questionnaire) {
		view.questionnaire = questionnaire;
	}*/
    function print(str){
        Sys.println('<p>$str</p>');
    }

    @admin
    public function doMigrate(){

        for(i in QData.formulaires.keys()){

            var form = QData.formulaires[i];

            var qu = new db.Questionnaire();
            qu.id = i;
            qu.name = form.nom;
            qu.startScreen = form.startScreen;
            qu.endScreen = form.endScreen;
            qu.insert();
            print("Questionnaire : "+qu);

            var chapitreIndex = 0;

            for( chapitre in form.chapitres){

                var ch = new db.Chapitre();
                ch.questionnaire = qu;
                ch.title = chapitre.nom;
                ch.order = chapitreIndex;
                ch.insert();
                print("== Chapitre : "+ch.title);

                var pageIndex = 0;

                for(page in chapitre.ordre){

                    var p = new db.Page();
                    p.title = page.titre;
                    p.description = page.desc;
                    p.order = pageIndex;
                    p.chapitre = ch;
                    p.insert();
                    print("==== Page : "+p.title);

                    var qindex = 0;

                    for( qid in page.qs){

                        print("====== Question : "+qid);
                        var q = db.Question.getByRef(qid);
                        if(q==null){
                            q = new db.Question();
                            var question = QData.questions[qid];
                            if(question==null) throw 'unknown question $qid';
                            q.question = question.q;
                            q.description = question.desc;
                            q.label = question.label;
                            q.ref = qid;
                            q.type = switch(question.type){
                                case QText      : QText;      
                                case QString    : QString;
                                case QInt       : QInt;
                                case QFloat     : QFloat;
                                case QAddress   : QAddress;
                                case QRadio(list,other) : QRadio;
                                case QCheckbox(list,other,extras) : QCheckbox;
                                case QYesNo : QYesNo;
                                case QMultiInput(extras) : QMultiInput;
                            };
                            q.data = switch(question.type){
                                case QText      : null;      
                                case QString    : null;
                                case QInt       : null;
                                case QFloat     : null;
                                case QAddress   : null;
                                case QRadio(list,other) : {list:list,other:other};
                                case QCheckbox(list,other,extras) : {list:list,other:other,extras:extras};
                                case QYesNo : null;
                                case QMultiInput(extras) : {extras:extras};
                            };
                            
                            q.insert();                            
                        }

                        var qp = new db.QuestionPage();
                        qp.order = qindex;
                        qp.question = q;
                        qp.page = p;
                        qp.insert();

                        qindex++;
                    }

                    pageIndex++;

                }

                chapitreIndex++;

            }


        }

    }

    function doMigrateAnswers(){

        var countByUser = new Map<Int,Int>();

        for( r in db.Result.manager.all()){

            var dataset :Int = if(countByUser[r.user.id]==null){
                countByUser[r.user.id] = 1;
                1;
            }else{
                countByUser[r.user.id]++;
                countByUser[r.user.id];
            } 

            for ( f in Reflect.fields(r)){

                if(f.substr(0,1)=="_") continue;
                if(f=="userId"||f=="id"||f=="user") continue;

                var question = db.Question.manager.select($label==f);
                if(question==null) continue;//throw 'no question with label "$f"';

                var a = new db.Answer();
                a.user = r.user;
                a.dataset = dataset;
                a.question = question;
                a.answer = Reflect.field(r,f);
                a.insert();

                print('$f (${a.question.ref}) for user ${a.user.id}');

            }


        }

    }

    function doCheckAnswers(){

        var countByUser = new Map<Int,Int>();

        for( r in db.Result.manager.all()){

            var dataset :Int = if(countByUser[r.user.id]==null){
                countByUser[r.user.id] = 1;
                1;
            }else{
                countByUser[r.user.id]++;
                countByUser[r.user.id];
            } 

            for ( f in Reflect.fields(r)){

                if(f.substr(0,1)=="_") continue;
                if(f=="userId"||f=="id"||f=="user") continue;

                var question = db.Question.manager.select($label==f);
                if(question==null) continue;//throw 'no question with label "$f"';

                var a = db.Answer.manager.select($user==r.user && $dataset==dataset && $question==question,true);
                if(a==null || a.question==null) continue;
                print('$f (${a.question.ref}) for user ${a.user.id}');
                if(a.answer != Reflect.field(r,f)){
                    Sys.println("<div style='color:red;'>"+a.answer+" <b>!= </b>"+Reflect.field(r,f) +"</div>");
                    a.answer = Reflect.field(r,f);
                    a.update();
                }

 

                

            }


        }

    }
	
}