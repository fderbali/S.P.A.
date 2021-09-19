
let listeFilms;

(($) => {
	$(() => {
		$('.sidenav').sidenav();
		$(".dropdown-trigger").dropdown();
		$('.modal').modal({
			dismissible: true,
			onCloseStart: function () { // Callback for Modal close
				if ($("#titre_film").val() && $("#annee_film").val() && $("#duree_film").val() && $("#pochette_film").val()) {
					if ($("#id_edit_film").val() == "") {
						let film = {
							"id": listeFilms.length + 2,
							"title": $("#titre_film").val(),
							"year": $("#annee_film").val(),
							"runtime": $("#duree_film").val(),
							"plot": $("#description_film").val(),
							"posterUrl": $("#pochette_film").val()
						}
						listeFilms.unshift(film);
					} else {
						let id = $("#id_edit_film").val();
						console.log(id);
						console.log(listeFilms.find(x => x.id == id));
						listeFilms.find(x => x.id == id).title = $("#titre_film").val();
						listeFilms.find(x => x.id == id).year = $("#annee_film").val();
						listeFilms.find(x => x.id == id).runtime = $("#duree_film").val();
						listeFilms.find(x => x.id == id).plot = $("#description_film").val();
						listeFilms.find(x => x.id == id).posterUrl = $("#pochette_film").val();
					}
				}
				displayList(listeFilms);
				$("#form_add_film").trigger("reset")
			},
			onOpenStart: function (modal, trigger) {
				id_edit = trigger.dataset.id;
				let film_to_edit = listeFilms.find(x => x.id == id_edit);
				if (film_to_edit) {
					$("#titre_film").val(film_to_edit.title);
					$("#annee_film").val(film_to_edit.year);
					$("#duree_film").val(film_to_edit.runtime);
					$("#description_film").val(film_to_edit.plot);
					$("#pochette_film").val(film_to_edit.posterUrl);
					$("#id_edit_film").val(film_to_edit.id);
				} else {
					$("#form_add_film").trigger("reset")
				}
			},
			onOpenEnd: function () {
				M.updateTextFields();
			},
			onCloseEnd: function () {
				$('.sidenav').sidenav('close');
			}
		});
		// Chargement du fichier JSON
		$.ajax({
			"type": "GET",
			"url": "https://singlepageapp.fahmiderbali.com/serveur/dbfilms.json",
			"async": true,
			"dataType": "json",
			"success": (reponse) => {
				listeFilms = reponse.movies;
				displayList(listeFilms);
			},
			"fail": () => {
				$("#contenu_page").html("<div class='card-panel red lighten-2'>Erreur lors du chargement de la page</div>");
			}
		});
	});
})(jQuery);

let displayList = (films) => {
	contenu = "";
	for (unFilm of films) {
		contenu += remplirCard(unFilm);
	}
	$("#contenu_page").html(contenu);
	paginpers();
	showPage(1);
	assign_events();
}

let assign_events = () => {
	$('.delete_film').click(function () {
		id = $(this).data("id");
		listeFilms.splice(listeFilms.indexOf(listeFilms.find(x => x.id === id)), 1);
		displayList(listeFilms);
	});
	$('.edit_film').click(function () {
		id_edit = $(this).data("id");
		//delete_film(id);
	});
	$('.tri_titre').click(function () {
		listeFilms.sort((a, b) => (b.title < a.title) ? 1 : -1);
		displayList(listeFilms);
	});
	$('.tri_duree').click(function () {
		listeFilms.sort((a, b) => parseInt(a.runtime) - parseInt(b.runtime));
		displayList(listeFilms);
	});
	$('.tri_annee').click(function () {
		listeFilms.sort((a, b) => parseInt(a.year) - parseInt(b.year));
		displayList(listeFilms);
	})
	$('#search_text').blur(function () {
		search_film();
	});

}

let remplirCard = (unFilm) => {
	return `
		<div class="row line-content">
			<div class="col s12 m12 l12">
				<div class="card horizontal row">
					<div class="card-image">
						<img src="${unFilm.posterUrl}" class="width_180">
					</div>
					<div class="card-stacked">
						<div class="card-content">
							<h5 class="card-title">${unFilm.title}</h5>
							<p class="card-text">Année : ${unFilm.year}</p>
							<p class="card-text">Durée : ${unFilm.runtime}</p>
							<p class="card-text">${unFilm.plot}</p>
						</div>
						<div class="card-action">
							<button class="btn blue delete_film" data-id="${unFilm.id}"><i class="large material-icons">delete</i></button>
							<button class="btn blue edit_film modal-trigger" data-id="${unFilm.id}" href="#modal1"><i class="large material-icons">edit</i></button>
						</div>
					</div>
				</div>
			</div>
		</div>
    `;
}

let search_film = () => {
	let search_text = $('#search_text').val();
	let films_found = listeFilms.filter(x => x.title.search(search_text) > -1);
	displayList(films_found);
	return false;
}
