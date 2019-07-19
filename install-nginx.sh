echo "installing nginx..."
    sudo apt-get -y update
    sudo apt-get -y install nginx
    service nginx start
    sudo ufw allow 2222/tcp
    sudo ufw allow http
    sudo ufw allow https
echo "done installing nginx!"