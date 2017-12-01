package form;
import sugoi.form.ListData;
/**
    Checkbox group with one field by checkbox
**/
class CheckboxesWithField extends sugoi.form.elements.CheckboxGroup{

    var extraFields:FormData<String>;
	var extraFieldValues: Array<Array<String>>;
    //value is Array<String>


    override public function new(name:String, label:String,data:FormData<String>, ?selected:Array<String>, ?verticle:Bool=true, ?labelRight:Bool=true){
        
		var selected2 = [];
		extraFieldValues = [];
		if(selected!=null){
			for( s in selected ){
				if (s.indexOf(";")>-1){
					var x = s.split(";");

					selected2.push( x.shift() );

					for( i in 0...x.copy().length ){
						if(extraFieldValues[i]==null) extraFieldValues[i] = [];
						extraFieldValues[i].push( x.shift() );
					}  
				}
			}
		}

		selected = selected2;
		
		//trace(extraFieldValues);
		
		super(name,label,data,selected,verticle,labelRight);

    }


    override function render(){

        /*other.parentForm = this.parentForm;

        var s = super.render();        
        return s+other.render();*/

		var s = "";
		var n = parentForm.name + "_" +name;
		
		var tagCss = getClasses();
		//var labelCss = getLabelClasses();
			
		var c = 0;
		var datas = Lambda.array(data);
		if (datas != null)
		{
			var rowsPerColumn = Math.ceil(datas.length / columns);
			s = "<table><tr>";
			for (i in 0...columns)
			{
				s += "<td valign=\"top\">\n";
				s += "<table>\n";
                

				//extrafields headers
                s += "<tr><td></td><td></td>";
				for(extr in extraFields){
					s += '<td class="text-center">${extr.label}</td>';
				}
				s += "</tr>";
				
				for (j in 0...rowsPerColumn)
				{
					if (c >= datas.length) break;
					
					s += "<tr>";
					
					var row:{label:String,value:String} = datas[c];
					var checked = "";
					var extraValues = [];

                    if(value!=null && Lambda.has(value, row.value)) {
						checked = "checked";

						var index = Lambda.indexOf(value,row.value);
						for(e in extraFieldValues) extraValues.push(e[index]);
					}

					var checkbox = '<input type="checkbox" class="$tagCss" name="${n}[]" id="${n+c}" value="${row.value}" $checked ></input>\n';
					var label = "<label for=\"" + n + c + "\" class=\"" + ''/*labelCss*/+"\" >" + row.label +"</label>\n";
					
					//render row
					s += "<td>" + label + "&nbsp;</td>\n";
					s += "<td>" + checkbox + "</td>\n";
					var i = 0;
					for(extr in extraFields){
						s += '<td><input style="margin-left:12px" type="text" class="form-control" name="${n+"_"+extr.value}[]" value="${extraValues[i]!=null?extraValues[i]:"" }"/></td>';
						i++;
					}
					s += "</tr>";
					
					c++;
				}
				s += "</table>";
				s += "</td>";
			}
			s += "</tr></table>\n";
			
		}
		
		return s;
    }

    override function populate(){

		var v = sugoi.Web.getParamValues(parentForm.name + "_" + name);
		extraFieldValues = [];
		for( e in extraFields){
			extraFieldValues.push( sugoi.Web.getParamValues(parentForm.name + "_" + name + "_" + e.value ) );
		}
		
		
		value = [];
		// v = [maraichage,viticulture]
		if(v != null){
			for( x in v ){
				for( i in 0...data.length){
					if( data[i].value == x ){

						var r = x;	
						for( e in extraFieldValues) r = r + ";" + e[i];
						value.push(r);
					}
				}
			}
		}

		//trace(value);
		// value = ["maraichage;25%;oui","viticulture;75%;non"]
    }


}