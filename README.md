# projet_final_COLLET-MARIE_ANGELIQUE

## How to run the project ?

### 1| By building the containers with the source code: 

1. Clone the repository from [github](https://github.com/Pierre-Brieuc/projet_final_COLLET-MARIE_ANGELIQUE)

2. If you don't have them installed already, install docker and the compose plugin from [Docker](https://docs.docker.com/)

3. Then run these commands : 
```bash
cd projet_final_COLLET-MARIE_ANGELIQUE

docker compose up --build
``` 

### 2| By pulling the images from dockerhub

1. Pull the images from Docker Hub using a Linux environment

Frontend image
>> docker pull pierrebrieuc/frontend-final-project

Backend image
>> docker pull pierrebrieuc/backend-final-project

2. Run the docker compose in the root of the project
>> docker-compose up
