Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  
  #client
  config.vm.network "forwarded_port", guest: 3000, host: 3000  
  
  #server
  config.vm.network "forwarded_port", guest: 8000, host: 8000

  # node debug port
  config.vm.network "forwarded_port", guest: 5858, host: 5858

  #nginx
  config.vm.network "forwarded_port", guest: 80, host:80
  
  #nginx
  config.vm.network "forwarded_port", guest: 443, host:443

  # mysql
  config.vm.network "forwarded_port", guest: 3306, host: 3306

  config.vm.provision "fix-no-tty", type: "shell" do |s|
      s.privileged = false
      s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
  end

  config.vm.provision :shell, :path => "provision.sh"
  config.vm.provision :shell, :path => "install-node.sh", privileged: false
  config.vm.provision :shell, :path => "install-mongo.sh", privileged: false
  config.vm.provision :shell, :path => "install-nginx.sh", privileged: false

  config.vm.provider "virtualbox" do |vb|  
    vb.memory = 1024  
  end
  
end