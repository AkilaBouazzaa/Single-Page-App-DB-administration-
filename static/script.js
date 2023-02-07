lignes = 0;
total_points=0;

expr = [
	{
		exp:"exp 1",
		res:"result 1",
		bud:5
	},
			
]

// Appel de init()
init();

function init(){	
	// Utilisez la boucle for..of vue en cours 
	// pour parcourir les objets du tableau persons
	// et appeller doInsert sur chaque objet
	
	// A completer
	/*
		for(... of ...){
			doInsert(...);
		}
	*/

	
	/*for(person of persons){
		doInsert(person.nom, person.prenom, person.points);
	}*/
	getPersons();
}




function doInsertRowTable(id, exp, res, bud){
	

	const table = document.getElementsByTagName("table")[0];
	

	row = document.createElement("tr");
	

	row.setAttribute("class", "row");

	col1 = document.createElement("td");
	col2 = document.createElement("td");
	col3 = document.createElement("td");
	col4 = document.createElement("td");
	col5 = document.createElement("td");
	col6 = document.createElement("td");
	

	col1.innerText = id;
	col2.innerText = exp;
	col3.innerText = res;	
	col4.innerText = bud;
	chbox = document.createElement("input");
	chbox.setAttribute("type", "checkbox");
	col5.append(chbox);
	

	
		
	col1.setAttribute("class", "col_number");
	col2.setAttribute("class", "col_text");	
	col3.setAttribute("class", "col_text");
	col4.setAttribute("class", "col_number");	
	col5.setAttribute("class", "col_chkbox");
	col6.setAttribute("class", "col_edit");		
	

	row.append(col1);
	row.append(col2);
	row.append(col3);
	row.append(col4);
	row.append(col5);
	row.append(col6);	
	
	table.append(row);

	var btnEdit =document.createElement("button");
	btnEdit.innerText= "Edit";
	btnEdit.onclick = function(){
		editRow(btnEdit);
	}; 
	col6.append(btnEdit);
}



function doInsert(id,exp, res, bud){	

	lignes++;
	//num = lignes;
	total_points = total_points + bud;

									
	doInsertRowTable(id, exp, res, bud);				
	
	update_summary();
}


function consoleTableau(){
	
	console.log(expr);
}
function update_summary(){	


	element_lignes = document.getElementById("p1");
	element_points = document.getElementById("p3");
	element_lignes.innerText = lignes+" ligne(s)";
	element_points.innerText = "Total point(s)= "+total_points;
}

function doNewData(){		

	
	elt_nom = document.getElementById("form_nom");
	elt_prenom = document.getElementById("form_prenom");
	elt_points = document.getElementById("form_points");
	
	exp = elt_nom.value;
	res = elt_prenom.value;
	bud = parseInt(elt_points.value);
		
	if(exp=="" || res=="" || Number.isNaN(bud))
		alert("Formulaire incomplet !");
	else{	
		httpRequest = new XMLHttpRequest();
		httpRequest.open("POST","api/persons");

		httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		httpRequest.onreadystatechange = function (){
			if(httpRequest.readyState === 4 && httpRequest.status === 201){
			resp = JSON.parse(httpRequest.response);

			id = resp[0]["id"];
			doInsert(id, exp, res, bud);
			expr.push({id, exp, res, bud});	
			}

		};
		var data = "valnom="+exp
					+"&valprenom="+res
					+"&valpoints="+bud; 
		httpRequest.send(data);
		
		elt_nom.value = "";
		elt_prenom.value = "";
		elt_points.value = "";
			
	}
}

/*
              // deletRow AVEC EXPLICATIONS
function deleteRow(){
	// Est ce que le tableau est deja vide ?
	if(lignes==0){
		alert("Tableau deja vide !"); // si oui, informe l'utilisateur
	}else{ // Sinon, proceder a l'etape de suppression
		// Avant de supprimer, verifiez qu'au moins une checkbox est coche dans le tableau
		table = document.getElementsByTagName("table")[0]; // recuperer le tableau
		chkbox_list = table.querySelectorAll(".col_chkbox input"); // recuperer la liste des checkbox
		isOneChecked=false; 
		for(let i=0; i<chkbox_list.length; i++){ // parcourir la liste des checkbox		
			if(chkbox_list[i].checked)  // pour chaque checkbox, verifier si elle est cochee.
				isOneChecked = true;  // Si oui, garder en memoire l'information que "une checkbox cochee a ete trouvee"
		}
		if(isOneChecked==false) // si aucune checkbox cochee n'a ete trouvee
			alert("Selectionnez au moins une ligne !"); // alors informer l'utilisateur
		else{ // Sinon proceder a la suppression
				if (confirm('Voulez-vous vraiment supprimer les lignes ?')) { // Demander a l'utilisateur de confirmer son action
				//element_found = false; (inutile)
				table = document.getElementsByTagName("table")[0]; // Selectionner le tableau
				rows = table.getElementsByClassName("row"); // Recuperation des lignes du tableau
				let i=0;
				while(i<rows.length){ // Parcourir les lignes du tableau
					if(rows[i].childNodes[4].firstChild.checked){ // pour chaque ligne, verifier si sa checkbox est cochee
							// si cochee, alors deduire le nombre de points et de lignes
						total_points = total_points - parseInt(rows[i].childNodes[3].innerText);
						deletePerson(id);
						lignes--;	
						
						
						// puis supprimer la ligne du DOM
						rows[i].remove();	
						// puis supprimer l'element du tableau
						persons.splice(i,1);	
						//element_found = true; (inutile)
						// si je supprimer un element, je fait en sorte que l'index ne bouge pas (je fait du surplace
						// afin de ne pas compromettre le bon fonctionnement de ma boucle
						i--;			
					}	
					i++;
				}
				alert("Ligne supprimee avec succes !");				
				update_summary();				
			}
		}
	}
}
*/
function deleteRow(){
	if(lignes==0){
		alert("Tableau déja vide !"); 
	}else{ 
		table = document.getElementsByTagName("table")[0]; 
		chkbox_list = table.querySelectorAll(".col_chkbox input"); 
		isOneChecked=false; 
		for(let i=0; i<chkbox_list.length; i++){
			 	
			if(chkbox_list[i].checked)  
				isOneChecked = true;
				
				  
		}
		if(isOneChecked==false) 
			alert("Sélectionnez au moins une ligne !"); 
		else{ 
				if (confirm('Voulez-vous vraiment supprimer les lignes ?')) { 
				
				table = document.getElementsByTagName("table")[0]; 
				rows = table.getElementsByClassName("row"); 
				let i=0;
				while(i<rows.length){ 
					if(rows[i].childNodes[4].firstChild.checked){ 
						total_points = total_points - parseInt(rows[i].childNodes[3].innerText);
						id = parseInt(rows[i].firstChild.innerText);
						deletePerson(id);
						lignes--;
						rows[i].remove();						
						expr.splice(i,1);
						i--;						
					}	
					i++;
				}
				alert("Ligne supprimée avec succés !");				
				update_summary();				
			}
		}
	}
}
function deletePerson(id){
	httpRequest= new XMLHttpRequest();
	httpRequest.open('DELETE','/api/persons/'+id);
	httpRequest.send();
}
function actualiser(){
	getPersons();
}
function getPersons () {
	
	httpRequest = new XMLHttpRequest();
	
	httpRequest.open('GET', '/api/persons');
	
	httpRequest.onreadystatechange = doAfficherPersons;
	
	httpRequest.send();
}

function doAfficherPersons () {

	const table =document.getElementsByTagName("table")[0];
	rows = table.getElementsByClassName("row");

	for(row of rows){
			row.remove();
	}
	lignes=0;
	total_points = 0;

	if (httpRequest.readyState === XMLHttpRequest.DONE) {
	
	 if (httpRequest.status === 200) {
	
		reponse = httpRequest.responseText;
	
		Expr = JSON.parse(reponse)
		
		for (ex of Expr) { 
		
		doInsert(ex.id, ex.exp, ex.res, ex.bud);
		}
	
	  } else {
		  alert('Petit soucis');
	  }
	}
}
function editRow(btnEdit){
	document.getElementById("form_edit_container").hidden=false;
	document.getElementById("form_container").hidden=true;
	tr =btnEdit.parentNode.parentNode;

	td_id = tr.childNodes[0];
	td_nom = tr.childNodes[1];
	td_prenom = tr.childNodes[2];
	td_points = tr.childNodes[3];

	elt_id = document.getElementById("form_edit_id");
	elt_nom = document.getElementById("form_edit_nom");
	elt_prenom = document.getElementById("form_edit_prenom");
	elt_points = document.getElementById("form_edit_points");

	elt_id.value = td_id.innerText
	elt_nom.value = td_nom.innerText
	elt_prenom.value = td_prenom.innerText
	elt_points.value = td_points.innerText
}
function annulerEdit(){
	document.getElementById("form_edit_container").hidden=true;
	document.getElementById("form_container").hidden=false;
}
function doEditData(){
	elt_id=document.getElementById("form_edit_id");
	elt_nom=document.getElementById("form_edit_nom");
	elt_prenom=document.getElementById("form_edit_prenom");
	elt_points=document.getElementById("form_edit_points");

	id=elt_id.value;
	exp = elt_nom.value;
	res = elt_prenom.value;
	bud = parseInt(elt_points.value);

	if(exp=="" || res=="" || Number.isNaN(bud))
		alert("Formulaire incomplet !");
	else{
		httpRequest = new XMLHttpRequest();
		httpRequest.open("PUT", "api/persons/"+id);
		httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		httpRequest.onreadystatechange =actualiser;

		var data = "valnom="+exp
					+"&valprenom="+res
					+"&valpoints="+bud;
		httpRequest.send(data);

		elt_nom.value="";
		elt_prenom.value="";
		elt_points.value="";

		document.getElementById("form_edit_container").hidden=true;
		document.getElementById("form_container").hidden=false;

	}
}