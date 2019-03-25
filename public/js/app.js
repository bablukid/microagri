(function (console, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function() {
	App.instance = this;
};
$hxClasses["App"] = App;
App.__name__ = ["App"];
App.instance = null;
App.j = function(r) {
	return js.JQuery(r);
};
App.main = function() {
	window._ = new App();
};
App.roundTo = function(n,r) {
	return Math.round(n * Math.pow(10,r)) / Math.pow(10,r);
};
App.prototype = {
	getCart: function() {
		return new Cart();
	}
	,getTagger: function(cid) {
		return new Tagger(cid);
	}
	,getTuto: function(name,step) {
		return new Tuto(name,step);
	}
	,getProductComposer: function() {
	}
	,getProductInput: function(divId,productName,txpProductId,formName) {
		window.document.addEventListener("DOMContentLoaded",function(event) {
			js.JQuery("form input[name='" + formName + "_name']").parent().parent().remove();
			js.JQuery("form select[name='" + formName + "_txpProductId']").parent().parent().remove();
			ReactDOM.render({ '$$typeof' : $$tre, type : react_ProductInput, props : { txpProductId : txpProductId, productName : productName, formName : formName}},window.document.getElementById(divId));
		});
	}
	,initReportHeader: function() {
		ReactDOM.render({ '$$typeof' : $$tre, type : react_ReportHeader, props : { }},window.document.querySelector("div.reportHeaderContainer"));
	}
	,overlay: function(url,title,large) {
		if(large == null) large = true;
		if(title != null) title = decodeURIComponent(title.split("+").join(" "));
		var r = new haxe_Http(url);
		r.onData = function(data) {
			var m = js.JQuery("#myModal");
			m.find(".modal-body").html(data);
			if(title != null) m.find(".modal-title").html(title);
			if(!large) m.find(".modal-dialog").removeClass("modal-lg");
			js.JQuery("#myModal").modal();
		};
		r.request();
	}
	,loginBox: function(redirectUrl) {
		var m = js.JQuery("#myModal");
		m.find(".modal-title").html("Connexion");
		m.find(".modal-dialog").removeClass("modal-lg");
		m.modal();
		ReactDOM.render({ '$$typeof' : $$tre, type : react_LoginBox, props : { redirectUrl : redirectUrl}},window.document.querySelector("#myModal .modal-body"));
		return false;
	}
	,registerBox: function(redirectUrl) {
		var m = js.JQuery("#myModal");
		m.find(".modal-title").html("Inscription");
		m.find(".modal-dialog").removeClass("modal-lg");
		m.modal();
		ReactDOM.render({ '$$typeof' : $$tre, type : react_RegisterBox, props : { redirectUrl : redirectUrl}},window.document.querySelector("#myModal .modal-body"));
		return false;
	}
	,getCheckboxesId: function(formSelector) {
		var out = [];
		var checkboxes = window.document.querySelectorAll(formSelector + " input[type=checkbox]");
		var _g = 0;
		while(_g < checkboxes.length) {
			var input = checkboxes[_g];
			++_g;
			var input1 = input;
			if(input1.checked) out.push(input1.value);
		}
		return out;
	}
	,getHostedPlugin: function() {
		return new hosted_js_App();
	}
	,setWarningOnUnload: function(active,msg) {
		if(active) window.addEventListener("beforeunload",$bind(this,this.warn)); else window.removeEventListener("beforeunload",$bind(this,this.warn));
	}
	,warn: function(e) {
		var msg = "Voulez vous vraiment quitter cette page ?";
		e.returnValue = msg;
		e.preventDefault();
		return msg;
	}
	,__class__: App
};
var Cart = function() {
	this.products = new haxe_ds_IntMap();
	this.order = { products : []};
	this.categories = [];
	this.pinnedCategories = [];
};
$hxClasses["Cart"] = Cart;
Cart.__name__ = ["Cart"];
Cart.prototype = {
	products: null
	,categories: null
	,pinnedCategories: null
	,order: null
	,loader: null
	,cartTop: null
	,cartLeft: null
	,cartWidth: null
	,jWindow: null
	,cartContainer: null
	,date: null
	,place: null
	,add: function(pid) {
		var _g = this;
		this.loader.show();
		var q = js.JQuery("#productQt" + pid).val();
		var qt = 0.0;
		var p = this.products.h[pid];
		if(p.hasFloatQt) {
			q = StringTools.replace(q,",",".");
			qt = parseFloat(q);
		} else qt = Std.parseInt(q);
		if(qt == null) qt = 1;
		var r = new haxe_Http("/shop/add/" + pid + "/" + qt);
		r.onData = function(data) {
			_g.loader.hide();
			var d = JSON.parse(data);
			if(!d.success) js_Browser.alert("Erreur : " + Std.string(d));
			_g.subAdd(pid,qt);
			_g.render();
		};
		r.request();
	}
	,subAdd: function(pid,qt) {
		var _g = 0;
		var _g1 = this.order.products;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(p.productId == pid) {
				p.quantity += qt;
				this.render();
				return;
			}
		}
		this.order.products.push({ productId : pid, quantity : qt});
	}
	,render: function() {
		var _g = this;
		var c = js.JQuery("#cart");
		c.empty();
		c.append(Lambda.map(this.order.products,function(x) {
			var p = _g.products.h[x.productId];
			if(p == null) return "";
			var btn = "<a onClick='cart.remove(" + p.id + ")' class='btn btn-default btn-xs' data-toggle='tooltip' data-placement='top' title='Retirer de la commande'><span class='glyphicon glyphicon-remove'></span></a>&nbsp;";
			return "<div class='row'> \r\n\t\t\t\t<div class = 'order col-md-9' > <b> " + x.quantity + " </b> x " + p.name + " </div>\r\n\t\t\t\t<div class = 'col-md-3'> " + btn + "</div>\t\t\t\r\n\t\t\t</div>";
		}).join("\n"));
		var total = 0.0;
		var _g1 = 0;
		var _g11 = this.order.products;
		while(_g1 < _g11.length) {
			var p1 = _g11[_g1];
			++_g1;
			var pinfo = this.products.h[p1.productId];
			if(pinfo == null) continue;
			total += p1.quantity * pinfo.price;
		}
		var ffilter = new sugoi_form_filters_FloatFilter();
		var total1 = ffilter.filterString(Std.string(App.roundTo(total,2)));
		c.append("<div class='total'>TOTAL : " + total1 + "</div>");
		if(this.order.products.length > 0) App.instance.setWarningOnUnload(true,"Vous avez une commande en cours. Si vous quittez cette page sans confirmer, votre commande sera perdue."); else App.instance.setWarningOnUnload(false);
	}
	,findCategoryName: function(cid) {
		var _g = 0;
		var _g1 = this.categories;
		while(_g < _g1.length) {
			var cg = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = cg.categs;
			while(_g2 < _g3.length) {
				var c = _g3[_g2];
				++_g2;
				if(cid == c.id) return c.name;
			}
		}
		var _g4 = 0;
		var _g11 = this.pinnedCategories;
		while(_g4 < _g11.length) {
			var cg1 = _g11[_g4];
			++_g4;
			var _g21 = 0;
			var _g31 = cg1.categs;
			while(_g21 < _g31.length) {
				var c1 = _g31[_g21];
				++_g21;
				if(cid == c1.id) return c1.name;
			}
		}
		return null;
	}
	,sortProductsBy: function() {
		var groups = new haxe_ds_IntMap();
		var pinned = new haxe_ds_IntMap();
		var firstCategGroup = this.categories[0].categs;
		var pList;
		var _this = Lambda.array(this.products);
		pList = _this.slice();
		var _g = 0;
		var _g1 = pList.slice();
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.element.remove();
			var _g2 = 0;
			var _g3 = p.categories;
			while(_g2 < _g3.length) {
				var categ = [_g3[_g2]];
				++_g2;
				if(Lambda.find(firstCategGroup,(function(categ) {
					return function(c) {
						return c.id == categ[0];
					};
				})(categ)) != null) {
					var g = groups.h[categ[0]];
					if(g == null) {
						var name = this.findCategoryName(categ[0]);
						g = { name : name, products : []};
					}
					g.products.push(p);
					HxOverrides.remove(pList,p);
					groups.h[categ[0]] = g;
				} else {
					var isInPinnedCateg = false;
					var _g4 = 0;
					var _g5 = this.pinnedCategories;
					while(_g4 < _g5.length) {
						var cg = _g5[_g4];
						++_g4;
						if(Lambda.find(cg.categs,(function(categ) {
							return function(c1) {
								return c1.id == categ[0];
							};
						})(categ)) != null) {
							isInPinnedCateg = true;
							break;
						}
					}
					if(isInPinnedCateg) {
						var c2 = pinned.h[categ[0]];
						if(c2 == null) {
							var name1 = this.findCategoryName(categ[0]);
							c2 = { name : name1, products : []};
						}
						c2.products.push(p);
						HxOverrides.remove(pList,p);
						pinned.h[categ[0]] = c2;
					} else continue;
				}
			}
		}
		if(pList.length > 0) groups.h[0] = { name : "Autres", products : pList};
		var container = js.JQuery(".shop .body");
		var _g6 = 0;
		var _g11 = [pinned,groups];
		while(_g6 < _g11.length) {
			var source = _g11[_g6];
			++_g6;
			var $it0 = source.iterator();
			while( $it0.hasNext() ) {
				var o = $it0.next();
				if(o.products.length == 0) continue;
				container.append("<div class='col-md-12 col-xs-12 col-sm-12 col-lg-12'><div class='catHeader'>" + o.name + "</div></div>");
				var _g21 = 0;
				var _g31 = o.products;
				while(_g21 < _g31.length) {
					var p1 = _g31[_g21];
					++_g21;
					if(p1.element.parent().length == 0) container.append(p1.element); else {
						var clone = p1.element.clone();
						container.append(clone);
					}
				}
			}
		}
		js.JQuery(".product").show();
	}
	,isEmpty: function() {
		return this.order.products.length == 0;
	}
	,submit: function() {
		var _g = this;
		var req = new haxe_Http("/shop/submit");
		req.onData = function(d) {
			App.instance.setWarningOnUnload(false);
			window.location.href = "/shop/validate/" + _g.place + "/" + _g.date;
		};
		req.addParameter("data",JSON.stringify(this.order));
		req.request(true);
	}
	,filter: function(cat) {
		js.JQuery(".tag").removeClass("active").children().remove("span");
		var bt = js.JQuery("#tag" + cat);
		bt.addClass("active").prepend("<span class ='glyphicon glyphicon-ok'></span> ");
		var $it0 = this.products.iterator();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			if(cat == 0 || Lambda.has(p.categories,cat)) js.JQuery(".shop .product" + p.id).fadeIn(300); else js.JQuery(".shop .product" + p.id).fadeOut(300);
		}
	}
	,remove: function(pid) {
		var _g = this;
		this.loader.show();
		var r = new haxe_Http("/shop/remove/" + pid);
		r.onData = function(data) {
			_g.loader.hide();
			var d = JSON.parse(data);
			if(!d.success) js_Browser.alert("Erreur : " + Std.string(d));
			var _g1 = 0;
			var _g2 = _g.order.products.slice();
			while(_g1 < _g2.length) {
				var p = _g2[_g1];
				++_g1;
				if(p.productId == pid) {
					HxOverrides.remove(_g.order.products,p);
					_g.render();
					return;
				}
			}
			_g.render();
		};
		r.request();
	}
	,init: function(place,date) {
		var _g = this;
		this.place = place;
		this.date = date;
		this.loader = js.JQuery("#cartContainer #loader");
		var req = new haxe_Http("/shop/init/" + place + "/" + date);
		req.onData = function(data) {
			_g.loader.hide();
			var data1 = haxe_Unserializer.run(data);
			var _g1 = 0;
			var _g2 = data1.categories;
			while(_g1 < _g2.length) {
				var cg = _g2[_g1];
				++_g1;
				if(cg.pinned) _g.pinnedCategories.push(cg); else _g.categories.push(cg);
			}
			var _g11 = 0;
			var _g21 = data1.products;
			while(_g11 < _g21.length) {
				var p = _g21[_g11];
				++_g11;
				p.element = js.JQuery(".product" + p.id);
				var id = p.id;
				_g.products.h[id] = p;
			}
			var _g12 = 0;
			var _g22 = data1.order.products;
			while(_g12 < _g22.length) {
				var p1 = _g22[_g12];
				++_g12;
				_g.subAdd(p1.productId,p1.quantity);
			}
			_g.render();
			_g.sortProductsBy();
		};
		req.request();
	}
	,onScroll: function(e) {
		if(this.jWindow.scrollTop() > this.cartTop) {
			this.cartContainer.addClass("scrolled");
			this.cartContainer.css("left",Std.string(this.cartLeft) + "px");
			this.cartContainer.css("top","10" + "px");
			this.cartContainer.css("width",Std.string(this.cartWidth) + "px");
		} else {
			this.cartContainer.removeClass("scrolled");
			this.cartContainer.css("left","");
			this.cartContainer.css("top","");
			this.cartContainer.css("width","");
		}
	}
	,__class__: Cart
};
var UnitType = $hxClasses["UnitType"] = { __ename__ : ["UnitType"], __constructs__ : ["Piece","Kilogram","Gram","Litre"] };
UnitType.Piece = ["Piece",0];
UnitType.Piece.toString = $estr;
UnitType.Piece.__enum__ = UnitType;
UnitType.Kilogram = ["Kilogram",1];
UnitType.Kilogram.toString = $estr;
UnitType.Kilogram.__enum__ = UnitType;
UnitType.Gram = ["Gram",2];
UnitType.Gram.toString = $estr;
UnitType.Gram.__enum__ = UnitType;
UnitType.Litre = ["Litre",3];
UnitType.Litre.toString = $estr;
UnitType.Litre.__enum__ = UnitType;
UnitType.__empty_constructs__ = [UnitType.Piece,UnitType.Kilogram,UnitType.Gram,UnitType.Litre];
var ProductType = $hxClasses["ProductType"] = { __ename__ : ["ProductType"], __constructs__ : ["CTVegetable","CTCheese","CTChicken","CTUnknown","CTWine","CTMeat","CTEggs","CTHoney","CTFish","CTJuice","CTApple","CTBread","CTYahourt"] };
ProductType.CTVegetable = ["CTVegetable",0];
ProductType.CTVegetable.toString = $estr;
ProductType.CTVegetable.__enum__ = ProductType;
ProductType.CTCheese = ["CTCheese",1];
ProductType.CTCheese.toString = $estr;
ProductType.CTCheese.__enum__ = ProductType;
ProductType.CTChicken = ["CTChicken",2];
ProductType.CTChicken.toString = $estr;
ProductType.CTChicken.__enum__ = ProductType;
ProductType.CTUnknown = ["CTUnknown",3];
ProductType.CTUnknown.toString = $estr;
ProductType.CTUnknown.__enum__ = ProductType;
ProductType.CTWine = ["CTWine",4];
ProductType.CTWine.toString = $estr;
ProductType.CTWine.__enum__ = ProductType;
ProductType.CTMeat = ["CTMeat",5];
ProductType.CTMeat.toString = $estr;
ProductType.CTMeat.__enum__ = ProductType;
ProductType.CTEggs = ["CTEggs",6];
ProductType.CTEggs.toString = $estr;
ProductType.CTEggs.__enum__ = ProductType;
ProductType.CTHoney = ["CTHoney",7];
ProductType.CTHoney.toString = $estr;
ProductType.CTHoney.__enum__ = ProductType;
ProductType.CTFish = ["CTFish",8];
ProductType.CTFish.toString = $estr;
ProductType.CTFish.__enum__ = ProductType;
ProductType.CTJuice = ["CTJuice",9];
ProductType.CTJuice.toString = $estr;
ProductType.CTJuice.__enum__ = ProductType;
ProductType.CTApple = ["CTApple",10];
ProductType.CTApple.toString = $estr;
ProductType.CTApple.__enum__ = ProductType;
ProductType.CTBread = ["CTBread",11];
ProductType.CTBread.toString = $estr;
ProductType.CTBread.__enum__ = ProductType;
ProductType.CTYahourt = ["CTYahourt",12];
ProductType.CTYahourt.toString = $estr;
ProductType.CTYahourt.__enum__ = ProductType;
ProductType.__empty_constructs__ = [ProductType.CTVegetable,ProductType.CTCheese,ProductType.CTChicken,ProductType.CTUnknown,ProductType.CTWine,ProductType.CTMeat,ProductType.CTEggs,ProductType.CTHoney,ProductType.CTFish,ProductType.CTJuice,ProductType.CTApple,ProductType.CTBread,ProductType.CTYahourt];
var OrderFlags = $hxClasses["OrderFlags"] = { __ename__ : ["OrderFlags"], __constructs__ : ["InvertSharedOrder"] };
OrderFlags.InvertSharedOrder = ["InvertSharedOrder",0];
OrderFlags.InvertSharedOrder.toString = $estr;
OrderFlags.InvertSharedOrder.__enum__ = OrderFlags;
OrderFlags.__empty_constructs__ = [OrderFlags.InvertSharedOrder];
var Event = $hxClasses["Event"] = { __ename__ : ["Event"], __constructs__ : ["Page","Nav"] };
Event.Page = function(uri) { var $x = ["Page",0,uri]; $x.__enum__ = Event; $x.toString = $estr; return $x; };
Event.Nav = function(nav,name,id) { var $x = ["Nav",1,nav,name,id]; $x.__enum__ = Event; $x.toString = $estr; return $x; };
Event.__empty_constructs__ = [];
var TutoAction = $hxClasses["TutoAction"] = { __ename__ : ["TutoAction"], __constructs__ : ["TAPage","TANext"] };
TutoAction.TAPage = function(uri) { var $x = ["TAPage",0,uri]; $x.__enum__ = TutoAction; $x.toString = $estr; return $x; };
TutoAction.TANext = ["TANext",1];
TutoAction.TANext.toString = $estr;
TutoAction.TANext.__enum__ = TutoAction;
TutoAction.__empty_constructs__ = [TutoAction.TANext];
var TutoPlacement = $hxClasses["TutoPlacement"] = { __ename__ : ["TutoPlacement"], __constructs__ : ["TPTop","TPBottom","TPLeft","TPRight"] };
TutoPlacement.TPTop = ["TPTop",0];
TutoPlacement.TPTop.toString = $estr;
TutoPlacement.TPTop.__enum__ = TutoPlacement;
TutoPlacement.TPBottom = ["TPBottom",1];
TutoPlacement.TPBottom.toString = $estr;
TutoPlacement.TPBottom.__enum__ = TutoPlacement;
TutoPlacement.TPLeft = ["TPLeft",2];
TutoPlacement.TPLeft.toString = $estr;
TutoPlacement.TPLeft.__enum__ = TutoPlacement;
TutoPlacement.TPRight = ["TPRight",3];
TutoPlacement.TPRight.toString = $estr;
TutoPlacement.TPRight.__enum__ = TutoPlacement;
TutoPlacement.__empty_constructs__ = [TutoPlacement.TPTop,TutoPlacement.TPBottom,TutoPlacement.TPLeft,TutoPlacement.TPRight];
var _$Map_Map_$Impl_$ = {};
$hxClasses["_Map.Map_Impl_"] = _$Map_Map_$Impl_$;
_$Map_Map_$Impl_$.__name__ = ["_Map","Map_Impl_"];
_$Map_Map_$Impl_$._new = null;
_$Map_Map_$Impl_$.set = function(this1,key,value) {
	this1.set(key,value);
};
_$Map_Map_$Impl_$.get = function(this1,key) {
	return this1.get(key);
};
_$Map_Map_$Impl_$.exists = function(this1,key) {
	return this1.exists(key);
};
_$Map_Map_$Impl_$.remove = function(this1,key) {
	return this1.remove(key);
};
_$Map_Map_$Impl_$.keys = function(this1) {
	return this1.keys();
};
_$Map_Map_$Impl_$.iterator = function(this1) {
	return this1.iterator();
};
_$Map_Map_$Impl_$.toString = function(this1) {
	return this1.toString();
};
_$Map_Map_$Impl_$.arrayWrite = function(this1,k,v) {
	this1.set(k,v);
	return v;
};
_$Map_Map_$Impl_$.toStringMap = function(t) {
	return new haxe_ds_StringMap();
};
_$Map_Map_$Impl_$.toIntMap = function(t) {
	return new haxe_ds_IntMap();
};
_$Map_Map_$Impl_$.toEnumValueMapMap = function(t) {
	return new haxe_ds_EnumValueMap();
};
_$Map_Map_$Impl_$.toObjectMap = function(t) {
	return new haxe_ds_ObjectMap();
};
_$Map_Map_$Impl_$.fromStringMap = function(map) {
	return map;
};
_$Map_Map_$Impl_$.fromIntMap = function(map) {
	return map;
};
_$Map_Map_$Impl_$.fromObjectMap = function(map) {
	return map;
};
var Data = function() { };
$hxClasses["Data"] = Data;
Data.__name__ = ["Data"];
var OrdersReportGroupOption = $hxClasses["OrdersReportGroupOption"] = { __ename__ : ["OrdersReportGroupOption"], __constructs__ : ["ByMember","ByProduct"] };
OrdersReportGroupOption.ByMember = ["ByMember",0];
OrdersReportGroupOption.ByMember.toString = $estr;
OrdersReportGroupOption.ByMember.__enum__ = OrdersReportGroupOption;
OrdersReportGroupOption.ByProduct = ["ByProduct",1];
OrdersReportGroupOption.ByProduct.toString = $estr;
OrdersReportGroupOption.ByProduct.__enum__ = OrdersReportGroupOption;
OrdersReportGroupOption.__empty_constructs__ = [OrdersReportGroupOption.ByMember,OrdersReportGroupOption.ByProduct];
var OrdersReportFormatOption = $hxClasses["OrdersReportFormatOption"] = { __ename__ : ["OrdersReportFormatOption"], __constructs__ : ["Table","Csv","PrintableList"] };
OrdersReportFormatOption.Table = ["Table",0];
OrdersReportFormatOption.Table.toString = $estr;
OrdersReportFormatOption.Table.__enum__ = OrdersReportFormatOption;
OrdersReportFormatOption.Csv = ["Csv",1];
OrdersReportFormatOption.Csv.toString = $estr;
OrdersReportFormatOption.Csv.__enum__ = OrdersReportFormatOption;
OrdersReportFormatOption.PrintableList = ["PrintableList",2];
OrdersReportFormatOption.PrintableList.toString = $estr;
OrdersReportFormatOption.PrintableList.__enum__ = OrdersReportFormatOption;
OrdersReportFormatOption.__empty_constructs__ = [OrdersReportFormatOption.Table,OrdersReportFormatOption.Csv,OrdersReportFormatOption.PrintableList];
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return HxOverrides.substr(this.r.s,0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			return b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.add(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.add(HxOverrides.substr(s,offset,p.pos - offset));
			buf.add(f(this));
			if(p.len == 0) {
				buf.add(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.add(HxOverrides.substr(s,offset,null));
		return buf.b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.lastIndexOf = function(a,obj,i) {
	var len = a.length;
	if(i >= len) i = len - 1; else if(i < 0) i += len;
	while(i >= 0) {
		if(a[i] === obj) return i;
		i--;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = ["IntIterator"];
IntIterator.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
};
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
};
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
};
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
};
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
Lambda.find = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(f(v)) return v;
	}
	return null;
};
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x1 = $it1.next();
		l.add(x1);
	}
	return l;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,last: function() {
		if(this.q == null) return null; else return this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,toString: function() {
		var s_b = "";
		var first = true;
		var l = this.h;
		s_b += "{";
		while(l != null) {
			if(first) first = false; else s_b += ", ";
			s_b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s_b += "}";
		return s_b;
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else if(sep == null) s.b += "null"; else s.b += "" + sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	head: null
	,val: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		Reflect.setField(o2,f,Reflect.field(o,f));
	}
	return o2;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.instance = function(value,c) {
	if((value instanceof c)) return value; else return null;
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,get_length: function() {
		return this.b.length;
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,toString: function() {
		return this.b;
	}
	,__class__: StringBuf
	,__properties__: {get_length:"get_length"}
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = s + c;
	return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.isEof = function(c) {
	return c != c;
};
var Tagger = function(cid) {
	this.contractId = cid;
};
$hxClasses["Tagger"] = Tagger;
Tagger.__name__ = ["Tagger"];
Tagger.prototype = {
	contractId: null
	,data: null
	,init: function() {
		var _g = this;
		var req = new haxe_Http("/product/categorizeInit/" + this.contractId);
		req.onData = function(_data) {
			_g.data = JSON.parse(_data);
			_g.render();
		};
		req.request();
	}
	,render: function() {
		var _g = this;
		var html = new StringBuf();
		html.b += "<table class='table'>";
		var _g1 = 0;
		var _g11 = this.data.products;
		while(_g1 < _g11.length) {
			var p = _g11[_g1];
			++_g1;
			html.b += Std.string("<tr class='p" + p.product.id + "'>");
			html.b += Std.string("<td><input type='checkbox' name='p" + p.product.id + "' /></td>");
			html.b += Std.string("<td>" + p.product.name + "</td>");
			var tags = [];
			var _g2 = 0;
			var _g3 = p.categories;
			while(_g2 < _g3.length) {
				var c = _g3[_g2];
				++_g2;
				var name = "";
				var color = "";
				var _g4 = 0;
				var _g5 = this.data.categories;
				while(_g4 < _g5.length) {
					var gc = _g5[_g4];
					++_g4;
					var _g6 = 0;
					var _g7 = gc.tags;
					while(_g6 < _g7.length) {
						var t = _g7[_g6];
						++_g6;
						if(c == t.id) {
							name = t.name;
							color = gc.color;
						}
					}
				}
				tags.push("<span class='tag t" + c + "' style='background-color:" + color + ";cursor:pointer;'>" + name + "</span>");
			}
			html.add("<td class='tags'>" + tags.join(" ") + "</td>");
			html.b += "</tr>";
		}
		html.b += "</table>";
		js.JQuery("#tagger").html(html.b);
		js.JQuery("#tagger .tag").click(function(e) {
			var el = e.currentTarget;
			var tid = Std.parseInt((function($this) {
				var $r;
				var _this = el.getAttribute("class").split(" ")[1];
				$r = HxOverrides.substr(_this,1,null);
				return $r;
			}(this)));
			var pid = Std.parseInt((function($this) {
				var $r;
				var _this1 = el.parentElement.parentElement.getAttribute("class");
				$r = HxOverrides.substr(_this1,1,null);
				return $r;
			}(this)));
			el.remove();
			_g.remove(tid,pid);
		});
	}
	,add: function() {
		var tagId = Std.parseInt(js.JQuery("#tag").val());
		if(tagId == 0) js_Browser.alert("Impossible de trouver la catégorie selectionnée");
		var pids = [];
		var $it0 = (function($this) {
			var $r;
			var _this = js.JQuery("#tagger input:checked");
			$r = (_this.iterator)();
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var e = $it0.next();
			pids.push(Std.parseInt((function($this) {
				var $r;
				var _this1 = e.attr("name");
				$r = HxOverrides.substr(_this1,1,null);
				return $r;
			}(this))));
		}
		if(pids.length == 0) js_Browser.alert("Sélectionnez un produit afin de pouvoir lui attribuer une catégorie");
		var _g = 0;
		while(_g < pids.length) {
			var p = pids[_g];
			++_g;
			this.addTag(tagId,p);
		}
		this.render();
	}
	,remove: function(tagId,productId) {
		var _g = 0;
		var _g1 = this.data.products;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(p.product.id == productId) {
				var _g2 = 0;
				var _g3 = p.categories;
				while(_g2 < _g3.length) {
					var t = _g3[_g2];
					++_g2;
					if(t == tagId) HxOverrides.remove(p.categories,t);
				}
			}
		}
	}
	,addTag: function(tagId,productId) {
		var _g = 0;
		var _g1 = this.data.products;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(p.product.id == productId) {
				var _g2 = 0;
				var _g3 = p.categories;
				while(_g2 < _g3.length) {
					var t = _g3[_g2];
					++_g2;
					if(t == tagId) return;
				}
			}
		}
		var _g4 = 0;
		var _g11 = this.data.products;
		while(_g4 < _g11.length) {
			var p1 = _g11[_g4];
			++_g4;
			if(p1.product.id == productId) {
				p1.categories.push(tagId);
				break;
			}
		}
	}
	,submit: function() {
		var req = new haxe_Http("/product/categorizeSubmit/" + this.contractId);
		req.addParameter("data",JSON.stringify(this.data));
		req.onData = function(_data) {
			js_Browser.alert(_data);
		};
		req.request(true);
	}
	,__class__: Tagger
};
var Tuto = function(name,step) {
	this.name = name;
	this.step = step;
	var tuto = Data.TUTOS.get(name);
	var s = tuto.steps[step];
	var p = js.JQuery(".popover");
	p.popover("hide");
	if(s == null) {
		var m = js.JQuery("#myModal");
		m.modal("show");
		m.addClass("help");
		m.find(".modal-header").html("<span class='glyphicon glyphicon-hand-right'></span> " + tuto.name);
		m.find(".modal-body").html("<span class='glyphicon glyphicon-ok'></span> Ce tutoriel est terminé.");
		var bt = js.JQuery("<a class='btn btn-default'><span class='glyphicon glyphicon-chevron-right'></span> Revenir à la page des tutoriels</a>");
		bt.click(function(_) {
			m.modal("hide");
			window.location.href = "/contract?stopTuto=1";
		});
		m.find(".modal-footer").append(bt);
		m.find(".modal-dialog").removeClass("modal-lg");
	} else if(s.element == null) {
		var m1 = js.JQuery("#myModal");
		m1.modal("show");
		m1.addClass("help");
		m1.find(".modal-body").html(s.text);
		m1.find(".modal-header").html("<span class='glyphicon glyphicon-hand-right'></span> " + tuto.name);
		var bt1 = js.JQuery("<a class='btn btn-default'><span class='glyphicon glyphicon-chevron-right'></span> OK</a>");
		bt1.click(function(_1) {
			m1.modal("hide");
			new Tuto(name,step + 1);
		});
		m1.find(".modal-footer").append(bt1);
		m1.find(".modal-dialog").removeClass("modal-lg");
	} else {
		var x = js.JQuery(s.element).first().attr("title",tuto.name + " <div class='pull-right'>" + (step + 1) + "/" + tuto.steps.length + "</div>");
		var text = "<p>" + s.text + "</p>";
		var bt2 = null;
		var _g = s.action;
		switch(_g[1]) {
		case 1:
			bt2 = js.JQuery("<p><a class='btn btn-default btn-sm'><span class='glyphicon glyphicon-chevron-right'></span> Suite</a></p>");
			bt2.click(function(_2) {
				new Tuto(name,step + 1);
				if(Tuto.LAST_ELEMENT != null) js.JQuery(s.element).removeClass("highlight");
			});
			break;
		default:
		}
		var p1;
		var _g1 = s.placement;
		switch(_g1[1]) {
		case 0:
			p1 = "top";
			break;
		case 1:
			p1 = "bottom";
			break;
		case 2:
			p1 = "left";
			break;
		case 3:
			p1 = "right";
			break;
		}
		var options = { container : "body", content : text, html : true, placement : p1};
		x.popover(options).popover("show");
		var footer = js.JQuery("<div class='footer'><div class='pull-left'></div><div class='pull-right'></div></div>");
		if(bt2 != null) footer.find(".pull-right").append(bt2);
		footer.find(".pull-left").append(this.makeCloseButton("Stop"));
		js.JQuery(".popover .popover-content").append(footer);
		js.JQuery(s.element).first().addClass("highlight");
		Tuto.LAST_ELEMENT = s.element;
	}
};
$hxClasses["Tuto"] = Tuto;
Tuto.__name__ = ["Tuto"];
Tuto.prototype = {
	name: null
	,step: null
	,makeCloseButton: function(text) {
		var bt = js.JQuery("<a class='btn btn-default btn-sm'><span class='glyphicon glyphicon-remove'></span> " + text + "</a>");
		bt.click(function(_) {
			window.location.href = "/contract?stopTuto=1";
		});
		return bt;
	}
	,__class__: Tuto
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
ValueType.__empty_constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw new js__$Boot_HaxeError(index + " is not a valid enum constructor index");
	return Type.createEnum(e,c,params);
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		haxe_CallStack.lastException = e1;
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		return false;
	}
	return true;
};
Type.enumConstructor = function(e) {
	return e[0];
};
Type.enumParameters = function(e) {
	return e.slice(2);
};
Type.enumIndex = function(e) {
	return e[1];
};
Type.allEnums = function(e) {
	return e.__empty_constructs__;
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	get: null
	,set: null
	,exists: null
	,remove: null
	,keys: null
	,iterator: null
	,toString: null
	,__class__: haxe_IMap
};
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = ["haxe","Http"];
haxe_Http.requestUrl = function(url) {
	var h = new haxe_Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw new js__$Boot_HaxeError(e);
	};
	h.request(false);
	return r;
};
haxe_Http.prototype = {
	url: null
	,responseData: null
	,async: null
	,postData: null
	,headers: null
	,params: null
	,setHeader: function(header,value) {
		this.headers = Lambda.filter(this.headers,function(h) {
			return h.header != header;
		});
		this.headers.push({ header : header, value : value});
		return this;
	}
	,addHeader: function(header,value) {
		this.headers.push({ header : header, value : value});
		return this;
	}
	,setParameter: function(param,value) {
		this.params = Lambda.filter(this.params,function(p) {
			return p.param != param;
		});
		this.params.push({ param : param, value : value});
		return this;
	}
	,addParameter: function(param,value) {
		this.params.push({ param : param, value : value});
		return this;
	}
	,setPostData: function(data) {
		this.postData = data;
		return this;
	}
	,req: null
	,cancel: function() {
		if(this.req == null) return;
		this.req.abort();
		this.req = null;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				haxe_CallStack.lastException = e;
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			haxe_CallStack.lastException = e1;
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe__$Int32_Int32_$Impl_$ = {};
$hxClasses["haxe._Int32.Int32_Impl_"] = haxe__$Int32_Int32_$Impl_$;
haxe__$Int32_Int32_$Impl_$.__name__ = ["haxe","_Int32","Int32_Impl_"];
haxe__$Int32_Int32_$Impl_$.preIncrement = function(this1) {
	return (function($this) {
		var $r;
		var x = ++this1;
		$r = this1 = x | 0;
		return $r;
	}(this));
};
haxe__$Int32_Int32_$Impl_$.postIncrement = function(this1) {
	var ret = this1++;
	this1 = this1 | 0;
	return ret;
};
haxe__$Int32_Int32_$Impl_$.preDecrement = function(this1) {
	return (function($this) {
		var $r;
		var x = --this1;
		$r = this1 = x | 0;
		return $r;
	}(this));
};
haxe__$Int32_Int32_$Impl_$.postDecrement = function(this1) {
	var ret = this1--;
	this1 = this1 | 0;
	return ret;
};
haxe__$Int32_Int32_$Impl_$.add = function(a,b) {
	return a + b | 0;
};
haxe__$Int32_Int32_$Impl_$.addInt = function(a,b) {
	return a + b | 0;
};
haxe__$Int32_Int32_$Impl_$.sub = function(a,b) {
	return a - b | 0;
};
haxe__$Int32_Int32_$Impl_$.subInt = function(a,b) {
	return a - b | 0;
};
haxe__$Int32_Int32_$Impl_$.intSub = function(a,b) {
	return a - b | 0;
};
haxe__$Int32_Int32_$Impl_$.mul = function(a,b) {
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
};
haxe__$Int32_Int32_$Impl_$.mulInt = function(a,b) {
	return haxe__$Int32_Int32_$Impl_$.mul(a,b);
};
haxe__$Int32_Int32_$Impl_$.toFloat = function(this1) {
	return this1;
};
haxe__$Int32_Int32_$Impl_$.ucompare = function(a,b) {
	if(a < 0) if(b < 0) return ~b - ~a | 0; else return 1;
	if(b < 0) return -1; else return a - b | 0;
};
haxe__$Int32_Int32_$Impl_$.clamp = function(x) {
	return x | 0;
};
var haxe__$Int64_Int64_$Impl_$ = {};
$hxClasses["haxe._Int64.Int64_Impl_"] = haxe__$Int64_Int64_$Impl_$;
haxe__$Int64_Int64_$Impl_$.__name__ = ["haxe","_Int64","Int64_Impl_"];
haxe__$Int64_Int64_$Impl_$.__properties__ = {get_low:"get_low",get_high:"get_high"}
haxe__$Int64_Int64_$Impl_$._new = function(x) {
	return x;
};
haxe__$Int64_Int64_$Impl_$.copy = function(this1) {
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	return x;
};
haxe__$Int64_Int64_$Impl_$.make = function(high,low) {
	var x = new haxe__$Int64__$_$_$Int64(high,low);
	return x;
};
haxe__$Int64_Int64_$Impl_$.ofInt = function(x) {
	var x1 = new haxe__$Int64__$_$_$Int64(x >> 31,x);
	return x1;
};
haxe__$Int64_Int64_$Impl_$.toInt = function(x) {
	if(x.high != x.low >> 31) throw new js__$Boot_HaxeError("Overflow");
	return x.low;
};
haxe__$Int64_Int64_$Impl_$["is"] = function(val) {
	return js_Boot.__instanceof(val,haxe__$Int64__$_$_$Int64);
};
haxe__$Int64_Int64_$Impl_$.getHigh = function(x) {
	return x.high;
};
haxe__$Int64_Int64_$Impl_$.getLow = function(x) {
	return x.low;
};
haxe__$Int64_Int64_$Impl_$.isNeg = function(x) {
	return x.high < 0;
};
haxe__$Int64_Int64_$Impl_$.isZero = function(x) {
	var b;
	{
		var x1 = new haxe__$Int64__$_$_$Int64(0,0);
		b = x1;
	}
	return x.high == b.high && x.low == b.low;
};
haxe__$Int64_Int64_$Impl_$.compare = function(a,b) {
	var v = a.high - b.high | 0;
	if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b.low);
	if(a.high < 0) {
		if(b.high < 0) return v; else return -1;
	} else if(b.high >= 0) return v; else return 1;
};
haxe__$Int64_Int64_$Impl_$.ucompare = function(a,b) {
	var v = haxe__$Int32_Int32_$Impl_$.ucompare(a.high,b.high);
	if(v != 0) return v; else return haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b.low);
};
haxe__$Int64_Int64_$Impl_$.toStr = function(x) {
	return haxe__$Int64_Int64_$Impl_$.toString(x);
};
haxe__$Int64_Int64_$Impl_$.toString = function(this1) {
	var i = this1;
	if((function($this) {
		var $r;
		var b;
		{
			var x = new haxe__$Int64__$_$_$Int64(0,0);
			b = x;
		}
		$r = i.high == b.high && i.low == b.low;
		return $r;
	}(this))) return "0";
	var str = "";
	var neg = false;
	if(i.high < 0) {
		neg = true;
		var high = ~i.high;
		var low = -i.low;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
			ret;
		}
		var x1 = new haxe__$Int64__$_$_$Int64(high,low);
		i = x1;
	}
	var ten;
	{
		var x2 = new haxe__$Int64__$_$_$Int64(0,10);
		ten = x2;
	}
	while((function($this) {
		var $r;
		var b1;
		{
			var x3 = new haxe__$Int64__$_$_$Int64(0,0);
			b1 = x3;
		}
		$r = i.high != b1.high || i.low != b1.low;
		return $r;
	}(this))) {
		var r = haxe__$Int64_Int64_$Impl_$.divMod(i,ten);
		str = r.modulus.low + str;
		i = r.quotient;
	}
	if(neg) str = "-" + str;
	return str;
};
haxe__$Int64_Int64_$Impl_$.divMod = function(dividend,divisor) {
	if(divisor.high == 0) {
		var _g = divisor.low;
		switch(_g) {
		case 0:
			throw new js__$Boot_HaxeError("divide by zero");
			break;
		case 1:
			return { quotient : (function($this) {
				var $r;
				var x = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
				$r = x;
				return $r;
			}(this)), modulus : (function($this) {
				var $r;
				var x1 = new haxe__$Int64__$_$_$Int64(0,0);
				$r = x1;
				return $r;
			}(this))};
		}
	}
	var divSign = dividend.high < 0 != divisor.high < 0;
	var modulus;
	if(dividend.high < 0) {
		var high = ~dividend.high;
		var low = -dividend.low;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
			ret;
		}
		var x2 = new haxe__$Int64__$_$_$Int64(high,low);
		modulus = x2;
	} else {
		var x3 = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
		modulus = x3;
	}
	if(divisor.high < 0) {
		var high1 = ~divisor.high;
		var low1 = -divisor.low;
		if(low1 == 0) {
			var ret1 = high1++;
			high1 = high1 | 0;
			ret1;
		}
		var x4 = new haxe__$Int64__$_$_$Int64(high1,low1);
		divisor = x4;
	} else divisor = divisor;
	var quotient;
	{
		var x5 = new haxe__$Int64__$_$_$Int64(0,0);
		quotient = x5;
	}
	var mask;
	{
		var x6 = new haxe__$Int64__$_$_$Int64(0,1);
		mask = x6;
	}
	while(!(divisor.high < 0)) {
		var cmp;
		var v = haxe__$Int32_Int32_$Impl_$.ucompare(divisor.high,modulus.high);
		if(v != 0) cmp = v; else cmp = haxe__$Int32_Int32_$Impl_$.ucompare(divisor.low,modulus.low);
		var b = 1;
		b &= 63;
		if(b == 0) {
			var x7 = new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low);
			divisor = x7;
		} else if(b < 32) {
			var x8 = new haxe__$Int64__$_$_$Int64(divisor.high << b | divisor.low >>> 32 - b,divisor.low << b);
			divisor = x8;
		} else {
			var x9 = new haxe__$Int64__$_$_$Int64(divisor.low << b - 32,0);
			divisor = x9;
		}
		var b1 = 1;
		b1 &= 63;
		if(b1 == 0) {
			var x10 = new haxe__$Int64__$_$_$Int64(mask.high,mask.low);
			mask = x10;
		} else if(b1 < 32) {
			var x11 = new haxe__$Int64__$_$_$Int64(mask.high << b1 | mask.low >>> 32 - b1,mask.low << b1);
			mask = x11;
		} else {
			var x12 = new haxe__$Int64__$_$_$Int64(mask.low << b1 - 32,0);
			mask = x12;
		}
		if(cmp >= 0) break;
	}
	while((function($this) {
		var $r;
		var b2;
		{
			var x13 = new haxe__$Int64__$_$_$Int64(0,0);
			b2 = x13;
		}
		$r = mask.high != b2.high || mask.low != b2.low;
		return $r;
	}(this))) {
		if((function($this) {
			var $r;
			var v1 = haxe__$Int32_Int32_$Impl_$.ucompare(modulus.high,divisor.high);
			$r = v1 != 0?v1:haxe__$Int32_Int32_$Impl_$.ucompare(modulus.low,divisor.low);
			return $r;
		}(this)) >= 0) {
			var x14 = new haxe__$Int64__$_$_$Int64(quotient.high | mask.high,quotient.low | mask.low);
			quotient = x14;
			var high2 = modulus.high - divisor.high | 0;
			var low2 = modulus.low - divisor.low | 0;
			if(haxe__$Int32_Int32_$Impl_$.ucompare(modulus.low,divisor.low) < 0) {
				var ret2 = high2--;
				high2 = high2 | 0;
				ret2;
			}
			var x15 = new haxe__$Int64__$_$_$Int64(high2,low2);
			modulus = x15;
		}
		var b3 = 1;
		b3 &= 63;
		if(b3 == 0) {
			var x16 = new haxe__$Int64__$_$_$Int64(mask.high,mask.low);
			mask = x16;
		} else if(b3 < 32) {
			var x17 = new haxe__$Int64__$_$_$Int64(mask.high >>> b3,mask.high << 32 - b3 | mask.low >>> b3);
			mask = x17;
		} else {
			var x18 = new haxe__$Int64__$_$_$Int64(0,mask.high >>> b3 - 32);
			mask = x18;
		}
		var b4 = 1;
		b4 &= 63;
		if(b4 == 0) {
			var x19 = new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low);
			divisor = x19;
		} else if(b4 < 32) {
			var x20 = new haxe__$Int64__$_$_$Int64(divisor.high >>> b4,divisor.high << 32 - b4 | divisor.low >>> b4);
			divisor = x20;
		} else {
			var x21 = new haxe__$Int64__$_$_$Int64(0,divisor.high >>> b4 - 32);
			divisor = x21;
		}
	}
	if(divSign) {
		var high3 = ~quotient.high;
		var low3 = -quotient.low;
		if(low3 == 0) {
			var ret3 = high3++;
			high3 = high3 | 0;
			ret3;
		}
		var x22 = new haxe__$Int64__$_$_$Int64(high3,low3);
		quotient = x22;
	}
	if(dividend.high < 0) {
		var high4 = ~modulus.high;
		var low4 = -modulus.low;
		if(low4 == 0) {
			var ret4 = high4++;
			high4 = high4 | 0;
			ret4;
		}
		var x23 = new haxe__$Int64__$_$_$Int64(high4,low4);
		modulus = x23;
	}
	return { quotient : quotient, modulus : modulus};
};
haxe__$Int64_Int64_$Impl_$.neg = function(x) {
	var high = ~x.high;
	var low = -x.low;
	if(low == 0) {
		var ret = high++;
		high = high | 0;
		ret;
	}
	var x1 = new haxe__$Int64__$_$_$Int64(high,low);
	return x1;
};
haxe__$Int64_Int64_$Impl_$.preIncrement = function(this1) {
	{
		var ret = this1.low++;
		this1.low = this1.low | 0;
		ret;
	}
	if(this1.low == 0) {
		var ret1 = this1.high++;
		this1.high = this1.high | 0;
		ret1;
	}
	return this1;
};
haxe__$Int64_Int64_$Impl_$.postIncrement = function(this1) {
	var ret;
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	ret = x;
	{
		var ret1 = this1.low++;
		this1.low = this1.low | 0;
		ret1;
	}
	if(this1.low == 0) {
		var ret2 = this1.high++;
		this1.high = this1.high | 0;
		ret2;
	}
	this1;
	return ret;
};
haxe__$Int64_Int64_$Impl_$.preDecrement = function(this1) {
	if(this1.low == 0) {
		var ret = this1.high--;
		this1.high = this1.high | 0;
		ret;
	}
	{
		var ret1 = this1.low--;
		this1.low = this1.low | 0;
		ret1;
	}
	return this1;
};
haxe__$Int64_Int64_$Impl_$.postDecrement = function(this1) {
	var ret;
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	ret = x;
	if(this1.low == 0) {
		var ret1 = this1.high--;
		this1.high = this1.high | 0;
		ret1;
	}
	{
		var ret2 = this1.low--;
		this1.low = this1.low | 0;
		ret2;
	}
	this1;
	return ret;
};
haxe__$Int64_Int64_$Impl_$.add = function(a,b) {
	var high = a.high + b.high | 0;
	var low = a.low + b.low | 0;
	if(haxe__$Int32_Int32_$Impl_$.ucompare(low,a.low) < 0) {
		var ret = high++;
		high = high | 0;
		ret;
	}
	var x = new haxe__$Int64__$_$_$Int64(high,low);
	return x;
};
haxe__$Int64_Int64_$Impl_$.addInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	var high = a.high + b1.high | 0;
	var low = a.low + b1.low | 0;
	if(haxe__$Int32_Int32_$Impl_$.ucompare(low,a.low) < 0) {
		var ret = high++;
		high = high | 0;
		ret;
	}
	var x1 = new haxe__$Int64__$_$_$Int64(high,low);
	return x1;
};
haxe__$Int64_Int64_$Impl_$.sub = function(a,b) {
	var high = a.high - b.high | 0;
	var low = a.low - b.low | 0;
	if(haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b.low) < 0) {
		var ret = high--;
		high = high | 0;
		ret;
	}
	var x = new haxe__$Int64__$_$_$Int64(high,low);
	return x;
};
haxe__$Int64_Int64_$Impl_$.subInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	var high = a.high - b1.high | 0;
	var low = a.low - b1.low | 0;
	if(haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b1.low) < 0) {
		var ret = high--;
		high = high | 0;
		ret;
	}
	var x1 = new haxe__$Int64__$_$_$Int64(high,low);
	return x1;
};
haxe__$Int64_Int64_$Impl_$.intSub = function(a,b) {
	var a1;
	{
		var x = new haxe__$Int64__$_$_$Int64(a >> 31,a);
		a1 = x;
	}
	var high = a1.high - b.high | 0;
	var low = a1.low - b.low | 0;
	if(haxe__$Int32_Int32_$Impl_$.ucompare(a1.low,b.low) < 0) {
		var ret = high--;
		high = high | 0;
		ret;
	}
	var x1 = new haxe__$Int64__$_$_$Int64(high,low);
	return x1;
};
haxe__$Int64_Int64_$Impl_$.mul = function(a,b) {
	var mask = 65535;
	var al = a.low & mask;
	var ah = a.low >>> 16;
	var bl = b.low & mask;
	var bh = b.low >>> 16;
	var p00 = haxe__$Int32_Int32_$Impl_$.mul(al,bl);
	var p10 = haxe__$Int32_Int32_$Impl_$.mul(ah,bl);
	var p01 = haxe__$Int32_Int32_$Impl_$.mul(al,bh);
	var p11 = haxe__$Int32_Int32_$Impl_$.mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 = p01 << 16;
	low = low + p01 | 0;
	if(haxe__$Int32_Int32_$Impl_$.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
		ret;
	}
	p10 = p10 << 16;
	low = low + p10 | 0;
	if(haxe__$Int32_Int32_$Impl_$.ucompare(low,p10) < 0) {
		var ret1 = high++;
		high = high | 0;
		ret1;
	}
	var b1;
	var a1 = haxe__$Int32_Int32_$Impl_$.mul(a.low,b.high);
	var b2 = haxe__$Int32_Int32_$Impl_$.mul(a.high,b.low);
	b1 = a1 + b2 | 0;
	high = high + b1 | 0;
	var x = new haxe__$Int64__$_$_$Int64(high,low);
	return x;
};
haxe__$Int64_Int64_$Impl_$.mulInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	var mask = 65535;
	var al = a.low & mask;
	var ah = a.low >>> 16;
	var bl = b1.low & mask;
	var bh = b1.low >>> 16;
	var p00 = haxe__$Int32_Int32_$Impl_$.mul(al,bl);
	var p10 = haxe__$Int32_Int32_$Impl_$.mul(ah,bl);
	var p01 = haxe__$Int32_Int32_$Impl_$.mul(al,bh);
	var p11 = haxe__$Int32_Int32_$Impl_$.mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 = p01 << 16;
	low = low + p01 | 0;
	if(haxe__$Int32_Int32_$Impl_$.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
		ret;
	}
	p10 = p10 << 16;
	low = low + p10 | 0;
	if(haxe__$Int32_Int32_$Impl_$.ucompare(low,p10) < 0) {
		var ret1 = high++;
		high = high | 0;
		ret1;
	}
	var b2;
	var a1 = haxe__$Int32_Int32_$Impl_$.mul(a.low,b1.high);
	var b3 = haxe__$Int32_Int32_$Impl_$.mul(a.high,b1.low);
	b2 = a1 + b3 | 0;
	high = high + b2 | 0;
	var x1 = new haxe__$Int64__$_$_$Int64(high,low);
	return x1;
};
haxe__$Int64_Int64_$Impl_$.div = function(a,b) {
	return haxe__$Int64_Int64_$Impl_$.divMod(a,b).quotient;
};
haxe__$Int64_Int64_$Impl_$.divInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	return haxe__$Int64_Int64_$Impl_$.divMod(a,b1).quotient;
};
haxe__$Int64_Int64_$Impl_$.intDiv = function(a,b) {
	{
		var x;
		var x2;
		var a1;
		{
			var x3 = new haxe__$Int64__$_$_$Int64(a >> 31,a);
			a1 = x3;
		}
		x2 = haxe__$Int64_Int64_$Impl_$.divMod(a1,b).quotient;
		if(x2.high != x2.low >> 31) throw new js__$Boot_HaxeError("Overflow");
		x = x2.low;
		var x1 = new haxe__$Int64__$_$_$Int64(x >> 31,x);
		return x1;
	}
};
haxe__$Int64_Int64_$Impl_$.mod = function(a,b) {
	return haxe__$Int64_Int64_$Impl_$.divMod(a,b).modulus;
};
haxe__$Int64_Int64_$Impl_$.modInt = function(a,b) {
	{
		var x;
		var x2;
		var b1;
		{
			var x3 = new haxe__$Int64__$_$_$Int64(b >> 31,b);
			b1 = x3;
		}
		x2 = haxe__$Int64_Int64_$Impl_$.divMod(a,b1).modulus;
		if(x2.high != x2.low >> 31) throw new js__$Boot_HaxeError("Overflow");
		x = x2.low;
		var x1 = new haxe__$Int64__$_$_$Int64(x >> 31,x);
		return x1;
	}
};
haxe__$Int64_Int64_$Impl_$.intMod = function(a,b) {
	{
		var x;
		var x2;
		var a1;
		{
			var x3 = new haxe__$Int64__$_$_$Int64(a >> 31,a);
			a1 = x3;
		}
		x2 = haxe__$Int64_Int64_$Impl_$.divMod(a1,b).modulus;
		if(x2.high != x2.low >> 31) throw new js__$Boot_HaxeError("Overflow");
		x = x2.low;
		var x1 = new haxe__$Int64__$_$_$Int64(x >> 31,x);
		return x1;
	}
};
haxe__$Int64_Int64_$Impl_$.eq = function(a,b) {
	return a.high == b.high && a.low == b.low;
};
haxe__$Int64_Int64_$Impl_$.eqInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	return a.high == b1.high && a.low == b1.low;
};
haxe__$Int64_Int64_$Impl_$.neq = function(a,b) {
	return a.high != b.high || a.low != b.low;
};
haxe__$Int64_Int64_$Impl_$.neqInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	return a.high != b1.high || a.low != b1.low;
};
haxe__$Int64_Int64_$Impl_$.lt = function(a,b) {
	return (function($this) {
		var $r;
		var v = a.high - b.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b.low);
		$r = a.high < 0?b.high < 0?v:-1:b.high >= 0?v:1;
		return $r;
	}(this)) < 0;
};
haxe__$Int64_Int64_$Impl_$.ltInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	return (function($this) {
		var $r;
		var v = a.high - b1.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b1.low);
		$r = a.high < 0?b1.high < 0?v:-1:b1.high >= 0?v:1;
		return $r;
	}(this)) < 0;
};
haxe__$Int64_Int64_$Impl_$.intLt = function(a,b) {
	var a1;
	{
		var x = new haxe__$Int64__$_$_$Int64(a >> 31,a);
		a1 = x;
	}
	return (function($this) {
		var $r;
		var v = a1.high - b.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a1.low,b.low);
		$r = a1.high < 0?b.high < 0?v:-1:b.high >= 0?v:1;
		return $r;
	}(this)) < 0;
};
haxe__$Int64_Int64_$Impl_$.lte = function(a,b) {
	return (function($this) {
		var $r;
		var v = a.high - b.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b.low);
		$r = a.high < 0?b.high < 0?v:-1:b.high >= 0?v:1;
		return $r;
	}(this)) <= 0;
};
haxe__$Int64_Int64_$Impl_$.lteInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	return (function($this) {
		var $r;
		var v = a.high - b1.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b1.low);
		$r = a.high < 0?b1.high < 0?v:-1:b1.high >= 0?v:1;
		return $r;
	}(this)) <= 0;
};
haxe__$Int64_Int64_$Impl_$.intLte = function(a,b) {
	var a1;
	{
		var x = new haxe__$Int64__$_$_$Int64(a >> 31,a);
		a1 = x;
	}
	return (function($this) {
		var $r;
		var v = a1.high - b.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a1.low,b.low);
		$r = a1.high < 0?b.high < 0?v:-1:b.high >= 0?v:1;
		return $r;
	}(this)) <= 0;
};
haxe__$Int64_Int64_$Impl_$.gt = function(a,b) {
	return (function($this) {
		var $r;
		var v = a.high - b.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b.low);
		$r = a.high < 0?b.high < 0?v:-1:b.high >= 0?v:1;
		return $r;
	}(this)) > 0;
};
haxe__$Int64_Int64_$Impl_$.gtInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	return (function($this) {
		var $r;
		var v = a.high - b1.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b1.low);
		$r = a.high < 0?b1.high < 0?v:-1:b1.high >= 0?v:1;
		return $r;
	}(this)) > 0;
};
haxe__$Int64_Int64_$Impl_$.intGt = function(a,b) {
	var a1;
	{
		var x = new haxe__$Int64__$_$_$Int64(a >> 31,a);
		a1 = x;
	}
	return (function($this) {
		var $r;
		var v = a1.high - b.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a1.low,b.low);
		$r = a1.high < 0?b.high < 0?v:-1:b.high >= 0?v:1;
		return $r;
	}(this)) > 0;
};
haxe__$Int64_Int64_$Impl_$.gte = function(a,b) {
	return (function($this) {
		var $r;
		var v = a.high - b.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b.low);
		$r = a.high < 0?b.high < 0?v:-1:b.high >= 0?v:1;
		return $r;
	}(this)) >= 0;
};
haxe__$Int64_Int64_$Impl_$.gteInt = function(a,b) {
	var b1;
	{
		var x = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		b1 = x;
	}
	return (function($this) {
		var $r;
		var v = a.high - b1.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a.low,b1.low);
		$r = a.high < 0?b1.high < 0?v:-1:b1.high >= 0?v:1;
		return $r;
	}(this)) >= 0;
};
haxe__$Int64_Int64_$Impl_$.intGte = function(a,b) {
	var a1;
	{
		var x = new haxe__$Int64__$_$_$Int64(a >> 31,a);
		a1 = x;
	}
	return (function($this) {
		var $r;
		var v = a1.high - b.high | 0;
		if(v != 0) v = v; else v = haxe__$Int32_Int32_$Impl_$.ucompare(a1.low,b.low);
		$r = a1.high < 0?b.high < 0?v:-1:b.high >= 0?v:1;
		return $r;
	}(this)) >= 0;
};
haxe__$Int64_Int64_$Impl_$.complement = function(a) {
	var x = new haxe__$Int64__$_$_$Int64(~a.high,~a.low);
	return x;
};
haxe__$Int64_Int64_$Impl_$.and = function(a,b) {
	var x = new haxe__$Int64__$_$_$Int64(a.high & b.high,a.low & b.low);
	return x;
};
haxe__$Int64_Int64_$Impl_$.or = function(a,b) {
	var x = new haxe__$Int64__$_$_$Int64(a.high | b.high,a.low | b.low);
	return x;
};
haxe__$Int64_Int64_$Impl_$.xor = function(a,b) {
	var x = new haxe__$Int64__$_$_$Int64(a.high ^ b.high,a.low ^ b.low);
	return x;
};
haxe__$Int64_Int64_$Impl_$.shl = function(a,b) {
	b &= 63;
	if(b == 0) {
		var x = new haxe__$Int64__$_$_$Int64(a.high,a.low);
		return x;
	} else if(b < 32) {
		var x1 = new haxe__$Int64__$_$_$Int64(a.high << b | a.low >>> 32 - b,a.low << b);
		return x1;
	} else {
		var x2 = new haxe__$Int64__$_$_$Int64(a.low << b - 32,0);
		return x2;
	}
};
haxe__$Int64_Int64_$Impl_$.shr = function(a,b) {
	b &= 63;
	if(b == 0) {
		var x = new haxe__$Int64__$_$_$Int64(a.high,a.low);
		return x;
	} else if(b < 32) {
		var x1 = new haxe__$Int64__$_$_$Int64(a.high >> b,a.high << 32 - b | a.low >>> b);
		return x1;
	} else {
		var x2 = new haxe__$Int64__$_$_$Int64(a.high >> 31,a.high >> b - 32);
		return x2;
	}
};
haxe__$Int64_Int64_$Impl_$.ushr = function(a,b) {
	b &= 63;
	if(b == 0) {
		var x = new haxe__$Int64__$_$_$Int64(a.high,a.low);
		return x;
	} else if(b < 32) {
		var x1 = new haxe__$Int64__$_$_$Int64(a.high >>> b,a.high << 32 - b | a.low >>> b);
		return x1;
	} else {
		var x2 = new haxe__$Int64__$_$_$Int64(0,a.high >>> b - 32);
		return x2;
	}
};
haxe__$Int64_Int64_$Impl_$.get_high = function(this1) {
	return this1.high;
};
haxe__$Int64_Int64_$Impl_$.set_high = function(this1,x) {
	return this1.high = x;
};
haxe__$Int64_Int64_$Impl_$.get_low = function(this1) {
	return this1.low;
};
haxe__$Int64_Int64_$Impl_$.set_low = function(this1,x) {
	return this1.low = x;
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	high: null
	,low: null
	,toString: function() {
		return haxe__$Int64_Int64_$Impl_$.toString(this);
	}
	,__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
haxe_Log.clear = function() {
	js_Boot.__clear_trace();
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,getResolver: function() {
		return this.resolver;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe_ds_BalancedTree.prototype = {
	root: null
	,set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,remove: function(key) {
		try {
			this.root = this.removeLoop(key,this.root);
			return true;
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,String) ) {
				return false;
			} else throw(e);
		}
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return true; else if(c < 0) node = node.left; else node = node.right;
		}
		return false;
	}
	,iterator: function() {
		var ret = [];
		this.iteratorLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,removeLoop: function(k,node) {
		if(node == null) throw new js__$Boot_HaxeError("Not_found");
		var c = this.compare(k,node.key);
		if(c == 0) return this.merge(node.left,node.right); else if(c < 0) return this.balance(this.removeLoop(k,node.left),node.key,node.value,node.right); else return this.balance(node.left,node.key,node.value,this.removeLoop(k,node.right));
	}
	,iteratorLoop: function(node,acc) {
		if(node != null) {
			this.iteratorLoop(node.left,acc);
			acc.push(node.value);
			this.iteratorLoop(node.right,acc);
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,merge: function(t1,t2) {
		if(t1 == null) return t2;
		if(t2 == null) return t1;
		var t = this.minBinding(t2);
		return this.balance(t1,t.key,t.value,this.removeMinBinding(t2));
	}
	,minBinding: function(t) {
		if(t == null) throw new js__$Boot_HaxeError("Not_found"); else if(t.left == null) return t; else return this.minBinding(t.left);
	}
	,removeMinBinding: function(t) {
		if(t.left == null) return t.right; else return this.balance(this.removeMinBinding(t.left),t.key,t.value,t.right);
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,toString: function() {
		if(this.root == null) return "{}"; else return "{" + this.root.toString() + "}";
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe_ds_TreeNode.prototype = {
	left: null
	,right: null
	,key: null
	,value: null
	,_height: null
	,toString: function() {
		return (this.left == null?"":this.left.toString() + ", ") + ("" + Std.string(this.key) + "=" + Std.string(this.value)) + (this.right == null?"":", " + this.right.toString());
	}
	,__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds__$HashMap_HashMap_$Impl_$ = {};
$hxClasses["haxe.ds._HashMap.HashMap_Impl_"] = haxe_ds__$HashMap_HashMap_$Impl_$;
haxe_ds__$HashMap_HashMap_$Impl_$.__name__ = ["haxe","ds","_HashMap","HashMap_Impl_"];
haxe_ds__$HashMap_HashMap_$Impl_$._new = function() {
	return new haxe_ds__$HashMap_HashMapData();
};
haxe_ds__$HashMap_HashMap_$Impl_$.set = function(this1,k,v) {
	this1.keys.set(k.hashCode(),k);
	this1.values.set(k.hashCode(),v);
};
haxe_ds__$HashMap_HashMap_$Impl_$.get = function(this1,k) {
	return this1.values.get(k.hashCode());
};
haxe_ds__$HashMap_HashMap_$Impl_$.exists = function(this1,k) {
	return this1.values.exists(k.hashCode());
};
haxe_ds__$HashMap_HashMap_$Impl_$.remove = function(this1,k) {
	this1.values.remove(k.hashCode());
	return this1.keys.remove(k.hashCode());
};
haxe_ds__$HashMap_HashMap_$Impl_$.keys = function(this1) {
	return this1.keys.iterator();
};
haxe_ds__$HashMap_HashMap_$Impl_$.iterator = function(this1) {
	return this1.values.iterator();
};
var haxe_ds__$HashMap_HashMapData = function() {
	this.keys = new haxe_ds_IntMap();
	this.values = new haxe_ds_IntMap();
};
$hxClasses["haxe.ds._HashMap.HashMapData"] = haxe_ds__$HashMap_HashMapData;
haxe_ds__$HashMap_HashMapData.__name__ = ["haxe","ds","_HashMap","HashMapData"];
haxe_ds__$HashMap_HashMapData.prototype = {
	keys: null
	,values: null
	,__class__: haxe_ds__$HashMap_HashMapData
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,toString: function() {
		var s_b = "";
		s_b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			if(i == null) s_b += "null"; else s_b += "" + i;
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i]));
			if(it.hasNext()) s_b += ", ";
		}
		s_b += "}";
		return s_b;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.assignId = function(obj) {
	return obj.__id__ = ++haxe_ds_ObjectMap.count;
};
haxe_ds_ObjectMap.getId = function(obj) {
	return obj.__id__;
};
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,toString: function() {
		var s_b = "";
		s_b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s_b += Std.string(Std.string(i));
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i.__id__]));
			if(it.hasNext()) s_b += ", ";
		}
		s_b += "}";
		return s_b;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	map: null
	,keys: null
	,index: null
	,count: null
	,hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,rh: null
	,isReserved: function(key) {
		return __map_reserved[key] != null;
	}
	,set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var keys = this.arrayKeys();
		var _g1 = 0;
		var _g = keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var k = keys[i];
			if(k == null) s.b += "null"; else s.b += "" + k;
			s.b += " => ";
			s.add(Std.string(__map_reserved[k] != null?this.getReserved(k):this.h[k]));
			if(i < keys.length) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds_WeakMap = function() {
	throw new js__$Boot_HaxeError("Not implemented for this platform");
};
$hxClasses["haxe.ds.WeakMap"] = haxe_ds_WeakMap;
haxe_ds_WeakMap.__name__ = ["haxe","ds","WeakMap"];
haxe_ds_WeakMap.__interfaces__ = [haxe_IMap];
haxe_ds_WeakMap.prototype = {
	set: function(key,value) {
	}
	,get: function(key) {
		return null;
	}
	,exists: function(key) {
		return false;
	}
	,remove: function(key) {
		return false;
	}
	,keys: function() {
		return null;
	}
	,iterator: function() {
		return null;
	}
	,toString: function() {
		return null;
	}
	,__class__: haxe_ds_WeakMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.fastGet = function(b,pos) {
	return b.bytes[pos];
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,data: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(srcpos == 0 && len == src.length) this.b.set(src.b,pos); else this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.set(pos++,value);
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len;
		if(this.length < other.length) len = this.length; else len = other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,initData: function() {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
	}
	,getDouble: function(pos) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		return this.data.getFloat64(pos,true);
	}
	,getFloat: function(pos) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		return this.data.getFloat32(pos,true);
	}
	,setDouble: function(pos,v) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		this.data.setFloat64(pos,v,true);
	}
	,setFloat: function(pos,v) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		this.data.setFloat32(pos,v,true);
	}
	,getUInt16: function(pos) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		return this.data.getUint16(pos,true);
	}
	,setUInt16: function(pos,v) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		this.data.setUint16(pos,v,true);
	}
	,getInt32: function(pos) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		this.data.setInt32(pos,v,true);
	}
	,getInt64: function(pos) {
		var high = this.getInt32(pos + 4);
		var low = this.getInt32(pos);
		var x = new haxe__$Int64__$_$_$Int64(high,low);
		return x;
	}
	,setInt64: function(pos,v) {
		this.setInt32(pos,v.low);
		this.setInt32(pos + 4,v.high);
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,readString: function(pos,len) {
		return this.getString(pos,len);
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g11 = 0;
		var _g2 = this.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var c = this.b[i1];
			s_b += String.fromCharCode(chars[c >> 4]);
			s_b += String.fromCharCode(chars[c & 15]);
		}
		return s_b;
	}
	,getData: function() {
		return this.b.bufferValue;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
haxe_io_Error.__empty_constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds];
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_macro_Context = function() { };
$hxClasses["haxe.macro.Context"] = haxe_macro_Context;
haxe_macro_Context.__name__ = ["haxe","macro","Context"];
var haxe_macro_Constant = $hxClasses["haxe.macro.Constant"] = { __ename__ : ["haxe","macro","Constant"], __constructs__ : ["CInt","CFloat","CString","CIdent","CRegexp"] };
haxe_macro_Constant.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CIdent = function(s) { var $x = ["CIdent",3,s]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CRegexp = function(r,opt) { var $x = ["CRegexp",4,r,opt]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.__empty_constructs__ = [];
var haxe_macro_Binop = $hxClasses["haxe.macro.Binop"] = { __ename__ : ["haxe","macro","Binop"], __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval","OpArrow"] };
haxe_macro_Binop.OpAdd = ["OpAdd",0];
haxe_macro_Binop.OpAdd.toString = $estr;
haxe_macro_Binop.OpAdd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpMult = ["OpMult",1];
haxe_macro_Binop.OpMult.toString = $estr;
haxe_macro_Binop.OpMult.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpDiv = ["OpDiv",2];
haxe_macro_Binop.OpDiv.toString = $estr;
haxe_macro_Binop.OpDiv.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpSub = ["OpSub",3];
haxe_macro_Binop.OpSub.toString = $estr;
haxe_macro_Binop.OpSub.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAssign = ["OpAssign",4];
haxe_macro_Binop.OpAssign.toString = $estr;
haxe_macro_Binop.OpAssign.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpEq = ["OpEq",5];
haxe_macro_Binop.OpEq.toString = $estr;
haxe_macro_Binop.OpEq.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpNotEq = ["OpNotEq",6];
haxe_macro_Binop.OpNotEq.toString = $estr;
haxe_macro_Binop.OpNotEq.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpGt = ["OpGt",7];
haxe_macro_Binop.OpGt.toString = $estr;
haxe_macro_Binop.OpGt.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpGte = ["OpGte",8];
haxe_macro_Binop.OpGte.toString = $estr;
haxe_macro_Binop.OpGte.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpLt = ["OpLt",9];
haxe_macro_Binop.OpLt.toString = $estr;
haxe_macro_Binop.OpLt.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpLte = ["OpLte",10];
haxe_macro_Binop.OpLte.toString = $estr;
haxe_macro_Binop.OpLte.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAnd = ["OpAnd",11];
haxe_macro_Binop.OpAnd.toString = $estr;
haxe_macro_Binop.OpAnd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpOr = ["OpOr",12];
haxe_macro_Binop.OpOr.toString = $estr;
haxe_macro_Binop.OpOr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpXor = ["OpXor",13];
haxe_macro_Binop.OpXor.toString = $estr;
haxe_macro_Binop.OpXor.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpBoolAnd = ["OpBoolAnd",14];
haxe_macro_Binop.OpBoolAnd.toString = $estr;
haxe_macro_Binop.OpBoolAnd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpBoolOr = ["OpBoolOr",15];
haxe_macro_Binop.OpBoolOr.toString = $estr;
haxe_macro_Binop.OpBoolOr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpShl = ["OpShl",16];
haxe_macro_Binop.OpShl.toString = $estr;
haxe_macro_Binop.OpShl.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpShr = ["OpShr",17];
haxe_macro_Binop.OpShr.toString = $estr;
haxe_macro_Binop.OpShr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpUShr = ["OpUShr",18];
haxe_macro_Binop.OpUShr.toString = $estr;
haxe_macro_Binop.OpUShr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpMod = ["OpMod",19];
haxe_macro_Binop.OpMod.toString = $estr;
haxe_macro_Binop.OpMod.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = haxe_macro_Binop; $x.toString = $estr; return $x; };
haxe_macro_Binop.OpInterval = ["OpInterval",21];
haxe_macro_Binop.OpInterval.toString = $estr;
haxe_macro_Binop.OpInterval.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpArrow = ["OpArrow",22];
haxe_macro_Binop.OpArrow.toString = $estr;
haxe_macro_Binop.OpArrow.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.__empty_constructs__ = [haxe_macro_Binop.OpAdd,haxe_macro_Binop.OpMult,haxe_macro_Binop.OpDiv,haxe_macro_Binop.OpSub,haxe_macro_Binop.OpAssign,haxe_macro_Binop.OpEq,haxe_macro_Binop.OpNotEq,haxe_macro_Binop.OpGt,haxe_macro_Binop.OpGte,haxe_macro_Binop.OpLt,haxe_macro_Binop.OpLte,haxe_macro_Binop.OpAnd,haxe_macro_Binop.OpOr,haxe_macro_Binop.OpXor,haxe_macro_Binop.OpBoolAnd,haxe_macro_Binop.OpBoolOr,haxe_macro_Binop.OpShl,haxe_macro_Binop.OpShr,haxe_macro_Binop.OpUShr,haxe_macro_Binop.OpMod,haxe_macro_Binop.OpInterval,haxe_macro_Binop.OpArrow];
var haxe_macro_Unop = $hxClasses["haxe.macro.Unop"] = { __ename__ : ["haxe","macro","Unop"], __constructs__ : ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] };
haxe_macro_Unop.OpIncrement = ["OpIncrement",0];
haxe_macro_Unop.OpIncrement.toString = $estr;
haxe_macro_Unop.OpIncrement.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpDecrement = ["OpDecrement",1];
haxe_macro_Unop.OpDecrement.toString = $estr;
haxe_macro_Unop.OpDecrement.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNot = ["OpNot",2];
haxe_macro_Unop.OpNot.toString = $estr;
haxe_macro_Unop.OpNot.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNeg = ["OpNeg",3];
haxe_macro_Unop.OpNeg.toString = $estr;
haxe_macro_Unop.OpNeg.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNegBits = ["OpNegBits",4];
haxe_macro_Unop.OpNegBits.toString = $estr;
haxe_macro_Unop.OpNegBits.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.__empty_constructs__ = [haxe_macro_Unop.OpIncrement,haxe_macro_Unop.OpDecrement,haxe_macro_Unop.OpNot,haxe_macro_Unop.OpNeg,haxe_macro_Unop.OpNegBits];
var haxe_macro_ExprDef = $hxClasses["haxe.macro.ExprDef"] = { __ename__ : ["haxe","macro","ExprDef"], __constructs__ : ["EConst","EArray","EBinop","EField","EParenthesis","EObjectDecl","EArrayDecl","ECall","ENew","EUnop","EVars","EFunction","EBlock","EFor","EIn","EIf","EWhile","ESwitch","ETry","EReturn","EBreak","EContinue","EUntyped","EThrow","ECast","EDisplay","EDisplayNew","ETernary","ECheckType","EMeta"] };
haxe_macro_ExprDef.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EArray = function(e1,e2) { var $x = ["EArray",1,e1,e2]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EBinop = function(op,e1,e2) { var $x = ["EBinop",2,op,e1,e2]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EField = function(e,field) { var $x = ["EField",3,e,field]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EParenthesis = function(e) { var $x = ["EParenthesis",4,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EObjectDecl = function(fields) { var $x = ["EObjectDecl",5,fields]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EArrayDecl = function(values) { var $x = ["EArrayDecl",6,values]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ECall = function(e,params) { var $x = ["ECall",7,e,params]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ENew = function(t,params) { var $x = ["ENew",8,t,params]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EUnop = function(op,postFix,e) { var $x = ["EUnop",9,op,postFix,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EVars = function(vars) { var $x = ["EVars",10,vars]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EFunction = function(name,f) { var $x = ["EFunction",11,name,f]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EBlock = function(exprs) { var $x = ["EBlock",12,exprs]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EFor = function(it,expr) { var $x = ["EFor",13,it,expr]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EIn = function(e1,e2) { var $x = ["EIn",14,e1,e2]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EIf = function(econd,eif,eelse) { var $x = ["EIf",15,econd,eif,eelse]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EWhile = function(econd,e,normalWhile) { var $x = ["EWhile",16,econd,e,normalWhile]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ESwitch = function(e,cases,edef) { var $x = ["ESwitch",17,e,cases,edef]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ETry = function(e,catches) { var $x = ["ETry",18,e,catches]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EReturn = function(e) { var $x = ["EReturn",19,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EBreak = ["EBreak",20];
haxe_macro_ExprDef.EBreak.toString = $estr;
haxe_macro_ExprDef.EBreak.__enum__ = haxe_macro_ExprDef;
haxe_macro_ExprDef.EContinue = ["EContinue",21];
haxe_macro_ExprDef.EContinue.toString = $estr;
haxe_macro_ExprDef.EContinue.__enum__ = haxe_macro_ExprDef;
haxe_macro_ExprDef.EUntyped = function(e) { var $x = ["EUntyped",22,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EThrow = function(e) { var $x = ["EThrow",23,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ECast = function(e,t) { var $x = ["ECast",24,e,t]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EDisplay = function(e,isCall) { var $x = ["EDisplay",25,e,isCall]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EDisplayNew = function(t) { var $x = ["EDisplayNew",26,t]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ETernary = function(econd,eif,eelse) { var $x = ["ETernary",27,econd,eif,eelse]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ECheckType = function(e,t) { var $x = ["ECheckType",28,e,t]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EMeta = function(s,e) { var $x = ["EMeta",29,s,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.__empty_constructs__ = [haxe_macro_ExprDef.EBreak,haxe_macro_ExprDef.EContinue];
var haxe_macro_ComplexType = $hxClasses["haxe.macro.ComplexType"] = { __ename__ : ["haxe","macro","ComplexType"], __constructs__ : ["TPath","TFunction","TAnonymous","TParent","TExtend","TOptional"] };
haxe_macro_ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TOptional = function(t) { var $x = ["TOptional",5,t]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.__empty_constructs__ = [];
var haxe_macro_TypeParam = $hxClasses["haxe.macro.TypeParam"] = { __ename__ : ["haxe","macro","TypeParam"], __constructs__ : ["TPType","TPExpr"] };
haxe_macro_TypeParam.TPType = function(t) { var $x = ["TPType",0,t]; $x.__enum__ = haxe_macro_TypeParam; $x.toString = $estr; return $x; };
haxe_macro_TypeParam.TPExpr = function(e) { var $x = ["TPExpr",1,e]; $x.__enum__ = haxe_macro_TypeParam; $x.toString = $estr; return $x; };
haxe_macro_TypeParam.__empty_constructs__ = [];
var haxe_macro_Access = $hxClasses["haxe.macro.Access"] = { __ename__ : ["haxe","macro","Access"], __constructs__ : ["APublic","APrivate","AStatic","AOverride","ADynamic","AInline","AMacro"] };
haxe_macro_Access.APublic = ["APublic",0];
haxe_macro_Access.APublic.toString = $estr;
haxe_macro_Access.APublic.__enum__ = haxe_macro_Access;
haxe_macro_Access.APrivate = ["APrivate",1];
haxe_macro_Access.APrivate.toString = $estr;
haxe_macro_Access.APrivate.__enum__ = haxe_macro_Access;
haxe_macro_Access.AStatic = ["AStatic",2];
haxe_macro_Access.AStatic.toString = $estr;
haxe_macro_Access.AStatic.__enum__ = haxe_macro_Access;
haxe_macro_Access.AOverride = ["AOverride",3];
haxe_macro_Access.AOverride.toString = $estr;
haxe_macro_Access.AOverride.__enum__ = haxe_macro_Access;
haxe_macro_Access.ADynamic = ["ADynamic",4];
haxe_macro_Access.ADynamic.toString = $estr;
haxe_macro_Access.ADynamic.__enum__ = haxe_macro_Access;
haxe_macro_Access.AInline = ["AInline",5];
haxe_macro_Access.AInline.toString = $estr;
haxe_macro_Access.AInline.__enum__ = haxe_macro_Access;
haxe_macro_Access.AMacro = ["AMacro",6];
haxe_macro_Access.AMacro.toString = $estr;
haxe_macro_Access.AMacro.__enum__ = haxe_macro_Access;
haxe_macro_Access.__empty_constructs__ = [haxe_macro_Access.APublic,haxe_macro_Access.APrivate,haxe_macro_Access.AStatic,haxe_macro_Access.AOverride,haxe_macro_Access.ADynamic,haxe_macro_Access.AInline,haxe_macro_Access.AMacro];
var haxe_macro_FieldType = $hxClasses["haxe.macro.FieldType"] = { __ename__ : ["haxe","macro","FieldType"], __constructs__ : ["FVar","FFun","FProp"] };
haxe_macro_FieldType.FVar = function(t,e) { var $x = ["FVar",0,t,e]; $x.__enum__ = haxe_macro_FieldType; $x.toString = $estr; return $x; };
haxe_macro_FieldType.FFun = function(f) { var $x = ["FFun",1,f]; $x.__enum__ = haxe_macro_FieldType; $x.toString = $estr; return $x; };
haxe_macro_FieldType.FProp = function(get,set,t,e) { var $x = ["FProp",2,get,set,t,e]; $x.__enum__ = haxe_macro_FieldType; $x.toString = $estr; return $x; };
haxe_macro_FieldType.__empty_constructs__ = [];
var haxe_macro_TypeDefKind = $hxClasses["haxe.macro.TypeDefKind"] = { __ename__ : ["haxe","macro","TypeDefKind"], __constructs__ : ["TDEnum","TDStructure","TDClass","TDAlias","TDAbstract"] };
haxe_macro_TypeDefKind.TDEnum = ["TDEnum",0];
haxe_macro_TypeDefKind.TDEnum.toString = $estr;
haxe_macro_TypeDefKind.TDEnum.__enum__ = haxe_macro_TypeDefKind;
haxe_macro_TypeDefKind.TDStructure = ["TDStructure",1];
haxe_macro_TypeDefKind.TDStructure.toString = $estr;
haxe_macro_TypeDefKind.TDStructure.__enum__ = haxe_macro_TypeDefKind;
haxe_macro_TypeDefKind.TDClass = function(superClass,interfaces,isInterface) { var $x = ["TDClass",2,superClass,interfaces,isInterface]; $x.__enum__ = haxe_macro_TypeDefKind; $x.toString = $estr; return $x; };
haxe_macro_TypeDefKind.TDAlias = function(t) { var $x = ["TDAlias",3,t]; $x.__enum__ = haxe_macro_TypeDefKind; $x.toString = $estr; return $x; };
haxe_macro_TypeDefKind.TDAbstract = function(tthis,from,to) { var $x = ["TDAbstract",4,tthis,from,to]; $x.__enum__ = haxe_macro_TypeDefKind; $x.toString = $estr; return $x; };
haxe_macro_TypeDefKind.__empty_constructs__ = [haxe_macro_TypeDefKind.TDEnum,haxe_macro_TypeDefKind.TDStructure];
var haxe_macro_Error = function(m,p) {
	this.message = m;
	this.pos = p;
};
$hxClasses["haxe.macro.Error"] = haxe_macro_Error;
haxe_macro_Error.__name__ = ["haxe","macro","Error"];
haxe_macro_Error.prototype = {
	message: null
	,pos: null
	,toString: function() {
		return this.message;
	}
	,__class__: haxe_macro_Error
};
var haxe_macro_ImportMode = $hxClasses["haxe.macro.ImportMode"] = { __ename__ : ["haxe","macro","ImportMode"], __constructs__ : ["INormal","IAsName","IAll"] };
haxe_macro_ImportMode.INormal = ["INormal",0];
haxe_macro_ImportMode.INormal.toString = $estr;
haxe_macro_ImportMode.INormal.__enum__ = haxe_macro_ImportMode;
haxe_macro_ImportMode.IAsName = function(alias) { var $x = ["IAsName",1,alias]; $x.__enum__ = haxe_macro_ImportMode; $x.toString = $estr; return $x; };
haxe_macro_ImportMode.IAll = ["IAll",2];
haxe_macro_ImportMode.IAll.toString = $estr;
haxe_macro_ImportMode.IAll.__enum__ = haxe_macro_ImportMode;
haxe_macro_ImportMode.__empty_constructs__ = [haxe_macro_ImportMode.INormal,haxe_macro_ImportMode.IAll];
var haxe_macro_ExprTools = function() { };
$hxClasses["haxe.macro.ExprTools"] = haxe_macro_ExprTools;
haxe_macro_ExprTools.__name__ = ["haxe","macro","ExprTools"];
haxe_macro_ExprTools.toString = function(e) {
	return new haxe_macro_Printer().printExpr(e);
};
haxe_macro_ExprTools.iter = function(e,f) {
	{
		var _g = e.expr;
		switch(_g[1]) {
		case 0:case 21:case 20:case 26:
			break;
		case 3:
			var e1 = _g[2];
			f(e1);
			break;
		case 4:
			var e2 = _g[2];
			f(e2);
			break;
		case 22:
			var e3 = _g[2];
			f(e3);
			break;
		case 23:
			var e4 = _g[2];
			f(e4);
			break;
		case 25:
			var e5 = _g[2];
			f(e5);
			break;
		case 28:
			var e6 = _g[2];
			f(e6);
			break;
		case 9:
			var e7 = _g[4];
			f(e7);
			break;
		case 24:
			var e8 = _g[2];
			f(e8);
			break;
		case 29:
			var e9 = _g[3];
			f(e9);
			break;
		case 1:
			var e21 = _g[3];
			var e11 = _g[2];
			f(e11);
			f(e21);
			break;
		case 16:
			var e22 = _g[3];
			var e12 = _g[2];
			f(e12);
			f(e22);
			break;
		case 2:
			var e23 = _g[4];
			var e13 = _g[3];
			f(e13);
			f(e23);
			break;
		case 13:
			var e24 = _g[3];
			var e14 = _g[2];
			f(e14);
			f(e24);
			break;
		case 14:
			var e25 = _g[3];
			var e15 = _g[2];
			f(e15);
			f(e25);
			break;
		case 10:
			var vl = _g[2];
			var _g1 = 0;
			while(_g1 < vl.length) {
				var v = vl[_g1];
				++_g1;
				haxe_macro_ExprTools.opt2(v.expr,f);
			}
			break;
		case 18:
			var cl = _g[3];
			var e10 = _g[2];
			f(e10);
			var _g11 = 0;
			while(_g11 < cl.length) {
				var c = cl[_g11];
				++_g11;
				f(c.expr);
			}
			break;
		case 27:
			var e31 = _g[4];
			var e26 = _g[3];
			var e16 = _g[2];
			f(e16);
			f(e26);
			if(e31 != null) f(e31);
			break;
		case 15:
			var e32 = _g[4];
			var e27 = _g[3];
			var e17 = _g[2];
			f(e17);
			f(e27);
			if(e32 != null) f(e32);
			break;
		case 6:
			var el = _g[2];
			haxe_macro_ExprArrayTools.iter(el,f);
			break;
		case 8:
			var el1 = _g[3];
			haxe_macro_ExprArrayTools.iter(el1,f);
			break;
		case 12:
			var el2 = _g[2];
			haxe_macro_ExprArrayTools.iter(el2,f);
			break;
		case 5:
			var fl = _g[2];
			var _g12 = 0;
			while(_g12 < fl.length) {
				var fd = fl[_g12];
				++_g12;
				f(fd.expr);
			}
			break;
		case 7:
			var el3 = _g[3];
			var e18 = _g[2];
			f(e18);
			haxe_macro_ExprArrayTools.iter(el3,f);
			break;
		case 19:
			var e19 = _g[2];
			if(e19 != null) f(e19);
			break;
		case 11:
			var func = _g[3];
			var _g13 = 0;
			var _g2 = func.args;
			while(_g13 < _g2.length) {
				var arg = _g2[_g13];
				++_g13;
				haxe_macro_ExprTools.opt2(arg.value,f);
			}
			haxe_macro_ExprTools.opt2(func.expr,f);
			break;
		case 17:
			var edef = _g[4];
			var cl1 = _g[3];
			var e20 = _g[2];
			f(e20);
			var _g14 = 0;
			while(_g14 < cl1.length) {
				var c1 = cl1[_g14];
				++_g14;
				haxe_macro_ExprArrayTools.iter(c1.values,f);
				haxe_macro_ExprTools.opt2(c1.guard,f);
				haxe_macro_ExprTools.opt2(c1.expr,f);
			}
			if(edef != null && edef.expr != null) f(edef);
			break;
		}
	}
};
haxe_macro_ExprTools.map = function(e,f) {
	return { pos : e.pos, expr : (function($this) {
		var $r;
		var _g = e.expr;
		$r = (function($this) {
			var $r;
			switch(_g[1]) {
			case 0:
				$r = e.expr;
				break;
			case 1:
				$r = (function($this) {
					var $r;
					var e2 = _g[3];
					var e1 = _g[2];
					$r = haxe_macro_ExprDef.EArray(f(e1),f(e2));
					return $r;
				}($this));
				break;
			case 2:
				$r = (function($this) {
					var $r;
					var e21 = _g[4];
					var e11 = _g[3];
					var op = _g[2];
					$r = haxe_macro_ExprDef.EBinop(op,f(e11),f(e21));
					return $r;
				}($this));
				break;
			case 3:
				$r = (function($this) {
					var $r;
					var field = _g[3];
					var e3 = _g[2];
					$r = haxe_macro_ExprDef.EField(f(e3),field);
					return $r;
				}($this));
				break;
			case 4:
				$r = (function($this) {
					var $r;
					var e4 = _g[2];
					$r = haxe_macro_ExprDef.EParenthesis(f(e4));
					return $r;
				}($this));
				break;
			case 5:
				$r = (function($this) {
					var $r;
					var fields = _g[2];
					$r = (function($this) {
						var $r;
						var ret = [];
						{
							var _g1 = 0;
							while(_g1 < fields.length) {
								var field1 = fields[_g1];
								++_g1;
								ret.push({ field : field1.field, expr : f(field1.expr)});
							}
						}
						$r = haxe_macro_ExprDef.EObjectDecl(ret);
						return $r;
					}($this));
					return $r;
				}($this));
				break;
			case 6:
				$r = (function($this) {
					var $r;
					var el = _g[2];
					$r = haxe_macro_ExprDef.EArrayDecl(haxe_macro_ExprArrayTools.map(el,f));
					return $r;
				}($this));
				break;
			case 7:
				$r = (function($this) {
					var $r;
					var params = _g[3];
					var e5 = _g[2];
					$r = haxe_macro_ExprDef.ECall(f(e5),haxe_macro_ExprArrayTools.map(params,f));
					return $r;
				}($this));
				break;
			case 8:
				$r = (function($this) {
					var $r;
					var params1 = _g[3];
					var tp = _g[2];
					$r = haxe_macro_ExprDef.ENew(tp,haxe_macro_ExprArrayTools.map(params1,f));
					return $r;
				}($this));
				break;
			case 9:
				$r = (function($this) {
					var $r;
					var e6 = _g[4];
					var postFix = _g[3];
					var op1 = _g[2];
					$r = haxe_macro_ExprDef.EUnop(op1,postFix,f(e6));
					return $r;
				}($this));
				break;
			case 10:
				$r = (function($this) {
					var $r;
					var vars = _g[2];
					$r = (function($this) {
						var $r;
						var ret1 = [];
						{
							var _g11 = 0;
							while(_g11 < vars.length) {
								var v = vars[_g11];
								++_g11;
								ret1.push({ name : v.name, type : v.type, expr : haxe_macro_ExprTools.opt(v.expr,f)});
							}
						}
						$r = haxe_macro_ExprDef.EVars(ret1);
						return $r;
					}($this));
					return $r;
				}($this));
				break;
			case 12:
				$r = (function($this) {
					var $r;
					var el1 = _g[2];
					$r = haxe_macro_ExprDef.EBlock(haxe_macro_ExprArrayTools.map(el1,f));
					return $r;
				}($this));
				break;
			case 13:
				$r = (function($this) {
					var $r;
					var expr = _g[3];
					var it = _g[2];
					$r = haxe_macro_ExprDef.EFor(f(it),f(expr));
					return $r;
				}($this));
				break;
			case 14:
				$r = (function($this) {
					var $r;
					var e22 = _g[3];
					var e12 = _g[2];
					$r = haxe_macro_ExprDef.EIn(f(e12),f(e22));
					return $r;
				}($this));
				break;
			case 15:
				$r = (function($this) {
					var $r;
					var eelse = _g[4];
					var eif = _g[3];
					var econd = _g[2];
					$r = haxe_macro_ExprDef.EIf(f(econd),f(eif),eelse == null?null:f(eelse));
					return $r;
				}($this));
				break;
			case 16:
				$r = (function($this) {
					var $r;
					var normalWhile = _g[4];
					var e7 = _g[3];
					var econd1 = _g[2];
					$r = haxe_macro_ExprDef.EWhile(f(econd1),f(e7),normalWhile);
					return $r;
				}($this));
				break;
			case 19:
				$r = (function($this) {
					var $r;
					var e8 = _g[2];
					$r = haxe_macro_ExprDef.EReturn(e8 == null?null:f(e8));
					return $r;
				}($this));
				break;
			case 22:
				$r = (function($this) {
					var $r;
					var e9 = _g[2];
					$r = haxe_macro_ExprDef.EUntyped(f(e9));
					return $r;
				}($this));
				break;
			case 23:
				$r = (function($this) {
					var $r;
					var e10 = _g[2];
					$r = haxe_macro_ExprDef.EThrow(f(e10));
					return $r;
				}($this));
				break;
			case 24:
				$r = (function($this) {
					var $r;
					var t = _g[3];
					var e13 = _g[2];
					$r = haxe_macro_ExprDef.ECast(f(e13),t);
					return $r;
				}($this));
				break;
			case 25:
				$r = (function($this) {
					var $r;
					var isCall = _g[3];
					var e14 = _g[2];
					$r = haxe_macro_ExprDef.EDisplay(f(e14),isCall);
					return $r;
				}($this));
				break;
			case 27:
				$r = (function($this) {
					var $r;
					var eelse1 = _g[4];
					var eif1 = _g[3];
					var econd2 = _g[2];
					$r = haxe_macro_ExprDef.ETernary(f(econd2),f(eif1),f(eelse1));
					return $r;
				}($this));
				break;
			case 28:
				$r = (function($this) {
					var $r;
					var t1 = _g[3];
					var e15 = _g[2];
					$r = haxe_macro_ExprDef.ECheckType(f(e15),t1);
					return $r;
				}($this));
				break;
			case 26:case 21:case 20:
				$r = e.expr;
				break;
			case 18:
				$r = (function($this) {
					var $r;
					var catches = _g[3];
					var e16 = _g[2];
					$r = (function($this) {
						var $r;
						var ret2 = [];
						{
							var _g12 = 0;
							while(_g12 < catches.length) {
								var c = catches[_g12];
								++_g12;
								ret2.push({ name : c.name, type : c.type, expr : f(c.expr)});
							}
						}
						$r = haxe_macro_ExprDef.ETry(f(e16),ret2);
						return $r;
					}($this));
					return $r;
				}($this));
				break;
			case 17:
				$r = (function($this) {
					var $r;
					var edef = _g[4];
					var cases = _g[3];
					var e17 = _g[2];
					$r = (function($this) {
						var $r;
						var ret3 = [];
						{
							var _g13 = 0;
							while(_g13 < cases.length) {
								var c1 = cases[_g13];
								++_g13;
								ret3.push({ expr : haxe_macro_ExprTools.opt(c1.expr,f), guard : haxe_macro_ExprTools.opt(c1.guard,f), values : haxe_macro_ExprArrayTools.map(c1.values,f)});
							}
						}
						$r = haxe_macro_ExprDef.ESwitch(f(e17),ret3,edef == null || edef.expr == null?edef:f(edef));
						return $r;
					}($this));
					return $r;
				}($this));
				break;
			case 11:
				$r = (function($this) {
					var $r;
					var func = _g[3];
					var name = _g[2];
					$r = (function($this) {
						var $r;
						var ret4 = [];
						{
							var _g14 = 0;
							var _g2 = func.args;
							while(_g14 < _g2.length) {
								var arg = _g2[_g14];
								++_g14;
								ret4.push({ name : arg.name, opt : arg.opt, type : arg.type, value : haxe_macro_ExprTools.opt(arg.value,f)});
							}
						}
						$r = haxe_macro_ExprDef.EFunction(name,{ args : ret4, ret : func.ret, params : func.params, expr : f(func.expr)});
						return $r;
					}($this));
					return $r;
				}($this));
				break;
			case 29:
				$r = (function($this) {
					var $r;
					var e18 = _g[3];
					var m = _g[2];
					$r = haxe_macro_ExprDef.EMeta(m,f(e18));
					return $r;
				}($this));
				break;
			}
			return $r;
		}($this));
		return $r;
	}(this))};
};
haxe_macro_ExprTools.getValue = function(e) {
	{
		var _g = e.expr;
		switch(_g[1]) {
		case 0:
			switch(_g[2][1]) {
			case 0:
				var v = _g[2][2];
				return Std.parseInt(v);
			case 1:
				var v1 = _g[2][2];
				return parseFloat(v1);
			case 2:
				var s = _g[2][2];
				return s;
			case 3:
				switch(_g[2][2]) {
				case "true":
					return true;
				case "false":
					return false;
				case "null":
					return null;
				default:
					throw new js__$Boot_HaxeError("Unsupported expression: " + Std.string(e));
				}
				break;
			default:
				throw new js__$Boot_HaxeError("Unsupported expression: " + Std.string(e));
			}
			break;
		case 4:
			var e1 = _g[2];
			return haxe_macro_ExprTools.getValue(e1);
		case 22:
			var e11 = _g[2];
			return haxe_macro_ExprTools.getValue(e11);
		case 29:
			var e12 = _g[3];
			return haxe_macro_ExprTools.getValue(e12);
		case 5:
			var fields = _g[2];
			var obj = { };
			var _g1 = 0;
			while(_g1 < fields.length) {
				var field = fields[_g1];
				++_g1;
				Reflect.setField(obj,field.field,haxe_macro_ExprTools.getValue(field.expr));
			}
			return obj;
		case 6:
			var el = _g[2];
			return el.map(haxe_macro_ExprTools.getValue);
		case 15:
			var eelse = _g[4];
			var eif = _g[3];
			var econd = _g[2];
			if(eelse == null) throw new js__$Boot_HaxeError("If statements only have a value if the else clause is defined"); else {
				var econd1 = haxe_macro_ExprTools.getValue(econd);
				if(econd1) return haxe_macro_ExprTools.getValue(eif); else return haxe_macro_ExprTools.getValue(eelse);
			}
			break;
		case 27:
			var eelse1 = _g[4];
			var eif1 = _g[3];
			var econd2 = _g[2];
			if(eelse1 == null) throw new js__$Boot_HaxeError("If statements only have a value if the else clause is defined"); else {
				var econd3 = haxe_macro_ExprTools.getValue(econd2);
				if(econd3) return haxe_macro_ExprTools.getValue(eif1); else return haxe_macro_ExprTools.getValue(eelse1);
			}
			break;
		case 9:
			switch(_g[3]) {
			case false:
				var e13 = _g[4];
				var op = _g[2];
				var e14 = haxe_macro_ExprTools.getValue(e13);
				switch(op[1]) {
				case 2:
					return !e14;
				case 3:
					return -e14;
				case 4:
					return ~e14;
				default:
					throw new js__$Boot_HaxeError("Unsupported expression: " + Std.string(e));
				}
				break;
			default:
				throw new js__$Boot_HaxeError("Unsupported expression: " + Std.string(e));
			}
			break;
		case 2:
			var e2 = _g[4];
			var e15 = _g[3];
			var op1 = _g[2];
			var e16 = haxe_macro_ExprTools.getValue(e15);
			var e21 = haxe_macro_ExprTools.getValue(e2);
			switch(op1[1]) {
			case 0:
				return e16 + e21;
			case 3:
				return e16 - e21;
			case 1:
				return e16 * e21;
			case 2:
				return e16 / e21;
			case 19:
				return e16 % e21;
			case 5:
				return e16 == e21;
			case 6:
				return e16 != e21;
			case 9:
				return e16 < e21;
			case 10:
				return e16 <= e21;
			case 7:
				return e16 > e21;
			case 8:
				return e16 >= e21;
			case 12:
				return e16 | e21;
			case 11:
				return e16 & e21;
			case 13:
				return e16 ^ e21;
			case 14:
				return e16 && e21;
			case 15:
				return e16 || e21;
			case 16:
				return e16 << e21;
			case 17:
				return e16 >> e21;
			case 18:
				return e16 >>> e21;
			default:
				throw new js__$Boot_HaxeError("Unsupported expression: " + Std.string(e));
			}
			break;
		default:
			throw new js__$Boot_HaxeError("Unsupported expression: " + Std.string(e));
		}
	}
};
haxe_macro_ExprTools.opt = function(e,f) {
	if(e == null) return null; else return f(e);
};
haxe_macro_ExprTools.opt2 = function(e,f) {
	if(e != null) f(e);
};
var haxe_macro_ExprArrayTools = function() { };
$hxClasses["haxe.macro.ExprArrayTools"] = haxe_macro_ExprArrayTools;
haxe_macro_ExprArrayTools.__name__ = ["haxe","macro","ExprArrayTools"];
haxe_macro_ExprArrayTools.map = function(el,f) {
	var ret = [];
	var _g = 0;
	while(_g < el.length) {
		var e = el[_g];
		++_g;
		ret.push(f(e));
	}
	return ret;
};
haxe_macro_ExprArrayTools.iter = function(el,f) {
	var _g = 0;
	while(_g < el.length) {
		var e = el[_g];
		++_g;
		f(e);
	}
};
var haxe_macro_Printer = function(tabString) {
	if(tabString == null) tabString = "\t";
	this.tabs = "";
	this.tabString = tabString;
};
$hxClasses["haxe.macro.Printer"] = haxe_macro_Printer;
haxe_macro_Printer.__name__ = ["haxe","macro","Printer"];
haxe_macro_Printer.prototype = {
	tabs: null
	,tabString: null
	,printUnop: function(op) {
		switch(op[1]) {
		case 0:
			return "++";
		case 1:
			return "--";
		case 2:
			return "!";
		case 3:
			return "-";
		case 4:
			return "~";
		}
	}
	,printBinop: function(op) {
		switch(op[1]) {
		case 0:
			return "+";
		case 1:
			return "*";
		case 2:
			return "/";
		case 3:
			return "-";
		case 4:
			return "=";
		case 5:
			return "==";
		case 6:
			return "!=";
		case 7:
			return ">";
		case 8:
			return ">=";
		case 9:
			return "<";
		case 10:
			return "<=";
		case 11:
			return "&";
		case 12:
			return "|";
		case 13:
			return "^";
		case 14:
			return "&&";
		case 15:
			return "||";
		case 16:
			return "<<";
		case 17:
			return ">>";
		case 18:
			return ">>>";
		case 19:
			return "%";
		case 21:
			return "...";
		case 22:
			return "=>";
		case 20:
			var op1 = op[2];
			return this.printBinop(op1) + "=";
		}
	}
	,escapeString: function(s,delim) {
		return delim + StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(s,"\n","\\n"),"\t","\\t"),"'","\\'"),"\"","\\\"") + delim;
	}
	,printFormatString: function(s) {
		return this.escapeString(s,"'");
	}
	,printString: function(s) {
		return this.escapeString(s,"\"");
	}
	,printConstant: function(c) {
		switch(c[1]) {
		case 2:
			var s = c[2];
			return this.printString(s);
		case 3:
			var s1 = c[2];
			return s1;
		case 0:
			var s2 = c[2];
			return s2;
		case 1:
			var s3 = c[2];
			return s3;
		case 4:
			var opt = c[3];
			var s4 = c[2];
			return "~/" + s4 + "/" + opt;
		}
	}
	,printTypeParam: function(param) {
		switch(param[1]) {
		case 0:
			var ct = param[2];
			return this.printComplexType(ct);
		case 1:
			var e = param[2];
			return this.printExpr(e);
		}
	}
	,printTypePath: function(tp) {
		return (tp.pack.length > 0?tp.pack.join(".") + ".":"") + tp.name + (tp.sub != null?"." + tp.sub:"") + (tp.params == null?"":tp.params.length > 0?"<" + tp.params.map($bind(this,this.printTypeParam)).join(", ") + ">":"");
	}
	,printComplexType: function(ct) {
		switch(ct[1]) {
		case 0:
			var tp = ct[2];
			return this.printTypePath(tp);
		case 1:
			var ret = ct[3];
			var args = ct[2];
			return (args.length > 0?args.map($bind(this,this.printComplexType)).join(" -> "):"Void") + " -> " + this.printComplexType(ret);
		case 2:
			var fields = ct[2];
			return "{ " + ((function($this) {
				var $r;
				var _g = [];
				{
					var _g1 = 0;
					while(_g1 < fields.length) {
						var f = fields[_g1];
						++_g1;
						_g.push($this.printField(f) + "; ");
					}
				}
				$r = _g;
				return $r;
			}(this))).join("") + "}";
		case 3:
			var ct1 = ct[2];
			return "(" + this.printComplexType(ct1) + ")";
		case 5:
			var ct2 = ct[2];
			return "?" + this.printComplexType(ct2);
		case 4:
			var fields1 = ct[3];
			var tpl = ct[2];
			return "{> " + tpl.map($bind(this,this.printTypePath)).join(" >, ") + ", " + fields1.map($bind(this,this.printField)).join(", ") + " }";
		}
	}
	,printMetadata: function(meta) {
		return "@" + meta.name + (meta.params != null && meta.params.length > 0?"(" + this.printExprs(meta.params,", ") + ")":"");
	}
	,printAccess: function(access) {
		switch(access[1]) {
		case 2:
			return "static";
		case 0:
			return "public";
		case 1:
			return "private";
		case 3:
			return "override";
		case 5:
			return "inline";
		case 4:
			return "dynamic";
		case 6:
			return "macro";
		}
	}
	,printField: function(field) {
		return (field.doc != null && field.doc != ""?"/**\n" + this.tabs + this.tabString + StringTools.replace(field.doc,"\n","\n" + this.tabs + this.tabString) + "\n" + this.tabs + "**/\n" + this.tabs:"") + (field.meta != null && field.meta.length > 0?field.meta.map($bind(this,this.printMetadata)).join("\n" + this.tabs) + ("\n" + this.tabs):"") + (field.access != null && field.access.length > 0?field.access.map($bind(this,this.printAccess)).join(" ") + " ":"") + (function($this) {
			var $r;
			var _g = field.kind;
			$r = (function($this) {
				var $r;
				switch(_g[1]) {
				case 0:
					$r = (function($this) {
						var $r;
						var eo = _g[3];
						var t = _g[2];
						$r = "var " + field.name + $this.opt(t,$bind($this,$this.printComplexType)," : ") + $this.opt(eo,$bind($this,$this.printExpr)," = ");
						return $r;
					}($this));
					break;
				case 2:
					$r = (function($this) {
						var $r;
						var eo1 = _g[5];
						var t1 = _g[4];
						var set = _g[3];
						var get = _g[2];
						$r = "var " + field.name + "(" + get + ", " + set + ")" + $this.opt(t1,$bind($this,$this.printComplexType)," : ") + $this.opt(eo1,$bind($this,$this.printExpr)," = ");
						return $r;
					}($this));
					break;
				case 1:
					$r = (function($this) {
						var $r;
						var func = _g[2];
						$r = "function " + field.name + $this.printFunction(func);
						return $r;
					}($this));
					break;
				}
				return $r;
			}($this));
			return $r;
		}(this));
	}
	,printTypeParamDecl: function(tpd) {
		return tpd.name + (tpd.params != null && tpd.params.length > 0?"<" + tpd.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">":"") + (tpd.constraints != null && tpd.constraints.length > 0?":(" + tpd.constraints.map($bind(this,this.printComplexType)).join(", ") + ")":"");
	}
	,printFunctionArg: function(arg) {
		return (arg.opt?"?":"") + arg.name + this.opt(arg.type,$bind(this,this.printComplexType),":") + this.opt(arg.value,$bind(this,this.printExpr)," = ");
	}
	,printFunction: function(func) {
		return (func.params == null?"":func.params.length > 0?"<" + func.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">":"") + "(" + func.args.map($bind(this,this.printFunctionArg)).join(", ") + ")" + this.opt(func.ret,$bind(this,this.printComplexType),":") + this.opt(func.expr,$bind(this,this.printExpr)," ");
	}
	,printVar: function(v) {
		return v.name + this.opt(v.type,$bind(this,this.printComplexType),":") + this.opt(v.expr,$bind(this,this.printExpr)," = ");
	}
	,printExpr: function(e) {
		var _g1 = this;
		if(e == null) return "#NULL"; else {
			var _g = e.expr;
			switch(_g[1]) {
			case 0:
				var c = _g[2];
				return this.printConstant(c);
			case 1:
				var e2 = _g[3];
				var e1 = _g[2];
				return "" + this.printExpr(e1) + "[" + this.printExpr(e2) + "]";
			case 2:
				var e21 = _g[4];
				var e11 = _g[3];
				var op = _g[2];
				return "" + this.printExpr(e11) + " " + this.printBinop(op) + " " + this.printExpr(e21);
			case 3:
				var n = _g[3];
				var e12 = _g[2];
				return "" + this.printExpr(e12) + "." + n;
			case 4:
				var e13 = _g[2];
				return "(" + this.printExpr(e13) + ")";
			case 5:
				var fl = _g[2];
				return "{ " + fl.map(function(fld) {
					return "" + fld.field + " : " + _g1.printExpr(fld.expr);
				}).join(", ") + " }";
			case 6:
				var el = _g[2];
				return "[" + this.printExprs(el,", ") + "]";
			case 7:
				var el1 = _g[3];
				var e14 = _g[2];
				return "" + this.printExpr(e14) + "(" + this.printExprs(el1,", ") + ")";
			case 8:
				var el2 = _g[3];
				var tp = _g[2];
				return "new " + this.printTypePath(tp) + "(" + this.printExprs(el2,", ") + ")";
			case 9:
				switch(_g[3]) {
				case true:
					var e15 = _g[4];
					var op1 = _g[2];
					return this.printExpr(e15) + this.printUnop(op1);
				case false:
					var e16 = _g[4];
					var op2 = _g[2];
					return this.printUnop(op2) + this.printExpr(e16);
				}
				break;
			case 11:
				var func = _g[3];
				var no = _g[2];
				if(no != null) return "function " + no + this.printFunction(func); else {
					var func1 = _g[3];
					return "function" + this.printFunction(func1);
				}
				break;
			case 10:
				var vl = _g[2];
				return "var " + vl.map($bind(this,this.printVar)).join(", ");
			case 12:
				var el3 = _g[2];
				switch(_g[2].length) {
				case 0:
					return "{ }";
				default:
					var old = this.tabs;
					this.tabs += this.tabString;
					var s = "{\n" + this.tabs + this.printExprs(el3,";\n" + this.tabs);
					this.tabs = old;
					return s + (";\n" + this.tabs + "}");
				}
				break;
			case 13:
				var e22 = _g[3];
				var e17 = _g[2];
				return "for (" + this.printExpr(e17) + ") " + this.printExpr(e22);
			case 14:
				var e23 = _g[3];
				var e18 = _g[2];
				return "" + this.printExpr(e18) + " in " + this.printExpr(e23);
			case 15:
				var eelse = _g[4];
				if(_g[4] == null) {
					var econd = _g[2];
					var eif = _g[3];
					return "if (" + this.printExpr(econd) + ") " + this.printExpr(eif);
				} else switch(_g[4]) {
				default:
					var econd1 = _g[2];
					var eif1 = _g[3];
					return "if (" + this.printExpr(econd1) + ") " + this.printExpr(eif1) + " else " + this.printExpr(eelse);
				}
				break;
			case 16:
				switch(_g[4]) {
				case true:
					var econd2 = _g[2];
					var e19 = _g[3];
					return "while (" + this.printExpr(econd2) + ") " + this.printExpr(e19);
				case false:
					var econd3 = _g[2];
					var e110 = _g[3];
					return "do " + this.printExpr(e110) + " while (" + this.printExpr(econd3) + ")";
				}
				break;
			case 17:
				var edef = _g[4];
				var cl = _g[3];
				var e111 = _g[2];
				var old1 = this.tabs;
				this.tabs += this.tabString;
				var s1 = "switch " + this.printExpr(e111) + " {\n" + this.tabs + cl.map(function(c1) {
					return "case " + _g1.printExprs(c1.values,", ") + (c1.guard != null?" if (" + _g1.printExpr(c1.guard) + "):":":") + (c1.expr != null?_g1.opt(c1.expr,$bind(_g1,_g1.printExpr)) + ";":"");
				}).join("\n" + this.tabs);
				if(edef != null) s1 += "\n" + this.tabs + "default:" + (edef.expr == null?"":this.printExpr(edef) + ";");
				this.tabs = old1;
				return s1 + ("\n" + this.tabs + "}");
			case 18:
				var cl1 = _g[3];
				var e112 = _g[2];
				return "try " + this.printExpr(e112) + cl1.map(function(c2) {
					return " catch(" + c2.name + ":" + _g1.printComplexType(c2.type) + ") " + _g1.printExpr(c2.expr);
				}).join("");
			case 19:
				var eo = _g[2];
				return "return" + this.opt(eo,$bind(this,this.printExpr)," ");
			case 20:
				return "break";
			case 21:
				return "continue";
			case 22:
				var e113 = _g[2];
				return "untyped " + this.printExpr(e113);
			case 23:
				var e114 = _g[2];
				return "throw " + this.printExpr(e114);
			case 24:
				var cto = _g[3];
				var e115 = _g[2];
				if(cto != null) return "cast(" + this.printExpr(e115) + ", " + this.printComplexType(cto) + ")"; else {
					var e116 = _g[2];
					return "cast " + this.printExpr(e116);
				}
				break;
			case 25:
				var e117 = _g[2];
				return "#DISPLAY(" + this.printExpr(e117) + ")";
			case 26:
				var tp1 = _g[2];
				return "#DISPLAY(" + this.printTypePath(tp1) + ")";
			case 27:
				var eelse1 = _g[4];
				var eif2 = _g[3];
				var econd4 = _g[2];
				return "" + this.printExpr(econd4) + " ? " + this.printExpr(eif2) + " : " + this.printExpr(eelse1);
			case 28:
				var ct = _g[3];
				var e118 = _g[2];
				return "(" + this.printExpr(e118) + " : " + this.printComplexType(ct) + ")";
			case 29:
				var e119 = _g[3];
				var meta = _g[2];
				return this.printMetadata(meta) + " " + this.printExpr(e119);
			}
		}
	}
	,printExprs: function(el,sep) {
		return el.map($bind(this,this.printExpr)).join(sep);
	}
	,printExtension: function(tpl,fields) {
		return "{\n" + this.tabs + ">" + tpl.map($bind(this,this.printTypePath)).join(",\n" + this.tabs + ">") + "," + (fields.length > 0?"\n" + this.tabs + fields.map($bind(this,this.printField)).join(";\n" + this.tabs) + ";\n}":"\n}");
	}
	,printStructure: function(fields) {
		if(fields.length == 0) return "{ }"; else return "{\n" + this.tabs + fields.map($bind(this,this.printField)).join(";\n" + this.tabs) + ";\n}";
	}
	,printTypeDefinition: function(t,printPackage) {
		if(printPackage == null) printPackage = true;
		var old = this.tabs;
		this.tabs = this.tabString;
		var str;
		if(t == null) str = "#NULL"; else str = (printPackage && t.pack.length > 0 && t.pack[0] != ""?"package " + t.pack.join(".") + ";\n":"") + (t.meta != null && t.meta.length > 0?t.meta.map($bind(this,this.printMetadata)).join(" ") + " ":"") + (t.isExtern?"extern ":"") + (function($this) {
			var $r;
			var _g = t.kind;
			$r = (function($this) {
				var $r;
				switch(_g[1]) {
				case 0:
					$r = "enum " + t.name + (t.params.length > 0?"<" + t.params.map($bind($this,$this.printTypeParamDecl)).join(", ") + ">":"") + " {\n" + ((function($this) {
						var $r;
						var _g1 = [];
						{
							var _g2 = 0;
							var _g3 = t.fields;
							while(_g2 < _g3.length) {
								var field = _g3[_g2];
								++_g2;
								_g1.push($this.tabs + (field.doc != null && field.doc != ""?"/**\n" + $this.tabs + $this.tabString + StringTools.replace(field.doc,"\n","\n" + $this.tabs + $this.tabString) + "\n" + $this.tabs + "**/\n" + $this.tabs:"") + (field.meta != null && field.meta.length > 0?field.meta.map($bind($this,$this.printMetadata)).join(" ") + " ":"") + (function($this) {
									var $r;
									var _g4 = field.kind;
									$r = (function($this) {
										var $r;
										switch(_g4[1]) {
										case 0:
											$r = (function($this) {
												var $r;
												var t1 = _g4[2];
												$r = field.name + $this.opt(t1,$bind($this,$this.printComplexType),":");
												return $r;
											}($this));
											break;
										case 2:
											$r = (function($this) {
												var $r;
												throw new js__$Boot_HaxeError("FProp is invalid for TDEnum.");
												return $r;
											}($this));
											break;
										case 1:
											$r = (function($this) {
												var $r;
												var func = _g4[2];
												$r = field.name + $this.printFunction(func);
												return $r;
											}($this));
											break;
										}
										return $r;
									}($this));
									return $r;
								}($this)) + ";");
							}
						}
						$r = _g1;
						return $r;
					}($this))).join("\n") + "\n}";
					break;
				case 1:
					$r = "typedef " + t.name + (t.params.length > 0?"<" + t.params.map($bind($this,$this.printTypeParamDecl)).join(", ") + ">":"") + " = {\n" + ((function($this) {
						var $r;
						var _g11 = [];
						{
							var _g21 = 0;
							var _g31 = t.fields;
							while(_g21 < _g31.length) {
								var f = _g31[_g21];
								++_g21;
								_g11.push($this.tabs + $this.printField(f) + ";");
							}
						}
						$r = _g11;
						return $r;
					}($this))).join("\n") + "\n}";
					break;
				case 2:
					$r = (function($this) {
						var $r;
						var isInterface = _g[4];
						var interfaces = _g[3];
						var superClass = _g[2];
						$r = (isInterface?"interface ":"class ") + t.name + (t.params != null && t.params.length > 0?"<" + t.params.map($bind($this,$this.printTypeParamDecl)).join(", ") + ">":"") + (superClass != null?" extends " + $this.printTypePath(superClass):"") + (interfaces != null?(isInterface?(function($this) {
							var $r;
							var _g12 = [];
							{
								var _g22 = 0;
								while(_g22 < interfaces.length) {
									var tp = interfaces[_g22];
									++_g22;
									_g12.push(" extends " + $this.printTypePath(tp));
								}
							}
							$r = _g12;
							return $r;
						}($this)):(function($this) {
							var $r;
							var _g23 = [];
							{
								var _g32 = 0;
								while(_g32 < interfaces.length) {
									var tp1 = interfaces[_g32];
									++_g32;
									_g23.push(" implements " + $this.printTypePath(tp1));
								}
							}
							$r = _g23;
							return $r;
						}($this))).join(""):"") + " {\n" + ((function($this) {
							var $r;
							var _g33 = [];
							{
								var _g41 = 0;
								var _g5 = t.fields;
								while(_g41 < _g5.length) {
									var f1 = _g5[_g41];
									++_g41;
									_g33.push((function($this) {
										var $r;
										var fstr = $this.printField(f1);
										$r = $this.tabs + fstr + (function($this) {
											var $r;
											var _g6 = f1.kind;
											$r = (function($this) {
												var $r;
												switch(_g6[1]) {
												case 0:case 2:
													$r = ";";
													break;
												case 1:
													$r = _g6[2].expr == null?";":(function($this) {
														var $r;
														switch(_g6[2].expr.expr[1]) {
														case 12:
															$r = "";
															break;
														default:
															$r = ";";
														}
														return $r;
													}($this));
													break;
												}
												return $r;
											}($this));
											return $r;
										}($this));
										return $r;
									}($this)));
								}
							}
							$r = _g33;
							return $r;
						}($this))).join("\n") + "\n}";
						return $r;
					}($this));
					break;
				case 3:
					$r = (function($this) {
						var $r;
						var ct = _g[2];
						$r = "typedef " + t.name + (t.params.length > 0?"<" + t.params.map($bind($this,$this.printTypeParamDecl)).join(", ") + ">":"") + " = " + (function($this) {
							var $r;
							switch(ct[1]) {
							case 4:
								$r = (function($this) {
									var $r;
									var fields = ct[3];
									var tpl = ct[2];
									$r = $this.printExtension(tpl,fields);
									return $r;
								}($this));
								break;
							case 2:
								$r = (function($this) {
									var $r;
									var fields1 = ct[2];
									$r = $this.printStructure(fields1);
									return $r;
								}($this));
								break;
							default:
								$r = $this.printComplexType(ct);
							}
							return $r;
						}($this)) + ";";
						return $r;
					}($this));
					break;
				case 4:
					$r = (function($this) {
						var $r;
						var to = _g[4];
						var from = _g[3];
						var tthis = _g[2];
						$r = "abstract " + t.name + (t.params.length > 0?"<" + t.params.map($bind($this,$this.printTypeParamDecl)).join(", ") + ">":"") + (tthis == null?"":"(" + $this.printComplexType(tthis) + ")") + (from == null?"":((function($this) {
							var $r;
							var _g13 = [];
							{
								var _g24 = 0;
								while(_g24 < from.length) {
									var f2 = from[_g24];
									++_g24;
									_g13.push(" from " + $this.printComplexType(f2));
								}
							}
							$r = _g13;
							return $r;
						}($this))).join("")) + (to == null?"":((function($this) {
							var $r;
							var _g25 = [];
							{
								var _g34 = 0;
								while(_g34 < to.length) {
									var t2 = to[_g34];
									++_g34;
									_g25.push(" to " + $this.printComplexType(t2));
								}
							}
							$r = _g25;
							return $r;
						}($this))).join("")) + " {\n" + ((function($this) {
							var $r;
							var _g35 = [];
							{
								var _g42 = 0;
								var _g51 = t.fields;
								while(_g42 < _g51.length) {
									var f3 = _g51[_g42];
									++_g42;
									_g35.push((function($this) {
										var $r;
										var fstr1 = $this.printField(f3);
										$r = $this.tabs + fstr1 + (function($this) {
											var $r;
											var _g61 = f3.kind;
											$r = (function($this) {
												var $r;
												switch(_g61[1]) {
												case 0:case 2:
													$r = ";";
													break;
												case 1:
													$r = (function($this) {
														var $r;
														var func1 = _g61[2];
														$r = func1.expr == null?";":"";
														return $r;
													}($this));
													break;
												default:
													$r = "";
												}
												return $r;
											}($this));
											return $r;
										}($this));
										return $r;
									}($this)));
								}
							}
							$r = _g35;
							return $r;
						}($this))).join("\n") + "\n}";
						return $r;
					}($this));
					break;
				}
				return $r;
			}($this));
			return $r;
		}(this));
		this.tabs = old;
		return str;
	}
	,opt: function(v,f,prefix) {
		if(prefix == null) prefix = "";
		if(v == null) return ""; else return prefix + f(v);
	}
	,__class__: haxe_macro_Printer
};
var haxe_macro_Type = $hxClasses["haxe.macro.Type"] = { __ename__ : ["haxe","macro","Type"], __constructs__ : ["TMono","TEnum","TInst","TType","TFun","TAnonymous","TDynamic","TLazy","TAbstract"] };
haxe_macro_Type.TMono = function(t) { var $x = ["TMono",0,t]; $x.__enum__ = haxe_macro_Type; $x.toString = $estr; return $x; };
haxe_macro_Type.TEnum = function(t,params) { var $x = ["TEnum",1,t,params]; $x.__enum__ = haxe_macro_Type; $x.toString = $estr; return $x; };
haxe_macro_Type.TInst = function(t,params) { var $x = ["TInst",2,t,params]; $x.__enum__ = haxe_macro_Type; $x.toString = $estr; return $x; };
haxe_macro_Type.TType = function(t,params) { var $x = ["TType",3,t,params]; $x.__enum__ = haxe_macro_Type; $x.toString = $estr; return $x; };
haxe_macro_Type.TFun = function(args,ret) { var $x = ["TFun",4,args,ret]; $x.__enum__ = haxe_macro_Type; $x.toString = $estr; return $x; };
haxe_macro_Type.TAnonymous = function(a) { var $x = ["TAnonymous",5,a]; $x.__enum__ = haxe_macro_Type; $x.toString = $estr; return $x; };
haxe_macro_Type.TDynamic = function(t) { var $x = ["TDynamic",6,t]; $x.__enum__ = haxe_macro_Type; $x.toString = $estr; return $x; };
haxe_macro_Type.TLazy = function(f) { var $x = ["TLazy",7,f]; $x.__enum__ = haxe_macro_Type; $x.toString = $estr; return $x; };
haxe_macro_Type.TAbstract = function(t,params) { var $x = ["TAbstract",8,t,params]; $x.__enum__ = haxe_macro_Type; $x.toString = $estr; return $x; };
haxe_macro_Type.__empty_constructs__ = [];
var haxe_macro_AnonStatus = $hxClasses["haxe.macro.AnonStatus"] = { __ename__ : ["haxe","macro","AnonStatus"], __constructs__ : ["AClosed","AOpened","AConst","AExtend","AClassStatics","AEnumStatics","AAbstractStatics"] };
haxe_macro_AnonStatus.AClosed = ["AClosed",0];
haxe_macro_AnonStatus.AClosed.toString = $estr;
haxe_macro_AnonStatus.AClosed.__enum__ = haxe_macro_AnonStatus;
haxe_macro_AnonStatus.AOpened = ["AOpened",1];
haxe_macro_AnonStatus.AOpened.toString = $estr;
haxe_macro_AnonStatus.AOpened.__enum__ = haxe_macro_AnonStatus;
haxe_macro_AnonStatus.AConst = ["AConst",2];
haxe_macro_AnonStatus.AConst.toString = $estr;
haxe_macro_AnonStatus.AConst.__enum__ = haxe_macro_AnonStatus;
haxe_macro_AnonStatus.AExtend = function(tl) { var $x = ["AExtend",3,tl]; $x.__enum__ = haxe_macro_AnonStatus; $x.toString = $estr; return $x; };
haxe_macro_AnonStatus.AClassStatics = function(t) { var $x = ["AClassStatics",4,t]; $x.__enum__ = haxe_macro_AnonStatus; $x.toString = $estr; return $x; };
haxe_macro_AnonStatus.AEnumStatics = function(t) { var $x = ["AEnumStatics",5,t]; $x.__enum__ = haxe_macro_AnonStatus; $x.toString = $estr; return $x; };
haxe_macro_AnonStatus.AAbstractStatics = function(t) { var $x = ["AAbstractStatics",6,t]; $x.__enum__ = haxe_macro_AnonStatus; $x.toString = $estr; return $x; };
haxe_macro_AnonStatus.__empty_constructs__ = [haxe_macro_AnonStatus.AClosed,haxe_macro_AnonStatus.AOpened,haxe_macro_AnonStatus.AConst];
var haxe_macro_ClassKind = $hxClasses["haxe.macro.ClassKind"] = { __ename__ : ["haxe","macro","ClassKind"], __constructs__ : ["KNormal","KTypeParameter","KExtension","KExpr","KGeneric","KGenericInstance","KMacroType","KAbstractImpl","KGenericBuild"] };
haxe_macro_ClassKind.KNormal = ["KNormal",0];
haxe_macro_ClassKind.KNormal.toString = $estr;
haxe_macro_ClassKind.KNormal.__enum__ = haxe_macro_ClassKind;
haxe_macro_ClassKind.KTypeParameter = function(constraints) { var $x = ["KTypeParameter",1,constraints]; $x.__enum__ = haxe_macro_ClassKind; $x.toString = $estr; return $x; };
haxe_macro_ClassKind.KExtension = function(cl,params) { var $x = ["KExtension",2,cl,params]; $x.__enum__ = haxe_macro_ClassKind; $x.toString = $estr; return $x; };
haxe_macro_ClassKind.KExpr = function(expr) { var $x = ["KExpr",3,expr]; $x.__enum__ = haxe_macro_ClassKind; $x.toString = $estr; return $x; };
haxe_macro_ClassKind.KGeneric = ["KGeneric",4];
haxe_macro_ClassKind.KGeneric.toString = $estr;
haxe_macro_ClassKind.KGeneric.__enum__ = haxe_macro_ClassKind;
haxe_macro_ClassKind.KGenericInstance = function(cl,params) { var $x = ["KGenericInstance",5,cl,params]; $x.__enum__ = haxe_macro_ClassKind; $x.toString = $estr; return $x; };
haxe_macro_ClassKind.KMacroType = ["KMacroType",6];
haxe_macro_ClassKind.KMacroType.toString = $estr;
haxe_macro_ClassKind.KMacroType.__enum__ = haxe_macro_ClassKind;
haxe_macro_ClassKind.KAbstractImpl = function(a) { var $x = ["KAbstractImpl",7,a]; $x.__enum__ = haxe_macro_ClassKind; $x.toString = $estr; return $x; };
haxe_macro_ClassKind.KGenericBuild = ["KGenericBuild",8];
haxe_macro_ClassKind.KGenericBuild.toString = $estr;
haxe_macro_ClassKind.KGenericBuild.__enum__ = haxe_macro_ClassKind;
haxe_macro_ClassKind.__empty_constructs__ = [haxe_macro_ClassKind.KNormal,haxe_macro_ClassKind.KGeneric,haxe_macro_ClassKind.KMacroType,haxe_macro_ClassKind.KGenericBuild];
var haxe_macro_FieldKind = $hxClasses["haxe.macro.FieldKind"] = { __ename__ : ["haxe","macro","FieldKind"], __constructs__ : ["FVar","FMethod"] };
haxe_macro_FieldKind.FVar = function(read,write) { var $x = ["FVar",0,read,write]; $x.__enum__ = haxe_macro_FieldKind; $x.toString = $estr; return $x; };
haxe_macro_FieldKind.FMethod = function(k) { var $x = ["FMethod",1,k]; $x.__enum__ = haxe_macro_FieldKind; $x.toString = $estr; return $x; };
haxe_macro_FieldKind.__empty_constructs__ = [];
var haxe_macro_VarAccess = $hxClasses["haxe.macro.VarAccess"] = { __ename__ : ["haxe","macro","VarAccess"], __constructs__ : ["AccNormal","AccNo","AccNever","AccResolve","AccCall","AccInline","AccRequire"] };
haxe_macro_VarAccess.AccNormal = ["AccNormal",0];
haxe_macro_VarAccess.AccNormal.toString = $estr;
haxe_macro_VarAccess.AccNormal.__enum__ = haxe_macro_VarAccess;
haxe_macro_VarAccess.AccNo = ["AccNo",1];
haxe_macro_VarAccess.AccNo.toString = $estr;
haxe_macro_VarAccess.AccNo.__enum__ = haxe_macro_VarAccess;
haxe_macro_VarAccess.AccNever = ["AccNever",2];
haxe_macro_VarAccess.AccNever.toString = $estr;
haxe_macro_VarAccess.AccNever.__enum__ = haxe_macro_VarAccess;
haxe_macro_VarAccess.AccResolve = ["AccResolve",3];
haxe_macro_VarAccess.AccResolve.toString = $estr;
haxe_macro_VarAccess.AccResolve.__enum__ = haxe_macro_VarAccess;
haxe_macro_VarAccess.AccCall = ["AccCall",4];
haxe_macro_VarAccess.AccCall.toString = $estr;
haxe_macro_VarAccess.AccCall.__enum__ = haxe_macro_VarAccess;
haxe_macro_VarAccess.AccInline = ["AccInline",5];
haxe_macro_VarAccess.AccInline.toString = $estr;
haxe_macro_VarAccess.AccInline.__enum__ = haxe_macro_VarAccess;
haxe_macro_VarAccess.AccRequire = function(r,msg) { var $x = ["AccRequire",6,r,msg]; $x.__enum__ = haxe_macro_VarAccess; $x.toString = $estr; return $x; };
haxe_macro_VarAccess.__empty_constructs__ = [haxe_macro_VarAccess.AccNormal,haxe_macro_VarAccess.AccNo,haxe_macro_VarAccess.AccNever,haxe_macro_VarAccess.AccResolve,haxe_macro_VarAccess.AccCall,haxe_macro_VarAccess.AccInline];
var haxe_macro_MethodKind = $hxClasses["haxe.macro.MethodKind"] = { __ename__ : ["haxe","macro","MethodKind"], __constructs__ : ["MethNormal","MethInline","MethDynamic","MethMacro"] };
haxe_macro_MethodKind.MethNormal = ["MethNormal",0];
haxe_macro_MethodKind.MethNormal.toString = $estr;
haxe_macro_MethodKind.MethNormal.__enum__ = haxe_macro_MethodKind;
haxe_macro_MethodKind.MethInline = ["MethInline",1];
haxe_macro_MethodKind.MethInline.toString = $estr;
haxe_macro_MethodKind.MethInline.__enum__ = haxe_macro_MethodKind;
haxe_macro_MethodKind.MethDynamic = ["MethDynamic",2];
haxe_macro_MethodKind.MethDynamic.toString = $estr;
haxe_macro_MethodKind.MethDynamic.__enum__ = haxe_macro_MethodKind;
haxe_macro_MethodKind.MethMacro = ["MethMacro",3];
haxe_macro_MethodKind.MethMacro.toString = $estr;
haxe_macro_MethodKind.MethMacro.__enum__ = haxe_macro_MethodKind;
haxe_macro_MethodKind.__empty_constructs__ = [haxe_macro_MethodKind.MethNormal,haxe_macro_MethodKind.MethInline,haxe_macro_MethodKind.MethDynamic,haxe_macro_MethodKind.MethMacro];
var haxe_macro_TConstant = $hxClasses["haxe.macro.TConstant"] = { __ename__ : ["haxe","macro","TConstant"], __constructs__ : ["TInt","TFloat","TString","TBool","TNull","TThis","TSuper"] };
haxe_macro_TConstant.TInt = function(i) { var $x = ["TInt",0,i]; $x.__enum__ = haxe_macro_TConstant; $x.toString = $estr; return $x; };
haxe_macro_TConstant.TFloat = function(s) { var $x = ["TFloat",1,s]; $x.__enum__ = haxe_macro_TConstant; $x.toString = $estr; return $x; };
haxe_macro_TConstant.TString = function(s) { var $x = ["TString",2,s]; $x.__enum__ = haxe_macro_TConstant; $x.toString = $estr; return $x; };
haxe_macro_TConstant.TBool = function(b) { var $x = ["TBool",3,b]; $x.__enum__ = haxe_macro_TConstant; $x.toString = $estr; return $x; };
haxe_macro_TConstant.TNull = ["TNull",4];
haxe_macro_TConstant.TNull.toString = $estr;
haxe_macro_TConstant.TNull.__enum__ = haxe_macro_TConstant;
haxe_macro_TConstant.TThis = ["TThis",5];
haxe_macro_TConstant.TThis.toString = $estr;
haxe_macro_TConstant.TThis.__enum__ = haxe_macro_TConstant;
haxe_macro_TConstant.TSuper = ["TSuper",6];
haxe_macro_TConstant.TSuper.toString = $estr;
haxe_macro_TConstant.TSuper.__enum__ = haxe_macro_TConstant;
haxe_macro_TConstant.__empty_constructs__ = [haxe_macro_TConstant.TNull,haxe_macro_TConstant.TThis,haxe_macro_TConstant.TSuper];
var haxe_macro_ModuleType = $hxClasses["haxe.macro.ModuleType"] = { __ename__ : ["haxe","macro","ModuleType"], __constructs__ : ["TClassDecl","TEnumDecl","TTypeDecl","TAbstract"] };
haxe_macro_ModuleType.TClassDecl = function(c) { var $x = ["TClassDecl",0,c]; $x.__enum__ = haxe_macro_ModuleType; $x.toString = $estr; return $x; };
haxe_macro_ModuleType.TEnumDecl = function(e) { var $x = ["TEnumDecl",1,e]; $x.__enum__ = haxe_macro_ModuleType; $x.toString = $estr; return $x; };
haxe_macro_ModuleType.TTypeDecl = function(t) { var $x = ["TTypeDecl",2,t]; $x.__enum__ = haxe_macro_ModuleType; $x.toString = $estr; return $x; };
haxe_macro_ModuleType.TAbstract = function(a) { var $x = ["TAbstract",3,a]; $x.__enum__ = haxe_macro_ModuleType; $x.toString = $estr; return $x; };
haxe_macro_ModuleType.__empty_constructs__ = [];
var haxe_macro_FieldAccess = $hxClasses["haxe.macro.FieldAccess"] = { __ename__ : ["haxe","macro","FieldAccess"], __constructs__ : ["FInstance","FStatic","FAnon","FDynamic","FClosure","FEnum"] };
haxe_macro_FieldAccess.FInstance = function(c,params,cf) { var $x = ["FInstance",0,c,params,cf]; $x.__enum__ = haxe_macro_FieldAccess; $x.toString = $estr; return $x; };
haxe_macro_FieldAccess.FStatic = function(c,cf) { var $x = ["FStatic",1,c,cf]; $x.__enum__ = haxe_macro_FieldAccess; $x.toString = $estr; return $x; };
haxe_macro_FieldAccess.FAnon = function(cf) { var $x = ["FAnon",2,cf]; $x.__enum__ = haxe_macro_FieldAccess; $x.toString = $estr; return $x; };
haxe_macro_FieldAccess.FDynamic = function(s) { var $x = ["FDynamic",3,s]; $x.__enum__ = haxe_macro_FieldAccess; $x.toString = $estr; return $x; };
haxe_macro_FieldAccess.FClosure = function(c,cf) { var $x = ["FClosure",4,c,cf]; $x.__enum__ = haxe_macro_FieldAccess; $x.toString = $estr; return $x; };
haxe_macro_FieldAccess.FEnum = function(e,ef) { var $x = ["FEnum",5,e,ef]; $x.__enum__ = haxe_macro_FieldAccess; $x.toString = $estr; return $x; };
haxe_macro_FieldAccess.__empty_constructs__ = [];
var haxe_macro_TypedExprDef = $hxClasses["haxe.macro.TypedExprDef"] = { __ename__ : ["haxe","macro","TypedExprDef"], __constructs__ : ["TConst","TLocal","TArray","TBinop","TField","TTypeExpr","TParenthesis","TObjectDecl","TArrayDecl","TCall","TNew","TUnop","TFunction","TVar","TBlock","TFor","TIf","TWhile","TSwitch","TTry","TReturn","TBreak","TContinue","TThrow","TCast","TMeta","TEnumParameter"] };
haxe_macro_TypedExprDef.TConst = function(c) { var $x = ["TConst",0,c]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TLocal = function(v) { var $x = ["TLocal",1,v]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TArray = function(e1,e2) { var $x = ["TArray",2,e1,e2]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TBinop = function(op,e1,e2) { var $x = ["TBinop",3,op,e1,e2]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TField = function(e,fa) { var $x = ["TField",4,e,fa]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TTypeExpr = function(m) { var $x = ["TTypeExpr",5,m]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TParenthesis = function(e) { var $x = ["TParenthesis",6,e]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TObjectDecl = function(fields) { var $x = ["TObjectDecl",7,fields]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TArrayDecl = function(el) { var $x = ["TArrayDecl",8,el]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TCall = function(e,el) { var $x = ["TCall",9,e,el]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TNew = function(c,params,el) { var $x = ["TNew",10,c,params,el]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TUnop = function(op,postFix,e) { var $x = ["TUnop",11,op,postFix,e]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TFunction = function(tfunc) { var $x = ["TFunction",12,tfunc]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TVar = function(v,expr) { var $x = ["TVar",13,v,expr]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TBlock = function(el) { var $x = ["TBlock",14,el]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TFor = function(v,e1,e2) { var $x = ["TFor",15,v,e1,e2]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TIf = function(econd,eif,eelse) { var $x = ["TIf",16,econd,eif,eelse]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TWhile = function(econd,e,normalWhile) { var $x = ["TWhile",17,econd,e,normalWhile]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TSwitch = function(e,cases,edef) { var $x = ["TSwitch",18,e,cases,edef]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TTry = function(e,catches) { var $x = ["TTry",19,e,catches]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TReturn = function(e) { var $x = ["TReturn",20,e]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TBreak = ["TBreak",21];
haxe_macro_TypedExprDef.TBreak.toString = $estr;
haxe_macro_TypedExprDef.TBreak.__enum__ = haxe_macro_TypedExprDef;
haxe_macro_TypedExprDef.TContinue = ["TContinue",22];
haxe_macro_TypedExprDef.TContinue.toString = $estr;
haxe_macro_TypedExprDef.TContinue.__enum__ = haxe_macro_TypedExprDef;
haxe_macro_TypedExprDef.TThrow = function(e) { var $x = ["TThrow",23,e]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TCast = function(e,m) { var $x = ["TCast",24,e,m]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TMeta = function(m,e1) { var $x = ["TMeta",25,m,e1]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.TEnumParameter = function(e1,ef,index) { var $x = ["TEnumParameter",26,e1,ef,index]; $x.__enum__ = haxe_macro_TypedExprDef; $x.toString = $estr; return $x; };
haxe_macro_TypedExprDef.__empty_constructs__ = [haxe_macro_TypedExprDef.TBreak,haxe_macro_TypedExprDef.TContinue];
var hosted_js_App = function() {
};
$hxClasses["hosted.js.App"] = hosted_js_App;
hosted_js_App.__name__ = ["hosted","js","App"];
hosted_js_App.prototype = {
	initMap: function(adm) {
		if(adm == null) adm = false;
		return new hosted_js_CMap(adm);
	}
	,__class__: hosted_js_App
};
var hosted_js_CMap = function(adm) {
	window.onload = $bind(this,this.onload);
	this.points = [];
	this.isAdmin = adm;
};
$hxClasses["hosted.js.CMap"] = hosted_js_CMap;
hosted_js_CMap.__name__ = ["hosted","js","CMap"];
hosted_js_CMap.prototype = {
	map: null
	,points: null
	,isAdmin: null
	,onload: function() {
		this.map = L.map("map",{ scrollWheelZoom : false}).setView([47.0836,2.3948],6);
		L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnViYXIiLCJhIjoiY2loM2lubmZpMDBwcGtxbHlwdmw0bXRkbCJ9.rfgXPakoGnXZ3wIGA3-1kQ",{ attribution : "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>", maxZoom : 32, id : "bubar.cih3inmqd00tjuxm7oc2532l0", accessToken : "pk.eyJ1IjoiYnViYXIiLCJhIjoiY2loM2lubmZpMDBwcGtxbHlwdmw0bXRkbCJ9.rfgXPakoGnXZ3wIGA3-1kQ"}).addTo(this.map);
		this.map.on("moveend",$bind(this,this.loadDatas));
		this.loadDatas();
	}
	,loadDatas: function(e) {
		var bounds = this.map.getBounds();
		var min = bounds.getSouthWest();
		var max = bounds.getNorthEast();
		var r = new haxe_Http("/p/hosted/book/mapDatas/" + min.lat + "/" + max.lat + "/" + min.lng + "/" + max.lng);
		r.onData = $bind(this,this.onDatas);
		r.request();
	}
	,onDatas: function(d) {
		var _g = 0;
		var _g1 = this.points;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.map.removeLayer(a);
		}
		var groups = haxe_Unserializer.run(d);
		var markers = L.markerClusterGroup();
		var _g2 = 0;
		while(_g2 < groups.length) {
			var g = groups[_g2];
			++_g2;
			var marker = L.marker([g.lat,g.lng],{ icon : this.getIcon()});
			var html = "<h3><a href=\"https://app.cagette.net/group/" + g.id + "\" target=\"_blank\">" + g.name + "</a></h3>" + g.address;
			marker.bindPopup(html);
			this.points.push(marker);
			markers.addLayer(marker);
		}
		this.map.addLayer(markers);
	}
	,getIcon: function() {
		return L.icon({ iconUrl : "/pa/hosted/img/marker-icon.png", iconSize : [25,41]});
	}
	,nullSafe: function(s) {
		if(s == null) return "";
		return s;
	}
	,__class__: hosted_js_CMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	val: null
	,__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
};
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.__properties__ = {get_supported:"get_supported",get_console:"get_console",get_navigator:"get_navigator",get_location:"get_location",get_document:"get_document",get_window:"get_window"}
js_Browser.get_window = function() {
	return window;
};
js_Browser.get_document = function() {
	return window.document;
};
js_Browser.get_location = function() {
	return window.location;
};
js_Browser.get_navigator = function() {
	return window.navigator;
};
js_Browser.get_console = function() {
	return window.console;
};
js_Browser.get_supported = function() {
	return typeof(window) != "undefined";
};
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
js_Browser.getSessionStorage = function() {
	try {
		var s = window.sessionStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
var js_Lib = function() { };
$hxClasses["js.Lib"] = js_Lib;
js_Lib.__name__ = ["js","Lib"];
js_Lib.__properties__ = {get_undefined:"get_undefined"}
js_Lib.debug = function() {
	debugger;
};
js_Lib.alert = function(v) {
	alert(js_Boot.__string_rec(v,""));
};
js_Lib["eval"] = function(code) {
	return eval(code);
};
js_Lib.require = function(module) {
	return require(module);
};
js_Lib.get_undefined = function() {
	return undefined;
};
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	byteLength: null
	,a: null
	,slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	buf: null
	,offset: null
	,length: null
	,getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var react_DateInput = function(props) {
	var _g = this;
	props.divId = "datePicker" + Std.random(9999999);
	React.Component.call(this,props);
	js.JQuery(function() {
		var dt = js.JQuery("#" + props.divId).datetimepicker({ locale : "fr", format : "LLLL", defaultDate : moment("2017-03-01 00:00:00","YYYY-MM-DD HH:mm:ss")});
		dt.on("dp.change",function(e) {
			var d = js.JQuery("#" + props.divId).data("DateTimePicker").date();
			_g.setState({ date : (function($this) {
				var $r;
				var s = d.format("YYYY-MM-DD HH:mm:ss");
				$r = HxOverrides.strDate(s);
				return $r;
			}(this))});
			haxe_Log.trace(_g.state,{ fileName : "DateInput.hx", lineNumber : 31, className : "react.DateInput", methodName : "new"});
		});
	});
};
$hxClasses["react.DateInput"] = react_DateInput;
react_DateInput.__name__ = ["react","DateInput"];
react_DateInput.__super__ = React.Component;
react_DateInput.prototype = $extend(React.Component.prototype,{
	render: function() {
		return { '$$typeof' : $$tre, type : "div", props : { id : this.props.divId, className : "input-group col-md-3 datepinput", children : [{ '$$typeof' : $$tre, type : "span", props : { className : "input-group-addon", children : { '$$typeof' : $$tre, type : "span", props : { className : "glyphicon glyphicon-calendar"}}}},{ '$$typeof' : $$tre, type : "input", props : { type : "text", className : "form-control"}}]}};
	}
	,__class__: react_DateInput
});
var react_Error = function(props) {
	React.Component.call(this,props);
};
$hxClasses["react.Error"] = react_Error;
react_Error.__name__ = ["react","Error"];
react_Error.__super__ = React.Component;
react_Error.prototype = $extend(React.Component.prototype,{
	render: function() {
		if(this.props.error == null) return null;
		return { '$$typeof' : $$tre, type : "div", props : { className : "alert alert-danger", children : [{ '$$typeof' : $$tre, type : "span", props : { className : "glyphicon glyphicon-exclamation-sign"}}," ",this.props.error]}};
	}
	,__class__: react_Error
});
var react_LoginBox = function(props) {
	if(props.redirectUrl == null) props.redirectUrl = "/";
	React.Component.call(this,props);
	this.state = { email : "", password : "", error : null};
};
$hxClasses["react.LoginBox"] = react_LoginBox;
react_LoginBox.__name__ = ["react","LoginBox"];
react_LoginBox.__super__ = React.Component;
react_LoginBox.prototype = $extend(React.Component.prototype,{
	setError: function(err) {
		this.setState({ error : err});
	}
	,render: function() {
		return { '$$typeof' : $$tre, type : "div", props : { children : [{ '$$typeof' : $$tre, type : react_Error, props : { error : this.state.error}},{ '$$typeof' : $$tre, type : "form", props : { method : "post", action : "", className : "form-horizontal", children : [{ '$$typeof' : $$tre, type : "div", props : { className : "form-group", children : [{ '$$typeof' : $$tre, type : "label", props : { htmlFor : "email", className : "col-sm-4 control-label", children : "Email : "}},{ '$$typeof' : $$tre, type : "div", props : { className : "col-sm-8", children : [{ '$$typeof' : $$tre, type : "input", props : { id : "email", onChange : $bind(this,this.onChange), name : "email", value : this.state.email, type : "text", required : "1", className : "form-control"}},"\t\t\t"]}}]}},{ '$$typeof' : $$tre, type : "div", props : { className : "form-group", children : [{ '$$typeof' : $$tre, type : "label", props : { htmlFor : "password", className : "col-sm-4 control-label", children : "Mot de passe : "}},{ '$$typeof' : $$tre, type : "div", props : { className : "col-sm-8", children : [{ '$$typeof' : $$tre, type : "input", props : { id : "password", onChange : $bind(this,this.onChange), name : "password", value : this.state.password, type : "password", required : "1", className : "form-control"}},"\t\t\t\t\t","\t\t\t\t\t"]}},"\t\t\t\t\t"]}},{ '$$typeof' : $$tre, type : "p", props : { className : "text-center", children : ["\t\t\t\t\t\t",{ '$$typeof' : $$tre, type : "a", props : { onClick : $bind(this,this.submit), className : "btn btn-primary btn-lg", children : [{ '$$typeof' : $$tre, type : "span", props : { className : "glyphicon glyphicon-user"}}," Connexion"]}},{ '$$typeof' : $$tre, type : "br", props : { }},{ '$$typeof' : $$tre, type : "br", props : { }},{ '$$typeof' : $$tre, type : "a", props : { href : "/user/forgottenPassword", children : "Mot de passe oublié ?"}}]}}]}},{ '$$typeof' : $$tre, type : "hr", props : { }},{ '$$typeof' : $$tre, type : "p", props : { className : "text-center", children : [{ '$$typeof' : $$tre, type : "b", props : { children : "Pas encore inscrit ? "}},{ '$$typeof' : $$tre, type : "a", props : { onClick : $bind(this,this.registerBox), className : "btn btn-default", children : [{ '$$typeof' : $$tre, type : "span", props : { className : "glyphicon glyphicon-chevron-right"}}," Inscrivez-vous ici"]}}]}}]}};
	}
	,onChange: function(e) {
		e.preventDefault();
		var name = e.target.name;
		var value = e.target.value;
		this.state[name] = value;
		this.setState(this.state);
	}
	,registerBox: function() {
		var body = window.document.querySelector("#myModal .modal-body");
		ReactDOM.unmountComponentAtNode(body);
		window.document.querySelector("#myModal .modal-title").innerHTML = "Inscription";
		ReactDOM.render({ '$$typeof' : $$tre, type : react_RegisterBox, props : { redirectUrl : this.props.redirectUrl}},body);
	}
	,submit: function(e) {
		var _g = this;
		if(this.state.email == "") {
			this.setError("Veuillez saisir votre email");
			return;
		}
		if(this.state.password == "") {
			this.setError("Veuillez saisir votre mot de passe");
			return;
		}
		var el = e.target;
		el.classList.add("disabled");
		var req = new haxe_Http("/api/user/login");
		req.addParameter("email",this.state.email);
		req.addParameter("password",this.state.password);
		req.addParameter("redirecturl",this.props.redirectUrl);
		req.onData = function(d) {
			el.classList.remove("disabled");
			var d1 = JSON.parse(d);
			if(Object.prototype.hasOwnProperty.call(d1,"error")) _g.setError(d1.error.message);
			if(Object.prototype.hasOwnProperty.call(d1,"success")) window.location.href = _g.props.redirectUrl;
		};
		req.request(true);
	}
	,__class__: react_LoginBox
});
var react_ProductInput = function(props) {
	React.Component.call(this,props);
};
$hxClasses["react.ProductInput"] = react_ProductInput;
react_ProductInput.__name__ = ["react","ProductInput"];
react_ProductInput.__super__ = React.Component;
react_ProductInput.prototype = $extend(React.Component.prototype,{
	render: function() {
		var inputName = this.props.formName + "_name";
		var txpProductInputName = this.props.formName + "_txpProductId";
		return { '$$typeof' : $$tre, type : "div", props : { children : [React.createElement("img",{ ref : "image", style : { 'float' : "right"}, className : "img-thumbnail"}),React.createElement("input",{ ref : "input", defaultValue : this.props.productName, name : inputName, style : { width : "350px"}, placeholder : "Saisir un nom de produit", className : "form-control typeahead"}),{ '$$typeof' : $$tre, type : "div", props : { className : "txpProduct"}},{ '$$typeof' : $$tre, type : "input", props : { name : txpProductInputName, value : this.props.txpProductId, type : "hidden", className : "txpProduct"}},"\t"]}};
	}
	,componentDidMount: function() {
		var _g = this;
		var substringMatcher = function(strs) {
			var findMatches = function(q,cb) {
				var matches = [];
				var substrRegex = new RegExp(q,"i");
				var _g1 = 0;
				while(_g1 < strs.length) {
					var str = strs[_g1];
					++_g1;
					if(substrRegex.test(str)) matches.push(str);
				}
				cb(matches);
			};
			return findMatches;
		};
		var products = [];
		if(react_ProductInput.DICO == null) {
			var r = new haxe_Http("/product/getTaxo");
			r.onData = function(data) {
				react_ProductInput.DICO = haxe_Unserializer.run(data);
				var $it0 = react_ProductInput.DICO.products.iterator();
				while( $it0.hasNext() ) {
					var p = $it0.next();
					products.push(p.name);
				}
				if(_g.props.txpProductId != null) {
					var product = Lambda.find(react_ProductInput.DICO.products,function(x) {
						return x.id == _g.props.txpProductId;
					});
					_g.setTaxo(product);
				}
			};
			r.request();
		}
		js.JQuery(".typeahead").typeahead({ hint : true, highlight : true, minLength : 2},{ name : "products", source : substringMatcher(products), limit : 30});
		js.JQuery(".typeahead").bind("typeahead:select",function(ev,suggestion) {
			var product1 = Lambda.find(react_ProductInput.DICO.products,function(x1) {
				return x1.name == suggestion;
			});
			_g.setTaxo(product1);
		});
	}
	,setTaxo: function(product) {
		var str = this.getTaxoString(product);
		js.JQuery("div.txpProduct").html(str);
		js.JQuery("input.txpProduct").val(product.id == null?"null":"" + product.id);
		this.refs.image.src = "/img/taxo/cat" + product.category + ".png";
	}
	,getTaxoString: function(product) {
		var str = react_ProductInput.DICO.categories.h[product.category].name;
		if(product.subCategory != null) str += " / " + react_ProductInput.DICO.subCategories.h[product.subCategory].name;
		str += " / " + product.name;
		return str;
	}
	,__class__: react_ProductInput
});
var react_ReactMacro = function() { };
$hxClasses["react.ReactMacro"] = react_ReactMacro;
react_ReactMacro.__name__ = ["react","ReactMacro"];
var react_RegisterBox = function(props) {
	if(props.redirectUrl == null) props.redirectUrl = "/";
	React.Component.call(this,props);
	this.state = { firstName : "", lastName : "", email : "", password : "", error : null};
};
$hxClasses["react.RegisterBox"] = react_RegisterBox;
react_RegisterBox.__name__ = ["react","RegisterBox"];
react_RegisterBox.__super__ = React.Component;
react_RegisterBox.prototype = $extend(React.Component.prototype,{
	render: function() {
		return { '$$typeof' : $$tre, type : "div", props : { children : [{ '$$typeof' : $$tre, type : react_Error, props : { error : this.state.error}},{ '$$typeof' : $$tre, type : "form", props : { method : "post", action : "", className : "form-horizontal", children : [{ '$$typeof' : $$tre, type : "div", props : { className : "form-group", children : [{ '$$typeof' : $$tre, type : "label", props : { htmlFor : "firstName", className : "col-sm-4 control-label", children : "Nom : "}},{ '$$typeof' : $$tre, type : "div", props : { className : "col-sm-8", children : [{ '$$typeof' : $$tre, type : "input", props : { id : "firstName", onChange : $bind(this,this.onChange), name : "firstName", value : this.state.firstName, type : "text", className : "form-control"}},"\t\t\t\t\t"]}},"\t\t\t\t\t","\t\t\t\t\t"]}},{ '$$typeof' : $$tre, type : "div", props : { className : "form-group", children : [{ '$$typeof' : $$tre, type : "label", props : { htmlFor : "lastName", className : "col-sm-4 control-label", children : "Prénom : "}},{ '$$typeof' : $$tre, type : "div", props : { className : "col-sm-8", children : [{ '$$typeof' : $$tre, type : "input", props : { id : "lastName", onChange : $bind(this,this.onChange), name : "lastName", value : this.state.lastName, type : "text", className : "form-control"}},"\t\t\t\t\t"]}},"\t\t\t\t\t","\t\t\t\t\t"]}},{ '$$typeof' : $$tre, type : "div", props : { className : "form-group", children : [{ '$$typeof' : $$tre, type : "label", props : { htmlFor : "email", className : "col-sm-4 control-label", children : "Email : "}},{ '$$typeof' : $$tre, type : "div", props : { className : "col-sm-8", children : [{ '$$typeof' : $$tre, type : "input", props : { id : "email", onChange : $bind(this,this.onChange), name : "email", value : this.state.email, type : "text", className : "form-control"}},"\t\t\t"]}}]}},{ '$$typeof' : $$tre, type : "div", props : { className : "form-group", children : [{ '$$typeof' : $$tre, type : "label", props : { htmlFor : "password", className : "col-sm-4 control-label", children : "Mot de passe : "}},{ '$$typeof' : $$tre, type : "div", props : { className : "col-sm-8", children : [{ '$$typeof' : $$tre, type : "input", props : { id : "password", onChange : $bind(this,this.onChange), name : "password", value : this.state.password, type : "password", className : "form-control"}},"\t\t\t\t\t"]}},"\t\t\t\t\t","\t\t\t\t\t"]}},{ '$$typeof' : $$tre, type : "p", props : { className : "text-center", children : { '$$typeof' : $$tre, type : "a", props : { onClick : $bind(this,this.submit), className : "btn btn-primary btn-lg", children : [{ '$$typeof' : $$tre, type : "span", props : { className : "glyphicon glyphicon-chevron-right"}}," Inscription"]}}}}]}},{ '$$typeof' : $$tre, type : "hr", props : { }},{ '$$typeof' : $$tre, type : "p", props : { className : "text-center", children : [{ '$$typeof' : $$tre, type : "b", props : { children : "Déjà inscrit ? "}},{ '$$typeof' : $$tre, type : "a", props : { onClick : $bind(this,this.loginBox), className : "btn btn-default", children : [{ '$$typeof' : $$tre, type : "span", props : { className : "glyphicon glyphicon-user"}}," Connectez-vous ici"]}}]}}]}};
	}
	,onChange: function(e) {
		e.preventDefault();
		var name = e.target.name;
		var value = e.target.value;
		haxe_Log.trace("" + name + " : " + value,{ fileName : "RegisterBox.hx", lineNumber : 75, className : "react.RegisterBox", methodName : "onChange"});
		this.state[name] = value;
		this.setState(this.state);
	}
	,loginBox: function() {
		var body = window.document.querySelector("#myModal .modal-body");
		ReactDOM.unmountComponentAtNode(body);
		window.document.querySelector("#myModal .modal-title").innerHTML = "Connexion";
		ReactDOM.render({ '$$typeof' : $$tre, type : react_LoginBox, props : { redirectUrl : this.props.redirectUrl}},body);
	}
	,submit: function(e) {
		var _g = this;
		if(this.state.email == "") {
			this.setError("Veuillez saisir votre email");
			return;
		}
		if(this.state.password == "") {
			this.setError("Veuillez saisir un mot de passe");
			return;
		}
		if(this.state.firstName == "") {
			this.setError("Veuillez saisir votre prénom");
			return;
		}
		if(this.state.lastName == "") {
			this.setError("Veuillez saisir votre nom de famille");
			return;
		}
		var el = e.target;
		el.classList.add("disabled");
		var req = new haxe_Http("/api/user/register");
		req.addParameter("firstName",this.state.firstName);
		req.addParameter("lastName",this.state.lastName);
		req.addParameter("email",this.state.email);
		req.addParameter("password",this.state.password);
		req.addParameter("redirecturl",this.props.redirectUrl);
		req.onData = function(d) {
			el.classList.remove("disabled");
			var d1 = JSON.parse(d);
			if(Object.prototype.hasOwnProperty.call(d1,"error")) _g.setError(d1.error.message);
			if(Object.prototype.hasOwnProperty.call(d1,"success")) window.location.href = _g.props.redirectUrl;
		};
		req.request(true);
	}
	,setError: function(err) {
		this.setState({ error : err});
	}
	,__class__: react_RegisterBox
});
var react_ReportHeader = function() {
	React.Component.call(this);
	this.state = { startDate : null, endDate : null, groupBy : null, contracts : []};
};
$hxClasses["react.ReportHeader"] = react_ReportHeader;
react_ReportHeader.__name__ = ["react","ReportHeader"];
react_ReportHeader.__super__ = React.Component;
react_ReportHeader.prototype = $extend(React.Component.prototype,{
	render: function() {
		return { '$$typeof' : $$tre, type : "div", props : { className : "reportHeader", children : ["\t\t",{ '$$typeof' : $$tre, type : react_DateInput, props : { onChange : $bind(this,this.onDateChange), name : "startDate"}},{ '$$typeof' : $$tre, type : react_DateInput, props : { onChange : $bind(this,this.onDateChange), name : "endDate"}},"\t\t\t","\t\t\t",{ '$$typeof' : $$tre, type : "div", props : { className : "input-group col-md-3", children : { '$$typeof' : $$tre, type : "select", props : { onChange : $bind(this,this.onGroupByChange), className : "form-control", children : [{ '$$typeof' : $$tre, type : "option", props : { value : "ByMember", children : "Par adhérent"}},{ '$$typeof' : $$tre, type : "option", props : { value : "ByProduct", children : "Par Produit"}}]}}}},"\t\t\t","\t\t\t",{ '$$typeof' : $$tre, type : "div", props : { className : "input-group col-md-3", children : { '$$typeof' : $$tre, type : "a", props : { className : "btn btn-primary", children : "Afficher"}}}},"\t\t\t\t\t"]}};
	}
	,onDateChange: function(e) {
		haxe_Log.trace("onDateChange",{ fileName : "ReportHeader.hx", lineNumber : 37, className : "react.ReportHeader", methodName : "onDateChange"});
		var name = e.target.name;
		var value = e.target.value;
		haxe_Log.trace("" + name + " " + value,{ fileName : "ReportHeader.hx", lineNumber : 40, className : "react.ReportHeader", methodName : "onDateChange"});
		e.preventDefault();
	}
	,onGroupByChange: function(e) {
		e.preventDefault();
		haxe_Log.trace("onGRoupByChange",{ fileName : "ReportHeader.hx", lineNumber : 49, className : "react.ReportHeader", methodName : "onGroupByChange"});
		var name = e.target.name;
		var value = e.target.value;
		if(value == "ByMember") this.state.groupBy = OrdersReportGroupOption.ByMember; else this.state.groupBy = OrdersReportGroupOption.ByProduct;
		haxe_Log.trace(this.state,{ fileName : "ReportHeader.hx", lineNumber : 57, className : "react.ReportHeader", methodName : "onGroupByChange"});
		this.setState(this.state);
	}
	,__class__: react_ReportHeader
});
var sugoi_form_filters_Filter = function() {
};
$hxClasses["sugoi.form.filters.Filter"] = sugoi_form_filters_Filter;
sugoi_form_filters_Filter.__name__ = ["sugoi","form","filters","Filter"];
sugoi_form_filters_Filter.prototype = {
	__class__: sugoi_form_filters_Filter
};
var sugoi_form_filters_IFilter = function() { };
$hxClasses["sugoi.form.filters.IFilter"] = sugoi_form_filters_IFilter;
sugoi_form_filters_IFilter.__name__ = ["sugoi","form","filters","IFilter"];
sugoi_form_filters_IFilter.prototype = {
	filter: null
	,filterString: null
	,__class__: sugoi_form_filters_IFilter
};
var sugoi_form_filters_FloatFilter = function() {
	sugoi_form_filters_Filter.call(this);
};
$hxClasses["sugoi.form.filters.FloatFilter"] = sugoi_form_filters_FloatFilter;
sugoi_form_filters_FloatFilter.__name__ = ["sugoi","form","filters","FloatFilter"];
sugoi_form_filters_FloatFilter.__interfaces__ = [sugoi_form_filters_IFilter];
sugoi_form_filters_FloatFilter.__super__ = sugoi_form_filters_Filter;
sugoi_form_filters_FloatFilter.prototype = $extend(sugoi_form_filters_Filter.prototype,{
	filter: function(f) {
		return f;
	}
	,filterString: function(n) {
		if(n == null || n == "") return null;
		n = StringTools.trim(n);
		n = StringTools.replace(n,",",".");
		return parseFloat(n);
	}
	,__class__: sugoi_form_filters_FloatFilter
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
function $arrayPushClosure(a) { return function(x) { a.push(x); }; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
if(Array.prototype.lastIndexOf) HxOverrides.lastIndexOf = function(a1,o1,i1) {
	return Array.prototype.lastIndexOf.call(a1,o1,i1);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
q.fn.iterator = function() {
	return { pos : 0, j : this, hasNext : function() {
		return this.pos < this.j.length;
	}, next : function() {
		return $(this.j[this.pos++]);
	}};
};
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
var $$tre = (typeof Symbol === "function" && Symbol.for && Symbol.for("react.element")) || 0xeac7;
Data.TUTOS = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = { name : "Visite guidée coordinateur", steps : [{ element : null, text : "<p>Afin de mieux découvrir Cagette.net, nous vous proposons de faire une visite guidée de l'interface du logiciel.\r\n\t\t\t\t\t<br/> Vous aurez ainsi une vue d'ensemble sur les différents outils qui sont à votre disposition.</p>\r\n\t\t\t\t\t<p>Vous pourrez stopper et reprendre ce tutoriel quand vous le souhaitez.</p>", action : TutoAction.TANext, placement : null},{ element : "ul.nav.navbar-left", text : "Cette partie de la barre de navigation est visible par tous les adhérents.</br>\r\n\t\t\t\t\tElle permet d'accéder aux trois rubriques principales :\r\n\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t<li> La <b>page d'accueil</b> qui permet d'accéder aux commandes et de voir son planning de distribution.</li>\r\n\t\t\t\t\t\t<li> La page <b>Mon compte</b> pour mettre à jour mes coordonnées et consulter mon historique de commande</li>\r\n\t\t\t\t\t\t<li> La page <b>Mon groupe</b> pour connaître les différents producteurs et coordinateurs de mon groupe\r\n\t\t\t\t\t</ul>", action : TutoAction.TANext, placement : TutoPlacement.TPBottom},{ element : "ul.nav.navbar-right", text : "Cette partie est exclusivement réservée <b>aux coordinateurs.</b>\r\n\t\t\t\t\tC'est là que vous allez pouvoir administrer les fiches d'adhérents, les commandes, les produits, etc.<br/>\r\n\t\t\t\t\t<p>Cliquez maintenant sur <b>Gestion adhérents</b></p>\r\n\t\t\t\t\t", action : TutoAction.TAPage("/member"), placement : TutoPlacement.TPBottom},{ element : ".article .table td:first", text : "Cette rubrique permet d'administrer la liste des adhérents.<br/>\r\n\t\t\t\t\tÀ chaque fois que vous saisissez un nouvel adhérent, un compte est créé à son nom. \r\n\t\t\t\t\tIl pourra donc se connecter à Cagette.net pour faire des commandes ou consulter son planning de distribution.\r\n\t\t\t\t\t<p>Cliquez maintenant sur <b>un adhérent</b></p>", action : TutoAction.TAPage("/member/view/*"), placement : TutoPlacement.TPRight},{ element : ".article:first", text : "Nous sommes maintenant sur la fiche d'un adhérent. Ici vous pourrez :\r\n\t\t\t\t\t<ul>\r\n\t\t\t\t\t<li>voir ou modifier ses coordonnées</li>\r\n\t\t\t\t\t<li>gérer ses cotisations à votre association</li>\r\n\t\t\t\t\t<li>voir un récapitulatif de ses commandes</li>\r\n\t\t\t\t\t</ul>", action : TutoAction.TANext, placement : TutoPlacement.TPRight},{ element : "ul.nav #contractadmin", text : "Allons voir maintenant la page de gestion des <b>contrats</b> qui est très importante pour les coordinateurs.", action : TutoAction.TAPage("/contractAdmin"), placement : TutoPlacement.TPBottom},{ element : "#contracts", text : "Ici se trouve la liste des <b>contrats</b>. \r\n\t\t\t\t\tIls comportent une date de début, une date de fin, et représentent votre relation avec un producteur. <br/>\r\n\t\t\t\t\t<p>\r\n\t\t\t\t\tC'est ici que vous pourrez gérer :\r\n\t\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t<li>la liste de produits de ce producteur</li>\r\n\t\t\t\t\t\t<li>les commandes des adhérents pour ce producteur</li>\r\n\t\t\t\t\t\t<li>planifier les distributions</li>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</p>", action : TutoAction.TANext, placement : TutoPlacement.TPBottom},{ element : "#vendors", text : "Ici vous pouvez gérer la liste des <b>producteurs ou fournisseurs</b> avec lesquels vous collaborez.<br/>\r\n\t\t\t\t\tRemplissez une fiche complète pour chacun d'eux afin d'informer au mieux les adhérents", action : TutoAction.TANext, placement : TutoPlacement.TPTop},{ element : "#places", text : "Ici vous pouvez gérer la liste des <b>lieux de distribution</b>.<br/>\r\n\t\t\t\t\tN'oubliez pas de mettre l'adresse complète car une carte s'affiche à partir de l'adresse du lieu.", action : TutoAction.TANext, placement : TutoPlacement.TPTop},{ element : "#contracts table .btn:first", text : "Allons voir maintenant de plus près comment administrer un contrat. <b>Cliquez sur ce bouton</b>", action : TutoAction.TAPage("/contractAdmin/view/*"), placement : TutoPlacement.TPBottom},{ element : ".table.table-bordered:first", text : "Ici vous avez un récapitulatif du contrat.<br/>Il y a deux types de contrats : <ul>\r\n\t\t\t\t\t<li>Les contrats AMAP : l'adhérent s'engage sur toute la durée du contrat avec une commande fixe.</li>\r\n\t\t\t\t\t<li>Les contrats à commande variable : l'adhérent peut commander ce qu'il veut à chaque distribution.</li>\r\n\t\t\t\t\t</ul>", action : TutoAction.TANext, placement : TutoPlacement.TPRight},{ element : "#subnav #products", text : "Allons voir maintenant la page de gestion des <b>Produits</b>", action : TutoAction.TAPage("/contractAdmin/products/*"), placement : TutoPlacement.TPRight},{ element : ".article .table", text : "Sur cette page, vous pouvez gérer la liste des produits proposée par ce producteur.<br/>\r\n\t\t\t\t\tDéfinissez au minimum le nom et le prix de vente des produits. Il est également possible d'ajouter un descriptif et une photo.", action : TutoAction.TANext, placement : TutoPlacement.TPTop},{ element : "#subnav #deliveries", text : "Allons voir maintenant la page de gestion des <b>distributions</b>", action : TutoAction.TAPage("/contractAdmin/distributions/*"), placement : TutoPlacement.TPRight},{ element : ".article .table", text : "Ici nous pouvons gérer la liste des distributions pour ce producteur.<br/>\r\n\t\t\t\t\tDans le logiciel, une distribution comporte une date avec une heure de début et heure de fin de distribution. \r\n\t\t\t\t\tIl faut aussi préciser le lieu de distribution à partir de la liste que nous avons vue précédement.", action : TutoAction.TANext, placement : TutoPlacement.TPLeft},{ element : "#subnav #orders", text : "Allons voir maintenant la page de gestion des <b>commandes</b>", action : TutoAction.TAPage("/contractAdmin/orders/*"), placement : TutoPlacement.TPRight},{ element : ".article .table", text : "Ici nous pouvons gérer la liste des commandes relatives à ce producteur.<br/>\r\n\t\t\t\t\tSi vous choisissez d'\"ouvrir les commandes\" aux adhérents, ils pourront eux-mêmes saisir leurs commandes en se connectant à Cagette.net.<br/>\r\n\t\t\t\t\tCette page centralisera automatiquement les commandes pour ce producteur. \r\n\t\t\t\t\tSinon, en tant que coordinateur, vous pouvez saisir les commandes pour les adhérents depuis cette page.", action : TutoAction.TANext, placement : TutoPlacement.TPLeft},{ element : "ul.nav #messages", text : "<p>Nous avons vu l'essentiel en ce qui concerne les contrats.</p><p>Explorons maintenant la messagerie.</p>", action : TutoAction.TAPage("/messages"), placement : TutoPlacement.TPBottom},{ element : null, text : "<p>La messagerie vous permet d'envoyer des emails à différentes listes d'adhérents.\r\n\t\t\t\t\tIl n'est plus nécéssaire de maintenir de nombreuses listes d'emails en fonction des contrats, toutes ces listes\r\n\t\t\t\t\tsont gérées automatiquement.</p>\r\n\t\t\t\t\t<p>Les emails sont envoyés avec votre adresse email en tant qu'expéditeur, vous recevrez donc les réponses sur votre boite email habituelle.</p<\r\n\t\t\t\t\t", action : TutoAction.TANext, placement : null},{ element : "ul.nav #amapadmin", text : "Cliquez maintenant sur cette rubrique", action : TutoAction.TAPage("/amapadmin"), placement : TutoPlacement.TPBottom},{ element : "#subnav", text : "<p>Dans cette dernière rubrique, vous pouvez configurer tout ce qui concerne votre groupe en général.</p>\r\n\t\t\t\t\t<p>La rubrique <b>Droits et accès</b> est importante puisque c'est là que vous pourrez nommer d'autres coordinateurs parmi les adhérents. Ils pourront\r\n\t\t\t\t\tainsi gérer les contrats dont ils s'occupent, utiliser la messagerie, etc.\r\n\t\t\t\t\t</p>", action : TutoAction.TANext, placement : TutoPlacement.TPBottom},{ element : "#footer", text : "<p>C'est la dernière étape de ce tutoriel, j'espère qu'il vous aura donné une bonne vue d'ensemble du logiciel.<br/>\r\n\t\t\t\t\tPour aller plus loin, n'hésitez pas à consulter la <b>documentation</b> dont le lien est toujours disponible en bas de l'écran.\r\n\t\t\t\t\t</p>", action : TutoAction.TANext, placement : TutoPlacement.TPBottom}]};
		if(__map_reserved.intro != null) _g.setReserved("intro",value); else _g.h["intro"] = value;
	}
	$r = _g;
	return $r;
}(this));
Tuto.LAST_ELEMENT = null;
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Unserializer.CODES = null;
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_io_FPHelper.LN2 = 0.6931471805599453;
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
react_DateInput.displayName = "DateInput";
react_Error.displayName = "Error";
react_LoginBox.displayName = "LoginBox";
react_ProductInput.DICO = null;
react_ProductInput.displayName = "ProductInput";
react_RegisterBox.displayName = "RegisterBox";
react_ReportHeader.displayName = "ReportHeader";
App.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
