$(document).ready(function(){
	var recuperoTareas = JSON.parse(localStorage.getItem("tareas")) || [];
	var a = moment().format('LLL');
	console.log(a);
	var crearVista =function(item){
		var a = item.nombre;
		var b=item.estado;
		$(".listaTareas").append('<li class="'+ b + '" id="'+ a +'">' + a + ' </li> <input type="checkbox" id="cbox1" value="first_checkbox"> <button class="btnResuelto">Resuelto</button> <button class="btnBorrarTarea">Borrar</button>');

		$(".btnBorrarTarea").click(borrarTarea);
		$(".borrarTodo").click(borrarTodo);
		$(".borrarResueltos").click(borrarResueltos);
		$(".btnResuelto").click(resolverTarea);
		console.log("crearVista");
	}

	var borrarVista = function(item){
		console.log("item dentro de borrarVista",item);
		for(var i = 0; i<item.length; i++){
			$("#"+item[i].nombre).next().next().next().remove();
			$("#"+item[i].nombre).next().next().remove();
			$("#"+item[i].nombre).next().remove();
			$("#"+item[i].nombre).remove();
			console.log("hola");
		}
	}

	//dibujo tareas
	for(var i=0; i<recuperoTareas.length; i++){
		crearVista(recuperoTareas[i]);
	}

	var agregarTarea = function(e){
		var a = $(".ingresoTexto").val();
		var tarea = {"nombre": a, "estado":"incompleto"};
		recuperoTareas.push(tarea);
		localStorage.setItem("tareas", JSON.stringify(recuperoTareas));
		$(e.target).prev().val("");
		crearVista(tarea);
	};

	var resolverTarea = function(e){
		
		var listItem = $(e.target).prev().prev();
		console.log("hola", listItem.attr('id'));
		if (listItem.attr('class')=="incompleto"){
			listItem.addClass("completo").removeClass("incompleto");
			for(var i = 0; i<recuperoTareas.length;i++){
				var tareaCompleta = recuperoTareas[i].nombre;
				if (tareaCompleta == listItem.text().trim()){
					recuperoTareas[i].estado="completo";
					localStorage.setItem("tareas", JSON.stringify(recuperoTareas));
				}
				break;
			}
		} else {
			listItem.addClass("incompleto").removeClass("completo");
			for(var i = 0; i<recuperoTareas.length;i++){
				var tareaIncompleta = recuperoTareas[i].nombre;
				if (tareaIncompleta == listItem.text().trim()){
					recuperoTareas[i].estado="incompleto";
					localStorage.setItem("tareas", JSON.stringify(recuperoTareas));
				}
			}
		}
	};

	var borrarTarea = function(e){
		for(var i = 0; i<recuperoTareas.length;i++){
			var a = recuperoTareas[i].nombre;
			if (a == $(e.target).prev().prev().prev().text().trim()){
				recuperoTareas.splice(i,1);
				localStorage.setItem("tareas", JSON.stringify(recuperoTareas));
			}
		}

		$(e.target).prev().prev().prev().remove();
		$(e.target).prev().prev().remove();
		$(e.target).prev().remove();
		$(e.target).remove();
	};

	var borrarTodo = function(e){
		recuperoTareas=[];
		localStorage.setItem("tareas", JSON.stringify(recuperoTareas));
		$("ul").html("");
	
	}

	var borrarResueltos = function(e){
		for(var i = 0; i<recuperoTareas.length;i++){
			var a = recuperoTareas[i].nombre;
			var b = recuperoTareas[i].estado;
			var listaParaBorrar = [];
			var listaParaSubir = [];
			console.log(b);
			if (b=="completo"){
				console.log(recuperoTareas);
				listaParaBorrar.push(recuperoTareas[i]);
			} else {
				listaParaSubir.push(recuperoTareas[i]);
			}
			localStorage.setItem("tareas", JSON.stringify(listaParaSubir));
			borrarVista(listaParaBorrar);
		}
	}

	var borrarSeleccionados = function(e){
		for(var i = 0; i<recuperoTareas.length;i++){
			var listaParaBorrar = [];
			var listaParaSubir = [];
			var a = $("#"+recuperoTareas[i].nombre).next().is(":checked");
			console.log("borrarSeleccionados", a);
			if (a==true){
				console.log("sí");
				listaParaBorrar.push(recuperoTareas[i]);
			} else {
				listaParaSubir.push(recuperoTareas[i]);
			}
			localStorage.setItem("tareas", JSON.stringify(listaParaSubir));
			borrarVista(listaParaBorrar);
		}
	}

	$(".btnAgregarTarea").click(agregarTarea);
	$(".btnBorrarTarea").click(borrarTarea);
	$(".borrarTodo").click(borrarTodo);
	$(".borrarResueltos").click(borrarResueltos);
	$(".borrarSeleccionados").click(borrarSeleccionados);
	// $(".btnResuelto").click(resolverTarea);


});