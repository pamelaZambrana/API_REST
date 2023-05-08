console.log("hola perro");
 const URL="https://dog.ceo/api/breeds/image/random";
 const URL_FACTS = "https://dog-api.kinduff.com/api/facts?number=5"
 /* fetch(URL)
    .then(res => res.json())
    .then(data=> {
        const img = document.querySelector("img");
        img.src = data.message;
    }); */

async function reload(){
    await(
        fetch(URL)
            .then(res => res.json())
            .then(data=> {
                const img = document.querySelector("img");
                img.src = data.message;
            })
    );
};
async function generateFacts(){
    await(
        fetch(URL_FACTS)
            .then(res => res.json())
            .then( data => {
                console.log(data);
                const facts1 = document.getElementById("content1");
                const facts2 = document.getElementById("content2");
                const facts3 = document.getElementById("content3");
                const facts4 = document.getElementById("content4");
                const facts5= document.getElementById("content5");

                facts1.innerHTML = data.facts[0];
                facts2.innerHTML = data.facts[1];
                facts3.innerHTML = data.facts[2];
                facts4.innerHTML = data.facts[3];
                facts5.innerHTML = data.facts[4];
            })
    )
}

reload();
generateFacts();