const blockHero = document.querySelector('.hero_main_row');

async function loadData(e){

   try{
      blockHero.innerHTML = `
      <div class="data__loading">
         <img src="./img/gifs/loading.gif" alt="Loading..." >
      </div>`;

      const urlForAllRepositories = 'https://api.github.com/users/IevgenVyshnevskyi/repos';
      const responseForAllRepositories = await fetch(urlForAllRepositories, {method: 'GET',
         });
      const repositoriesInfo = await responseForAllRepositories.json(); // читаємо відповідь у форматі JSON

      const urlGeneralInfo = 'https://api.github.com/users/IevgenVyshnevskyi';
      const responseGeneralInfo = await fetch(urlGeneralInfo, {method: 'GET',
      });
      const generalInfo = await responseGeneralInfo.json(); // читаємо відповідь у форматі JSON
      const userName = generalInfo.name;
      const userLogin = generalInfo.login;
      const followers = generalInfo.followers;
      const following = generalInfo.following;


      const dateCreatingGithubAccount = `${generalInfo.created_at.slice(0, 10)}`;
      let numbersPublicRepositories = generalInfo.public_repos;

      const template = `
         <div class="hero_left_column">
                  <div class="hero_left_column_icon">
                     <img src="./img/icons/anonimus.png" alt="" >
                  </div>
                  <h1>${userName}</h1>
                  <p><a href="https://github.com/IevgenVyshnevskyi" target="_blank">${userLogin}</a></p>
                  
                  <p>followers - ${followers};</p>
                  <p>following - ${following};</p>
                  <p>Creating a Github account:</p>
                  <p>${dateCreatingGithubAccount}</p>
                  <p>Number of public repositories: ${numbersPublicRepositories}</p>
               </div>
               <div class="hero_right_column">
                  <h1 class = 'hero_right_column_title'>My GitHub Profile</h1>
                  <p>My name Ievgen Vyshnevskyi and I am studying web development since 2020.</p>
                  <p>In 2022, I started studing at the GeekHub IT school, where I am still studying.</p>
                  <p>I study the languages ​​HTML, CSS, JavaScript, work with preprocessors, assemblers and the Git version control system, as well as many other things from the world of web technologies.</p>
                  <p>My public GitHub repositories:</p>
                  <ul>

                  </ul>
               </div>
      `;

         blockHero.innerHTML = template;

      for (let i = 0; i < repositoriesInfo.length; i++){

         let dateLastCommit = `${repositoriesInfo[i].pushed_at.slice(0, 10)}`;
         const listOfRepositories = document.querySelector('ul');
         const oneSeparateRepository = document.createElement('li');
         listOfRepositories.appendChild(oneSeparateRepository);
         oneSeparateRepository.innerHTML = repositoriesInfo[i].name;

         oneSeparateRepository.addEventListener('click', openOrHideDateLastCommit);
         const rowForTimeLastCommit = document.createElement('p');
         rowForTimeLastCommit.classList.add('active');
         oneSeparateRepository.appendChild(rowForTimeLastCommit);
         rowForTimeLastCommit.innerHTML = dateLastCommit;

         function openOrHideDateLastCommit(){
            rowForTimeLastCommit.classList.toggle('active');
         };
      };

   } catch(e){
      console.error(e)
   } finally{
   };
};

   if(blockHero){
      loadData();
   };