package form;
import sugoi.form.ListData;
/**
Checkbox group with "other" field
**/
class Checkboxes extends sugoi.form.elements.CheckboxGroup{

    var other:sugoi.form.elements.StringInput;

    //this.value is Array<String>
    override public function new(name:String, label:String,data:FormData<String>, ?selected:Array<String>, ?verticle:Bool=true, ?labelRight:Bool=true){
        
        super(name,label,data,selected,verticle,labelRight);
        
        //find value for "others"
        var x = [];
        for( s in selected){
            if(!Lambda.exists(data,function(x) return x.value==s)) x.push(s);
        }
        var x = x.join(",");

        other = new sugoi.form.elements.StringInput("other","other",x);
        other.internal = true;

        other.attributes = "placeholder='Autres'";

    }


    override function render(){

        other.parentForm = this.parentForm;

        var s = super.render();        
        return s+other.render();

    }

    override function populate(){

        super.populate();

        var v = App.current.params.get(parentForm.name + "_" + "other");
        this.value.push(v);

    }


}