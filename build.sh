echo "creating eloinflater_frontend"

docker build . -t sandrospengler/eloinflater_frontend:latest

echo "pushing image to dockerhub"

docker push sandrospengler/eloinflater_frontend:latest

echo "eloinflater_frontend has now been published"
