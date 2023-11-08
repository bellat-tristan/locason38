function rechercher() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('loc');
    let y = document.getElementsByClassName('voyages');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            y[i].style.display="none";
        }
        else {
            y[i].style.display="flex";                 
        }
    }
}

// $(document).ready(function(){
//     if(location.href.split('/').pop() !="index.html")
//     {
//         document.getElementById("searchbar").remove();
//     }
// })
