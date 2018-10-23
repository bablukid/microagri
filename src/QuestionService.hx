import sugoi.form.ListData;
import db.Question;


typedef Chapitre = { id:String,nom:String,ordre:Array<{qs:Array<String>,?titre:String,?desc:String}> };

class QuestionService{

    /*public var qid : String;
    public var data : {label:String,q:String,desc:String,type:QType};
    public function new(){ }*/

    public static function getCompletion(r:db.Result){
        var out = {num:0,total:0,percent:0};
        if(r==null) return out;
        
        for( chap in QData.formulaire3){
            for( o in chap.ordre){
                for( qid in o.qs){
                    var q = QuestionService.get(qid);
                    if(q.data.label.indexOf("_cmt")>-1) continue;
                    out.total ++;
                    if( Reflect.getProperty(r,q.data.label)!=null) out.num++;
                }
            }
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
        var r = db.Result.getOrCreate(App.current.user);

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

        for (q in questions){  

            //Votre transformation se réalise-t-elle u  --> que si transfo coché
            /*if(q.qid == "D1-6"){
                var r = db.Result.getOrCreate(App.current.user);
                if( r != null && r.activites != null){
                    if( r.activites.indexOf("transformation")==-1) continue;
                }
            }*/

            //id de question
            var html = "<h4><span class='qid'>"+q.ref+"</span>"+q.question+"</h4><p>"+q.description+"</p>";
            var v : Dynamic = Reflect.field(r,q.data.label);
            if(v==null || v=="null") v = "";
            
            //réponses multiples ( responsables ) 
            /*if(subAnswerIndex!=null) {
                var x : String = Std.string(v).split("|")[subAnswerIndex];
                if(x == null || x == "null"){
                    x = "";
                } 
                v = x;
            }*/    

            var e : sugoi.form.FormElement<Dynamic> = null;

            switch(q.type){
            case QText : e = new sugoi.form.elements.TextArea(q.ref,html,v,true);
            case QCheckbox(data,other,extraFields) :
                //v = "[bla,blo]"
                if(v!=null) v = split(v,"~");

                if(extraFields!=null){
                    //checkboxes avec champs
                    e = new form.CheckboxesWithField(q.ref,html,data,v,null,null);
                    untyped e.extraFields = extraFields;
                }else{
                    if(other){
                        e = new form.Checkboxes(q.ref,html,data,v,null,null);
                    }else{
                        e = new sugoi.form.elements.CheckboxGroup(q.ref,html,data,v,null,null);
                    }
                }
                
            case QRadio(data) : 
                e = new sugoi.form.elements.RadioGroup(q.ref,html,data,v,null,null);
            case QInt : 
                e = new sugoi.form.elements.IntInput(q.ref,html,v,true);
            case QFloat : 
                e = new sugoi.form.elements.FloatInput(label,html,v,true);
            
            case QYesNo :
                var data = [{"label":"Oui",value:"OUI"},{label:"Non",value:"NON"}];
                e = new sugoi.form.elements.RadioGroup(q.ref,html,data,v,null,null);
                untyped e.vertical = false; 

            case QMultiInput(data) : 
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
                }else*/ if(q.qid=="E1-4"){
                    for( i in 1...11) lines.push('Bâtiment $i');
                }

                var values :Array<Array<String>> = split(v,"~").map(function(x) return split(x,";") );
                e = new form.MultiInput(q.ref,html,lines,data,values);

            case QAddress,QString : 
                e = new sugoi.form.elements.StringInput(q.ref,html,v,true);
            }

            
            /*if(q.data.label.indexOf("cmt")>-1 || q.data.label.indexOf("autre")>-1)*/
            e.required = false;

            form.addElement(e);
            
        }      

        return form;
    }


    /*public static function getFormulaire(formulaire:Int,?chapitre=0){
        switch(formulaire){
            case 1 : return QData.formulaire1[chapitre];
            case 2 : return QData.formulaire2[chapitre];
            case 3 : return QData.formulaire3[chapitre];
            default : return null;
        }
    }*/

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
    public static function  next(questionnaire:db.Questionnaire,chapitreIndex:Int,pageIndex:Int){
        
        var chapitre = questionnaire.getChapitres()[chapitreIndex];
        if(chapitre.getPages()[pageIndex+1]!=null){
            //go to next page
            return { questionnaire:questionnaire, chapitre:chapitreIndex, pageIndex:pageIndex };
        }else{
            //go to next chapitre
            var chapitre = questionnaire.getChapitres()[chapitreIndex+1];
            if(chapitre!=null){
                return { questionnaire:questionnaire, chapitre:chapitreIndex+1, pageIndex:pageIndex };
            }else{
                //questionnaire terminé
                return null;
            }
        }
        return null;
    }

    public static function getAnswers(chap:Chapitre):{num:Int,total:Int,percent:Int}{
        
        var out = {num:0,total:0,percent:0};
        if(App.current.user==null) return out;
        var r = db.Result.getOrCreate(App.current.user);
        
        //var chap = Question.chapitres[chapIndex];
        for( o in chap.ordre){
            for( qid in o.qs){
                var q = QuestionService.get(qid);
                if(q.data.label.indexOf("_cmt")>-1) continue;
                out.total ++;
                if( Reflect.getProperty(r,q.data.label)!=null) out.num++;
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
    public static function serialize(value:Dynamic,type:QType):String{

        switch(type){
            case QMultiInput(_):
            var curr : Array<Array<String>> = value;
            var curr2 : Array<String> = cast Lambda.map(curr,function(a) return join(a,";"));
            var curr2 = join(curr2,"~");
            return curr2;

            case QCheckbox(_):
            return join(value,"~");

            default: return Std.string(value);
        }

    }

}