using Std;

class Hooks{

    public static function beforeForm(chapitre:db.Chapitre){
        
        var app = App.current;

        //différents responsables dans le chapitre 1 : afficher quel responsable on édite dans l'entête de la page
        if(chapitre.order==1 && chapitre.questionnaire.id==3){
			//on retrouve le nbre de responsables déclarés
			var numResponsables = 1;
            var n = db.Answer.getAnswerOf("A5-1",app.user).parseInt();
            if(n!=null){
                numResponsables = n;
            }

			if(app.session.data.respIndex==null) app.session.data.respIndex = 0;

            var nom_responsable = db.Answer.getAnswerOf("B1",app.user);
            var prenom_responsable = db.Answer.getAnswerOf("B2",app.user);

			if(nom_responsable!=null && prenom_responsable!=null && prenom_responsable.split("|")[app.session.data.respIndex]!=null ){
				App.current.view.resp = "Responsable n°"+(app.session.data.respIndex+1)+" : "+prenom_responsable.split("|")[app.session.data.respIndex]+" "+nom_responsable.split("|")[app.session.data.respIndex];
			}else{
				App.current.view.resp = "Responsable n°"+(app.session.data.respIndex+1);
			}

			//subAnswerIndex = app.session.data.respIndex;
		}

    }

    public static function beforeFormBuild(questions:Array<db.Question>){

        //Votre transformation se réalise-t-elle u  --> que si transfo coché dans "activités" (A6-1)
        for( q in questions.copy() ){
            if(q.ref == "D1-6"){
                try{
                    var a = db.Answer.getAnswerOf("A6-1",App.current.user); 
                    if( a != null ){
                        if( a.indexOf("transformation")==-1) {
                            questions.remove(q);
                            break;
                        }
                    }
                }catch(e:Dynamic){}                
            }
        }
        

    }

    public static function onFormSubmit(chapitre:db.Chapitre,f:sugoi.form.Form, questions:Array<db.Question>){
        for( q in questions){

            switch(q.ref){
                case "A2" : 
                    //check 33
                    var str :String = f.getValueOf(q.ref);
                    if ( str!=null && str.indexOf("33") == -1 ) 
                        throw "Ce recensement concerne uniquement les fermes de Gironde, le code postal doit commencer par 33.";

                case "A5-1"	:
                    //nbre de responsables max
                    var num :Int = f.getValueOf(q.ref);				
                    if(num>6) throw "Vous ne pouvez pas définir plus de 6 responsables";
                default:
            }

            //nbre de responsables	
			/*if(formId==3 && chapitre==1 ){
				var numResponsables = 1;				
				if(res!=null && res.nbre_responsables!=null ) numResponsables = res.nbre_responsables.parseInt();
				if(app.session.data.respIndex==null) app.session.data.respIndex = 0;
				for( q in qs){
					var value = f.getValueOf(q.data.label);
					var original = Std.string(Reflect.getProperty(res,q.data.label));
					var arr = original==null ? [] : original.split("|");
					arr[app.session.data.respIndex] = QuestionService.serialize(value,q.data.type);
					Reflect.setProperty(res,q.data.label,arr.join("|"));
					//trace(q.data.label+" = "+arr.join("|")+"<br>");
				}*/
        }


    }

    
}