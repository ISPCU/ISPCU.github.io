# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "hashicorp/precise32"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 1337, host: 1338

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.50.10"

  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.aliases = [ "www.ispcu.local" ]

  # If true, then any SSH connections made will enable agent forwarding.
  # Default value: false
  config.ssh.forward_agent = true

  # configure omnibus versioning
  config.omnibus.chef_version = :latest

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Don't boot with headless mode
  #   vb.gui = true
  #
  #   # Use VBoxManage to customize the VM. For example to change memory:
  #   vb.customize ["modifyvm", :id, "--memory", "1024"]
  # end
  #
  # View the documentation for the provider you're using for more
  # information on available options.

  # Enable provisioning with chef solo, specifying a cookbooks path, roles
  # path, and data_bags path (all relative to this Vagrantfile), and adding
  # some recipes and/or roles.
  
  # config.vm.provision :shell, :inline => 'apt-get update'
  # config.vm.provision :shell, :inline => 'apt-get install build-essential ruby1.9.1 --no-upgrade --yes'
  
  config.vm.provision "chef_solo" do |chef|
    chef.log_level = :debug
    chef.cookbooks_path = "cookbooks"

    chef.add_recipe :apt
    chef.add_recipe "build-essential"
    chef.add_recipe "vim"
    chef.add_recipe "mongodb::10gen_repo"
    chef.add_recipe "mongodb"
    chef.add_recipe "nodejs"
    chef.add_recipe "git"
    # chef.add_recipe "nginx"
    chef.add_recipe "redis"
    chef.add_recipe "rvm::system"
    chef.add_recipe "rvm::vagrant"

    # chef.roles_path = "../my-recipes/roles"
    # chef.data_bags_path = "../my-recipes/data_bags"
    # chef.add_recipe "mysql"
    # chef.add_role "web"
  
    # You may also specify custom JSON attributes:
    chef.json = { 
      :mongodb => {
        :dbpath          => "/var/lib/mongodb",
        :logpath         => "/var/log/mongodb",
        :port            => "27017",
      },
      :git     => {
        :prefix => "/usr/local",
      },
      # :nginx   => {
      #   :user               => "www-data",
      #   :init_style         => "runit",
      #   :pid                => "/var/run/nginx.pid",
      #   :worker_connections => "1024",
      # },
      :redis   => {
        :bind               => "127.0.0.1",
        :port               => "6379",
        :config_path        => "/etc/redis/redis.conf",
        :daemonize          => "yes",
        :timeout            => "300",
        :loglevel           => "notice",
      },
      :rvm    => {
        :rubies => ["2.1.2"],
        :default_ruby => "2.1.2",
        :global_gems => [
          { :name => 'compass' },
          { :name => 'breakpoint' }
        ],
        :user_installs    => [
          {
            :user => "vagrant",
            :default_ruby => "2.1.2",
            :rubies => ["2.1.2"],
            :global_gems => [
              { :name => 'compass' },
              { :name => 'breakpoint' },
            ]
          }
        ]
      }

    }

  end

  # config.vm.provision "shell",
  #   inline: "echo -e $1 > /etc/nginx/conf.d/nginx.conf",
  #   args: [<<-EOS
  #     server {
  #         listen *:80;

  #         location ~ ^/ {
  #             proxy_pass http://localhost:8080;
  #         }
  #     }
  #   EOS
  #   ]
  
  config.vm.provision "shell", path: "bootstrap.sh"

end
