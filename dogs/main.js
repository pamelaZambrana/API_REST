console.log("hola perro");
 const URL="https://api.thedogapi.com/v1/images/search?api_key=live_rIW88oJU1Xc2tqHVHuGKrkpO74qT9sUeVbivdUOwJhO8tXsgjQuuDbXvLz7FXo4F";
 const URL_FAVOURITES="https://api.thedogapi.com/v1/favourites";
 const URL_UPLOAD="https://api.thedogapi.com/v1/images/upload";
 const URL_FAVOURITES_DELETE=(id) => (`https://api.thedogapi.com/v1/favourites/${id}`);
 const URL_FACTS = "https://dogapi.dog/api/v2/facts?limit=5" 
 /* fetch(URL)
    .then(res => res.json())
    .then(data=> {
        const img = document.querySelector("img");
        img.src = data.message;
    }); */
/* -----------Random images -----------*/
async function reload(){
    await(
        fetch(URL)
            .then(res => res.json())
            .then(data=> {
               console.log(data);
                const img = document.querySelector("img");
                const favouritesButton = document.getElementById("saving-favourites-button");

                img.src = data[0].url;
                favouritesButton.onclick = () => (savingFavourites(data[0].id));

            })
    );
};
/* ---------- loading Favourites images ---------- */
async function reloadFavourites(){
    await(
        fetch(
                URL_FAVOURITES,{
                    headers: {
                        "X-API-KEY": "live_rIW88oJU1Xc2tqHVHuGKrkpO74qT9sUeVbivdUOwJhO8tXsgjQuuDbXvLz7FXo4F"
                    }
                }
            )
            .then(res => res.json())
            .then(data=> {
                console.log(data);
                const section = document.getElementById("favourites-pics-section");
                section.innerHTML = "";
                const favouriteTitle = document.createElement("h2");
                const title = document.createTextNode("My Favourite Pics...");
                favouriteTitle.appendChild(title);
                favouriteTitle.style = "width:100%";
                section.appendChild(favouriteTitle);
                data.forEach(element => {
                    //console.log(element);
                    const favouriteSection = document.getElementById("favourites-pics-section");
                    const newFavourite = document.createElement("div");
                    const img = document.createElement("img");
                    const button = document.createElement("button");
                    const btnText = document.createTextNode("Quitar de favoritos");

                    button.appendChild(btnText);
                    button.onclick = () => (deletingFavourites(element.id));
                    img.src = element.image.url;
                    img.style = "max-height: 200px; max-width: fit-content;"
                    newFavourite.appendChild(img);
                    newFavourite.appendChild(button);
                    newFavourite.style= "display: flex; gap: 10px; flex-direction: column; align-items: center";

                    favouriteSection.appendChild(newFavourite);

                });
            })
            .catch(error=>{
                const errorMessage = document.getElementById("error");
                errorMessage.innerHTML= error;
                //console.log(error)
            })
    );
};
/* ---------- saving fouvorites images----------- */
async function savingFavourites(id){
    await(
        fetch(
            URL_FAVOURITES, 
            {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "X-API-KEY": "live_rIW88oJU1Xc2tqHVHuGKrkpO74qT9sUeVbivdUOwJhO8tXsgjQuuDbXvLz7FXo4F"
            },
            body: JSON.stringify({
                image_id : id
            })
            }
        )
            .then(res => res.json())
            .then(data=> {
                console.log(data);
                reloadFavourites();
                
            })
            .catch(error=>{
                const errorMessage = document.getElementById("error");
                errorMessage.innerHTML= error;
                //console.log(error)
            })
    );
};
/* -----------Deleting favourites---------- */

async function deletingFavourites(id){
    await(
        fetch(
            URL_FAVOURITES_DELETE(id),
            {
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json",
                    "X-API-KEY": "live_rIW88oJU1Xc2tqHVHuGKrkpO74qT9sUeVbivdUOwJhO8tXsgjQuuDbXvLz7FXo4F"
                },
            }
        )
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                reloadFavourites();
            }
            )
            .catch(error => console.log(error, console.log(URL_FAVOURITES_DELETE(id))))
    )
};
/* -----------random facts---------- */
async function generateFacts(){
    await(
        fetch(URL_FACTS)
            .then(res => res.json())
            .then( data => {
                //console.log(data.data[0].attributes.body);
                const facts1 = document.getElementById("content1");
                const facts2 = document.getElementById("content2");
                const facts3 = document.getElementById("content3");
                const facts4 = document.getElementById("content4");
                const facts5= document.getElementById("content5");

                facts1.innerHTML = data.data[0].attributes.body;
                facts2.innerHTML = data.data[1].attributes.body;
                facts3.innerHTML = data.data[2].attributes.body;
                facts4.innerHTML = data.data[3].attributes.body;
                facts5.innerHTML = data.data[4].attributes.body;
            })
            .then( error => {
                console.log(error)
            })
    )
}
/* -----------Upload picture--------- */
async function uploadingPic(){
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);
    console.log(formData.get("file"));
    await fetch(
        URL_UPLOAD,
        {
            method: "POST",
            headers:{
                "X-API-KEY": "live_rIW88oJU1Xc2tqHVHuGKrkpO74qT9sUeVbivdUOwJhO8tXsgjQuuDbXvLz7FXo4F"
            },
            body: formData
        }
    )
    .then(res => {
        console.log(res);
        console.log(res.image_id);
    })
    .catch(error => console.log(error))
}


reload();
reloadFavourites();
generateFacts();
