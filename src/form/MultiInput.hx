package form;
import sugoi.form.ListData;
import sugoi.form.FormElement;
/**
    MultiInput 
    - - -
    - - -
    - - -
**/
class MultiInput extends FormElement<Array<Array<String>>> {

	public var lines : Array<String>;
	public var data : FormData<String>;

    /**
     *  
	 *  
     *  @param name - 
     *  @param label - 
     *  @param lines - name of various lines
     *  @param values - list of fields in columns
     */
    override public function new(name:String, label:String,lines:Array<String>,data:FormData<String>, ?values:Array<Array<String>>){
        super();
        this.value = values;
        this.lines = lines;
        this.data = data;

        this.name = name;
        this.label = label;
    }


    override function render(){

        //var v : Array<Array<String>> = this.value;
        //trace(v);

        var str = new StringBuf();
        str.add("<table class='table table-bordered table-condensed'>");
        str.add("<tr>");
        str.add("<th></th>");
        for(f in data){
            str.add("<th>"+f.label+"</th>");
        }
        str.add("<tr>");
        var i = 0;
        for( l in lines){
            str.add("<tr>");
            str.add('<th>$l</th>');
            var a=0;
            for(f in data){
                var v = "";
                if(value[i]!=null && value[i][a]!=null) v = value[i][a];
                str.add('<td><input class="form-control" name="${parentForm.name}_${name}_${i}[]" value="${v}" /></td>');                
                a++;
            }
            str.add("</tr>");
            i++;
        }
        str.add("</table>");
        return str.toString();
    
    }

    override function populate(){

        value = [];
        var i = 0;
        for( l in lines){
            var v = sugoi.Web.getParamValues(parentForm.name + "_" + name +"_" + i );
            value.push(v);
            i++;
        }

		//throw value;
		
    }


}