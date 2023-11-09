function getDestination(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Produit = urlParams.get('destination');
    document.getElementById("dest").innerHTML=Produit;
    document.getElementById("Reserver").setAttribute("href", "mailto:test@bidule.fr?subject=Demande de réservation&body=Article : "+Produit+"%0ADate de reservation :%0ANom :%0APrenom :%0ANumero de téléphone :");
    return Produit
}

function disableCheckbox(){
    if (!(assurance)){
        document.getElementById("assurance").setAttribute("disabled", "");
    } 
    if (!(montage)){
        document.getElementById("lunch").setAttribute("disabled", "");
    }
}

async function getInformations(){

    destination = getDestination();


    contenu_json = {};
    await fetch("../json/destinations.json")
    .then(function(response){
        return response.json();
    }).then(function(json){
        contenu_json = json;
    })
    ville='';
    prix=0;
    img='';
    description = '';
    montage = false;

    for (v of contenu_json){ //in pour des entiers, donc 1,2,3. on pour des objets comme ici
        if (v.location == destination){
        ville = v.location;
        console.log(ville);
        prix = v.prix;
        img = v.img;
        description = v.description;
        montage = v.montage;
        }
    }
    document.getElementById("image_dest").setAttribute("src", img);
    document.getElementById("description_produit").innerHTML = description;
    document.getElementById("prix").innerHTML = "Prix par jour  : " + prix + "€";
    //disableCheckbox();
    reservation();
    
}

function reservation(){
    //getImg();
    var prixPitiDejeunaiw=15;
    var formulaires = document.getElementsByClassName("nombreDeGens");
    var formulaires2 = document.getElementsByClassName("inforeserv");
    var pitiDejeunaiw = document.getElementById("lunch").checked;
    for (var i=0;i<2;i++){
    var NbJour = calculdate()
    formulaires2[0].setAttribute('value',ville);
    formulaires2[1].setAttribute('value',calculPrix(prix,formulaires,NbJour,pitiDejeunaiw,prixPitiDejeunaiw));
    formulaires2[2].setAttribute('value',NbJour);
    }

}
function calculPrix(prix,formulaires,dates,pitiDejeunaiw,prixPitiDejeunaiw){
    var prixTotal = 0;
    console.log(pitiDejeunaiw);
    document.getElementById('bonton_confiramtion_reservation').setAttribute("disabled", "");
    if((!(isNaN(dates)))&&(dates>0)&&((formulaires[0].value>=0)&&((formulaires[0].value>0)&&(formulaires[1].value>=0))))
    {
        if(pitiDejeunaiw==true)
        {
            prixTotal = (prix * formulaires[0].value + 0.7*prix*formulaires[1].value) * dates + (dates*prixPitiDejeunaiw*formulaires[0].value)+ (dates*0.7*prixPitiDejeunaiw*formulaires[1].value)
        }
        else
        {
            prixTotal = (prix * formulaires[0].value + 0.7*prix*formulaires[1].value) * dates
        }
        document.getElementById('bonton_confiramtion_reservation').removeAttribute("disabled")
    }
    else
    {
        document.getElementById('bonton_confiramtion_reservation').setAttribute("disabled", "");
    }
    document.getElementById("prixtotal").innerHTML=prixTotal;
    return prixTotal;
}
function calculdate(){
    var dateDebut = document.getElementById("beginDate");
    var dateFin = document.getElementById("endDate");
    var dateDebutBis=new Date(dateDebut.value);
    var dateFinBis=new Date(dateFin.value);
    var tempSejour = (dateFinBis.getTime() - dateDebutBis.getTime())/(1000*60*60*24);
    return(tempSejour)
}

function effacer(){
    document.getElementById("prixtotal").innerHTML="0€";
}


function makeobject(){
    console.log(img);
    let madest = {
        destination: document.getElementById("dest").textContent,
        prix: document.getElementById("prixtotal").textContent,
        Nombreadulte: document.getElementById("adultNbr").value,
        Nombreenfant: document.getElementById("childNbr").value,
        PitiDejeunaiw: document.getElementById("lunch").checked,
        Datearrivé: document.getElementById("beginDate").value,
        Datefin: document.getElementById("endDate").value,
        assurance: document.getElementById("assurance").checked,
        NbJour:calculdate(),
        image:img
      };
      return madest;
}

function exporter(){
    //localStorage.removeItem("liste_voyages");
    let tableau_taches = [];
     
    if (localStorage.liste_voyages){
        tableau_taches = JSON.parse(localStorage.liste_voyages);
    }
    let objet = makeobject();
    console.log(objet);
    tableau_taches.push(objet);

    localStorage.setItem("liste_voyages", JSON.stringify(tableau_taches));
}
