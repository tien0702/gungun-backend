module.exports = {
    apps: [
        {
            name: "gungun-backend",
            script: "index.js",
            cwd: "/home/gungun-backend",
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: "production",
                PORT: 3200
            },
            out_file: "logs/out.log",
            error_file: "logs/error.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss"
        }
    ]
};
