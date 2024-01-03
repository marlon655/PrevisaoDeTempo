module.exports = {
  apps: [
    {
      name: "openweather",
      script: "npm",
      args: "run build", // ou o comando que inicia o servidor Node.js, se aplicável
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
    },
  ],
};

