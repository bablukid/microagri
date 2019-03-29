package form;
import sugoi.form.ListData;

/**
    RadioGRoup with "other" field
**/
class RadioGroup extends sugoi.form.elements.RadioGroup{

    var otherField:sugoi.form.elements.StringInput;
    var otherValue :String;

    override public function new(name:String, label:String,data:FormData<String>, ?selected:String, ?verticle:Bool=true, ?labelRight:Bool=true){

        super(name,label,data,selected,verticle,labelRight);
              
        //find value for "others"
        otherValue = null;
        if(selected!=null){
            if(!Lambda.exists(data,function(x) return x.value==selected)) otherValue = selected;            
        }

        if(otherValue=="other") otherValue==null;
       
        otherField = new sugoi.form.elements.StringInput(name+"_other","other",otherValue);
        otherField.internal = true;
        otherField.attributes = "placeholder='Si autre, précisez'";
    }


    override function render(){

        otherField.parentForm = this.parentForm;
        var s = super.render();

        //adds an extra radio button for others
        var n = parentForm.name +"_"+ this.name;        
        var radio = "<input type=\"radio\" name=\""+n+"\" id=\""+n+"\" value=\"other\" " + (value!=null && value==otherValue ? "checked":"") +" />\n";  
        var label = "<label for=\"" + n + "\" >Autre</label>";      
        var extraRadio = "<div>" + radio + label + otherField.render() + "</div>";

        return /*'[VALUE:$value]'+*/(s + extraRadio);

    }

    override function populate(){

        super.populate();
        if (value=="other"){
            var v = App.current.params.get(parentForm.name + "_" + name + "_other");
            if (v!=null && v!="") value = v;
        }

    }


}