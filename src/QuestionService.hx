import sugoi.form.ListData;
import db.Question;


typedef Chapitre = { id:String,nom:String,ordre:Array<{qs:Array<String>,?titre:String,?desc:String}> };

class QuestionService{

    public static function getCompletion(questionnaire:db.Questionnaire,user:db.User,dataset:Int){
        
        var out = {num:0,total:0,percent:0};        
        
        for( q in questionnaire.getAllQuestions()){
            
            
            if(q.label.indexOf("_cmt")>-1) continue;
            out.total++;
            var answer = db.Answer.get(user,q,dataset);
            if( answer!=null && answer.answer!=null) out.num++;
            
        }
        out.percent = Math.round(out.num/out.total*100);
        return out;        
    } 

    
    /**
     *  Get a question from its ID
     */
    /*public static function get(k){
       
        var q = new QuestionService();
        q.qid = k;
        q.data = QData.questions[k];
        if(q.data==null) throw "La question "+k+" n'existe pas.";
        return q;
    }*/

    /**
     *  Generate a HTML form for this list of Questions
     */
    public static function getForm(questions:Array<db.Question>,?subAnswerIndex:Int=null):sugoi.form.Form{

        var form = new sugoi.form.Form("q");
        
        //define a form render method
        form.toString = function(){
            var s:StringBuf = new StringBuf();
            s.add(form.getOpenTag());
            if (form.isSubmitted()) s.add(form.getErrors());

            for ( element in form.getElements() ){
                if (element != form.submitButton && element.internal == false) {
                    s.add("<div class='row' style='margin-bottom:12px'><div class='col-md-6'>"+element.label+"</div>\n");
                    s.add("<div class='col-md-6'>"+element.render()+"</div></div><hr/>\n");                    
                }               
            }                                 

            //submit button
            form.submitButton = new sugoi.form.elements.Submit('submit',  'Valider');
            form.submitButton.parentForm = form;            
            s.add( "<div style='margin-top:8px;' class='text-center'>"+ form.submitButton.render() + "</div>");            
            s.add( form.getCloseTag() );
            return s.toString();
        }

        Hooks.beforeFormBuild(questions);

        for (q in questions){  

           //id de question
            var html = "<h4><span class='qid'>"+q.ref+"</span>"+q.question+"</h4><p>"+q.description+"</p>";
            var answer = db.Answer.getOrCreate(App.current.user,q);
            
            var value :Dynamic = answer.answer;
            if(value=="null"||value=="") value = null;
            
            //réponses multiples ( responsables ) 
            if(App.current.session.data!=null && App.current.session.data.respIndex!=null && Std.string(value).indexOf("|")>-1) {
                var x : String = Std.string(value).split("|")[App.current.session.data.respIndex];
                if(x == null || x == "null"){
                    x = "";
                } 
                value = x;
            }

            var e : sugoi.form.FormElement<Dynamic> = null;

            switch(q.type){
            case QText : 
                e = new sugoi.form.elements.TextArea(q.ref,html,value,true);

            case QCheckbox :
                var d : {list:FormData<String>,other:Bool,extras:FormData<String>} = q.data;
                //v = "[bla,blo]"
                if(value!=null) value = split(value,"~");

                if(d.extras!=null){
                    //checkboxes avec champs
                    e = new form.CheckboxesWithField(q.ref,html,d.list,value,null,null);
                    untyped e.extraFields = d.extras;
                }else{
                    if(d.other){
                        e = new form.Checkboxes(q.ref,html,d.list,value,null,null);
                    }else{
                        e = new sugoi.form.elements.CheckboxGroup(q.ref,html,d.list,value,null,null);
                    }
                }
                
            case QRadio :
                var d : {list:FormData<String>,other:Bool} = q.data; 
                e = new sugoi.form.elements.RadioGroup(q.ref,html,d.list,value,null,null);
            case QInt : 
                e = new sugoi.form.elements.IntInput(q.ref,html,value,true);
            case QFloat : 
                e = new sugoi.form.elements.FloatInput(q.ref,html,value,true);
            
            case QYesNo :
                var data = [{"label":"Oui",value:"OUI"},{label:"Non",value:"NON"}];
                e = new sugoi.form.elements.RadioGroup(q.ref,html,data,value,null,null);
                untyped e.vertical = false; 

            case QMultiInput :
                var data : {extras:FormData<String>} = q.data; 
                var lines = [];   
                //deja commenté ?  c'est en service ou pas ça ?             
                /*if(q.qid=="E1-3" && r.autres_activites!=null){
                    //surface par type, autant de lignes que activités dans A6-2
                    var activites = split(r.autres_activites,"~");                    
                    var activites_names = switch( QData.questions.get("A6-2").type ){
                        case QCheckbox(names) : names;
                        default : null;
                    };
                    // trace(activites_names);
                    for(a in activites){
                        var x = Lambda.find(activites_names,function(e) return e.value==a);
                        if(x!=null) lines.push(x.label);
                    }
                    //trace(lines);
                }else*/ if(q.ref=="E1-4"){
                    for( i in 1...11) lines.push('Bâtiment $i');
                }

                var values :Array<Array<String>> = split(value,"~").map(function(x) return split(x,";") );
                e = new form.MultiInput(q.ref,html,lines,data.extras,values);

            case QAddress,QString : 
                e = new sugoi.form.elements.StringInput(q.ref,html,value,q.required);
            }

            
            /*if(q.data.label.indexOf("cmt")>-1 || q.data.label.indexOf("autre")>-1)*/
            e.required = q.required;

            form.addElement(e);
            
        }      

        return form;
    }

   /* public function getNext():Question{

        //trouver le chapitre
        for(c in chapitres){
            for(i in 0...c.ordre.length){
                var q = c.ordre[i].;
                if(q==this.qid && c.ordre[i+1]!=null) return get(c.ordre[i+1]);            
            }
        }
        return null;
    }*/

    /**
    Get next Page
    **/
    public static function getNextPageURL(questionnaire:db.Questionnaire,chapitreIndex:Int,pageIndex:Int):String{
        
        var chapitre = questionnaire.getChapitres()[chapitreIndex];
        if(chapitre.getPages()[pageIndex+1]!=null){
            //go to next page
            // return { questionnaire:questionnaire, chapitreIndex:chapitreIndex, pageIndex:pageIndex };
            return '/q/${questionnaire.id}/${chapitreIndex}/${pageIndex+1}';
        }else{
            //go to next chapitre
            var chapitre = questionnaire.getChapitres()[chapitreIndex+1];
            if(chapitre!=null){
                return '/q/${questionnaire.id}/${chapitreIndex+1}/0';
            }else{
                //questionnaire terminé
                return questionnaire.endScreen;
            }
        }
        return questionnaire.endScreen;
    }

    public static function getPreviousPageURL(questionnaire:db.Questionnaire,chapitreIndex:Int,pageIndex:Int):String{
        
        var chapitre = questionnaire.getChapitres()[chapitreIndex];
        if(pageIndex==0){
            if(chapitreIndex==0){
                return questionnaire.startScreen;
            }else{
                return '/q/${questionnaire.id}/${chapitreIndex-1}/0';
            }
        }else{
            return '/q/${questionnaire.id}/${chapitreIndex}/${pageIndex-1}';
        }
        return questionnaire.startScreen;
    }

    public static function getChapterCompletion(chapter:db.Chapitre,user:db.User,dataset:Int):{num:Int,total:Int,percent:Int}{
        
        var out = {num:0,total:0,percent:0};        
        
        for( p in chapter.getPages()){
            for( q in p.getQuestions()){
                if(q.label.indexOf("_cmt")>-1) continue;
                out.total++;
                var answer = db.Answer.get(user,q,dataset);
                if( answer!=null && answer.answer!=null) out.num++;
            }
        }
        out.percent = Math.round(out.num/out.total*100);
        return out;    
    }

    public static function split(str:String,sep:String):Array<String>{
        if(str==null) return [];
        str = StringTools.replace(str,"[","");
        str = StringTools.replace(str,"]","");
        return str.split(sep);
    }

    public static function join(arr:Array<String>,sep:String):String{
        if(arr==null) return "";
        return Lambda.filter(arr, function(x) return x!=null&&x!="" ).join(sep);
    }

    /**
     *  serialize form element value depending on type
     */
    public static function serialize(value:Dynamic,type:QuestionType):String{

        switch(type){
            case QMultiInput:
            var curr : Array<Array<String>> = value;
            var curr2 : Array<String> = cast Lambda.map(curr,function(a) return join(a,";"));
            var curr2 = join(curr2,"~");
            return curr2;

            case QCheckbox:
            return join(value,"~");

            default: return Std.string(value);
        }

    }

}